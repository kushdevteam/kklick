/**
 * Achievement Notification System
 * Real-time achievement notifications with celebration effects
 * SECURITY: Address scanning only - no wallet connections
 */

interface AchievementNotification {
  id: string;
  playerId: string;
  achievementId: string;
  title: string;
  description: string;
  icon: string;
  rewardType: 'kush' | 'tokens' | 'upgrade' | 'special';
  rewardAmount: number;
  timestamp: Date;
  celebrationEffect: 'sparkles' | 'fireworks' | 'golden' | 'rainbow' | 'cosmic';
  soundEffect: 'chime' | 'fanfare' | 'epic' | 'cosmic' | 'coin';
}

interface NotificationQueue {
  [playerId: string]: AchievementNotification[];
}

export class AchievementNotificationSystem {
  private notificationQueue: NotificationQueue = {};
  private webSocketClients: Map<string, any> = new Map();

  constructor(private storage: any, private webSocketServer?: any) {
    if (webSocketServer) {
      this.setupWebSocketHandlers();
    }
  }

  private setupWebSocketHandlers(): void {
    if (!this.webSocketServer) return;

    this.webSocketServer.on('connection', (ws: any, req: any) => {
      // Extract player ID from connection (you'll need to implement auth)
      const playerId = this.extractPlayerIdFromRequest(req);
      if (playerId) {
        this.webSocketClients.set(playerId, ws);
        console.log(`🔗 Achievement notification client connected: ${playerId}`);

        ws.on('close', () => {
          this.webSocketClients.delete(playerId);
          console.log(`🔌 Achievement notification client disconnected: ${playerId}`);
        });
      }
    });
  }

