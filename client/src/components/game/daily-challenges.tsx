import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface DailyChallengesProps {
  playerId: string;
}

export default function DailyChallenges({ playerId }: DailyChallengesProps) {
  const { data: challenges } = useQuery({
    queryKey: ['daily-challenges', playerId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${playerId}/daily-challenges`);
      return response.json();
    },
    enabled: !!playerId,
    refetchInterval: 30000, // Refetch every 30 seconds to update progress
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'hard': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  if (!challenges) return <div className="animate-pulse bg-card/50 h-48 rounded-xl"></div>;

  return (
    <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-accent/20 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center">
          <i className="fas fa-tasks text-white text-sm"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">🎯 Daily Challenges</h3>
          <p className="text-xs text-muted-foreground">Reset daily at midnight</p>
        </div>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge: any) => (
          <div 
            key={challenge.id} 
            className={`p-4 rounded-lg border transition-all ${
              challenge.completed 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-muted/30 border-border hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{challenge.icon}</span>
                <h4 className="font-semibold text-sm">{challenge.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>
              {challenge.completed && (
                <div className="text-green-400">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-3">{challenge.description}</p>

            <div className="space-y-2">
              {/* Progress Bar */}
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    challenge.completed 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-accent to-accent/80'
                  }`}
                  style={{ width: `${getProgressPercentage(challenge.progress, challenge.targetValue)}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Progress: {challenge.progress.toLocaleString()} / {challenge.targetValue.toLocaleString()}
                </span>
                <div className="flex items-center space-x-2">
                  {challenge.kushReward > 0 && (
                    <span className="text-primary font-medium">
                      +{challenge.kushReward} KUSH
                    </span>
                  )}
                  {challenge.seedsReward > 0 && (
                    <span className="text-accent font-medium">
                      +{challenge.seedsReward} SEEDS
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {challenges.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-clock text-2xl text-muted-foreground mb-2"></i>
            <p className="text-muted-foreground text-sm">New challenges coming soon!</p>
          </div>
        )}
      </div>

      {/* Daily Reset Timer */}
      <div className="mt-4 text-center">
        <div className="bg-accent/10 rounded-lg p-2 border border-accent/20">
          <p className="text-xs text-accent font-medium">
            ⏰ Challenges reset in {
              new Date(24 * 60 * 60 * 1000 - Date.now() % (24 * 60 * 60 * 1000))
                .toISOString().substr(11, 8)
            }
          </p>
        </div>
      </div>
    </div>
  );
}