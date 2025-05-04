import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { Ingredient } from '../../types/alchemy';
import { useAlchemy } from '../../lib/stores/useAlchemy';

interface DraggableIngredientProps {
  ingredient: Ingredient;
}

const DraggableIngredient = ({ ingredient }: DraggableIngredientProps) => {
  const { isIngredientDiscovered } = useAlchemy();
  
  // Calculate how many effects have been discovered
  const discoveredCount = ingredient.effects.filter(effect => 
    isIngredientDiscovered(ingredient.id, effect.id)
  ).length;
  
  // Set up drag source
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  return (
    <motion.div
      ref={drag}
      className={`
        cursor-grab active:cursor-grabbing rounded-lg p-2
        border-2 border-${ingredient.color.replace('rgba(', '').replace(')', '')}
        bg-white shadow-md
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'white',
        borderColor: ingredient.color
      }}
    >
      <div className="flex flex-col items-center">
        <div 
          className="w-10 h-10 rounded-full mb-1 flex items-center justify-center text-xl"
          style={{ backgroundColor: ingredient.color }}
        >
          {ingredient.icon}
        </div>
        <span className="text-xs font-medium text-center">{ingredient.name}</span>
        
        {/* Discovery progress */}
        <div className="w-full mt-1 flex justify-center">
          <div className="flex space-x-1">
            {ingredient.effects.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${index < discoveredCount ? 'bg-green-500' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DraggableIngredient;
