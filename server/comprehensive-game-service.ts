// Comprehensive Game Features Service - All Advanced Systems
import { storage } from './storage.js';
import { cache } from './cache.js';

// ===== 1. PRESTIGE SYSTEM SERVICE =====
class PrestigeService {
  async canPrestige(playerId: string): Promise<boolean> {
    const player = await storage.getPlayer(playerId);
    if (!player) return false;
    
    // Require at least 1 billion KUSH to prestige  
    return player.totalKush >= 1000000000;
  }

  async executePrestige(playerId: string): Promise<{ success: boolean; newMultiplier: number }> {
    try {
      const player = await storage.getPlayer(playerId);
      if (!player || !await this.canPrestige(playerId)) {
        return { success: false, newMultiplier: 0 };
      }

      // Calculate prestige multiplier - each prestige gives 10% permanent bonus
      const currentLevel = await this.getPrestigeLevel(playerId);
      const newMultiplier = 100 + (currentLevel + 1) * 10; // 110%, 120%, 130%, etc.

      // Record prestige in database
      await storage.addPrestigeLevel({
        playerId,
        level: currentLevel + 1,
        totalKushAtPrestige: player.totalKush,
        permanentMultiplier: newMultiplier
      });

      // Reset player stats but keep prestige multiplier
      await storage.resetPlayerForPrestige(playerId, newMultiplier);
      
      return { success: true, newMultiplier };
    } catch (error) {
      console.error('Error executing prestige:', error);
      return { success: false, newMultiplier: 0 };
    }
  }

  async getPrestigeLevel(playerId: string): Promise<number> {
    const levels = await storage.getPlayerPrestigeLevels(playerId);
    return levels.length;
  }

  async getPrestigeMultiplier(playerId: string): Promise<number> {
    const levels = await storage.getPlayerPrestigeLevels(playerId);
    if (levels.length === 0) return 100; // 1.0x default
    
    const latestLevel = levels[levels.length - 1];
    return latestLevel.permanentMultiplier;
  }
}

// ===== 2. DAILY CHALLENGES SERVICE =====
class DailyChallengesService {
  private getDailyKey(): string {
    const today = new Date();
    return today.getFullYear() + '-' + 
           String(today.getMonth() + 1).padStart(2, '0') + '-' + 
           String(today.getDate()).padStart(2, '0');
  }

  async getTodaysChallenges(): Promise<any[]> {
    const cacheKey = `daily-challenges:${this.getDailyKey()}`;
    let challenges = cache.get(cacheKey);
    
    if (!challenges) {
      challenges = await storage.getDailyChallengesForDate(this.getDailyKey());
      
      // If no challenges for today, generate them
      if (challenges.length === 0) {
        challenges = await this.generateDailyChallenges();
      }
      
      cache.set(cacheKey, challenges, 3600000); // Cache for 1 hour
    }
    
    return challenges;
  }

  async generateDailyChallenges(): Promise<any[]> {
    const dateKey = this.getDailyKey();
    const challengeTemplates = [
      { name: "Click Master", description: "Achieve 1,000 clicks", challengeType: "clicks", targetValue: 1000, kushReward: 500, seedsReward: 100, icon: "👆", difficulty: "easy" },
      { name: "Token Burner", description: "Burn 100 KUSH tokens", challengeType: "burns", targetValue: 100, kushReward: 200, seedsReward: 150, icon: "🔥", difficulty: "medium" },
      { name: "Upgrade Collector", description: "Purchase 5 upgrades", challengeType: "upgrades", targetValue: 5, kushReward: 300, seedsReward: 80, icon: "⬆️", difficulty: "medium" },
      { name: "KUSH Accumulator", description: "Earn 10,000 KUSH", challengeType: "tokens", targetValue: 10000, kushReward: 1000, seedsReward: 200, icon: "💰", difficulty: "hard" },
    ];

    // Select 3 random challenges for today
    const selectedChallenges = challengeTemplates
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const challenges = [];
    for (const template of selectedChallenges) {
      const challenge = await storage.createDailyChallenge({
        ...template,
        dateActive: dateKey
      });
      challenges.push(challenge);
    }

    return challenges;
  }

  async getPlayerChallengeProgress(playerId: string): Promise<any[]> {
    const todaysChallenges = await this.getTodaysChallenges();
    const progress = [];
    
    for (const challenge of todaysChallenges) {
      const playerProgress = await storage.getPlayerDailyChallengeProgress(
        playerId, 
        challenge.id, 
        this.getDailyKey()
      );
      
      progress.push({
        ...challenge,
        progress: playerProgress?.progress || 0,
        completed: playerProgress?.completed || false,
        completedAt: playerProgress?.completedAt
      });
    }
    
    return progress;
  }

  async updateChallengeProgress(playerId: string, challengeType: string, incrementValue: number): Promise<void> {
    const todaysChallenges = await this.getTodaysChallenges();
    const relevantChallenges = todaysChallenges.filter(c => c.challengeType === challengeType);
    
    for (const challenge of relevantChallenges) {
      await storage.updatePlayerDailyChallengeProgress(
        playerId,
        challenge.id,
        incrementValue,
        this.getDailyKey()
      );
      
      // Check if challenge is now completed
      const progress = await storage.getPlayerDailyChallengeProgress(playerId, challenge.id, this.getDailyKey());
      if (progress && progress.progress >= challenge.targetValue && !progress.completed) {
        await storage.completeDailyChallenge(playerId, challenge.id, this.getDailyKey());
        await this.rewardPlayer(playerId, challenge.kushReward, challenge.seedsReward);
      }
    }
  }

  private async rewardPlayer(playerId: string, kushReward: number, seedsReward: number): Promise<void> {
    if (kushReward > 0) {
      await storage.addPlayerKush(playerId, kushReward);
    }
    if (seedsReward > 0) {
      await storage.addPlayerSeeds(playerId, seedsReward);
    }
  }
}

// ===== 3. FRIENDS SYSTEM SERVICE =====
class FriendsService {
  async sendFriendRequest(fromPlayerId: string, toPlayerUsername: string): Promise<{ success: boolean; message: string }> {
    try {
      const toPlayer = await storage.getPlayerByUsername(toPlayerUsername);
      if (!toPlayer) {
        return { success: false, message: "Player not found" };
      }
      
      if (fromPlayerId === toPlayer.id) {
        return { success: false, message: "Cannot send friend request to yourself" };
      }

      // Check if friendship already exists
      const existingFriendship = await storage.getFriendship(fromPlayerId, toPlayer.id);
      if (existingFriendship) {
        return { success: false, message: "Friend request already exists or you are already friends" };
      }

      await storage.createFriendship({
        playerId: fromPlayerId,
        friendId: toPlayer.id,
        status: 'pending'
      });

      return { success: true, message: "Friend request sent!" };
    } catch (error) {
      console.error('Error sending friend request:', error);
      return { success: false, message: "Failed to send friend request" };
    }
  }

