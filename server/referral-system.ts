/**
 * Friend Referral System
 * Reward players for inviting friends with bonus KUSH and tokens
 * SECURITY: Address scanning only - no wallet connections
 */

interface ReferralCode {
  id: string;
  playerId: string;
  code: string;
  createdAt: Date;
  usedCount: number;
  maxUses: number;
  active: boolean;
  bonusMultiplier: number;
}

interface ReferralReward {
  id: string;
  referrerId: string;
  refereeId: string;
  referralCode: string;
  rewardType: 'kush' | 'tokens' | 'upgrade';
  amount: number;
  milestone: string;
  claimedAt: Date;
  status: 'pending' | 'claimed' | 'expired';
}

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalRewardsEarned: number;
  referralRank: number;
  lifetimeValue: number;
  conversionRate: number;
}

interface ReferralMilestone {
  referralCount: number;
  rewardType: 'kush' | 'tokens' | 'special';
  amount: number;
  description: string;
  icon: string;
}

export class ReferralSystem {
  private referralCodes: Map<string, ReferralCode> = new Map();
  private referralRewards: Map<string, ReferralReward[]> = new Map();
  
  // Referral reward tiers
  private milestones: ReferralMilestone[] = [
    {
      referralCount: 1,
      rewardType: 'kush',
      amount: 1000,
      description: 'First Friend Bonus',
      icon: '🎉'
    },
    {
      referralCount: 5,
      rewardType: 'tokens',
      amount: 100,
      description: 'Social Butterfly',
      icon: '🦋'
    },
    {
      referralCount: 10,
      rewardType: 'tokens',
      amount: 500,
      description: 'Community Builder',
      icon: '🏗️'
    },
    {
      referralCount: 25,
      rewardType: 'tokens',
      amount: 1500,
      description: 'Influencer Status',
      icon: '⭐'
    },
    {
      referralCount: 50,
      rewardType: 'tokens',
      amount: 5000,
      description: 'KUSH Ambassador',
      icon: '👑'
    }
  ];

  constructor(private storage: any) {
    console.log('🤝 Referral System initialized');
  }

  /**
   * Create a referral code for a player
   */
  async createReferralCode(playerId: string): Promise<ReferralCode | null> {
    try {
      const player = await this.storage.getPlayer(playerId);
      if (!player) return null;

      // Check if player already has an active code
      const existingCode = Array.from(this.referralCodes.values())
        .find(code => code.playerId === playerId && code.active);
      
      if (existingCode) {
        return existingCode;
      }

      const referralCode: ReferralCode = {
        id: this.generateCodeId(),
        playerId,
        code: this.generateReferralCode(player.username),
        createdAt: new Date(),
        usedCount: 0,
        maxUses: 100, // Max 100 uses per code
        active: true,
        bonusMultiplier: 1.0
      };

      this.referralCodes.set(referralCode.id, referralCode);
      console.log(`🎫 Referral code created: ${referralCode.code} for player ${playerId}`);
      
      return referralCode;

    } catch (error) {
      console.error('❌ Create referral code error:', error);
      return null;
    }
  }

  /**
   * Use a referral code when a new player joins
   */
  async useReferralCode(
    newPlayerId: string,
    referralCode: string
  ): Promise<{ success: boolean; reward?: ReferralReward }> {
    try {
      // Find the referral code
      const codeEntry = Array.from(this.referralCodes.values())
        .find(code => code.code === referralCode && code.active);

      if (!codeEntry) {
        return { success: false };
      }

      if (codeEntry.usedCount >= codeEntry.maxUses) {
        return { success: false };
      }

      // Prevent self-referral
      if (codeEntry.playerId === newPlayerId) {
        return { success: false };
      }

      // Update code usage
      codeEntry.usedCount++;

      // Create reward for referrer
      const reward = await this.createReferralReward(
        codeEntry.playerId,
        newPlayerId,
        referralCode
      );

      console.log(`✅ Referral code used: ${referralCode} by player ${newPlayerId}`);
      return { success: true, reward };

    } catch (error) {
      console.error('❌ Use referral code error:', error);
      return { success: false };
    }
  }

