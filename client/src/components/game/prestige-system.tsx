import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PrestigeSystemProps {
  playerId: string;
}

export default function PrestigeSystem({ playerId }: PrestigeSystemProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: prestigeStatus } = useQuery({
    queryKey: ['prestige-status', playerId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${playerId}/prestige-status`);
      return response.json();
    },
    enabled: !!playerId,
  });

  const prestigeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/players/${playerId}/prestige`);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "🌟 PRESTIGE ACHIEVED!",
          description: `Congratulations! Your permanent multiplier is now ${data.newMultiplier / 100}x`,
          className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400",
        });
        
        // Refresh all relevant data
        queryClient.invalidateQueries({ queryKey: ['prestige-status', playerId] });
        queryClient.invalidateQueries({ queryKey: ['/api/players', playerId] });
        setShowConfirmDialog(false);
      } else {
        toast({
          title: "Prestige Failed",
          description: "You don't meet the requirements yet. Keep grinding!",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('Prestige error:', error);
      toast({
        title: "Prestige Error",
        description: "Failed to execute prestige. Please try again.",
        variant: "destructive",
      });
    }
  });

  if (!prestigeStatus) return <div className="animate-pulse bg-card/50 h-40 rounded-xl"></div>;

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
          <i className="fas fa-crown text-white text-sm"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">✨ Prestige System</h3>
          <p className="text-sm text-muted-foreground">Reset for permanent bonuses</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-purple-500/10 rounded-lg p-3">
            <p className="text-xs text-purple-300">Current Level</p>
            <p className="text-xl font-bold text-purple-400">{prestigeStatus.currentLevel}</p>
          </div>
          <div className="bg-pink-500/10 rounded-lg p-3">
            <p className="text-xs text-pink-300">Multiplier</p>
            <p className="text-xl font-bold text-pink-400">{(prestigeStatus.multiplier / 100).toFixed(1)}x</p>
          </div>
        </div>

        {prestigeStatus.canPrestige ? (
          <div className="text-center space-y-3">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3 border border-green-500/30">
              <p className="text-green-400 font-semibold">🚀 Ready to Prestige!</p>
              <p className="text-xs text-green-300 mt-1">
                You'll reset all progress but gain a permanent {((prestigeStatus.currentLevel + 1) * 10)}% bonus
              </p>
            </div>
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              disabled={prestigeMutation.isPending}
            >
              {prestigeMutation.isPending ? 'Processing...' : 'PRESTIGE NOW'}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
              <p className="text-yellow-400 font-semibold">⏳ Keep Growing</p>
              <p className="text-xs text-yellow-300 mt-1">
                Reach 1 billion KUSH to unlock prestige
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl p-6 max-w-md w-full border border-destructive">
            <h4 className="text-lg font-bold text-foreground mb-2">⚠️ Confirm Prestige</h4>
            <p className="text-muted-foreground text-sm mb-4">
              This will reset ALL your progress (KUSH, upgrades, grow lights) but give you a permanent 
              {((prestigeStatus.currentLevel + 1) * 10)}% multiplier on all future earnings.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => prestigeMutation.mutate()}
                disabled={prestigeMutation.isPending}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                {prestigeMutation.isPending ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}