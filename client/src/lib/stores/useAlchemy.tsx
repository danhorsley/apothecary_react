import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ingredient, Effect, IngredientType } from '../../types/alchemy';
import { ingredients } from '../../data/ingredients';
import { useAudio } from './useAudio';

interface DiscoveredEffect {
  ingredientId: number;
  effectId: number;
  ingredientName: string;
  effectName: string;
  timestamp: number;
}

interface AlchemyState {
  // Game state
  level: number;
  experience: number;
  experienceToNextLevel: number;
  health: number;
  maxHealth: number;
  gameOver: boolean;
  
  // Ingredients and discoveries
  availableIngredients: Ingredient[];
  discoveredEffects: DiscoveredEffect[];
  
  // Current mixing
  currentIngredients: Ingredient[];
  currentPotion: { color: string; effects: string[] } | null;
  
  // Methods - Getters
  getIngredientsByType: (type: IngredientType) => Ingredient[];
  isIngredientDiscovered: (ingredientId: number, effectId: number) => boolean;
  getDiscoveriesForIngredient: (ingredientId: number) => number[];
  getDiscoveredEffects: () => DiscoveredEffect[];
  getMaxIngredientsAllowed: () => number;
  
  // Methods - Actions
  addIngredient: (ingredient: Ingredient) => void;
  resetCauldron: () => void;
  tastePotion: () => string[];
  discoverEffect: (ingredientId: number, effectId: number) => void;
  gainExperience: (amount: number) => void;
  takeDamage: (amount: number) => void;
  resetGame: () => void;
  
  // Computed
  discoveredEffectsCount: number;
  totalEffectsCount: number;
}

