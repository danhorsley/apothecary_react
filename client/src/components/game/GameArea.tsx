import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cauldron from './Cauldron';
import Container from './Container';
import Notebook from './Notebook';
import ResultDisplay from './ResultDisplay';
import { useAlchemy } from '../../lib/stores/useAlchemy';
import { toast } from 'sonner';
import { useAudio } from '../../lib/stores/useAudio';
import { IngredientType } from '../../types/alchemy';

const GameArea = () => {
  const { playHit, playSuccess } = useAudio();
  const { 
    currentPotion,
    currentIngredients, 
    resetCauldron,
    tastePotion,
    gameOver,
    resetGame,
    level,
    experience,
    experienceToNextLevel
  } = useAlchemy();
  
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [potionResults, setPotionResults] = useState<string[]>([]);
  
  // Handle tasting the potion
  const handleTastePotion = () => {
    if (currentIngredients.length === 0) {
      toast.error("Your cauldron is empty! Add some ingredients first.");
      return;
    }
    
    playHit();
    const effects = tastePotion();
    setPotionResults(effects);
    setShowResults(true);
  };
  
  // Reset the cauldron
  const handleResetCauldron = () => {
    playHit();
    resetCauldron();
    setShowResults(false);
  };
  
  // Toggle notebook
  const toggleNotebook = () => {
    playHit();
    setIsNotebookOpen(!isNotebookOpen);
  };
  
  // Start a new game if game over
  const handleNewGame = () => {
    playSuccess();
    resetGame();
  };
  
  // Calculate experience bar width
  const experienceBarWidth = `${(experience / experienceToNextLevel) * 100}%`;
  
  return (
    <div className="h-full w-full flex flex-col items-center justify-between p-4 relative">
      {/* Top Stats Bar */}
      <div className="w-full flex justify-between items-center py-2 px-4 bg-indigo-900 rounded-lg text-white shadow-lg mb-4">
        <div className="flex items-center">
          <span className="text-xl font-bold">Level: {level}</span>
        </div>
        <div className="w-1/2 h-4 bg-indigo-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-400" 
            style={{ width: experienceBarWidth }}
          ></div>
        </div>
        <div>
          <span className="text-sm">XP: {experience}/{experienceToNextLevel}</span>
        </div>
      </div>
      
      {/* Main Game Area */}
      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between">
        {/* Ingredient Containers */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-1/4">
          <Container type={IngredientType.HERB} />
          <Container type={IngredientType.MINERAL} />
          <Container type={IngredientType.SPIRIT} />
          <Container type={IngredientType.ANIMAL} />
        </div>
        
        {/* Cauldron Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative my-4 md:my-0">
          <Cauldron />
          
          {/* Buttons */}
          <div className="flex mt-4 space-x-4">
            <motion.button
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTastePotion}
              disabled={currentIngredients.length === 0}
            >
              Taste Potion
            </motion.button>
            
            <motion.button
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetCauldron}
            >
              Reset Cauldron
            </motion.button>
          </div>
          
          {/* Current Potion Info */}
          {currentPotion && (
            <div className="mt-4 p-2 bg-indigo-100 rounded-lg border-2 border-indigo-300">
              <p className="text-center font-medium">
                Current Mix: {currentIngredients.map(i => i.name).join(", ")}
              </p>
            </div>
          )}
        </div>
        
        {/* Notebook Toggle */}
        <div className="w-full md:w-1/4 flex justify-center">
          <motion.button
            className="px-6 py-3 bg-amber-600 text-white rounded-lg shadow-lg font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleNotebook}
          >
            {isNotebookOpen ? 'Close Notebook' : 'Open Notebook'}
          </motion.button>
        </div>
      </div>
      
      {/* Notebook Overlay */}
      {isNotebookOpen && (
        <Notebook onClose={() => setIsNotebookOpen(false)} />
      )}
      
      {/* Results Display */}
      {showResults && (
        <ResultDisplay 
          effects={potionResults} 
          onClose={() => setShowResults(false)} 
        />
      )}
      
      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white p-8 rounded-lg max-w-md text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-red-600">Game Over!</h2>
            <p className="mb-4 text-gray-700">
              You reached level {level} and discovered many alchemical secrets.
            </p>
            <motion.button
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewGame}
            >
              Start New Game
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GameArea;
