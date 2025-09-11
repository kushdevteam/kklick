import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

interface EnhancedWalletProps {
  playerId: string;
}

export default function EnhancedWallet({ playerId }: EnhancedWalletProps) {
  const [selectedToken, setSelectedToken] = useState<'kush' | 'seeds'>('kush');

  // Get in-game wallet data (SEEDS, etc.)
  const { data: wallet } = useQuery({
    queryKey: ['wallet', playerId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${playerId}/wallet`);
      return response.json();
    },
    enabled: !!playerId,
  });

  // Get real on-chain $KUSH token balance  
  const { data: tokenBalance } = useQuery({
    queryKey: ['/api/players', playerId, 'token-balance'],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${playerId}/token-balance`);
      return response.json();
    },
    enabled: !!playerId,
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  if (!wallet) return <div className="animate-pulse bg-card/50 h-32 rounded-xl"></div>;

  // Use on-chain balance for KUSH, fallback to 0 if no wallet linked
  const onChainKushBalance = tokenBalance?.hasWallet ? tokenBalance.balance : 0;

  return (
    <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-primary/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">💰 Multi-Token Wallet</h3>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setSelectedToken('kush')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${
              selectedToken === 'kush' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            KUSH
          </button>
          <button
            onClick={() => setSelectedToken('seeds')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${
              selectedToken === 'seeds' 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            SEEDS
          </button>
        </div>
      </div>

      {selectedToken === 'kush' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <i className="fas fa-cannabis text-primary"></i>
              </div>
              <div>
                <p className="text-sm font-medium">$KUSH Balance</p>
                <p className="text-2xl font-bold text-primary">{formatNumber(onChainKushBalance)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-muted/50 p-2 rounded-lg">
              <p className="text-muted-foreground">Wallet Status</p>
              <p className="font-semibold">{tokenBalance?.hasWallet ? 'Linked ✅' : 'Not Linked ❌'}</p>
            </div>
            <div className="bg-muted/50 p-2 rounded-lg">
              <p className="text-muted-foreground">Network</p>
              <p className="font-semibold">Solana</p>
            </div>
          </div>

          {!tokenBalance?.hasWallet && (
            <div className="text-center text-xs text-muted-foreground bg-primary/5 p-2 rounded-lg">
              💡 Link your Solana wallet to see real $KUSH token balance
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <i className="fas fa-seedling text-accent"></i>
              </div>
              <div>
                <p className="text-sm font-medium">SEEDS Balance</p>
                <p className="text-2xl font-bold text-accent">{formatNumber(wallet.seedsBalance)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="bg-muted/50 p-2 rounded-lg">
              <p className="text-muted-foreground">Total Earned SEEDS</p>
              <p className="font-semibold">{formatNumber(wallet.totalEarnedSeeds)}</p>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground bg-accent/5 p-2 rounded-lg">
            💡 SEEDS are earned through challenges and special events
          </div>
        </div>
      )}
    </div>
  );
}