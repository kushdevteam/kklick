/**
 * Enhanced Leaderboards System
 * Weekly competitions with token prizes and multiple categories
 * SECURITY: Address scanning only - no wallet connections
 */

interface LeaderboardEntry {
  playerId: string;
  username: string;
  value: number;
  rank: number;
  change: number; // Position change from last period
  walletAddress?: string;
  hasWallet: boolean;
  achievementCount: number;
  lastActive: Date;
}

interface Competition {
  id: string;
  name: string;
  description: string;
  category: 'kush' | 'clicks' | 'upgrades' | 'burns' | 'referrals';
  startDate: Date;
  endDate: Date;
  prizePool: number; // In KUSH tokens
  prizeTiers: { rank: number; amount: number }[];
  participants: number;
  status: 'upcoming' | 'active' | 'ended';
  winners?: LeaderboardEntry[];
}

interface LeaderboardStats {
  totalPlayers: number;
  activeThisWeek: number;
  totalKushEarned: number;
  totalClicks: number;
  averageKushPerPlayer: number;
  topPerformerGrowth: number;
}

export class EnhancedLeaderboardSystem {
  private competitions: Map<string, Competition> = new Map();
  private cachedLeaderboards: Map<string, LeaderboardEntry[]> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(private storage: any) {
    this.initializeWeeklyCompetitions();
  }

  /**
   * Initialize weekly competitions
   */
  private initializeWeeklyCompetitions(): void {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of current week
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    // KUSH Earning Championship
    this.competitions.set('weekly-kush', {
      id: 'weekly-kush',
      name: '💰 KUSH Earning Championship',
      description: 'Earn the most KUSH this week to win token prizes!',
      category: 'kush',
      startDate: weekStart,
      endDate: weekEnd,
      prizePool: 5000,
      prizeTiers: [
        { rank: 1, amount: 2000 },
        { rank: 2, amount: 1500 },
        { rank: 3, amount: 1000 },
        { rank: 4, amount: 300 },
        { rank: 5, amount: 200 }
      ],
      participants: 0,
      status: 'active'
    });

    // Click Speed Challenge
    this.competitions.set('weekly-clicks', {
      id: 'weekly-clicks',
      name: '⚡ Click Speed Challenge',
      description: 'Who can click the most this week?',
      category: 'clicks',
      startDate: weekStart,
      endDate: weekEnd,
      prizePool: 3000,
      prizeTiers: [
        { rank: 1, amount: 1200 },
        { rank: 2, amount: 900 },
        { rank: 3, amount: 600 },
        { rank: 4, amount: 200 },
        { rank: 5, amount: 100 }
      ],
      participants: 0,
      status: 'active'
    });

    // Burn Master Competition
    this.competitions.set('weekly-burns', {
      id: 'weekly-burns',
      name: '🔥 Burn Master Competition',
      description: 'Burn the most tokens to prove your dedication!',
      category: 'burns',
      startDate: weekStart,
      endDate: weekEnd,
      prizePool: 8000,
      prizeTiers: [
        { rank: 1, amount: 4000 },
        { rank: 2, amount: 2000 },
        { rank: 3, amount: 1500 },
        { rank: 4, amount: 300 },
        { rank: 5, amount: 200 }
      ],
      participants: 0,
      status: 'active'
    });

    console.log(`🏆 Initialized ${this.competitions.size} weekly competitions`);
  }