  /**
   * Get referral stats for a player
   */
  async getReferralStats(playerId: string): Promise<ReferralStats> {
    try {
      const rewards = this.referralRewards.get(playerId) || [];
      const totalReferrals = rewards.length;
      
      // Count active referrals (joined in last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const activeReferrals = rewards.filter(reward => 
        new Date(reward.claimedAt) > thirtyDaysAgo
      ).length;

      const totalRewardsEarned = rewards
        .filter(reward => reward.status === 'claimed')
        .reduce((sum, reward) => sum + reward.amount, 0);

      // Calculate referral rank (simplified)
      const rank = this.calculateReferralRank(totalReferrals);

      return {
        totalReferrals,
        activeReferrals,
        totalRewardsEarned,
        referralRank: rank,
        lifetimeValue: totalRewardsEarned * 2, // Simplified LTV calculation
        conversionRate: totalReferrals > 0 ? Math.round((activeReferrals / totalReferrals) * 100) : 0
      };

    } catch (error) {
      console.error('❌ Get referral stats error:', error);
      return {
        totalReferrals: 0,
        activeReferrals: 0,
        totalRewardsEarned: 0,
        referralRank: 0,
        lifetimeValue: 0,
        conversionRate: 0
      };
    }
  }

  /**
   * Get available referral milestones
   */
  getReferralMilestones(): ReferralMilestone[] {
    return [...this.milestones];
  }

  /**
   * Check and award milestone rewards
   */
  async checkMilestoneRewards(playerId: string): Promise<ReferralReward[]> {
    try {
      const stats = await this.getReferralStats(playerId);
      const newRewards: ReferralReward[] = [];

      for (const milestone of this.milestones) {
        if (stats.totalReferrals >= milestone.referralCount) {
          // Check if already awarded
          const existingReward = (this.referralRewards.get(playerId) || [])
            .find(reward => reward.milestone === milestone.description);

          if (!existingReward) {
            const reward = await this.createMilestoneReward(playerId, milestone);
            if (reward) {
              newRewards.push(reward);
            }
          }
        }
      }

      return newRewards;

    } catch (error) {
      console.error('❌ Check milestone rewards error:', error);
      return [];
    }
  }

  private async createReferralReward(
    referrerId: string,
    refereeId: string,
    referralCode: string
  ): Promise<ReferralReward | null> {
    try {
      const reward: ReferralReward = {
        id: this.generateRewardId(),
        referrerId,
        refereeId,
        referralCode,
        rewardType: 'kush',
        amount: 500, // Base referral reward
        milestone: 'New Referral',
        claimedAt: new Date(),
        status: 'claimed'
      };

      // Add to storage
      if (!this.referralRewards.has(referrerId)) {
        this.referralRewards.set(referrerId, []);
      }
      this.referralRewards.get(referrerId)!.push(reward);

      // Award the reward
      await this.storage.addKushToPlayer(referrerId, reward.amount);

      console.log(`💰 Referral reward awarded: ${reward.amount} KUSH to ${referrerId}`);
      return reward;

    } catch (error) {
      console.error('❌ Create referral reward error:', error);
      return null;
    }
  }

  private async createMilestoneReward(
    playerId: string,
    milestone: ReferralMilestone
  ): Promise<ReferralReward | null> {
    try {
      const reward: ReferralReward = {
        id: this.generateRewardId(),
        referrerId: playerId,
        refereeId: 'milestone',
        referralCode: 'milestone',
        rewardType: milestone.rewardType,
        amount: milestone.amount,
        milestone: milestone.description,
        claimedAt: new Date(),
        status: 'claimed'
      };

      // Add to storage
      if (!this.referralRewards.has(playerId)) {
        this.referralRewards.set(playerId, []);
      }
      this.referralRewards.get(playerId)!.push(reward);

      // Award the reward
      if (milestone.rewardType === 'kush') {
        await this.storage.addKushToPlayer(playerId, milestone.amount);
      }
      // TODO: Handle token rewards

      console.log(`🏆 Milestone reward: ${milestone.description} (${milestone.amount}) to ${playerId}`);
      return reward;

    } catch (error) {
      console.error('❌ Create milestone reward error:', error);
      return null;
    }
  }

  private generateReferralCode(username: string): string {
    const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const shortUsername = cleanUsername.substring(0, 4);
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${shortUsername}${randomSuffix}`;
  }

  private generateCodeId(): string {
    return `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateRewardId(): string {
    return `reward_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateReferralRank(totalReferrals: number): number {
    if (totalReferrals >= 50) return 1; // Ambassador
    if (totalReferrals >= 25) return 2; // Influencer
    if (totalReferrals >= 10) return 3; // Builder
    if (totalReferrals >= 5) return 4;  // Butterfly
    if (totalReferrals >= 1) return 5;  // Starter
    return 10; // No referrals
  }
}

// Export singleton instance
export const referralSystem = new ReferralSystem(null);