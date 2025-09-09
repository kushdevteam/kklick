// Real Solana Wallet Connection Component
import React, { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, ExternalLink, Wallet, CheckCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import NetworkSwitcher from './network-switcher';
import type { SolanaNetwork } from '@/lib/solana-config';

interface RealWalletConnectProps {
  gameState: {
    id: string;
    walletAddress: string | null;
    walletLinked?: boolean;
    solanaNetwork: SolanaNetwork;
    walletSyncEnabled: boolean;
    telegramUserId: string | null;
    username: string;
    totalKush: number;
    totalClicks?: number;
  };
}

export default function RealWalletConnect({ gameState }: RealWalletConnectProps) {
  const { 
    wallet, 
    connected, 
    connecting, 
    publicKey, 
    availableWallets, 
    connect, 
    disconnect, 
    selectWallet 
  } = useWallet();
  
  const [selectedWalletName, setSelectedWalletName] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Link wallet securely (one-time only)
  const linkWalletMutation = useMutation({
    mutationFn: async (walletAddress: string) => {
      if (gameState.walletLinked) {
        throw new Error('Wallet already linked. Cannot change linked wallet for security.');
      }
      const response = await apiRequest('POST', `/api/players/${gameState.id}/link-wallet`, {
        walletAddress
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/players', gameState.id], data.player);
      toast({
        title: "Wallet Linked!",
        description: "Your wallet has been securely linked to your account.",
      });
    },
    onError: (error: any) => {
      console.error('Wallet linking error:', error);
      toast({
        title: "Wallet Linking Failed",
        description: error.message || "Failed to link wallet",
        variant: "destructive",
      });
    }
  });

  const syncMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      const response = await apiRequest('PATCH', `/api/players/${gameState.id}`, {
        walletSyncEnabled: enabled,
        lastWalletSync: enabled ? new Date().toISOString() : null
      });
      return response.json();
    },
    onSuccess: (data, enabled) => {
      queryClient.setQueryData(['/api/players', gameState.id], data);
      toast({
        title: enabled ? "Sync Enabled" : "Sync Disabled",
        description: enabled 
          ? "Progress will sync with your wallet" 
          : "Wallet sync turned off",
      });
    }
  });

  const handleConnect = async (walletName?: string) => {
    try {
      await connect(walletName);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletName || 'wallet'}! ${gameState.walletLinked ? 'Wallet already linked to account.' : 'Now you can link it to your account.'}`,
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLinkConnectedWallet = () => {
    if (publicKey && !gameState.walletLinked) {
      linkWalletMutation.mutate(publicKey.toString());
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      
      toast({
        title: "Wallet Disconnected",
        description: gameState.walletLinked 
          ? "Browser wallet disconnected. Your linked wallet remains secure in your account."
          : "Wallet disconnected from browser",
      });
    } catch (error: any) {
      toast({
        title: "Disconnection Failed", 
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSyncToggle = (enabled: boolean) => {
    if (!connected && enabled) {
      toast({
        title: "Connect Wallet First",
        description: "Please connect your wallet before enabling sync",
        variant: "destructive",
      });
      return;
    }
    syncMutation.mutate(enabled);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-purple-500" />
          <span>Solana Wallet Connection</span>
        </CardTitle>
        <CardDescription>
          Connect your Solana wallet directly through your browser extension
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Network Switcher */}
        <NetworkSwitcher 
          currentNetwork={gameState.solanaNetwork}
          playerId={gameState.id}
        />

        <Separator />

        {/* Wallet Detection Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Installed Wallets:</span>
            <Badge variant={availableWallets.length > 0 ? "default" : "secondary"}>
              {availableWallets.length} found
            </Badge>
          </div>

          {availableWallets.length === 0 ? (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    No Wallets Detected
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
                    Please install a Solana wallet extension to connect:
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Get Phantom
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://solflare.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Get Solflare
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {availableWallets.map((walletOption) => (
                <div 
                  key={walletOption.name}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={walletOption.icon} 
                      alt={walletOption.name}
                      className="w-8 h-8 rounded-lg"
                      onError={(e) => {
                        // Fallback to wallet icon if image fails
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div>
                      <p className="font-medium">{walletOption.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {connected && publicKey && wallet?.name === walletOption.name 
                          ? 'Connected' 
                          : 'Available'
                        }
                      </p>
                    </div>
                  </div>
                  
                  {connected && wallet?.name === walletOption.name ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="default">Connected</Badge>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(walletOption.name)}
                      disabled={connecting || connected}
                      data-testid={`button-connect-${walletOption.name.toLowerCase()}`}
                    >
                      {connecting ? 'Connecting...' : 'Connect'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Connection Status */}
        {connected && publicKey && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  ✅ Wallet Connected
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 font-mono break-all">
                  {publicKey}
                </p>
              </div>

              <Button 
                onClick={handleDisconnect}
                variant="outline"
                className="w-full"
                data-testid="button-disconnect-wallet"
              >
                Disconnect Wallet
              </Button>
            </div>
          </>
        )}

        <Separator />

        {/* Sync Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="sync-toggle">Automatic Sync</Label>
              <p className="text-xs text-muted-foreground">
                Sync game progress with your connected wallet
              </p>
            </div>
            <Switch 
              id="sync-toggle"
              checked={gameState.walletSyncEnabled}
              onCheckedChange={handleSyncToggle}
              disabled={syncMutation.isPending || !connected}
              data-testid="switch-wallet-sync"
            />
          </div>

          {gameState.walletSyncEnabled && connected && (
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Sync Enabled</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your progress is automatically saved to the blockchain
              </p>
            </div>
          )}
        </div>

        {/* Game Integration Info */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Wallet className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                Real Wallet Integration
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Your wallet is directly connected through the browser. 
                No need to manually enter addresses - everything is automated and secure!
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}