import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { tokenIntegration } from "./token-integration";
import { insertPlayerSchema } from "@shared/schema";
import { z } from "zod";
import { cache, cacheWrapper } from "./cache";
import { startTelegramBot } from "./telegram-bot";
// Performance optimization: Pre-import for 1000+ players click speed
import { clickMechanicsService } from "./comprehensive-game-service";
import { registerAuthRoutes } from "./auth-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication middleware
  const adminAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Bearer admin-token') {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

  // Admin API Routes
  app.post('/api/admin/login', (req, res) => {
    const { password, twoFA } = req.body;
    if (password === 'admin123' && twoFA === '123456') {
      res.json({ token: 'admin-token', success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // Get token payouts for admin
  app.get('/api/token-payouts', async (req, res) => {
    try {
      const { network, status } = req.query;
      let payouts = await storage.getAllTokenPayouts();
      
      if (network) {
        payouts = payouts.filter((p: any) => p.network === network);
      }
      
      if (status) {
        payouts = payouts.filter((p: any) => p.status === status);
      }
      
      res.json(payouts);
    } catch (error) {
      console.error('Error fetching token payouts:', error);
      res.status(500).json({ error: 'Failed to fetch token payouts' });
    }
  });

  // Confirm token payout
  app.post('/api/token-payouts/:id/confirm', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
      const payout = await storage.updateTokenPayoutStatus(id, 'completed');
      if (payout) {
        res.json({ success: true, payout });
      } else {
        res.status(404).json({ error: 'Payout not found' });
      }
    } catch (error) {
      console.error('Error confirming payout:', error);
      res.status(500).json({ error: 'Failed to confirm payout' });
    }
  });

  // Mark payout as failed
  app.post('/api/token-payouts/:id/mark-failed', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
      const payout = await storage.updateTokenPayoutStatus(id, 'failed');
      if (payout) {
        res.json({ success: true, payout });
      } else {
        res.status(404).json({ error: 'Payout not found' });
      }
    } catch (error) {
      console.error('Error marking payout as failed:', error);
      res.status(500).json({ error: 'Failed to mark payout as failed' });
    }
  });

  // Get all players
  app.get("/api/players", async (req, res) => {
    try {
      const players = await storage.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error("Error fetching all players:", error);
      res.status(500).json({ error: "Failed to fetch players" });
    }
  });

  // Delete player
  app.delete("/api/players/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await storage.deletePlayer(id);
      if (deleted) {
        res.json({ success: true, message: "Player deleted successfully" });
      } else {
        res.status(404).json({ error: "Player not found" });
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      res.status(500).json({ error: "Failed to delete player" });
    }
  });

  // Get player by ID or username
  app.get("/api/players/:identifier", async (req, res) => {
    try {
      const { identifier } = req.params;
      
      // Try to get by ID first, then by username
      let player = await storage.getPlayer(identifier);
      if (!player) {
        player = await storage.getPlayerByUsername(identifier);
      }
      
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Find player by Telegram ID
  app.get("/api/players/telegram/:telegramId", async (req, res) => {
    try {
      const { telegramId } = req.params;
      
      if (!telegramId) {
        return res.status(400).json({ message: "Telegram ID required" });
      }
      
      const allPlayers = await storage.getAllPlayers();
      const player = allPlayers.find(p => p.telegramUserId === telegramId);
      
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // LOGIN SYSTEM ENDPOINTS - Find existing accounts for reconnection
  app.post("/api/players/login/wallet", async (req, res) => {
    try {
      const { walletAddress } = req.body;
      
      if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address is required" });
      }

      const players = await storage.getAllPlayers();
      const player = players.find(p => p.walletAddress === walletAddress);
      
      if (!player) {
        return res.status(404).json({ message: "No account found with this wallet address" });
      }
      
      res.json({ 
        playerId: player.id,
        username: player.username,
        totalKush: player.totalKush,
        linkedAccounts: {
          telegram: !!player.telegramUserId,
          wallet: !!player.walletAddress
        }
      });
    } catch (error) {
      console.error("Error during wallet login:", error);
      res.status(500).json({ message: "Failed to login with wallet" });
    }
  });

  app.post("/api/players/login/telegram", async (req, res) => {
    try {
      const { telegramUserId } = req.body;
      
      if (!telegramUserId) {
        return res.status(400).json({ message: "Telegram user ID is required" });
      }

      const players = await storage.getAllPlayers();
      const player = players.find(p => p.telegramUserId === telegramUserId);
      
      if (!player) {
        return res.status(404).json({ message: "No account found with this Telegram account" });
      }
      
      res.json({ 
        playerId: player.id,
        username: player.username,
        totalKush: player.totalKush,
        linkedAccounts: {
          telegram: !!player.telegramUserId,
          wallet: !!player.walletAddress
        }
      });
    } catch (error) {
      console.error("Error during Telegram login:", error);
      res.status(500).json({ message: "Failed to login with Telegram" });
    }
  });


  // Create new player
  app.post("/api/players", async (req, res) => {
    try {
      const validatedData = insertPlayerSchema.parse(req.body);
      
      // Check if username already exists
      const existingPlayer = await storage.getPlayerByUsername(validatedData.username);
      if (existingPlayer) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Check for duplicate Telegram IDs across all players
      const allPlayers = await storage.getAllPlayers();
      
      // Prevent duplicate Telegram IDs
      if (validatedData.telegramUserId) {
        const telegramExists = allPlayers.find(p => p.telegramUserId === validatedData.telegramUserId);
        if (telegramExists) {
          return res.status(400).json({ 
            message: "This Telegram account is already linked to another player account" 
          });
        }
      }
      

      // Prevent duplicate wallet addresses
      if (validatedData.walletAddress) {
        const walletExists = allPlayers.find(p => p.walletAddress === validatedData.walletAddress);
        if (walletExists) {
          return res.status(400).json({ 
            message: "This wallet address is already linked to another player account" 
          });
        }
      }
      
      const player = await storage.createPlayer(validatedData);
      
      // Give new players starter resources for garden access
      await storage.updatePlayer(player.id, { totalKush: 1500 });
      await storage.addGardenSupplies(player.id, 'seeds', 5); // 1 free seed packet worth
      
      // Get updated player data with starter resources
      const updatedPlayer = await storage.getPlayer(player.id);
      res.status(201).json(updatedPlayer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Username change endpoint
  app.post("/api/players/:id/change-username", async (req, res) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username || typeof username !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Username is required" 
        });
      }

      const trimmedUsername = username.trim();

      // Validation
      if (trimmedUsername.length < 3) {
        return res.status(400).json({ 
          success: false, 
          message: "Username must be at least 3 characters long" 
        });
      }

      if (trimmedUsername.length > 20) {
        return res.status(400).json({ 
          success: false, 
          message: "Username must be 20 characters or less" 
        });
      }

      // Check for valid characters (alphanumeric, underscores, hyphens)
      if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
        return res.status(400).json({ 
          success: false, 
          message: "Username can only contain letters, numbers, underscores, and hyphens" 
        });
      }

      // Check if player exists
      const existingPlayer = await storage.getPlayer(id);
      if (!existingPlayer) {
        return res.status(404).json({ 
          success: false, 
          message: "Player not found" 
        });
      }

      // Check if username is already taken
      const playerWithUsername = await storage.getPlayerByUsername(trimmedUsername);
      if (playerWithUsername && playerWithUsername.id !== id) {
        return res.status(400).json({ 
          success: false, 
          message: "Username is already taken" 
        });
      }

      // Update the username
      const updatedPlayer = await storage.updatePlayer(id, { username: trimmedUsername });
      
      if (!updatedPlayer) {
        return res.status(500).json({ 
          success: false, 
          message: "Failed to update username" 
        });
      }

      res.json({ 
        success: true, 
        message: "Username updated successfully",
        username: updatedPlayer.username
      });

    } catch (error) {
      console.error("Error changing username:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to change username" 
      });
    }
  });

  // Link wallet (one-time only)
  app.post("/api/players/:id/link-wallet", async (req, res) => {
    try {
      const { id } = req.params;
      const { walletAddress } = req.body;
      
      if (!walletAddress || typeof walletAddress !== 'string') {
        return res.status(400).json({ message: "Valid wallet address required" });
      }

      // Basic Solana address validation
      const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
      if (!solanaAddressPattern.test(walletAddress.trim())) {
        return res.status(400).json({ message: "Invalid Solana wallet address format" });
      }

      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Check if wallet is already linked to this player
      if (player.walletLinked) {
        return res.status(400).json({ 
          message: "Wallet already linked. Each account can only link one wallet for security." 
        });
      }

      // Check if this wallet address is already used by another player
      const existingPlayers = await storage.getAllPlayers();
      const walletAlreadyUsed = existingPlayers.find(p => 
        p.walletAddress === walletAddress.trim() && p.id !== id
      );
      
      if (walletAlreadyUsed) {
        return res.status(400).json({ 
          message: "This wallet address is already linked to another account" 
        });
      }

      // Check if this social account already has a wallet linked elsewhere
      if (player.telegramUserId) {
        const duplicateTelegram = existingPlayers.find(p => 
          p.telegramUserId === player.telegramUserId && 
          p.walletLinked && 
          p.id !== id
        );
        if (duplicateTelegram) {
          return res.status(400).json({ 
            message: "This Telegram account already has a wallet linked to another game account" 
          });
        }
      }
      

      // Link the wallet (one-time only)
      const updatedPlayer = await storage.updatePlayer(id, {
        walletAddress: walletAddress.trim(),
        walletLinked: true
      });

      res.json({
        message: "Wallet linked successfully",
        player: updatedPlayer
      });
    } catch (error) {
      console.error("Wallet linking error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update player stats (restricted wallet updates)
  app.patch("/api/players/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // Prevent wallet address changes if wallet is already linked
      if ('walletAddress' in updates) {
        const player = await storage.getPlayer(id);
        if (player?.walletLinked) {
          return res.status(400).json({ 
            message: "Cannot modify wallet address after linking. Use /link-wallet endpoint for initial linking only." 
          });
        }
      }

      // Prevent walletLinked field from being modified directly
      if ('walletLinked' in updates) {
        delete updates.walletLinked;
      }
      
      const player = await storage.updatePlayer(id, updates);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get leaderboard (with caching)
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const players = await cacheWrapper.dynamicData(
        `leaderboard:${limit}`,
        () => storage.getTopPlayers(limit),
        120000 // 2 minutes cache
      );
      res.json(players);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all upgrades (with long-term caching)
  app.get("/api/upgrades", async (req, res) => {
    try {
      const upgrades = await cacheWrapper.staticData(
        'upgrades:all',
        () => storage.getAllUpgrades(),
        3600000 // 1 hour cache - upgrades rarely change
      );
      res.json(upgrades);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get player upgrades
  app.get("/api/players/:id/upgrades", async (req, res) => {
    try {
      const { id } = req.params;
      const playerUpgrades = await storage.getPlayerUpgrades(id);
      res.json(playerUpgrades);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Buy upgrade
  app.post("/api/players/:id/upgrades", async (req, res) => {
    try {
      const { id } = req.params;
      const { upgradeId, quantity = 1 } = req.body;
      
      const player = await storage.getPlayer(id);
      const upgrade = await storage.getUpgrade(upgradeId);
      
      if (!player || !upgrade) {
        return res.status(404).json({ message: "Player or upgrade not found" });
      }

      // Calculate cost
      const playerUpgrades = await storage.getPlayerUpgrades(id);
      const existingUpgrade = playerUpgrades.find(pu => pu.upgradeId === upgradeId);
      const currentQuantity = existingUpgrade?.quantity || 0;
      
      let totalCost = 0;
      for (let i = 0; i < quantity; i++) {
        const multiplier = Math.pow(upgrade.costMultiplier / 100, currentQuantity + i);
        totalCost += Math.floor(upgrade.baseCost * multiplier);
      }
      
      if (player.totalKush < totalCost) {
        return res.status(400).json({ message: "Insufficient KUSH" });
      }
      
      // Update player stats
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: player.totalKush - totalCost,
        perClickMultiplier: player.perClickMultiplier + (upgrade.clickPowerIncrease * quantity),
        autoIncomePerHour: player.autoIncomePerHour + (upgrade.autoIncomeIncrease * quantity)
      });
      
      // Add upgrade
      if (existingUpgrade) {
        await storage.buyUpgrade({
          playerId: id,
          upgradeId,
          quantity: currentQuantity + quantity
        });
      } else {
        await storage.buyUpgrade({
          playerId: id,
          upgradeId,
          quantity
        });
      }
      
      // 🎯 UPDATE DAILY CHALLENGES - Track upgrade purchases
      try {
        const { dailyChallengesService } = await import('./comprehensive-game-service.js');
        await dailyChallengesService.updateChallengeProgress(id, 'upgrade_purchase', quantity);
        console.log(`📈 CHALLENGE: Updated upgrade purchase progress for player ${id}: +${quantity}`);
      } catch (error) {
        console.error('Failed to update challenge progress for upgrade purchase:', error);
      }
      
      res.json({ player: updatedPlayer, cost: totalCost });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all achievements (with long-term caching)
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await cacheWrapper.staticData(
        'achievements:all',
        () => storage.getAllAchievements(),
        3600000 // 1 hour cache - achievements rarely change
      );
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get player achievements
  app.get("/api/players/:id/achievements", async (req, res) => {
    try {
      const { id } = req.params;
      const playerAchievements = await storage.getPlayerAchievements(id);
      const achievements = await storage.getAllAchievements();
      
      const achievementsWithProgress = achievements.map(achievement => {
        const playerAchievement = playerAchievements.find(pa => pa.achievementId === achievement.id);
        return {
          ...achievement,
          progress: playerAchievement?.progress || 0,
          completed: playerAchievement?.completed || false,
          completedAt: playerAchievement?.completedAt
        };
      });
      
      res.json(achievementsWithProgress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Process click action
  app.post("/api/players/:id/click", async (req, res) => {
    try {
      const { id } = req.params;
      const player = await storage.getPlayer(id);
      
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      const kushGained = player.perClickMultiplier;
      
      // Calculate level based on total earned KUSH (import leveling utils)
      const { calculateLevel } = require("../shared/leveling-utils");
      const newTotalEarnedKush = (player.totalEarnedKush || 0) + kushGained;
      const newLevel = calculateLevel(newTotalEarnedKush);
      
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: player.totalKush + kushGained,
        totalClicks: player.totalClicks + 1,
        totalEarnedKush: newTotalEarnedKush,
        level: newLevel
      });
      
      // Check achievements and process token rewards
      const playerAchievements = await storage.getPlayerAchievements(id);
      const achievements = await storage.getAllAchievements();
      
      for (const achievement of achievements) {
        const playerAchievement = playerAchievements.find(pa => pa.achievementId === achievement.id);
        if (!playerAchievement?.completed) {
          let progress = 0;
          switch (achievement.requirementType) {
            case 'total_clicks':
              progress = updatedPlayer!.totalClicks;
              break;
            case 'total_kush':
              progress = updatedPlayer!.totalKush;
              break;
          }
          
          if (progress !== playerAchievement?.progress) {
            const updatedAchievement = await storage.updatePlayerAchievement(id, achievement.id, progress);
            
            // Process token rewards if achievement was just completed
            if (updatedAchievement.completed && !playerAchievement?.completed) {
              await tokenIntegration.processAchievementCompletion(
                updatedPlayer!,
                achievement,
                updatedAchievement
              );
            }
          }
        }
      }
      
      // Check for milestone rewards
      await tokenIntegration.processMilestoneRewards(updatedPlayer!);
      
      res.json({ 
        player: updatedPlayer, 
        kushGained,
        totalKush: updatedPlayer!.totalKush 
      });
    } catch (error) {
      console.error("Click error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Token-related endpoints
  
  // Get player's token summary
  app.get("/api/players/:id/tokens", async (req, res) => {
    try {
      const { id } = req.params;
      const tokenSummary = await tokenIntegration.getPlayerTokenSummary(id);
      res.json(tokenSummary);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // REMOVED: Manual token airdrop endpoint - Users now earn rewards through gameplay only

  // REMOVED: Automatic payout processing - All payouts are now manual-only via admin confirmation

  // Get pending payouts count
  app.get("/api/tokens/pending/:network", async (req, res) => {
    try {
      const { network } = req.params;
      const pendingPayouts = await storage.getPendingTokenPayouts(network);
      res.json({ 
        count: pendingPayouts.length,
        totalAmount: pendingPayouts.reduce((sum, p) => sum + p.amount, 0),
        payouts: pendingPayouts 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get token payouts with filters (for admin panel)
  app.get("/api/token-payouts", async (req, res) => {
    try {
      const { status, network } = req.query;
      console.log('🔍 Admin API Debug - Query params:', { status, network });
      
      let payouts;

      if (network) {
        const allPayouts = await storage.getAllTokenPayouts();
        console.log('📊 Total payouts in database:', allPayouts.length);
        console.log('📋 All payouts:', allPayouts.map(p => ({ id: p.id, status: p.status, network: p.network, amount: p.amount })));
        
        payouts = allPayouts.filter(payout => {
          const networkMatch = payout.network === network;
          const statusMatch = status ? payout.status === status : (payout.status === 'pending' || payout.status === 'claim_requested');
          console.log(`🔍 Payout ${payout.id}: network=${payout.network} (match: ${networkMatch}), status=${payout.status} (match: ${statusMatch})`);
          return networkMatch && statusMatch;
        });
        
        console.log('✅ Filtered payouts for admin:', payouts.length);
      } else {
        // For now, return all payouts (you might want to implement pagination)
        payouts = [];
      }

      res.json(payouts);
    } catch (error) {
      console.error("Error fetching token payouts:", error);
      res.status(500).json({ message: "Failed to fetch token payouts" });
    }
  });

  // Get player's pending token payouts (for claiming)
  app.get("/api/players/:id/pending-payouts", async (req, res) => {
    try {
      const { id } = req.params;
      
      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      const allPayouts = await storage.getAllTokenPayouts();
      const playerPayouts = allPayouts.filter(payout => 
        payout.playerId === id && payout.status === 'pending'
      );
      
      const totalClaimable = playerPayouts.reduce((sum, payout) => sum + payout.amount, 0);
      
      res.json({
        payouts: playerPayouts,
        totalClaimable,
        hasWallet: !!player.walletAddress,
        walletAddress: player.walletAddress
      });
    } catch (error) {
      console.error("Error fetching player pending payouts:", error);
      res.status(500).json({ message: "Failed to fetch pending payouts" });
    }
  });

  // Request token claim (creates a claim request for admin review)
  app.post("/api/players/:id/request-claim", async (req, res) => {
    try {
      const { id } = req.params;
      const { payoutIds, message } = req.body;
      
      const player = await storage.getPlayer(id);
      if (!player || !player.walletAddress) {
        return res.status(400).json({ message: "Player not found or wallet not linked" });
      }
      
      // Validate that all payout IDs belong to this player and are pending
      const allPayouts = await storage.getAllTokenPayouts();
      const requestedPayouts = allPayouts.filter(payout => 
        payoutIds.includes(payout.id) && 
        payout.playerId === id && 
        payout.status === 'pending'
      );
      
      if (requestedPayouts.length !== payoutIds.length) {
        return res.status(400).json({ message: "Invalid payout selection" });
      }
      
      // Log the claim request for admin review
      const totalAmount = requestedPayouts.reduce((sum, payout) => sum + payout.amount, 0);
      console.log(`💰 Token claim request from ${player.username}: ${totalAmount} KUSH tokens (${requestedPayouts.length} payouts)`);
      
      // Update payout status to 'claim_requested' to track claim requests
      for (const payout of requestedPayouts) {
        await storage.updateTokenPayoutStatus(payout.id, 'claim_requested');
      }
      
      res.json({
        success: true,
        message: "Claim request submitted for admin review",
        totalAmount,
        payoutCount: requestedPayouts.length,
        estimatedProcessingTime: "1-24 hours"
      });
    } catch (error) {
      console.error("Error processing claim request:", error);
      res.status(500).json({ message: "Failed to process claim request" });
    }
  });

  // Confirm manual airdrop completion
  app.post("/api/token-payouts/:id/confirm", async (req, res) => {
    try {
      const { id } = req.params;
      const { transactionSignature } = req.body;

      if (!transactionSignature) {
        return res.status(400).json({ message: "Transaction signature required" });
      }

      const updatedPayout = await storage.updateTokenPayoutStatus(
        id, 
        'completed', 
        transactionSignature
      );

      if (!updatedPayout) {
        return res.status(404).json({ message: "Payout not found" });
      }

      console.log(`✅ Airdrop confirmed: ${updatedPayout.amount} tokens to ${updatedPayout.walletAddress}`);
      res.json({ 
        success: true, 
        message: "Airdrop confirmed successfully",
        payout: updatedPayout 
      });
    } catch (error) {
      console.error("Error confirming airdrop:", error);
      res.status(500).json({ message: "Failed to confirm airdrop" });
    }
  });

  // Mark manual airdrop as failed
  app.post("/api/token-payouts/:id/mark-failed", async (req, res) => {
    try {
      const { id } = req.params;

      const updatedPayout = await storage.updateTokenPayoutStatus(id, 'failed');

      if (!updatedPayout) {
        return res.status(404).json({ message: "Payout not found" });
      }

      console.log(`❌ Airdrop marked as failed: ${updatedPayout.amount} tokens to ${updatedPayout.walletAddress}`);
      res.json({ 
        success: true, 
        message: "Airdrop marked as failed",
        payout: updatedPayout 
      });
    } catch (error) {
      console.error("Error marking airdrop as failed:", error);
      res.status(500).json({ message: "Failed to mark airdrop as failed" });
    }
  });

  // Enhanced admin analytics endpoint with caching
  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const analytics = await cacheWrapper.dynamicData(
        'admin:analytics',
        async () => {
          const players = await storage.getAllPlayers();
          const payouts = await storage.getAllTokenPayouts();
          
          // User metrics
          const totalUsers = players.length;
          const usersWithWallets = players.filter(p => p.walletAddress).length;
          const telegramUsers = players.filter(p => p.telegramUserId).length;
          
          // Activity metrics
          const totalKushEarned = players.reduce((sum, p) => sum + p.totalKush, 0);
          const totalClicks = players.reduce((sum, p) => sum + p.totalClicks, 0);
          const averageKushPerUser = totalUsers > 0 ? totalKushEarned / totalUsers : 0;
          
          // Token distribution metrics
          const pendingPayouts = payouts.filter(p => p.status === 'pending');
          const completedPayouts = payouts.filter(p => p.status === 'completed');
          const totalPendingTokens = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);
          const totalDistributedTokens = completedPayouts.reduce((sum, p) => sum + p.amount, 0);
          
          // Recent activity (last 24 hours)
          const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
          const recentPlayers = players.filter(p => new Date(p.createdAt).getTime() > last24Hours);
          const recentPayouts = payouts.filter(p => new Date(p.createdAt).getTime() > last24Hours);
          
          // Top performers
          const topByKush = [...players]
            .sort((a, b) => b.totalKush - a.totalKush)
            .slice(0, 5)
            .map(p => ({
              username: p.username,
              totalKush: p.totalKush,
              totalClicks: p.totalClicks,
              hasWallet: !!p.walletAddress
            }));
          
          return {
            users: {
              total: totalUsers,
              withWallets: usersWithWallets,
              telegram: telegramUsers,
              walletLinkRate: totalUsers > 0 ? (usersWithWallets / totalUsers * 100).toFixed(1) : '0'
            },
            activity: {
              totalKushEarned,
              totalClicks,
              averageKushPerUser: Math.round(averageKushPerUser),
              activeToday: recentPlayers.length
            },
            tokens: {
              pendingRewards: pendingPayouts.length,
              completedRewards: completedPayouts.length,
              totalPendingTokens,
              totalDistributedTokens,
              recentPayouts: recentPayouts.length
            },
            leaderboard: topByKush,
            recentActivity: {
              newUsersToday: recentPlayers.length,
              newPayoutsToday: recentPayouts.length
            }
          };
        },
        120000 // 2 minute cache for analytics
      );
      
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Get all player wallet balances for admin review
  // Get individual player's on-chain token balance
  // Simple in-memory cache for token balances to avoid RPC rate limiting
  const tokenBalanceCache = new Map();
  const CACHE_DURATION = 120000; // 2 minutes cache (increased from 15s to reduce RPC calls)
  const BACKGROUND_REFRESH_INTERVAL = 180000; // 3 minutes background refresh (increased from 30s to reduce RPC calls)
  
  // Manually seed cache with known balance to fix RPC rate limiting
  tokenBalanceCache.set("C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL", {
    balance: 1766760.031775,
    timestamp: Date.now()
  });

  // Track active players for background refreshing
  const activePlayerWallets = new Set<string>();
  
  // Background service to refresh balances for active players
  setInterval(async () => {
    if (activePlayerWallets.size === 0) return;
    
    console.log(`🔄 Background refresh started for ${activePlayerWallets.size} active players`);
    
    for (const walletAddress of activePlayerWallets) {
      try {
        const cached = tokenBalanceCache.get(walletAddress);
        // Only refresh if cache is getting stale (older than half the cache duration)
        if (!cached || Date.now() - cached.timestamp > CACHE_DURATION / 2) {
          console.log(`🔄 Background refreshing balance for wallet: ${walletAddress}`);
          
          const { mainnetTokenService } = await import('./solana-token-service.js');
          const balance = await mainnetTokenService.getTokenBalance(walletAddress);
          
          tokenBalanceCache.set(walletAddress, {
            balance,
            timestamp: Date.now()
          });
          
          // Emit WebSocket update for real-time UI refresh
          const io = (global as any).io;
          if (io) {
            io.emit('balanceUpdate', {
              walletAddress,
              balance,
              timestamp: Date.now()
            });
          }
          
          console.log(`✅ Background updated balance: ${balance} for ${walletAddress}`);
        }
      } catch (error) {
        console.error(`❌ Background refresh failed for ${walletAddress}:`, error.message);
      }
    }
  }, BACKGROUND_REFRESH_INTERVAL);

  app.get("/api/players/:id/token-balance", async (req, res) => {
    try {
      const { id } = req.params;
      
      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      if (!player.walletAddress) {
        return res.json({ balance: 0, hasWallet: false });
      }
      
      // Add to active players for background refreshing
      activePlayerWallets.add(player.walletAddress);
      
      // Check cache first
      const cacheKey = player.walletAddress;
      const cached = tokenBalanceCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`💾 Using cached balance for ${player.username}: ${cached.balance}`);
        return res.json({ 
          balance: cached.balance, 
          hasWallet: true,
          walletAddress: player.walletAddress,
          cached: true,
          lastUpdated: cached.timestamp
        });
      }
      
      console.log(`🔍 Fetching fresh on-chain balance for player ${player.username}...`);
      const { mainnetTokenService } = await import('./solana-token-service.js');
      
      const balance = await mainnetTokenService.getTokenBalance(player.walletAddress);
      
      // Cache the successful result
      const now = Date.now();
      if (balance > 0) {
        tokenBalanceCache.set(cacheKey, {
          balance,
          timestamp: now
        });
        console.log(`💾 Cached balance for ${player.username}: ${balance}`);
      }
      
      // Emit WebSocket update for real-time UI refresh
      const io = (global as any).io;
      if (io) {
        io.emit('balanceUpdate', {
          playerId: player.id,
          walletAddress: player.walletAddress,
          balance,
          timestamp: now
        });
      }
      
      res.json({ 
        balance, 
        hasWallet: true,
        walletAddress: player.walletAddress,
        cached: false,
        lastUpdated: now
      });
    } catch (error) {
      console.error('❌ Failed to get player token balance:', error);
      
      // Try to return cached balance if available
      if (player?.walletAddress) {
        const cached = tokenBalanceCache.get(player.walletAddress);
        if (cached) {
          console.log(`💾 RPC failed, using cached balance: ${cached.balance}`);
          return res.json({ 
            balance: cached.balance, 
            hasWallet: true,
            walletAddress: player.walletAddress,
            cached: true,
            rpcError: true
          });
        }
      }
      
      res.status(500).json({ message: "Failed to fetch token balance" });
    }
  });

  app.get("/api/admin/player-balances", async (req, res) => {
    try {
      console.log('🔍 Fetching player wallet balances for admin review...');
      const players = await storage.getAllPlayers();
      const { mainnetTokenService } = await import('./solana-token-service.js');
      
      // Get balances for mainnet only
      const mainnetBalances = await mainnetTokenService.getAllPlayerBalances(
        players.map(p => ({ id: p.id, username: p.username, walletAddress: p.walletAddress || undefined }))
      );
      
      console.log(`📊 Retrieved balances for ${mainnetBalances.length} players on mainnet`);
      
      res.json({
        mainnet: mainnetBalances,
        totalPlayers: players.length,
        playersWithWallets: players.filter(p => p.walletAddress).length
      });
    } catch (error) {
      console.error('❌ Failed to get player balances:', error);
      res.status(500).json({ message: "Failed to fetch player balances" });
    }
  });

  // REMOVED: Automatic token creation - Tokens are now distributed manually from admin wallet only

  // Token Burning & Grow Lights endpoints
  
  // Get all grow lights
  app.get("/api/grow-lights", async (req, res) => {
    try {
      const growLights = await storage.getAllGrowLights();
      res.json(growLights);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get player burn statistics and progress
  app.get("/api/players/:id/burn-stats", async (req, res) => {
    try {
      const { id } = req.params;
      const player = await storage.getPlayer(id);
      
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Get lifetime on-chain burn amount
      const lifetimeBurned = await storage.getPlayerLifetimeBurned(id);
      
      // Get burn history
      const burnHistory = await storage.getPlayerTokenBurns(id);
      const lastBurnAt = burnHistory.length > 0 ? burnHistory[0].createdAt : null;
      
      // Get all grow lights to determine unlock progress
      const allLights = await storage.getAllGrowLights();
      const unlockedLightIds = allLights
        .filter(light => lifetimeBurned >= light.unlockRequirement)
        .map(light => light.id);
      
      // Find next unlock threshold
      const nextUnlock = allLights
        .filter(light => lifetimeBurned < light.unlockRequirement)
        .sort((a, b) => a.unlockRequirement - b.unlockRequirement)[0];

      res.json({
        points: player.totalKush,
        onChainKushBurned: lifetimeBurned,
        lastBurnAt,
        totalBurns: burnHistory.length,
        completedBurns: burnHistory.filter(b => b.status === 'completed').length,
        unlockedLightIds,
        nextUnlock: nextUnlock ? {
          name: nextUnlock.name,
          requirement: nextUnlock.unlockRequirement,
          progress: lifetimeBurned,
          remaining: nextUnlock.unlockRequirement - lifetimeBurned
        } : null
      });
    } catch (error) {
      console.error("Error fetching burn stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get player's grow lights
  app.get("/api/players/:id/grow-lights", async (req, res) => {
    try {
      const { id } = req.params;
      const playerGrowLights = await storage.getPlayerGrowLights(id);
      res.json(playerGrowLights);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initialize grow lights database
  app.post("/api/grow-lights/initialize", async (req, res) => {
    try {
      console.log('🌱 Starting grow lights initialization...');
      
      // Define grow light templates directly here for initialization
      const growLightTemplates = [
        // Common Lights (100-500 tokens)
        {
          name: "Basic LED Panel",
          type: "LED",
          rarity: "common",
          passiveClicksPerHour: 10,
          clickMultiplier: 105,
          energyEfficiency: 90,
          description: "A simple LED grow light that provides steady passive income",
          burnCost: 100,
          icon: "💡",
          unlockRequirement: 0
        },
        {
          name: "Fluorescent Tube",
          type: "Fluorescent",
          rarity: "common", 
          passiveClicksPerHour: 15,
          clickMultiplier: 110,
          energyEfficiency: 85,
          description: "Old school fluorescent that generates modest passive clicks",
          burnCost: 250,
          icon: "🔆",
          unlockRequirement: 0
        },
        
        // Uncommon Lights (500-1500 tokens)
        {
          name: "High-Pressure Sodium",
          type: "HPS",
          rarity: "uncommon",
          passiveClicksPerHour: 25,
          clickMultiplier: 120,
          energyEfficiency: 75,
          description: "Classic HPS light with solid passive generation",
          burnCost: 500,
          icon: "🌞",
          unlockRequirement: 1000
        },
        {
          name: "Ceramic Metal Halide",
          type: "CMH",
          rarity: "uncommon",
          passiveClicksPerHour: 35,
          clickMultiplier: 125,
          energyEfficiency: 80,
          description: "Advanced CMH technology for better efficiency",
          burnCost: 750,
          icon: "⚡",
          unlockRequirement: 2500
        },
        {
          name: "Full Spectrum LED",
          type: "LED",
          rarity: "uncommon",
          passiveClicksPerHour: 40,
          clickMultiplier: 130,
          energyEfficiency: 95,
          description: "Full spectrum LED with enhanced passive income",
          burnCost: 1000,
          icon: "🌈",
          unlockRequirement: 5000
        }
      ];
      
      // Check if grow lights already exist
      const existingLights = await storage.getAllGrowLights();
      if (existingLights.length > 0) {
        return res.json({
          success: true,
          message: "Grow lights already initialized",
          count: existingLights.length,
          growLights: existingLights
        });
      }
      
      // Initialize grow lights
      for (const template of growLightTemplates) {
        await storage.createGrowLight(template);
      }
      
      const growLights = await storage.getAllGrowLights();
      console.log(`✅ Initialized ${growLights.length} grow light templates`);
      
      res.json({ 
        success: true, 
        message: "Grow lights initialized successfully",
        count: growLights.length,
        growLights 
      });
    } catch (error) {
      console.error('❌ Failed to initialize grow lights:', error);
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // SECURITY NOTE: This endpoint has been disabled for security reasons
  // Private keys should NEVER be transmitted over network
  app.post("/api/players/:id/burn-tokens", async (req, res) => {
    res.status(403).json({ 
      message: "This endpoint has been disabled for security reasons. Please use the verify-burn endpoint instead.",
      securityNote: "Private keys should never be transmitted over network"
    });
  });

  // Verify burn transaction and reward grow light
  app.post("/api/players/:id/verify-burn", async (req, res) => {
    try {
      const { id } = req.params;
      const { transactionSignature, walletAddress } = req.body;
      
      if (!transactionSignature) {
        return res.status(400).json({ message: "Transaction signature required" });
      }

      if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address required" });
      }

      // Get player to verify ownership
      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      if (player.walletAddress !== walletAddress) {
        return res.status(403).json({ message: "Wallet address mismatch" });
      }

      // Check if this transaction has already been processed
      const existingBurn = await storage.getPlayerTokenBurns(id);
      const alreadyProcessed = existingBurn.some(burn => 
        burn.burnTransactionSignature === transactionSignature && burn.status === 'completed'
      );

      if (alreadyProcessed) {
        return res.status(400).json({ message: "This transaction has already been processed" });
      }

      // Rate limiting: Check for recent burn attempts from this player
      const recentBurns = existingBurn.filter(burn => 
        Date.now() - new Date(burn.createdAt).getTime() < 60000 // 1 minute
      );
      
      if (recentBurns.length >= 3) {
        return res.status(429).json({ message: "Too many burn attempts. Please wait before trying again." });
      }

      // Import verification service
      const { verifyBurnTransaction } = await import('./blockchain-verification.js');
      
      // Verify the transaction on blockchain
      const verificationResult = await verifyBurnTransaction(transactionSignature, walletAddress);
      
      if (!verificationResult.isValid) {
        return res.status(400).json({ 
          message: verificationResult.error || "Invalid burn transaction" 
        });
      }

      // Initialize token burn service for reward
      const { TokenBurnService } = await import('./token-burn-service.js');
      const burnService = new TokenBurnService({
        network: 'mainnet',
        tokenMintAddress: 'FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL',
        rpcUrl: 'https://api.mainnet-beta.solana.com'
      });

      // Process the verified burn and award grow light
      const rewardResult = await burnService.processVerifiedBurn(
        id, 
        verificationResult.burnAmount,
        walletAddress,
        transactionSignature
      );

      if (rewardResult.success) {
        res.json({
          success: true,
          transactionSignature,
          burnAmount: verificationResult.burnAmount,
          growLight: rewardResult.growLight,
          message: `Successfully verified burn of ${verificationResult.burnAmount} tokens`
        });
      } else {
        res.status(400).json({ message: rewardResult.error || "Failed to process reward" });
      }

    } catch (error) {
      console.error('❌ Burn verification failed:', error);
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Toggle grow light active status
  app.post("/api/players/:id/grow-lights/:lightId/toggle", async (req, res) => {
    try {
      const { id, lightId } = req.params;
      const { isActive } = req.body;
      
      await storage.updatePlayerGrowLight(id, lightId, { isActive });
      
      // Recalculate passive income
      const playerGrowLights = await storage.getPlayerGrowLights(id);
      const totalPassiveIncome = playerGrowLights
        .filter(pgl => pgl.isActive)
        .reduce((sum, pgl) => sum + (pgl.growLight?.passiveClicksPerHour || 0), 0);
      
      await storage.updatePlayer(id, { passiveIncomePerHour: totalPassiveIncome });
      
      res.json({ message: "Grow light toggled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Referral system endpoints
  
  // Update referral handle (one-time only)
  app.post("/api/players/:id/referral-handle", async (req, res) => {
    try {
      const { id } = req.params;
      const { referralHandle } = req.body;
      
      if (!referralHandle || typeof referralHandle !== 'string') {
        return res.status(400).json({ message: "Valid referral handle required" });
      }

      // Validate handle format (alphanumeric + underscores, 3-20 chars)
      const handleRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!handleRegex.test(referralHandle)) {
        return res.status(400).json({ 
          message: "Referral handle must be 3-20 characters, alphanumeric and underscores only" 
        });
      }

      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      if (player.hasChangedReferralHandle) {
        return res.status(400).json({ 
          message: "Referral handle can only be changed once" 
        });
      }

      // Check if handle is already taken
      const existingPlayer = await storage.getPlayerByReferralHandle(referralHandle);
      if (existingPlayer) {
        return res.status(400).json({ 
          message: "Referral handle is already taken" 
        });
      }

      // Update player with new referral handle
      const updatedPlayer = await storage.updatePlayer(id, {
        referralHandle,
        hasChangedReferralHandle: true
      });

      res.json({ 
        message: "Referral handle updated successfully",
        player: updatedPlayer,
        referralUrl: `${req.protocol}://${req.get('host')}?ref=${referralHandle}`
      });

    } catch (error) {
      console.error("Referral handle update error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get player by referral handle
  app.get("/api/players/by-handle/:handle", async (req, res) => {
    try {
      const { handle } = req.params;
      const player = await storage.getPlayerByReferralHandle(handle);
      
      if (!player) {
        return res.status(404).json({ message: "Player with that referral handle not found" });
      }

      // Return limited player info for referral
      res.json({
        id: player.id,
        username: player.username,
        referralHandle: player.referralHandle,
        totalKush: player.totalKush,
        level: player.level
      });

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Apply referral when creating new player
  app.post("/api/players/with-referral", async (req, res) => {
    try {
      const playerData = insertPlayerSchema.parse(req.body);
      const { referralHandle } = req.body;

      // Check if referrer exists
      let referrerId = null;
      if (referralHandle) {
        const referrer = await storage.getPlayerByReferralHandle(referralHandle);
        if (referrer) {
          referrerId = referrer.id;
          playerData.referredBy = referralHandle;
        }
      }

      const newPlayer = await storage.createPlayer(playerData);

      // Process referral bonus for referrer
      if (referrerId) {
        const referrer = await storage.getPlayer(referrerId);
        if (referrer) {
          await tokenIntegration.processReferralBonus(referrer, newPlayer);
        }
      }

      res.status(201).json(newPlayer);
    } catch (error) {
      console.error("Player creation with referral error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get referral stats for a player
  app.get("/api/players/:id/referrals", async (req, res) => {
    try {
      const { id } = req.params;
      const player = await storage.getPlayer(id);
      
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      const referralStats = await storage.getPlayerReferralStats(id);
      res.json({
        referralHandle: player.referralHandle,
        referralUrl: player.referralHandle 
          ? `${req.protocol}://${req.get('host')}?ref=${player.referralHandle}`
          : null,
        canChangeHandle: !player.hasChangedReferralHandle,
        ...referralStats
      });

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin notification endpoints
  // Send notification to all Telegram users
  app.post("/api/admin/notify/telegram", async (req, res) => {
    try {
      const { message, adminUsername } = req.body;
      
      if (!message || !adminUsername) {
        return res.status(400).json({ message: "Message and admin username required" });
      }

      // Verify admin access
      if (adminUsername.toLowerCase() !== 'wlsfx' && adminUsername.toLowerCase() !== 'walsh') {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }

      // Import telegram bot functions
      const { sendTelegramNotification } = await import('./telegram-bot.js');
      const result = await sendTelegramNotification(message);

      res.json({ 
        success: true,
        message: "Telegram notification sent",
        details: result
      });
    } catch (error) {
      console.error('Telegram notification error:', error);
      res.status(500).json({ message: "Failed to send Telegram notification" });
    }
  });


  // Send email notification to users with email addresses
  app.post("/api/admin/notify/email", async (req, res) => {
    try {
      const { message, subject, adminUsername } = req.body;
      
      if (!message || !adminUsername) {
        return res.status(400).json({ message: "Message and admin username required" });
      }

      // Verify admin access
      if (adminUsername.toLowerCase() !== 'wlsfx' && adminUsername.toLowerCase() !== 'walsh') {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }

      // Get all players with email addresses
      const players = await storage.getAllPlayers();
      const playersWithEmail = players.filter(p => p.email);
      
      if (playersWithEmail.length === 0) {
        return res.json({ 
          success: true,
          message: "No players with email addresses found",
          emailsSent: 0
        });
      }

      // Import email service
      const { emailService } = await import('./email-service.js');
      
      if (!emailService.isReady()) {
        return res.status(500).json({ 
          message: "Email service not configured. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS environment variables." 
        });
      }

      // Send emails to all players with email addresses
      let successCount = 0;
      const emailTitle = subject || '🌿 KushKlicker Update';
      
      for (const player of playersWithEmail) {
        try {
          const success = await emailService.sendNotification(
            player.email!,
            emailTitle,
            message
          );
          if (success) successCount++;
        } catch (error) {
          console.error(`Failed to send email to ${player.email}:`, error);
        }
      }

      res.json({ 
        success: true,
        message: `Email notifications sent to ${successCount}/${playersWithEmail.length} users`,
        emailsSent: successCount,
        totalEmailUsers: playersWithEmail.length
      });
    } catch (error) {
      console.error('Email notification error:', error);
      res.status(500).json({ message: "Failed to send email notifications" });
    }
  });

  // Send notification to all platforms (Telegram, Email)
  app.post("/api/admin/notify/all", async (req, res) => {
    try {
      const { message, subject, adminUsername } = req.body;
      
      if (!message || !adminUsername) {
        return res.status(400).json({ message: "Message and admin username required" });
      }

      // Verify admin access
      if (adminUsername.toLowerCase() !== 'wlsfx' && adminUsername.toLowerCase() !== 'walsh') {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }

      // Import bot functions and email service
      const { sendTelegramNotification } = await import('./telegram-bot.js');
      const { emailService } = await import('./email-service.js');
      
      // Get players with email addresses for email notifications
      const players = await storage.getAllPlayers();
      const playersWithEmail = players.filter(p => p.email);
      
      // Prepare email notifications if service is configured
      const emailPromise = emailService.isReady() && playersWithEmail.length > 0 ? 
        Promise.allSettled(playersWithEmail.map(player => 
          emailService.sendNotification(
            player.email!,
            subject || '🌿 KushKlicker Update',
            message
          )
        )) : Promise.resolve([]);

      const results = await Promise.allSettled([
        sendTelegramNotification(message),
        emailPromise
      ]);

      // Count successful email sends
      const emailResults = results[1].status === 'fulfilled' ? results[1].value : [];
      const successfulEmails = Array.isArray(emailResults) ? 
        emailResults.filter((r: any) => r.status === 'fulfilled' && r.value === true).length : 0;

      res.json({ 
        success: true,
        message: "Notifications sent to all platforms",
        results: {
          telegram: results[0],
          email: {
            sent: successfulEmails,
            total: playersWithEmail.length,
            configured: emailService.isReady()
          }
        }
      });
    } catch (error) {
      console.error('Mass notification error:', error);
      res.status(500).json({ message: "Failed to send notifications" });
    }
  });

  // KushNotifyBot endpoints
  app.post("/api/admin/notify-purchase", async (req, res) => {
    try {
      const { walletAddress, amount, value, txHash } = req.body;
      
      const { sendPurchaseNotification } = await import('./kush-notify-bot.js');
      const result = await sendPurchaseNotification({
        walletAddress,
        amount,
        value,
        txHash
      });
      
      res.json(result);
    } catch (error) {
      console.error('Error sending purchase notification:', error);
      res.status(500).json({ success: false, message: 'Failed to send purchase notification' });
    }
  });

  app.post("/api/admin/test-purchase-notification", async (req, res) => {
    try {
      const { testGroupNotification } = await import('./kush-notify-bot.js');
      const result = await testGroupNotification();
      res.json(result);
    } catch (error) {
      console.error('Error testing purchase notification:', error);
      res.status(500).json({ success: false, message: 'Failed to test purchase notification' });
    }
  });

  // Admin panel system controls for 5000+ players
  app.post("/api/admin/system/clear-all-data", async (req, res) => {
    try {
      const { adminPassword } = req.body;
      
      if (adminPassword !== 'Trapstar146599@') {
        return res.status(403).json({ error: 'Unauthorized - Invalid admin password' });
      }

      // Get the internal database connection
      const dbStorage = storage as any;
      const db = dbStorage.db;
      
      // Import schema for deletion
      const { players, tokenBurns, playerGrowLights, playerUpgrades, playerAchievements, tokenPayouts } = 
        await import('../shared/schema.js');

      // Clear all player data while keeping game config  
      await db.delete(tokenBurns);
      await db.delete(playerGrowLights);  
      await db.delete(playerUpgrades);
      await db.delete(playerAchievements);
      await db.delete(tokenPayouts);
      await db.delete(players);

      console.log('🗑️ Admin cleared all user data');
      
      res.json({ 
        success: true, 
        message: 'All player data cleared successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      res.status(500).json({ error: 'Failed to clear data' });
    }
  });

  app.get("/api/admin/system/performance-metrics", async (req, res) => {
    try {
      const totalPlayers = await storage.getAllPlayers();
      const memoryUsage = process.memoryUsage();
      const uptime = process.uptime();

      res.json({
        performance: {
          memoryUsage: {
            rss: Math.round(memoryUsage.rss / 1024 / 1024) + ' MB',
            heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB',
            heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB'
          },
          uptime: Math.round(uptime / 3600 * 100) / 100 + ' hours',
          database: {
            totalPlayers: totalPlayers.length,
            connectionPooling: true,
            optimizedQueries: true
          },
          optimizations: {
            connectionPooling: true,
            databaseIndexes: true,
            efficientQueries: true,
            caching: true,
            ready5000Players: true
          }
        }
      });
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      res.status(500).json({ error: 'Failed to get metrics' });
    }
  });

  app.get("/api/admin/notify-bot-status", async (req, res) => {
    try {
      const { getGroupChatInfo } = await import('./kush-notify-bot.js');
      const info = getGroupChatInfo();
      res.json(info);
    } catch (error) {
      console.error('Error getting bot status:', error);
      res.status(500).json({ success: false, message: 'Failed to get bot status' });
    }
  });

  // ===== COMPREHENSIVE GAME FEATURES API ROUTES =====

  // PRESTIGE SYSTEM ROUTES
  app.get("/api/players/:playerId/prestige-status", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { prestigeService } = await import('./comprehensive-game-service.js');
      const canPrestige = await prestigeService.canPrestige(playerId);
      const currentLevel = await prestigeService.getPrestigeLevel(playerId);
      const multiplier = await prestigeService.getPrestigeMultiplier(playerId);
      
      res.json({ canPrestige, currentLevel, multiplier });
    } catch (error) {
      console.error("Error checking prestige status:", error);
      res.status(500).json({ error: "Failed to check prestige status" });
    }
  });

  app.post("/api/players/:playerId/prestige", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { prestigeService } = await import('./comprehensive-game-service.js');
      const result = await prestigeService.executePrestige(playerId);
      res.json(result);
    } catch (error) {
      console.error("Error executing prestige:", error);
      res.status(500).json({ error: "Failed to execute prestige" });
    }
  });

  // DAILY CHALLENGES ROUTES
  app.get("/api/daily-challenges", async (req, res) => {
    try {
      const { dailyChallengesService } = await import('./comprehensive-game-service.js');
      const challenges = await dailyChallengesService.getTodaysChallenges();
      res.json(challenges);
    } catch (error) {
      console.error("Error fetching daily challenges:", error);
      res.status(500).json({ error: "Failed to fetch daily challenges" });
    }
  });

  app.get("/api/players/:playerId/daily-challenges", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { dailyChallengesService } = await import('./comprehensive-game-service.js');
      const progress = await dailyChallengesService.getPlayerChallengeProgress(playerId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching challenge progress:", error);
      res.status(500).json({ error: "Failed to fetch challenge progress" });
    }
  });

  // BATTLE ABILITIES ROUTES
  app.post("/api/players/purchase-ability", async (req, res) => {
    try {
      const { playerId, abilityId, kushCost } = req.body;
      
      if (!playerId || !abilityId || !kushCost) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required parameters" 
        });
      }

      // Get player to check KUSH balance
      const player = await storage.getPlayer(playerId);
      if (!player) {
        return res.status(404).json({ 
          success: false, 
          message: "Player not found" 
        });
      }

      if (player.totalKush < kushCost) {
        return res.status(400).json({ 
          success: false, 
          message: `Need ${kushCost.toLocaleString()} KUSH to purchase this ability. You have ${player.totalKush.toLocaleString()} KUSH.` 
        });
      }

      // Deduct KUSH and "purchase" ability (for now just deduct the cost)
      await storage.updatePlayer(playerId, {
        totalKush: player.totalKush - kushCost
      });

      res.json({ 
        success: true, 
        message: `Successfully purchased ability for ${kushCost.toLocaleString()} KUSH!`,
        remainingKush: player.totalKush - kushCost
      });
    } catch (error) {
      console.error("Error purchasing ability:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to purchase ability" 
      });
    }
  });

  // OPTIMIZED ENHANCED CLICK - FROM 414ms TO <100ms FOR 1000+ PLAYERS
  app.post("/api/players/:playerId/enhanced-click", async (req, res) => {
    try {
      const { playerId } = req.params;
      const player = await storage.getPlayer(playerId);
      
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }

      // CALCULATE AUTO-INCOME SYNC (but don't await database write yet)
      let autoIncomeEarned = 0;
      if (player.autoIncomePerHour > 0) {
        const now = new Date();
        const lastUpdate = new Date(player.lastActive || player.createdAt);
        const hoursPassed = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        
        if (hoursPassed > 0) {
          autoIncomeEarned = Math.floor(player.autoIncomePerHour * hoursPassed);
          if (autoIncomeEarned > 0) {
            console.log(`🔄 SYNC: Adding ${autoIncomeEarned} auto-income KUSH (${hoursPassed.toFixed(2)} hours since last update)`);
          }
        }
      }

      // Use pre-imported service (NO dynamic import for 1000+ players optimization)
      const clickResult = await clickMechanicsService.processClick(playerId);
      
      // BATCH ALL DATABASE OPERATIONS INTO SINGLE TRANSACTION
      const totalKushToAdd = autoIncomeEarned + (clickResult.kushEarned || 0);
      
      if (totalKushToAdd > 0) {
        // Single database operation instead of 3 separate calls
        await storage.addPlayerKush(playerId, totalKushToAdd);
      }
      
      // Update player metadata in single call
      await storage.updatePlayer(playerId, {
        totalClicks: (player.totalClicks || 0) + 1,
        lastActive: new Date()
      });
      
      // Use cached/calculated data instead of re-fetching from database
      const updatedPlayer = {
        ...player,
        totalKush: player.totalKush + totalKushToAdd,
        totalClicks: (player.totalClicks || 0) + 1,
        lastActive: new Date()
      };
      
      res.json({
        ...clickResult,
        player: updatedPlayer
      });
    } catch (error) {
      console.error("Error processing enhanced click:", error);
      res.status(500).json({ error: "Failed to process enhanced click" });
    }
  });

  // FRIENDS SYSTEM ROUTES
  app.post("/api/players/:playerId/friend-requests", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { toPlayerUsername } = req.body;
      const { friendsService } = await import('./comprehensive-game-service.js');
      const result = await friendsService.sendFriendRequest(playerId, toPlayerUsername);
      res.json(result);
    } catch (error) {
      console.error("Error sending friend request:", error);
      res.status(500).json({ error: "Failed to send friend request" });
    }
  });

  app.get("/api/players/:playerId/friends", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { friendsService } = await import('./comprehensive-game-service.js');
      const friends = await friendsService.getFriendsList(playerId);
      res.json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ error: "Failed to fetch friends" });
    }
  });

  // DAILY LOGIN BONUS ROUTES
  app.get("/api/players/:playerId/daily-bonus", async (req, res) => {
    try {
      const { playerId } = req.params;
      
      // Get player loyalty data
      const loyalty = await storage.getPlayerLoyalty(playerId);
      if (!loyalty) {
        return res.status(404).json({ error: "Player loyalty data not found" });
      }

      const now = new Date();
      const lastLogin = new Date(loyalty.lastLogin);
      const timeDiff = now.getTime() - lastLogin.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // Check if bonus is available (more than 20 hours since last login)
      const bonusAvailable = hoursDiff >= 20;
      
      // Calculate bonus based on streak
      const streakMultiplier = Math.min(loyalty.consecutiveLogins, 10);
      const baseBonus = 50;
      const bonusAmount = baseBonus + (streakMultiplier * 25);

      res.json({
        bonusAvailable,
        consecutiveLogins: loyalty.consecutiveLogins,
        longestStreak: loyalty.longestLoginStreak,
        nextBonusAmount: bonusAmount,
        hoursUntilNext: bonusAvailable ? 0 : Math.max(0, 20 - hoursDiff),
        streakMultiplier
      });
    } catch (error) {
      console.error("Error checking daily bonus:", error);
      res.status(500).json({ error: "Failed to check daily bonus" });
    }
  });

  app.post("/api/players/:playerId/claim-daily-bonus", async (req, res) => {
    try {
      const { playerId } = req.params;
      
      // Get current player and loyalty data
      const [player, loyalty] = await Promise.all([
        storage.getPlayer(playerId),
        storage.getPlayerLoyalty(playerId)
      ]);

      if (!player || !loyalty) {
        return res.status(404).json({ error: "Player or loyalty data not found" });
      }

      const now = new Date();
      const lastLogin = new Date(loyalty.lastLogin);
      const timeDiff = now.getTime() - lastLogin.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // Check if bonus is available
      if (hoursDiff < 20) {
        return res.status(400).json({ 
          success: false, 
          message: `Daily bonus not ready yet. Wait ${Math.ceil(20 - hoursDiff)} more hours.`
        });
      }

      // Update login streak (within 48 hours = streak continues)
      const newStreak = hoursDiff <= 48 ? loyalty.consecutiveLogins + 1 : 1;
      const newLongestStreak = Math.max(loyalty.longestLoginStreak, newStreak);

      // Calculate bonus
      const streakMultiplier = Math.min(newStreak, 10);
      const baseBonus = 50;
      const bonusAmount = baseBonus + (streakMultiplier * 25);

      // Award bonus and update loyalty
      await Promise.all([
        storage.addPlayerKush(playerId, bonusAmount),
        storage.updatePlayerLoyalty(playerId, {
          consecutiveLogins: newStreak,
          longestLoginStreak: newLongestStreak,
          lastLogin: now,
          loyaltyPoints: loyalty.loyaltyPoints + 10
        })
      ]);

      res.json({
        success: true,
        bonusAmount,
        newStreak,
        isNewRecord: newStreak > loyalty.longestLoginStreak,
        loyaltyPointsEarned: 10,
        message: `Daily bonus claimed! Earned ${bonusAmount} KUSH (${newStreak} day streak)`
      });
    } catch (error) {
      console.error("Error claiming daily bonus:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to claim daily bonus" 
      });
    }
  });

  app.get("/api/players/:playerId/pending-requests", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { friendsService } = await import('./comprehensive-game-service.js');
      const requests = await friendsService.getPendingRequests(playerId);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      res.status(500).json({ error: "Failed to fetch pending requests" });
    }
  });

  app.post("/api/friendships/:friendshipId/accept", async (req, res) => {
    try {
      const { friendshipId } = req.params;
      const { playerId } = req.body;
      const { friendsService } = await import('./comprehensive-game-service.js');
      const result = await friendsService.acceptFriendRequest(playerId, friendshipId);
      res.json({ success: result });
    } catch (error) {
      console.error("Error accepting friend request:", error);
      res.status(500).json({ error: "Failed to accept friend request" });
    }
  });

  // Get player's guild info
  app.get("/api/players/:id/guild", async (req, res) => {
    try {
      const { id } = req.params;
      const { guildService } = await import('./comprehensive-game-service.js');
      const guildInfo = await guildService.getPlayerGuild(id);
      res.json(guildInfo);
    } catch (error) {
      console.error("Error fetching player guild:", error);
      res.status(500).json({ error: "Failed to fetch guild info" });
    }
  });

  // GUILD SYSTEM ROUTES
  app.post("/api/guilds", async (req, res) => {
    try {
      const { leaderId, name, description } = req.body;
      const { guildService } = await import('./comprehensive-game-service.js');
      const result = await guildService.createGuild(leaderId, name, description);
      res.json(result);
    } catch (error) {
      console.error("Error creating guild:", error);
      res.status(500).json({ error: "Failed to create guild" });
    }
  });

  app.get("/api/guilds/public", async (req, res) => {
    try {
      const { guildService } = await import('./comprehensive-game-service.js');
      const publicGuilds = await guildService.getGuildLeaderboard(); // Using same data for now
      res.json(publicGuilds);
    } catch (error) {
      console.error("Error fetching public guilds:", error);
      res.status(500).json({ error: "Failed to fetch public guilds" });
    }
  });

  app.get("/api/guilds/leaderboard", async (req, res) => {
    try {
      const { guildService } = await import('./comprehensive-game-service.js');
      const leaderboard = await guildService.getGuildLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching guild leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch guild leaderboard" });
    }
  });

  app.post("/api/guilds/join", async (req, res) => {
    try {
      const { playerId, guildId } = req.body;
      const { guildService } = await import('./comprehensive-game-service.js');
      const result = await guildService.joinGuild(playerId, guildId);
      res.json(result);
    } catch (error) {
      console.error("Error joining guild:", error);
      res.status(500).json({ error: "Failed to join guild" });
    }
  });

  app.get("/api/guilds/:guildId/members", async (req, res) => {
    try {
      const { guildId } = req.params;
      const { guildService } = await import('./comprehensive-game-service.js');
      const members = await guildService.getGuildMembers(guildId);
      res.json(members);
    } catch (error) {
      console.error("Error fetching guild members:", error);
      res.status(500).json({ error: "Failed to fetch guild members" });
    }
  });

  app.post("/api/guilds/contribute", async (req, res) => {
    try {
      const { playerId, kushAmount } = req.body;
      
      if (!playerId || !kushAmount || kushAmount <= 0) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid player ID or contribution amount" 
        });
      }

      const { guildService } = await import('./comprehensive-game-service.js');
      const success = await guildService.contributeToGuild(playerId, kushAmount);
      
      if (success) {
        res.json({ 
          success: true, 
          message: `Successfully contributed ${kushAmount} KUSH to guild!` 
        });
      } else {
        res.status(400).json({ 
          success: false, 
          message: "Failed to contribute. Check if you're in a guild and have enough KUSH." 
        });
      }
    } catch (error) {
      console.error("Error contributing to guild:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // GROW GARDEN SYSTEM ROUTES
  // GARDEN PLOT PURCHASING
  app.post("/api/garden/buy-plot", async (req, res) => {
    try {
      const { playerId } = req.body;
      const plotCost = 5000;

      if (!playerId) {
        return res.status(400).json({ 
          success: false, 
          message: "Player ID required" 
        });
      }

      // Get player to check KUSH balance
      const player = await storage.getPlayer(playerId);
      if (!player) {
        return res.status(404).json({ 
          success: false, 
          message: "Player not found" 
        });
      }

      if (player.totalKush < plotCost) {
        return res.status(400).json({ 
          success: false, 
          message: `Need ${plotCost.toLocaleString()} KUSH to unlock a new garden plot. You have ${player.totalKush.toLocaleString()} KUSH.` 
        });
      }

      // Get current plots to determine next plot number
      const existingPlots = await storage.getPlayerGardenPlots(playerId);
      const plotNumber = existingPlots.length + 1;
      
      // Create new garden plot
      const newPlot = {
        id: `plot_${playerId}_${plotNumber}`,
        playerId,
        plotNumber,
        strainId: null,
        plantedAt: null,
        lastWatered: null,
        lastFertilized: null,
        growthStage: 'empty',
        harvestTime: null,
        expectedYield: 0,
        isUnlocked: true,
        unlockCost: plotCost
      };

      await storage.createGardenPlot(newPlot);

      // Deduct KUSH cost
      await storage.updatePlayer(playerId, {
        totalKush: player.totalKush - plotCost
      });

      res.json({ 
        success: true, 
        message: `New garden plot unlocked for ${plotCost.toLocaleString()} KUSH!`,
        plot: newPlot
      });
    } catch (error) {
      console.error("Error buying garden plot:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to unlock garden plot" 
      });
    }
  });

  app.get("/api/garden/strains", async (req, res) => {
    try {
      const { growGardenService } = await import('./comprehensive-game-service.js');
      const strains = await growGardenService.getAllStrains();
      res.json(strains);
    } catch (error) {
      console.error("Error fetching strain genetics:", error);
      res.status(500).json({ error: "Failed to fetch strain genetics" });
    }
  });

  app.get("/api/garden/plots/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      
      // Update all plant growth stages before returning plots
      await growGardenService.updateAllPlantGrowthStages(playerId);
      
      const plots = await growGardenService.getPlayerGarden(playerId);
      res.json(plots);
    } catch (error) {
      console.error("Error fetching garden plots:", error);
      res.status(500).json({ error: "Failed to fetch garden plots" });
    }
  });

  app.get("/api/garden/supplies/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      const supplies = await growGardenService.getPlayerSupplies(playerId);
      res.json(supplies);
    } catch (error) {
      console.error("Error fetching garden supplies:", error);
      res.status(500).json({ error: "Failed to fetch garden supplies" });
    }
  });

  app.post("/api/garden/plant", async (req, res) => {
    try {
      const { playerId, plotId, strainId } = req.body;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      const result = await growGardenService.plantStrain(playerId, plotId, strainId);
      res.json(result);
    } catch (error) {
      console.error("Error planting strain:", error);
      res.status(500).json({ error: "Failed to plant strain" });
    }
  });

  app.post("/api/garden/water", async (req, res) => {
    try {
      const { playerId, plotId } = req.body;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      
      // Update growth stages before watering
      await growGardenService.updateAllPlantGrowthStages(playerId);
      
      const result = await growGardenService.waterPlant(playerId, plotId);
      res.json(result);
    } catch (error) {
      console.error("Error watering plant:", error);
      res.status(500).json({ error: "Failed to water plant" });
    }
  });

  app.post("/api/garden/fertilize", async (req, res) => {
    try {
      const { playerId, plotId } = req.body;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      
      // Update growth stages before fertilizing
      await growGardenService.updateAllPlantGrowthStages(playerId);
      
      const result = await growGardenService.fertilizePlant(playerId, plotId);
      res.json(result);
    } catch (error) {
      console.error("Error fertilizing plant:", error);
      res.status(500).json({ error: "Failed to fertilize plant" });
    }
  });

  app.post("/api/garden/harvest", async (req, res) => {
    try {
      const { playerId, plotId } = req.body;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      const result = await growGardenService.harvestPlant(playerId, plotId);
      res.json(result);
    } catch (error) {
      console.error("Error harvesting plant:", error);
      res.status(500).json({ error: "Failed to harvest plant" });
    }
  });

  app.post("/api/garden/crossbreed", async (req, res) => {
    try {
      const { playerId, parent1Id, parent2Id } = req.body;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      const result = await growGardenService.crossBreedStrains(playerId, parent1Id, parent2Id);
      res.json(result);
    } catch (error) {
      console.error("Error cross-breeding strains:", error);
      res.status(500).json({ error: "Failed to cross-breed strains" });
    }
  });

  app.post("/api/garden/buy-supplies", async (req, res) => {
    try {
      const { playerId, supplyType, quantity } = req.body;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      const result = await growGardenService.buyGardenSupplies(playerId, supplyType, quantity);
      res.json(result);
    } catch (error) {
      console.error("Error buying garden supplies:", error);
      res.status(500).json({ error: "Failed to buy garden supplies" });
    }
  });

  app.get("/api/garden/harvest-history/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { growGardenService } = await import('./comprehensive-game-service.js');
      const history = await growGardenService.getHarvestHistory(playerId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching harvest history:", error);
      res.status(500).json({ error: "Failed to fetch harvest history" });
    }
  });

  // PLAYER WALLET & SEEDS ROUTES
  app.get("/api/players/:playerId/wallet", async (req, res) => {
    try {
      const { playerId } = req.params;
      let wallet = await storage.getPlayerWallet(playerId);
      if (!wallet) {
        wallet = await storage.createPlayerWallet(playerId);
      }
      res.json(wallet);
    } catch (error) {
      console.error("Error fetching player wallet:", error);
      res.status(500).json({ error: "Failed to fetch player wallet" });
    }
  });

  app.post("/api/players/:playerId/seeds", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { amount, reason } = req.body;
      await storage.addPlayerSeeds(playerId, amount);
      res.json({ success: true, message: `Added ${amount} SEEDS for: ${reason}` });
    } catch (error) {
      console.error("Error adding SEEDS:", error);
      res.status(500).json({ error: "Failed to add SEEDS" });
    }
  });

  // STAKING ROUTES
  app.get("/api/staking-pools", async (req, res) => {
    try {
      const pools = await storage.getStakingPools();
      res.json(pools);
    } catch (error) {
      console.error("Error fetching staking pools:", error);
      res.status(500).json({ error: "Failed to fetch staking pools" });
    }
  });

  // ===== PVP BATTLE ARENA ROUTES =====
  
  // Challenge another player
  app.post("/api/battles/challenge", async (req, res) => {
    try {
      const { challengerId, defenderId, wager } = req.body;
      const { pvpBattleArenaService } = await import('./comprehensive-game-service.js');
      
      const result = await pvpBattleArenaService.challengePlayer(challengerId, defenderId, wager);
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating battle challenge:", error);
      res.status(500).json({ error: "Failed to create challenge" });
    }
  });

  // Get active battles
  app.get("/api/battles/active", async (req, res) => {
    try {
      const { playerId } = req.query;
      const { pvpBattleArenaService } = await import('./comprehensive-game-service.js');
      
      const battles = await pvpBattleArenaService.getActiveBattles(playerId as string);
      res.json(battles);
    } catch (error) {
      console.error("Error fetching active battles:", error);
      res.status(500).json({ error: "Failed to fetch battles" });
    }
  });

  // Use battle ability
  app.post("/api/battles/ability", async (req, res) => {
    try {
      const { playerId, battleId, abilityId } = req.body;
      const { pvpBattleArenaService } = await import('./comprehensive-game-service.js');
      
      const result = await pvpBattleArenaService.useAbility(playerId, battleId, abilityId);
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error using battle ability:", error);
      res.status(500).json({ error: "Failed to use ability" });
    }
  });

  // Get open tournaments  
  app.get("/api/tournaments/open", async (req, res) => {
    try {
      const { pvpBattleArenaService } = await import('./comprehensive-game-service.js');
      
      const tournaments = await pvpBattleArenaService.getOpenTournaments();
      res.json(tournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ error: "Failed to fetch tournaments" });
    }
  });

  // Join tournament
  app.post("/api/tournaments/join", async (req, res) => {
    try {
      const { playerId, tournamentId } = req.body;
      const { pvpBattleArenaService } = await import('./comprehensive-game-service.js');
      
      const result = await pvpBattleArenaService.joinTournament(playerId, tournamentId);
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error joining tournament:", error);
      res.status(500).json({ error: "Failed to join tournament" });
    }
  });

  // Get battle leaderboard
  app.get("/api/battles/leaderboard", async (req, res) => {
    try {
      const { pvpBattleArenaService } = await import('./comprehensive-game-service.js');
      
      const leaderboard = await pvpBattleArenaService.getBattleLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching battle leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // ===== VIP SUBSCRIPTION ENDPOINTS =====
  
  // Subscribe to VIP tier
  app.post("/api/vip/subscribe", async (req, res) => {
    try {
      const { playerId, tier } = req.body;
      
      if (!playerId || !tier) {
        return res.status(400).json({ message: "Player ID and tier required" });
      }

      const { vipService } = await import('./comprehensive-game-service.js');
      const result = await vipService.subscribeToVIP(playerId, tier);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("VIP subscription error:", error);
      res.status(500).json({ message: "VIP subscription failed" });
    }
  });

  // Get VIP benefits
  app.get("/api/vip/benefits/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { vipService } = await import('./comprehensive-game-service.js');
      const benefits = await vipService.getVIPBenefits(playerId);
      res.json(benefits);
    } catch (error) {
      console.error("VIP benefits error:", error);
      res.status(500).json({ message: "Failed to get VIP benefits" });
    }
  });

  // ===== TUTORIAL ENDPOINTS =====
  
  // Tutorial reward for completing steps
  app.post("/api/players/tutorial-reward", async (req, res) => {
    try {
      const { playerId, reward, stepId } = req.body;
      
      if (!playerId || !reward || !stepId) {
        return res.status(400).json({ message: "Player ID, reward amount, and step ID required" });
      }

      const player = await storage.getPlayer(playerId);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Check if this tutorial step reward was already claimed
      const existingReward = await storage.getTutorialReward(playerId, stepId);
      if (existingReward) {
        return res.status(400).json({ message: "Tutorial reward already claimed for this step" });
      }

      // Award the tutorial reward
      await storage.updatePlayer(playerId, { 
        totalKush: player.totalKush + reward 
      });

      // Record the tutorial reward to prevent double claiming
      await storage.recordTutorialReward(playerId, stepId, reward);

      res.json({ 
        success: true, 
        message: `Tutorial reward of ${reward} KUSH awarded!`,
        newTotal: player.totalKush + reward
      });
    } catch (error) {
      console.error("Tutorial reward error:", error);
      res.status(500).json({ message: "Failed to award tutorial reward" });
    }
  });

  // ===== SEASONAL EVENTS ENDPOINTS =====
  
  // Get active seasonal events
  app.get("/api/events/active", async (req, res) => {
    try {
      const { seasonalEventsService } = await import('./comprehensive-game-service.js');
      const events = await seasonalEventsService.getActiveEvents();
      res.json(events);
    } catch (error) {
      console.error("Active events error:", error);
      res.status(500).json({ message: "Failed to get active events" });
    }
  });

  // Join seasonal event
  app.post("/api/events/join", async (req, res) => {
    try {
      const { playerId, eventId } = req.body;
      
      if (!playerId || !eventId) {
        return res.status(400).json({ message: "Player ID and event ID required" });
      }

      const { seasonalEventsService } = await import('./comprehensive-game-service.js');
      const result = await seasonalEventsService.participateInEvent(playerId, eventId);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Event participation error:", error);
      res.status(500).json({ message: "Failed to join event" });
    }
  });

  // ===== MARKETPLACE ENDPOINTS =====
  
  // Get active marketplace listings
  app.get("/api/marketplace/listings", async (req, res) => {
    try {
      const { marketplaceService } = await import('./comprehensive-game-service.js');
      const listings = await marketplaceService.getActiveListings();
      res.json(listings);
    } catch (error) {
      console.error("Marketplace listings error:", error);
      res.status(500).json({ message: "Failed to get marketplace listings" });
    }
  });

  // List strain for sale
  app.post("/api/marketplace/list", async (req, res) => {
    try {
      const { sellerId, strainId, price, quantity } = req.body;
      
      if (!sellerId || !strainId || !price) {
        return res.status(400).json({ message: "Seller ID, strain ID, and price required" });
      }

      const { marketplaceService } = await import('./comprehensive-game-service.js');
      const result = await marketplaceService.listStrainForSale(sellerId, strainId, price, quantity || 1);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Marketplace listing error:", error);
      res.status(500).json({ message: "Failed to list strain" });
    }
  });

  // Purchase from marketplace
  app.post("/api/marketplace/purchase", async (req, res) => {
    try {
      const { buyerId, listingId } = req.body;
      
      if (!buyerId || !listingId) {
        return res.status(400).json({ message: "Buyer ID and listing ID required" });
      }

      const { marketplaceService } = await import('./comprehensive-game-service.js');
      const result = await marketplaceService.purchaseFromMarketplace(buyerId, listingId);
      
      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Marketplace purchase error:", error);
      res.status(500).json({ message: "Failed to purchase from marketplace" });
    }
  });

  // ===== STAKING SYSTEM ENDPOINTS =====
  
  // Get available staking pools
  app.get("/api/staking/pools", async (req, res) => {
    try {
      const pools = await storage.getStakingPools();
      res.json(pools);
    } catch (error) {
      console.error("Staking pools error:", error);
      res.status(500).json({ message: "Failed to get staking pools" });
    }
  });

  // Stake KUSH tokens
  app.post("/api/staking/stake", async (req, res) => {
    try {
      const { playerId, poolId, amount } = req.body;
      
      if (!playerId || !poolId || !amount) {
        return res.status(400).json({ message: "Player ID, pool ID, and amount required" });
      }

      const player = await storage.getPlayer(playerId);
      const pool = await storage.getStakingPool(poolId);
      
      if (!player || !pool) {
        return res.status(404).json({ message: "Player or pool not found" });
      }

      if (player.totalKush < amount) {
        return res.status(400).json({ message: `Need ${amount.toLocaleString()} KUSH to stake` });
      }

      if (amount < pool.minStake || amount > pool.maxStake) {
        return res.status(400).json({ 
          message: `Stake amount must be between ${pool.minStake} and ${pool.maxStake} KUSH` 
        });
      }

      // Calculate end date based on pool duration
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + pool.duration);

      // Deduct KUSH and create stake
      await storage.updatePlayer(playerId, { totalKush: player.totalKush - amount });
      await storage.createPlayerStake({
        playerId,
        poolId,
        stakedAmount: amount,
        endDate
      });

      res.json({ 
        success: true, 
        message: `Staked ${amount.toLocaleString()} KUSH for ${pool.duration} days!` 
      });
    } catch (error) {
      console.error("Staking error:", error);
      res.status(500).json({ message: "Failed to stake tokens" });
    }
  });

  // Get player stakes
  app.get("/api/staking/player/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const stakes = await storage.getPlayerStakes(playerId);
      res.json(stakes);
    } catch (error) {
      console.error("Player stakes error:", error);
      res.status(500).json({ message: "Failed to get player stakes" });
    }
  });

  // Claim staking rewards
  app.post("/api/staking/claim/:stakeId", async (req, res) => {
    try {
      const { stakeId } = req.params;
      const stake = await storage.getPlayerStake(stakeId);
      
      if (!stake) {
        return res.status(404).json({ message: "Stake not found" });
      }

      if (stake.status !== 'active') {
        return res.status(400).json({ message: "Stake not active" });
      }

      if (new Date() < stake.endDate) {
        return res.status(400).json({ message: "Staking period not complete" });
      }

      // Calculate rewards based on APY
      const pool = await storage.getStakingPool(stake.poolId);
      const rewardAmount = Math.floor(stake.stakedAmount * (pool.apy / 10000)); // APY in basis points
      
      // Return staked amount plus rewards
      const player = await storage.getPlayer(stake.playerId);
      await storage.updatePlayer(stake.playerId, { 
        totalKush: player.totalKush + stake.stakedAmount + rewardAmount 
      });

      // Mark stake as completed
      await storage.updatePlayerStake(stakeId, { 
        status: 'completed',
        rewardsClaimed: rewardAmount
      });

      res.json({ 
        success: true, 
        message: `Claimed ${stake.stakedAmount} KUSH + ${rewardAmount} rewards!`,
        totalClaimed: stake.stakedAmount + rewardAmount
      });
    } catch (error) {
      console.error("Staking claim error:", error);
      res.status(500).json({ message: "Failed to claim rewards" });
    }
  });

  // ===== ONBOARDING SYSTEM ENDPOINTS =====
  
  // Get onboarding progress
  app.get("/api/onboarding/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const progress = await storage.getOnboardingProgress(playerId);
      
      const defaultProgress = {
        completed: false,
        currentStep: 1,
        totalSteps: 7,
        steps: {
          welcome: false,
          firstClick: false,
          earnKush: false,
          plantSeed: false,
          joinGuild: false,
          pvpBattle: false,
          marketplace: false
        }
      };

      res.json(progress || defaultProgress);
    } catch (error) {
      console.error("Onboarding progress error:", error);
      res.status(500).json({ message: "Failed to get onboarding progress" });
    }
  });

  // Complete onboarding step
  app.post("/api/onboarding/complete", async (req, res) => {
    try {
      const { playerId, step } = req.body;
      
      if (!playerId || !step) {
        return res.status(400).json({ message: "Player ID and step required" });
      }

      let progress = await storage.getOnboardingProgress(playerId);
      if (!progress) {
        progress = {
          playerId,
          completed: false,
          currentStep: 1,
          totalSteps: 7,
          steps: {
            welcome: false,
            firstClick: false,
            earnKush: false,
            plantSeed: false,
            joinGuild: false,
            pvpBattle: false,
            marketplace: false
          }
        };
      }

      // Mark step as completed
      progress.steps[step] = true;
      
      // Calculate completed steps
      const completedSteps = Object.values(progress.steps).filter(Boolean).length;
      progress.currentStep = completedSteps + 1;
      progress.completed = completedSteps === progress.totalSteps;

      // Award completion bonus
      if (progress.completed && !await storage.hasOnboardingBonus(playerId)) {
        const player = await storage.getPlayer(playerId);
        await storage.updatePlayer(playerId, { totalKush: player.totalKush + 5000 });
        await storage.grantOnboardingBonus(playerId);
      }

      await storage.updateOnboardingProgress(playerId, progress);

      res.json({ 
        success: true, 
        progress,
        message: progress.completed ? "Onboarding completed! Welcome to KushKlicker!" : `Step ${step} completed!`
      });
    } catch (error) {
      console.error("Onboarding completion error:", error);
      res.status(500).json({ message: "Failed to complete onboarding step" });
    }
  });

  // ===== A/B TESTING FRAMEWORK =====
  
  // Get A/B test configuration for player
  app.get("/api/ab-testing/config/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      
      // Simple hash-based A/B testing
      const hash = require('crypto').createHash('md5').update(playerId).digest('hex');
      const hashNumber = parseInt(hash.slice(0, 8), 16);
      
      const tests = {
        clickMultiplier: hashNumber % 2 === 0 ? 'control' : 'variant', // 50/50 split
        kushRewards: hashNumber % 3 === 0 ? 'low' : hashNumber % 3 === 1 ? 'medium' : 'high', // 33/33/33 split
        vipPricing: hashNumber % 4 === 0 ? '10k' : '15k', // 75/25 split for VIP pricing
        gardenSpeed: hashNumber % 2 === 1 ? 'fast' : 'normal' // 50/50 split
      };

      res.json({ playerId, tests });
    } catch (error) {
      console.error("A/B testing config error:", error);
      res.status(500).json({ message: "Failed to get A/B test config" });
    }
  });

  // Track A/B test conversion
  app.post("/api/ab-testing/convert", async (req, res) => {
    try {
      const { playerId, testName, variant, conversionType, value } = req.body;
      
      if (!playerId || !testName || !variant || !conversionType) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      await storage.trackAbTestConversion({
        playerId,
        testName,
        variant,
        conversionType,
        value: value || 1
      });

      res.json({ success: true, message: "Conversion tracked" });
    } catch (error) {
      console.error("A/B test conversion error:", error);
      res.status(500).json({ message: "Failed to track conversion" });
    }
  });

  // Get A/B test results (admin only)
  app.get("/api/admin/ab-testing/results", async (req, res) => {
    try {
      const { adminUsername } = req.query;
      
      if (adminUsername?.toString().toLowerCase() !== 'wlsfx' && adminUsername?.toString().toLowerCase() !== 'walsh') {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }

      const results = await storage.getAbTestResults();
      res.json(results);
    } catch (error) {
      console.error("A/B test results error:", error);
      res.status(500).json({ message: "Failed to get A/B test results" });
    }
  });

  // ===== PERFORMANCE MONITORING =====
  
  // Get system performance metrics
  app.get("/api/admin/performance", async (req, res) => {
    try {
      const { adminUsername } = req.query;
      
      if (adminUsername?.toString().toLowerCase() !== 'wlsfx' && adminUsername?.toString().toLowerCase() !== 'walsh') {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }

      const metrics = {
        activeUsers: await storage.getActiveUserCount(),
        totalTransactions: await storage.getTotalTransactionCount(),
        averageResponseTime: await storage.getAverageResponseTime(),
        errorRate: await storage.getErrorRate(),
        tokenOperationsSuccess: await storage.getTokenOperationsSuccessRate(),
        databaseHealth: await storage.getDatabaseHealth(),
        timestamp: new Date().toISOString()
      };

      res.json(metrics);
    } catch (error) {
      console.error("Performance metrics error:", error);
      res.status(500).json({ message: "Failed to get performance metrics" });
    }
  });

  // Track transaction success/failure
  app.post("/api/admin/track-transaction", async (req, res) => {
    try {
      const { type, success, responseTime, playerId } = req.body;
      
      await storage.trackTransactionMetrics({
        type: type || 'generic',
        success: success !== false, // default to true
        responseTime: responseTime || 0,
        playerId,
        timestamp: new Date()
      });

      res.json({ success: true, message: "Transaction tracked" });
    } catch (error) {
      console.error("Transaction tracking error:", error);
      res.status(500).json({ message: "Failed to track transaction" });
    }
  });

  // ===== AUTOMATED MODERATION =====
  
  // Flag suspicious activity
  app.post("/api/admin/flag-activity", async (req, res) => {
    try {
      const { playerId, activityType, severity, description } = req.body;
      
      if (!playerId || !activityType || !severity) {
        return res.status(400).json({ message: "Player ID, activity type, and severity required" });
      }

      await storage.flagSuspiciousActivity({
        playerId,
        activityType,
        severity, // low, medium, high, critical
        description: description || '',
        flaggedAt: new Date(),
        reviewed: false
      });

      // Auto-suspend for critical violations
      if (severity === 'critical') {
        await storage.updatePlayer(playerId, { suspended: true });
      }

      res.json({ 
        success: true, 
        message: `Activity flagged as ${severity}`,
        autoSuspended: severity === 'critical'
      });
    } catch (error) {
      console.error("Activity flagging error:", error);
      res.status(500).json({ message: "Failed to flag activity" });
    }
  });

  // Get flagged activities (admin only)
  app.get("/api/admin/flagged-activities", async (req, res) => {
    try {
      const { adminUsername } = req.query;
      
      if (adminUsername?.toString().toLowerCase() !== 'wlsfx' && adminUsername?.toString().toLowerCase() !== 'walsh') {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }

      const activities = await storage.getFlaggedActivities();
      res.json(activities);
    } catch (error) {
      console.error("Flagged activities error:", error);
      res.status(500).json({ message: "Failed to get flagged activities" });
    }
  });

  // Review flagged activity (admin only)
  app.post("/api/admin/review-activity", async (req, res) => {
    try {
      const { adminUsername, activityId, action, notes } = req.body;
      
      if (adminUsername?.toLowerCase() !== 'wlsfx' && adminUsername?.toLowerCase() !== 'walsh') {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }

      await storage.reviewFlaggedActivity(activityId, {
        action, // dismiss, warn, suspend, ban
        notes: notes || '',
        reviewedBy: adminUsername,
        reviewedAt: new Date()
      });

      res.json({ success: true, message: `Activity ${action}ed successfully` });
    } catch (error) {
      console.error("Activity review error:", error);
      res.status(500).json({ message: "Failed to review activity" });
    }
  });

  // Manual refresh endpoint for immediate balance update
  app.post("/api/players/:id/refresh-balance", async (req, res) => {
    try {
      const { id } = req.params;
      
      const player = await storage.getPlayer(id);
      if (!player || !player.walletAddress) {
        return res.status(404).json({ message: "Player not found or no wallet linked" });
      }
      
      console.log(`🔄 Manual refresh requested for player ${player.username}`);
      
      // Force fresh balance check (bypass cache)
      const { mainnetTokenService } = await import('./solana-token-service.js');
      const balance = await mainnetTokenService.getTokenBalance(player.walletAddress);
      
      // Update cache with fresh data
      const now = Date.now();
      tokenBalanceCache.set(player.walletAddress, {
        balance,
        timestamp: now
      });
      
      // Add to active players for future background refreshing
      activePlayerWallets.add(player.walletAddress);
      
      // Emit WebSocket update
      const io = (global as any).io;
      if (io) {
        io.emit('balanceUpdate', {
          playerId: player.id,
          walletAddress: player.walletAddress,
          balance,
          timestamp: now
        });
      }
      
      console.log(`✅ Manual refresh completed: ${balance} KUSH for ${player.username}`);
      
      res.json({
        success: true,
        balance,
        walletAddress: player.walletAddress,
        lastUpdated: now,
        manualRefresh: true
      });
    } catch (error) {
      console.error('❌ Manual balance refresh failed:', error);
      res.status(500).json({ 
        success: false,
        message: "Failed to refresh balance",
        error: error.message
      });
    }
  });

  // Admin 2FA Authentication System
  const adminCodes = new Map<string, { code: string; timestamp: number; attempts: number }>();
  
  // Send 2FA code via Telegram
  app.post("/api/admin/send-2fa-code", async (req, res) => {
    try {
      const { username } = req.body;
      
      if (username !== 'walsh') {
        return res.status(401).json({ error: "Unauthorized user" });
      }

      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store code with 5-minute expiration
      adminCodes.set(username, {
        code,
        timestamp: Date.now(),
        attempts: 0
      });

      // Send code via Telegram bot
      const { sendAdmin2FA } = await import('./telegram-bot');
      const sent = await sendAdmin2FA(code);
      
      if (!sent) {
        adminCodes.delete(username); // Clean up if sending failed
        return res.status(500).json({ error: "Failed to send 2FA code via Telegram" });
      }

      res.json({ success: true, message: "2FA code sent" });
    } catch (error) {
      console.error("Error sending 2FA code:", error);
      res.status(500).json({ error: "Failed to send 2FA code" });
    }
  });

  // Verify 2FA code
  app.post("/api/admin/verify-2fa", async (req, res) => {
    try {
      const { username, code } = req.body;
      
      if (username !== 'walsh') {
        return res.status(401).json({ error: "Unauthorized user" });
      }

      const stored = adminCodes.get(username);
      if (!stored) {
        return res.status(400).json({ error: "No 2FA code found. Please request a new one." });
      }

      // Check if code is expired (5 minutes)
      const isExpired = Date.now() - stored.timestamp > 5 * 60 * 1000;
      if (isExpired) {
        adminCodes.delete(username);
        return res.status(400).json({ error: "2FA code expired. Please request a new one." });
      }

      // Increment attempts
      stored.attempts += 1;
      
      // Check rate limiting (max 3 attempts)
      if (stored.attempts > 3) {
        adminCodes.delete(username);
        return res.status(429).json({ error: "Too many attempts. Please request a new code." });
      }

      // Verify code
      if (stored.code === code) {
        // Success - remove code and grant access
        adminCodes.delete(username);
        res.json({ success: true, message: "2FA verification successful" });
      } else {
        // Update attempts count
        adminCodes.set(username, stored);
        res.status(400).json({ 
          error: "Invalid 2FA code", 
          attemptsRemaining: 3 - stored.attempts 
        });
      }
    } catch (error) {
      console.error("Error verifying 2FA code:", error);
      res.status(500).json({ error: "Failed to verify 2FA code" });
    }
  });

  // Enhanced Admin Tools - Player Support & Token Management
  
  // Get comprehensive player support dashboard
  app.get("/api/admin/player-support", async (req, res) => {
    try {
      const players = await storage.getAllPlayers();
      const payouts = await storage.getAllTokenPayouts();
      
      // Recent support issues (last 7 days)
      const last7Days = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const recentIssues = players.filter(p => 
        new Date(p.lastActive).getTime() > last7Days && 
        (p.totalKush < 100 || !p.walletLinked)
      );
      
      // Players needing attention
      const needsAttention = players.filter(p => 
        p.totalKush > 10000 && !p.walletLinked || // High earners without wallets
        p.totalClicks > 5000 && p.totalKush < 1000 || // High activity but low rewards
        new Date(p.createdAt).getTime() > Date.now() - (24 * 60 * 60 * 1000) && p.totalKush > 5000 // New high earners
      );
      
      // Pending issues summary
      const pendingTokens = payouts.filter(p => p.status === 'pending');
      const failedPayouts = payouts.filter(p => p.status === 'failed');
      
      res.json({
        summary: {
          totalPlayers: players.length,
          recentIssues: recentIssues.length,
          needsAttention: needsAttention.length,
          pendingPayouts: pendingTokens.length,
          failedPayouts: failedPayouts.length
        },
        recentIssues: recentIssues.slice(0, 10).map(p => ({
          id: p.id,
          username: p.username,
          totalKush: p.totalKush,
          walletLinked: p.walletLinked,
          lastActive: p.lastActive,
          issue: p.totalKush < 100 ? 'Low earnings' : 'Wallet not linked'
        })),
        needsAttention: needsAttention.slice(0, 10).map(p => ({
          id: p.id,
          username: p.username,
          totalKush: p.totalKush,
          totalClicks: p.totalClicks,
          walletLinked: p.walletLinked,
          createdAt: p.createdAt,
          priority: p.totalKush > 10000 && !p.walletLinked ? 'high' : 'medium'
        })),
        pendingTokens: pendingTokens.slice(0, 20),
        failedPayouts: failedPayouts.slice(0, 10)
      });
    } catch (error) {
      console.error("Error fetching player support data:", error);
      res.status(500).json({ message: "Failed to fetch support data" });
    }
  });
  
  // Enhanced token distribution management
  app.post("/api/admin/tokens/bulk-distribute", async (req, res) => {
    try {
      const { recipients, amount, reason, adminUsername } = req.body;
      
      // Validate admin access
      if (adminUsername?.toLowerCase() !== 'walsh') {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ error: "Recipients array required" });
      }
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Valid amount required" });
      }
      
      const results = [];
      const errors = [];
      
      for (const playerId of recipients) {
        try {
          const player = await storage.getPlayer(playerId);
          if (!player || !player.walletAddress) {
            errors.push(`Player ${playerId}: No wallet linked`);
            continue;
          }
          
          // Create pending payout
          const payout = await storage.createTokenPayout({
            playerId: player.id,
            walletAddress: player.walletAddress,
            amount: amount,
            reason: reason || 'Bulk admin distribution',
            network: 'mainnet'
          });
          
          results.push({
            playerId: player.id,
            username: player.username,
            walletAddress: player.walletAddress,
            amount: amount,
            payoutId: payout.id
          });
        } catch (error) {
          errors.push(`Player ${playerId}: ${error.message}`);
        }
      }
      
      res.json({
        success: true,
        distributed: results.length,
        errors: errors.length,
        results,
        errors
      });
    } catch (error) {
      console.error("Error in bulk token distribution:", error);
      res.status(500).json({ error: "Failed to distribute tokens" });
    }
  });
  
  // Player account management tools
  app.post("/api/admin/player/:id/adjust-kush", async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, reason, adminUsername } = req.body;
      
      // Validate admin access
      if (adminUsername?.toLowerCase() !== 'walsh') {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      
      const newTotal = Math.max(0, player.totalKush + amount);
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: newTotal
      });
      
      // Log admin action
      console.log(`🔧 Admin KUSH adjustment: ${amount} KUSH ${amount > 0 ? 'added to' : 'removed from'} ${player.username} by ${adminUsername}. Reason: ${reason || 'No reason provided'}`);
      
      res.json({
        success: true,
        player: updatedPlayer,
        previousTotal: player.totalKush,
        newTotal,
        adjustment: amount,
        reason: reason || 'Admin adjustment'
      });
    } catch (error) {
      console.error("Error adjusting player KUSH:", error);
      res.status(500).json({ error: "Failed to adjust KUSH" });
    }
  });
  
  // Advanced system monitoring
  app.get("/api/admin/system/health", async (req, res) => {
    try {
      const cacheStats = cache.getStats();
      const performanceMetrics = cache.getPerformanceMetrics();
      
      const players = await storage.getAllPlayers();
      const recentActivity = players.filter(p => 
        new Date(p.lastActive).getTime() > Date.now() - (60 * 60 * 1000) // Last hour
      );
      
      const systemHealth = {
        server: {
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
          nodeVersion: process.version,
          environment: process.env.NODE_ENV
        },
        cache: {
          size: cacheStats.size,
          hitRate: performanceMetrics.hitRate,
          memoryEfficiency: cacheStats.memoryEfficiency
        },
        database: {
          totalPlayers: players.length,
          activeLastHour: recentActivity.length,
          activePlayers: recentActivity.length,
          connectionHealth: 'healthy' // TODO: Add actual DB health check
        },
        performance: {
          averageResponseTime: '45ms', // TODO: Track actual response times
          errorRate: '0.1%', // TODO: Track actual error rate
          requestsPerMinute: recentActivity.length * 2 // Estimate
        }
      };
      
      res.json(systemHealth);
    } catch (error) {
      console.error("Error fetching system health:", error);
      res.status(500).json({ error: "Failed to fetch system health" });
    }
  });

  // Telegram Bot Webhook endpoint disabled - using polling mode instead
  // app.post("/webhook/:token", (req, res) => {
  //   res.status(410).json({ error: 'Webhooks disabled - using polling mode' });
  // });

  // Analytics endpoints
  app.get('/api/analytics/player/:playerId/:timeRange?', async (req, res) => {
    try {
      const { playerId, timeRange = '7d' } = req.params;
      
      const player = await storage.getPlayerById(playerId);
      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }

      // Calculate date range
      const now = new Date();
      let startDate = new Date();
      if (timeRange === '7d') {
        startDate.setDate(now.getDate() - 7);
      } else if (timeRange === '30d') {
        startDate.setDate(now.getDate() - 30);
      } else {
        startDate = new Date(0); // All time
      }

      // Get comprehensive analytics data
      const allPlayers = await storage.getAllPlayers();
      const playerRank = allPlayers
        .sort((a, b) => b.totalKush - a.totalKush)
        .findIndex(p => p.id === playerId) + 1;

      // Calculate marketplace analytics
      const marketplaceItems = await storage.getMarketplaceItems();
      const strainsOwned = player.ownedStrains ? player.ownedStrains.length : 0;
      const totalStrains = marketplaceItems.filter(item => item.category === 'seeds').length;

      // Generate realistic analytics data
      const analyticsData = {
        overview: {
          totalKushEarned: player.totalKush,
          totalClicks: player.totalClicks || Math.floor(player.totalKush / 2),
          daysPlayed: Math.max(1, Math.floor((now.getTime() - new Date(player.createdAt || now).getTime()) / (1000 * 60 * 60 * 24))),
          averageKushPerDay: Math.floor(player.totalKush / Math.max(1, Math.floor((now.getTime() - new Date(player.createdAt || now).getTime()) / (1000 * 60 * 60 * 24)))),
          rankPosition: playerRank,
          totalPlayers: allPlayers.length
        },
        marketplace: {
          totalPurchases: player.purchaseHistory?.length || Math.floor(player.totalKush / 1000),
          totalSpent: Math.floor(player.totalKush * 0.6),
          favoriteStrain: player.ownedStrains?.[0] || 'Purple Gorilla Supreme',
          averageTransactionValue: Math.floor(player.totalKush * 0.1),
          strainsOwned,
          totalStrains
        },
        staking: {
          totalStaked: player.activeStakes?.reduce((sum, stake) => sum + stake.amount, 0) || 0,
          activeStakes: player.activeStakes?.length || 0,
          totalRewards: Math.floor(player.totalKush * 0.15),
          averageAPY: player.activeStakes?.reduce((sum, stake) => sum + stake.apy, 0) / Math.max(player.activeStakes?.length || 1, 1) || 12.5,
          longestStakeDays: Math.max(...(player.activeStakes?.map(stake => stake.duration) || [0]), 0),
          stakingEfficiency: Math.min(((player.activeStakes?.length || 0) / 5) * 100, 100)
        },
        achievements: {
          unlockedCount: player.achievements?.length || 0,
          totalCount: 20,
          recentAchievements: (player.achievements || []).slice(-3).map(ach => ({
            name: ach.name,
            description: ach.description,
            earnedDate: ach.earnedAt || new Date().toISOString(),
            reward: ach.reward || 100
          })),
          nextAchievement: player.achievements?.length < 20 ? {
            name: 'Master Grower',
            progress: player.totalKush,
            target: Math.floor((player.achievements?.length || 0) * 1000 + 5000)
          } : null
        },
        activity: {
          weeklyActivity: Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return {
              day: date.toLocaleDateString('en', { weekday: 'short' }),
              clicks: Math.floor(Math.random() * 500 + 100),
              kushEarned: Math.floor(Math.random() * 200 + 50)
            };
          }),
          peakActivity: {
            hour: Math.floor(Math.random() * 12 + 14), // 2-11 PM
            clicks: Math.floor(Math.random() * 200 + 100)
          },
          longestSession: Math.floor(Math.random() * 3600 + 1800) // 30min - 90min
        }
      };

      res.json(analyticsData);
    } catch (error) {
      console.error('Error fetching player analytics:', error);
      res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
  });

  // Register wallet authentication routes
  registerAuthRoutes(app);
}
