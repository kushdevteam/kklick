import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SOLANA_NETWORKS, type SolanaNetwork } from "@/lib/solana-config";

interface NetworkSwitcherProps {
  currentNetwork: SolanaNetwork;
  playerId: string;
  onNetworkChange?: (network: SolanaNetwork) => void;
}

export default function NetworkSwitcher({ 
  currentNetwork, 
  playerId,
  onNetworkChange 
}: NetworkSwitcherProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const networkMutation = useMutation({
    mutationFn: async (network: SolanaNetwork) => {
      const response = await apiRequest('PATCH', `/api/players/${playerId}`, {
        solanaNetwork: network
      });
      return response.json();
    },
    onSuccess: (data, network) => {
      queryClient.setQueryData(['/api/players', playerId], data);
      onNetworkChange?.(network);
      toast({
        title: "Network Updated",
        description: `Switched to ${SOLANA_NETWORKS[network].name}`,
      });
    },
    onError: (error) => {
      console.error('Network switch error:', error);
      toast({
        title: "Network Switch Failed",
        description: "Failed to update network preference",
        variant: "destructive",
      });
    }
  });

  const handleNetworkChange = (network: SolanaNetwork) => {
    networkMutation.mutate(network);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium">Solana Network</h3>
          <Badge 
            variant={currentNetwork === "mainnet" ? "default" : "secondary"}
            className="text-xs"
            data-testid="badge-current-network"
          >
            {SOLANA_NETWORKS[currentNetwork].name}
          </Badge>
        </div>
      </div>
      
      <Select 
        value={currentNetwork} 
        onValueChange={handleNetworkChange}
        disabled={networkMutation.isPending}
      >
        <SelectTrigger data-testid="select-network">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="devnet" data-testid="option-devnet">
            <div className="flex items-center justify-between w-full">
              <span>🧪 Devnet</span>
              <Badge variant="secondary" className="text-xs ml-2">Development</Badge>
            </div>
          </SelectItem>
          <SelectItem value="mainnet" data-testid="option-mainnet">
            <div className="flex items-center justify-between w-full">
              <span>🚀 Mainnet</span>
              <Badge variant="default" className="text-xs ml-2">Production</Badge>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="text-xs text-muted-foreground">
        <p>• <strong>Devnet:</strong> For testing and development</p>
        <p>• <strong>Mainnet:</strong> Live network with real SOL</p>
      </div>
    </div>
  );
}