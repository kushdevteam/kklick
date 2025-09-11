import { formatNumber } from "@/lib/game-utils";
import { useQuery } from '@tanstack/react-query';
import { calculateLevel, getLevelDisplayText, canPrestige } from "@shared/leveling-utils";

interface TokenBalanceResponse {
  balance: number;
  hasWallet: boolean;
  walletAddress?: string;
}

interface StatsDisplayProps {
  gameState: {
    id: string;
    totalKush: number;
    perClickMultiplier: number;
    autoIncomePerHour: number;
    walletAddress?: string | null;
    level?: number;
    prestige?: number;
    totalEarnedKush?: number;
  };
}

export default function StatsDisplay({ gameState }: StatsDisplayProps) {
  const perHourDisplay = Math.floor(gameState.autoIncomePerHour);
  const autoIncomeDisplay = gameState.autoIncomePerHour > 0 ? `${formatNumber(perHourDisplay)}/hr` : '0/hr';
  
  // Calculate level based on total earned Points
  const calculatedLevel = calculateLevel(gameState.totalEarnedKush || gameState.totalKush);
  const level = gameState.level || calculatedLevel;
  const prestige = gameState.prestige || 0;
  const levelDisplayText = getLevelDisplayText(level, prestige);
  const prestigeUnlocked = canPrestige(level);
  const walletLinked = !!(gameState.walletAddress);

  // Fetch on-chain token balance
  const { data: tokenBalance, isLoading: isBalanceLoading } = useQuery<TokenBalanceResponse>({
    queryKey: ['/api/players', gameState.id, 'token-balance'],
    enabled: !!gameState.id && gameState.walletLinked,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-total-points">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-star text-primary"></i>
          <span className="text-primary font-medium text-sm">Points</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-total-points">
          {formatNumber(gameState.totalKush)}
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-per-click">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-hand-pointer text-accent"></i>
          <span className="text-accent font-medium text-sm">Per Click</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-per-click">
          {formatNumber(gameState.perClickMultiplier)}
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-per-hour">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-clock text-yellow-500"></i>
          <span className="text-yellow-500 font-medium text-sm">Per Hour</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-per-hour">
          {formatNumber(perHourDisplay)}
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-auto-income">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-robot text-blue-500"></i>
          <span className="text-blue-500 font-medium text-sm">Auto Income</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-auto-income">
          {autoIncomeDisplay}
        </div>
      </div>
      
      {/* Level & Prestige */}
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-level">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className={`fas ${prestigeUnlocked ? 'fa-crown' : 'fa-star'} ${prestige > 0 ? 'text-purple-500' : 'text-green-500'}`}></i>
          <span className={`${prestige > 0 ? 'text-purple-500' : 'text-green-500'} font-medium text-sm`}>
            {prestige > 0 ? 'Prestige' : 'Level'}
          </span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-level">
          {levelDisplayText}
        </div>
        {prestigeUnlocked && prestige === 0 && (
          <div className="text-xs text-purple-400 mt-1">
            Prestige Ready!
          </div>
        )}
      </div>

      {/* On-chain $KUSH Balance - only show if wallet is linked */}
      {walletLinked && (
        <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-token-balance">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <i className="fas fa-coins text-orange-500"></i>
            <span className="text-orange-500 font-medium text-sm">On-chain $KUSH</span>
          </div>
          <div className="text-2xl font-bold text-foreground" data-testid="text-token-balance">
            {isBalanceLoading ? (
              <div className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin text-lg"></i>
              </div>
            ) : (
              formatNumber(tokenBalance?.balance || 0)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
