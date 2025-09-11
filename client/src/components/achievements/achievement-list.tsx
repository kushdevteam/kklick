import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "@/lib/game-utils";
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { playAchievementSound } from "@/lib/game-utils";
import { AchievementsSkeleton } from "@/components/ui/skeleton";

type Achievement = {
  id: string;
  name: string;
  description: string;
  requirement: number;
  requirementType: string;
  reward: number;
  icon: string;
  progress: number;
  completed: boolean;
  completedAt?: Date | null;
};

interface AchievementListProps {
  gameState: {
    id: string;
  };
}

export default function AchievementList({ gameState }: AchievementListProps) {
  const { toast } = useToast();
  const [newlyCompleted, setNewlyCompleted] = useState<Set<string>>(new Set());
  const [previousCompletedIds, setPreviousCompletedIds] = useState<Set<string>>(new Set());
  
  const { data: achievements = [], isLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/players', gameState.id, 'achievements'],
  });

  // Detect newly completed achievements - MUST be called before any early returns
  useEffect(() => {
    if (achievements.length === 0) return; // Prevent infinite loop on empty achievements
    
    const currentCompleted = new Set(achievements.filter(a => a.completed).map(a => a.id));
    const newCompletions = Array.from(currentCompleted).filter(id => !previousCompletedIds.has(id));
    
    if (newCompletions.length > 0) {
      setNewlyCompleted(new Set(newCompletions));
      
      // Show celebration toast for new achievements
      newCompletions.forEach(achievementId => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          // Play celebratory sound and show achievement toast
          playAchievementSound();
          toast({
            title: `🏆 Achievement Unlocked!`,
            description: `${achievement.name} - Earned ${formatNumber(achievement.reward)} KUSH bonus!`,
            className: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-yellow-300 animate-achievement-unlock",
          });
        }
      });
      
      // Clear newly completed after animation
      setTimeout(() => {
        setNewlyCompleted(new Set());
      }, 2000);
    }
    
    // Only update previous completed when there are actual changes
    if (currentCompleted.size !== previousCompletedIds.size || 
        Array.from(currentCompleted).some(id => !previousCompletedIds.has(id))) {
      setPreviousCompletedIds(currentCompleted);
    }
  }, [achievements, toast]); // Removed previousCompletedIds from deps to prevent infinite loop

  // Show skeleton loading while data is loading - AFTER all hooks
  if (isLoading) {
    return <AchievementsSkeleton />;
  }

  const completedCount = achievements.filter(a => a.completed).length;
  const inProgressCount = achievements.filter(a => !a.completed && a.progress > 0).length;
  const lockedCount = achievements.filter(a => !a.completed && a.progress === 0).length;

  const getProgressPercentage = (achievement: Achievement) => {
    return Math.min((achievement.progress / achievement.requirement) * 100, 100);
  };

  const getStatusInfo = (achievement: Achievement) => {
    if (achievement.completed) {
      return { status: 'COMPLETED', className: 'bg-primary text-primary-foreground', icon: '✓' };
    } else if (achievement.progress > 0) {
      return { status: 'PROGRESS', className: 'bg-accent text-accent-foreground', icon: '⚡' };
    } else {
      return { status: 'LOCKED', className: 'bg-muted text-muted-foreground', icon: '🔒' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-trophy text-primary text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-achievements-title">
          Achievements ({achievements.length})
        </h2>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-completed">
          <div className="text-2xl font-bold text-primary" data-testid="text-completed-count">{completedCount}</div>
          <div className="text-muted-foreground text-sm">Completed</div>
        </div>
        <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-progress">
          <div className="text-2xl font-bold text-accent" data-testid="text-progress-count">{inProgressCount}</div>
          <div className="text-muted-foreground text-sm">In Progress</div>
        </div>
        <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-locked">
          <div className="text-2xl font-bold text-muted-foreground" data-testid="text-locked-count">{lockedCount}</div>
          <div className="text-muted-foreground text-sm">Locked</div>
        </div>
      </div>

      {/* Achievement List */}
      <div className="space-y-4">
        {achievements.map((achievement: Achievement) => {
          const statusInfo = getStatusInfo(achievement);
          const progressPercentage = getProgressPercentage(achievement);
          const borderClass = achievement.completed ? 'border-primary/50' : 
                             achievement.progress > 0 ? 'border-accent/50' : 'border-muted';

          return (
            <div key={achievement.id} className={`bg-card rounded-xl p-4 border ${borderClass} transition-all duration-300 hover:scale-[1.02] ${
              newlyCompleted.has(achievement.id) ? 'animate-achievement-unlock ring-2 ring-yellow-400/50 shadow-lg shadow-yellow-400/20' : ''
            } ${achievement.completed ? 'hover:shadow-lg hover:shadow-primary/20' : ''}`} data-testid={`achievement-${achievement.id}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    achievement.completed ? 'bg-primary animate-pulse' : 
                    achievement.progress > 0 ? 'bg-accent' : 'bg-muted'
                  } ${newlyCompleted.has(achievement.id) ? 'animate-bounce scale-110' : ''}`}>
                    <i className={`${achievement.icon} ${
                      achievement.completed ? 'text-primary-foreground' : 
                      achievement.progress > 0 ? 'text-accent-foreground' : 'text-muted-foreground'
                    }`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground" data-testid={`text-achievement-name-${achievement.id}`}>
                      {achievement.name}
                    </h3>
                    <div className="text-xs text-muted-foreground mb-1" data-testid={`text-achievement-progress-${achievement.id}`}>
                      {formatNumber(achievement.progress)} / {formatNumber(achievement.requirement)} {achievement.requirementType.replace('_', ' ')}
                    </div>
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          achievement.completed ? 'bg-primary' : 
                          achievement.progress > 0 ? 'bg-accent' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${statusInfo.className} transition-all duration-300 ${
                  newlyCompleted.has(achievement.id) ? 'animate-bounce scale-110 shadow-lg' : ''
                } ${achievement.completed ? 'animate-pulse' : ''}`} data-testid={`status-achievement-${achievement.id}`}>
                  {newlyCompleted.has(achievement.id) ? '🎉 UNLOCKED!' : `${statusInfo.icon} ${statusInfo.status}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <i className="fas fa-trophy text-primary mr-2"></i>
        <span className="text-muted-foreground text-sm">Complete achievements to earn $KUSH tokens and boost your progress!</span>
      </div>
    </div>
  );
}
