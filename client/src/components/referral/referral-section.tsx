import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ReferralSectionProps {
  gameState: {
    id: string;
    username: string;
    telegramUserId?: string;
    discordUserId?: string;
    hasChangedReferralHandle?: boolean;
  };
}

export default function ReferralSection({ gameState }: ReferralSectionProps) {
  const [totalReferrals] = useState(0);
  const [referralRewards] = useState(0);
  const [displayHandle, setDisplayHandle] = useState('');
  const [platform, setPlatform] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Determine platform and handle based on available data
    if (gameState.telegramUserId) {
      setPlatform('Telegram');
      // Extract real username from the game username if it follows telegram_id_username format
      const match = gameState.username.match(/telegram_\d+_(.+)/);
      if (match) {
        setDisplayHandle(`@${match[1]}`);
      } else {
        // Fallback to showing the username as-is with @ prefix if it's a telegram user
        setDisplayHandle(`@${gameState.username}`);
      }
    } else if (gameState.discordUserId) {
      setPlatform('Discord');
      // For Discord, extract the username part
      const match = gameState.username.match(/discord_\d+_(.+)/);
      if (match) {
        setDisplayHandle(match[1]);
      } else {
        setDisplayHandle(gameState.username);
      }
    } else {
      // Web user - show as web username
      setPlatform('Web');
      setDisplayHandle(`@${gameState.username}`);
    }
  }, [gameState.username, gameState.telegramUserId, gameState.discordUserId]);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(displayHandle);
    toast({
      title: "Handle Copied!",
      description: `Share your ${platform} handle with friends to earn referral rewards.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-users text-green-400 text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-referral-title">Referral System</h2>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl p-6 text-center border border-green-200 dark:border-green-800" data-testid="stat-total-referrals">
          <i className="fas fa-gift text-4xl text-green-400 mb-3"></i>
          <div className="text-2xl font-bold text-foreground" data-testid="text-total-referrals">{totalReferrals}</div>
          <div className="text-muted-foreground text-sm">Total Referrals</div>
        </div>
        <div className="bg-card rounded-xl p-6 text-center border border-green-200 dark:border-green-800" data-testid="stat-referral-rewards">
          <i className="fas fa-coins text-4xl text-green-400 mb-3"></i>
          <div className="text-2xl font-bold text-foreground" data-testid="text-referral-rewards">{referralRewards} KUSH</div>
          <div className="text-muted-foreground text-sm">Referral Rewards</div>
        </div>
      </div>

      {/* Referral Handle */}
      <div className="bg-card rounded-xl p-6 border border-green-200 dark:border-green-800 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          {platform === 'Telegram' && <i className="fab fa-telegram text-green-400"></i>}
          {platform === 'Discord' && <i className="fab fa-discord text-green-400"></i>}
          {platform === 'Web' && <i className="fas fa-user text-green-400"></i>}
          <h3 className="font-semibold text-green-400">Your {platform} Referral Handle</h3>
        </div>
        
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="text-foreground font-mono text-lg" data-testid="text-referral-username">
            {displayHandle}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          {platform === 'Telegram' && 'This handle is automatically synced with your Telegram username'}
          {platform === 'Discord' && 'This handle is automatically synced with your Discord username'}
          {platform === 'Web' && 'This handle is linked to your wallet address for unified identity'}
        </p>
        
        <button
          onClick={handleCopyUsername}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-bold transition-all duration-200"
          data-testid="button-copy-username"
        >
          <i className="fas fa-copy mr-2"></i>Copy Unified Handle
        </button>
      </div>


      {/* How Referrals Work */}
      <div className="bg-card rounded-xl p-6 border border-green-200 dark:border-green-800 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-info-circle text-green-400"></i>
          <h3 className="font-semibold text-green-400">How Referrals Work</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h4 className="font-semibold text-foreground">Share Your Handle</h4>
              <p className="text-muted-foreground text-sm">
                {platform === 'Telegram' && 'Tell friends your Telegram handle (@username)'}
                {platform === 'Discord' && 'Share your Discord username with friends'}
                {platform === 'Web' && 'Tell friends your KushKlicker username'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h4 className="font-semibold text-foreground">They Use Your Handle</h4>
              <p className="text-muted-foreground text-sm">
                {platform === 'Telegram' && 'Friends use /invite command with your @username'}
                {platform === 'Discord' && 'Friends use /invite command with your Discord handle'}
                {platform === 'Web' && 'Friends enter your username when signing up'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h4 className="font-semibold text-foreground">Earn Rewards</h4>
              <p className="text-muted-foreground text-sm">Get bonus KUSH for each active referral</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Referrals */}
      <div className="bg-card rounded-xl p-6 border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-address-book text-green-400"></i>
          <h3 className="font-semibold text-green-400">Your Referrals</h3>
        </div>
        
        <div className="text-center py-8">
          <i className="fas fa-users text-4xl text-muted-foreground mb-3"></i>
          <p className="text-muted-foreground" data-testid="text-no-referrals">No referrals yet!</p>
          <p className="text-muted-foreground text-sm mt-2">Start sharing your {platform} handle to earn rewards!</p>
        </div>
      </div>
    </div>
  );
}

