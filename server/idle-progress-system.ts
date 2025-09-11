/**
 * Idle Progress System for KushKlicker
 * Allows players to earn KUSH while offline based on their upgrades and grow lights
 * SECURITY: Address scanning only - no wallet connections
 */

interface IdleProgressConfig {
  maxOfflineHours: number;
  baseIdleRate: number; // KUSH per minute when idle
  upgradeMultipliers: { [upgradeId: string]: number };
  growLightMultipliers: { [growLightId: string]: number };
}

interface IdleEarnings {
  totalKush: number;
  offlineMinutes: number;
  baseEarnings: number;
  upgradeBonus: number;
  growLightBonus: number;
  maxCapReached: boolean;
}

export class IdleProgressSystem {
  private config: IdleProgressConfig = {
    maxOfflineHours: 24, // Max 24 hours of idle progress
    baseIdleRate: 0.5, // 0.5 KUSH per minute base rate
    upgradeMultipliers: {
      'basic-clicker': 1.2,
      'auto-clicker': 2.0,
      'mega-clicker': 3.5,
      'kush-factory': 5.0,
      'quantum-grower': 10.0
    },
    growLightMultipliers: {
      'led-basic': 1.1,
      'led-advanced': 1.3,
      'hps-600w': 1.5,
      'hps-1000w': 2.0,
      'quantum-board': 2.5,
      'cob-array': 3.0,
      'full-spectrum': 4.0
    }
  };

  /**
   * Calculate idle earnings for a player based on offline time
   */
  async calculateIdleEarnings(
    playerId: string,
    lastActiveTime: Date,
    storage: any
  ): Promise<IdleEarnings> {
    try {
      const now = new Date();
      const offlineMinutes = Math.floor((now.getTime() - lastActiveTime.getTime()) / (1000 * 60));
      const maxMinutes = this.config.maxOfflineHours * 60;
      const effectiveMinutes = Math.min(offlineMinutes, maxMinutes);

      console.log(`💤 Calculating idle earnings for ${effectiveMinutes} minutes offline`);

      if (effectiveMinutes <= 0) {
        return {
          totalKush: 0,
          offlineMinutes: 0,
          baseEarnings: 0,
          upgradeBonus: 0,
          growLightBonus: 0,
          maxCapReached: false
        };
      }

      // Get player data
      const player = await storage.getPlayer(playerId);
      if (!player) {
        throw new Error('Player not found');
      }

      // Calculate base idle earnings
      const baseEarnings = this.config.baseIdleRate * effectiveMinutes;
      
      // Calculate upgrade multipliers
      const playerUpgrades = await storage.getPlayerUpgrades(playerId) || [];
      let upgradeMultiplier = 1.0;
      let upgradeBonus = 0;
      
      for (const upgrade of playerUpgrades) {
        const multiplier = this.config.upgradeMultipliers[upgrade.upgradeId] || 1.0;
        upgradeMultiplier *= Math.pow(multiplier, upgrade.level);
      }
      
      upgradeBonus = baseEarnings * (upgradeMultiplier - 1.0);
      
      // Calculate grow light multipliers
      const playerGrowLights = await storage.getPlayerGrowLights(playerId) || [];
      let growLightMultiplier = 1.0;
      let growLightBonus = 0;
      
      for (const growLight of playerGrowLights) {
        if (growLight.isActive) {
          const multiplier = this.config.growLightMultipliers[growLight.growLightId] || 1.0;
          growLightMultiplier *= Math.pow(multiplier, growLight.quantity);
        }
      }
      
      growLightBonus = (baseEarnings + upgradeBonus) * (growLightMultiplier - 1.0);
      
      // Calculate total earnings
      const totalKush = Math.floor(baseEarnings + upgradeBonus + growLightBonus);
      const maxCapReached = offlineMinutes > maxMinutes;

      console.log(`💰 Idle earnings calculated: ${totalKush} KUSH (base: ${Math.floor(baseEarnings)}, upgrade: ${Math.floor(upgradeBonus)}, lights: ${Math.floor(growLightBonus)})`);

      return {
        totalKush,
        offlineMinutes: effectiveMinutes,
        baseEarnings: Math.floor(baseEarnings),
        upgradeBonus: Math.floor(upgradeBonus),
        growLightBonus: Math.floor(growLightBonus),
        maxCapReached
      };

    } catch (error) {
      console.error('❌ Idle earnings calculation error:', error);
      return {
        totalKush: 0,
        offlineMinutes: 0,
        baseEarnings: 0,
        upgradeBonus: 0,
        growLightBonus: 0,
        maxCapReached: false
      };
    }
  }

  /**
   * Process idle earnings and update player data
   */
  async processIdleEarnings(
    playerId: string,
    storage: any
  ): Promise<IdleEarnings | null> {
    try {
      const player = await storage.getPlayer(playerId);
      if (!player || !player.lastActiveTime) {
        return null;
      }

      const idleEarnings = await this.calculateIdleEarnings(
        playerId,
        new Date(player.lastActiveTime),
        storage
      );

      if (idleEarnings.totalKush > 0) {
        // Add idle earnings to player's balance
        await storage.addKushToPlayer(playerId, idleEarnings.totalKush);
        
        // Update last active time to prevent double-claiming
        await storage.updatePlayerLastActive(playerId, new Date());
        
        console.log(`✅ Processed idle earnings: ${idleEarnings.totalKush} KUSH for player ${playerId}`);
      }

      return idleEarnings;

    } catch (error) {
      console.error('❌ Idle earnings processing error:', error);
      return null;
    }
  }

  /**
   * Get idle earnings preview without claiming
   */
  async getIdlePreview(
    playerId: string,
    storage: any
  ): Promise<IdleEarnings | null> {
    try {
      const player = await storage.getPlayer(playerId);
      if (!player || !player.lastActiveTime) {
        return null;
      }

      return await this.calculateIdleEarnings(
        playerId,
        new Date(player.lastActiveTime),
        storage
      );

    } catch (error) {
      console.error('❌ Idle preview error:', error);
      return null;
    }
  }

  /**
   * Update player's last active time
   */
  async updateLastActive(
    playerId: string,
    storage: any,
    timestamp: Date = new Date()
  ): Promise<void> {
    try {
      await storage.updatePlayerLastActive(playerId, timestamp);
    } catch (error) {
      console.error('❌ Update last active error:', error);
    }
  }
}

// Export singleton instance
export const idleProgressSystem = new IdleProgressSystem();