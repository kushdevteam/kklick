import WalletRegistration from './wallet-registration';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { SolanaNetwork } from '@/lib/solana-config';

interface WalletSectionProps {
  gameState: {
    id: string;
    totalKush: number;
    claimableTokens: number;
    telegramUserId?: string | null;
    discordUserId?: string | null;
    username: string;
    walletAddress?: string | null;
    solanaNetwork?: SolanaNetwork;
    walletSyncEnabled?: boolean;
  };
}

export default function WalletSection({ gameState }: WalletSectionProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // Fetch live token balance
  const { data: balanceData, isLoading: balanceLoading, refetch: refetchBalance } = useQuery({
    queryKey: ['/api/players', gameState.id, 'token-balance'],
    enabled: !!gameState.walletAddress,
    refetchInterval: 120000, // Refetch every 2 minutes (reduced from 30s to save RPC calls)
  });

  // Manual refresh mutation
  const refreshMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/players/${gameState.id}/refresh-balance`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Balance Updated",
        description: `Fresh balance: ${data.balance} $KUSH tokens`,
      });
      setLastUpdated(Date.now());
      // Refresh the balance query
      refetchBalance();
    },
    onError: (error: any) => {
      toast({
        title: "Refresh Failed",
        description: error.message || "Failed to refresh balance",
        variant: "destructive"
      });
    }
  });

  // WebSocket listener for real-time balance updates
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).io) {
      const socket = (window as any).io();
      
      socket.on('balanceUpdate', (update: any) => {
        if (update.playerId === gameState.id || update.walletAddress === gameState.walletAddress) {
          setLastUpdated(update.timestamp);
          // Invalidate balance query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id, 'token-balance'] });
          
          toast({
            title: "Balance Updated",
            description: `New balance: ${update.balance} $KUSH tokens`,
          });
        }
      });

      return () => {
        socket.off('balanceUpdate');
      };
    }
  }, [gameState.id, gameState.walletAddress, queryClient, toast]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-wallet text-blue-400 text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-wallet-title">Wallet & Account</h2>
      </div>

      <WalletRegistration gameState={{
        ...gameState,
        walletAddress: gameState.walletAddress || null,
        solanaNetwork: gameState.solanaNetwork || "devnet",
        telegramUserId: gameState.telegramUserId || null,
        discordUserId: gameState.discordUserId || null,
      }} />

      {/* Live Token Balance Display */}
      {gameState.walletAddress && (
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-coins text-green-500 text-xl"></i>
              <div>
                <h4 className="font-semibold text-green-500 mb-1">Live Token Balance</h4>
                <div className="flex items-center space-x-2">
                  {balanceLoading ? (
                    <div className="animate-pulse">
                      <div className="h-6 w-24 bg-muted rounded"></div>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-foreground">
                      {(balanceData as any)?.balance || 0} $KUSH
                    </p>
                  )}
                  {(balanceData as any)?.cached && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded">
                      Cached
                    </span>
                  )}
                </div>
                {lastUpdated && (
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={() => refreshMutation.mutate()}
              disabled={refreshMutation.isPending}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              data-testid="button-refresh-balance"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
              {refreshMutation.isPending ? 'Updating...' : 'Refresh'}
            </Button>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <p>💡 Balance updates automatically every 30 seconds</p>
            <p>🔄 Click refresh for instant on-chain verification</p>
          </div>
        </div>
      )}


      {/* Network Warning */}
      <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="fas fa-exclamation-triangle text-destructive text-lg mt-0.5"></i>
          <div>
            <h4 className="font-semibold text-destructive mb-2">⚠️ IMPORTANT: Solana Network Only</h4>
            <ul className="text-sm text-foreground space-y-1">
              <li>• Only send tokens on the <strong>Solana</strong> network</li>
              <li>• Do NOT send tokens from other networks (Ethereum, BSC, etc.)</li>
              <li>• Sending from wrong networks will result in permanent loss</li>
              <li>• Always verify the network before making any transactions</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
