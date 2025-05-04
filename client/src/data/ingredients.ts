import { Ingredient, IngredientType } from '../types/alchemy';
import { effects } from './effects';

export const ingredients: Ingredient[] = [
  // Herbs
  {
    id: 1,
    name: 'Moonleaf',
    type: IngredientType.HERB,
    icon: '🌿',
    color: 'rgba(100, 220, 100, 0.8)',
    effects: [
      effects.healing,
      effects.slowness,
      effects.clarity
    ]
  },
  {
    id: 2,
    name: 'Dragonwort',
    type: IngredientType.HERB,
    icon: '🌱',
    color: 'rgba(180, 230, 100, 0.8)',
    effects: [
      effects.burning,
      effects.strength,
      effects.toxicity
    ]
  },
  {
    id: 3,
    name: 'Whisperroot',
    type: IngredientType.HERB,
    icon: '🌾',
    color: 'rgba(140, 200, 120, 0.8)',
    effects: [
      effects.silence,
      effects.invisibility,
      effects.weakness
    ]
  },
  {
    id: 4,
    name: 'Starbloom',
    type: IngredientType.HERB,
    icon: '🌸',
    color: 'rgba(255, 200, 230, 0.8)',
    effects: [
      effects.levitation,
      effects.insight,
      effects.sleepiness
    ]
  },
  
  // Minerals
  {
    id: 5,
    name: 'Sunstone',
    type: IngredientType.MINERAL,
    icon: '💎',
    color: 'rgba(255, 180, 60, 0.8)',
    effects: [
      effects.light,
      effects.heatwave,
      effects.clarity
    ]
  },
  {
    id: 6,
    name: 'Moonstone',
    type: IngredientType.MINERAL,
    icon: '🔮',
    color: 'rgba(200, 200, 240, 0.8)',
    effects: [
      effects.sleepiness,
      effects.insight,
      effects.regeneration
    ]
  },
  {
    id: 7,
    name: 'Void Shard',
    type: IngredientType.MINERAL,
    icon: '⚫',
    color: 'rgba(80, 30, 140, 0.8)',
    effects: [
      effects.void,
      effects.weakness,
      effects.absorption
    ]
  },
  {
    id: 8,
    name: 'Cinderdust',
    type: IngredientType.MINERAL,
    icon: '🔥',
    color: 'rgba(240, 100, 40, 0.8)',
    effects: [
      effects.burning,
      effects.explosion,
      effects.heatwave
    ]
  },
  
  // Spirits
  {
    id: 9,
    name: 'Echo Essence',
    type: IngredientType.SPIRIT,
    icon: '✨',
    color: 'rgba(180, 180, 255, 0.8)',
    effects: [
      effects.echo,
      effects.silence,
      effects.revelation
    ]
  },
  {
    id: 10,
    name: 'Dream Wisp',
    type: IngredientType.SPIRIT,
    icon: '💫',
    color: 'rgba(200, 220, 255, 0.8)',
    effects: [
      effects.insight,
      effects.confusion,
      effects.sleepiness
    ]
  },
  {
    id: 11,
    name: 'Storm Spark',
    type: IngredientType.SPIRIT,
    icon: '⚡',
    color: 'rgba(255, 255, 100, 0.8)',
    effects: [
      effects.shock,
      effects.haste,
      effects.confusion
    ]
  },
  {
    id: 12,
    name: 'Soul Vapor',
    type: IngredientType.SPIRIT,
    icon: '🌫️',
    color: 'rgba(220, 240, 255, 0.8)',
    effects: [
      effects.invisibility,
      effects.regeneration,
      effects.weakness
    ]
  },
  
  // Animal Products
  {
    id: 13,
    name: 'Dragon Scale',
    type: IngredientType.ANIMAL,
    icon: '🐉',
    color: 'rgba(200, 50, 50, 0.8)',
    effects: [
      effects.resistance,
      effects.burning,
      effects.strength
    ]
  },
  {
    id: 14,
    name: 'Phoenix Feather',
    type: IngredientType.ANIMAL,
    icon: '🔥',
    color: 'rgba(255, 140, 0, 0.8)',
    effects: [
      effects.rebirth,
      effects.heatwave,
      effects.strength
    ]
  },
  {
    id: 15,
    name: 'Spider Venom',
    type: IngredientType.ANIMAL,
    icon: '🕷️',
    color: 'rgba(100, 220, 50, 0.8)',
    effects: [
      effects.toxicity,
      effects.paralysis,
      effects.enhancement
    ]
  },
  {
    id: 16,
    name: 'Wolf Heart',
    type: IngredientType.ANIMAL,
    icon: '❤️',
    color: 'rgba(220, 0, 50, 0.8)',
    effects: [
      effects.strength,
      effects.endurance,
      effects.berserk
    ]
  }
];
