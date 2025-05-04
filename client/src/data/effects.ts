import { Effect } from '../types/alchemy';

export const effects = {
  // Positive effects
  healing: {
    id: 1,
    name: 'Healing',
    description: 'restores health and vitality',
    positive: true
  },
  strength: {
    id: 2,
    name: 'Strength',
    description: 'increases physical power',
    positive: true
  },
  invisibility: {
    id: 3,
    name: 'Invisibility',
    description: 'makes the drinker transparent',
    positive: true
  },
  haste: {
    id: 4,
    name: 'Haste',
    description: 'increases speed and reflexes',
    positive: true
  },
  resistance: {
    id: 5,
    name: 'Resistance',
    description: 'provides protection against damage',
    positive: true
  },
  light: {
    id: 6,
    name: 'Light',
    description: 'causes a bright glow',
    positive: true
  },
  insight: {
    id: 7,
    name: 'Insight',
    description: 'reveals hidden knowledge',
    positive: true
  },
  regeneration: {
    id: 8,
    name: 'Regeneration',
    description: 'heals wounds over time',
    positive: true
  },
  levitation: {
    id: 9,
    name: 'Levitation',
    description: 'allows floating above the ground',
    positive: true
  },
  rebirth: {
    id: 10,
    name: 'Rebirth',
    description: 'brings back from the brink of death',
    positive: true
  },
  enhancement: {
    id: 11,
    name: 'Enhancement',
    description: 'improves other alchemical effects',
    positive: true
  },
  clarity: {
    id: 12,
    name: 'Clarity',
    description: 'clears the mind and dispels confusion',
    positive: true
  },
  absorption: {
    id: 13,
    name: 'Absorption',
    description: 'allows absorbing other potion effects',
    positive: true
  },
  revelation: {
    id: 14,
    name: 'Revelation',
    description: 'uncovers hidden truths',
    positive: true
  },
  endurance: {
    id: 15,
    name: 'Endurance',
    description: 'increases stamina and longevity',
    positive: true
  },
  
  // Negative effects
  toxicity: {
    id: 101,
    name: 'Toxicity',
    description: 'causes poisoning and illness',
    positive: false
  },
  burning: {
    id: 102,
    name: 'Burning',
    description: 'ignites the skin painfully',
    positive: false
  },
  slowness: {
    id: 103,
    name: 'Slowness',
    description: 'reduces movement speed',
    positive: false
  },
  confusion: {
    id: 104,
    name: 'Confusion',
    description: 'causes disorientation and hallucinations',
    positive: false
  },
  weakness: {
    id: 105,
    name: 'Weakness',
    description: 'saps strength and energy',
    positive: false
  },
  paralysis: {
    id: 106,
    name: 'Paralysis',
    description: 'temporarily freezes the body',
    positive: false
  },
  explosion: {
    id: 107,
    name: 'Explosion',
    description: 'causes a violent reaction',
    positive: false
  },
  heatwave: {
    id: 108,
    name: 'Heatwave',
    description: 'creates unbearable heat',
    positive: false
  },
  void: {
    id: 109,
    name: 'Void',
    description: 'creates a vacuum of nothingness',
    positive: false
  },
  sleepiness: {
    id: 110,
    name: 'Sleepiness',
    description: 'induces drowsiness and fatigue',
    positive: false
  },
  silence: {
    id: 111,
    name: 'Silence',
    description: 'prevents speech and vocalization',
    positive: false
  },
  echo: {
    id: 112,
    name: 'Echo',
    description: 'causes sounds to repeat endlessly',
    positive: false
  },
  shock: {
    id: 113,
    name: 'Shock',
    description: 'creates painful electrical surges',
    positive: false
  },
  berserk: {
    id: 114,
    name: 'Berserk',
    description: 'causes uncontrollable rage',
    positive: false
  }
};
