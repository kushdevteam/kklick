import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useGameState() {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const queryClient = useQueryClient();

  // Initialize or get player
  useEffect(() => {
    const initializePlayer = async () => {
      const savedPlayerId = localStorage.getItem('kushKlickerPlayerId');
      
      if (savedPlayerId) {
        // Verify player exists in database
        try {
          const response = await apiRequest('GET', `/api/players/${savedPlayerId}`);
          if (response.ok) {
            setPlayerId(savedPlayerId);
            return;
          }
        } catch (error) {
          // Player doesn't exist, clear localStorage and continue initialization
          localStorage.removeItem('kushKlickerPlayerId');
        }
      }
      
      // Get Telegram user data if available
      const tgWebApp = (window as any).Telegram?.WebApp;
      const tgData = tgWebApp?.initDataUnsafe;
      const telegramUserId = tgData?.user?.id?.toString() || null;
      const telegramUsername = tgData?.user?.username ? `@${tgData.user.username}` : null;
      
      // If we have Telegram ID, check if player already exists
      if (telegramUserId) {
        try {
          const response = await apiRequest('GET', `/api/players/telegram/${telegramUserId}`);
          if (response.ok) {
            const existingPlayer = await response.json();
            setPlayerId(existingPlayer.id);
            localStorage.setItem('kushKlickerPlayerId', existingPlayer.id);
            return;
          }
        } catch (error) {
          // Player with this Telegram ID doesn't exist, continue to create new one
        }
      }
      
      // Create new player with Telegram data or fallback to random username
      const username = telegramUsername || `player_${Math.random().toString(36).substr(2, 9)}`;
      try {
        const response = await apiRequest('POST', '/api/players', {
          telegramUserId: telegramUserId || null,
          username,
          totalKush: 0,
          totalClicks: 0,
          perClickMultiplier: 1,
          autoIncomePerHour: 0,
          claimableTokens: 0,
          level: 1,
          prestige: 0,
          totalEarnedKush: 0
        });
        const newPlayer = await response.json();
        setPlayerId(newPlayer.id);
        localStorage.setItem('kushKlickerPlayerId', newPlayer.id);
      } catch (error) {
        console.error('Failed to create player:', error);
        // If username exists, try with a random suffix
        if (error instanceof Error && error.message.includes('Username already exists')) {
          try {
            const fallbackUsername = `${username}_${Math.random().toString(36).substr(2, 5)}`;
            const retryResponse = await apiRequest('POST', '/api/players', {
              telegramUserId: telegramUserId || null,
              username: fallbackUsername,
              totalKush: 0,
              totalClicks: 0,
              perClickMultiplier: 1,
              autoIncomePerHour: 0,
              claimableTokens: 0,
              level: 1,
              prestige: 0,
              totalEarnedKush: 0
            });
            const newPlayer = await retryResponse.json();
            setPlayerId(newPlayer.id);
            localStorage.setItem('kushKlickerPlayerId', newPlayer.id);
          } catch (retryError) {
            console.error('Failed to create player with fallback username:', retryError);
            // If all creation attempts fail, show login to connect to existing account
            setShowLogin(true);
          }
        } else if (error instanceof Error && (
          error.message.includes('already linked') || 
          error.message.includes('wallet') ||
          error.message.includes('Telegram') ||
          error.message.includes('Discord')
        )) {
          // Account already exists with this data, show login to reconnect
          console.log('Account already exists, showing login to reconnect');
          setShowLogin(true);
        } else {
          // Unknown error, show login as fallback
          setShowLogin(true);
        }
      }
    };

    initializePlayer();
  }, []);

  // Get player data
  const { data: gameState, isLoading, error } = useQuery({
    queryKey: ['/api/players', playerId],
    enabled: !!playerId,
    retry: (failureCount, error: any) => {
      // If player not found, clear localStorage and trigger re-initialization
      if (error?.status === 404 && playerId) {
        localStorage.removeItem('kushKlickerPlayerId');
        setPlayerId(null);
        window.location.reload(); // Force refresh to create new player
        return false;
      }
      return failureCount < 3;
    }
  });

  // Auto-income is now handled server-side during clicks to prevent sync issues
  // The enhanced-click endpoint calculates accumulated auto-income since last activity

  const defaultGameState = {
    id: playerId || '',
    telegramUserId: null,
    username: 'player',
    totalKush: 0,
    totalClicks: 0,
    perClickMultiplier: 1,
    autoIncomePerHour: 0,
    claimableTokens: 0,
    walletAddress: null,
    solanaNetwork: 'devnet' as const,
    walletSyncEnabled: true,
    lastWalletSync: null,
    referredBy: null,
    tutorialCompleted: false,
    level: 1,
    prestige: 0,
    totalEarnedKush: 0,
    createdAt: new Date(),
    lastActive: new Date()
  };

  // Handle successful login
  const handleLoginSuccess = (newPlayerId: string) => {
    setPlayerId(newPlayerId);
    setShowLogin(false);
    localStorage.setItem('kushKlickerPlayerId', newPlayerId);
  };

  // Handle creating new account from login screen
  const handleCreateNewAccount = () => {
    setShowLogin(false);
    localStorage.removeItem('kushKlickerPlayerId');
    window.location.reload(); // Trigger re-initialization with fresh state
  };

  return {
    gameState: gameState || defaultGameState,
    isLoading: isLoading && !gameState,
    error,
    isPlayerReady: !!(playerId && gameState),
    showLogin,
    handleLoginSuccess,
    handleCreateNewAccount,
    refetchGameState: () => queryClient.invalidateQueries({ queryKey: ['/api/players', playerId] })
  };
}
