/**
 * Token Integration Service for KushKlicker
 * Integrates Solana token payouts with game mechanics
 */

import { storage } from './storage';
import { mainnetTokenService } from './solana-token-service';
import type { Player, Achievement, PlayerAchievement } from '@shared/schema';

interface TokenRewardEvent {
  type: 'achievement' | 'milestone' | 'referral' | 'daily_bonus';
  playerId: string;
  amount: number;
  reason: string;
  walletAddress: string;
  network: 'mainnet';
}

class TokenIntegrationService {
  
  /**
   * Check and process token rewards when a player achieves something
   */
  async processAchievementCompletion(
    player: Player, 
    achievement: Achievement, 
    playerAchievement: PlayerAchievement
  ): Promise<void> {
    // Only process if achievement was just completed
    if (!playerAchievement.completed || !player.walletAddress) {
      return;
    }

    // Use mainnet only
    const tokenService = mainnetTokenService;

    try {
      // Map achievement types to token rewards
      const achievementRewardMap: Record<string, string> = {
        'First Steps': 'firstClick',
        'Collect 5 KUSH': 'firstClick',
        'Clicker Pro': 'first100Clicks',
        'Kush Master': 'first1000Clicks',
        'Ultimate Clicker': 'first10000Clicks',
        'First Purchase': 'firstUpgrade',
        'Million KUSH Club': 'firstMillionaire',
        'Wallet Connected': 'walletConnection'
      };

      const rewardKey = achievementRewardMap[achievement.name];
      if (!rewardKey) {
        console.log(`No token reward mapped for achievement: ${achievement.name}`);
        return;
      }

      // Check if player has already received this type of achievement reward
      const existingPayouts = await storage.getPlayerTokenPayouts(player.id);
      const rewardAlreadyExists = existingPayouts.some(payout => 
        payout.reason.includes(`Achievement: ${rewardKey}`) || 
        payout.reason.includes(`Achievement reward: ${rewardKey}`) ||
        (payout.reason.includes('Achievement:') && payout.reason.includes(achievement.name))
      );

      if (rewardAlreadyExists) {
        console.log(`⏭️ Skipping duplicate reward for ${achievement.name} (${rewardKey}) - already exists for player ${player.id}`);
        return;
      }

      // Process the achievement reward
      const payoutEvent = await tokenService.processAchievementReward(
        player.id,
        rewardKey,
        player.walletAddress
      );

      if (payoutEvent) {
        // Save the payout to database with consistent naming
        await storage.createTokenPayout({
          playerId: player.id,
          walletAddress: player.walletAddress,
          amount: payoutEvent.amount,
          reason: `Achievement: ${achievement.name}`,
          network: network,
          status: 'pending'
        });

        console.log(`🏆 Token reward queued for player ${player.id}: ${payoutEvent.amount} $KUSH tokens for "${achievement.name}"`);
      }

    } catch (error) {
      console.error('❌ Failed to process achievement token reward:', error);
    }
  }

  /**
   * Check and process milestone rewards based on total KUSH earned
   */
  async processMilestoneRewards(player: Player): Promise<void> {
    if (!player.walletAddress) return;

    // Use mainnet only
    const tokenService = mainnetTokenService;

    try {
      // Check if player has reached any new milestones
      const milestones = [1000, 10000, 100000, 1000000]
        .sort((a, b) => a - b); // Ascending order

      for (const milestone of milestones) {
        if (player.totalKush >= milestone) {
          // Check if we've already paid out for this milestone
          const existingPayouts = await storage.getPlayerTokenPayouts(player.id);
          const milestoneAlreadyPaid = existingPayouts.some(
            payout => payout.reason.includes(`Milestone: ${milestone} KUSH`) && 
                     payout.status === 'completed'
          );

          if (!milestoneAlreadyPaid) {
            const payoutEvent = await tokenService.processMilestoneReward(
              player.id,
              milestone,
              player.walletAddress
            );

            if (payoutEvent) {
              await storage.createTokenPayout({
                playerId: player.id,
                walletAddress: player.walletAddress,
                amount: payoutEvent.amount,
                reason: payoutEvent.reason,
                network: network,
                status: 'pending'
              });

              console.log(`🎯 Milestone reward queued: ${milestone} KUSH → ${payoutEvent.amount} tokens`);
            }
          }
        }
      }

    } catch (error) {
      console.error('❌ Failed to process milestone rewards:', error);
    }
  }

  /**
   * Process referral bonus when a player refers someone
   */
  async processReferralBonus(referrerPlayer: Player, referredPlayer: Player): Promise<void> {
    if (!referrerPlayer.walletAddress) return;

    const network = referrerPlayer.solanaNetwork as 'devnet' | 'mainnet';
    const tokenService = network === 'mainnet' ? mainnetTokenService : devnetTokenService;

    try {
      const payoutEvent = await tokenService.processAchievementReward(
        referrerPlayer.id,
        'referralBonus',
        referrerPlayer.walletAddress
      );

      if (payoutEvent) {
        await storage.createTokenPayout({
          playerId: referrerPlayer.id,
          walletAddress: referrerPlayer.walletAddress,
          amount: payoutEvent.amount,
          reason: `Referral bonus: ${referredPlayer.username}`,
          network: network,
          status: 'pending'
        });

        console.log(`👥 Referral bonus queued: ${payoutEvent.amount} tokens for ${referrerPlayer.username}`);
      }

    } catch (error) {
      console.error('❌ Failed to process referral bonus:', error);
    }
  }

