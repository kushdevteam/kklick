import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { isValidSolanaAddress } from '@/lib/solana-config';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  reward?: number;
  action?: string;
  completed: boolean;
}

interface NewUserTutorialProps {
  refetchGameState: () => Promise<void>;
}

export default function NewUserTutorial({ refetchGameState }: NewUserTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>([]);
  const [walletAddress, setWalletAddress] = useState('');
  
  // Get player ID from localStorage
  const playerId = localStorage.getItem('kushKlickerPlayerId');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch player data and upgrades
  const { data: gameState } = useQuery({
    queryKey: ['/api/players', playerId],
    enabled: !!playerId,
  });

  const { data: playerUpgrades = [] } = useQuery({
    queryKey: ['/api/players', playerId, 'upgrades'],
    enabled: !!playerId,
  });

  const initialSteps: TutorialStep[] = [
    {
      id: 1,
      title: "Welcome to KushKlicker!",
      description: "Welcome to the ultimate cannabis-themed incremental game! Let's get you started on your journey to KUSH mastery.",
      icon: "fa-seedling",
      completed: false
    },
    {
      id: 2,
      title: "Make Your First Click",
      description: "Click the big KUSH button to earn your first tokens. Each click earns you KUSH!",
      icon: "fa-mouse-pointer",
      reward: 10,
      action: "click",
      completed: false
    },
    {
      id: 3,
      title: "Link Your Wallet (Required)",
      description: "Connect your Solana wallet to receive real token rewards. This is required to continue!",
      icon: "fa-wallet",
      reward: 500,
      action: "wallet",
      completed: false
    },
    {
      id: 4,
      title: "Check Your Stats",
      description: "Look at your stats panel to see your total KUSH, clicks, and earning power.",
      icon: "fa-chart-line",
      completed: false
    },
    {
      id: 5,
      title: "Buy Your First Upgrade",
      description: "Use your KUSH to buy upgrades that increase your earning power. Visit the Upgrades section!",
      icon: "fa-arrow-up",
      reward: 100,
      action: "upgrade",
      completed: false
    },
    {
      id: 6,
      title: "Complete an Achievement",
      description: "Check the Achievements section and complete your first achievement for bonus rewards!",
      icon: "fa-trophy",
      reward: 1000,
      completed: false
    },
    {
      id: 7,
      title: "Tutorial Complete!",
      description: "Congratulations! You've completed the tutorial. Here's a bonus to get you started!",
      icon: "fa-star",
      reward: 5000,
      completed: false
    }
  ];

  useEffect(() => {
    // Check if tutorial is completed in database - only show if not completed
    if (gameState && !gameState.tutorialCompleted) {
      setShowTutorial(true);
      setTutorialSteps(initialSteps);
    } else if (gameState?.tutorialCompleted) {
      setShowTutorial(false);
    }
  }, [gameState?.tutorialCompleted]);

  useEffect(() => {
    if (gameState && tutorialSteps.length > 0) {
      let shouldUpdate = false;
      const updatedSteps = tutorialSteps.map((step, index) => {
        // Step 2: First click - complete when user has clicked or manually progressed
        if (index === 1 && gameState.totalClicks > 0 && !step.completed) {
          shouldUpdate = true;
          if (currentStep === 1) {
            setTimeout(() => handleStepComplete(1), 100);
          }
          return { ...step, completed: true };
        }
        
        // Step 3: Wallet linked (now required step 3)
        if (index === 2 && gameState.walletLinked && !step.completed) {
          shouldUpdate = true;
          if (currentStep === 2) {
            setTimeout(() => handleStepComplete(2), 100);
          }
          return { ...step, completed: true };
        }
        
        // Step 4: Check stats (auto-complete after wallet linked)
        if (index === 3 && gameState.walletLinked && !step.completed) {
          shouldUpdate = true;
          if (currentStep === 3) {
            setTimeout(() => handleStepComplete(3), 2000);
          }
          return { ...step, completed: true };
        }
        
        // Step 5: First upgrade purchased
        if (index === 4 && playerUpgrades.length > 0 && !step.completed) {
          shouldUpdate = true;
          if (currentStep === 4) {
            setTimeout(() => handleStepComplete(4), 100);
          }
          return { ...step, completed: true };
        }
        
        return step;
      });
      
      if (shouldUpdate) {
        setTutorialSteps(updatedSteps);
      }
    }
  }, [gameState?.totalClicks, gameState?.walletLinked, playerUpgrades?.length]);

  const handleStepComplete = async (stepIndex: number) => {
    const step = tutorialSteps[stepIndex];
    
    if (step.reward && gameState?.id) {
      try {
        const response = await fetch('/api/players/tutorial-reward', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerId: gameState.id,
            reward: step.reward,
            stepId: step.id
          })
        });
        
        if (response.ok) {
          toast({
            title: "Tutorial Reward!",
            description: `Earned ${step.reward} KUSH for completing: ${step.title}`,
            duration: 3000,
          });
          refetchGameState();
        }
      } catch (error) {
        console.error('Failed to claim tutorial reward:', error);
      }
    }
    
    // Move to next step
    if (stepIndex < tutorialSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    } else {
      // Tutorial complete
      completeTutorial();
    }
  };

  const completeTutorial = async () => {
    try {
      const response = await fetch(`/api/players/${gameState.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutorialCompleted: true })
      });
      
      if (response.ok) {
        toast({
          title: "🎉 Tutorial Complete!",
          description: "You're now ready to build your KUSH empire! Keep clicking and upgrading!",
          duration: 5000,
        });
        refetchGameState(); // Refresh to get updated tutorialCompleted status
        setShowTutorial(false);
      }
    } catch (error) {
      console.error('Failed to mark tutorial as completed:', error);
    }
  };

  const skipTutorial = async () => {
    try {
      const response = await fetch(`/api/players/${gameState.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutorialCompleted: true })
      });
      
      if (response.ok) {
        refetchGameState(); // Refresh to get updated tutorialCompleted status
        setShowTutorial(false);
      }
    } catch (error) {
      console.error('Failed to mark tutorial as completed:', error);
    }
  };

  // Wallet linking mutation for tutorial
  const linkWalletMutation = useMutation({
    mutationFn: async (walletAddr: string) => {
      const response = await fetch(`/api/players/${gameState.id}/link-wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: walletAddr }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to link wallet');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "✅ Wallet Linked!",
        description: "Your Solana wallet has been linked! You can now earn real token rewards.",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
      refetchGameState();
    },
    onError: (error: any) => {
      toast({
        title: "❌ Linking Failed",
        description: error.message || "Failed to link wallet address.",
        variant: "destructive",
      });
    },
  });

  const handleLinkWallet = () => {
    if (!walletAddress.trim()) {
      toast({
        title: "❌ Invalid Address",
        description: "Please enter a valid Solana wallet address.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidSolanaAddress(walletAddress.trim())) {
      toast({
        title: "❌ Invalid Format",
        description: "Please enter a valid Solana wallet address (32-44 characters).",
        variant: "destructive",
      });
      return;
    }
    
    linkWalletMutation.mutate(walletAddress.trim());
  };

  const handleNextStep = () => {
    // For wallet step, ensure wallet is linked before proceeding
    if (currentStep === 2 && !gameState.walletLinked) {
      toast({
        title: "⚠️ Wallet Required",
        description: "Please link your Solana wallet to continue with the tutorial.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  if (!showTutorial || !tutorialSteps.length) {
    return null;
  }

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-primary shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full">
            <i className={`fas ${step.icon} text-2xl text-primary`}></i>
          </div>
          <CardTitle className="text-xl font-bold">
            Step {currentStep + 1} of {tutorialSteps.length}
          </CardTitle>
          <CardDescription>
            {step.title}
          </CardDescription>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {step.description}
          </p>
          
          {/* Wallet linking form for step 3 */}
          {step.action === 'wallet' && !gameState.walletLinked && (
            <div className="space-y-3">
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <i className="fas fa-info-circle text-accent text-sm mt-0.5"></i>
                  <div className="text-xs text-foreground">
                    <p><strong>Required:</strong> Enter your Solana wallet address to receive real token rewards for achievements and milestones.</p>
                    <p className="mt-1"><strong>Security:</strong> This can only be set once for security reasons.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter your Solana wallet address..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="text-sm"
                  data-testid="input-wallet-address"
                />
                <Button 
                  onClick={handleLinkWallet}
                  disabled={linkWalletMutation.isPending || !walletAddress.trim()}
                  className="w-full"
                  data-testid="button-link-wallet"
                >
                  {linkWalletMutation.isPending ? 'Linking...' : 'Link Wallet'}
                </Button>
              </div>
            </div>
          )}
          
          {/* Show success message if wallet is already linked */}
          {step.action === 'wallet' && gameState.walletLinked && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 text-primary">
                <i className="fas fa-check-circle"></i>
                <span className="font-medium">✅ Wallet Successfully Linked!</span>
              </div>
            </div>
          )}
          
          {step.reward && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <i className="fas fa-gift text-primary"></i>
                <span className="font-medium">Reward: {step.reward} KUSH</span>
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            {/* Only allow skipping after wallet is linked */}
            {gameState.walletLinked && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={skipTutorial}
              >
                Skip Tutorial
              </Button>
            )}
            <Button 
              className={!gameState.walletLinked ? 'w-full' : 'flex-1'}
              onClick={handleNextStep}
              disabled={step.action === 'wallet' && !step.completed}
            >
              {currentStep === tutorialSteps.length - 1 ? 'Complete!' : 
               step.action === 'wallet' && !step.completed ? 'Waiting...' : 'Next'}
            </Button>
          </div>
          
          {step.action === 'wallet' && !step.completed && (
            <p className="text-xs text-center text-muted-foreground">
              Complete the action above to continue automatically
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}