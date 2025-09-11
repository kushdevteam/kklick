import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Coins, TrendingUp, Clock, Gift, Zap, ExternalLink, Flame, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { SolanaNetwork } from '@/lib/solana-config';

interface TokenDashboardProps {
  gameState: {
    id: string;
    walletAddress: string | null;
    solanaNetwork: SolanaNetwork;
    totalKush: number;
    totalClicks: number;
  };
}

interface TokenSummary {
  totalEarned: number;
  totalClaimed: number;
  pendingClaims: number;
  recentPayouts: Array<{
    id: string;
    amount: number;
    reason: string;
    status: string;
    createdAt: string;
    transactionSignature?: string;
  }>;
}

interface PendingPayout {
  id: string;
  playerId: string;
  walletAddress: string;
  amount: number;
  reason: string;
  network: string;
  status: string;
  createdAt: string;
}

interface PayoutData {
  payouts: PendingPayout[];
  totalClaimable: number;
  hasWallet: boolean;
  walletAddress: string | null;
}

// Token Claiming Interface Component
function TokenClaimingInterface({ gameState }: { gameState: TokenDashboardProps['gameState'] }) {
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Fetch pending payouts using the new API
  const { data: payoutData, isLoading: payoutsLoading } = useQuery<PayoutData>({
    queryKey: [`/api/players/${gameState.id}/pending-payouts`],
    enabled: !!gameState.id,
  });
  
  // Claim request mutation
  const claimMutation = useMutation({
    mutationFn: async (payoutIds: string[]) => {
      return apiRequest('POST', `/api/players/${gameState.id}/request-claim`, {
        payoutIds,
        message: 'Player requested token claim'
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Claim Request Submitted!",
        description: `${data.totalAmount} KUSH tokens requested. Processing time: ${data.estimatedProcessingTime}`,
      });
      setSelectedPayouts([]);
      queryClient.invalidateQueries({ queryKey: [`/api/players/${gameState.id}/pending-payouts`] });
    },
    onError: (error: any) => {
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to submit claim request",
        variant: "destructive",
      });
    }
  });
  
  const handleSelectPayout = (payoutId: string) => {
    setSelectedPayouts(prev => 
      prev.includes(payoutId) 
        ? prev.filter(id => id !== payoutId)
        : [...prev, payoutId]
    );
  };
  
  const handleSelectAll = () => {
    if (!payoutData?.payouts) return;
    setSelectedPayouts(
      selectedPayouts.length === payoutData.payouts.length 
        ? [] 
        : payoutData.payouts.map((p: PendingPayout) => p.id)
    );
  };
  
  const handleClaimSelected = () => {
    if (selectedPayouts.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one reward to claim",
        variant: "destructive",
      });
      return;
    }
    
    claimMutation.mutate(selectedPayouts);
  };

  const selectedTotal = payoutData?.payouts
    ?.filter((p: PendingPayout) => selectedPayouts.includes(p.id))
    ?.reduce((sum: number, p: PendingPayout) => sum + p.amount, 0) || 0;

  if (payoutsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            🎁 Claim Your $KUSH Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          🎁 Claim Your $KUSH Tokens
        </CardTitle>
        <CardDescription>
          {payoutData?.hasWallet 
            ? "Select pending rewards to submit claim requests"
            : "Link your wallet to claim token rewards"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wallet Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Wallet Status:</span>
          <Badge variant={payoutData?.hasWallet ? "default" : "secondary"}>
            {payoutData?.hasWallet ? "Linked" : "Not Linked"}
          </Badge>
        </div>

        {/* Wallet Address */}
        {payoutData?.walletAddress && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Linked Wallet:</p>
            <p className="font-mono text-xs truncate" data-testid="wallet-address">
              {payoutData.walletAddress}
            </p>
          </div>
        )}

        {/* Total Claimable */}
        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            Claimable $KUSH:
          </span>
          <span className="font-bold text-green-800 dark:text-green-200 text-xl" data-testid="total-claimable">
            {payoutData?.totalClaimable?.toLocaleString() || 0}
          </span>
        </div>

        {/* Pending Payouts List */}
        {payoutData?.payouts && payoutData.payouts.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Pending Rewards</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSelectAll}
                data-testid="button-select-all"
              >
                {selectedPayouts.length === payoutData.payouts.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {payoutData.payouts.map((payout: PendingPayout) => (
                <div 
                  key={payout.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPayouts.includes(payout.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleSelectPayout(payout.id)}
                  data-testid={`payout-${payout.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{payout.amount.toLocaleString()} KUSH</p>
                      <p className="text-sm text-muted-foreground">{payout.reason}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                      {selectedPayouts.includes(payout.id) && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Earned: {new Date(payout.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Summary */}
            {selectedPayouts.length > 0 && (
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Selected for Claim:</span>
                  <span className="font-bold text-lg">{selectedTotal.toLocaleString()} KUSH</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedPayouts.length} reward{selectedPayouts.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}

            {/* Claim Button */}
            <Button 
              onClick={handleClaimSelected}
              className="w-full"
              size="lg"
              disabled={selectedPayouts.length === 0 || claimMutation.isPending || !payoutData?.hasWallet}
              data-testid="button-claim-tokens"
            >
              {claimMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting Claim...
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4 mr-2" />
                  Submit Claim Request
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Gift className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium mb-1">No Pending Rewards</p>
            <p className="text-sm">Complete achievements to earn $KUSH tokens!</p>
          </div>
        )}

        <Separator />
        
        {/* Info Section */}
        <div className="space-y-3">
          <Alert>
            <Gift className="h-4 w-4" />
            <AlertDescription>
              <strong>How Token Claims Work:</strong><br/>
              • Select the rewards you want to claim<br/>
              • Submit a claim request for admin review<br/>
              • Admin manually approves and transfers real tokens to your wallet<br/>
              • Processing time is typically 1-24 hours
            </AlertDescription>
          </Alert>

          {!payoutData?.hasWallet && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Wallet Required:</strong> Link your Solana wallet in settings to claim token rewards.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Real $KUSH Token</p>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Solana Network • Manual Distribution
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TokenDashboard({ gameState }: TokenDashboardProps) {
  // REMOVED: Airdrop functionality - Manual admin rewards only
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Toggle grow light mutation
  const toggleGrowLightMutation = useMutation({
    mutationFn: async ({ lightId, isActive }: { lightId: string; isActive: boolean }) => {
      const response = await apiRequest('POST', `/api/players/${gameState.id}/grow-lights/${lightId}/toggle`, {
        isActive
      });
      return response.json();
    },
    onSuccess: () => {
      // Refresh grow lights data
      queryClient.invalidateQueries({ queryKey: ['player-grow-lights', gameState.id] });
      // Refresh player data to get updated passive income
      queryClient.invalidateQueries({ queryKey: ['player', gameState.id] });
      toast({
        title: "Grow Light Updated",
        description: "Your grow light status has been updated successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Update Grow Light",
        description: error.message || "An error occurred while updating your grow light status.",
        variant: "destructive"
      });
    }
  });

  // Fetch token summary
  const { data: tokenSummary, isLoading } = useQuery<TokenSummary>({
    queryKey: ['tokens', gameState.id],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${gameState.id}/tokens`);
      return response.json();
    },
    enabled: !!gameState.walletAddress,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch pending payouts
  const { data: pendingPayouts } = useQuery({
    queryKey: ['pending-payouts', gameState.solanaNetwork],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/tokens/pending/${gameState.solanaNetwork}`);
      return response.json();
    },
    refetchInterval: 60000, // Refresh every minute
  });

  // REMOVED: Airdrop mutation - Players earn tokens through gameplay achievements only

  // REMOVED: Automatic payout processing - All payouts are manually confirmed by admin

  if (!gameState.walletAddress) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" />
$KUSH Token Rewards
          </CardTitle>
          <CardDescription>
            Connect your Solana wallet to start earning real $KUSH tokens!
            Production Token: HZTGpuQwDfaKrAmp9ozTTGd5T9eS4GbArtDM7FjsQ12d
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Register your Solana wallet address to earn real $KUSH tokens (HZTGpuQwDfaKrAmp9ozTTGd5T9eS4GbArtDM7FjsQ12d) from achievements and milestones.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading token data...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const isDevnet = gameState.solanaNetwork === 'devnet';
  const explorerUrl = isDevnet 
    ? 'https://solscan.io/?cluster=devnet'
    : 'https://solscan.io';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 p-2 sm:p-4">
      {/* Network Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center gap-2">
          <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          🪙 Real $KUSH Token Dashboard
        </h2>
        <Badge variant={isDevnet ? "secondary" : "default"} className="text-xs sm:text-sm">
          {isDevnet ? "🧪 Devnet (Testing)" : "🌐 Mainnet (Live)"}
        </Badge>
      </div>

      {/* Token Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {tokenSummary?.totalEarned || 0} $KUSH
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime token earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Claimed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-blue-600">
              {tokenSummary?.totalClaimed || 0} $KUSH
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully distributed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-orange-600">
              {tokenSummary?.pendingClaims || 0} $KUSH
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting distribution
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Claim Action */}
      {tokenSummary && tokenSummary.pendingClaims > 0 && (
        <Card className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 touch-interactive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-accent">🎁 Tokens Ready to Claim!</h3>
                <p className="text-sm text-muted-foreground">
                  You have {tokenSummary.pendingClaims} $KUSH tokens awaiting admin approval
                </p>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {tokenSummary.pendingClaims} $KUSH
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="claim" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="claim" className="touch-interactive">💎 Claim</TabsTrigger>
          <TabsTrigger value="payouts" className="touch-interactive">📋 History</TabsTrigger>
          <TabsTrigger value="rewards" className="touch-interactive">🏆 Rewards</TabsTrigger>
          <TabsTrigger value="burn" className="touch-interactive">🔥 Burn</TabsTrigger>
        </TabsList>

        <TabsContent value="claim" className="space-y-4">
          <TokenClaimingInterface gameState={gameState} />
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Token Payouts</CardTitle>
              <CardDescription>
                Your latest token earnings and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tokenSummary?.recentPayouts?.length ? (
                <div className="space-y-3">
                  {tokenSummary.recentPayouts.map((payout) => (
                    <div
                      key={payout.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{payout.reason}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(payout.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          +{payout.amount} $KUSH
                        </div>
                        <Badge
                          variant={
                            payout.status === 'completed' ? 'default' :
                            payout.status === 'pending' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {payout.status}
                        </Badge>
                      </div>
                      {payout.transactionSignature && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(
                            `${explorerUrl}/tx/${payout.transactionSignature}`,
                            '_blank'
                          )}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No token payouts yet. Complete achievements to start earning!
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Token Reward Structure</CardTitle>
              <CardDescription>
                How you can earn $KUSH tokens through gameplay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Achievement Rewards
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>First Click</span>
                      <span className="text-green-600">10 $KUSH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>100 Clicks</span>
                      <span className="text-green-600">50 $KUSH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1,000 Clicks</span>
                      <span className="text-green-600">200 $KUSH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>First Upgrade</span>
                      <span className="text-green-600">25 $KUSH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wallet Connected</span>
                      <span className="text-green-600">50 $KUSH</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Milestone Rewards
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1,000 KUSH</span>
                      <span className="text-green-600">100 $KUSH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10,000 KUSH</span>
                      <span className="text-green-600">500 $KUSH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>100,000 KUSH</span>
                      <span className="text-green-600">2,000 $KUSH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1,000,000 KUSH</span>
                      <span className="text-green-600">10,000 $KUSH</span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  Real $KUSH tokens (HZTGpuQwDfaKrAmp9ozTTGd5T9eS4GbArtDM7FjsQ12d) are automatically distributed when you reach milestones or complete achievements.
                  Make sure your wallet is registered to receive live token rewards!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="burn" className="space-y-4">
          <TokenBurnInterface gameState={gameState} />
        </TabsContent>

        {/* REMOVED: Testing tools tab - Manual reward distribution is now admin-only */}
      </Tabs>
    </div>
  );
}

// Token Burn Interface Component
interface GrowLight {
  id: string;
  name: string;
  type: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  passiveClicksPerHour: number;
  clickMultiplier: number;
  energyEfficiency: number;
  description: string;
  burnCost: number;
  icon: string;
  unlockRequirement: number;
}

interface TokenBurnInterfaceProps {
  gameState: {
    id: string;
    walletAddress: string | null;
    totalKush: number;
  };
}

function TokenBurnInterface({ gameState }: TokenBurnInterfaceProps) {
  const [burnAmount, setBurnAmount] = useState<number>(100);
  const [selectedGrowLight, setSelectedGrowLight] = useState<GrowLight | null>(null);
  const [pendingBurnTx, setPendingBurnTx] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch available grow lights
  const { data: growLights = [], isLoading: lightsLoading } = useQuery<GrowLight[]>({
    queryKey: ['grow-lights'],
    queryFn: async () => {
      const response = await fetch('/api/grow-lights');
      if (!response.ok) throw new Error('Failed to fetch grow lights');
      return response.json();
    },
  });

  // Fetch player's grow lights
  const { data: playerGrowLights = [], isLoading: playerLightsLoading } = useQuery({
    queryKey: ['player-grow-lights', gameState.id],
    queryFn: async () => {
      const response = await fetch(`/api/players/${gameState.id}/grow-lights`);
      if (!response.ok) throw new Error('Failed to fetch player grow lights');
      return response.json();
    },
  });

  // Verify burn transaction mutation
  const verifyBurnMutation = useMutation({
    mutationFn: async (data: { transactionSignature: string; walletAddress: string }) => {
      const response = await fetch(`/api/players/${gameState.id}/verify-burn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Burn verification failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "🔥 Burn Verified & Rewarded!",
        description: `You received a ${data.growLight?.name || 'grow light'} worth ${data.growLight?.passiveClicksPerHour || 0}/hr passive clicks!`,
      });
      setPendingBurnTx('');
      queryClient.invalidateQueries({ queryKey: ['player-grow-lights', gameState.id] });
      queryClient.invalidateQueries({ queryKey: ['player', gameState.id] });
      queryClient.invalidateQueries({ queryKey: ['burn-stats', gameState.id] });
    },
    onError: (error: any) => {
      toast({
        title: "❌ Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBurnRedirect = () => {
    if (!gameState.walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please register your wallet address first",
        variant: "destructive"
      });
      return;
    }

    // Open sol-incinerator.com in a new tab with pre-filled amount
    const incineratorUrl = `https://sol-incinerator.com/?amount=${burnAmount}&wallet=${gameState.walletAddress}`;
    window.open(incineratorUrl, '_blank');
    
    toast({
      title: "🔥 Redirected to Sol Incinerator",
      description: "Complete your burn there, then return with the transaction signature to claim your grow light!",
    });
  };

  const handleVerifyBurn = () => {
    if (!pendingBurnTx.trim()) {
      toast({
        title: "Missing Transaction",
        description: "Please enter the transaction signature from sol-incinerator.com",
        variant: "destructive"
      });
      return;
    }

    if (!gameState.walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please register your wallet address first",
        variant: "destructive"
      });
      return;
    }

    verifyBurnMutation.mutate({
      transactionSignature: pendingBurnTx.trim(),
      walletAddress: gameState.walletAddress
    });
  };

  // Fetch player's burn stats to determine unlocked grow lights
  const { data: burnStats } = useQuery({
    queryKey: ['burn-stats', gameState.id],
    queryFn: async () => {
      const response = await fetch(`/api/players/${gameState.id}/burn-stats`);
      if (!response.ok) throw new Error('Failed to fetch burn stats');
      return response.json();
    },
  });

  // Filter grow lights that player can afford and has unlocked
  const affordableGrowLights = growLights.filter(light => {
    const lifetimeBurned = burnStats?.onChainKushBurned || 0;
    return light.burnCost <= burnAmount && light.unlockRequirement <= lifetimeBurned;
  });

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'text-gray-400 border-gray-700/50 bg-gray-900/20',
      uncommon: 'text-green-400 border-green-700/50 bg-green-900/20', 
      rare: 'text-blue-400 border-blue-700/50 bg-blue-900/20',
      epic: 'text-purple-400 border-purple-700/50 bg-purple-900/20',
      legendary: 'text-orange-400 border-orange-700/50 bg-orange-900/20'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  if (lightsLoading || playerLightsLoading) {
    return <div className="text-center py-8">Loading burn interface...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Burn Token Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            Burn Tokens for Grow Lights
          </CardTitle>
          <CardDescription>
            Burn your on-chain $KUSH tokens to receive grow lights that provide passive income and click bonuses.<br/>
            <strong className="text-orange-400">⚠️ Important:</strong> Grow lights are unlocked by burning on-chain $KUSH tokens, NOT by in-game Points!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Burn Configuration */}
          <div className="p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg border border-red-700/30">
            <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Step 1: Configure Your Burn
            </h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="burn-amount">Burn Amount (KUSH Tokens)</Label>
                <Input
                  id="burn-amount"
                  type="number"
                  min={100}
                  max={50000}
                  step={100}
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(Number(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum: 100 tokens. This will be the amount burned on Sol Incinerator.
                </p>
              </div>

              <Button 
                onClick={handleBurnRedirect}
                disabled={!gameState.walletAddress || burnAmount < 100}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                size="lg"
              >
                <Flame className="h-4 w-4 mr-2" />
                Burn {burnAmount} Tokens on Sol Incinerator
              </Button>
            </div>
          </div>

          {/* Step 2: Verification */}
          <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-700/30">
            <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Step 2: Verify & Claim Reward
            </h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="tx-signature">Transaction Signature</Label>
                <Input
                  id="tx-signature"
                  value={pendingBurnTx}
                  onChange={(e) => setPendingBurnTx(e.target.value)}
                  placeholder="Paste your transaction signature from Sol Incinerator..."
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Copy the transaction signature from Sol Incinerator after completing your burn.
                </p>
              </div>

              <Button 
                onClick={handleVerifyBurn}
                disabled={verifyBurnMutation.isPending || !pendingBurnTx.trim() || !gameState.walletAddress}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                size="lg"
              >
                <Zap className="h-4 w-4 mr-2" />
                {verifyBurnMutation.isPending ? 'Verifying...' : 'Verify Burn & Claim Grow Light'}
              </Button>
            </div>
          </div>

          {/* Information Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">How It Works:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Click "Burn Tokens" to open Sol Incinerator with your wallet pre-filled</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Complete the burn transaction on Sol Incinerator</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Copy the transaction signature and paste it above</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Click "Verify" to confirm the burn and receive your grow light!</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">What You Could Get:</h4>
              {affordableGrowLights.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {affordableGrowLights.slice(0, 5).map((light) => (
                    <div key={light.id} className={`p-3 border rounded-lg ${getRarityColor(light.rarity)}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{light.icon}</span>
                        <span className="font-medium text-sm">{light.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {light.rarity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{light.description}</p>
                      <div className="flex justify-between text-xs">
                        <span>+{light.passiveClicksPerHour}/hr</span>
                        <span>{light.clickMultiplier/100}x multiplier</span>
                      </div>
                    </div>
                  ))}
                  {affordableGrowLights.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{affordableGrowLights.length - 5} more possible lights...
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No grow lights available for {burnAmount} tokens. Try increasing the amount.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Grow Lights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-500" />
            Your Grow Lights ({playerGrowLights.length})
          </CardTitle>
          <CardDescription>
            Your collection of passive income generators
          </CardDescription>
        </CardHeader>
        <CardContent>
          {playerGrowLights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playerGrowLights.map((playerLight: any, index: number) => (
                <Card key={index} className={`${getRarityColor(playerLight.rarity)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{playerLight.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{playerLight.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {playerLight.rarity}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{playerLight.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Passive:</span>
                        <div className="font-medium">+{playerLight.passiveClicksPerHour}/hr</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Multiplier:</span>
                        <div className="font-medium">{playerLight.clickMultiplier ? (playerLight.clickMultiplier/100).toFixed(2) : '1.00'}x</div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Status: {playerLight.isActive ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                        <Button
                          size="sm"
                          variant={playerLight.isActive ? "destructive" : "default"}
                          onClick={() => toggleGrowLightMutation.mutate({ 
                            lightId: playerLight.growLightId, 
                            isActive: !playerLight.isActive 
                          })}
                          disabled={toggleGrowLightMutation.isPending}
                          className="h-6 px-2 text-xs"
                        >
                          {toggleGrowLightMutation.isPending ? '...' : playerLight.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No grow lights yet!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Burn some tokens above to get your first grow light.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}