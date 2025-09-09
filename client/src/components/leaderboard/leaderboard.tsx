import { useQuery } from "@tanstack/react-query";
import { formatNumber } from "@/lib/game-utils";

type Player = {
  id: string;
  username: string;
  totalKush: number;
  totalClicks: number;
};

export default function Leaderboard() {
  const { data: players = [], isLoading } = useQuery<Player[]>({
    queryKey: ['/api/leaderboard'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center space-x-3 mb-6">
          <i className="fas fa-trophy text-primary text-2xl"></i>
          <h2 className="text-2xl font-bold text-foreground">Leaderboard</h2>
        </div>
        <div className="bg-card rounded-xl p-8 text-center border border-border">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getPlayerBadge = (player: Player) => {
    if (player.totalKush >= 1000) return { text: '🔥 LEGENDARY', color: 'bg-red-600' };
    if (player.totalKush >= 100) return { text: '📈 GROWING', color: 'bg-blue-600' };
    if (player.totalKush >= 10) return { text: '🌱 SPROUTING', color: 'bg-green-600' };
    return { text: '🌱 NEWBIE', color: 'bg-gray-600' };
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-trophy text-primary text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-leaderboard-title">Leaderboard</h2>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 text-center">
          <i className="fas fa-trophy text-yellow-100 text-xl mr-2"></i>
          <span className="text-yellow-100 font-bold">TOP PLAYERS</span>
          <i className="fas fa-trophy text-yellow-100 text-xl ml-2"></i>
        </div>
        
        <div className="p-4">
          <div className="text-center text-primary font-medium text-sm mb-4">Elite Kush Masters</div>
          
          {players.length === 0 ? (
            <div className="text-center py-8">
              <i className="fas fa-users text-4xl text-muted-foreground mb-3"></i>
              <p className="text-muted-foreground">No players yet. Be the first to join!</p>
            </div>
          ) : (
            players.map((player: Player, index: number) => {
              const badge = getPlayerBadge(player);
              const rankIcon = getRankIcon(index);
              
              return (
                <div key={player.id} className="gradient-border mb-3" data-testid={`leaderboard-player-${index}`}>
                  <div className="gradient-border-inner p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500 text-yellow-900' :
                          index === 1 ? 'bg-gray-400 text-gray-800' :
                          index === 2 ? 'bg-orange-500 text-orange-100' :
                          'bg-primary text-primary-foreground'
                        }`}>
                          {typeof rankIcon === 'string' && rankIcon.startsWith('#') ? rankIcon.slice(1) : rankIcon}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground" data-testid={`text-player-name-${index}`}>
                            @{player.username}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <i className="fas fa-mouse-pointer mr-1"></i>
                            <span data-testid={`text-player-clicks-${index}`}>{formatNumber(player.totalClicks)} clicks</span>
                            <span className={`text-white px-2 py-0.5 rounded-full ml-2 text-xs ${badge.color}`}>
                              {badge.text}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${
                          index === 0 ? 'text-yellow-400' : 'text-foreground'
                        }`} data-testid={`text-player-kush-${index}`}>
                          {formatNumber(player.totalKush)}
                        </div>
                        <div className="text-xs text-primary flex items-center">
                          <i className="fas fa-cannabis mr-1"></i>
                          <span>TOTAL KUSH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-primary/10 p-4 text-center border-t border-border">
          <div className="text-primary text-sm">
            <i className="fas fa-bolt mr-1"></i>
            Live Rankings • Updated Real-time • Climb to Glory!
            <i className="fas fa-bolt ml-1"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
