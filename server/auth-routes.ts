import type { Express, Request, Response } from "express";
import { storage } from "./storage.js";
import { validateSolanaAddress, validatePasswordStrength } from "./auth-utils.js";
import { z } from "zod";

// Validation schemas
const WalletRegistrationSchema = z.object({
  walletAddress: z.string().min(32).max(44),
  password: z.string().min(8).max(128),
  username: z.string().min(3).max(20).optional(),
});

const WalletLoginSchema = z.object({
  walletAddress: z.string().min(32).max(44),
  password: z.string().min(8).max(128),
});

export function registerAuthRoutes(app: Express) {
  // Wallet registration endpoint
  app.post("/api/auth/wallet/register", async (req: Request, res: Response) => {
    try {
      const { walletAddress, password, username } = WalletRegistrationSchema.parse(req.body);

      // Validate Solana address format
      if (!validateSolanaAddress(walletAddress)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Solana wallet address format"
        });
      }

      // Validate password strength
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({
          success: false,
          message: "Password does not meet requirements",
          errors: passwordValidation.errors
        });
      }

      // Check if wallet is already registered
      const existingWalletAuth = await storage.getWalletAuth(walletAddress);
      if (existingWalletAuth) {
        return res.status(409).json({
          success: false,
          message: "Wallet address is already registered"
        });
      }

      // Check if player already exists (for linking)
      let player = await storage.getPlayerByWalletAddress(walletAddress);
      
      // If no player exists and username provided, create new player
      if (!player && username) {
        // Check if username is taken
        const existingPlayer = await storage.getPlayerByUsername(username);
        if (existingPlayer) {
          return res.status(409).json({
            success: false,
            message: "Username is already taken"
          });
        }

        // Create new player with wallet
        player = await storage.createPlayer({
          username,
          totalKush: 0,
          totalClicks: 0,
          level: 1,
          prestige: 0,
          walletAddress,
          walletLinked: true,
          solanaNetwork: "mainnet",
          walletSyncEnabled: true,
        });
      }

      // Create wallet authentication record
      const walletAuth = await storage.createWalletAuth({
        walletAddress: walletAddress.trim(),
        passwordHash: password, // Will be hashed in storage layer
        playerId: player?.id || null,
        isActive: true,
      });

      // Update player wallet linked status if player exists
      if (player) {
        await storage.updatePlayer(player.id, {
          walletLinked: true,
          walletAddress: walletAddress.trim(),
        });
      }

      res.status(201).json({
        success: true,
        message: "Wallet registered successfully",
        data: {
          walletAddress: walletAuth.walletAddress,
          playerId: walletAuth.playerId,
          isActive: walletAuth.isActive,
        }
      });

    } catch (error) {
      console.error("Error registering wallet:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error during wallet registration"
      });
    }
  });

  // Wallet login endpoint
  app.post("/api/auth/wallet/login", async (req: Request, res: Response) => {
    try {
      const { walletAddress, password } = WalletLoginSchema.parse(req.body);

      // Validate Solana address format
      if (!validateSolanaAddress(walletAddress)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Solana wallet address format"
        });
      }

      // Validate login credentials
      const walletAuth = await storage.validateWalletLogin(walletAddress, password);
      if (!walletAuth) {
        return res.status(401).json({
          success: false,
          message: "Invalid wallet address or password"
        });
      }

      // Get associated player data if available
      let player = null;
      if (walletAuth.playerId) {
        player = await storage.getPlayer(walletAuth.playerId);
      }

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          walletAddress: walletAuth.walletAddress,
          playerId: walletAuth.playerId,
          player: player ? {
            id: player.id,
            username: player.username,
            totalKush: player.totalKush,
            level: player.level,
            walletLinked: player.walletLinked,
          } : null,
          lastLogin: walletAuth.lastLogin,
        }
      });

    } catch (error) {
      console.error("Error during wallet login:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error during login"
      });
    }
  });

  // Check wallet registration status
  app.get("/api/auth/wallet/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;

      if (!validateSolanaAddress(walletAddress)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Solana wallet address format"
        });
      }

      const walletAuth = await storage.getWalletAuth(walletAddress);
      
      res.status(200).json({
        success: true,
        data: {
          isRegistered: !!walletAuth,
          isActive: walletAuth?.isActive || false,
          hasPlayer: !!walletAuth?.playerId,
        }
      });

    } catch (error) {
      console.error("Error checking wallet status:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
}