  /**
   * Process weekly active player bonus
   */
  async processWeeklyActiveBonus(player: Player): Promise<void> {
    if (!player.walletAddress) return;

    // Use mainnet only
    const tokenService = mainnetTokenService;

    try {
      // Check if player has already received weekly bonus this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const recentPayouts = await storage.getPlayerTokenPayouts(player.id);
      const hasWeeklyBonus = recentPayouts.some(payout => 
        payout.reason.includes('Weekly active') && 
        payout.createdAt > oneWeekAgo
      );

      if (!hasWeeklyBonus) {
        const payoutEvent = await tokenService.processAchievementReward(
          player.id,
          'weeklyActive',
          player.walletAddress
        );

        if (payoutEvent) {
          await storage.createTokenPayout({
            playerId: player.id,
            walletAddress: player.walletAddress,
            amount: payoutEvent.amount,
            reason: 'Weekly active player bonus',
            network: network,
            status: 'pending'
          });

          console.log(`📅 Weekly bonus queued: ${payoutEvent.amount} tokens for ${player.username}`);
        }
      }

    } catch (error) {
      console.error('❌ Failed to process weekly bonus:', error);
    }
  }

  /**
   * Process all pending token payouts for a specific network
   */
  async processPendingPayouts(network: 'devnet' | 'mainnet' = 'devnet'): Promise<void> {
    const tokenService = network === 'mainnet' ? mainnetTokenService : devnetTokenService;

    try {
      const pendingPayouts = await storage.getPendingTokenPayouts(network);
      console.log(`🔄 Processing ${pendingPayouts.length} pending payouts on ${network}`);

      for (const payout of pendingPayouts) {
        try {
          // Attempt to distribute tokens
          const txSignature = await tokenService.distributeTokens(
            payout.walletAddress,
            payout.amount,
            payout.reason
          );

          // Update payout status to completed
          await storage.updateTokenPayoutStatus(
            payout.id,
            'completed',
            txSignature
          );

          console.log(`✅ Payout completed: ${payout.amount} tokens to ${payout.walletAddress}`);

        } catch (error) {
          console.error(`❌ Failed to process payout ${payout.id}:`, error);
          
          // Mark as failed after 3 attempts (implement retry logic)
          await storage.updateTokenPayoutStatus(payout.id, 'failed');
        }
      }

    } catch (error) {
      console.error('❌ Failed to process pending payouts:', error);
    }
  }

  /**
   * Get token summary for a player
   */
  async getPlayerTokenSummary(playerId: string): Promise<{
    totalEarned: number;
    totalClaimed: number;
    pendingClaims: number;
    recentPayouts: any[];
  }> {
    try {
      const payouts = await storage.getPlayerTokenPayouts(playerId);
      
      const totalEarned = payouts.reduce((sum, payout) => sum + payout.amount, 0);
      const totalClaimed = payouts
        .filter(payout => payout.status === 'completed')
        .reduce((sum, payout) => sum + payout.amount, 0);
      const pendingClaims = payouts
        .filter(payout => payout.status === 'pending')
        .reduce((sum, payout) => sum + payout.amount, 0);

      return {
        totalEarned,
        totalClaimed,
        pendingClaims,
        recentPayouts: payouts.slice(0, 10) // Last 10 payouts
      };

    } catch (error) {
      console.error('❌ Failed to get player token summary:', error);
      return {
        totalEarned: 0,
        totalClaimed: 0,
        pendingClaims: 0,
        recentPayouts: []
      };
    }
  }

  /**
   * Manual token airdrop for testing (devnet only)
   */
  async testAirdrop(playerId: string, amount: number, reason: string): Promise<void> {
    const player = await storage.getPlayer(playerId);
    if (!player || !player.walletAddress || player.solanaNetwork !== 'devnet') {
      throw new Error('Player not found, no wallet, or not on devnet');
    }

    try {
      // Create test payout
      await storage.createTokenPayout({
        playerId: player.id,
        walletAddress: player.walletAddress,
        amount,
        reason: `Test airdrop: ${reason}`,
        network: 'devnet',
        status: 'pending'
      });

      console.log(`🪂 Test airdrop queued: ${amount} tokens for ${player.username}`);

    } catch (error) {
      console.error('❌ Failed to create test airdrop:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const tokenIntegration = new TokenIntegrationService();

// Export the class for testing
export { TokenIntegrationService };

// AUTOMATIC PAYOUTS DISABLED - Payments will be processed manually through admin panel
// Schedule automatic payout processing every 5 minutes for devnet
// if (process.env.NODE_ENV === 'development') {
//   setInterval(() => {
//     tokenIntegration.processPendingPayouts('devnet').catch(console.error);
//   }, 5 * 60 * 1000); // 5 minutes
// }

// // For production, process mainnet payouts less frequently
// if (process.env.NODE_ENV === 'production') {
//   setInterval(() => {
//     tokenIntegration.processPendingPayouts('mainnet').catch(console.error);
//   }, 15 * 60 * 1000); // 15 minutes
// }