/**
 * Integration Manager for KushKlicker Enhanced Systems
 * Coordinates all new systems: idle progress, achievements, leaderboards, social features
 */

import { idleProgressSystem } from './idle-progress-system';
import { achievementNotificationSystem } from './achievement-notification-system';
import { enhancedLeaderboardSystem } from './enhanced-leaderboards';
import { socialFeaturesSystem } from './social-features';
import { performanceOptimizer } from './performance-optimizer';
import { referralSystem } from './referral-system';

export class IntegrationManager {
  constructor(private storage: any, private webSocketServer?: any) {
    this.initializeSystems();
  }

  private initializeSystems(): void {
    console.log('🚀 Initializing KushKlicker Enhanced Systems...');
    
    // Initialize systems with storage
    if (this.storage) {
      // Set storage for systems that need it
      (achievementNotificationSystem as any).storage = this.storage;
      (enhancedLeaderboardSystem as any).storage = this.storage;
      (socialFeaturesSystem as any).storage = this.storage;
      (referralSystem as any).storage = this.storage;
    }
    
    console.log('✅ All enhanced systems initialized');
  }

  /**
   * Process player action and trigger all relevant systems
   */
  async processPlayerAction(
    playerId: string,
    actionType: 'click' | 'upgrade' | 'burn' | 'login',
    actionData?: any
  ): Promise<void> {
    try {
      // Update last active time for idle system
      await idleProgressSystem.updateLastActive(playerId, this.storage);
      
      // Check for achievements
      await achievementNotificationSystem.checkAndNotifyAchievement(
        playerId,
        actionType,
        actionData
      );
      
      // Update performance metrics
      performanceOptimizer.trackRequest(`action:${actionType}`, 100, true);
      
    } catch (error) {
      console.error('❌ Integration manager error:', error);
    }
  }

  /**
   * Get comprehensive player dashboard data
   */
  async getPlayerDashboard(playerId: string): Promise<any> {
    try {
      const [idleEarnings, notifications, leaderboardPosition, guilds, referralStats] = await Promise.all([
        idleProgressSystem.getIdlePreview(playerId, this.storage),
        achievementNotificationSystem.getPendingNotifications(playerId),
        enhancedLeaderboardSystem.getLeaderboard('kush', 100).then(board => 
          board.findIndex(entry => entry.playerId === playerId) + 1
        ),
        socialFeaturesSystem.getPlayerGuilds(playerId),
        referralSystem.getReferralStats(playerId)
      ]);

      return {
        idleEarnings,
        notifications: notifications.slice(0, 5), // Latest 5
        leaderboardRank: leaderboardPosition,
        guilds: guilds.slice(0, 3), // Top 3 guilds
        referralStats
      };
    } catch (error) {
      console.error('❌ Dashboard data error:', error);
      return {};
    }
  }

  /**
   * Get system health metrics
   */
  getSystemHealth(): any {
    return {
      performance: performanceOptimizer.getMetrics(),
      cache: performanceOptimizer.getCacheStats(),
      activeCompetitions: enhancedLeaderboardSystem.getActiveCompetitions().length,
      publicGuilds: socialFeaturesSystem.getPublicGuilds().length
    };
  }

  /**
   * Initialize with WebSocket server
   */
  setWebSocketServer(webSocketServer: any): void {
    this.webSocketServer = webSocketServer;
    
    // Reinitialize systems that need WebSocket
    if (webSocketServer) {
      (achievementNotificationSystem as any).webSocketServer = webSocketServer;
      (socialFeaturesSystem as any).webSocketServer = webSocketServer;
    }
  }
}

// Export singleton
export const integrationManager = new IntegrationManager(null);