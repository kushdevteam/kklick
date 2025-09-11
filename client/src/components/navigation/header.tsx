import { useState, useEffect } from "react";
import logoUrl from "@/assets/character-logo.png";
import { Link } from 'wouter';
import { SoundToggle } from "@/components/ui/sound-toggle";
import { startBackgroundMusic, isSoundEnabled, isBackgroundMusicEnabled } from "@/lib/game-utils";

type GameSection = 'game' | 'upgrades' | 'achievements' | 'leaderboard' | 'wallet' | 'referral';

interface HeaderProps {
  currentSection?: GameSection;
  onSectionChange?: (section: GameSection) => void;
}

export default function Header({ currentSection, onSectionChange }: HeaderProps = {}) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Start background music when header loads (app initialization)
  useEffect(() => {
    const initializeBackgroundMusic = () => {
      if (isSoundEnabled() && isBackgroundMusicEnabled()) {
        setTimeout(() => startBackgroundMusic(), 2000); // Delay for user interaction
      }
    };

    // Listen for first user interaction to start audio
    const handleUserInteraction = () => {
      initializeBackgroundMusic();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection process
    setTimeout(() => {
      setWalletConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border" data-testid="header">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src={`${logoUrl}?v=092025`} alt="KushKlicker Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground" data-testid="text-game-title">Kush Klicker</h1>
              <p className="text-xs text-muted-foreground">Cannabis Mining Game</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <button 
                onClick={() => onSectionChange?.('upgrades')}
                className={`transition-colors ${currentSection === 'upgrades' ? 'text-primary' : 'text-primary hover:text-primary/80'}`} 
                data-testid="link-features"
              >
                <i className="fas fa-zap mr-1"></i> Upgrades
              </button>
              <button 
                onClick={() => onSectionChange?.('wallet')}
                className={`transition-colors ${currentSection === 'wallet' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} 
                data-testid="link-wallet"
              >
                <i className="fas fa-wallet mr-1"></i> Wallet
              </button>
              <Link href="/whitepaper">
                <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-whitepaper">
                  <i className="fas fa-file-alt mr-1"></i> Docs
                </button>
              </Link>
            </div>
            
            {/* Sound Toggle */}
            <SoundToggle className="ml-2" />
          </div>
        </div>
      </div>
    </header>
  );
}
