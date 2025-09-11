import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { playClickSound, playBonusSound, playLevelUpSound } from "@/lib/game-utils";

interface MainClickerProps {
  gameState: {
    id: string;
    totalKush: number;
    perClickMultiplier: number;
  };
  onClickEffect: (x: number, y: number, value: number, options?: {
    type?: 'critical' | 'normal',
    combo?: number,
    pattern?: string
  }) => void;
}

export default function MainClicker({ gameState, onClickEffect }: MainClickerProps) {
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: string; type: string; velocity: { vx: number; vy: number } }>>([]);
  const [clickCount, setClickCount] = useState(0);
  const [comboActive, setComboActive] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const clickMutation = useMutation({
    mutationFn: async () => {
      if (!gameState.id) {
        throw new Error('Player ID not available');
      }
      const response = await apiRequest('POST', `/api/players/${gameState.id}/enhanced-click`);
      return response.json();
    },
    onSuccess: (data) => {
      // Update the game state in cache  
      queryClient.setQueryData(['/api/players', gameState.id], data.player);
      
      // Handle enhanced click results
      if (data.isCritical) {
        // Play special critical hit sound
        playBonusSound();
        toast({
          title: "💥 CRITICAL HIT!",
          description: `Earned ${data.kushEarned} KUSH! (${data.comboMultiplier.toFixed(1)}x combo)`,
          className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-300",
        });
      }
      
      if (data.specialPattern) {
        toast({
          title: `🌟 ${data.specialPattern}`,
          description: `Amazing clicking streak! Bonus rewards unlocked!`,
          className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-300",
        });
      }
      
      // Enhanced visual effects will be triggered by handleClick
    },
    onError: (error) => {
      console.error('Enhanced click error:', error);
      toast({
        title: "Click Error",
        description: "Failed to process click. Please try again.",
        variant: "destructive",
      });
    }
  });

  const createParticles = (relativeX: number, relativeY: number) => {
    const particleCount = comboActive ? 16 : 10;
    const newParticles: Array<{ id: number; x: number; y: number; size: string; type: string; velocity: { vx: number; vy: number } }> = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * 2 * Math.PI + Math.random() * 0.5;
      const distance = 35 + Math.random() * (comboActive ? 80 : 50);
      const x = relativeX + Math.cos(angle) * distance;
      const y = relativeY + Math.sin(angle) * distance;
      
      // Enhanced particle variety
      const particleTypes = ['cannabis', 'star', 'sparkle', 'coin'];
      const type = comboActive ? particleTypes[Math.floor(Math.random() * particleTypes.length)] : 'cannabis';
      const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.3 ? 'medium' : 'small';
      
      // Add velocity for dynamic movement
      const velocity = {
        vx: (Math.cos(angle) * (2 + Math.random() * 3)) * (comboActive ? 1.5 : 1),
        vy: (Math.sin(angle) * (2 + Math.random() * 3)) * (comboActive ? 1.5 : 1) - Math.random() * 2
      };
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        size,
        type,
        velocity
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, comboActive ? 1500 : 1000);
  };

  const createRipple = (x: number, y: number) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  // Enhanced mobile touch support with immediate feedback
  const handleTouch = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default touch behavior
    
    // Immediate visual feedback for responsiveness
    setIsClicking(true);
    
    if (clickMutation.isPending) {
      setTimeout(() => setIsClicking(false), 100);
      return;
    }
    
    // Prevent click if gameState.id is not available
    if (!gameState.id) {
      console.error('Player ID not available, cannot process click');
      toast({
        title: "Game Loading",
        description: "Please wait for the game to fully load before clicking.",
        variant: "destructive",
      });
      return;
    }

    // Enhanced audio and haptic feedback for mobile
    playClickSound(comboActive);
    
    // Smarter vibration patterns
    if ('vibrate' in navigator) {
      if (comboActive) {
        navigator.vibrate([30, 10, 20]); // Combo pattern
      } else {
        navigator.vibrate(25); // Standard click
      }
    }
    setClickCount(prev => prev + 1);
    
    // Activate combo effect after 5 quick clicks
    if (clickCount > 0 && clickCount % 5 === 0) {
      setComboActive(true);
      setTimeout(() => setComboActive(false), 2000);
    }
    
    setTimeout(() => setIsClicking(false), 300);

    // Get touch position for enhanced effects
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0] || event.changedTouches[0];
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relativeX = rect.width / 2;
    const relativeY = rect.height / 2;
    
    // Create visual effects with proper positioning
    createParticles(relativeX, relativeY);
    createRipple(relativeX, relativeY);
    onClickEffect(centerX, centerY, gameState.perClickMultiplier);
    
    // Process the enhanced click
    clickMutation.mutate();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (clickMutation.isPending) return;
    
    // Prevent click if gameState.id is not available
    if (!gameState.id) {
      console.error('Player ID not available, cannot process click');
      toast({
        title: "Game Loading",
        description: "Please wait for the game to fully load before clicking.",
        variant: "destructive",
      });
      return;
    }

    setIsClicking(true);
    setClickCount(prev => prev + 1);
    
    // Activate combo effect after 5 quick clicks
    if (clickCount > 0 && clickCount % 5 === 0) {
      setComboActive(true);
      setTimeout(() => setComboActive(false), 2000);
    }
    
    setTimeout(() => setIsClicking(false), 300);

    // Audio feedback for desktop clicks
    playClickSound(comboActive);

    // Get click position for enhanced effects
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relativeX = rect.width / 2;
    const relativeY = rect.height / 2;
    
    // Create visual effects with proper positioning
    createParticles(relativeX, relativeY);
    createRipple(relativeX, relativeY);
    onClickEffect(centerX, centerY, gameState.perClickMultiplier);
    
    // Process the enhanced click
    clickMutation.mutate();
  };

  return (
    <div className="text-center mb-8">
      {/* Floating Kush Counter */}
      <div className="relative inline-block mb-4">
        <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
          +{gameState.perClickMultiplier}
        </div>
        
        {/* Main Kush Button with Enhanced Effects */}
        <div className="relative">
          <button
            onClick={handleClick}
            onTouchStart={handleTouch}
            disabled={clickMutation.isPending}
            className={`kush-button w-48 h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center text-white font-bold text-xl md:text-2xl shadow-2xl relative overflow-hidden animate-float hover:animate-glow touch-action-manipulation mobile-optimized mobile-button-enhanced ${
              isClicking ? 'enhanced-click' : ''
            } ${comboActive ? 'animate-glow' : ''} ${clickMutation.isPending ? 'opacity-70' : ''} transition-all duration-200`}
            data-testid="button-main-kush"
          >
            {clickMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full w-12 h-12 border-2 border-white border-t-transparent mb-2 relative z-10"></div>
                <span className="text-lg md:text-xl relative z-10 animate-pulse">Processing...</span>
              </>
            ) : (
              <>
                <img src="/favicon.png?v=092025" alt="KUSH Character" className="w-12 h-12 md:w-16 md:h-16 mb-2 relative z-10 object-contain" />
                <span className="text-lg md:text-xl relative z-10">KUSH</span>
              </>
            )}
            
            {/* Enhanced click overlay with combo effects */}
            <div className={`absolute inset-0 rounded-full bg-white/20 transition-transform duration-300 ${
              isClicking ? 'scale-110' : 'scale-0'
            } ${comboActive ? 'bg-accent/30' : ''}`}></div>
            
            {/* Combo indicator */}
            {comboActive && (
              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce z-20">
                🔥
              </div>
            )}
            
            {/* Ripple effects */}
            {ripples.map(ripple => (
              <div
                key={ripple.id}
                className="absolute w-4 h-4 border-2 border-accent rounded-full animate-ripple"
                style={{
                  left: ripple.x - 8,
                  top: ripple.y - 8,
                }}
              />
            ))}
          </button>
          
          {/* Enhanced particle burst effects */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className={`particle particle-${particle.type} ${particle.size} animate-enhanced-particle-burst`}
              style={{
                left: particle.x - 4,
                top: particle.y - 4,
                animationDelay: `${Math.random() * 0.2}s`,
                animationDuration: comboActive ? '1.5s' : '1s'
              }}
            >
              {particle.type === 'cannabis' && '🌿'}
              {particle.type === 'star' && '⭐'}
              {particle.type === 'sparkle' && '✨'}
              {particle.type === 'coin' && '🪙'}
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-primary mb-2 animate-fade-in-up" data-testid="text-clicker-title">
        🌿 Kush Klicker
      </h3>
    </div>
  );
}
