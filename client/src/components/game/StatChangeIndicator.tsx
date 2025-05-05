import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatChangeIndicatorProps {
  value: number;
  position: 'health' | 'xp';
}

const StatChangeIndicator = ({ value, position }: StatChangeIndicatorProps) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Define position based on the stat type
  const yPosition = position === 'health' ? '105px' : '60px';
  const xPosition = position === 'health' ? '75%' : '75%';
  
  // Determine text color by value
  const textColor = value >= 0 ? 'text-green-400' : 'text-red-500';
  const prefix = value >= 0 ? '+' : '';
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`absolute font-bold ${textColor}`}
          style={{
            top: yPosition,
            right: xPosition,
            zIndex: 40
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -20 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {prefix}{value}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatChangeIndicator;
