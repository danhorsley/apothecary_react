import { useMemo } from 'react';
import { motion } from 'framer-motion';
import DraggableIngredient from './DraggableIngredient';
import { useAlchemy } from '../../lib/stores/useAlchemy';
import { Ingredient, IngredientType } from '../../types/alchemy';

interface ContainerProps {
  type: IngredientType;
  className?: string;
}

const Container = ({ type, className = '' }: ContainerProps) => {
  const { getIngredientsByType } = useAlchemy();
  
  // Get ingredients of this type
  const ingredients = useMemo(() => getIngredientsByType(type), [getIngredientsByType, type]);
  
  // Get container properties based on type
  const getContainerProps = () => {
    switch (type) {
      case IngredientType.HERB:
        return {
          title: 'Herbs',
          color: 'bg-green-100',
          border: 'border-green-500',
          icon: '🌿'
        };
      case IngredientType.MINERAL:
        return {
          title: 'Minerals',
          color: 'bg-gray-100',
          border: 'border-gray-500',
          icon: '💎'
        };
      case IngredientType.SPIRIT:
        return {
          title: 'Spirits',
          color: 'bg-blue-100',
          border: 'border-blue-500',
          icon: '✨'
        };
      case IngredientType.ANIMAL:
        return {
          title: 'Animal Products',
          color: 'bg-red-100',
          border: 'border-red-500',
          icon: '🐾'
        };
      default:
        return {
          title: 'Ingredients',
          color: 'bg-purple-100',
          border: 'border-purple-500',
          icon: '📦'
        };
    }
  };
  
  const containerProps = getContainerProps();
  
  return (
    <motion.div
      className={`rounded-lg ${containerProps.color} ${containerProps.border} border-2 p-2 shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2 border-b-2 pb-1 border-gray-300">
        <h3 className="font-bold text-gray-800 flex items-center">
          <span className="mr-2">{containerProps.icon}</span>
          {containerProps.title}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-1 p-1 max-h-64 overflow-y-auto">
        {ingredients.map((ingredient: Ingredient) => (
          <DraggableIngredient 
            key={ingredient.id} 
            ingredient={ingredient} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Container;
