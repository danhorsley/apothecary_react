import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAlchemy } from '../../lib/stores/useAlchemy';
import { IngredientType, Ingredient, Effect } from '../../types/alchemy';

interface NotebookProps {
  onClose: () => void;
}

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ label, isActive, onClick }: TabProps) => (
  <button
    className={`px-4 py-2 rounded-t-lg font-medium transition-colors
      ${isActive 
        ? 'bg-amber-200 text-amber-900 border-b-0' 
        : 'bg-amber-100 text-amber-700 hover:bg-amber-50'}`
    }
    onClick={onClick}
  >
    {label}
  </button>
);

const Notebook = ({ onClose }: NotebookProps) => {
  const [activeTab, setActiveTab] = useState<IngredientType>(IngredientType.HERB);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { 
    getIngredientsByType, 
    getDiscoveriesForIngredient,
    getDiscoveredEffects,
    discoveredEffectsCount,
    totalEffectsCount
  } = useAlchemy();
  
  const ingredients = getIngredientsByType(activeTab);
  const discoveredEffects = getDiscoveredEffects();
  
  // Auto-scroll to bottom on new discoveries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [discoveredEffectsCount]);
  
  // Helper function to determine if all effects for an ingredient are discovered
  const areAllEffectsDiscovered = (ingredient: Ingredient) => {
    const discoveries = getDiscoveriesForIngredient(ingredient.id);
    return discoveries.length === ingredient.effects.length;
  };
  
  // Progress percentage
  const progressPercentage = Math.round((discoveredEffectsCount / totalEffectsCount) * 100);
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-amber-50 w-11/12 max-w-4xl h-5/6 rounded-lg shadow-2xl flex flex-col"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        {/* Notebook Header */}
        <div className="bg-amber-800 text-amber-50 px-6 py-4 rounded-t-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Alchemist's Notebook</h2>
            <p className="text-amber-200">
              Discoveries: {discoveredEffectsCount}/{totalEffectsCount} ({progressPercentage}%)
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-amber-700 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-amber-300">
          <Tab 
            label="Herbs" 
            isActive={activeTab === IngredientType.HERB} 
            onClick={() => setActiveTab(IngredientType.HERB)} 
          />
          <Tab 
            label="Minerals" 
            isActive={activeTab === IngredientType.MINERAL} 
            onClick={() => setActiveTab(IngredientType.MINERAL)} 
          />
          <Tab 
            label="Spirits" 
            isActive={activeTab === IngredientType.SPIRIT} 
            onClick={() => setActiveTab(IngredientType.SPIRIT)} 
          />
          <Tab 
            label="Animal Products" 
            isActive={activeTab === IngredientType.ANIMAL} 
            onClick={() => setActiveTab(IngredientType.ANIMAL)} 
          />
        </div>
        
        {/* Notebook Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 bg-amber-50 space-y-4"
        >
          {ingredients.map((ingredient) => (
            <div 
              key={ingredient.id} 
              className="bg-white rounded-lg p-4 shadow border border-amber-200"
            >
              <div className="flex items-center mb-2">
                <div 
                  className="w-10 h-10 rounded-full mr-3 flex items-center justify-center text-xl"
                  style={{ backgroundColor: ingredient.color }}
                >
                  {ingredient.icon}
                </div>
                <div>
                  <h3 className="font-bold text-amber-900">{ingredient.name}</h3>
                  <p className="text-xs text-amber-700">
                    {areAllEffectsDiscovered(ingredient) 
                      ? 'All effects discovered!' 
                      : 'Keep experimenting to discover more effects'}
                  </p>
                </div>
              </div>
              
              <div className="ml-6 mt-2 space-y-2">
                {ingredient.effects.map((effect) => {
                  const isDiscovered = getDiscoveriesForIngredient(ingredient.id).includes(effect.id);
                  
                  return (
                    <div 
                      key={effect.id} 
                      className={`p-2 rounded border ${isDiscovered ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                    >
                      {isDiscovered ? (
                        <div className="flex items-center">
                          <span className="mr-2 text-green-500">✓</span>
                          <div>
                            <p className="font-medium">{effect.name}</p>
                            <p className="text-sm text-gray-600">{effect.description}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="mr-2">❓</span>
                          <p className="italic text-gray-400">Undiscovered effect</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent Discoveries */}
        <div className="bg-amber-100 p-4 border-t border-amber-300">
          <h3 className="font-bold text-amber-900 mb-2">Recent Discoveries</h3>
          <div className="max-h-28 overflow-y-auto">
            {discoveredEffects.length > 0 ? (
              <ul className="space-y-1">
                {discoveredEffects.slice(-5).reverse().map((discovery, i) => (
                  <li key={i} className="text-sm text-amber-900 flex items-center">
                    <span className="mr-2 text-amber-500">•</span>
                    {discovery.ingredientName}: {discovery.effectName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-amber-700">
                No discoveries yet. Mix ingredients to learn their effects!
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Notebook;
