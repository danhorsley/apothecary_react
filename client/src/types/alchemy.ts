export enum IngredientType {
  HERB = 'Herb',
  MINERAL = 'Mineral',
  SPIRIT = 'Spirit',
  ANIMAL = 'Animal'
}

export interface Effect {
  id: number;
  name: string;
  description: string;
  positive: boolean;
}

export interface Ingredient {
  id: number;
  name: string;
  type: IngredientType;
  icon: string;
  color: string;
  effects: Effect[];
}

export interface Potion {
  color: string;
  ingredients: Ingredient[];
  effects: string[];
}
