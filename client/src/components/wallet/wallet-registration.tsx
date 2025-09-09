import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface WalletRegistrationProps {
  gameState: {
    id: string;
    walletAddress?: string | null;
    walletLinked?: boolean;
    solanaNetwork?: string;
    telegramUserId?: string | null;
    discordUserId?: string | null;
  };
}

export default function WalletRegistration({ gameState }: WalletRegistrationProps) {
  const [walletAddress, setWalletAddress] = useState(gameState.walletAddress || '');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if we're in Telegram WebView
  const tgWebApp = (window as any).Telegram?.WebApp;
  const isInTelegram = typeof tgWebApp !== 'undefined';
  const tgData = tgWebApp?.initDataUnsafe;
  const telegramUser = tgData?.user;

  const linkWalletMutation = useMutation({
    mutationFn: async (newWalletAddress: string) => {
      const response = await fetch(`/api/players/${gameState.id}/link-wallet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: newWalletAddress,
        }),
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
        description: "Your Solana wallet has been securely linked to your account. This cannot be changed for security.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
    },
    onError: (error: any) => {
      toast({
        title: "❌ Linking Failed",
        description: error.message || "Failed to link wallet address.",
        variant: "destructive",
      });
    },
  });

  // Remove wallet mutation - only available if wallet not yet linked
  const removeWalletMutation = useMutation({
    mutationFn: async () => {
      if (gameState.walletLinked) {
        throw new Error('Cannot remove linked wallet for security reasons');
      }
      const response = await fetch(`/api/players/${gameState.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: null,
        }),
      });
      if (!response.ok) throw new Error('Failed to remove wallet');
      return await response.json();
    },
    onSuccess: () => {
      setWalletAddress('');
      toast({
        title: "✅ Wallet Removed",
        description: "Your wallet address has been removed from your account.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
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

    // Basic Solana address validation (base58, 32-44 characters)
    const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    if (!solanaAddressPattern.test(walletAddress.trim())) {
      toast({
        title: "❌ Invalid Format",
        description: "Please enter a valid Solana wallet address format.",
        variant: "destructive",
      });
      return;
    }

    linkWalletMutation.mutate(walletAddress.trim());
  };

  const linkTelegramMutation = useMutation({
    mutationFn: async () => {
      if (!isInTelegram || !telegramUser) {
        throw new Error('Not in Telegram WebView');
      }
      const response = await fetch(`/api/players/${gameState.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramUserId: telegramUser.id.toString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to link Telegram');
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "✅ Telegram Linked!",
        description: "Your Telegram account has been successfully linked.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
    },
    onError: (error: any) => {
      toast({
        title: "❌ Link Failed",
        description: error.message === 'Not in Telegram WebView' 
          ? "This feature only works when opened through Telegram."
          : "Failed to link Telegram account.",
        variant: "destructive",
      });
    },
  });

  const handleLinkTelegram = () => {
    linkTelegramMutation.mutate();
  };

  const handleLinkDiscord = () => {
    toast({
      title: "🔗 Discord Integration",
      description: "Discord linking is available through the Discord bot. Use /link command in Discord.",
    });
  };

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <i className="fas fa-wallet text-blue-400"></i>
          <span>{gameState.walletLinked ? 'Linked Wallet' : 'Link Wallet'}</span>
        </CardTitle>
        <CardDescription>
          {gameState.walletLinked 
            ? 'Your wallet is securely linked to your account. Each account can only link one wallet for security.'
            : 'Link your Solana wallet address to receive token rewards. Once linked, this cannot be changed for security reasons.'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Trust Message */}
        <Alert className={gameState.walletLinked 
          ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
          : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
        }>
          <i className={`fas ${gameState.walletLinked ? 'fa-lock text-blue-600 dark:text-blue-400' : 'fa-shield-alt text-green-600 dark:text-green-400'}`}></i>
          <AlertDescription className={gameState.walletLinked 
            ? "text-blue-800 dark:text-blue-200"
            : "text-green-800 dark:text-green-200"
          }>
            {gameState.walletLinked 
              ? <><strong>Wallet Linked:</strong> Your wallet is permanently linked for security. This prevents exploitation and ensures only you control your rewards.</>
              : <><strong>Safe & Secure:</strong> We only store your wallet address - we never connect to or access your wallet. No permissions, no transactions, just your address for future rewards.</>
            }
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="wallet-address">Solana Wallet Address</Label>
          <div className="flex space-x-2">
            <Input
              id="wallet-address"
              placeholder={gameState.walletLinked 
                ? "Wallet permanently linked"
                : "Enter your Solana wallet address (e.g., 7dHbW...)"
              }
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="font-mono text-sm"
              disabled={gameState.walletLinked}
              data-testid="input-wallet-address"
            />
            {gameState.walletLinked ? (
              <Button
                disabled
                size="sm"
                variant="outline"
                data-testid="button-wallet-linked"
              >
                <i className="fas fa-lock mr-2"></i>
                Linked
              </Button>
            ) : gameState.walletAddress ? (
              <div className="flex space-x-2">
                <Button
                  onClick={() => removeWalletMutation.mutate()}
                  disabled={removeWalletMutation.isPending}
                  variant="outline"
                  size="sm"
                  data-testid="button-remove-wallet"
                >
                  {removeWalletMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Removing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-trash mr-2"></i>
                      Remove
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleLinkWallet}
                  disabled={linkWalletMutation.isPending}
                  size="sm"
                  data-testid="button-link-wallet"
                >
                  {linkWalletMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Linking...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-link mr-2"></i>
                      Link Permanently
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleLinkWallet}
                disabled={linkWalletMutation.isPending}
                data-testid="button-link-wallet"
              >
                {linkWalletMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Linking...
                  </>
                ) : (
                  <>
                    <i className="fas fa-link mr-2"></i>
                    Link Wallet
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {gameState.walletAddress && (
          <div className={`p-3 rounded-lg ${
            gameState.walletLinked 
              ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
              : 'bg-muted/50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {gameState.walletLinked ? 'Permanently Linked Address:' : 'Current Address (Not Linked):'}
                </p>
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {gameState.walletAddress}
                </p>
              </div>
              <div className={gameState.walletLinked 
                ? "text-blue-600 dark:text-blue-400"
                : "text-amber-600 dark:text-amber-400"
              }>
                <i className={`fas ${
                  gameState.walletLinked ? 'fa-lock' : 'fa-exclamation-triangle'
                }`}></i>
              </div>
            </div>
            {!gameState.walletLinked && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                <strong>Note:</strong> Address not yet linked. Click "Link Permanently" to secure your wallet.
              </p>
            )}
          </div>
        )}

        {/* Platform Linking Options */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="font-medium text-foreground">Link Social Accounts for Easier Management</h4>
          
          {!gameState.telegramUserId && (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleLinkTelegram}
              disabled={linkTelegramMutation.isPending || !isInTelegram}
              data-testid="button-link-telegram"
            >
              {linkTelegramMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Linking...
                </>
              ) : (
                <>
                  <i className="fab fa-telegram mr-2 text-blue-500"></i>
                  {isInTelegram ? 'Link Telegram Account' : 'Open in Telegram'}
                </>
              )}
            </Button>
          )}
          
          {!gameState.discordUserId && (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleLinkDiscord}
              data-testid="button-link-discord"
            >
              <i className="fab fa-discord mr-2 text-indigo-500"></i>
              Link Discord Account
            </Button>
          )}

          {gameState.telegramUserId && gameState.discordUserId && (
            <Alert>
              <i className="fas fa-check text-green-600"></i>
              <AlertDescription>
                All social accounts linked! You can manage your wallet through Telegram or Discord.
              </AlertDescription>
            </Alert>
          )}
        </div>

      </CardContent>
    </Card>
  );
}