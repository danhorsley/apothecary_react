import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGame } from '../../lib/stores/useGame';
import { useAudio } from '../../lib/stores/useAudio';

const TitleScreen = () => {
  const { start } = useGame();
  const { playSuccess } = useAudio();
  const [sparklePosition, setSparklePosition] = useState<{x: number, y: number, size?: number}[]>([]);
  
  // Generate random sparkle positions
  useEffect(() => {
    const newSparkles = [];
    for (let i = 0; i < 50; i++) {
      // Distribute sparkles around the title and throughout the screen
      const isAroundTitle = Math.random() > 0.4; // 60% chance to be around title
      
      newSparkles.push({
        x: Math.random() * 100,
        y: isAroundTitle ? (80 + Math.random() * 10) : (Math.random() * 100),
        size: Math.random() * 0.5 + 0.5 // Random size between 0.5 and 1
      });
    }
    setSparklePosition(newSparkles);
    
    // Regenerate sparkles every 1.5 seconds for animation effect
    const interval = setInterval(() => {
      const newSparkles = [];
      for (let i = 0; i < 50; i++) {
        const isAroundTitle = Math.random() > 0.4;
        newSparkles.push({
          x: Math.random() * 100,
          y: isAroundTitle ? (80 + Math.random() * 10) : (Math.random() * 100),
          size: Math.random() * 0.5 + 0.5
        });
      }
      setSparklePosition(newSparkles);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleStart = () => {
    playSuccess();
    start();
  };
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-between bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-emerald-900 to-gray-900">
        {/* Gradient background instead of image */}
        <div className="absolute inset-0 bg-[url('/images/alchemist.png')] bg-center bg-cover bg-no-repeat opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      </div>
      
      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-between h-full w-full p-8">
        {/* Top */}
        <div className="w-full">
          {/* Optional top content */}
        </div>
        
        {/* Bottom - Title and Button */}
        <div className="w-full flex flex-col items-center mb-12">
          {/* Sparkles */}
          {sparklePosition.map((pos, index) => (
            <motion.div 
              key={index}
              className="absolute bg-yellow-300 rounded-full"
              style={{ 
                left: `${pos.x}%`, 
                top: `${pos.y}%`,
                width: `${pos.size || 1}px`,
                height: `${pos.size || 1}px`,
                boxShadow: `0 0 ${5 + (pos.size || 1) * 5}px ${1 + (pos.size || 1)}px rgba(255, 215, 0, 0.7)`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
          
          {/* Title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300"
            style={{
              textShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)',
              fontFamily: '"Cinzel", serif'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: [
                '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)',
                '0 0 15px rgba(255, 215, 0, 0.9), 0 0 25px rgba(255, 215, 0, 0.7), 0 0 35px rgba(255, 215, 0, 0.5)',
                '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)'
              ]
            }}
            transition={{ 
              duration: 1.5, 
              delay: 0.5,
              textShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            APOTHECARY
          </motion.h1>
          
          {/* Start Button */}
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-green-800 to-green-900 text-yellow-300 rounded-lg shadow-lg font-bold text-xl border-2 border-yellow-500/50"
            style={{
              boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Begin Your Journey
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;