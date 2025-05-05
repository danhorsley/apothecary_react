import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { useAlchemy } from '../../lib/stores/useAlchemy';
import { Ingredient } from '../../types/alchemy';
import { useAudio } from '../../lib/stores/useAudio';

const Cauldron = () => {
  const { addIngredient, currentIngredients } = useAlchemy();
  const { playHit } = useAudio();
  
  // Set up drop target for ingredients
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: { ingredient: Ingredient }) => {
      addIngredient(item.ingredient);
      playHit();
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  
  // Determine cauldron styling based on state
  const getBubbleColor = () => {
    if (currentIngredients.length === 0) return 'rgba(100, 100, 255, 0.6)';
    
    // Mix colors based on ingredients
    if (currentIngredients.length === 1) {
      return currentIngredients[0].color;
    }
    
    // Simple color mixing
    return `rgba(${Math.min(currentIngredients.length * 50, 255)}, 
                 ${Math.min(currentIngredients.length * 30, 255)}, 
                 ${Math.min(currentIngredients.length * 70, 255)}, 0.8)`;
  };
  
  return (
    <div className="relative">
      {/* Cauldron SVG */}
      <motion.div
        ref={drop}
        className="relative"
        animate={{ 
          scale: isOver ? 1.05 : 1,
          rotate: isOver ? [0, -1, 1, -1, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }}
      >
        <svg 
          width="160" 
          height="144" 
          viewBox="0 0 200 180" 
          className={`${isOver && canDrop ? 'drop-shadow-2xl' : 'drop-shadow-lg'} sm:w-[180px] sm:h-[162px] md:w-[200px] md:h-[180px]`}
        >
          {/* Cauldron legs */}
          <rect x="40" y="160" width="10" height="20" fill="#333" rx="2" />
          <rect x="150" y="160" width="10" height="20" fill="#333" rx="2" />
          
          {/* Cauldron base */}
          <ellipse cx="100" cy="160" rx="70" ry="10" fill="#222" />
          
          {/* Cauldron body */}
          <path 
            d="M30,80 C30,40 170,40 170,80 L160,160 C160,160 40,160 40,160 L30,80" 
            fill="#444"
            stroke="#222"
            strokeWidth="4"
          />
          
          {/* Cauldron top rim */}
          <ellipse cx="100" cy="80" rx="70" ry="15" fill="#222" />
          
          {/* Cauldron interior */}
          <ellipse cx="100" cy="80" rx="60" ry="12" fill="#111" />
          
          {/* Potion liquid */}
          <ellipse 
            cx="100" 
            cy="80" 
            rx="55" 
            ry="10" 
            fill={getBubbleColor()}
            className="animate-pulse" 
          />
          
          {/* Bubbles */}
          {currentIngredients.length > 0 && (
            <>
              <circle cx="85" cy="75" r="4" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{animationDuration: '1.5s'}} />
              <circle cx="110" cy="78" r="3" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{animationDuration: '2s'}} />
              <circle cx="95" cy="72" r="5" fill="rgba(255,255,255,0.7)" className="animate-ping" style={{animationDuration: '2.5s'}} />
            </>
          )}
          
          {/* Handles */}
          <path 
            d="M30,90 C10,90 10,120 30,120" 
            fill="none"
            stroke="#222"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path 
            d="M170,90 C190,90 190,120 170,120" 
            fill="none"
            stroke="#222"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Flames */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
          <div className="relative w-32 sm:w-36 md:w-40 h-8 sm:h-9 md:h-10">
            <motion.div 
              className="absolute bottom-0 left-[30%] w-6 sm:w-7 md:w-8 h-10 sm:h-12 md:h-14 bg-red-500 rounded-t-full"
              animate={{ height: [10, 14, 10, 14, 10] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <motion.div 
              className="absolute bottom-0 left-[45%] w-7 sm:w-8 md:w-10 h-14 sm:h-16 md:h-20 bg-orange-500 rounded-t-full"
              animate={{ height: [14, 18, 14, 18, 14] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.div 
              className="absolute bottom-0 left-[60%] w-6 sm:w-7 md:w-8 h-10 sm:h-12 md:h-14 bg-yellow-500 rounded-t-full"
              animate={{ height: [10, 12, 10] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Drop indicator */}
      {isOver && canDrop && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white font-bold text-xl bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            Drop to Add
          </div>
        </div>
      )}
    </div>
  );
};

export default Cauldron;