export const useAlchemy = create<AlchemyState>()(
  persist(
    (set, get) => ({
      // Initial game state
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      health: 100,
      maxHealth: 100,
      gameOver: false,
      
      // Available ingredients (from data file)
      availableIngredients: ingredients,
      
      // Discovered effects (empty initially)
      discoveredEffects: [],
      
      // Current mixing state
      currentIngredients: [],
      currentPotion: null,
      
      // Get ingredients filtered by type
      getIngredientsByType: (type: IngredientType) => {
        return get().availableIngredients.filter(ingredient => ingredient.type === type);
      },
      
      // Check if an effect for an ingredient has been discovered
      isIngredientDiscovered: (ingredientId: number, effectId: number) => {
        return get().discoveredEffects.some(
          discovery => discovery.ingredientId === ingredientId && discovery.effectId === effectId
        );
      },
      
      // Get all discovered effect IDs for an ingredient
      getDiscoveriesForIngredient: (ingredientId: number) => {
        return get().discoveredEffects
          .filter(discovery => discovery.ingredientId === ingredientId)
          .map(discovery => discovery.effectId);
      },
      
      // Get all discovered effects
      getDiscoveredEffects: () => {
        return get().discoveredEffects;
      },
      
      // Calculate max ingredients allowed based on level
      getMaxIngredientsAllowed: () => {
        const level = get().level;
        // Start with 3 ingredients at level 1, max out at 7 ingredients at level 5
        return Math.min(3 + Math.floor(level / 2), 7);
      },
      
      // Add an ingredient to the cauldron
      addIngredient: (ingredient: Ingredient) => {
        const maxIngredients = get().getMaxIngredientsAllowed();
        
        set(state => {
          if (state.currentIngredients.length >= maxIngredients) {
            // Show a toast or alert that max ingredients reached
            setTimeout(() => {
              alert(`You can only use ${maxIngredients} ingredients at level ${state.level}!`);
            }, 100);
            return { currentIngredients: state.currentIngredients };
          }
          return { currentIngredients: [...state.currentIngredients, ingredient] };
        });
      },
      
      // Reset the cauldron
      resetCauldron: () => {
        set({
          currentIngredients: [],
          currentPotion: null
        });
      },
      
      // Taste the current potion to discover effects
      tastePotion: () => {
        const { currentIngredients, discoveredEffects } = get();
        
        if (currentIngredients.length === 0) {
          return ["The cauldron is empty"];
        }
        
        // Determine which effects to reveal
        const effectsToReveal: string[] = [];
        let positiveEffects = 0;
        let negativeEffects = 0;
        
        // Process each ingredient
        currentIngredients.forEach(ingredient => {
          // Pick a random effect from this ingredient that hasn't been discovered yet
          const undiscoveredEffects = ingredient.effects.filter(effect => 
            !get().isIngredientDiscovered(ingredient.id, effect.id)
          );
          
          if (undiscoveredEffects.length > 0) {
            // Randomly select an undiscovered effect
            const randomEffect = undiscoveredEffects[Math.floor(Math.random() * undiscoveredEffects.length)];
            
            // Discover this effect
            get().discoverEffect(ingredient.id, randomEffect.id);
            effectsToReveal.push(`You discovered that ${ingredient.name} ${randomEffect.description}`);
            
            // Count positive/negative effects
            if (randomEffect.positive) {
              positiveEffects++;
            } else {
              negativeEffects++;
            }
          } else {
            // All effects already discovered, just add a known effect to the result
            const knownEffect = ingredient.effects[0];
            effectsToReveal.push(`${ingredient.name} ${knownEffect.description} (Already known)`);
            
            // Count positive/negative effects
            if (knownEffect.positive) {
              positiveEffects++;
            } else {
              negativeEffects++;
            }
          }
        });
        
        // Calculate potion effectiveness
        const healthEffect = positiveEffects * 5 - negativeEffects * 10;
        
        // Apply health effect
        if (healthEffect !== 0) {
          if (healthEffect > 0) {
            effectsToReveal.push(`You feel invigorated! (+${healthEffect} health)`);
            // Don't exceed max health
            const newHealth = Math.min(get().health + healthEffect, get().maxHealth);
            set(state => ({ health: newHealth }));
          } else {
            effectsToReveal.push(`You feel sick! (${healthEffect} health)`);
            get().takeDamage(-healthEffect); // Convert negative to positive for damage
          }
        }
        
        // Grant experience for the potion
        const xpGained = 10 + (positiveEffects * 5);
        get().gainExperience(xpGained);
        effectsToReveal.push(`You gained ${xpGained} experience`);
        
        // Update current potion
        let potionColor = 'rgba(100, 100, 255, 0.6)';
        if (currentIngredients.length > 0) {
          // Simple color mixing
          potionColor = `rgba(${Math.min(currentIngredients.length * 50, 255)}, 
                         ${Math.min(currentIngredients.length * 30, 255)}, 
                         ${Math.min(currentIngredients.length * 70, 255)}, 0.8)`;
        }
        
        set({
          currentPotion: {
            color: potionColor,
            effects: effectsToReveal
          }
        });
        
        return effectsToReveal;
      },
      
      // Discover an effect and record it
      discoverEffect: (ingredientId: number, effectId: number) => {
        const ingredient = get().availableIngredients.find(i => i.id === ingredientId);
        const effect = ingredient?.effects.find(e => e.id === effectId);
        
        if (ingredient && effect) {
          set(state => ({
            discoveredEffects: [
              ...state.discoveredEffects,
              {
                ingredientId,
                effectId,
                ingredientName: ingredient.name,
                effectName: effect.name,
                timestamp: Date.now()
              }
            ]
          }));
          
          // Call success sound
          const { playSuccess } = useAudio.getState();
          playSuccess();
        }
      },
      
      // Gain experience and level up if needed
      gainExperience: (amount: number) => {
        set(state => {
          let newExperience = state.experience + amount;
          let newLevel = state.level;
          let newExpToNextLevel = state.experienceToNextLevel;
          let newMaxHealth = state.maxHealth;
          
          // Check for level up
          if (newExperience >= state.experienceToNextLevel) {
            newLevel++;
            newExperience -= state.experienceToNextLevel;
            newExpToNextLevel = Math.floor(state.experienceToNextLevel * 1.5);
            newMaxHealth = state.maxHealth + 10;
            
            // Show level up message
            setTimeout(() => {
              alert(`Level Up! You are now level ${newLevel}`);
            }, 500);
          }
          
          return {
            experience: newExperience,
            level: newLevel,
            experienceToNextLevel: newExpToNextLevel,
            maxHealth: newMaxHealth,
            health: newMaxHealth // Heal on level up
          };
        });
      },
      
      // Take damage and check for game over
      takeDamage: (amount: number) => {
        set(state => {
          const newHealth = Math.max(0, state.health - amount);
          
          // Check for game over
          if (newHealth <= 0) {
            return {
              health: 0,
              gameOver: true
            };
          }
          
          return { health: newHealth };
        });
      },
      
      // Reset the game
      resetGame: () => {
        set({
          level: 1,
          experience: 0,
          experienceToNextLevel: 100,
          health: 100,
          maxHealth: 100,
          gameOver: false,
          currentIngredients: [],
          currentPotion: null
          // Note: we don't reset discoveredEffects to keep the player's progress
        });
      },
      
      // Computed values
      get discoveredEffectsCount() {
        return get().discoveredEffects.length;
      },
      
      get totalEffectsCount() {
        // Calculate total number of effects across all ingredients
        return get().availableIngredients.reduce(
          (total, ingredient) => total + ingredient.effects.length, 
          0
        );
      }
      
    }),
    {
      name: 'alchemy-game-storage',
      partialize: (state) => ({ 
        level: state.level,
        experience: state.experience,
        experienceToNextLevel: state.experienceToNextLevel,
        health: state.health,
        maxHealth: state.maxHealth,
        discoveredEffects: state.discoveredEffects
      })
    }
  )
);
