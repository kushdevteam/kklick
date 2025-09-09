import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { SolanaNetwork } from "@/lib/solana-config";

interface GameState {
  id: string;
  walletAddress: string | null;
  walletSyncEnabled: boolean;
  solanaNetwork: SolanaNetwork;
  totalKush: number;
  totalClicks: number;
  telegramUserId: string | null;
}

interface UseWalletSyncProps {
  gameState: GameState;
  enabled?: boolean;
}

export function useWalletSync({ gameState, enabled = true }: UseWalletSyncProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const lastSyncRef = useRef<number>(0);

  const syncMutation = useMutation({
    mutationFn: async (data: { 
      totalKush: number; 
      totalClicks: number;
      network: SolanaNetwork;
    }) => {
      const response = await apiRequest('PATCH', `/api/players/${gameState.id}`, {
        totalKush: data.totalKush,
        totalClicks: data.totalClicks,
        solanaNetwork: data.network,
        lastWalletSync: new Date().toISOString()
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/players', gameState.id], data);
      lastSyncRef.current = Date.now();
    },
    onError: (error) => {
      console.error('Wallet sync failed:', error);
      // Don't show toast for sync errors to avoid spam
    }
  });

  // Auto-sync every 30 seconds if wallet sync is enabled
  useEffect(() => {
    if (!enabled || !gameState.walletSyncEnabled || !gameState.walletAddress || syncMutation.isPending) {
      return;
    }

    // Don't sync if we've synced recently (within 25 seconds)
    const timeSinceLastSync = Date.now() - lastSyncRef.current;
    if (timeSinceLastSync < 25000) {
      return;
    }

    const interval = setInterval(() => {
      syncMutation.mutate({
        totalKush: gameState.totalKush,
        totalClicks: gameState.totalClicks,
        network: gameState.solanaNetwork
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [
    enabled,
    gameState.walletSyncEnabled, 
    gameState.walletAddress, 
    gameState.totalKush, 
    gameState.totalClicks,
    gameState.solanaNetwork,
    syncMutation.isPending
  ]);

  // Manual sync function
  const manualSync = () => {
    if (!gameState.walletSyncEnabled || !gameState.walletAddress) {
      toast({
        title: "Sync Unavailable",
        description: "Please connect wallet and enable sync first",
        variant: "destructive",
      });
      return;
    }

    syncMutation.mutate({
      totalKush: gameState.totalKush,
      totalClicks: gameState.totalClicks,
      network: gameState.solanaNetwork
    });

    toast({
      title: "Syncing Progress",
      description: "Updating wallet data...",
    });
  };

  return {
    isSyncing: syncMutation.isPending,
    manualSync,
    lastSyncTime: lastSyncRef.current
  };
}