  async acceptFriendRequest(playerId: string, friendshipId: string): Promise<boolean> {
    try {
      // Get the friendship record to find both players
      const friendship = await storage.getFriendshipById(friendshipId);
      if (!friendship || friendship.friendId !== playerId) {
        console.error('Invalid friendship or unauthorized access');
        return false;
      }

      // Update the original request to accepted
      await storage.updateFriendshipStatus(friendshipId, 'accepted');
      
      // Create the reciprocal friendship so both players see each other as friends
      await storage.createFriendship({
        playerId: friendship.friendId, // The person who accepted
        friendId: friendship.playerId, // The person who sent the request
        status: 'accepted',
        requestedAt: new Date(),
        acceptedAt: new Date()
      });
      
      return true;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      return false;
    }
  }

  async getFriendsList(playerId: string): Promise<any[]> {
    return await storage.getPlayerFriends(playerId);
  }

  async getPendingRequests(playerId: string): Promise<any[]> {
    return await storage.getPendingFriendRequests(playerId);
  }

  async sendGift(fromPlayerId: string, toPlayerId: string, giftType: string, amount: number, message?: string): Promise<boolean> {
    try {
      // Verify friendship exists
      const friendship = await storage.getFriendship(fromPlayerId, toPlayerId);
      if (!friendship || friendship.status !== 'accepted') {
        return false;
      }

      // Check if sender has enough resources
      const canSend = await this.validateGiftResources(fromPlayerId, giftType, amount);
      if (!canSend) return false;

      // Deduct from sender
      await this.deductGiftResources(fromPlayerId, giftType, amount);

      // Create gift record
      await storage.createFriendGift({
        fromPlayerId,
        toPlayerId,
        giftType,
        amount,
        message: message || ''
      });

      return true;
    } catch (error) {
      console.error('Error sending gift:', error);
      return false;
    }
  }

  private async validateGiftResources(playerId: string, giftType: string, amount: number): Promise<boolean> {
    const wallet = await storage.getPlayerWallet(playerId);
    if (!wallet) return false;

    switch (giftType) {
      case 'kush':
        return wallet.kushBalance >= amount;
      case 'seeds':
        return wallet.seedsBalance >= amount;
      default:
        return false;
    }
  }

  private async deductGiftResources(playerId: string, giftType: string, amount: number): Promise<void> {
    switch (giftType) {
      case 'kush':
        await storage.deductPlayerKush(playerId, amount);
        break;
      case 'seeds':
        await storage.deductPlayerSeeds(playerId, amount);
        break;
    }
  }
}

// ===== 4. CLICK MECHANICS SERVICE =====
class ClickMechanicsService {
  private combos = new Map<string, { count: number, lastClickTime: number }>();
  private criticalChance = 0.05; // 5% base critical hit chance

  async processClick(playerId: string): Promise<{
    kushEarned: number;
    isCritical: boolean;
    comboMultiplier: number;
    specialPattern?: string;
  }> {
    const player = await storage.getPlayer(playerId);
    if (!player) return { kushEarned: 0, isCritical: false, comboMultiplier: 1 };

    // Check for critical hit
    const isCritical = Math.random() < this.criticalChance;
    const criticalMultiplier = isCritical ? (2 + Math.random() * 8) : 1; // 2x to 10x

    // Calculate combo multiplier
    const comboMultiplier = this.updateComboChain(playerId);

    // Get prestige multiplier
    const prestigeMultiplier = await prestigeService.getPrestigeMultiplier(playerId) / 100;

    // Get VIP multiplier
    const vipBenefits = await vipService.getVIPBenefits(playerId);
    const vipMultiplier = vipBenefits.hasVIP ? vipBenefits.benefits.kushMultiplier / 100 : 1;

    // Calculate base click power with VIP bonus
    const baseKush = player.perClickMultiplier * prestigeMultiplier * criticalMultiplier * comboMultiplier * vipMultiplier;
    
    // Update click session tracking
    await this.updateClickSession(playerId, isCritical, comboMultiplier);

    // Update daily challenge progress
    await dailyChallengesService.updateChallengeProgress(playerId, 'clicks', 1);

    return {
      kushEarned: Math.floor(baseKush),
      isCritical,
      comboMultiplier,
      specialPattern: this.checkSpecialPattern(playerId)
    };
  }

  private updateComboChain(playerId: string): number {
    const now = Date.now();
    const combo = this.combos.get(playerId) || { count: 0, lastClickTime: 0 };
    
    // Reset combo if more than 2 seconds between clicks
    if (now - combo.lastClickTime > 2000) {
      combo.count = 1;
    } else {
      combo.count++;
    }
    
    combo.lastClickTime = now;
    this.combos.set(playerId, combo);
    
    // Combo multiplier maxes out at 3x after 10 consecutive clicks
    return 1 + Math.min(combo.count * 0.2, 2);
  }

  private async updateClickSession(playerId: string, isCritical: boolean, comboMultiplier: number): Promise<void> {
    // Update or create active click session
    await storage.updateClickSession(playerId, {
      totalClicks: 1,
      criticalHits: isCritical ? 1 : 0,
      maxCombo: Math.floor(comboMultiplier * 10) // Store combo as integer
    });
  }

  private checkSpecialPattern(playerId: string): string | undefined {
    const combo = this.combos.get(playerId);
    if (!combo) return undefined;

    // Special patterns for bonus rewards
    if (combo.count === 50) return "Half Century!";
    if (combo.count === 100) return "Century Master!";
    if (combo.count === 250) return "Click Fury!";
    if (combo.count === 500) return "Legendary Clicker!";
    
    return undefined;
  }

  async activateClickBoost(playerId: string, boostType: string, multiplier: number, duration: number): Promise<boolean> {
    try {
      const expiresAt = new Date(Date.now() + duration * 1000);
      
      await storage.createClickBoost({
        playerId,
        boostType,
        multiplier,
        duration,
        expiresAt
      });

      return true;
    } catch (error) {
      console.error('Error activating click boost:', error);
      return false;
    }
  }

  async getActiveBoosts(playerId: string): Promise<any[]> {
    return await storage.getActiveClickBoosts(playerId);
  }
}

// ===== 5. GUILD SYSTEM SERVICE =====
class GuildService {
  async createGuild(leaderId: string, name: string, description?: string): Promise<{ success: boolean; guildId?: string; message: string }> {
    try {
      // Check if player is already in a guild
      const existingMembership = await storage.getPlayerGuildMembership(leaderId);
      if (existingMembership) {
        return { success: false, message: "You are already in a guild" };
      }

      // Check if guild name is already taken
      const existingGuild = await storage.getGuildByName(name);
      if (existingGuild) {
        return { success: false, message: "Guild name already taken" };
      }

      // Create guild
      const guild = await storage.createGuild({
        name,
        description: description || '',
        leaderPlayerId: leaderId,
        memberCount: 1,
        maxMembers: 50,
        totalKushEarned: 0,
        guildLevel: 1,
        isPublic: true
      });

      // Add leader as member
      await storage.addGuildMember({
        guildId: guild.id,
        playerId: leaderId,
        role: 'leader',
        contributedKush: 0
      });

      return { success: true, guildId: guild.id, message: "Guild created successfully!" };
    } catch (error) {
      console.error('Error creating guild:', error);
      return { success: false, message: "Failed to create guild" };
    }
  }

