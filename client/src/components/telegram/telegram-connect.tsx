import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface TelegramConnectProps {
  gameState: any;
  onConnectionUpdate: () => void;
}

export default function TelegramConnect({ gameState, onConnectionUpdate }: TelegramConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Check if we're in Telegram WebView
  const isInTelegram = typeof (window as any).Telegram?.WebApp !== 'undefined';
  const tgData = (window as any).Telegram?.WebApp?.initDataUnsafe;
  const telegramUser = tgData?.user;

  const handleConnectTelegram = async () => {
    if (!isInTelegram || !telegramUser) {
      toast({
        title: "Not in Telegram",
        description: "This feature only works when opened through Telegram.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    try {
      // Update current player with Telegram data
      await apiRequest('PATCH', `/api/players/${gameState.id}`, {
        telegramUserId: telegramUser.id.toString(),
        username: telegramUser.username ? `@${telegramUser.username}` : gameState.username
      });

      toast({
        title: "Connected to Telegram!",
        description: "Your progress is now saved to your Telegram account.",
      });

      onConnectionUpdate();
    } catch (error) {
      console.error('Failed to connect Telegram:', error);
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Telegram. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const isConnected = gameState.telegramUserId;
  const connectedUsername = isConnected && gameState.username?.startsWith('@') ? gameState.username : null;

  return (
    <div className="bg-card rounded-xl p-6 border border-border mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <i className="fab fa-telegram text-blue-500 text-xl"></i>
        <h3 className="font-semibold text-blue-500">Telegram Connection</h3>
      </div>

      {isConnected ? (
        // Connected State
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-white text-sm"></i>
            </div>
            <div>
              <p className="font-medium text-green-700 dark:text-green-300">Connected to Telegram</p>
              {connectedUsername && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Username: {connectedUsername}
                </p>
              )}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><i className="fas fa-save mr-2 text-green-500"></i>Your progress is automatically saved</p>
            <p><i className="fas fa-sync mr-2 text-blue-500"></i>Access your game from any device</p>
            <p><i className="fas fa-share mr-2 text-purple-500"></i>Earn referral rewards when friends join</p>
          </div>
        </div>
      ) : (
        // Not Connected State
        <div className="space-y-4">
          {isInTelegram ? (
            <div>
              <p className="text-muted-foreground mb-4">
                Connect your Telegram account to save your progress and access it from any device.
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fas fa-save text-green-500"></i>
                  <span>Save progress to your Telegram account</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fas fa-devices text-blue-500"></i>
                  <span>Access from any device</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fas fa-users text-purple-500"></i>
                  <span>Enable referral system with friends</span>
                </div>
              </div>

              <button
                onClick={handleConnectTelegram}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center space-x-2"
                data-testid="button-connect-telegram"
              >
                {isConnecting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <i className="fab fa-telegram"></i>
                    <span>Connect to Telegram</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <i className="fab fa-telegram text-6xl text-blue-500 mb-4"></i>
              <h4 className="font-semibold text-foreground mb-2">Open in Telegram</h4>
              <p className="text-muted-foreground text-sm mb-4">
                To save your progress, please open this game through Telegram.
              </p>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <i className="fas fa-info-circle mr-2"></i>
                  Your current progress is saved locally on this device only.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}