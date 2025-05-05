import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import GameArea from './components/game/GameArea';
import TitleScreen from './components/game/TitleScreen';
import { useAudio } from './lib/stores/useAudio';
import { useGame } from './lib/stores/useGame';

function App() {
  // Initialize audio and game state
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();
  const { phase } = useGame();
  
  useEffect(() => {
    // Set up background music
    const bgMusic = new Audio('/sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);
    
    // Set up sound effects
    const hitSound = new Audio('/sounds/hit.mp3');
    const successSound = new Audio('/sounds/success.mp3');
    setHitSound(hitSound);
    setSuccessSound(successSound);
    
    // Play background music when user interacts with the page
    const playMusic = () => {
      bgMusic.play().catch(err => console.log('Audio playback prevented:', err));
      document.removeEventListener('click', playMusic);
    };
    
    document.addEventListener('click', playMusic);
    
    return () => {
      document.removeEventListener('click', playMusic);
      bgMusic.pause();
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen w-screen overflow-hidden font-sans">
          {phase === 'ready' ? (
            <TitleScreen />
          ) : (
            <div className="bg-indigo-50">
              <GameArea />
            </div>
          )}
          <Toaster position="top-center" />
        </div>
      </DndProvider>
    </QueryClientProvider>
  );
}

export default App;