  async joinGuild(playerId: string, guildId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if player is already in a guild
      const existingMembership = await storage.getPlayerGuildMembership(playerId);
      if (existingMembership) {
        return { success: false, message: "You are already in a guild" };
      }

      // Check if guild exists and has space
      const guild = await storage.getGuildById(guildId);
      if (!guild) {
        return { success: false, message: "Guild not found" };
      }

      if (guild.memberCount >= guild.maxMembers) {
        return { success: false, message: "Guild is full" };
      }

      // Add member
      await storage.addGuildMember({
        guildId,
        playerId,
        role: 'member',
        contributedKush: 0
      });

      // Update guild member count
      await storage.updateGuildMemberCount(guildId, guild.memberCount + 1);

      return { success: true, message: "Successfully joined guild!" };
    } catch (error) {
      console.error('Error joining guild:', error);
      return { success: false, message: "Failed to join guild" };
    }
  }

  async getGuildMembers(guildId: string): Promise<any[]> {
    return await storage.getGuildMembers(guildId);
  }

  async getGuildLeaderboard(): Promise<any[]> {
    return await storage.getGuildLeaderboard();
  }

  async contributeToGuild(playerId: string, kushAmount: number): Promise<boolean> {
    try {
      const membership = await storage.getPlayerGuildMembership(playerId);
      if (!membership) return false;

      // Check if player has enough KUSH
      const wallet = await storage.getPlayerWallet(playerId);
      if (!wallet || wallet.kushBalance < kushAmount) return false;

      // Deduct from player, add to guild
      await storage.deductPlayerKush(playerId, kushAmount);
      await storage.updateGuildContribution(membership.guildId, playerId, kushAmount);

      return true;
    } catch (error) {
      console.error('Error contributing to guild:', error);
      return false;
    }
  }

  async getPlayerGuild(playerId: string): Promise<any> {
    try {
      const membership = await storage.getPlayerGuildMembership(playerId);
      if (!membership) {
        return { guild: null, role: null, joinedAt: null };
      }

      const guild = await storage.getGuildById(membership.guildId);
      return {
        guild,
        role: membership.role,
        joinedAt: membership.joinedAt
      };
    } catch (error) {
      console.error('Error fetching player guild:', error);
      return { guild: null, role: null, joinedAt: null };
    }
  }
}

// ===== 12. GROW GARDEN SYSTEM SERVICE =====
class GrowGardenService {
  private readonly GROWTH_STAGES = ['empty', 'seedling', 'vegetative', 'flowering', 'ready'];
  private readonly WATER_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  private readonly FERTILIZER_INTERVAL = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

  // Strain Genetics Management
  async getAllStrains(): Promise<any[]> {
    let strains = await storage.getAllStrainGenetics();
    
    // Initialize default strains if none exist
    if (strains.length === 0) {
      await this.initializeDefaultStrains();
      strains = await storage.getAllStrainGenetics();
    }
    
    return strains;
  }

  private async initializeDefaultStrains(): Promise<void> {
    const defaultStrains = [
      {
        name: "OG Kush",
        type: "indica",
        rarity: "common",
        thcLevel: 22,
        cbdLevel: 1,
        floweringTime: 8,
        yieldMultiplier: 100,
        clickBonus: 0,
        description: "Classic indica-dominant strain with earthy, piney flavors",
        discoveredBy: "system",
        icon: "🌿"
      },
      {
        name: "Blue Dream", 
        type: "sativa",
        rarity: "uncommon",
        thcLevel: 24,
        cbdLevel: 1,
        floweringTime: 9,
        yieldMultiplier: 120,
        clickBonus: 5,
        description: "Sativa-dominant hybrid with sweet berry aroma",
        discoveredBy: "system",
        icon: "💙"
      },
      {
        name: "White Widow",
        type: "hybrid",
        rarity: "rare", 
        thcLevel: 26,
        cbdLevel: 1,
        floweringTime: 7,
        yieldMultiplier: 140,
        clickBonus: 10,
        description: "Potent hybrid with resinous white trichomes",
        discoveredBy: "system",
        icon: "❄️"
      },
      {
        name: "Girl Scout Cookies",
        type: "indica",
        rarity: "epic",
        thcLevel: 28,
        cbdLevel: 1,
        floweringTime: 9,
        yieldMultiplier: 160,
        clickBonus: 15,
        description: "Premium hybrid with sweet, earthy flavors",
        discoveredBy: "system",
        icon: "🍪"
      },
      {
        name: "Gorilla Glue #4",
        type: "hybrid",
        rarity: "legendary",
        thcLevel: 32,
        cbdLevel: 1,
        floweringTime: 10,
        yieldMultiplier: 200,
        clickBonus: 25,
        description: "Ultra-potent hybrid with massive yields and sticky buds",
        discoveredBy: "system",
        icon: "🦍"
      },
      {
        name: "Purple Haze",
        type: "sativa",
        rarity: "uncommon",
        thcLevel: 20,
        cbdLevel: 2,
        floweringTime: 8,
        yieldMultiplier: 110,
        clickBonus: 3,
        description: "Sativa with psychedelic purple hues",
        discoveredBy: "system",
        icon: "💜"
      }
    ];

    for (const strain of defaultStrains) {
      await storage.createStrainGenetics({
        id: `strain_${strain.name.toLowerCase().replace(/\s+/g, '_')}`,
        ...strain
      });
    }
  }

  async getPlayerOwnedStrains(playerId: string): Promise<any[]> {
    return await storage.getPlayerStrainGenetics(playerId);
  }

  async crossBreedStrains(playerId: string, strain1Id: string, strain2Id: string): Promise<{
    success: boolean;
    newStrain?: any;
    message: string;
  }> {
    try {
      const player = await storage.getPlayer(playerId);
      const strain1 = await storage.getStrainGenetics(strain1Id);
      const strain2 = await storage.getStrainGenetics(strain2Id);

      if (!player || !strain1 || !strain2) {
        return { success: false, message: "Invalid player or strain selection" };
      }

      // Check if player has enough SEEDS tokens for breeding (cost: 10 SEEDS)
      const playerWallet = await storage.getPlayerWallet(playerId);
      if (playerWallet.seedsBalance < 10) {
        return { success: false, message: "Need 10 SEEDS tokens to cross-breed strains" };
      }

      // Generate 2 new strains from parents
      const newStrain1 = await this.generateCrossBredStrain(strain1, strain2, playerId, 1);
      const newStrain2 = await this.generateCrossBredStrain(strain1, strain2, playerId, 2);
      
      // Deduct SEEDS cost
      await storage.addPlayerSeeds(playerId, -10);
      
      // Record SEEDS transaction
      await storage.addSeedsTransaction({
        playerId,
        amount: -10,
        transactionType: 'spent',
        reason: `Cross-bred ${strain1.name} x ${strain2.name} (2 strains)`
      });

      return { 
        success: true, 
        newStrain: [newStrain1, newStrain2], 
        message: `Successfully created 2 new strains: ${newStrain1.name} and ${newStrain2.name}!` 
      };
    } catch (error) {
      console.error('Error cross-breeding strains:', error);
      return { success: false, message: "Cross-breeding failed" };
    }
  }

