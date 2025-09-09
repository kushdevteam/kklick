/**
 * Token Burn Service with 20% Dev Tax
 * Handles token burning and grow light rewards
 */

import { storage } from './storage';
import type { GrowLight, Player, InsertTokenBurn } from '@shared/schema';

// Grow Light Templates with different rarities and effects
const GROW_LIGHT_TEMPLATES: Omit<GrowLight, 'id'>[] = [
  // Common Lights (100-500 tokens)
  {
    name: "Basic LED Panel",
    type: "LED",
    rarity: "common",
    passiveClicksPerHour: 10,
    clickMultiplier: 105, // 1.05x
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
  },

  // Rare Lights (1500-5000 tokens)
  {
    name: "Quantum Board V2",
    type: "Quantum_Board",
    rarity: "rare",
    passiveClicksPerHour: 60,
    clickMultiplier: 150,
    energyEfficiency: 98,
    description: "High-end quantum board with significant passive generation",
    burnCost: 1500,
    icon: "⚛️",
    unlockRequirement: 10000
  },
  {
    name: "COB LED Array",
    type: "COB",
    rarity: "rare",
    passiveClicksPerHour: 75,
    clickMultiplier: 160,
    energyEfficiency: 96,
    description: "Chip-on-board LED array for serious growers",
    burnCost: 2500,
    icon: "🔥",
    unlockRequirement: 25000
  },
  {
    name: "Dual-Spectrum Pro",
    type: "Dual_Spectrum",
    rarity: "rare",
    passiveClicksPerHour: 90,
    clickMultiplier: 175,
    energyEfficiency: 92,
    description: "Professional dual-spectrum light with excellent returns",
    burnCost: 4000,
    icon: "🎭",
    unlockRequirement: 50000
  },

  // Epic Lights (5000-15000 tokens)
  {
    name: "Spider Farmer SF-4000",
    type: "Professional_LED",
    rarity: "epic",
    passiveClicksPerHour: 120,
    clickMultiplier: 200,
    energyEfficiency: 99,
    description: "Top-tier commercial grade LED system",
    burnCost: 7500,
    icon: "🕷️",
    unlockRequirement: 100000
  },
  {
    name: "Mars Hydro FC-E8000",
    type: "Commercial_LED",
    rarity: "epic",
    passiveClicksPerHour: 150,
    clickMultiplier: 225,
    energyEfficiency: 99,
    description: "Commercial-grade powerhouse for maximum yield",
    burnCost: 10000,
    icon: "🪐",
    unlockRequirement: 250000
  },
  {
    name: "HLG Scorpion Diablo",
    type: "Premium_LED",
    rarity: "epic",
    passiveClicksPerHour: 200,
    clickMultiplier: 250,
    energyEfficiency: 100,
    description: "Premium Horticulture Lighting Group flagship",
    burnCost: 15000,
    icon: "🦂",
    unlockRequirement: 500000
  },

  // Legendary Lights (15000+ tokens)
  {
    name: "Fluence SPYDR 2i",
    type: "Research_Grade",
    rarity: "legendary",
    passiveClicksPerHour: 300,
    clickMultiplier: 300,
    energyEfficiency: 100,
    description: "Research-grade LED used by NASA and universities",
    burnCost: 25000,
    icon: "🛸",
    unlockRequirement: 1000000
  },
  {
    name: "Custom Solar Spectrum",
    type: "Experimental",
    rarity: "legendary",
    passiveClicksPerHour: 500,
    clickMultiplier: 400,
    energyEfficiency: 100,
    description: "Experimental light that mimics perfect solar spectrum",
    burnCost: 50000,
    icon: "☀️",
    unlockRequirement: 5000000
  },
  {
    name: "Alien Technology X1",
    type: "Alien_Tech",
    rarity: "legendary",
    passiveClicksPerHour: 1000,
    clickMultiplier: 500,
    energyEfficiency: 100,
    description: "Mysterious alien technology with incredible power",
    burnCost: 100000,
    icon: "👽",
    unlockRequirement: 10000000
  }
];

