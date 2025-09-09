// Token Claiming System for KushKlicker
// This component handles viewing and claiming pending $KUSH token rewards

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Wallet, ExternalLink, AlertCircle, Clock, CheckCircle, Gift, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface SolanaWalletProps {
  gameState: {
    totalKush: number;
    claimableTokens: number;
  };
  playerId: string;
}

export function SolanaWallet({ gameState, playerId }: SolanaWalletProps) {
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Fetch pending payouts
  const { data: payoutData, isLoading: payoutsLoading } = useQuery<PayoutData>({
    queryKey: [`/api/players/${playerId}/pending-payouts`],
    enabled: !!playerId,
  });
  
  // Claim request mutation
  const claimMutation = useMutation({
    mutationFn: async (payoutIds: string[]) => {
      return apiRequest('POST', `/api/players/${playerId}/request-claim`, {
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
      queryClient.invalidateQueries({ queryKey: [`/api/players/${playerId}/pending-payouts`] });
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
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-purple-500" />
            Token Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-purple-500" />
          $KUSH Token Rewards
        </CardTitle>
        <CardDescription>
          {payoutData?.hasWallet 
            ? "Your pending token rewards from achievements"
            : "Link your wallet to claim token rewards"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <span className="font-bold text-green-800 dark:text-green-200" data-testid="total-claimable">
            {payoutData?.totalClaimable?.toLocaleString() || 0}
          </span>
        </div>

        {/* Pending Payouts List */}
        {payoutData?.payouts && payoutData.payouts.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Pending Rewards</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSelectAll}
                data-testid="button-select-all"
              >
                {selectedPayouts.length === payoutData.payouts.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2">
              {payoutData.payouts.map((payout: PendingPayout) => (
                <div 
                  key={payout.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedPayouts.includes(payout.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleSelectPayout(payout.id)}
                  data-testid={`payout-${payout.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{payout.amount.toLocaleString()} KUSH</p>
                      <p className="text-xs text-muted-foreground">{payout.reason}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                      {selectedPayouts.includes(payout.id) && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned: {new Date(payout.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Summary */}
            {selectedPayouts.length > 0 && (
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Selected:</span>
                  <span className="font-bold">{selectedTotal.toLocaleString()} KUSH</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedPayouts.length} reward{selectedPayouts.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}

            {/* Claim Button */}
            <Button 
              onClick={handleClaimSelected}
              className="w-full"
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
                  Claim Selected Rewards
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

        {/* Info Section */}
        <Separator />
        
        <div className="space-y-3">
          {/* Token Info */}
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Real $KUSH Token</p>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Solana Network • Manual Distribution
            </p>
          </div>

          {/* Processing Info */}
          <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-700 dark:text-yellow-300">
              <p className="font-medium mb-1">Manual Processing</p>
              <p>Claims are reviewed and processed manually within 24 hours</p>
            </div>
          </div>

          {!payoutData?.hasWallet && (
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                Wallet Required
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                Link your Solana wallet in settings to claim token rewards
              </p>
            </div>
          )}

          {/* External Links */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Get Phantom
              </a>
            </Button>
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href="https://solscan.io/token/FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Token
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}