  private async generateCrossBredStrain(parent1: any, parent2: any, playerId: string, variant: number): Promise<any> {
    // Determine rarity based on parents with random chance
    const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const parent1RarityIndex = rarities.indexOf(parent1.rarity);
    const parent2RarityIndex = rarities.indexOf(parent2.rarity);
    const baseRarityIndex = Math.max(parent1RarityIndex, parent2RarityIndex);
    
    // Higher chance of rarity upgrade for better parents
    let newRarityIndex = baseRarityIndex;
    if (Math.random() > 0.8) newRarityIndex = Math.min(4, baseRarityIndex + 1);
    if (Math.random() > 0.95) newRarityIndex = Math.min(4, baseRarityIndex + 2);
    
    const rarity = rarities[newRarityIndex];
    
    // Generate more unique traits for rarer strains
    const rarityBonus = newRarityIndex * 2; // More bonus for rarer strains
    const uniquenessFactor = newRarityIndex + 1; // How unique the strain is
    
    // Base characteristics with rarity-based variance
    const avgThc = Math.floor((parent1.thcLevel + parent2.thcLevel) / 2);
    const avgCbd = Math.floor((parent1.cbdLevel + parent2.cbdLevel) / 2);
    const avgFlowerTime = Math.floor((parent1.floweringTime + parent2.floweringTime) / 2);
    const avgYield = Math.max(parent1.yieldMultiplier, parent2.yieldMultiplier);
    const avgClickBonus = Math.max(parent1.clickBonus, parent2.clickBonus);
    
    // Apply uniqueness based on rarity - rarer strains get better bonuses
    const thcBonus = Math.floor(Math.random() * (5 + rarityBonus));
    const cbdBonus = Math.floor(Math.random() * (3 + rarityBonus));
    const yieldBonus = Math.floor(Math.random() * (10 + rarityBonus * 2));
    const clickBonusExtra = Math.floor(Math.random() * (5 + rarityBonus));
    
    // Unique names based on variant and rarity
    const uniqueAdjectives = {
      common: ['Hybrid', 'Cross', 'Blend'],
      uncommon: ['Elite', 'Select', 'Prime'],
      rare: ['Exotic', 'Supreme', 'Royal'],
      epic: ['Legendary', 'Mythic', 'Divine'],
      legendary: ['Cosmic', 'Ethereal', 'Transcendent']
    };
    
    const adjective = uniqueAdjectives[rarity][Math.floor(Math.random() * uniqueAdjectives[rarity].length)];
    const hybridName = `${adjective} ${parent1.name.split(' ')[0]}${parent2.name.split(' ')[0]} #${variant}`;
    
    // Unique icons for different rarities
    const rarityIcons = {
      common: '🌿',
      uncommon: '🍃',
      rare: '🌺',
      epic: '💎',
      legendary: '⭐'
    };
    
    return await storage.createStrainGenetics({
      name: hybridName,
      type: 'hybrid',
      rarity,
      thcLevel: Math.min(35, avgThc + thcBonus),
      cbdLevel: Math.min(30, avgCbd + cbdBonus),
      floweringTime: Math.max(30, avgFlowerTime - Math.floor(rarityBonus / 2)), // Faster flowering for rarer
      yieldMultiplier: avgYield + yieldBonus,
      clickBonus: avgClickBonus + clickBonusExtra,
      description: `A ${rarity} hybrid strain with enhanced ${uniquenessFactor > 3 ? 'extraordinary' : 'unique'} properties from ${parent1.name} and ${parent2.name}`,
      parentStrain1: parent1.id,
      parentStrain2: parent2.id,
      discoveredBy: playerId,
      icon: rarityIcons[rarity]
    });
  }

  // Garden Plot Management
  async getPlayerGarden(playerId: string): Promise<any[]> {
    const plots = await storage.getPlayerGardenPlots(playerId);
    
    // If player has no plots, create all 6 initial plots
    if (plots.length === 0) {
      const initialPlots = [];
      
      // Create plot 1 (always unlocked and free)
      const plot1 = await storage.createGardenPlot({
        playerId,
        plotNumber: 1,
        isUnlocked: true,
        unlockCost: 0
      });
      initialPlots.push(plot1);
      
      // Create plots 2-6 (initially unlocked for better UX)
      for (let plotNumber = 2; plotNumber <= 6; plotNumber++) {
        const plot = await storage.createGardenPlot({
          playerId,
          plotNumber,
          isUnlocked: true, // Making all plots unlocked by default for better gameplay
          unlockCost: 0
        });
        initialPlots.push(plot);
      }
      
      return initialPlots;
    }
    
    // If player has some plots but not all 6, create missing ones
    if (plots.length < 6) {
      const existingPlotNumbers = plots.map(p => p.plotNumber);
      
      for (let plotNumber = 1; plotNumber <= 6; plotNumber++) {
        if (!existingPlotNumbers.includes(plotNumber)) {
          const newPlot = await storage.createGardenPlot({
            playerId,
            plotNumber,
            isUnlocked: true,
            unlockCost: 0
          });
          plots.push(newPlot);
        }
      }
      
      // Sort plots by plot number
      plots.sort((a, b) => a.plotNumber - b.plotNumber);
    }
    
    return plots;
  }

  async unlockGardenPlot(playerId: string, plotNumber: number): Promise<{ success: boolean; message: string }> {
    try {
      const player = await storage.getPlayer(playerId);
      const existingPlot = await storage.getGardenPlot(playerId, plotNumber);
      
      if (!player) {
        return { success: false, message: "Player not found" };
      }
      
      if (existingPlot && existingPlot.isUnlocked) {
        return { success: false, message: "Plot already unlocked" };
      }
      
      const unlockCost = this.calculatePlotUnlockCost(plotNumber);
      
      if (player.totalKush < unlockCost) {
        return { success: false, message: `Need ${unlockCost.toLocaleString()} KUSH to unlock this plot` };
      }

      // Deduct KUSH and unlock plot
      await storage.updatePlayer(playerId, { totalKush: player.totalKush - unlockCost });
      
      if (existingPlot) {
        await storage.updateGardenPlot(existingPlot.id, { isUnlocked: true, unlockCost });
      } else {
        await storage.createGardenPlot({
          playerId,
          plotNumber,
          isUnlocked: true,
          unlockCost
        });
      }

      return { success: true, message: `Garden plot ${plotNumber} unlocked!` };
    } catch (error) {
      console.error('Error unlocking garden plot:', error);
      return { success: false, message: "Failed to unlock plot" };
    }
  }

