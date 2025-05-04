import { memo } from 'react';
import { motion } from 'framer-motion';
import { Ingredient as IngredientType } from '../../types/alchemy';

interface IngredientProps {
  ingredient: IngredientType;
  discovered?: boolean;
}

const Ingredient = ({ ingredient, discovered = false }: IngredientProps) => {
  return (
    <motion.div
      className={`
        p-2 rounded-lg border-2 flex items-center
        ${discovered ? 'bg-white' : 'bg-gray-100'} 
      `}
      style={{ borderColor: ingredient.color }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="w-8 h-8 rounded-full mr-2 flex items-center justify-center text-lg"
        style={{ backgroundColor: ingredient.color }}
      >
        {ingredient.icon}
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-sm">{ingredient.name}</span>
        <span className="text-xs text-gray-500">{ingredient.type}</span>
      </div>
    </motion.div>
  );
};

export default memo(Ingredient);
