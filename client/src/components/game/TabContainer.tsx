import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import { IngredientType } from '../../types/alchemy';

interface TabContainerProps {
  types: IngredientType[];
}

const TabContainer = ({ types }: TabContainerProps) => {
  const [activeTab, setActiveTab] = useState<IngredientType>(types[0]);
  
  // Get icon and color for tab
  const getTabStyle = (type: IngredientType) => {
    switch (type) {
      case IngredientType.HERB:
        return { icon: '🌿', color: 'bg-green-500', activeColor: 'bg-green-600' };
      case IngredientType.MINERAL:
        return { icon: '💎', color: 'bg-gray-500', activeColor: 'bg-gray-600' };
      case IngredientType.SPIRIT:
        return { icon: '✨', color: 'bg-blue-500', activeColor: 'bg-blue-600' };
      case IngredientType.ANIMAL:
        return { icon: '🐾', color: 'bg-red-500', activeColor: 'bg-red-600' };
      default:
        return { icon: '📦', color: 'bg-purple-500', activeColor: 'bg-purple-600' };
    }
  };
  
  return (
    <div className="w-full flex flex-col p-1">
      {/* Tabs */}
      <div className="flex space-x-1 mb-2">
        {types.map(type => {
          const { icon, color, activeColor } = getTabStyle(type);
          const isActive = activeTab === type;
          
          return (
            <motion.button
              key={type}
              className={`flex-1 py-2 px-3 rounded-t-lg text-white font-medium flex items-center justify-center space-x-1 ${isActive ? activeColor : color} ${isActive ? 'shadow-md' : 'opacity-70'}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(type)}
            >
              <span>{icon}</span>
              <span className="hidden md:inline">{type}</span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <Container type={activeTab} />
      </div>
    </div>
  );
};

export default TabContainer;