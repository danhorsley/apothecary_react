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
  {
    id: 17,
    name: 'Frostweed',
    type: IngredientType.HERB,
    icon: '❄️',
    color: 'rgba(200, 240, 255, 0.8)',
    effects: [
      effects.resistance,
      effects.slowness,
      effects.enhancement
    ]
  },
  {
    id: 18,
    name: 'Sunpetal',
    type: IngredientType.HERB,
    icon: '🌻',
    color: 'rgba(255, 220, 0, 0.8)',
    effects: [
      effects.light,
      effects.endurance,
      effects.heatwave
    ]
  },
  {
    id: 19,
    name: 'Twilight Sage',
    type: IngredientType.HERB,
    icon: '🌿',
    color: 'rgba(120, 80, 160, 0.8)',
    effects: [
      effects.revelation,
      effects.void,
      effects.regeneration
    ]
  },
  {
    id: 20,
    name: 'Mistfern',
    type: IngredientType.HERB,
    icon: '🌫️',
    color: 'rgba(200, 210, 220, 0.8)',
    effects: [
      effects.invisibility,
      effects.confusion,
      effects.absorption
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
  {
    id: 21,
    name: 'Crystal Quartz',
    type: IngredientType.MINERAL,
    icon: '✨',
    color: 'rgba(230, 230, 250, 0.8)',
    effects: [
      effects.clarity,
      effects.enhancement,
      effects.echo
    ]
  },
  {
    id: 22,
    name: 'Thunderstone',
    type: IngredientType.MINERAL,
    icon: '⚡',
    color: 'rgba(180, 180, 30, 0.8)',
    effects: [
      effects.shock,
      effects.haste,
      effects.explosion
    ]
  },
  {
    id: 23,
    name: 'Bloodstone',
    type: IngredientType.MINERAL,
    icon: '💊',
    color: 'rgba(180, 20, 40, 0.8)',
    effects: [
      effects.strength,
      effects.regeneration,
      effects.berserk
    ]
  },
  {
    id: 24,
    name: 'Emerald Dust',
    type: IngredientType.MINERAL,
    icon: '💸',
    color: 'rgba(20, 180, 40, 0.8)',
    effects: [
      effects.healing,
      effects.endurance,
      effects.toxicity
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
  {
    id: 25,
    name: 'Void Whisper',
    type: IngredientType.SPIRIT,
    icon: '🔮',
    color: 'rgba(60, 20, 90, 0.8)',
    effects: [
      effects.void,
      effects.silence,
      effects.insight
    ]
  },
  {
    id: 26,
    name: 'Frostbite',
    type: IngredientType.SPIRIT,
    icon: '❄️',
    color: 'rgba(200, 230, 255, 0.8)',
    effects: [
      effects.paralysis,
      effects.slowness,
      effects.resistance
    ]
  },
  {
    id: 27,
    name: 'Spectral Flame',
    type: IngredientType.SPIRIT,
    icon: '🔥',
    color: 'rgba(100, 180, 255, 0.8)',
    effects: [
      effects.light,
      effects.levitation,
      effects.enhancement
    ]
  },
  {
    id: 28,
    name: 'Harmony Wisp',
    type: IngredientType.SPIRIT,
    icon: '🌊',
    color: 'rgba(180, 230, 230, 0.8)',
    effects: [
      effects.clarity,
      effects.healing,
      effects.absorption
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
  },
  {
    id: 29,
    name: 'Owl Feather',
    type: IngredientType.ANIMAL,
    icon: '🦉',
    color: 'rgba(180, 160, 120, 0.8)',
    effects: [
      effects.insight,
      effects.levitation,
      effects.silence
    ]
  },
  {
    id: 30,
    name: 'Frog Tongue',
    type: IngredientType.ANIMAL,
    icon: '🐸',
    color: 'rgba(50, 180, 50, 0.8)',
    effects: [
      effects.paralysis,
      effects.toxicity,
      effects.haste
    ]
  },
  {
    id: 31,
    name: 'Unicorn Hair',
    type: IngredientType.ANIMAL,
    icon: '🦄',
    color: 'rgba(255, 230, 250, 0.8)',
    effects: [
      effects.healing,
      effects.clarity,
      effects.revelation
    ]
  },
  {
    id: 32,
    name: 'Bat Wing',
    type: IngredientType.ANIMAL,
    icon: '🦇',
    color: 'rgba(50, 50, 70, 0.8)',
    effects: [
      effects.invisibility,
      effects.echo,
      effects.void
    ]
  }
];
