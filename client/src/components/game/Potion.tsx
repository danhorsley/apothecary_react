import { motion } from 'framer-motion';

interface PotionProps {
  color: string;
  name: string;
  onClick?: () => void;
}

const Potion = ({ color, name, onClick }: PotionProps) => {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <svg 
        width="40" 
        height="60" 
        viewBox="0 0 40 60" 
        className="drop-shadow-md"
      >
        {/* Bottle neck */}
        <rect x="16" y="0" width="8" height="10" fill="#333" rx="2" />
        
        {/* Cork */}
        <rect x="14" y="5" width="12" height="6" fill="#8B4513" rx="1" />
        
        {/* Bottle body */}
        <path
          d="M10,15 C10,12 30,12 30,15 L28,50 C28,55 12,55 12,50 L10,15"
          fill="#f0f0f0"
          stroke="#ddd"
          strokeWidth="1"
        />
        
        {/* Potion liquid */}
        <path
          d="M12,20 C12,18 28,18 28,20 L26,48 C26,52 14,52 14,48 L12,20"
          fill={color}
          opacity="0.8"
        />
        
        {/* Shine */}
        <ellipse cx="18" cy="25" rx="2" ry="5" fill="white" opacity="0.5" />
      </svg>
      
      <span className="text-xs font-medium mt-1 text-center">{name}</span>
    </motion.div>
  );
};

export default Potion;
