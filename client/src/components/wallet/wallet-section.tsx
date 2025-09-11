import WalletRegistration from './wallet-registration';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Edit3, User, Save, X } from 'lucide-react';
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
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(gameState.username);

  // Update newUsername when gameState.username changes
  useEffect(() => {
    setNewUsername(gameState.username);
  }, [gameState.username]);

  // Fetch live token balance
  const { data: balanceData, isLoading: balanceLoading, refetch: refetchBalance } = useQuery({
    queryKey: ['/api/players', gameState.id, 'token-balance'],
    enabled: !!gameState.walletAddress,
    refetchInterval: 120000, // Refetch every 2 minutes (reduced from 30s to save RPC calls)
  });

  // Username change mutation
  const changeUsernameMutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await apiRequest('POST', `/api/players/${gameState.id}/change-username`, {
        username: username.trim()
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Username Updated",
        description: `Username changed to: ${data.username}`,
      });
      setIsEditingUsername(false);
      // Refresh player data
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Username Change Failed",
        description: error.message || "Failed to change username",
        variant: "destructive"
      });
      setNewUsername(gameState.username); // Reset to original
    }
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

  const handleUsernameChange = () => {
    if (newUsername.trim() === gameState.username) {
      setIsEditingUsername(false);
      return;
    }
    
    if (!newUsername.trim()) {
      toast({
        title: "Invalid Username",
        description: "Username cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    if (newUsername.trim().length < 3) {
      toast({
        title: "Invalid Username",
        description: "Username must be at least 3 characters long",
        variant: "destructive"
      });
      return;
    }
    
    changeUsernameMutation.mutate(newUsername.trim());
  };

  const handleCancelEdit = () => {
    setNewUsername(gameState.username);
    setIsEditingUsername(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-wallet text-blue-400 text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-wallet-title">Wallet & Account</h2>
      </div>

      {/* Username Management */}
      <Card className="bg-card/50 border-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <span>Account Settings</span>
          </CardTitle>
          <CardDescription>
            Customize your display name and manage your account preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Display Username
            </label>
            {isEditingUsername ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="flex-1"
                  maxLength={20}
                  disabled={changeUsernameMutation.isPending}
                  data-testid="input-new-username"
                />
                <Button
                  size="sm"
                  onClick={handleUsernameChange}
                  disabled={changeUsernameMutation.isPending || !newUsername.trim()}
                  className="bg-green-600 hover:bg-green-700"
                  data-testid="button-save-username"
                >
                  {changeUsernameMutation.isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={changeUsernameMutation.isPending}
                  data-testid="button-cancel-username"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground" data-testid="text-current-username">
                    {gameState.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This is how you appear on leaderboards and to other players
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingUsername(true)}
                  data-testid="button-edit-username"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Change
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