  /**
   * Get leaderboard for specific category with caching
   */
  async getLeaderboard(
    category: 'kush' | 'clicks' | 'upgrades' | 'burns' | 'referrals' | 'all-time',
    limit: number = 50,
    timeframe: 'weekly' | 'monthly' | 'all-time' = 'all-time'
  ): Promise<LeaderboardEntry[]> {
    try {
      const cacheKey = `${category}-${timeframe}-${limit}`;
      
      // Check cache first
      if (this.isCacheValid(cacheKey)) {
        const cached = this.cachedLeaderboards.get(cacheKey);
        if (cached) {
          console.log(`📊 Returning cached leaderboard: ${cacheKey}`);
          return cached;
        }
      }

      console.log(`🔄 Generating fresh leaderboard: ${cacheKey}`);
      const players = await this.storage.getAllPlayers();
      const leaderboard = await this.processLeaderboardData(players, category, timeframe);
      
      // Sort and limit results
      const sortedLeaderboard = leaderboard
        .sort((a, b) => b.value - a.value)
        .slice(0, limit)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

      // Cache results
      this.cachedLeaderboards.set(cacheKey, sortedLeaderboard);
      this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);

      console.log(`✅ Generated leaderboard with ${sortedLeaderboard.length} entries`);
      return sortedLeaderboard;

    } catch (error) {
      console.error('❌ Leaderboard generation error:', error);
      return [];
    }
  }

  private async processLeaderboardData(
    players: any[],
    category: string,
    timeframe: string
  ): Promise<LeaderboardEntry[]> {
    const leaderboard: LeaderboardEntry[] = [];

    for (const player of players) {
      let value = 0;

      // Calculate value based on category
      switch (category) {
        case 'kush':
          value = player.totalKush || 0;
          break;
        case 'clicks':
          value = player.totalClicks || 0;
          break;
        case 'burns':
          value = player.totalTokensBurned || 0;
          break;
        case 'upgrades':
          const upgrades = await this.storage.getPlayerUpgrades(player.id);
          value = upgrades ? upgrades.length : 0;
          break;
        case 'referrals':
          const referrals = await this.storage.getPlayerReferrals(player.id);
          value = referrals ? referrals.length : 0;
          break;
        default:
          value = player.totalKush || 0;
      }

      leaderboard.push({
        playerId: player.id,
        username: player.username,
        value,
        rank: 0, // Will be set later
        change: 0, // TODO: Calculate from previous period
        walletAddress: player.walletAddress,
        hasWallet: !!player.walletAddress,
        achievementCount: 0, // TODO: Calculate achievements
        lastActive: new Date(player.lastActiveTime || player.lastActive)
      });
    }

    return leaderboard;
  }

  private isCacheValid(cacheKey: string): boolean {
    const expiry = this.cacheExpiry.get(cacheKey);
    return expiry ? Date.now() < expiry : false;
  }

  /**
   * Get active competitions
   */
  getActiveCompetitions(): Competition[] {
    return Array.from(this.competitions.values()).filter(comp => comp.status === 'active');
  }

  /**
   * Get competition by ID
   */
  getCompetition(competitionId: string): Competition | undefined {
    return this.competitions.get(competitionId);
  }

  /**
   * Get leaderboard stats
   */
  async getLeaderboardStats(): Promise<LeaderboardStats> {
    try {
      const players = await this.storage.getAllPlayers();
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const activeThisWeek = players.filter((player: any) => {
        const lastActive = new Date(player.lastActiveTime || player.lastActive);
        return lastActive > weekAgo;
      }).length;

      const totalKushEarned = players.reduce((sum: number, player: any) => sum + (player.totalKush || 0), 0);
      const totalClicks = players.reduce((sum: number, player: any) => sum + (player.totalClicks || 0), 0);

      return {
        totalPlayers: players.length,
        activeThisWeek,
        totalKushEarned,
        totalClicks,
        averageKushPerPlayer: players.length > 0 ? Math.floor(totalKushEarned / players.length) : 0,
        topPerformerGrowth: 0 // TODO: Calculate growth percentage
      };

    } catch (error) {
      console.error('❌ Leaderboard stats error:', error);
      return {
        totalPlayers: 0,
        activeThisWeek: 0,
        totalKushEarned: 0,
        totalClicks: 0,
        averageKushPerPlayer: 0,
        topPerformerGrowth: 0
      };
    }
  }

  /**
   * Clear leaderboard cache
   */
  clearCache(): void {
    this.cachedLeaderboards.clear();
    this.cacheExpiry.clear();
    console.log('🗑️ Leaderboard cache cleared');
  }
}

// Export singleton instance
export const enhancedLeaderboardSystem = new EnhancedLeaderboardSystem(null);