import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Potion from './Potion';
import { useAlchemy } from '../../lib/stores/useAlchemy';

interface ResultDisplayProps {
  effects: string[];
  onClose: () => void;
}

const ResultDisplay = ({ effects, onClose }: ResultDisplayProps) => {
  const [showAll, setShowAll] = useState(false);
  const { currentPotion } = useAlchemy();
  
  useEffect(() => {
    // Auto-reveal all effects after 2 seconds
    const timer = setTimeout(() => {
      setShowAll(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get potion color
  const potionColor = currentPotion?.color || 'rgba(100, 100, 255, 0.8)';
  
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white w-11/12 max-w-lg rounded-xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        {/* Header */}
        <div className="bg-indigo-800 text-white px-6 py-4">
          <h2 className="text-xl font-bold">Potion Results</h2>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex mb-6">
            <div className="mr-4">
              <Potion 
                color={potionColor} 
                name="Your Potion"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">You tasted the potion...</h3>
              <p className="text-gray-600 text-sm mb-4">
                After drinking your concoction, you experience the following effects:
              </p>
            </div>
          </div>
          
          {/* Effects list */}
          <ul className="space-y-2 mb-6">
            {effects.map((effect, index) => (
              <motion.li
                key={index}
                className="p-3 bg-indigo-50 rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: showAll || index < 2 ? 1 : 0.3, 
                  x: 0 
                }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-indigo-500 text-lg">•</span>
                  <span className={showAll || index < 2 ? 'text-gray-800' : 'blur-sm text-gray-400'}>
                    {effect}
                  </span>
                </div>
              </motion.li>
            ))}
            
            {!showAll && effects.length > 2 && (
              <div className="text-center">
                <motion.button
                  className="text-indigo-600 font-medium"
                  onClick={() => setShowAll(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reveal all effects...
                </motion.button>
              </div>
            )}
          </ul>
          
          {/* Button */}
          <div className="flex justify-end">
            <motion.button
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow font-medium"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Brewing
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultDisplay;
