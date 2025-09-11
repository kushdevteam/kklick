import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { setSoundEnabled, isSoundEnabled, startBackgroundMusic, setBackgroundMusicEnabled, isBackgroundMusicEnabled } from '@/lib/game-utils';

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    
    // Enhanced background music initialization with better browser compatibility
    const initBackgroundMusic = () => {
      if (isSoundEnabled() && isBackgroundMusicEnabled()) {
        console.log('🎵 Initializing background music...');
        setTimeout(() => startBackgroundMusic(), 1500); // Increased delay for better compatibility
      }
    };

    // Start music on user interaction to comply with browser autoplay policies
    const handleUserInteraction = () => {
      initBackgroundMusic();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const toggleSound = () => {
    const newSoundState = !soundOn;
    setSoundOn(newSoundState);
    setSoundEnabled(newSoundState);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      className={`touch-action-manipulation mobile-optimized ${className}`}
      data-testid={`button-sound-${soundOn ? 'on' : 'off'}`}
      title={soundOn ? 'Turn sound off' : 'Turn sound on'}
    >
      {soundOn ? (
        <Volume2 className="h-5 w-5 text-primary" />
      ) : (
        <VolumeX className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  );
}

export default SoundToggle;