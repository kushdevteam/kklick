import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: string }>>([]);
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
    const particleCount = comboActive ? 12 : 8;
    const newParticles: Array<{ id: number; x: number; y: number; size: string }> = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * 2 * Math.PI;
      const distance = 30 + Math.random() * (comboActive ? 60 : 40);
      const x = relativeX + Math.cos(angle) * distance;
      const y = relativeY + Math.sin(angle) * distance;
      const size = Math.random() > 0.5 ? 'small' : 'large';
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        size
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, comboActive ? 1200 : 800);
  };

  const createRipple = (x: number, y: number) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
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
            disabled={clickMutation.isPending}
            className={`kush-button w-48 h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center text-white font-bold text-xl md:text-2xl shadow-2xl relative overflow-hidden animate-float hover:animate-glow touch-action-manipulation ${
              isClicking ? 'enhanced-click' : ''
            } ${comboActive ? 'animate-glow' : ''} ${clickMutation.isPending ? 'opacity-70' : ''} transition-all duration-200`}
            data-testid="button-main-kush"
          >
            <i className="fas fa-cannabis text-4xl md:text-6xl mb-2 relative z-10"></i>
            <span className="text-lg md:text-xl relative z-10">KUSH</span>
            
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
          
          {/* Particle burst effects */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className={`particle ${particle.size} animate-particle-burst`}
              style={{
                left: particle.x - 4,
                top: particle.y - 4,
              }}
            />
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-primary mb-2 animate-fade-in-up" data-testid="text-clicker-title">
        🌿 Kush Klicker
      </h3>
    </div>
  );
}