interface TokenBurnConfig {
  tokenMintAddress: string;
  devTaxWallet: string;
  network: 'devnet' | 'mainnet';
  rpcUrl: string;
}

class TokenBurnService {
  private config: TokenBurnConfig;

  constructor(config: TokenBurnConfig) {
    this.config = config;
  }

  /**
   * Initialize grow lights in database (run once)
   */
  async initializeGrowLights(): Promise<void> {
    try {
      console.log('🌱 Initializing grow light templates...');
      
      for (const template of GROW_LIGHT_TEMPLATES) {
        await storage.createGrowLight(template);
      }
      
      console.log(`✅ Initialized ${GROW_LIGHT_TEMPLATES.length} grow light templates`);
    } catch (error) {
      console.error('❌ Failed to initialize grow lights:', error);
    }
  }

  /**
   * Get available grow lights for a player based on their progress
   */
  async getAvailableGrowLights(player: Player): Promise<GrowLight[]> {
    const allLights = await storage.getAllGrowLights();
    return allLights.filter(light => player.totalKush >= light.unlockRequirement);
  }

  /**
   * Calculate dev tax and net burn amount
   */
  private calculateBurnAmounts(tokenAmount: number): {
    devTax: number;
    netBurn: number;
    playerReceives: number;
  } {
    const devTax = Math.floor(tokenAmount * 0.20); // 20% dev tax
    const netBurn = tokenAmount - devTax; // 80% gets burned
    const playerReceives = netBurn; // Player gets grow light based on net amount
    
    return { devTax, netBurn, playerReceives };
  }

  /**
   * Determine which grow light a player gets based on burned amount and luck
   */
  private selectGrowLight(burnAmount: number, availableLights: GrowLight[]): GrowLight | null {
    // Filter lights that player can afford with burned amount
    const affordableLights = availableLights.filter(light => light.burnCost <= burnAmount);
    
    if (affordableLights.length === 0) {
      return null;
    }

    // Sort by burn cost (highest first) and add some randomness
    affordableLights.sort((a, b) => b.burnCost - a.burnCost);
    
    // Weighted selection based on rarity and amount burned
    const rarityWeights = {
      'common': 50,
      'uncommon': 30,
      'rare': 15,
      'epic': 4,
      'legendary': 1
    };

    // Higher burn amounts increase chance of better lights
    const bonusChance = Math.min(burnAmount / 10000, 0.5); // Max 50% bonus
    
    let totalWeight = 0;
    const weightedLights = affordableLights.map(light => {
      const baseWeight = rarityWeights[light.rarity as keyof typeof rarityWeights] || 1;
      const weight = light.rarity === 'legendary' || light.rarity === 'epic' 
        ? baseWeight + (baseWeight * bonusChance)
        : baseWeight;
      totalWeight += weight;
      return { light, weight };
    });

    // Random selection based on weights
    let random = Math.random() * totalWeight;
    for (const { light, weight } of weightedLights) {
      random -= weight;
      if (random <= 0) {
        return light;
      }
    }

    // Fallback to cheapest available light
    return affordableLights[affordableLights.length - 1];
  }