  private calculatePlotUnlockCost(plotNumber: number): number {
    // Exponential cost scaling: 1M, 2.5M, 6M, 15M, etc.
    return Math.floor(1000000 * Math.pow(2.5, plotNumber - 1));
  }

  // Plant Growing & Care System
  async plantStrain(playerId: string, plotId: string, strainId: string): Promise<{ success: boolean; message: string }> {
    try {
      const plot = await storage.getGardenPlotById(plotId);
      const strain = await storage.getStrainGenetics(strainId);
      const supplies = await storage.getPlayerGardenSupplies(playerId);
      
      
      if (!plot || plot.playerId !== playerId) {
        return { success: false, message: "Invalid plot" };
      }
      
      if (!strain) {
        return { success: false, message: "Invalid strain" };
      }
      
      if (plot.growthStage !== 'empty') {
        return { success: false, message: "Plot is not empty" };
      }
      
      // Check if player has seeds (require 1 seed per plant)
      const seedSupply = supplies.find(s => s.supplyType === 'seeds');
      if (!seedSupply || seedSupply.quantity < 1) {
        return { success: false, message: "Need at least 1 seed to plant" };
      }
      
      // Plant the strain
      const now = new Date();
      const harvestTime = new Date(now.getTime() + (strain.floweringTime * 24 * 60 * 60 * 1000));
      
      await storage.updateGardenPlot(plotId, {
        strainId: strain.id,
        plantedAt: now,
        lastWatered: now,
        growthStage: 'seedling',
        harvestTime,
        expectedYield: this.calculateExpectedYield(strain)
      });
      
      // Consume seed
      await storage.updateGardenSupplies(playerId, 'seeds', seedSupply.quantity - 1);
      
      return { success: true, message: `${strain.name} planted successfully!` };
    } catch (error) {
      console.error('Error planting strain:', error);
      return { success: false, message: "Planting failed" };
    }
  }

  private calculateExpectedYield(strain: any): number {
    const baseYield = 100 + Math.floor(Math.random() * 50); // 100-150 base
    return Math.floor(baseYield * (strain.yieldMultiplier / 100));
  }

  async waterPlant(playerId: string, plotId: string): Promise<{ success: boolean; message: string }> {
    try {
      const plot = await storage.getGardenPlotById(plotId);
      const supplies = await storage.getPlayerGardenSupplies(playerId);
      
      if (!plot || plot.playerId !== playerId) {
        return { success: false, message: "Invalid plot" };
      }
      
      if (plot.growthStage === 'empty' || plot.growthStage === 'ready') {
        return { success: false, message: "No plant to water" };
      }
      
      // Check water supply
      const waterSupply = supplies.find(s => s.supplyType === 'water');
      if (!waterSupply || waterSupply.quantity < 1) {
        return { success: false, message: "Need water supply to water plants" };
      }
      
      // Check if watering is needed (can't water too frequently)
      const timeSinceLastWater = Date.now() - new Date(plot.lastWatered).getTime();
      if (timeSinceLastWater < this.WATER_INTERVAL) {
        const waitTime = Math.ceil((this.WATER_INTERVAL - timeSinceLastWater) / (60 * 60 * 1000));
        return { success: false, message: `Plant was recently watered. Wait ${waitTime} more hours.` };
      }
      
      // Water the plant
      await storage.updateGardenPlot(plotId, { lastWatered: new Date() });
      await storage.updateGardenSupplies(playerId, 'water', waterSupply.quantity - 1);
      
      // Update growth stage if needed
      await this.updatePlantGrowthStage(plot);
      
      return { success: true, message: "Plant watered successfully!" };
    } catch (error) {
      console.error('Error watering plant:', error);
      return { success: false, message: "Watering failed" };
    }
  }

  async fertilizePlant(playerId: string, plotId: string): Promise<{ success: boolean; message: string }> {
    try {
      const plot = await storage.getGardenPlotById(plotId);
      const supplies = await storage.getPlayerGardenSupplies(playerId);
      
      if (!plot || plot.playerId !== playerId) {
        return { success: false, message: "Invalid plot" };
      }
      
      if (plot.growthStage === 'empty' || plot.growthStage === 'ready') {
        return { success: false, message: "No plant to fertilize" };
      }
      
      // Check fertilizer supply
      const fertilizerSupply = supplies.find(s => s.supplyType === 'fertilizer');
      if (!fertilizerSupply || fertilizerSupply.quantity < 1) {
        return { success: false, message: "Need fertilizer to boost plant growth" };
      }
      
      // Check if fertilizing is needed
      const timeSinceLastFertilizer = Date.now() - new Date(plot.lastFertilized || plot.plantedAt).getTime();
      if (timeSinceLastFertilizer < this.FERTILIZER_INTERVAL) {
        const waitTime = Math.ceil((this.FERTILIZER_INTERVAL - timeSinceLastFertilizer) / (60 * 60 * 1000));
        return { success: false, message: `Plant was recently fertilized. Wait ${waitTime} more hours.` };
      }
      
      // Apply fertilizer - reduces flowering time by 10%
      const currentHarvestTime = new Date(plot.harvestTime);
      const timeReduction = 0.1 * (currentHarvestTime.getTime() - Date.now());
      const newHarvestTime = new Date(currentHarvestTime.getTime() - timeReduction);
      
      await storage.updateGardenPlot(plotId, { 
        lastFertilized: new Date(),
        harvestTime: newHarvestTime,
        expectedYield: Math.floor(plot.expectedYield * 1.2) // 20% yield boost
      });
      
      await storage.updateGardenSupplies(playerId, 'fertilizer', fertilizerSupply.quantity - 1);
      
      return { success: true, message: "Plant fertilized! Growth accelerated and yield increased!" };
    } catch (error) {
      console.error('Error fertilizing plant:', error);
      return { success: false, message: "Fertilizing failed" };
    }
  }

  private async updatePlantGrowthStage(plot: any): Promise<void> {
    if (!plot.plantedAt || !plot.harvestTime) return;
    
    const now = Date.now();
    const plantedTime = new Date(plot.plantedAt).getTime();
    const harvestTime = new Date(plot.harvestTime).getTime();
    const totalGrowthTime = harvestTime - plantedTime;
    const elapsedTime = now - plantedTime;
    const growthProgress = elapsedTime / totalGrowthTime;
    
    let newStage = 'seedling';
    if (growthProgress >= 1.0) newStage = 'ready';
    else if (growthProgress >= 0.75) newStage = 'flowering';
    else if (growthProgress >= 0.4) newStage = 'vegetative';
    
    if (newStage !== plot.growthStage) {
      await storage.updateGardenPlot(plot.id, { growthStage: newStage });
    }
  }