  private extractPlayerIdFromRequest(req: any): string | null {
    // Extract player ID from query params, headers, or JWT token
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      return url.searchParams.get('playerId');
    } catch {
      return null;
    }
  }

  /**
   * Create and queue an achievement notification
   */
  async createNotification(
    playerId: string,
    achievementId: string,
    customTitle?: string,
    customReward?: { type: 'kush' | 'tokens'; amount: number }
  ): Promise<void> {
    try {
      const achievement = await this.getAchievementDetails(achievementId);
      if (!achievement) {
        console.error(`❌ Achievement not found: ${achievementId}`);
        return;
      }

      const notification: AchievementNotification = {
        id: this.generateNotificationId(),
        playerId,
        achievementId,
        title: customTitle || achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        rewardType: customReward?.type || achievement.rewardType,
        rewardAmount: customReward?.amount || achievement.rewardAmount,
        timestamp: new Date(),
        celebrationEffect: this.selectCelebrationEffect(achievement.tier),
        soundEffect: this.selectSoundEffect(achievement.tier)
      };

      // Add to queue
      if (!this.notificationQueue[playerId]) {
        this.notificationQueue[playerId] = [];
      }
      this.notificationQueue[playerId].push(notification);

      // Send real-time notification if client connected
      await this.sendRealTimeNotification(playerId, notification);

      // Log achievement
      console.log(`🏆 Achievement notification: ${notification.title} for player ${playerId}`);
      
    } catch (error) {
      console.error('❌ Achievement notification creation error:', error);
    }
  }

  private async getAchievementDetails(achievementId: string) {
    const achievementMap: { [key: string]: any } = {
      'first-click': {
        name: '🎯 First Click!',
        description: 'Welcome to KushKlicker! Keep clicking to grow your empire.',
        icon: '🎯',
        tier: 'bronze',
        rewardType: 'kush' as const,
        rewardAmount: 10
      },
      'click-master-100': {
        name: '👆 Click Master',
        description: 'You\'ve clicked 100 times! Your dedication is showing.',
        icon: '👆',
        tier: 'bronze',
        rewardType: 'kush' as const,
        rewardAmount: 50
      },
      'click-legend-1000': {
        name: '🔥 Click Legend',
        description: '1,000 clicks achieved! You\'re becoming unstoppable.',
        icon: '🔥',
        tier: 'silver',
        rewardType: 'kush' as const,
        rewardAmount: 200
      },
      'click-god-10000': {
        name: '⚡ Click God',
        description: '10,000 clicks! Your clicking power knows no bounds.',
        icon: '⚡',
        tier: 'gold',
        rewardType: 'tokens' as const,
        rewardAmount: 100
      },
      'first-upgrade': {
        name: '📈 First Upgrade',
        description: 'Smart investment! Upgrades multiply your earning power.',
        icon: '📈',
        tier: 'bronze',
        rewardType: 'kush' as const,
        rewardAmount: 25
      },
      'kush-millionaire': {
        name: '💎 KUSH Millionaire',
        description: 'You\'ve earned 1 million KUSH! Welcome to the elite.',
        icon: '💎',
        tier: 'diamond',
        rewardType: 'tokens' as const,
        rewardAmount: 1000
      }
    };

    return achievementMap[achievementId] || null;
  }

  private selectCelebrationEffect(tier: string): 'sparkles' | 'fireworks' | 'golden' | 'rainbow' | 'cosmic' {
    const effectMap: { [key: string]: 'sparkles' | 'fireworks' | 'golden' | 'rainbow' | 'cosmic' } = {
      bronze: 'sparkles',
      silver: 'fireworks',
      gold: 'golden',
      platinum: 'rainbow',
      diamond: 'cosmic'
    };
    return effectMap[tier] || 'sparkles';
  }

  private selectSoundEffect(tier: string): 'chime' | 'fanfare' | 'epic' | 'cosmic' | 'coin' {
    const soundMap: { [key: string]: 'chime' | 'fanfare' | 'epic' | 'cosmic' | 'coin' } = {
      bronze: 'chime',
      silver: 'coin',
      gold: 'fanfare',
      platinum: 'epic',
      diamond: 'cosmic'
    };
    return soundMap[tier] || 'chime';
  }

  private generateNotificationId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async sendRealTimeNotification(playerId: string, notification: AchievementNotification): Promise<void> {
    try {
      const client = this.webSocketClients.get(playerId);
      if (client && client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify({
          type: 'achievement_notification',
          data: notification
        }));
        console.log(`📡 Real-time notification sent to ${playerId}`);
      }
    } catch (error) {
      console.error('❌ Real-time notification error:', error);
    }
  }

  /**
   * Get pending notifications for a player
   */
  async getPendingNotifications(playerId: string): Promise<AchievementNotification[]> {
    return this.notificationQueue[playerId] || [];
  }

  /**
   * Mark notifications as seen
   */
  async markNotificationsAsSeen(playerId: string, notificationIds: string[]): Promise<void> {
    try {
      if (!this.notificationQueue[playerId]) return;

      this.notificationQueue[playerId] = this.notificationQueue[playerId].filter(
        notification => !notificationIds.includes(notification.id)
      );

      console.log(`✅ Marked ${notificationIds.length} notifications as seen for player ${playerId}`);
    } catch (error) {
      console.error('❌ Mark notifications seen error:', error);
    }
  }

  /**
   * Check and notify achievement based on player action
   */
  async checkAndNotifyAchievement(
    playerId: string,
    actionType: 'click' | 'upgrade' | 'burn' | 'login',
    actionData?: any
  ): Promise<void> {
    try {
      const player = await this.storage.getPlayer(playerId);
      if (!player) return;

      // Check for achievements based on action type
      if (actionType === 'click') {
        // Check click-based achievements
        if (player.totalClicks === 1) {
          await this.createNotification(playerId, 'first-click');
        } else if (player.totalClicks === 100) {
          await this.createNotification(playerId, 'click-master-100');
        } else if (player.totalClicks === 1000) {
          await this.createNotification(playerId, 'click-legend-1000');
        } else if (player.totalClicks === 10000) {
          await this.createNotification(playerId, 'click-god-10000');
        }
      } else if (actionType === 'upgrade') {
        // Check upgrade-based achievements
        const upgrades = await this.storage.getPlayerUpgrades(playerId);
        if (upgrades && upgrades.length === 1) {
          await this.createNotification(playerId, 'first-upgrade');
        }
      }

      // Check KUSH-based achievements
      if (player.totalKush >= 1000000) {
        await this.createNotification(playerId, 'kush-millionaire');
      }

    } catch (error) {
      console.error('❌ Achievement check error:', error);
    }
  }
}

// Export singleton instance
export const achievementNotificationSystem = new AchievementNotificationSystem(null);