  /**
   * Process token burn transaction with 20% dev tax
   */
  async burnTokensWithTax(
    playerId: string,
    tokenAmount: number,
    playerWallet: string,
    playerPrivateKey?: string // For devnet testing only
  ): Promise<{
    success: boolean;
    burnRecord?: any;
    growLight?: GrowLight;
    transactionSignature?: string;
    error?: string;
  }> {
    try {
      const player = await storage.getPlayer(playerId);
      if (!player || !player.walletAddress) {
        throw new Error('Player not found or no wallet address');
      }

      // Calculate burn amounts
      const { devTax, netBurn, playerReceives } = this.calculateBurnAmounts(tokenAmount);
      
      // Get available grow lights
      const availableLights = await this.getAvailableGrowLights(player);
      const selectedLight = this.selectGrowLight(playerReceives, availableLights);

      if (!selectedLight) {
        throw new Error('No grow lights available for this burn amount');
      }

      let transactionSignature = '';

      // For devnet, we can simulate the burn transaction
      if (this.config.network === 'devnet' && playerPrivateKey) {
        try {
          // This would be the actual burn transaction in a real implementation
          // For now, we'll simulate it
          transactionSignature = `devnet_burn_${Date.now()}_${Math.random().toString(36)}`;
          console.log(`🔥 Simulated devnet burn: ${tokenAmount} tokens`);
        } catch (error) {
          console.warn('Devnet burn simulation failed, continuing with database record');
        }
      }

      // Create burn record in database
      const burnRecord = await storage.createTokenBurn({
        playerId: player.id,
        walletAddress: player.walletAddress,
        tokensBurned: tokenAmount,
        growLightReceived: selectedLight.id,
        network: this.config.network,
        burnTransactionSignature: transactionSignature,
        devTaxAmount: devTax,
        devTaxRecipient: this.config.devTaxWallet,
        status: transactionSignature ? 'completed' : 'pending'
      });

      // Award grow light to player
      await storage.addPlayerGrowLight({
        playerId: player.id,
        growLightId: selectedLight.id,
        quantity: 1,
        isActive: false
      });

      console.log(`🌱 Player ${player.username} burned ${tokenAmount} tokens and received ${selectedLight.name}`);

      return {
        success: true,
        burnRecord,
        growLight: selectedLight,
        transactionSignature: transactionSignature || undefined
      };

    } catch (error) {
      console.error('❌ Token burn failed:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Get player's grow light collection
   */
  async getPlayerGrowLights(playerId: string): Promise<Array<{
    growLight: GrowLight;
    quantity: number;
    isActive: boolean;
    acquiredAt: Date;
  }>> {
    return await storage.getPlayerGrowLights(playerId);
  }

  /**
   * Activate/deactivate a grow light for passive income
   */
  async toggleGrowLight(playerId: string, growLightId: string, isActive: boolean): Promise<void> {
    await storage.updatePlayerGrowLight(playerId, growLightId, { isActive });
    
    // Update player's passive income based on active grow lights
    await this.updatePlayerPassiveIncome(playerId);
  }

  /**
   * Process a verified burn transaction from external source (e.g., sol-incinerator.com)
   */
  async processVerifiedBurn(
    playerId: string,
    burnAmount: number,
    walletAddress: string,
    transactionSignature: string
  ): Promise<{
    success: boolean;
    burnRecord?: any;
    growLight?: GrowLight;
    error?: string;
  }> {
    try {
      const player = await storage.getPlayer(playerId);
      if (!player || !player.walletAddress) {
        throw new Error('Player not found or no wallet address');
      }

      if (player.walletAddress !== walletAddress) {
        throw new Error('Wallet address mismatch');
      }

      // Check if this transaction has already been processed by ANY user (security check)
      const isTransactionUsed = await storage.isTransactionSignatureUsed(transactionSignature);
      
      if (isTransactionUsed) {
        throw new Error('Transaction signature has already been claimed by another user');
      }

      // Get available grow lights
      const availableLights = await this.getAvailableGrowLights(player);
      const selectedLight = this.selectGrowLight(burnAmount, availableLights);

      if (!selectedLight) {
        throw new Error('No grow lights available for this burn amount');
      }

      // Create burn record in database
      const burnRecord = await storage.createTokenBurn({
        playerId: player.id,
        walletAddress: player.walletAddress,
        tokensBurned: burnAmount,
        growLightReceived: selectedLight.id,
        network: this.config.network,
        burnTransactionSignature: transactionSignature,
        devTaxAmount: Math.floor(burnAmount * 0.2), // Assuming 20% dev tax was already applied
        devTaxRecipient: this.config.devTaxWallet,
        status: 'completed'
      });

      // Award grow light to player (automatically active since they burned tokens for it)
      await storage.addPlayerGrowLight({
        playerId: player.id,
        growLightId: selectedLight.id,
        quantity: 1,
        isActive: true
      });

      // Update player's passive income now that they have a new active grow light
      await this.updatePlayerPassiveIncome(player.id);

      console.log(`🔥 Verified burn: Player ${player.username} burned ${burnAmount} tokens and received ${selectedLight.name}`);
      console.log(`📍 Transaction: ${transactionSignature}`);

      return {
        success: true,
        burnRecord,
        growLight: selectedLight
      };

    } catch (error) {
      console.error('❌ Verified burn processing failed:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Calculate and update player's passive income from active grow lights
   */
  async updatePlayerPassiveIncome(playerId: string): Promise<void> {
    const playerGrowLights = await this.getPlayerGrowLights(playerId);
    const activeLights = playerGrowLights.filter(pl => pl.isActive);

    let totalPassivePerHour = 0;
    let totalClickMultiplier = 100; // Base 1.0x

    for (const { growLight, quantity } of activeLights) {
      totalPassivePerHour += growLight.passiveClicksPerHour * quantity;
      // Multiplicative bonuses (each light adds to the multiplier)
      totalClickMultiplier += (growLight.clickMultiplier - 100) * quantity;
    }

    // Update player's passive income stats
    await storage.updatePlayer(playerId, {
      passiveIncomePerHour: totalPassivePerHour,
      perClickMultiplier: Math.max(1, Math.floor(totalClickMultiplier / 100))
    });

    console.log(`🔄 Updated passive income for player ${playerId}: ${totalPassivePerHour}/hour, ${totalClickMultiplier/100}x click multiplier`);
  }

  /**
   * Process passive income for a player (called periodically)
   */
  async processPassiveIncome(playerId: string): Promise<void> {
    const player = await storage.getPlayer(playerId);
    if (!player || !player.passiveIncomePerHour) return;

    // Calculate time since last passive income
    const now = new Date();
    const lastUpdate = player.lastPassiveUpdate || player.createdAt;
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);

    if (hoursSinceUpdate >= 0.1) { // Process every 6 minutes minimum
      const passiveKush = Math.floor(player.passiveIncomePerHour * hoursSinceUpdate);
      
      if (passiveKush > 0) {
        await storage.updatePlayer(playerId, {
          totalKush: player.totalKush + passiveKush,
          lastPassiveUpdate: now
        });

        console.log(`💰 Passive income: Player ${playerId} earned ${passiveKush} KUSH`);
      }
    }
  }

  /**
   * Get burn history for a player
   */
  async getPlayerBurnHistory(playerId: string): Promise<any[]> {
    return await storage.getPlayerTokenBurns(playerId);
  }
}

// Export configured instances for devnet and mainnet
export const devnetBurnService = new TokenBurnService({
  tokenMintAddress: process.env.DEVNET_TOKEN_MINT || '',
  devTaxWallet: process.env.DEV_TAX_WALLET || 'C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL',
  network: 'devnet',
  rpcUrl: process.env.SOLANA_DEVNET_RPC || 'https://api.devnet.solana.com'
});

export const mainnetBurnService = new TokenBurnService({
  tokenMintAddress: process.env.MAINNET_TOKEN_MINT || '',
  devTaxWallet: process.env.DEV_TAX_WALLET || 'C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL',
  network: 'mainnet',
  rpcUrl: process.env.SOLANA_MAINNET_RPC || 'https://api.mainnet-beta.solana.com'
});

// Initialize grow lights on startup
setTimeout(() => {
  devnetBurnService.initializeGrowLights().catch(console.error);
}, 5000);

export { TokenBurnService };