  async updateAllPlantGrowthStages(playerId: string): Promise<void> {
    try {
      const plots = await storage.getPlayerGardenPlots(playerId);
      
      for (const plot of plots) {
        if (plot.strainId && plot.plantedAt) {
          await this.updatePlantGrowthStage(plot);
        }
      }
    } catch (error) {
      console.error('Error updating plant growth stages:', error);
    }
  }

  // Harvesting System
  async harvestPlant(playerId: string, plotId: string): Promise<{ 
    success: boolean; 
    message: string; 
    rewards?: { kushEarned: number; seedsEarned: number; specialItems?: string[] }
  }> {
    try {
      const plot = await storage.getGardenPlotById(plotId);
      const strain = plot?.strainId ? await storage.getStrainGenetics(plot.strainId) : null;
      
      if (!plot || plot.playerId !== playerId) {
        return { success: false, message: "Invalid plot" };
      }
      
      if (plot.growthStage !== 'ready') {
        return { success: false, message: "Plant is not ready for harvest" };
      }
      
      if (!strain) {
        return { success: false, message: "Strain data not found" };
      }
      
      // Calculate harvest rewards
      const kushEarned = plot.expectedYield + strain.clickBonus;
      const seedsEarned = Math.floor(kushEarned * 0.1); // 10% of KUSH as SEEDS
      
      // Generate special items (rare chance)
      const specialItems = [];
      if (Math.random() < 0.1) { // 10% chance
        specialItems.push('Rare Seed Packet');
      }
      if (Math.random() < 0.05) { // 5% chance
        specialItems.push('Premium Fertilizer');
      }
      
      // Award rewards
      const player = await storage.getPlayer(playerId);
      const wallet = await storage.getPlayerWallet(playerId);
      
      await storage.updatePlayer(playerId, { 
        totalKush: player!.totalKush + kushEarned 
      });
      
      await storage.addPlayerSeeds(playerId, seedsEarned);
      
      // Record harvest history
      await storage.addHarvestHistory({
        playerId,
        plotId,
        strainId: strain.id,
        kushEarned,
        seedsEarned,
        specialItems: JSON.stringify(specialItems)
      });
      
      // Reset plot to empty
      await storage.updateGardenPlot(plotId, {
        strainId: null,
        plantedAt: null,
        lastWatered: null,
        lastFertilized: null,
        growthStage: 'empty',
        harvestTime: null,
        expectedYield: 0
      });
      
      // Add seeds back to supplies (harvested plants give seeds)
      await storage.addGardenSupplies(playerId, 'seeds', 2 + Math.floor(Math.random() * 3)); // 2-4 seeds
      
      return { 
        success: true, 
        message: `Harvested ${strain.name} successfully!`,
        rewards: { kushEarned, seedsEarned, specialItems }
      };
    } catch (error) {
      console.error('Error harvesting plant:', error);
      return { success: false, message: "Harvest failed" };
    }
  }

  // Garden Supplies Management
  async buyGardenSupplies(playerId: string, supplyType: string, quantity: number): Promise<{ success: boolean; message: string }> {
    try {
      const costs: Record<string, number> = { 
        water: 100,      // 100 KUSH per water
        fertilizer: 500, // 500 KUSH per fertilizer  
        seeds: 1000,     // 1000 KUSH per seed packet (gives 5 seeds)
        nutrients: 300,  // 300 KUSH per nutrient
        ph_strips: 200   // 200 KUSH per pH strips
      };
      
      if (!costs[supplyType]) {
        return { success: false, message: "Invalid supply type" };
      }
      const totalCost = costs[supplyType] * quantity;
      const player = await storage.getPlayer(playerId);
      
      if (!player || player.totalKush < totalCost) {
        return { success: false, message: `Need ${totalCost.toLocaleString()} KUSH to buy ${quantity}x ${supplyType}` };
      }
      
      // Deduct cost
      await storage.updatePlayer(playerId, { totalKush: player.totalKush - totalCost });
      
      // Add supplies
      const actualQuantity = supplyType === 'seeds' ? quantity * 5 : quantity; // Seed packets give 5 seeds each
      await storage.addGardenSupplies(playerId, supplyType, actualQuantity);
      
      return { 
        success: true, 
        message: `Purchased ${quantity}x ${supplyType}${supplyType === 'seeds' ? ' packets' : ''} for ${totalCost.toLocaleString()} KUSH!` 
      };
    } catch (error) {
      console.error('Error buying garden supplies:', error);
      return { success: false, message: "Purchase failed" };
    }
  }

  async getPlayerSupplies(playerId: string): Promise<any[]> {
    return await storage.getPlayerGardenSupplies(playerId);
  }

  async getHarvestHistory(playerId: string): Promise<any[]> {
    return await storage.getPlayerHarvestHistory(playerId);
  }
}

