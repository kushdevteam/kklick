import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isValidSolanaAddress, type SolanaNetwork } from "@/lib/solana-config";
import { useWalletSync } from "@/hooks/use-wallet-sync";
import NetworkSwitcher from "./network-switcher";

interface WalletConnectProps {
  gameState: {
    id: string;
    walletAddress: string | null;
    solanaNetwork: SolanaNetwork;
    walletSyncEnabled: boolean;
    telegramUserId: string | null;
    username: string;
    totalKush: number;
    totalClicks?: number;
  };
}

export default function WalletConnect({ gameState }: WalletConnectProps) {
  const [walletInput, setWalletInput] = useState(gameState.walletAddress || "");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Enable wallet sync
  const { isSyncing, manualSync } = useWalletSync({ 
    gameState: {
      id: gameState.id,
      walletAddress: gameState.walletAddress,
      walletSyncEnabled: gameState.walletSyncEnabled,
      solanaNetwork: gameState.solanaNetwork,
      totalKush: gameState.totalKush,
      totalClicks: gameState.totalClicks || 0,
      telegramUserId: gameState.telegramUserId,
    }
  });

  const walletMutation = useMutation({
    mutationFn: async (walletData: { 
      walletAddress: string | null, 
      walletSyncEnabled?: boolean 
    }) => {
      const response = await apiRequest('PATCH', `/api/players/${gameState.id}`, walletData);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/players', gameState.id], data);
      toast({
        title: "Wallet Updated",
        description: data.walletAddress ? "Wallet connected successfully!" : "Wallet disconnected",
      });
    },
    onError: (error) => {
      console.error('Wallet update error:', error);
      toast({
        title: "Wallet Update Failed",
        description: "Failed to update wallet connection",
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

  const handleWalletConnect = () => {
    if (!walletInput.trim()) {
      walletMutation.mutate({ walletAddress: null });
      setWalletInput("");
      return;
    }

    if (!isValidSolanaAddress(walletInput)) {
      toast({
        title: "Invalid Wallet Address",
        description: "Please enter a valid Solana wallet address",
        variant: "destructive",
      });
      return;
    }

    walletMutation.mutate({ walletAddress: walletInput.trim() });
  };

  const handleSyncToggle = (enabled: boolean) => {
    if (!gameState.walletAddress && enabled) {
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
          <i className="fas fa-wallet text-primary"></i>
          <span>Solana Wallet</span>
        </CardTitle>
        <CardDescription>
          Connect your Solana wallet to sync progress and earn tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Network Switcher */}
        <NetworkSwitcher 
          currentNetwork={gameState.solanaNetwork}
          playerId={gameState.id}
        />

        <Separator />

        {/* Wallet Connection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-input">Wallet Address</Label>
            <div className="flex space-x-2">
              <Input
                id="wallet-input"
                type="text"
                placeholder="Enter your Solana wallet address..."
                value={walletInput}
                onChange={(e) => setWalletInput(e.target.value)}
                disabled={walletMutation.isPending}
                data-testid="input-wallet-address"
              />
              <Button 
                onClick={handleWalletConnect}
                disabled={walletMutation.isPending}
                data-testid="button-connect-wallet"
              >
                {walletMutation.isPending ? "Connecting..." : gameState.walletAddress ? "Update" : "Connect"}
              </Button>
            </div>
          </div>

          {gameState.walletAddress && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Connected Wallet</p>
              <p className="text-xs text-muted-foreground font-mono break-all" data-testid="text-connected-wallet">
                {gameState.walletAddress}
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Sync Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="sync-toggle">Wallet Sync</Label>
              <p className="text-xs text-muted-foreground">
                Automatically sync game progress with your wallet
              </p>
            </div>
            <Switch 
              id="sync-toggle"
              checked={gameState.walletSyncEnabled}
              onCheckedChange={handleSyncToggle}
              disabled={syncMutation.isPending || !gameState.walletAddress}
              data-testid="switch-wallet-sync"
            />
          </div>

          {gameState.walletSyncEnabled && gameState.walletAddress && (
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className={`fas fa-sync-alt text-primary ${isSyncing ? 'animate-spin' : ''}`}></i>
                  <p className="text-sm font-medium">
                    {isSyncing ? "Syncing..." : "Sync Active"}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={manualSync}
                  disabled={isSyncing}
                  className="text-xs"
                  data-testid="button-manual-sync"
                >
                  {isSyncing ? "Syncing..." : "Sync Now"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Progress auto-syncs every 30 seconds with: {gameState.walletAddress.slice(0, 8)}...
              </p>
            </div>
          )}
        </div>

        {/* Account Linking Status */}
        {gameState.telegramUserId && gameState.walletAddress && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Account Linking</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fab fa-telegram text-blue-500"></i>
                    <Badge variant="outline">Telegram</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{gameState.username}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-wallet text-purple-500"></i>
                    <Badge variant="outline">Wallet</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {gameState.walletAddress.slice(0, 6)}...{gameState.walletAddress.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

      </CardContent>
    </Card>
  );
}