// ===== 13. PVP BATTLE ARENA SERVICE =====
class PvPBattleArenaService {
  // Battle Management
  async challengePlayer(challengerId: string, defenderId: string, wager: number): Promise<{
    success: boolean;
    battleId?: string;
    message: string;
  }> {
    try {
      const challenger = await storage.getPlayer(challengerId);
      const defender = await storage.getPlayer(defenderId);

      if (!challenger || !defender) {
        return { success: false, message: "Player not found" };
      }

      // Check if challenger has enough KUSH for wager
      if (challenger.totalKush < wager) {
        return { success: false, message: `Need ${wager.toLocaleString()} KUSH to place wager` };
      }

      // Create battle
      const battleId = `battle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const battle = {
        id: battleId,
        challengerId,
        defenderId,
        wager,
        status: 'pending',
        createdAt: new Date(),
        challengerHP: 100,
        defenderHP: 100,
        currentTurn: challengerId,
        winner: null
      };

      await storage.createPvPBattle(battle);

      return { 
        success: true, 
        battleId,
        message: `Challenge sent to ${defender.username}!` 
      };
    } catch (error) {
      console.error('Error creating challenge:', error);
      return { success: false, message: "Challenge failed" };
    }
  }

  async getActiveBattles(playerId?: string): Promise<any[]> {
    if (playerId) {
      return await storage.getPlayerBattles(playerId);
    }
    return await storage.getActiveBattles();
  }

  async useAbility(playerId: string, battleId: string, abilityId: string): Promise<{
    success: boolean;
    damage: number;
    message: string;
  }> {
    try {
      const battle = await storage.getBattle(battleId);
      const player = await storage.getPlayer(playerId);

      if (!battle || !player) {
        return { success: false, damage: 0, message: "Battle or player not found" };
      }

      if (battle.currentTurn !== playerId) {
        return { success: false, damage: 0, message: "Not your turn!" };
      }

      // Define abilities with costs and damage
      const abilities: Record<string, { cost: number; damage: number; name: string }> = {
        'flame_strike': { cost: 100, damage: 25, name: 'Flame Strike' },
        'ice_shard': { cost: 150, damage: 30, name: 'Ice Shard' },
        'lightning_bolt': { cost: 200, damage: 40, name: 'Lightning Bolt' },
        'poison_cloud': { cost: 120, damage: 20, name: 'Poison Cloud' }
      };

      const ability = abilities[abilityId];
      if (!ability) {
        return { success: false, damage: 0, message: "Unknown ability" };
      }

      if (player.totalKush < ability.cost) {
        return { success: false, damage: 0, message: `Need ${ability.cost} KUSH to use ${ability.name}` };
      }

      // Deduct KUSH cost
      await storage.updatePlayer(playerId, { totalKush: player.totalKush - ability.cost });

      // Apply damage and update battle
      const isChallenger = battle.challengerId === playerId;
      const damage = ability.damage + Math.floor(Math.random() * 10); // Add randomness
      
      const updateData: any = {
        currentTurn: isChallenger ? battle.defenderId : battle.challengerId
      };

      if (isChallenger) {
        updateData.defenderHP = Math.max(0, battle.defenderHP - damage);
        if (updateData.defenderHP <= 0) {
          updateData.status = 'completed';
          updateData.winner = playerId;
        }
      } else {
        updateData.challengerHP = Math.max(0, battle.challengerHP - damage);
        if (updateData.challengerHP <= 0) {
          updateData.status = 'completed';
          updateData.winner = playerId;
        }
      }

      await storage.updateBattle(battleId, updateData);

      // Handle battle completion
      if (updateData.status === 'completed') {
        await this.completeBattle(battleId, playerId, battle.wager);
      }

      return {
        success: true,
        damage,
        message: `${ability.name} dealt ${damage} damage!`
      };
    } catch (error) {
      console.error('Error using ability:', error);
      return { success: false, damage: 0, message: "Ability failed" };
    }
  }

  private async completeBattle(battleId: string, winnerId: string, wager: number): Promise<void> {
    try {
      const battle = await storage.getBattle(battleId);
      if (!battle) return;

      const loserId = battle.challengerId === winnerId ? battle.defenderId : battle.challengerId;

      // Transfer winnings (winner gets double the wager)
      const winnerReward = wager * 2;
      await storage.addPlayerKush(winnerId, winnerReward);
      await storage.deductPlayerKush(loserId, wager);

      // Update battle stats
      await storage.updateBattleStats(winnerId, 'win');
      await storage.updateBattleStats(loserId, 'loss');

      // Record battle history
      await storage.recordBattleResult({
        battleId,
        winnerId,
        loserId,
        wager,
        winnerReward,
        completedAt: new Date()
      });
    } catch (error) {
      console.error('Error completing battle:', error);
    }
  }

  // Tournament Management
  async joinTournament(playerId: string, tournamentId: string): Promise<{ success: boolean; message: string }> {
    try {
      const player = await storage.getPlayer(playerId);
      const tournament = await storage.getTournament(tournamentId);

      if (!player || !tournament) {
        return { success: false, message: "Player or tournament not found" };
      }

      if (tournament.participants >= tournament.maxParticipants) {
        return { success: false, message: "Tournament is full" };
      }

      if (player.totalKush < tournament.entryFee) {
        return { success: false, message: `Need ${tournament.entryFee.toLocaleString()} KUSH entry fee` };
      }

      // Deduct entry fee
      await storage.updatePlayer(playerId, { totalKush: player.totalKush - tournament.entryFee });

      // Add to tournament
      await storage.joinTournament(playerId, tournamentId);

      return { success: true, message: `Joined ${tournament.name}!` };
    } catch (error) {
      console.error('Error joining tournament:', error);
      return { success: false, message: "Failed to join tournament" };
    }
  }

  async getOpenTournaments(): Promise<any[]> {
    return await storage.getOpenTournaments();
  }

  async getBattleLeaderboard(): Promise<any[]> {
    return await storage.getBattleLeaderboard();
  }
}

// ===== 14. VIP SUBSCRIPTION SERVICE =====
class VIPSubscriptionService {
  private readonly VIP_TIERS = {
    silver: { price: 500, kushMultiplier: 150, seedsBonus: 50, exclusiveStrains: ['strain_silver_haze'] },
    gold: { price: 1000, kushMultiplier: 200, seedsBonus: 100, exclusiveStrains: ['strain_golden_goat', 'strain_amnesia_gold'] },
    platinum: { price: 2000, kushMultiplier: 300, seedsBonus: 200, exclusiveStrains: ['strain_platinum_kush', 'strain_super_silver'] },
    diamond: { price: 3500, kushMultiplier: 500, seedsBonus: 500, exclusiveStrains: ['strain_diamond_og', 'strain_crystal_cookies'] }
  };

  async subscribeToVIP(playerId: string, tier: string): Promise<{ success: boolean; message: string }> {
    try {
      const player = await storage.getPlayer(playerId);
      const tierConfig = this.VIP_TIERS[tier as keyof typeof this.VIP_TIERS];
      
      if (!player || !tierConfig) {
        return { success: false, message: "Invalid player or VIP tier" };
      }

      if (player.totalKush < tierConfig.price) {
        return { success: false, message: `Need ${tierConfig.price.toLocaleString()} KUSH for ${tier} VIP` };
      }

      // Check existing subscription
      const existingSub = await storage.getPlayerVIPSubscription(playerId);
      if (existingSub && existingSub.status === 'active') {
        return { success: false, message: "Already have active VIP subscription" };
      }

      // Deduct payment
      await storage.updatePlayer(playerId, { totalKush: player.totalKush - tierConfig.price });

      // Create subscription - hourly billing
      const nextBilling = new Date();
      nextBilling.setHours(nextBilling.getHours() + 1);
      
      await storage.createVIPSubscription({
        playerId,
        tier,
        monthlyPrice: tierConfig.price,
        kushMultiplier: tierConfig.kushMultiplier,
        seedsBonus: tierConfig.seedsBonus,
        exclusiveStrains: JSON.stringify(tierConfig.exclusiveStrains),
        prioritySupport: tier === 'platinum' || tier === 'diamond',
        nextBillingDate: nextBilling
      });

      // Give immediate VIP seeds bonus as welcome gift
      await storage.addPlayerSeeds(playerId, tierConfig.seedsBonus);

      return { success: true, message: `Welcome to ${tier.toUpperCase()} VIP! Enjoy exclusive benefits! +${tierConfig.seedsBonus} seeds bonus!` };
    } catch (error) {
      console.error('VIP subscription error:', error);
      return { success: false, message: "Subscription failed" };
    }
  }

  async getVIPBenefits(playerId: string): Promise<any> {
    const subscription = await storage.getPlayerVIPSubscription(playerId);
    if (!subscription || subscription.status !== 'active') {
      return { hasVIP: false, tier: null, benefits: {} };
    }

    return {
      hasVIP: true,
      tier: subscription.tier,
      benefits: {
        kushMultiplier: subscription.kushMultiplier,
        seedsBonus: subscription.seedsBonus,
        exclusiveStrains: JSON.parse(subscription.exclusiveStrains || '[]'),
        prioritySupport: subscription.prioritySupport
      }
    };
  }
}

// ===== 15. SEASONAL EVENTS SERVICE =====
class SeasonalEventsService {
  async createSeasonalEvent(eventData: any): Promise<{ success: boolean; eventId?: string; message: string }> {
    try {
      const event = await storage.createSeasonalEvent(eventData);
      
      // Grant special seasonal strains to active event
      if (eventData.theme === '420day') {
        await this.createSpecialStrains(event.id, [
          { name: "420 Special", rarity: "legendary", thcLevel: 35, specialBonus: 420 }
        ]);
      }
      
      return { success: true, eventId: event.id, message: `${eventData.name} event created!` };
    } catch (error) {
      console.error('Seasonal event creation error:', error);
      return { success: false, message: "Failed to create event" };
    }
  }

  async getActiveEvents(): Promise<any[]> {
    return await storage.getActiveSeasonalEvents();
  }

  async participateInEvent(playerId: string, eventId: string): Promise<{ success: boolean; message: string }> {
    try {
      const event = await storage.getSeasonalEvent(eventId);
      if (!event || !event.isActive) {
        return { success: false, message: "Event not found or inactive" };
      }

      await storage.addEventParticipant(eventId, playerId);
      return { success: true, message: `Joined ${event.name}!` };
    } catch (error) {
      console.error('Event participation error:', error);
      return { success: false, message: "Failed to join event" };
    }
  }

  private async createSpecialStrains(eventId: string, strains: any[]): Promise<void> {
    for (const strain of strains) {
      await storage.createStrainGenetics({
        ...strain,
        type: 'hybrid',
        floweringTime: 7,
        yieldMultiplier: 200,
        clickBonus: strain.specialBonus || 0,
        description: `Special ${strain.name} - Limited time seasonal strain!`,
        discoveredBy: 'seasonal_event',
        icon: 'fas fa-star'
      });
    }
  }
}

// ===== 16. ANALYTICS SERVICE =====
class AnalyticsService {
  async trackPlayerAction(playerId: string, action: string, value?: number): Promise<void> {
    try {
      await storage.updatePlayerAnalytics(playerId, {
        lastAction: action,
        lastActionValue: value || 0,
        lastActionTime: new Date()
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  async getPlayerInsights(playerId: string): Promise<any> {
    const analytics = await storage.getPlayerAnalytics(playerId);
    const player = await storage.getPlayer(playerId);
    
    if (!analytics || !player) return null;

    return {
      playTime: analytics.totalPlayTime,
      efficiency: analytics.clicksPerMinute,
      favoriteStrain: analytics.favoritePlantStrain,
      battleRecord: `${analytics.totalBattlesWon}W`,
      engagementScore: this.calculateEngagementScore(analytics)
    };
  }

  private calculateEngagementScore(analytics: any): number {
    const timeScore = Math.min(analytics.totalPlayTime / 3600, 100); // Hours to score
    const activityScore = Math.min(analytics.clicksPerMinute * 10, 100);
    const socialScore = Math.min(analytics.totalBattlesWon * 5, 100);
    
    return Math.round((timeScore + activityScore + socialScore) / 3);
  }
}

// ===== 17. MARKETPLACE SERVICE =====
class MarketplaceService {
  async listStrainForSale(sellerId: string, strainId: string, price: number, quantity: number = 1): Promise<{ success: boolean; listingId?: string; message: string }> {
    try {
      const player = await storage.getPlayer(sellerId);
      if (!player) {
        return { success: false, message: "Player not found" };
      }

      // Verify player owns the strain (check garden plots or strain inventory)
      const playerStrains = await storage.getPlayerStrains(sellerId);
      const hasStrain = playerStrains.some(s => s.strainId === strainId && s.quantity >= quantity);
      
      if (!hasStrain) {
        return { success: false, message: "You don't own enough of this strain to sell" };
      }

      const listing = await storage.createMarketplaceListing({
        sellerId,
        itemType: 'strain',
        itemId: strainId,
        quantity,
        pricePerUnit: price,
        currency: 'KUSH'
      });

      return { success: true, listingId: listing.id, message: `Strain listed for ${price} KUSH!` };
    } catch (error) {
      console.error('Marketplace listing error:', error);
      return { success: false, message: "Failed to list strain" };
    }
  }

  async purchaseFromMarketplace(buyerId: string, listingId: string): Promise<{ success: boolean; message: string }> {
    try {
      const listing = await storage.getMarketplaceListing(listingId);
      const buyer = await storage.getPlayer(buyerId);
      
      if (!listing || !buyer) {
        return { success: false, message: "Listing or buyer not found" };
      }

      if (listing.status !== 'active') {
        return { success: false, message: "Listing no longer available" };
      }

      const totalCost = listing.pricePerUnit * listing.quantity;
      if (buyer.totalKush < totalCost) {
        return { success: false, message: `Need ${totalCost.toLocaleString()} KUSH` };
      }

      // Process transaction
      await storage.updatePlayer(buyerId, { totalKush: buyer.totalKush - totalCost });
      const seller = await storage.getPlayer(listing.sellerId);
      if (seller) {
        await storage.updatePlayer(listing.sellerId, { totalKush: seller.totalKush + totalCost });
      }

      // Transfer strain ownership
      await storage.transferStrainOwnership(listing.itemId, listing.sellerId, buyerId, listing.quantity);
      
      // Mark listing as sold
      await storage.updateMarketplaceListing(listingId, { status: 'sold', buyerId, soldAt: new Date() });

      return { success: true, message: `Purchased ${listing.quantity}x strain for ${totalCost} KUSH!` };
    } catch (error) {
      console.error('Marketplace purchase error:', error);
      return { success: false, message: "Purchase failed" };
    }
  }

  async getActiveListings(): Promise<any[]> {
    return await storage.getActiveMarketplaceListings();
  }
}

// ===== SERVICE INSTANCES =====
export const prestigeService = new PrestigeService();
export const dailyChallengesService = new DailyChallengesService();
export const friendsService = new FriendsService();
export const pvpBattleArenaService = new PvPBattleArenaService();
export const clickMechanicsService = new ClickMechanicsService();
export const guildService = new GuildService();
export const growGardenService = new GrowGardenService();
export const vipService = new VIPSubscriptionService();
export const analyticsService = new AnalyticsService();
export const seasonalEventsService = new SeasonalEventsService();
export const marketplaceService = new MarketplaceService();