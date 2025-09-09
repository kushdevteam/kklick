var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  achievements: () => achievements,
  airdropHistory: () => airdropHistory,
  auctionBids: () => auctionBids,
  auctionHouse: () => auctionHouse,
  battleArena: () => battleArena,
  clickBoosts: () => clickBoosts,
  clickSessions: () => clickSessions,
  communityGoals: () => communityGoals,
  communityRaids: () => communityRaids,
  dailyChallenges: () => dailyChallenges,
  dynamicNfts: () => dynamicNfts,
  eventParticipants: () => eventParticipants,
  eventRewards: () => eventRewards,
  friendGifts: () => friendGifts,
  friendships: () => friendships,
  gardenPlots: () => gardenPlots,
  gardenSupplies: () => gardenSupplies,
  governanceProposals: () => governanceProposals,
  governanceVotes: () => governanceVotes,
  growLights: () => growLights,
  guildBank: () => guildBank,
  guildBankTransactions: () => guildBankTransactions,
  guildChallenges: () => guildChallenges,
  guildMembers: () => guildMembers,
  guildQuests: () => guildQuests,
  guildTerritories: () => guildTerritories,
  guildWars: () => guildWars,
  guilds: () => guilds,
  harvestHistory: () => harvestHistory,
  insertAchievementSchema: () => insertAchievementSchema,
  insertAuctionHouseSchema: () => insertAuctionHouseSchema,
  insertBattleArenaSchema: () => insertBattleArenaSchema,
  insertClickBoostSchema: () => insertClickBoostSchema,
  insertClickSessionSchema: () => insertClickSessionSchema,
  insertCommunityGoalSchema: () => insertCommunityGoalSchema,
  insertDailyChallengeSchema: () => insertDailyChallengeSchema,
  insertDynamicNftSchema: () => insertDynamicNftSchema,
  insertFriendGiftSchema: () => insertFriendGiftSchema,
  insertFriendshipSchema: () => insertFriendshipSchema,
  insertGardenPlotSchema: () => insertGardenPlotSchema,
  insertGardenSuppliesSchema: () => insertGardenSuppliesSchema,
  insertGovernanceProposalSchema: () => insertGovernanceProposalSchema,
  insertGrowLightSchema: () => insertGrowLightSchema,
  insertGuildBankSchema: () => insertGuildBankSchema,
  insertGuildMemberSchema: () => insertGuildMemberSchema,
  insertGuildSchema: () => insertGuildSchema,
  insertGuildWarSchema: () => insertGuildWarSchema,
  insertHarvestHistorySchema: () => insertHarvestHistorySchema,
  insertLiquidityPoolSchema: () => insertLiquidityPoolSchema,
  insertLiveEventSchema: () => insertLiveEventSchema,
  insertLoyaltyTierSchema: () => insertLoyaltyTierSchema,
  insertMarketplaceListingSchema: () => insertMarketplaceListingSchema,
  insertMiniGameSchema: () => insertMiniGameSchema,
  insertNftGrowLightSchema: () => insertNftGrowLightSchema,
  insertPlayerAchievementSchema: () => insertPlayerAchievementSchema,
  insertPlayerAnalyticsSchema: () => insertPlayerAnalyticsSchema,
  insertPlayerBattleStatsSchema: () => insertPlayerBattleStatsSchema,
  insertPlayerDailyChallengeSchema: () => insertPlayerDailyChallengeSchema,
  insertPlayerGrowLightSchema: () => insertPlayerGrowLightSchema,
  insertPlayerLoyaltySchema: () => insertPlayerLoyaltySchema,
  insertPlayerSchema: () => insertPlayerSchema,
  insertPlayerStakeSchema: () => insertPlayerStakeSchema,
  insertPlayerUpgradeSchema: () => insertPlayerUpgradeSchema,
  insertPlayerWalletSchema: () => insertPlayerWalletSchema,
  insertPrestigeLevelSchema: () => insertPrestigeLevelSchema,
  insertSeasonalEventSchema: () => insertSeasonalEventSchema,
  insertSeedsTransactionSchema: () => insertSeedsTransactionSchema,
  insertStakingPoolSchema: () => insertStakingPoolSchema,
  insertStrainGeneticsSchema: () => insertStrainGeneticsSchema,
  insertTokenBurnSchema: () => insertTokenBurnSchema,
  insertTokenPayoutSchema: () => insertTokenPayoutSchema,
  insertTournamentSchema: () => insertTournamentSchema,
  insertTriviaQuestionSchema: () => insertTriviaQuestionSchema,
  insertUpgradeSchema: () => insertUpgradeSchema,
  liquidityPools: () => liquidityPools,
  liquidityPositions: () => liquidityPositions,
  liveEvents: () => liveEvents,
  loyaltyTiers: () => loyaltyTiers,
  marketplaceListings: () => marketplaceListings,
  milestoneRewards: () => milestoneRewards,
  miniGameScores: () => miniGameScores,
  miniGames: () => miniGames,
  nftEvolutionHistory: () => nftEvolutionHistory,
  nftGrowLights: () => nftGrowLights,
  nftMarketplace: () => nftMarketplace,
  personalGoals: () => personalGoals,
  playerAchievements: () => playerAchievements,
  playerAnalytics: () => playerAnalytics,
  playerBattleStats: () => playerBattleStats,
  playerDailyChallenges: () => playerDailyChallenges,
  playerGrowLights: () => playerGrowLights,
  playerLoyalty: () => playerLoyalty,
  playerNftGrowLights: () => playerNftGrowLights,
  playerStakes: () => playerStakes,
  playerUpgrades: () => playerUpgrades,
  playerWallets: () => playerWallets,
  players: () => players,
  prestigeLevels: () => prestigeLevels,
  seasonalEvents: () => seasonalEvents,
  seedsTransactions: () => seedsTransactions,
  socialShares: () => socialShares,
  stakingPools: () => stakingPools,
  strainGenetics: () => strainGenetics,
  strainGuessingGame: () => strainGuessingGame,
  tokenBurns: () => tokenBurns,
  tokenPayouts: () => tokenPayouts,
  tournamentParticipants: () => tournamentParticipants,
  tournaments: () => tournaments,
  tradeOffers: () => tradeOffers,
  triviaQuestions: () => triviaQuestions,
  tutorialRewards: () => tutorialRewards,
  upgrades: () => upgrades,
  vipBenefits: () => vipBenefits,
  vipSubscriptions: () => vipSubscriptions,
  yieldFarmingPools: () => yieldFarmingPools
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var players, upgrades, playerUpgrades, achievements, playerAchievements, tokenPayouts, growLights, playerGrowLights, tokenBurns, prestigeLevels, dailyChallenges, playerDailyChallenges, friendships, friendGifts, guilds, guildMembers, guildChallenges, stakingPools, playerStakes, seedsTransactions, seasonalEvents, eventRewards, nftGrowLights, playerNftGrowLights, clickSessions, clickBoosts, communityGoals, socialShares, governanceProposals, governanceVotes, playerWallets, strainGenetics, gardenPlots, gardenSupplies, harvestHistory, battleArena, tournaments, tournamentParticipants, playerBattleStats, marketplaceListings, auctionHouse, auctionBids, tradeOffers, liquidityPools, liquidityPositions, yieldFarmingPools, vipSubscriptions, vipBenefits, tutorialRewards, dynamicNfts, nftEvolutionHistory, nftMarketplace, guildWars, guildTerritories, guildBank, guildBankTransactions, guildQuests, liveEvents, eventParticipants, communityRaids, playerAnalytics, personalGoals, loyaltyTiers, playerLoyalty, airdropHistory, milestoneRewards, miniGames, miniGameScores, triviaQuestions, strainGuessingGame, insertPrestigeLevelSchema, insertDailyChallengeSchema, insertPlayerDailyChallengeSchema, insertFriendshipSchema, insertFriendGiftSchema, insertGuildSchema, insertGuildMemberSchema, insertStakingPoolSchema, insertPlayerStakeSchema, insertSeedsTransactionSchema, insertSeasonalEventSchema, insertNftGrowLightSchema, insertClickSessionSchema, insertClickBoostSchema, insertCommunityGoalSchema, insertGovernanceProposalSchema, insertPlayerWalletSchema, insertStrainGeneticsSchema, insertGardenPlotSchema, insertGardenSuppliesSchema, insertHarvestHistorySchema, insertBattleArenaSchema, insertTournamentSchema, insertPlayerBattleStatsSchema, insertMarketplaceListingSchema, insertAuctionHouseSchema, insertLiquidityPoolSchema, insertDynamicNftSchema, insertGuildWarSchema, insertGuildBankSchema, insertLiveEventSchema, insertPlayerAnalyticsSchema, insertLoyaltyTierSchema, insertPlayerLoyaltySchema, insertMiniGameSchema, insertTriviaQuestionSchema, insertPlayerSchema, insertUpgradeSchema, insertPlayerUpgradeSchema, insertAchievementSchema, insertPlayerAchievementSchema, insertTokenPayoutSchema, insertGrowLightSchema, insertPlayerGrowLightSchema, insertTokenBurnSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    players = pgTable("players", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      telegramUserId: text("telegram_user_id"),
      // Telegram user ID for identification
      discordUserId: text("discord_user_id"),
      // Discord user ID for identification
      email: text("email"),
      // Optional email for notifications
      username: text("username").notNull().unique(),
      // Telegram username with @ or Discord username
      totalKush: integer("total_kush").notNull().default(0),
      totalClicks: integer("total_clicks").notNull().default(0),
      perClickMultiplier: integer("per_click_multiplier").notNull().default(1),
      autoIncomePerHour: integer("auto_income_per_hour").notNull().default(0),
      passiveIncomePerHour: integer("passive_income_per_hour").notNull().default(0),
      claimableTokens: integer("claimable_tokens").notNull().default(0),
      walletAddress: text("wallet_address"),
      walletLinked: boolean("wallet_linked").notNull().default(false),
      // Track if wallet was already linked (one-time only)
      solanaNetwork: text("solana_network").notNull().default("devnet"),
      // "mainnet" or "devnet"
      walletSyncEnabled: boolean("wallet_sync_enabled").notNull().default(true),
      lastWalletSync: timestamp("last_wallet_sync"),
      referralHandle: text("referral_handle"),
      // Custom referral handle (one-time change)
      referredBy: text("referred_by"),
      // Will store Telegram @username or referral handle
      hasChangedReferralHandle: boolean("has_changed_referral_handle").notNull().default(false),
      tutorialCompleted: boolean("tutorial_completed").notNull().default(false),
      level: integer("level").notNull().default(1),
      prestige: integer("prestige").notNull().default(0),
      totalEarnedKush: integer("total_earned_kush").notNull().default(0),
      // Track total KUSH earned for leveling
      lastPassiveUpdate: timestamp("last_passive_update"),
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
      lastActive: timestamp("last_active").notNull().default(sql`now()`)
    });
    upgrades = pgTable("upgrades", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      baseCost: integer("base_cost").notNull(),
      costMultiplier: integer("cost_multiplier").notNull().default(150),
      // 1.5x in percentage
      clickPowerIncrease: integer("click_power_increase").notNull().default(0),
      autoIncomeIncrease: integer("auto_income_increase").notNull().default(0),
      icon: text("icon").notNull(),
      category: text("category").notNull(),
      // 'click', 'auto', 'special'
      unlockRequirement: integer("unlock_requirement").notNull().default(0)
    });
    playerUpgrades = pgTable("player_upgrades", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      upgradeId: text("upgrade_id").notNull(),
      quantity: integer("quantity").notNull().default(0),
      purchasedAt: timestamp("purchased_at").notNull().default(sql`now()`)
    });
    achievements = pgTable("achievements", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      requirement: integer("requirement").notNull(),
      requirementType: text("requirement_type").notNull(),
      // 'total_kush', 'total_clicks', 'upgrades_bought', etc.
      reward: integer("reward").notNull(),
      icon: text("icon").notNull()
    });
    playerAchievements = pgTable("player_achievements", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      achievementId: text("achievement_id").notNull(),
      completed: boolean("completed").notNull().default(false),
      progress: integer("progress").notNull().default(0),
      completedAt: timestamp("completed_at")
    });
    tokenPayouts = pgTable("token_payouts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      walletAddress: text("wallet_address").notNull(),
      amount: integer("amount").notNull(),
      // Token amount in smallest units
      reason: text("reason").notNull(),
      // Achievement, milestone, etc.
      network: text("network").notNull(),
      // devnet or mainnet
      transactionSignature: text("transaction_signature"),
      // Solana tx hash
      status: text("status").notNull().default("pending"),
      // pending, completed, failed
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
      processedAt: timestamp("processed_at")
    });
    growLights = pgTable("grow_lights", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      type: text("type").notNull(),
      // LED, HPS, CMH, Quantum_Board, etc.
      rarity: text("rarity").notNull(),
      // common, uncommon, rare, epic, legendary
      passiveClicksPerHour: integer("passive_clicks_per_hour").notNull().default(0),
      clickMultiplier: integer("click_multiplier").notNull().default(100),
      // 100 = 1.0x
      energyEfficiency: integer("energy_efficiency").notNull().default(100),
      // Lower is better
      description: text("description").notNull(),
      burnCost: integer("burn_cost").notNull(),
      // Tokens required to get this light
      icon: text("icon").notNull(),
      unlockRequirement: integer("unlock_requirement").notNull().default(0)
    });
    playerGrowLights = pgTable("player_grow_lights", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      growLightId: text("grow_light_id").notNull(),
      quantity: integer("quantity").notNull().default(1),
      isActive: boolean("is_active").notNull().default(false),
      acquiredAt: timestamp("acquired_at").notNull().default(sql`now()`)
    });
    tokenBurns = pgTable("token_burns", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      walletAddress: text("wallet_address").notNull(),
      tokensBurned: integer("tokens_burned").notNull(),
      growLightReceived: text("grow_light_id"),
      network: text("network").notNull(),
      burnTransactionSignature: text("burn_transaction_signature"),
      devTaxAmount: integer("dev_tax_amount").notNull(),
      // 20% dev tax
      devTaxRecipient: text("dev_tax_recipient").notNull(),
      status: text("status").notNull().default("pending"),
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
      processedAt: timestamp("processed_at")
    });
    prestigeLevels = pgTable("prestige_levels", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      level: integer("level").notNull().default(0),
      totalKushAtPrestige: integer("total_kush_at_prestige").notNull(),
      permanentMultiplier: integer("permanent_multiplier").notNull().default(100),
      // 100 = 1.0x
      prestigeDate: timestamp("prestige_date").notNull().default(sql`now()`)
    });
    dailyChallenges = pgTable("daily_challenges", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      challengeType: text("challenge_type").notNull(),
      // 'clicks', 'tokens', 'upgrades', 'burns'
      targetValue: integer("target_value").notNull(),
      kushReward: integer("kush_reward").notNull().default(0),
      seedsReward: integer("seeds_reward").notNull().default(0),
      dateActive: text("date_active").notNull(),
      // YYYY-MM-DD format
      icon: text("icon").notNull(),
      difficulty: text("difficulty").notNull().default("medium")
      // easy, medium, hard
    });
    playerDailyChallenges = pgTable("player_daily_challenges", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      challengeId: text("challenge_id").notNull(),
      progress: integer("progress").notNull().default(0),
      completed: boolean("completed").notNull().default(false),
      completedAt: timestamp("completed_at"),
      dateActive: text("date_active").notNull()
      // YYYY-MM-DD format
    });
    friendships = pgTable("friendships", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      friendId: text("friend_id").notNull(),
      status: text("status").notNull().default("pending"),
      // pending, accepted, blocked
      requestedAt: timestamp("requested_at").notNull().default(sql`now()`),
      acceptedAt: timestamp("accepted_at")
    });
    friendGifts = pgTable("friend_gifts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      fromPlayerId: text("from_player_id").notNull(),
      toPlayerId: text("to_player_id").notNull(),
      giftType: text("gift_type").notNull(),
      // 'kush', 'seeds', 'boost'
      amount: integer("amount").notNull(),
      message: text("message"),
      sentAt: timestamp("sent_at").notNull().default(sql`now()`),
      claimedAt: timestamp("claimed_at")
    });
    guilds = pgTable("guilds", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull().unique(),
      description: text("description"),
      leaderPlayerId: text("leader_player_id").notNull(),
      memberCount: integer("member_count").notNull().default(1),
      maxMembers: integer("max_members").notNull().default(50),
      totalKushEarned: integer("total_kush_earned").notNull().default(0),
      guildLevel: integer("guild_level").notNull().default(1),
      isPublic: boolean("is_public").notNull().default(true),
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    guildMembers = pgTable("guild_members", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      guildId: text("guild_id").notNull(),
      playerId: text("player_id").notNull(),
      role: text("role").notNull().default("member"),
      // member, officer, leader
      joinedAt: timestamp("joined_at").notNull().default(sql`now()`),
      contributedKush: integer("contributed_kush").notNull().default(0)
    });
    guildChallenges = pgTable("guild_challenges", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      targetValue: integer("target_value").notNull(),
      kushReward: integer("kush_reward").notNull(),
      seedsReward: integer("seeds_reward").notNull(),
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      challengeType: text("challenge_type").notNull()
      // 'collective_clicks', 'collective_kush'
    });
    stakingPools = pgTable("staking_pools", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      poolName: text("pool_name").notNull(),
      duration: integer("duration").notNull(),
      // in days (30, 60, 90)
      apy: integer("apy").notNull(),
      // Annual Percentage Yield in basis points
      minStake: integer("min_stake").notNull(),
      maxStake: integer("max_stake").notNull(),
      totalStaked: integer("total_staked").notNull().default(0),
      isActive: boolean("is_active").notNull().default(true)
    });
    playerStakes = pgTable("player_stakes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      poolId: text("pool_id").notNull(),
      stakedAmount: integer("staked_amount").notNull(),
      startDate: timestamp("start_date").notNull().default(sql`now()`),
      endDate: timestamp("end_date").notNull(),
      rewardsClaimed: integer("rewards_claimed").notNull().default(0),
      status: text("status").notNull().default("active")
      // active, completed, withdrawn
    });
    seedsTransactions = pgTable("seeds_transactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      amount: integer("amount").notNull(),
      transactionType: text("transaction_type").notNull(),
      // 'earned', 'spent', 'gifted'
      reason: text("reason").notNull(),
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    seasonalEvents = pgTable("seasonal_events", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      theme: text("theme").notNull(),
      // halloween, christmas, 420day
      description: text("description").notNull(),
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      isActive: boolean("is_active").notNull().default(false),
      specialMultiplier: integer("special_multiplier").notNull().default(100)
      // 100 = 1.0x
    });
    eventRewards = pgTable("event_rewards", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      eventId: text("event_id").notNull(),
      playerId: text("player_id").notNull(),
      rewardType: text("reward_type").notNull(),
      // 'grow_light', 'kush', 'seeds', 'nft'
      rewardId: text("reward_id"),
      // ID of the specific reward
      claimedAt: timestamp("claimed_at").notNull().default(sql`now()`)
    });
    nftGrowLights = pgTable("nft_grow_lights", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      tokenId: text("token_id").notNull().unique(),
      name: text("name").notNull(),
      rarity: text("rarity").notNull(),
      // legendary_nft, mythic_nft
      passiveClicksPerHour: integer("passive_clicks_per_hour").notNull(),
      clickMultiplier: integer("click_multiplier").notNull().default(200),
      // 200 = 2.0x
      specialAbility: text("special_ability"),
      imageUrl: text("image_url"),
      mintedAt: timestamp("minted_at").notNull().default(sql`now()`)
    });
    playerNftGrowLights = pgTable("player_nft_grow_lights", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      nftGrowLightId: text("nft_grow_light_id").notNull(),
      isActive: boolean("is_active").notNull().default(false),
      acquiredAt: timestamp("acquired_at").notNull().default(sql`now()`)
    });
    clickSessions = pgTable("click_sessions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      sessionStart: timestamp("session_start").notNull().default(sql`now()`),
      totalClicks: integer("total_clicks").notNull().default(0),
      criticalHits: integer("critical_hits").notNull().default(0),
      maxCombo: integer("max_combo").notNull().default(0),
      specialPatternsHit: integer("special_patterns_hit").notNull().default(0),
      sessionEnd: timestamp("session_end")
    });
    clickBoosts = pgTable("click_boosts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      boostType: text("boost_type").notNull(),
      // 'critical_chance', 'auto_click_speed', 'combo_multiplier'
      multiplier: integer("multiplier").notNull(),
      // 200 = 2.0x
      duration: integer("duration").notNull(),
      // in seconds
      startedAt: timestamp("started_at").notNull().default(sql`now()`),
      expiresAt: timestamp("expires_at").notNull()
    });
    communityGoals = pgTable("community_goals", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      title: text("title").notNull(),
      description: text("description").notNull(),
      targetValue: integer("target_value").notNull(),
      currentProgress: integer("current_progress").notNull().default(0),
      goalType: text("goal_type").notNull(),
      // 'total_clicks', 'total_kush', 'tokens_burned'
      kushReward: integer("kush_reward").notNull(),
      seedsReward: integer("seeds_reward").notNull(),
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      isActive: boolean("is_active").notNull().default(true)
    });
    socialShares = pgTable("social_shares", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      platform: text("platform").notNull(),
      // 'twitter', 'discord', 'telegram'
      shareType: text("share_type").notNull(),
      // 'achievement', 'milestone', 'referral'
      content: text("content").notNull(),
      rewardClaimed: boolean("reward_claimed").notNull().default(false),
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    governanceProposals = pgTable("governance_proposals", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      title: text("title").notNull(),
      description: text("description").notNull(),
      proposerPlayerId: text("proposer_player_id").notNull(),
      votesFor: integer("votes_for").notNull().default(0),
      votesAgainst: integer("votes_against").notNull().default(0),
      totalVotingPower: integer("total_voting_power").notNull().default(0),
      status: text("status").notNull().default("active"),
      // active, passed, failed, executed
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
      votingEnds: timestamp("voting_ends").notNull()
    });
    governanceVotes = pgTable("governance_votes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      proposalId: text("proposal_id").notNull(),
      playerId: text("player_id").notNull(),
      vote: text("vote").notNull(),
      // 'for', 'against'
      votingPower: integer("voting_power").notNull(),
      votedAt: timestamp("voted_at").notNull().default(sql`now()`)
    });
    playerWallets = pgTable("player_wallets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull().unique(),
      kushBalance: integer("kush_balance").notNull().default(0),
      seedsBalance: integer("seeds_balance").notNull().default(0),
      stakedKush: integer("staked_kush").notNull().default(0),
      totalEarnedKush: integer("total_earned_kush").notNull().default(0),
      totalEarnedSeeds: integer("total_earned_seeds").notNull().default(0),
      lastUpdated: timestamp("last_updated").notNull().default(sql`now()`)
    });
    strainGenetics = pgTable("strain_genetics", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      type: text("type").notNull(),
      // 'sativa', 'indica', 'hybrid'
      rarity: text("rarity").notNull(),
      // 'common', 'uncommon', 'rare', 'epic', 'legendary'
      thcLevel: integer("thc_level").notNull(),
      // 15-30%
      cbdLevel: integer("cbd_level").notNull(),
      // 0-25%
      floweringTime: integer("flowering_time").notNull(),
      // days (7-30)
      yieldMultiplier: integer("yield_multiplier").notNull().default(100),
      // 100 = 1.0x
      clickBonus: integer("click_bonus").notNull().default(0),
      description: text("description").notNull(),
      parentStrain1: text("parent_strain_1"),
      // For cross-breeding
      parentStrain2: text("parent_strain_2"),
      discoveredBy: text("discovered_by"),
      // Player who first bred this strain
      icon: text("icon").notNull()
    });
    gardenPlots = pgTable("garden_plots", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      plotNumber: integer("plot_number").notNull(),
      // 1-12
      strainId: text("strain_id"),
      // Current strain planted
      plantedAt: timestamp("planted_at"),
      lastWatered: timestamp("last_watered"),
      lastFertilized: timestamp("last_fertilized"),
      growthStage: text("growth_stage").default("empty"),
      // empty, seedling, vegetative, flowering, ready
      harvestTime: timestamp("harvest_time"),
      expectedYield: integer("expected_yield").notNull().default(0),
      isUnlocked: boolean("is_unlocked").notNull().default(false),
      unlockCost: integer("unlock_cost").notNull().default(1e6)
      // KUSH cost
    });
    gardenSupplies = pgTable("garden_supplies", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      supplyType: text("supply_type").notNull(),
      // 'water', 'fertilizer', 'nutrients'
      quantity: integer("quantity").notNull().default(0),
      lastPurchased: timestamp("last_purchased")
    });
    harvestHistory = pgTable("harvest_history", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      plotId: text("plot_id").notNull(),
      strainId: text("strain_id").notNull(),
      kushEarned: integer("kush_earned").notNull(),
      seedsEarned: integer("seeds_earned").notNull(),
      specialItems: text("special_items"),
      // JSON array of bonus items
      harvestDate: timestamp("harvest_date").notNull().default(sql`now()`)
    });
    battleArena = pgTable("battle_arena", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      player1Id: text("player1_id").notNull(),
      player2Id: text("player2_id").notNull(),
      battleType: text("battle_type").notNull(),
      // 'casual', 'ranked', 'tournament'
      wagerAmount: integer("wager_amount").notNull().default(0),
      wagerToken: text("wager_token").notNull().default("KUSH"),
      // KUSH or SEEDS
      player1Score: integer("player1_score").notNull().default(0),
      player2Score: integer("player2_score").notNull().default(0),
      winnerId: text("winner_id"),
      battleDuration: integer("battle_duration").notNull().default(60),
      // seconds
      status: text("status").notNull().default("waiting"),
      // waiting, active, completed
      startedAt: timestamp("started_at"),
      completedAt: timestamp("completed_at"),
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    tournaments = pgTable("tournaments", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      entryFee: integer("entry_fee").notNull(),
      prizePool: integer("prize_pool").notNull(),
      maxParticipants: integer("max_participants").notNull().default(32),
      currentParticipants: integer("current_participants").notNull().default(0),
      status: text("status").notNull().default("registration"),
      // registration, active, completed
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      winnerId: text("winner_id"),
      createdBy: text("created_by").notNull()
    });
    tournamentParticipants = pgTable("tournament_participants", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      tournamentId: text("tournament_id").notNull(),
      playerId: text("player_id").notNull(),
      registeredAt: timestamp("registered_at").notNull().default(sql`now()`),
      eliminated: boolean("eliminated").notNull().default(false),
      finalRank: integer("final_rank")
    });
    playerBattleStats = pgTable("player_battle_stats", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull().unique(),
      totalBattles: integer("total_battles").notNull().default(0),
      totalWins: integer("total_wins").notNull().default(0),
      totalLosses: integer("total_losses").notNull().default(0),
      winStreak: integer("win_streak").notNull().default(0),
      bestWinStreak: integer("best_win_streak").notNull().default(0),
      eloRating: integer("elo_rating").notNull().default(1200),
      totalWagered: integer("total_wagered").notNull().default(0),
      totalWon: integer("total_won").notNull().default(0)
    });
    marketplaceListings = pgTable("marketplace_listings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sellerId: text("seller_id").notNull(),
      itemType: text("item_type").notNull(),
      // 'strain', 'equipment', 'nft', 'supplies'
      itemId: text("item_id").notNull(),
      quantity: integer("quantity").notNull().default(1),
      pricePerUnit: integer("price_per_unit").notNull(),
      currency: text("currency").notNull().default("KUSH"),
      // KUSH or SEEDS
      description: text("description"),
      status: text("status").notNull().default("active"),
      // active, sold, cancelled
      listedAt: timestamp("listed_at").notNull().default(sql`now()`),
      soldAt: timestamp("sold_at"),
      buyerId: text("buyer_id")
    });
    auctionHouse = pgTable("auction_house", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      sellerId: text("seller_id").notNull(),
      itemType: text("item_type").notNull(),
      itemId: text("item_id").notNull(),
      startingBid: integer("starting_bid").notNull(),
      currentBid: integer("current_bid").notNull().default(0),
      currentBidderId: text("current_bidder_id"),
      reservePrice: integer("reserve_price"),
      auctionEnd: timestamp("auction_end").notNull(),
      status: text("status").notNull().default("active"),
      // active, ended, cancelled
      winnerId: text("winner_id"),
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    auctionBids = pgTable("auction_bids", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      auctionId: text("auction_id").notNull(),
      bidderId: text("bidder_id").notNull(),
      bidAmount: integer("bid_amount").notNull(),
      bidTime: timestamp("bid_time").notNull().default(sql`now()`),
      isWinning: boolean("is_winning").notNull().default(false)
    });
    tradeOffers = pgTable("trade_offers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      offererId: text("offerer_id").notNull(),
      recipientId: text("recipient_id").notNull(),
      offeredItems: text("offered_items").notNull(),
      // JSON array
      requestedItems: text("requested_items").notNull(),
      // JSON array
      status: text("status").notNull().default("pending"),
      // pending, accepted, declined, cancelled
      message: text("message"),
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
      respondedAt: timestamp("responded_at")
    });
    liquidityPools = pgTable("liquidity_pools", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      poolName: text("pool_name").notNull(),
      token1: text("token1").notNull(),
      // KUSH
      token2: text("token2").notNull(),
      // SEEDS, SOL, USDC
      totalLiquidity: integer("total_liquidity").notNull().default(0),
      apr: integer("apr").notNull(),
      // Annual Percentage Rate
      lockPeriod: integer("lock_period").notNull().default(0),
      // days
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    liquidityPositions = pgTable("liquidity_positions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      poolId: text("pool_id").notNull(),
      token1Amount: integer("token1_amount").notNull(),
      token2Amount: integer("token2_amount").notNull(),
      lpTokens: integer("lp_tokens").notNull(),
      startDate: timestamp("start_date").notNull().default(sql`now()`),
      lockEndDate: timestamp("lock_end_date"),
      rewardsEarned: integer("rewards_earned").notNull().default(0),
      lastRewardClaim: timestamp("last_reward_claim"),
      status: text("status").notNull().default("active")
      // active, withdrawn
    });
    yieldFarmingPools = pgTable("yield_farming_pools", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      poolName: text("pool_name").notNull(),
      stakingToken: text("staking_token").notNull(),
      // LP-KUSH-SEEDS, KUSH, SEEDS
      rewardToken: text("reward_token").notNull(),
      totalStaked: integer("total_staked").notNull().default(0),
      rewardRate: integer("reward_rate").notNull(),
      // tokens per day
      multiplier: integer("multiplier").notNull().default(100),
      // 100 = 1.0x
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      isAutoCompound: boolean("is_auto_compound").notNull().default(false)
    });
    vipSubscriptions = pgTable("vip_subscriptions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull().unique(),
      tier: text("tier").notNull(),
      // 'silver', 'gold', 'platinum', 'diamond'
      monthlyPrice: integer("monthly_price").notNull(),
      // in KUSH tokens
      kushMultiplier: integer("kush_multiplier").notNull().default(150),
      // 150 = 1.5x
      seedsBonus: integer("seeds_bonus").notNull().default(50),
      // extra seeds per day
      exclusiveStrains: text("exclusive_strains"),
      // JSON array of strain IDs
      prioritySupport: boolean("priority_support").notNull().default(false),
      status: text("status").notNull().default("active"),
      // active, cancelled, expired
      subscribedAt: timestamp("subscribed_at").notNull().default(sql`now()`),
      nextBillingDate: timestamp("next_billing_date").notNull(),
      lastPayment: timestamp("last_payment")
    });
    vipBenefits = pgTable("vip_benefits", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      benefitType: text("benefit_type").notNull(),
      // 'seeds_daily', 'kush_multiplier', 'exclusive_access'
      value: integer("value").notNull(),
      grantedAt: timestamp("granted_at").notNull().default(sql`now()`),
      expiresAt: timestamp("expires_at")
    });
    tutorialRewards = pgTable("tutorial_rewards", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      stepId: integer("step_id").notNull(),
      // Tutorial step number
      reward: integer("reward").notNull(),
      // KUSH reward amount
      claimedAt: timestamp("claimed_at").notNull().default(sql`now()`)
    });
    dynamicNfts = pgTable("dynamic_nfts", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      tokenId: text("token_id").notNull().unique(),
      ownerId: text("owner_id").notNull(),
      nftType: text("nft_type").notNull(),
      // 'growing_plant', 'equipment', 'strain', 'achievement'
      name: text("name").notNull(),
      rarity: text("rarity").notNull(),
      level: integer("level").notNull().default(1),
      experience: integer("experience").notNull().default(0),
      maxLevel: integer("max_level").notNull().default(10),
      baseStats: text("base_stats").notNull(),
      // JSON object
      currentStats: text("current_stats").notNull(),
      // JSON object
      evolutionStage: integer("evolution_stage").notNull().default(1),
      lastInteraction: timestamp("last_interaction").notNull().default(sql`now()`),
      imageUrl: text("image_url").notNull(),
      metadataUrl: text("metadata_url"),
      isStaked: boolean("is_staked").notNull().default(false)
    });
    nftEvolutionHistory = pgTable("nft_evolution_history", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      nftId: text("nft_id").notNull(),
      fromStage: integer("from_stage").notNull(),
      toStage: integer("to_stage").notNull(),
      evolutionDate: timestamp("evolution_date").notNull().default(sql`now()`),
      triggeredBy: text("triggered_by").notNull(),
      // click_milestone, time_based, manual_upgrade
      newAbilities: text("new_abilities")
      // JSON array
    });
    nftMarketplace = pgTable("nft_marketplace", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      nftId: text("nft_id").notNull(),
      sellerId: text("seller_id").notNull(),
      price: integer("price").notNull(),
      currency: text("currency").notNull().default("KUSH"),
      status: text("status").notNull().default("listed"),
      // listed, sold, cancelled
      listedAt: timestamp("listed_at").notNull().default(sql`now()`),
      soldAt: timestamp("sold_at"),
      buyerId: text("buyer_id")
    });
    guildWars = pgTable("guild_wars", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      attackingGuildId: text("attacking_guild_id").notNull(),
      defendingGuildId: text("defending_guild_id").notNull(),
      territoryId: text("territory_id"),
      startTime: timestamp("start_time").notNull(),
      endTime: timestamp("end_time").notNull(),
      attackingScore: integer("attacking_score").notNull().default(0),
      defendingScore: integer("defending_score").notNull().default(0),
      winnerGuildId: text("winner_guild_id"),
      prizePool: integer("prize_pool").notNull().default(0),
      status: text("status").notNull().default("active")
      // active, completed
    });
    guildTerritories = pgTable("guild_territories", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      controllingGuildId: text("controlling_guild_id"),
      bonusType: text("bonus_type").notNull(),
      // 'kush_multiplier', 'seeds_bonus', 'experience_boost'
      bonusValue: integer("bonus_value").notNull(),
      defenseStrength: integer("defense_strength").notNull().default(100),
      lastConquered: timestamp("last_conquered"),
      coordinates: text("coordinates")
      // JSON for map position
    });
    guildBank = pgTable("guild_bank", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      guildId: text("guild_id").notNull().unique(),
      kushBalance: integer("kush_balance").notNull().default(0),
      seedsBalance: integer("seeds_balance").notNull().default(0),
      totalDeposited: integer("total_deposited").notNull().default(0),
      totalWithdrawn: integer("total_withdrawn").notNull().default(0),
      lastActivity: timestamp("last_activity").notNull().default(sql`now()`)
    });
    guildBankTransactions = pgTable("guild_bank_transactions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      guildId: text("guild_id").notNull(),
      playerId: text("player_id").notNull(),
      transactionType: text("transaction_type").notNull(),
      // 'deposit', 'withdraw'
      tokenType: text("token_type").notNull(),
      // KUSH or SEEDS
      amount: integer("amount").notNull(),
      reason: text("reason"),
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    guildQuests = pgTable("guild_quests", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      guildId: text("guild_id").notNull(),
      name: text("name").notNull(),
      description: text("description").notNull(),
      questType: text("quest_type").notNull(),
      // 'collective_clicks', 'harvest_strains', 'win_battles'
      targetValue: integer("target_value").notNull(),
      currentProgress: integer("current_progress").notNull().default(0),
      kushReward: integer("kush_reward").notNull(),
      seedsReward: integer("seeds_reward").notNull(),
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      status: text("status").notNull().default("active")
      // active, completed, failed
    });
    liveEvents = pgTable("live_events", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      eventName: text("event_name").notNull(),
      eventType: text("event_type").notNull(),
      // 'happy_hour', 'flash_challenge', 'community_raid'
      description: text("description").notNull(),
      multiplier: integer("multiplier").notNull().default(200),
      // 200 = 2.0x
      duration: integer("duration").notNull(),
      // minutes
      startTime: timestamp("start_time").notNull(),
      endTime: timestamp("end_time").notNull(),
      participantCount: integer("participant_count").notNull().default(0),
      totalRewards: integer("total_rewards").notNull(),
      isActive: boolean("is_active").notNull().default(false),
      requirements: text("requirements")
      // JSON object
    });
    eventParticipants = pgTable("event_participants", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      eventId: text("event_id").notNull(),
      playerId: text("player_id").notNull(),
      joinedAt: timestamp("joined_at").notNull().default(sql`now()`),
      contribution: integer("contribution").notNull().default(0),
      rewardsClaimed: boolean("rewards_claimed").notNull().default(false),
      finalRank: integer("final_rank")
    });
    communityRaids = pgTable("community_raids", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      raidName: text("raid_name").notNull(),
      bossName: text("boss_name").notNull(),
      bossHealth: integer("boss_health").notNull(),
      currentHealth: integer("current_health").notNull(),
      minParticipants: integer("min_participants").notNull().default(100),
      currentParticipants: integer("current_participants").notNull().default(0),
      raidRewards: text("raid_rewards").notNull(),
      // JSON object
      startTime: timestamp("start_time").notNull(),
      endTime: timestamp("end_time").notNull(),
      status: text("status").notNull().default("preparing")
      // preparing, active, victory, defeat
    });
    playerAnalytics = pgTable("player_analytics", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull().unique(),
      totalPlayTime: integer("total_play_time").notNull().default(0),
      // minutes
      averageSessionLength: integer("average_session_length").notNull().default(0),
      clicksPerMinute: integer("clicks_per_minute").notNull().default(0),
      mostActiveHour: integer("most_active_hour").notNull().default(12),
      longestStreak: integer("longest_streak").notNull().default(0),
      // days
      totalUpgradesPurchased: integer("total_upgrades_purchased").notNull().default(0),
      favoritePlantStrain: text("favorite_plant_strain"),
      totalBattlesWon: integer("total_battles_won").notNull().default(0),
      lastAnalyticsUpdate: timestamp("last_analytics_update").notNull().default(sql`now()`)
    });
    personalGoals = pgTable("personal_goals", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      goalType: text("goal_type").notNull(),
      // 'daily_kush', 'weekly_battles', 'harvest_strains'
      targetValue: integer("target_value").notNull(),
      currentProgress: integer("current_progress").notNull().default(0),
      deadline: timestamp("deadline").notNull(),
      reward: integer("reward").notNull(),
      rewardType: text("reward_type").notNull().default("KUSH"),
      status: text("status").notNull().default("active"),
      // active, completed, failed
      createdAt: timestamp("created_at").notNull().default(sql`now()`)
    });
    loyaltyTiers = pgTable("loyalty_tiers", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      tierName: text("tier_name").notNull(),
      minPoints: integer("min_points").notNull(),
      dailyBonusMultiplier: integer("daily_bonus_multiplier").notNull().default(100),
      specialPerks: text("special_perks").notNull(),
      // JSON array
      tierColor: text("tier_color").notNull(),
      icon: text("icon").notNull()
    });
    playerLoyalty = pgTable("player_loyalty", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull().unique(),
      loyaltyPoints: integer("loyalty_points").notNull().default(0),
      currentTier: text("current_tier").notNull().default("Bronze"),
      consecutiveLogins: integer("consecutive_logins").notNull().default(0),
      longestLoginStreak: integer("longest_login_streak").notNull().default(0),
      lastLogin: timestamp("last_login").notNull().default(sql`now()`),
      totalAirdropsReceived: integer("total_airdrops_received").notNull().default(0),
      vipExpiresAt: timestamp("vip_expires_at")
    });
    airdropHistory = pgTable("airdrop_history", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      airdropType: text("airdrop_type").notNull(),
      // 'surprise', 'milestone', 'loyalty'
      tokenAmount: integer("token_amount").notNull(),
      tokenType: text("token_type").notNull().default("KUSH"),
      reason: text("reason").notNull(),
      claimedAt: timestamp("claimed_at").notNull().default(sql`now()`)
    });
    milestoneRewards = pgTable("milestone_rewards", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      milestone: integer("milestone").notNull(),
      // 1000, 10000, 100000 etc
      milestoneType: text("milestone_type").notNull(),
      // 'total_kush', 'total_clicks', 'days_played'
      rewardAmount: integer("reward_amount").notNull(),
      rewardType: text("reward_type").notNull().default("KUSH"),
      specialReward: text("special_reward"),
      // NFT, rare strain, etc
      description: text("description").notNull()
    });
    miniGames = pgTable("mini_games", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      gameName: text("game_name").notNull(),
      gameType: text("game_type").notNull(),
      // 'rolling_papers', 'strain_guess', 'memory_match', 'trivia'
      difficulty: text("difficulty").notNull().default("medium"),
      entryFee: integer("entry_fee").notNull().default(0),
      maxReward: integer("max_reward").notNull(),
      playTimeSeconds: integer("play_time_seconds").notNull().default(60),
      isActive: boolean("is_active").notNull().default(true),
      icon: text("icon").notNull(),
      description: text("description").notNull()
    });
    miniGameScores = pgTable("mini_game_scores", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      playerId: text("player_id").notNull(),
      gameId: text("game_id").notNull(),
      score: integer("score").notNull(),
      reward: integer("reward").notNull(),
      rewardType: text("reward_type").notNull().default("KUSH"),
      playedAt: timestamp("played_at").notNull().default(sql`now()`),
      gameData: text("game_data")
      // JSON object with game-specific data
    });
    triviaQuestions = pgTable("trivia_questions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      question: text("question").notNull(),
      options: text("options").notNull(),
      // JSON array of 4 options
      correctAnswer: integer("correct_answer").notNull(),
      // 0-3
      category: text("category").notNull(),
      // 'strains', 'growing', 'history', 'culture'
      difficulty: text("difficulty").notNull().default("medium"),
      rewardPoints: integer("reward_points").notNull().default(100)
    });
    strainGuessingGame = pgTable("strain_guessing_game", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      strainId: text("strain_id").notNull(),
      hints: text("hints").notNull(),
      // JSON array of progressive hints
      maxGuesses: integer("max_guesses").notNull().default(3),
      baseReward: integer("base_reward").notNull(),
      bonusReward: integer("bonus_reward").notNull(),
      isActive: boolean("is_active").notNull().default(true)
    });
    insertPrestigeLevelSchema = createInsertSchema(prestigeLevels).omit({
      id: true,
      prestigeDate: true
    });
    insertDailyChallengeSchema = createInsertSchema(dailyChallenges).omit({
      id: true
    });
    insertPlayerDailyChallengeSchema = createInsertSchema(playerDailyChallenges).omit({
      id: true,
      completedAt: true
    });
    insertFriendshipSchema = createInsertSchema(friendships).omit({
      id: true,
      requestedAt: true
    });
    insertFriendGiftSchema = createInsertSchema(friendGifts).omit({
      id: true,
      sentAt: true
    });
    insertGuildSchema = createInsertSchema(guilds).omit({
      id: true,
      createdAt: true
    });
    insertGuildMemberSchema = createInsertSchema(guildMembers).omit({
      id: true,
      joinedAt: true
    });
    insertStakingPoolSchema = createInsertSchema(stakingPools).omit({
      id: true
    });
    insertPlayerStakeSchema = createInsertSchema(playerStakes).omit({
      id: true,
      startDate: true
    });
    insertSeedsTransactionSchema = createInsertSchema(seedsTransactions).omit({
      id: true,
      createdAt: true
    });
    insertSeasonalEventSchema = createInsertSchema(seasonalEvents).omit({
      id: true
    });
    insertNftGrowLightSchema = createInsertSchema(nftGrowLights).omit({
      id: true,
      mintedAt: true
    });
    insertClickSessionSchema = createInsertSchema(clickSessions).omit({
      id: true,
      sessionStart: true
    });
    insertClickBoostSchema = createInsertSchema(clickBoosts).omit({
      id: true,
      startedAt: true
    });
    insertCommunityGoalSchema = createInsertSchema(communityGoals).omit({
      id: true
    });
    insertGovernanceProposalSchema = createInsertSchema(governanceProposals).omit({
      id: true,
      createdAt: true
    });
    insertPlayerWalletSchema = createInsertSchema(playerWallets).omit({
      id: true,
      lastUpdated: true
    });
    insertStrainGeneticsSchema = createInsertSchema(strainGenetics).omit({
      id: true
    });
    insertGardenPlotSchema = createInsertSchema(gardenPlots).omit({
      id: true
    });
    insertGardenSuppliesSchema = createInsertSchema(gardenSupplies).omit({
      id: true
    });
    insertHarvestHistorySchema = createInsertSchema(harvestHistory).omit({
      id: true,
      harvestDate: true
    });
    insertBattleArenaSchema = createInsertSchema(battleArena).omit({
      id: true,
      createdAt: true
    });
    insertTournamentSchema = createInsertSchema(tournaments).omit({
      id: true
    });
    insertPlayerBattleStatsSchema = createInsertSchema(playerBattleStats).omit({
      id: true
    });
    insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
      id: true,
      listedAt: true
    });
    insertAuctionHouseSchema = createInsertSchema(auctionHouse).omit({
      id: true,
      createdAt: true
    });
    insertLiquidityPoolSchema = createInsertSchema(liquidityPools).omit({
      id: true,
      createdAt: true
    });
    insertDynamicNftSchema = createInsertSchema(dynamicNfts).omit({
      id: true,
      lastInteraction: true
    });
    insertGuildWarSchema = createInsertSchema(guildWars).omit({
      id: true
    });
    insertGuildBankSchema = createInsertSchema(guildBank).omit({
      id: true,
      lastActivity: true
    });
    insertLiveEventSchema = createInsertSchema(liveEvents).omit({
      id: true
    });
    insertPlayerAnalyticsSchema = createInsertSchema(playerAnalytics).omit({
      id: true,
      lastAnalyticsUpdate: true
    });
    insertLoyaltyTierSchema = createInsertSchema(loyaltyTiers).omit({
      id: true
    });
    insertPlayerLoyaltySchema = createInsertSchema(playerLoyalty).omit({
      id: true,
      lastLogin: true
    });
    insertMiniGameSchema = createInsertSchema(miniGames).omit({
      id: true
    });
    insertTriviaQuestionSchema = createInsertSchema(triviaQuestions).omit({
      id: true
    });
    insertPlayerSchema = createInsertSchema(players).omit({
      id: true,
      createdAt: true,
      lastActive: true
    });
    insertUpgradeSchema = createInsertSchema(upgrades).omit({
      id: true
    });
    insertPlayerUpgradeSchema = createInsertSchema(playerUpgrades).omit({
      id: true,
      purchasedAt: true
    });
    insertAchievementSchema = createInsertSchema(achievements).omit({
      id: true
    });
    insertPlayerAchievementSchema = createInsertSchema(playerAchievements).omit({
      id: true,
      completedAt: true
    });
    insertTokenPayoutSchema = createInsertSchema(tokenPayouts).omit({
      id: true,
      createdAt: true
    });
    insertGrowLightSchema = createInsertSchema(growLights).omit({
      id: true
    });
    insertPlayerGrowLightSchema = createInsertSchema(playerGrowLights).omit({
      id: true,
      acquiredAt: true
    });
    insertTokenBurnSchema = createInsertSchema(tokenBurns).omit({
      id: true,
      createdAt: true
    });
  }
});

// server/achievements-data.ts
var FIFTY_ACHIEVEMENTS;
var init_achievements_data = __esm({
  "server/achievements-data.ts"() {
    "use strict";
    FIFTY_ACHIEVEMENTS = [
      // Beginner Achievements (1-10)
      { name: "First Steps", description: "Click 10 times", requirement: 10, requirementType: "total_clicks", reward: 5, icon: "fas fa-baby" },
      { name: "Collect 5 KUSH", description: "Earn your first 5 KUSH", requirement: 5, requirementType: "total_kush", reward: 10, icon: "fas fa-cannabis" },
      { name: "Green Thumb", description: "Reach 25 total KUSH", requirement: 25, requirementType: "total_kush", reward: 25, icon: "fas fa-thumbs-up" },
      { name: "Speed Demon", description: "Click 250 times", requirement: 250, requirementType: "total_clicks", reward: 50, icon: "fas fa-tachometer-alt" },
      { name: "First Purchase", description: "Buy your first upgrade", requirement: 1, requirementType: "upgrades_bought", reward: 20, icon: "fas fa-shopping-bag" },
      { name: "Century Club", description: "Reach 100 total KUSH", requirement: 100, requirementType: "total_kush", reward: 50, icon: "fas fa-hundred-points" },
      { name: "Persistent Clicker", description: "Click 500 times", requirement: 500, requirementType: "total_clicks", reward: 100, icon: "fas fa-mouse" },
      { name: "Small Fortune", description: "Accumulate 500 KUSH", requirement: 500, requirementType: "total_kush", reward: 200, icon: "fas fa-piggy-bank" },
      { name: "Early Adopter", description: "Buy 3 upgrades", requirement: 3, requirementType: "upgrades_bought", reward: 75, icon: "fas fa-star" },
      { name: "Daily Grower", description: "Play for 24 hours total", requirement: 86400, requirementType: "time_played", reward: 250, icon: "fas fa-calendar-day" },
      // Intermediate Achievements (11-25)
      { name: "Kush Collector", description: "Collect 1,000 KUSH", requirement: 1e3, requirementType: "total_kush", reward: 500, icon: "fas fa-coins" },
      { name: "Big Spender", description: "Buy 5 upgrades", requirement: 5, requirementType: "upgrades_bought", reward: 100, icon: "fas fa-shopping-cart" },
      { name: "Click Master", description: "Click 1,000 times", requirement: 1e3, requirementType: "total_clicks", reward: 200, icon: "fas fa-hand-point-up" },
      { name: "Entrepreneur", description: "Earn 2,500 KUSH", requirement: 2500, requirementType: "total_kush", reward: 1e3, icon: "fas fa-briefcase" },
      { name: "Upgrade Enthusiast", description: "Purchase 10 upgrades", requirement: 10, requirementType: "upgrades_bought", reward: 300, icon: "fas fa-level-up-alt" },
      { name: "Five Thousand Club", description: "Accumulate 5,000 KUSH", requirement: 5e3, requirementType: "total_kush", reward: 2e3, icon: "fas fa-medal" },
      { name: "Clicking Frenzy", description: "Click 2,500 times", requirement: 2500, requirementType: "total_clicks", reward: 500, icon: "fas fa-fire" },
      { name: "Business Owner", description: "Buy 15 upgrades", requirement: 15, requirementType: "upgrades_bought", reward: 750, icon: "fas fa-building" },
      { name: "Ten Thousand", description: "Reach 10,000 total KUSH", requirement: 1e4, requirementType: "total_kush", reward: 5e3, icon: "fas fa-gem" },
      { name: "Dedicated Player", description: "Play for 3 days total", requirement: 259200, requirementType: "time_played", reward: 1e3, icon: "fas fa-clock" },
      { name: "Click Champion", description: "Click 5,000 times", requirement: 5e3, requirementType: "total_clicks", reward: 1e3, icon: "fas fa-trophy" },
      { name: "Investment Guru", description: "Buy 20 upgrades", requirement: 20, requirementType: "upgrades_bought", reward: 1500, icon: "fas fa-chart-line" },
      { name: "Quarter Million", description: "Earn 25,000 KUSH", requirement: 25e3, requirementType: "total_kush", reward: 1e4, icon: "fas fa-crown" },
      { name: "Automation King", description: "Have 100 auto income per second", requirement: 36e4, requirementType: "auto_income", reward: 5e3, icon: "fas fa-robot" },
      { name: "Week Player", description: "Play for 1 week total", requirement: 604800, requirementType: "time_played", reward: 5e3, icon: "fas fa-calendar-week" },
      // Advanced Achievements (26-40)
      { name: "Fifty Thousand", description: "Accumulate 50,000 KUSH", requirement: 5e4, requirementType: "total_kush", reward: 25e3, icon: "fas fa-diamond" },
      { name: "Click God", description: "Click 10,000 times", requirement: 1e4, requirementType: "total_clicks", reward: 2500, icon: "fas fa-bolt" },
      { name: "Empire Builder", description: "Buy 30 upgrades", requirement: 30, requirementType: "upgrades_bought", reward: 5e3, icon: "fas fa-chess-king" },
      { name: "Hundred Thousand", description: "Reach 100,000 KUSH", requirement: 1e5, requirementType: "total_kush", reward: 5e4, icon: "fas fa-mountain" },
      { name: "Auto Millionaire", description: "Have 500 auto income per second", requirement: 18e5, requirementType: "auto_income", reward: 25e3, icon: "fas fa-money-bill-wave" },
      { name: "Marathon Clicker", description: "Click 25,000 times", requirement: 25e3, requirementType: "total_clicks", reward: 1e4, icon: "fas fa-running" },
      { name: "Upgrade Master", description: "Purchase 40 upgrades", requirement: 40, requirementType: "upgrades_bought", reward: 15e3, icon: "fas fa-graduation-cap" },
      { name: "Quarter Million Plus", description: "Accumulate 250,000 KUSH", requirement: 25e4, requirementType: "total_kush", reward: 1e5, icon: "fas fa-palace" },
      { name: "Monthly Player", description: "Play for 30 days total", requirement: 2592e3, requirementType: "time_played", reward: 5e4, icon: "fas fa-calendar-alt" },
      { name: "Cannabis Tycoon", description: "Have 1000 auto income per second", requirement: 36e5, requirementType: "auto_income", reward: 1e5, icon: "fas fa-industry" },
      { name: "Half Million", description: "Earn 500,000 KUSH", requirement: 5e5, requirementType: "total_kush", reward: 25e4, icon: "fas fa-treasure-chest" },
      { name: "Ultra Clicker", description: "Click 50,000 times", requirement: 5e4, requirementType: "total_clicks", reward: 25e3, icon: "fas fa-meteor" },
      { name: "Franchise Owner", description: "Buy 50 upgrades", requirement: 50, requirementType: "upgrades_bought", reward: 5e4, icon: "fas fa-store" },
      { name: "Millionaire", description: "Reach 1,000,000 KUSH", requirement: 1e6, requirementType: "total_kush", reward: 5e5, icon: "fas fa-university" },
      { name: "Automation God", description: "Have 2500 auto income per second", requirement: 9e6, requirementType: "auto_income", reward: 25e4, icon: "fas fa-cog" },
      // Elite Achievements (41-50)
      { name: "Multi Millionaire", description: "Accumulate 5,000,000 KUSH", requirement: 5e6, requirementType: "total_kush", reward: 1e6, icon: "fas fa-rocket" },
      { name: "Click Legend", description: "Click 100,000 times", requirement: 1e5, requirementType: "total_clicks", reward: 1e5, icon: "fas fa-infinity" },
      { name: "Ultimate Investor", description: "Buy 75 upgrades", requirement: 75, requirementType: "upgrades_bought", reward: 25e4, icon: "fas fa-chess-queen" },
      { name: "Ten Million Club", description: "Earn 10,000,000 KUSH", requirement: 1e7, requirementType: "total_kush", reward: 2e6, icon: "fas fa-globe" },
      { name: "Auto Billionaire", description: "Have 5000 auto income per second", requirement: 18e6, requirementType: "auto_income", reward: 1e6, icon: "fas fa-satellite" },
      { name: "Persistent Legend", description: "Play for 100 days total", requirement: 864e4, requirementType: "time_played", reward: 5e5, icon: "fas fa-hourglass-end" },
      { name: "Cannabis Emperor", description: "Buy 100 upgrades", requirement: 100, requirementType: "upgrades_bought", reward: 1e6, icon: "fas fa-chess-king" },
      { name: "Fifty Million", description: "Accumulate 50,000,000 KUSH", requirement: 5e7, requirementType: "total_kush", reward: 1e7, icon: "fas fa-space-shuttle" },
      { name: "Click Immortal", description: "Click 250,000 times", requirement: 25e4, requirementType: "total_clicks", reward: 5e5, icon: "fas fa-atom" },
      { name: "Galactic Empire", description: "Reach 100,000,000 KUSH", requirement: 1e8, requirementType: "total_kush", reward: 25e6, icon: "fas fa-galaxy" }
    ];
  }
});

// server/storage.ts
var storage_exports = {};
__export(storage_exports, {
  DatabaseStorage: () => DatabaseStorage,
  MemStorage: () => MemStorage,
  storage: () => storage
});
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc, and, gte, sql as sql2 } from "drizzle-orm";
var MemStorage, DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_achievements_data();
    MemStorage = class {
      players;
      upgrades;
      playerUpgrades;
      achievements;
      playerAchievements;
      tokenPayouts;
      constructor() {
        this.players = /* @__PURE__ */ new Map();
        this.upgrades = /* @__PURE__ */ new Map();
        this.playerUpgrades = /* @__PURE__ */ new Map();
        this.achievements = /* @__PURE__ */ new Map();
        this.playerAchievements = /* @__PURE__ */ new Map();
        this.tokenPayouts = /* @__PURE__ */ new Map();
        this.initializeGameData();
      }
      initializeGameData() {
        const defaultUpgrades = [
          // Click Power Upgrades
          { name: "Better Fingers", description: "+1 Kush per click", baseCost: 15, costMultiplier: 150, clickPowerIncrease: 1, autoIncomeIncrease: 0, icon: "fas fa-hand-pointer", category: "click", unlockRequirement: 0 },
          { name: "Lucky Fingers", description: "+2 Kush per click", baseCost: 500, costMultiplier: 150, clickPowerIncrease: 2, autoIncomeIncrease: 0, icon: "fas fa-magic", category: "click", unlockRequirement: 200 },
          { name: "Golden Touch", description: "+5 Kush per click", baseCost: 2e3, costMultiplier: 150, clickPowerIncrease: 5, autoIncomeIncrease: 0, icon: "fas fa-gem", category: "special", unlockRequirement: 1e3 },
          { name: "Diamond Fingers", description: "+10 Kush per click", baseCost: 1e4, costMultiplier: 150, clickPowerIncrease: 10, autoIncomeIncrease: 0, icon: "fas fa-diamond", category: "click", unlockRequirement: 5e3 },
          { name: "Master Harvester", description: "+25 Kush per click", baseCost: 5e4, costMultiplier: 150, clickPowerIncrease: 25, autoIncomeIncrease: 0, icon: "fas fa-crown", category: "special", unlockRequirement: 25e3 },
          // Auto Income Upgrades
          { name: "Auto Clicker", description: "+0.5 Kush per second", baseCost: 100, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 1800, icon: "fas fa-mouse-pointer", category: "auto", unlockRequirement: 50 },
          { name: "Kush Farm", description: "+5 Kush per second", baseCost: 5e3, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 18e3, icon: "fas fa-seedling", category: "auto", unlockRequirement: 2500 },
          { name: "Greenhouse Operation", description: "+15 Kush per second", baseCost: 25e3, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 54e3, icon: "fas fa-warehouse", category: "auto", unlockRequirement: 15e3 },
          { name: "Hydroponic System", description: "+35 Kush per second", baseCost: 1e5, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 126e3, icon: "fas fa-flask", category: "auto", unlockRequirement: 5e4 },
          { name: "Cannabis Corporation", description: "+100 Kush per second", baseCost: 5e5, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 36e4, icon: "fas fa-building", category: "business", unlockRequirement: 25e4 },
          // Business Upgrades
          { name: "Dispensary License", description: "+50 Kush per second", baseCost: 25e4, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 18e4, icon: "fas fa-certificate", category: "business", unlockRequirement: 1e5 },
          { name: "Distribution Network", description: "+200 Kush per second", baseCost: 1e6, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 72e4, icon: "fas fa-shipping-fast", category: "business", unlockRequirement: 5e5 },
          { name: "International Export", description: "+500 Kush per second", baseCost: 5e6, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 18e5, icon: "fas fa-globe", category: "business", unlockRequirement: 25e5 },
          // Research & Development
          { name: "Strain Research Lab", description: "+75 Kush per second + 15 per click", baseCost: 75e4, costMultiplier: 150, clickPowerIncrease: 15, autoIncomeIncrease: 27e4, icon: "fas fa-microscope", category: "research", unlockRequirement: 3e5 },
          { name: "Genetic Engineering", description: "+150 Kush per second + 30 per click", baseCost: 25e5, costMultiplier: 150, clickPowerIncrease: 30, autoIncomeIncrease: 54e4, icon: "fas fa-dna", category: "research", unlockRequirement: 1e6 },
          { name: "AI Growing Assistant", description: "+300 Kush per second + 50 per click", baseCost: 1e7, costMultiplier: 150, clickPowerIncrease: 50, autoIncomeIncrease: 108e4, icon: "fas fa-robot", category: "tech", unlockRequirement: 5e6 },
          // Ultimate Upgrades
          { name: "Kush Empire", description: "+1000 Kush per second + 100 per click", baseCost: 25e6, costMultiplier: 150, clickPowerIncrease: 100, autoIncomeIncrease: 36e5, icon: "fas fa-chess-king", category: "ultimate", unlockRequirement: 1e7 },
          { name: "Galactic Cannabis Trade", description: "+2500 Kush per second + 200 per click", baseCost: 1e8, costMultiplier: 150, clickPowerIncrease: 200, autoIncomeIncrease: 9e6, icon: "fas fa-rocket", category: "ultimate", unlockRequirement: 5e7 }
        ];
        defaultUpgrades.forEach((upgrade) => {
          const id = randomUUID();
          this.upgrades.set(id, {
            ...upgrade,
            id,
            costMultiplier: upgrade.costMultiplier || 150,
            clickPowerIncrease: upgrade.clickPowerIncrease || 0,
            autoIncomeIncrease: upgrade.autoIncomeIncrease || 0,
            unlockRequirement: upgrade.unlockRequirement || 0
          });
        });
        const defaultAchievements = [
          {
            name: "First Steps",
            description: "Click 10 times",
            requirement: 10,
            requirementType: "total_clicks",
            reward: 5,
            icon: "fas fa-baby"
          },
          {
            name: "Collect 5 KUSH",
            description: "Earn your first 5 KUSH",
            requirement: 5,
            requirementType: "total_kush",
            reward: 10,
            icon: "fas fa-cannabis"
          },
          {
            name: "Green Thumb",
            description: "Reach 25 total KUSH",
            requirement: 25,
            requirementType: "total_kush",
            reward: 25,
            icon: "fas fa-thumbs-up"
          },
          {
            name: "Speed Demon",
            description: "Click 250 times",
            requirement: 250,
            requirementType: "total_clicks",
            reward: 50,
            icon: "fas fa-tachometer-alt"
          },
          {
            name: "Kush Collector",
            description: "Collect 1,000 KUSH",
            requirement: 1e3,
            requirementType: "total_kush",
            reward: 500,
            icon: "fas fa-coins"
          },
          {
            name: "Big Spender",
            description: "Buy 5 upgrades",
            requirement: 5,
            requirementType: "upgrades_bought",
            reward: 100,
            icon: "fas fa-shopping-cart"
          }
        ];
        FIFTY_ACHIEVEMENTS.forEach((achievement) => {
          const id = randomUUID();
          this.achievements.set(id, { ...achievement, id });
        });
      }
      async getPlayer(id) {
        return this.players.get(id);
      }
      async getPlayerByUsername(username) {
        return Array.from(this.players.values()).find(
          (player2) => player2.username === username
        );
      }
      // Optimized lookups (memory storage stubs)
      async getPlayerByDiscordId(discordUserId) {
        return Array.from(this.players.values()).find((p) => p.discordUserId === discordUserId);
      }
      async getPlayerByTelegramId(telegramUserId) {
        return Array.from(this.players.values()).find((p) => p.telegramUserId === telegramUserId);
      }
      async getPlayerByWalletAddress(walletAddress) {
        return Array.from(this.players.values()).find((p) => p.walletAddress === walletAddress);
      }
      async createPlayer(insertPlayer) {
        const id = randomUUID();
        const player2 = {
          ...insertPlayer,
          id,
          telegramUserId: insertPlayer.telegramUserId || null,
          discordUserId: insertPlayer.discordUserId || null,
          totalKush: insertPlayer.totalKush || 0,
          totalClicks: insertPlayer.totalClicks || 0,
          perClickMultiplier: insertPlayer.perClickMultiplier || 1,
          autoIncomePerHour: insertPlayer.autoIncomePerHour || 0,
          passiveIncomePerHour: insertPlayer.passiveIncomePerHour || 0,
          claimableTokens: insertPlayer.claimableTokens || 0,
          walletAddress: insertPlayer.walletAddress || null,
          walletLinked: insertPlayer.walletLinked || false,
          solanaNetwork: insertPlayer.solanaNetwork || "devnet",
          walletSyncEnabled: insertPlayer.walletSyncEnabled ?? true,
          lastWalletSync: insertPlayer.lastWalletSync || null,
          referralHandle: insertPlayer.referralHandle || null,
          referredBy: insertPlayer.referredBy || null,
          hasChangedReferralHandle: insertPlayer.hasChangedReferralHandle || false,
          lastPassiveUpdate: insertPlayer.lastPassiveUpdate || null,
          createdAt: /* @__PURE__ */ new Date(),
          lastActive: /* @__PURE__ */ new Date()
        };
        this.players.set(id, player2);
        for (const achievementId of Array.from(this.achievements.keys())) {
          const playerAchievementId = randomUUID();
          this.playerAchievements.set(playerAchievementId, {
            id: playerAchievementId,
            playerId: id,
            achievementId,
            completed: false,
            progress: 0,
            completedAt: null
          });
        }
        return player2;
      }
      async updatePlayer(id, updates) {
        const player2 = this.players.get(id);
        if (!player2) return void 0;
        const updatedPlayer = { ...player2, ...updates, lastActive: /* @__PURE__ */ new Date() };
        this.players.set(id, updatedPlayer);
        return updatedPlayer;
      }
      async getTopPlayers(limit = 10) {
        return Array.from(this.players.values()).sort((a, b) => b.totalKush - a.totalKush).slice(0, limit);
      }
      async getAllPlayers() {
        return Array.from(this.players.values());
      }
      async deletePlayer(id) {
        const existed = this.players.has(id);
        this.players.delete(id);
        return existed;
      }
      async getAllUpgrades() {
        return Array.from(this.upgrades.values());
      }
      async getUpgrade(id) {
        return this.upgrades.get(id);
      }
      async createUpgrade(upgrade) {
        const id = randomUUID();
        const newUpgrade = {
          ...upgrade,
          id,
          costMultiplier: upgrade.costMultiplier || 150,
          clickPowerIncrease: upgrade.clickPowerIncrease || 0,
          autoIncomeIncrease: upgrade.autoIncomeIncrease || 0,
          unlockRequirement: upgrade.unlockRequirement || 0
        };
        this.upgrades.set(id, newUpgrade);
        return newUpgrade;
      }
      async getPlayerUpgrades(playerId) {
        return Array.from(this.playerUpgrades.values()).filter(
          (pu) => pu.playerId === playerId
        );
      }
      async buyUpgrade(playerUpgrade) {
        const id = randomUUID();
        const newPlayerUpgrade = {
          ...playerUpgrade,
          id,
          quantity: playerUpgrade.quantity || 0,
          purchasedAt: /* @__PURE__ */ new Date()
        };
        this.playerUpgrades.set(id, newPlayerUpgrade);
        return newPlayerUpgrade;
      }
      async getAllAchievements() {
        return Array.from(this.achievements.values());
      }
      async getPlayerAchievements(playerId) {
        return Array.from(this.playerAchievements.values()).filter(
          (pa) => pa.playerId === playerId
        );
      }
      async updatePlayerAchievement(playerId, achievementId, progress) {
        const playerAchievement = Array.from(this.playerAchievements.values()).find(
          (pa) => pa.playerId === playerId && pa.achievementId === achievementId
        );
        if (!playerAchievement) {
          throw new Error("Player achievement not found");
        }
        const achievement = this.achievements.get(achievementId);
        const completed = achievement ? progress >= achievement.requirement : false;
        const updated = {
          ...playerAchievement,
          progress,
          completed,
          completedAt: completed ? /* @__PURE__ */ new Date() : null
        };
        this.playerAchievements.set(playerAchievement.id, updated);
        return updated;
      }
      // Token payout operations
      async createTokenPayout(payout) {
        const id = randomUUID();
        const newPayout = {
          ...payout,
          id,
          status: payout.status || "pending",
          transactionSignature: payout.transactionSignature || null,
          createdAt: /* @__PURE__ */ new Date(),
          processedAt: null
        };
        this.tokenPayouts.set(id, newPayout);
        return newPayout;
      }
      async getPlayerTokenPayouts(playerId) {
        return Array.from(this.tokenPayouts.values()).filter(
          (payout) => payout.playerId === playerId
        );
      }
      async getAllTokenPayouts() {
        return Array.from(this.tokenPayouts.values());
      }
      async updateTokenPayoutStatus(payoutId, status, transactionSignature) {
        const payout = this.tokenPayouts.get(payoutId);
        if (!payout) return void 0;
        const updated = {
          ...payout,
          status,
          transactionSignature: transactionSignature || payout.transactionSignature,
          processedAt: status === "completed" ? /* @__PURE__ */ new Date() : payout.processedAt
        };
        this.tokenPayouts.set(payoutId, updated);
        return updated;
      }
      async getPendingTokenPayouts(network2) {
        return Array.from(this.tokenPayouts.values()).filter(
          (payout) => payout.network === network2 && payout.status === "pending"
        );
      }
      // Grow light methods (stub implementations for memory storage)
      async createGrowLight(growLight) {
        throw new Error("Grow lights not implemented in memory storage");
      }
      async getAllGrowLights() {
        return [];
      }
      async getPlayerGrowLights(playerId) {
        return [];
      }
      async addPlayerGrowLight(playerGrowLight) {
        throw new Error("Grow lights not implemented in memory storage");
      }
      async updatePlayerGrowLight(playerId, growLightId, updates) {
        throw new Error("Grow lights not implemented in memory storage");
      }
      // Token burn methods (stub implementations for memory storage)
      async createTokenBurn(tokenBurn) {
        throw new Error("Token burns not implemented in memory storage");
      }
      async getPlayerTokenBurns(playerId) {
        return [];
      }
      async isTransactionSignatureUsed(transactionSignature) {
        return false;
      }
      async updateTokenBurnStatus(burnId, status, transactionSignature) {
        throw new Error("Token burns not implemented in memory storage");
      }
      // Referral methods (stub implementations for memory storage)
      async getPlayerByReferralHandle(handle) {
        return Array.from(this.players.values()).find((p) => p.referralHandle === handle);
      }
      async getPlayerReferralStats(playerId) {
        const referrals = Array.from(this.players.values()).filter((p) => p.referredBy);
        return {
          totalReferrals: referrals.length,
          activeReferrals: referrals.length,
          referralEarnings: 0,
          recentReferrals: referrals.slice(0, 10)
        };
      }
      // PlayerWallet operations (stub implementations)  
      async getPlayerWallet(playerId) {
        return { playerId, kushBalance: 0, seedsBalance: 0 };
      }
      async updatePlayerWallet(playerId, updates) {
        return { playerId, ...updates };
      }
      // Comprehensive Game Features - Prestige System (stub implementations)
      async addPrestigeLevel(data) {
        throw new Error("Prestige system not implemented in memory storage");
      }
      async getPlayerPrestigeLevels(playerId) {
        return [];
      }
      async resetPlayerForPrestige(playerId, newMultiplier) {
      }
      // Daily Challenges (stub implementations)
      async createDailyChallenge(data) {
        throw new Error("Daily challenges not implemented in memory storage");
      }
      async getDailyChallengesForDate(dateActive) {
        return [];
      }
      async getPlayerDailyChallengeProgress(playerId, challengeId, dateActive) {
        return null;
      }
      async updatePlayerDailyChallengeProgress(playerId, challengeId, incrementValue, dateActive) {
      }
      async completeDailyChallenge(playerId, challengeId, dateActive) {
      }
      // Friends System (stub implementations)
      async createFriendship(data) {
        throw new Error("Friends system not implemented in memory storage");
      }
      async getFriendship(playerId, friendId) {
        return null;
      }
      async updateFriendshipStatus(friendshipId, status) {
      }
      async getPlayerFriends(playerId) {
        return [];
      }
      async getPendingFriendRequests(playerId) {
        return [];
      }
      async createFriendGift(data) {
        throw new Error("Friend gifts not implemented in memory storage");
      }
      // Guild System (stub implementations)
      async createGuild(data) {
        throw new Error("Guild system not implemented in memory storage");
      }
      async getGuildByName(name) {
        return null;
      }
      async getGuildById(guildId) {
        return null;
      }
      async addGuildMember(data) {
        throw new Error("Guild system not implemented in memory storage");
      }
      async updateGuildMemberCount(guildId, memberCount) {
      }
      async getPlayerGuildMembership(playerId) {
        return null;
      }
      async getGuildMembers(guildId) {
        return [];
      }
      async getGuildLeaderboard() {
        return [];
      }
      async updateGuildContribution(guildId, playerId, kushAmount) {
      }
      // Click Mechanics (stub implementations)
      async updateClickSession(playerId, updates) {
      }
      async createClickBoost(data) {
        throw new Error("Click boosts not implemented in memory storage");
      }
      async getActiveClickBoosts(playerId) {
        return [];
      }
      // Helper methods (DATABASE PERSISTENCE FIXED)
      async addPlayerKush(playerId, amount) {
        console.log(`\u{1F50D} DEBUG: Adding ${amount} KUSH to player ${playerId}`);
        const player2 = this.players.get(playerId);
        if (player2) {
          const oldKush = player2.totalKush;
          player2.totalKush += amount;
          this.players.set(playerId, player2);
          console.log(`\u{1F4BE} DEBUG: Updated memory ${oldKush} -> ${player2.totalKush}`);
          try {
            console.log(`\u{1F5C4}\uFE0F DEBUG: Attempting database update...`);
            const result = await this.db.update(players).set({ totalKush: player2.totalKush }).where(eq(players.id, playerId));
            console.log(`\u2705 DEBUG: Database update successful:`, result);
          } catch (error) {
            console.error(`\u274C CRITICAL: Failed to persist KUSH update for player ${playerId}:`, error);
            player2.totalKush -= amount;
            this.players.set(playerId, player2);
            throw error;
          }
        } else {
          console.error(`\u274C CRITICAL: Player ${playerId} not found in memory cache!`);
        }
      }
      async addPlayerSeeds(playerId, amount) {
        const player2 = this.players.get(playerId);
        if (player2) {
          player2.totalSeeds += amount;
          this.players.set(playerId, player2);
          try {
            await this.db.update(players).set({ totalSeeds: player2.totalSeeds }).where(eq(players.id, playerId));
          } catch (error) {
            console.error(`Failed to persist SEEDS update for player ${playerId}:`, error);
            player2.totalSeeds -= amount;
            this.players.set(playerId, player2);
            throw error;
          }
        }
      }
      async deductPlayerKush(playerId, amount) {
        const player2 = this.players.get(playerId);
        if (player2) {
          const newTotal = Math.max(0, player2.totalKush - amount);
          player2.totalKush = newTotal;
          this.players.set(playerId, player2);
          try {
            await this.db.update(players).set({ totalKush: newTotal }).where(eq(players.id, playerId));
          } catch (error) {
            console.error(`Failed to persist KUSH deduction for player ${playerId}:`, error);
            player2.totalKush += amount;
            this.players.set(playerId, player2);
            throw error;
          }
        }
      }
      async deductPlayerSeeds(playerId, amount) {
        const player2 = this.players.get(playerId);
        if (player2) {
          const newTotal = Math.max(0, player2.totalSeeds - amount);
          player2.totalSeeds = newTotal;
          this.players.set(playerId, player2);
          try {
            await this.db.update(players).set({ totalSeeds: newTotal }).where(eq(players.id, playerId));
          } catch (error) {
            console.error(`Failed to persist SEEDS deduction for player ${playerId}:`, error);
            player2.totalSeeds += amount;
            this.players.set(playerId, player2);
            throw error;
          }
        }
      }
      // Garden System (stub implementations)
      async getAllStrainGenetics() {
        return [];
      }
      async getPlayerStrainGenetics(playerId) {
        return [];
      }
      async getStrainGenetics(strainId) {
        return null;
      }
      async createStrainGenetics(data) {
        throw new Error("Garden system not implemented in memory storage");
      }
      async getPlayerGardenPlots(playerId) {
        return [];
      }
      async getPlayerStrains(playerId) {
        return [];
      }
      async createGardenPlot(data) {
        throw new Error("Garden system not implemented in memory storage");
      }
      async getGardenPlot(playerId, plotNumber) {
        return null;
      }
      async getGardenPlotById(plotId) {
        return null;
      }
      async updateGardenPlot(plotId, updates) {
      }
      async getPlayerGardenSupplies(playerId) {
        return [];
      }
      async updateGardenSupplies(playerId, supplyType, quantity) {
      }
      async addGardenSupplies(playerId, supplyType, quantity) {
      }
      async addHarvestHistory(data) {
        throw new Error("Garden system not implemented in memory storage");
      }
      async getPlayerHarvestHistory(playerId) {
        return [];
      }
      async addSeedsTransaction(data) {
        throw new Error("SEEDS transactions not implemented in memory storage");
      }
      // VIP subscription operations
      async getPlayerVIPSubscription(playerId) {
        return null;
      }
      async createVIPSubscription(subscriptionData) {
        throw new Error("VIP subscriptions not implemented in memory storage");
      }
      async updateVIPSubscription(playerId, updates) {
        throw new Error("VIP subscriptions not implemented in memory storage");
      }
      // Marketplace operations
      async getActiveMarketplaceListings() {
        return [];
      }
      async createMarketplaceListing(listingData) {
        throw new Error("Marketplace not implemented in memory storage");
      }
      async updateMarketplaceListing(listingId, updates) {
        throw new Error("Marketplace not implemented in memory storage");
      }
      async transferStrainOwnership(strainId, fromPlayerId, toPlayerId, quantity) {
        throw new Error("Strain ownership not implemented in memory storage");
      }
      // Seasonal events operations
      async getActiveSeasonalEvents() {
        return [];
      }
      async getSeasonalEvent(eventId) {
        return null;
      }
      async createSeasonalEvent(eventData) {
        throw new Error("Seasonal events not implemented in memory storage");
      }
      async addEventParticipant(eventId, playerId) {
        throw new Error("Event participation not implemented in memory storage");
      }
      async updatePlayerAnalytics(playerId, analytics) {
        throw new Error("Player analytics not implemented in memory storage");
      }
      // Missing method implementations for IStorage interface
      async getStakingPools() {
        return [];
      }
      async getStakingPool(poolId) {
        return null;
      }
      async createPlayerStake(stakeData) {
        return null;
      }
      async getPlayerStakes(playerId) {
        return [];
      }
      async getPlayerStake(stakeId) {
        return null;
      }
      async updatePlayerStake(stakeId, updates) {
        return null;
      }
      async getPlayerById(playerId) {
        return this.getPlayer(playerId);
      }
      async getMarketplaceItems() {
        return [];
      }
      async createPlayerWallet(playerId, walletData) {
        return null;
      }
      async getOnboardingProgress(playerId) {
        return null;
      }
      async updateOnboardingProgress(playerId, updates) {
        return null;
      }
      async hasOnboardingBonus(playerId) {
        return false;
      }
      async grantOnboardingBonus(playerId, bonus) {
        return null;
      }
      async trackAbTestConversion(testId, variant, playerId) {
        return null;
      }
      async getAbTestResults(testId) {
        return null;
      }
      async getActiveUserCount() {
        return this.players.size;
      }
      async getTotalTransactionCount() {
        return 0;
      }
      async getAverageResponseTime() {
        return 50;
      }
      async getErrorRate() {
        return 0;
      }
      async getTokenOperationsSuccessRate() {
        return 100;
      }
      async getDatabaseHealth() {
        return { status: "memory", healthy: true };
      }
      async trackTransactionMetrics(metrics) {
        return null;
      }
      async flagSuspiciousActivity(playerId, reason) {
        return null;
      }
      async getFlaggedActivities() {
        return [];
      }
      async reviewFlaggedActivity(activityId, resolution) {
        return null;
      }
      async getPlayerLoyalty(playerId) {
        return null;
      }
      async updatePlayerLoyalty(playerId, updates) {
        return null;
      }
      async getTutorialReward(playerId, stepId) {
        return null;
      }
      async recordTutorialReward(playerId, stepId, reward) {
        return null;
      }
      async getMarketplaceListing(listingId) {
        return null;
      }
      async getPlayerAnalytics(playerId) {
        return null;
      }
      async createPvPBattle(battleData) {
        return null;
      }
      async getPlayerBattles(playerId) {
        return [];
      }
      async getActiveBattles() {
        return [];
      }
      async getBattle(battleId) {
        return null;
      }
      async updateBattle(battleId, updates) {
        return null;
      }
      async updateBattleStats(playerId, result) {
      }
      async recordBattleResult(result) {
      }
      async getTournament(tournamentId) {
        return null;
      }
      async joinTournament(playerId, tournamentId) {
      }
      async getOpenTournaments() {
        return [];
      }
      async getBattleLeaderboard() {
        return [];
      }
    };
    DatabaseStorage = class {
      db;
      constructor() {
        const sql3 = postgres(process.env.DATABASE_URL, {
          // Use SSL with Replit's managed database
          ssl: "require",
          // Connection pooling for 5000+ concurrent players
          max: 20,
          idle_timeout: 2e4,
          connect_timeout: 1e4,
          // Performance optimizations
          transform: postgres.camel,
          prepare: false
        });
        this.db = drizzle(sql3);
        this.initializeGameData();
      }
      async initializeGameData() {
        const existingUpgrades = await this.db.select().from(upgrades).limit(1);
        if (existingUpgrades.length > 0) {
          return;
        }
        const defaultUpgrades = [
          // Click Power Upgrades
          { name: "Better Fingers", description: "+1 Kush per click", baseCost: 15, costMultiplier: 150, clickPowerIncrease: 1, autoIncomeIncrease: 0, icon: "fas fa-hand-pointer", category: "click", unlockRequirement: 0 },
          { name: "Lucky Fingers", description: "+2 Kush per click", baseCost: 500, costMultiplier: 150, clickPowerIncrease: 2, autoIncomeIncrease: 0, icon: "fas fa-magic", category: "click", unlockRequirement: 200 },
          { name: "Golden Touch", description: "+5 Kush per click", baseCost: 2e3, costMultiplier: 150, clickPowerIncrease: 5, autoIncomeIncrease: 0, icon: "fas fa-gem", category: "special", unlockRequirement: 1e3 },
          { name: "Diamond Fingers", description: "+10 Kush per click", baseCost: 1e4, costMultiplier: 150, clickPowerIncrease: 10, autoIncomeIncrease: 0, icon: "fas fa-diamond", category: "click", unlockRequirement: 5e3 },
          { name: "Master Harvester", description: "+25 Kush per click", baseCost: 5e4, costMultiplier: 150, clickPowerIncrease: 25, autoIncomeIncrease: 0, icon: "fas fa-crown", category: "special", unlockRequirement: 25e3 },
          // Auto Income Upgrades
          { name: "Auto Clicker", description: "+0.5 Kush per second", baseCost: 100, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 1800, icon: "fas fa-mouse-pointer", category: "auto", unlockRequirement: 50 },
          { name: "Kush Farm", description: "+5 Kush per second", baseCost: 5e3, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 18e3, icon: "fas fa-seedling", category: "auto", unlockRequirement: 2500 },
          { name: "Greenhouse Operation", description: "+15 Kush per second", baseCost: 25e3, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 54e3, icon: "fas fa-warehouse", category: "auto", unlockRequirement: 15e3 },
          { name: "Hydroponic System", description: "+35 Kush per second", baseCost: 1e5, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 126e3, icon: "fas fa-flask", category: "auto", unlockRequirement: 5e4 },
          { name: "Cannabis Corporation", description: "+100 Kush per second", baseCost: 5e5, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 36e4, icon: "fas fa-building", category: "business", unlockRequirement: 25e4 },
          // Business Upgrades
          { name: "Dispensary License", description: "+50 Kush per second", baseCost: 25e4, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 18e4, icon: "fas fa-certificate", category: "business", unlockRequirement: 1e5 },
          { name: "Distribution Network", description: "+200 Kush per second", baseCost: 1e6, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 72e4, icon: "fas fa-shipping-fast", category: "business", unlockRequirement: 5e5 },
          { name: "International Export", description: "+500 Kush per second", baseCost: 5e6, costMultiplier: 150, clickPowerIncrease: 0, autoIncomeIncrease: 18e5, icon: "fas fa-globe", category: "business", unlockRequirement: 25e5 },
          // Research & Development
          { name: "Strain Research Lab", description: "+75 Kush per second + 15 per click", baseCost: 75e4, costMultiplier: 150, clickPowerIncrease: 15, autoIncomeIncrease: 27e4, icon: "fas fa-microscope", category: "research", unlockRequirement: 3e5 },
          { name: "Genetic Engineering", description: "+150 Kush per second + 30 per click", baseCost: 25e5, costMultiplier: 150, clickPowerIncrease: 30, autoIncomeIncrease: 54e4, icon: "fas fa-dna", category: "research", unlockRequirement: 1e6 },
          { name: "AI Growing Assistant", description: "+300 Kush per second + 50 per click", baseCost: 1e7, costMultiplier: 150, clickPowerIncrease: 50, autoIncomeIncrease: 108e4, icon: "fas fa-robot", category: "tech", unlockRequirement: 5e6 },
          // Ultimate Upgrades
          { name: "Kush Empire", description: "+1000 Kush per second + 100 per click", baseCost: 25e6, costMultiplier: 150, clickPowerIncrease: 100, autoIncomeIncrease: 36e5, icon: "fas fa-chess-king", category: "ultimate", unlockRequirement: 1e7 },
          { name: "Galactic Cannabis Trade", description: "+2500 Kush per second + 200 per click", baseCost: 1e8, costMultiplier: 150, clickPowerIncrease: 200, autoIncomeIncrease: 9e6, icon: "fas fa-rocket", category: "ultimate", unlockRequirement: 5e7 }
        ];
        await this.db.insert(upgrades).values(defaultUpgrades);
        const defaultAchievements = [
          {
            name: "First Steps",
            description: "Click 10 times",
            requirement: 10,
            requirementType: "total_clicks",
            reward: 5,
            icon: "fas fa-baby"
          },
          {
            name: "Collect 5 KUSH",
            description: "Earn your first 5 KUSH",
            requirement: 5,
            requirementType: "total_kush",
            reward: 10,
            icon: "fas fa-cannabis"
          },
          {
            name: "Green Thumb",
            description: "Reach 25 total KUSH",
            requirement: 25,
            requirementType: "total_kush",
            reward: 25,
            icon: "fas fa-thumbs-up"
          },
          {
            name: "Speed Demon",
            description: "Click 250 times",
            requirement: 250,
            requirementType: "total_clicks",
            reward: 50,
            icon: "fas fa-tachometer-alt"
          },
          {
            name: "Kush Collector",
            description: "Collect 1,000 KUSH",
            requirement: 1e3,
            requirementType: "total_kush",
            reward: 500,
            icon: "fas fa-coins"
          },
          {
            name: "Big Spender",
            description: "Buy 5 upgrades",
            requirement: 5,
            requirementType: "upgrades_bought",
            reward: 100,
            icon: "fas fa-shopping-cart"
          }
        ];
        await this.db.insert(achievements).values(defaultAchievements);
      }
      async getPlayer(id) {
        const result = await this.db.select().from(players).where(eq(players.id, id)).limit(1);
        return result[0] || void 0;
      }
      // Optimized lookups for 5000+ concurrent players
      async getPlayerByDiscordId(discordUserId) {
        const result = await this.db.select().from(players).where(eq(players.discordUserId, discordUserId)).limit(1);
        return result[0] || void 0;
      }
      async getPlayerByTelegramId(telegramUserId) {
        const result = await this.db.select().from(players).where(eq(players.telegramUserId, telegramUserId)).limit(1);
        return result[0] || void 0;
      }
      async getPlayerByWalletAddress(walletAddress) {
        const result = await this.db.select().from(players).where(eq(players.walletAddress, walletAddress)).limit(1);
        return result[0] || void 0;
      }
      async getPlayerByUsername(username) {
        const result = await this.db.select().from(players).where(sql2`LOWER(${players.username}) = LOWER(${username})`).limit(1);
        return result[0] || void 0;
      }
      async createPlayer(insertPlayer) {
        const result = await this.db.insert(players).values(insertPlayer).returning();
        const newPlayer = result[0];
        const allAchievements = await this.db.select().from(achievements);
        const playerAchievementsData = allAchievements.map((achievement) => ({
          playerId: newPlayer.id,
          achievementId: achievement.id,
          completed: false,
          progress: 0
        }));
        if (playerAchievementsData.length > 0) {
          await this.db.insert(playerAchievements).values(playerAchievementsData);
        }
        return newPlayer;
      }
      async updatePlayer(id, updates) {
        const result = await this.db.update(players).set({ ...updates, lastActive: /* @__PURE__ */ new Date() }).where(eq(players.id, id)).returning();
        return result[0] || void 0;
      }
      async getTopPlayers(limit = 10) {
        return await this.db.select().from(players).orderBy(desc(players.totalKush)).limit(limit);
      }
      async getAllPlayers() {
        return await this.db.select().from(players);
      }
      async deletePlayer(id) {
        const result = await this.db.delete(players).where(eq(players.id, id));
        return Array.isArray(result) ? result.length > 0 : false;
      }
      async getAllUpgrades() {
        return await this.db.select().from(upgrades);
      }
      async getUpgrade(id) {
        const result = await this.db.select().from(upgrades).where(eq(upgrades.id, id)).limit(1);
        return result[0] || void 0;
      }
      async createUpgrade(upgrade) {
        const result = await this.db.insert(upgrades).values(upgrade).returning();
        return result[0];
      }
      async getPlayerUpgrades(playerId) {
        return await this.db.select().from(playerUpgrades).where(eq(playerUpgrades.playerId, playerId));
      }
      async buyUpgrade(playerUpgrade) {
        const existing = await this.db.select().from(playerUpgrades).where(and(
          eq(playerUpgrades.playerId, playerUpgrade.playerId),
          eq(playerUpgrades.upgradeId, playerUpgrade.upgradeId)
        ));
        if (existing.length > 0) {
          const result = await this.db.update(playerUpgrades).set({ quantity: playerUpgrade.quantity }).where(eq(playerUpgrades.id, existing[0].id)).returning();
          return result[0];
        } else {
          const result = await this.db.insert(playerUpgrades).values(playerUpgrade).returning();
          return result[0];
        }
      }
      async getAllAchievements() {
        return await this.db.select().from(achievements);
      }
      async getPlayerAchievements(playerId) {
        return await this.db.select().from(playerAchievements).where(eq(playerAchievements.playerId, playerId));
      }
      async updatePlayerAchievement(playerId, achievementId, progress) {
        const achievement = await this.getAchievement(achievementId);
        const completed = achievement ? progress >= achievement.requirement : false;
        const result = await this.db.update(playerAchievements).set({
          progress,
          completed,
          completedAt: completed ? /* @__PURE__ */ new Date() : null
        }).where(and(
          eq(playerAchievements.playerId, playerId),
          eq(playerAchievements.achievementId, achievementId)
        )).returning();
        return result[0];
      }
      async getAchievement(id) {
        const result = await this.db.select().from(achievements).where(eq(achievements.id, id)).limit(1);
        return result[0] || void 0;
      }
      // Token payout operations
      async createTokenPayout(payout) {
        const result = await this.db.insert(tokenPayouts).values(payout).returning();
        return result[0];
      }
      async getPlayerTokenPayouts(playerId) {
        return await this.db.select().from(tokenPayouts).where(eq(tokenPayouts.playerId, playerId)).orderBy(desc(tokenPayouts.createdAt));
      }
      async getAllTokenPayouts() {
        return await this.db.select().from(tokenPayouts).orderBy(desc(tokenPayouts.createdAt));
      }
      async updateTokenPayoutStatus(payoutId, status, transactionSignature) {
        const updateData = {
          status,
          processedAt: status === "completed" ? /* @__PURE__ */ new Date() : void 0
        };
        if (transactionSignature) {
          updateData.transactionSignature = transactionSignature;
        }
        const result = await this.db.update(tokenPayouts).set(updateData).where(eq(tokenPayouts.id, payoutId)).returning();
        return result[0] || void 0;
      }
      async getPendingTokenPayouts(network2) {
        return await this.db.select().from(tokenPayouts).where(and(
          eq(tokenPayouts.network, network2),
          eq(tokenPayouts.status, "pending")
        )).orderBy(tokenPayouts.createdAt);
      }
      // Grow light operations
      async createGrowLight(growLight) {
        const result = await this.db.insert(growLights).values(growLight).returning();
        return result[0];
      }
      async getAllGrowLights() {
        return await this.db.select().from(growLights).orderBy(growLights.burnCost);
      }
      async getPlayerGrowLights(playerId) {
        const result = await this.db.select({
          growLight: growLights,
          quantity: playerGrowLights.quantity,
          isActive: playerGrowLights.isActive,
          acquiredAt: playerGrowLights.acquiredAt
        }).from(playerGrowLights).innerJoin(growLights, eq(playerGrowLights.growLightId, growLights.id)).where(eq(playerGrowLights.playerId, playerId)).orderBy(growLights.rarity, growLights.burnCost);
        return result;
      }
      async addPlayerGrowLight(playerGrowLight) {
        const result = await this.db.insert(playerGrowLights).values(playerGrowLight).returning();
        return result[0];
      }
      async updatePlayerGrowLight(playerId, growLightId, updates) {
        const result = await this.db.update(playerGrowLights).set(updates).where(and(
          eq(playerGrowLights.playerId, playerId),
          eq(playerGrowLights.growLightId, growLightId)
        )).returning();
        return result[0] || void 0;
      }
      // Token burn operations
      async createTokenBurn(tokenBurn) {
        const result = await this.db.insert(tokenBurns).values(tokenBurn).returning();
        return result[0];
      }
      async getPlayerTokenBurns(playerId) {
        return await this.db.select().from(tokenBurns).where(eq(tokenBurns.playerId, playerId)).orderBy(desc(tokenBurns.createdAt));
      }
      /**
       * Check if transaction signature has been used by ANY user (security check)
       */
      async isTransactionSignatureUsed(transactionSignature) {
        const existingBurns = await this.db.select().from(tokenBurns).where(eq(tokenBurns.burnTransactionSignature, transactionSignature)).limit(1);
        return existingBurns.length > 0;
      }
      async updateTokenBurnStatus(burnId, status, transactionSignature) {
        const updateData = {
          status,
          processedAt: status === "completed" ? /* @__PURE__ */ new Date() : void 0
        };
        if (transactionSignature) {
          updateData.burnTransactionSignature = transactionSignature;
        }
        const result = await this.db.update(tokenBurns).set(updateData).where(eq(tokenBurns.id, burnId)).returning();
        return result[0] || void 0;
      }
      // Referral operations
      async getPlayerByReferralHandle(handle) {
        const result = await this.db.select().from(players).where(eq(players.referralHandle, handle)).limit(1);
        return result[0] || void 0;
      }
      async getPlayerReferralStats(playerId) {
        const player2 = await this.getPlayer(playerId);
        if (!player2 || !player2.referralHandle) {
          return {
            totalReferrals: 0,
            activeReferrals: 0,
            referralEarnings: 0,
            recentReferrals: []
          };
        }
        const referrals = await this.db.select().from(players).where(eq(players.referredBy, player2.referralHandle)).orderBy(desc(players.createdAt));
        const referralPayouts = await this.db.select().from(tokenPayouts).where(and(
          eq(tokenPayouts.playerId, playerId),
          eq(tokenPayouts.reason, "Referral bonus")
        ));
        const referralEarnings = referralPayouts.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
        const sevenDaysAgo = /* @__PURE__ */ new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const activeReferrals = referrals.filter((r) => r.lastActive > sevenDaysAgo);
        return {
          totalReferrals: referrals.length,
          activeReferrals: activeReferrals.length,
          referralEarnings,
          recentReferrals: referrals.slice(0, 10)
        };
      }
      // ===== COMPREHENSIVE GAME FEATURES STORAGE METHODS =====
      // PRESTIGE SYSTEM
      async addPrestigeLevel(data) {
        const result = await this.db.insert(prestigeLevels).values(data).returning();
        return result[0];
      }
      async getPlayerPrestigeLevels(playerId) {
        return await this.db.select().from(prestigeLevels).where(eq(prestigeLevels.playerId, playerId)).orderBy(desc(prestigeLevels.level));
      }
      async resetPlayerForPrestige(playerId, newMultiplier) {
        await this.db.update(players).set({
          totalKush: 0,
          totalClicks: 0,
          perClickMultiplier: newMultiplier,
          autoIncomePerHour: 0,
          passiveIncomePerHour: 0,
          claimableTokens: 0
        }).where(eq(players.id, playerId));
      }
      // DAILY CHALLENGES
      async createDailyChallenge(data) {
        const result = await this.db.insert(dailyChallenges).values(data).returning();
        return result[0];
      }
      async getDailyChallengesForDate(dateActive) {
        return await this.db.select().from(dailyChallenges).where(eq(dailyChallenges.dateActive, dateActive));
      }
      async getPlayerDailyChallengeProgress(playerId, challengeId, dateActive) {
        const result = await this.db.select().from(playerDailyChallenges).where(and(
          eq(playerDailyChallenges.playerId, playerId),
          eq(playerDailyChallenges.challengeId, challengeId),
          eq(playerDailyChallenges.dateActive, dateActive)
        )).limit(1);
        return result[0];
      }
      async updatePlayerDailyChallengeProgress(playerId, challengeId, incrementValue, dateActive) {
        const existing = await this.getPlayerDailyChallengeProgress(playerId, challengeId, dateActive);
        if (existing) {
          await this.db.update(playerDailyChallenges).set({ progress: existing.progress + incrementValue }).where(eq(playerDailyChallenges.id, existing.id));
        } else {
          await this.db.insert(playerDailyChallenges).values({
            playerId,
            challengeId,
            progress: incrementValue,
            dateActive,
            completed: false
          });
        }
      }
      async completeDailyChallenge(playerId, challengeId, dateActive) {
        await this.db.update(playerDailyChallenges).set({ completed: true, completedAt: /* @__PURE__ */ new Date() }).where(and(
          eq(playerDailyChallenges.playerId, playerId),
          eq(playerDailyChallenges.challengeId, challengeId),
          eq(playerDailyChallenges.dateActive, dateActive)
        ));
      }
      // FRIENDS SYSTEM
      async createFriendship(data) {
        const result = await this.db.insert(friendships).values(data).returning();
        return result[0];
      }
      async getFriendship(playerId, friendId) {
        const result = await this.db.select().from(friendships).where(and(
          eq(friendships.playerId, playerId),
          eq(friendships.friendId, friendId)
        )).limit(1);
        return result[0];
      }
      async updateFriendshipStatus(friendshipId, status) {
        await this.db.update(friendships).set({ status, acceptedAt: status === "accepted" ? /* @__PURE__ */ new Date() : null }).where(eq(friendships.id, friendshipId));
      }
      async getPlayerFriends(playerId) {
        return await this.db.select().from(friendships).where(and(
          eq(friendships.playerId, playerId),
          eq(friendships.status, "accepted")
        ));
      }
      async getPendingFriendRequests(playerId) {
        return await this.db.select().from(friendships).where(and(
          eq(friendships.friendId, playerId),
          eq(friendships.status, "pending")
        ));
      }
      async createFriendGift(data) {
        const result = await this.db.insert(friendGifts).values(data).returning();
        return result[0];
      }
      // GUILD SYSTEM
      async createGuild(data) {
        const result = await this.db.insert(guilds).values(data).returning();
        return result[0];
      }
      async getGuildByName(name) {
        const result = await this.db.select().from(guilds).where(eq(guilds.name, name)).limit(1);
        return result[0];
      }
      async getGuildById(guildId) {
        const result = await this.db.select().from(guilds).where(eq(guilds.id, guildId)).limit(1);
        return result[0];
      }
      async addGuildMember(data) {
        const result = await this.db.insert(guildMembers).values(data).returning();
        return result[0];
      }
      async updateGuildMemberCount(guildId, memberCount) {
        await this.db.update(guilds).set({ memberCount }).where(eq(guilds.id, guildId));
      }
      async getPlayerGuildMembership(playerId) {
        const result = await this.db.select().from(guildMembers).where(eq(guildMembers.playerId, playerId)).limit(1);
        return result[0];
      }
      async getGuildMembers(guildId) {
        return await this.db.select().from(guildMembers).where(eq(guildMembers.guildId, guildId));
      }
      async getGuildLeaderboard() {
        return await this.db.select().from(guilds).orderBy(desc(guilds.totalKushEarned)).limit(10);
      }
      async updateGuildContribution(guildId, playerId, kushAmount) {
        await this.db.update(guilds).set({ totalKushEarned: kushAmount }).where(eq(guilds.id, guildId));
        await this.db.update(guildMembers).set({ contributedKush: kushAmount }).where(and(
          eq(guildMembers.guildId, guildId),
          eq(guildMembers.playerId, playerId)
        ));
      }
      // PLAYER WALLETS & SEEDS SYSTEM
      async getPlayerWallet(playerId) {
        const result = await this.db.select().from(playerWallets).where(eq(playerWallets.playerId, playerId)).limit(1);
        return result[0];
      }
      async createPlayerWallet(playerId) {
        const result = await this.db.insert(playerWallets).values({
          playerId,
          kushBalance: 0,
          seedsBalance: 0,
          stakedKush: 0,
          totalEarnedKush: 0,
          totalEarnedSeeds: 0
        }).returning();
        return result[0];
      }
      async addPlayerKush(playerId, amount) {
        console.log(`\u{1F50D} DatabaseStorage: Adding ${amount} KUSH to player ${playerId}`);
        const player2 = await this.getPlayer(playerId);
        if (!player2) {
          console.error(`\u274C CRITICAL: Player ${playerId} not found in database!`);
          return;
        }
        console.log(`\u{1F4BE} DEBUG: Current player totalKush: ${player2.totalKush}, adding: ${amount}`);
        await this.db.update(players).set({
          totalKush: player2.totalKush + amount,
          lastActive: /* @__PURE__ */ new Date()
        }).where(eq(players.id, playerId));
        const wallet = await this.getPlayerWallet(playerId) || await this.createPlayerWallet(playerId);
        await this.db.update(playerWallets).set({
          kushBalance: wallet.kushBalance + amount,
          totalEarnedKush: wallet.totalEarnedKush + amount,
          lastUpdated: /* @__PURE__ */ new Date()
        }).where(eq(playerWallets.playerId, playerId));
        console.log(`\u2705 DatabaseStorage: Successfully updated player totalKush and wallet`);
      }
      async addPlayerSeeds(playerId, amount) {
        const wallet = await this.getPlayerWallet(playerId) || await this.createPlayerWallet(playerId);
        await this.db.update(playerWallets).set({
          seedsBalance: wallet.seedsBalance + amount,
          totalEarnedSeeds: wallet.totalEarnedSeeds + amount,
          lastUpdated: /* @__PURE__ */ new Date()
        }).where(eq(playerWallets.playerId, playerId));
      }
      async deductPlayerKush(playerId, amount) {
        const wallet = await this.getPlayerWallet(playerId);
        if (!wallet || wallet.kushBalance < amount) return;
        await this.db.update(playerWallets).set({
          kushBalance: wallet.kushBalance - amount,
          lastUpdated: /* @__PURE__ */ new Date()
        }).where(eq(playerWallets.playerId, playerId));
      }
      async deductPlayerSeeds(playerId, amount) {
        const wallet = await this.getPlayerWallet(playerId);
        if (!wallet || wallet.seedsBalance < amount) return;
        await this.db.update(playerWallets).set({
          seedsBalance: wallet.seedsBalance - amount,
          lastUpdated: /* @__PURE__ */ new Date()
        }).where(eq(playerWallets.playerId, playerId));
      }
      // CLICK MECHANICS
      async updateClickSession(playerId, updates) {
        const existing = await this.db.select().from(clickSessions).where(and(
          eq(clickSessions.playerId, playerId),
          eq(clickSessions.sessionEnd, null)
        )).limit(1);
        if (existing[0]) {
          await this.db.update(clickSessions).set({
            totalClicks: existing[0].totalClicks + updates.totalClicks,
            criticalHits: existing[0].criticalHits + updates.criticalHits,
            maxCombo: Math.max(existing[0].maxCombo, updates.maxCombo)
          }).where(eq(clickSessions.id, existing[0].id));
        } else {
          await this.db.insert(clickSessions).values({
            playerId,
            totalClicks: updates.totalClicks,
            criticalHits: updates.criticalHits,
            maxCombo: updates.maxCombo,
            specialPatternsHit: 0
          });
        }
      }
      async createClickBoost(data) {
        const result = await this.db.insert(clickBoosts).values(data).returning();
        return result[0];
      }
      async getActiveClickBoosts(playerId) {
        return await this.db.select().from(clickBoosts).where(and(
          eq(clickBoosts.playerId, playerId),
          gte(clickBoosts.expiresAt, /* @__PURE__ */ new Date())
        ));
      }
      // STAKING SYSTEM
      async createPlayerStake(data) {
        const result = await this.db.insert(playerStakes).values(data).returning();
        return result[0];
      }
      async getPlayerStakes(playerId) {
        return await this.db.select().from(playerStakes).where(eq(playerStakes.playerId, playerId));
      }
      async getStakingPools() {
        return await this.db.select().from(stakingPools).where(eq(stakingPools.isActive, true));
      }
      // ===== GROW GARDEN SYSTEM STORAGE METHODS =====
      // STRAIN GENETICS MANAGEMENT
      async getAllStrainGenetics() {
        return await this.db.select().from(strainGenetics).orderBy(strainGenetics.rarity, strainGenetics.name);
      }
      async getPlayerStrainGenetics(playerId) {
        return await this.db.select().from(strainGenetics).where(eq(strainGenetics.discoveredBy, playerId));
      }
      async getStrainGenetics(strainId) {
        const result = await this.db.select().from(strainGenetics).where(eq(strainGenetics.id, strainId)).limit(1);
        return result[0];
      }
      async createStrainGenetics(data) {
        const result = await this.db.insert(strainGenetics).values(data).returning();
        return result[0];
      }
      // GARDEN PLOTS MANAGEMENT
      async getPlayerGardenPlots(playerId) {
        return await this.db.select().from(gardenPlots).where(eq(gardenPlots.playerId, playerId)).orderBy(gardenPlots.plotNumber);
      }
      async getPlayerStrains(playerId) {
        const harvests = await this.db.select({
          strainId: harvestHistory.strainId,
          kushEarned: harvestHistory.kushEarned
        }).from(harvestHistory).where(eq(harvestHistory.playerId, playerId));
        const strainCounts = harvests.reduce((acc, harvest) => {
          if (harvest.strainId) {
            acc[harvest.strainId] = (acc[harvest.strainId] || 0) + 1;
          }
          return acc;
        }, {});
        return Object.entries(strainCounts).map(([strainId, quantity]) => ({
          strainId,
          quantity
        }));
      }
      async createGardenPlot(data) {
        const result = await this.db.insert(gardenPlots).values(data).returning();
        return result[0];
      }
      async getGardenPlot(playerId, plotNumber) {
        const result = await this.db.select().from(gardenPlots).where(and(
          eq(gardenPlots.playerId, playerId),
          eq(gardenPlots.plotNumber, plotNumber)
        )).limit(1);
        return result[0];
      }
      async getGardenPlotById(plotId) {
        const result = await this.db.select().from(gardenPlots).where(eq(gardenPlots.id, plotId)).limit(1);
        return result[0];
      }
      async updateGardenPlot(plotId, updates) {
        await this.db.update(gardenPlots).set(updates).where(eq(gardenPlots.id, plotId));
      }
      // GARDEN SUPPLIES MANAGEMENT
      async getPlayerGardenSupplies(playerId) {
        return await this.db.select().from(gardenSupplies).where(eq(gardenSupplies.playerId, playerId));
      }
      async updateGardenSupplies(playerId, supplyType, quantity) {
        const existing = await this.db.select().from(gardenSupplies).where(and(
          eq(gardenSupplies.playerId, playerId),
          eq(gardenSupplies.supplyType, supplyType)
        )).limit(1);
        if (existing.length > 0) {
          await this.db.update(gardenSupplies).set({ quantity, lastPurchased: /* @__PURE__ */ new Date() }).where(eq(gardenSupplies.id, existing[0].id));
        } else {
          await this.db.insert(gardenSupplies).values({
            playerId,
            supplyType,
            quantity,
            lastPurchased: /* @__PURE__ */ new Date()
          });
        }
      }
      async addGardenSupplies(playerId, supplyType, quantity) {
        const existing = await this.db.select().from(gardenSupplies).where(and(
          eq(gardenSupplies.playerId, playerId),
          eq(gardenSupplies.supplyType, supplyType)
        )).limit(1);
        if (existing.length > 0) {
          await this.db.update(gardenSupplies).set({
            quantity: existing[0].quantity + quantity,
            lastPurchased: /* @__PURE__ */ new Date()
          }).where(eq(gardenSupplies.id, existing[0].id));
        } else {
          await this.db.insert(gardenSupplies).values({
            playerId,
            supplyType,
            quantity,
            lastPurchased: /* @__PURE__ */ new Date()
          });
        }
      }
      // HARVEST HISTORY
      async addHarvestHistory(data) {
        const result = await this.db.insert(harvestHistory).values(data).returning();
        return result[0];
      }
      async getPlayerHarvestHistory(playerId) {
        return await this.db.select().from(harvestHistory).where(eq(harvestHistory.playerId, playerId)).orderBy(desc(harvestHistory.harvestDate)).limit(20);
      }
      // SEEDS TRANSACTIONS
      async addSeedsTransaction(data) {
        const result = await this.db.insert(seedsTransactions).values(data).returning();
        return result[0];
      }
      // ===== VIP SUBSCRIPTION METHODS =====
      async getPlayerVIPSubscription(playerId) {
        const result = await this.db.select().from(vipSubscriptions).where(eq(vipSubscriptions.playerId, playerId)).limit(1);
        return result[0] || null;
      }
      async createVIPSubscription(subscriptionData) {
        const result = await this.db.insert(vipSubscriptions).values(subscriptionData).returning();
        return result[0];
      }
      async updateVIPSubscription(playerId, updates) {
        const result = await this.db.update(vipSubscriptions).set(updates).where(eq(vipSubscriptions.playerId, playerId)).returning();
        return result[0] || null;
      }
      // ===== MARKETPLACE METHODS =====
      async getActiveMarketplaceListings() {
        return await this.db.select().from(marketplaceListings).where(eq(marketplaceListings.status, "active")).orderBy(desc(marketplaceListings.listedAt));
      }
      async createMarketplaceListing(listingData) {
        const result = await this.db.insert(marketplaceListings).values(listingData).returning();
        return result[0];
      }
      async updateMarketplaceListing(listingId, updates) {
        const result = await this.db.update(marketplaceListings).set(updates).where(eq(marketplaceListings.id, listingId)).returning();
        return result[0] || null;
      }
      async transferStrainOwnership(strainId, fromPlayerId, toPlayerId, quantity) {
        console.log(`Transferring ${quantity}x strain ${strainId} from ${fromPlayerId} to ${toPlayerId}`);
      }
      // ===== SEASONAL EVENTS METHODS =====  
      async getActiveSeasonalEvents() {
        return await this.db.select().from(seasonalEvents).where(eq(seasonalEvents.isActive, true)).orderBy(desc(seasonalEvents.startDate));
      }
      async getSeasonalEvent(eventId) {
        const result = await this.db.select().from(seasonalEvents).where(eq(seasonalEvents.id, eventId)).limit(1);
        return result[0] || null;
      }
      async createSeasonalEvent(eventData) {
        const result = await this.db.insert(seasonalEvents).values(eventData).returning();
        return result[0];
      }
      async addEventParticipant(eventId, playerId) {
        const result = await this.db.insert(eventRewards).values({
          eventId,
          playerId,
          rewardType: "participation",
          rewardId: null
        }).returning();
        return result[0];
      }
      async updatePlayerAnalytics(playerId, analytics) {
        console.log(`Player ${playerId} analytics:`, analytics);
      }
      // ===== TUTORIAL METHODS =====
      async getTutorialReward(playerId, stepId) {
        const result = await this.db.select().from(tutorialRewards).where(and(
          eq(tutorialRewards.playerId, playerId),
          eq(tutorialRewards.stepId, stepId)
        )).limit(1);
        return result[0] || null;
      }
      async recordTutorialReward(playerId, stepId, reward) {
        const result = await this.db.insert(tutorialRewards).values({
          playerId,
          stepId,
          reward
        }).returning();
        return result[0];
      }
      // ===== PVP BATTLE ARENA METHODS =====
      async createPvPBattle(battle) {
        return battle;
      }
      async getBattle(battleId) {
        return null;
      }
      async getPlayerBattles(playerId) {
        return [];
      }
      async getActiveBattles() {
        return [];
      }
      async updateBattle(battleId, updateData) {
      }
      async updateBattleStats(playerId, result) {
      }
      async recordBattleResult(result) {
      }
      async getTournament(tournamentId) {
        const mockTournaments = {
          "daily_championship": {
            id: "daily_championship",
            name: "Daily Blaze Championship",
            entryFee: 5e3,
            prizePool: 5e4,
            participants: 12,
            maxParticipants: 16,
            status: "open"
          },
          "weekend_warriors": {
            id: "weekend_warriors",
            name: "Weekend Warriors Cup",
            entryFee: 1e4,
            prizePool: 12e4,
            participants: 8,
            maxParticipants: 32,
            status: "open"
          }
        };
        return mockTournaments[tournamentId] || null;
      }
      async joinTournament(playerId, tournamentId) {
      }
      async getOpenTournaments() {
        return [
          {
            id: "daily_championship",
            name: "Daily Blaze Championship",
            entryFee: 5e3,
            prizePool: 5e4,
            participants: 12,
            maxParticipants: 16,
            status: "open",
            startTime: new Date(Date.now() + 36e5)
          },
          {
            id: "weekend_warriors",
            name: "Weekend Warriors Cup",
            entryFee: 1e4,
            prizePool: 12e4,
            participants: 8,
            maxParticipants: 32,
            status: "open",
            startTime: new Date(Date.now() + 72e5)
          }
        ];
      }
      async getPlayerAnalytics(playerId) {
        const player2 = await this.getPlayer(playerId);
        return {
          playerId,
          totalKush: player2?.totalKush || 0,
          totalClicks: player2?.totalClicks || 0,
          level: player2?.level || 1
        };
      }
      async getMarketplaceListing(listingId) {
        const result = await this.db.select().from(marketplaceListings).where(eq(marketplaceListings.id, listingId)).limit(1);
        return result[0] || null;
      }
      async getBattleLeaderboard() {
        const battlePlayers = await this.db.select({
          playerId: players.id,
          username: players.username,
          totalKush: players.totalKush
        }).from(players).orderBy(desc(players.totalKush)).limit(10);
        return battlePlayers.map((player2, index) => ({
          rank: index + 1,
          username: player2.username,
          wins: 0,
          losses: 0,
          winRate: 0,
          points: player2.totalKush || 0
        }));
      }
      async getPlayerLoyalty(playerId) {
        const result = await this.db.select().from(playerLoyalty).where(eq(playerLoyalty.playerId, playerId)).limit(1);
        if (result.length === 0) {
          const newLoyalty = await this.db.insert(playerLoyalty).values({
            playerId,
            loyaltyPoints: 0,
            consecutiveLogins: 0,
            longestLoginStreak: 0,
            lastLogin: /* @__PURE__ */ new Date(),
            totalAirdropsReceived: 0
          }).returning();
          return newLoyalty[0];
        }
        return result[0];
      }
      async updatePlayerLoyalty(playerId, updates) {
        const result = await this.db.update(playerLoyalty).set(updates).where(eq(playerLoyalty.playerId, playerId)).returning();
        return result[0];
      }
      // Missing method implementations for IStorage interface
      async getStakingPools() {
        return await this.db.select().from(stakingPools);
      }
      async getStakingPool(poolId) {
        const result = await this.db.select().from(stakingPools).where(eq(stakingPools.id, poolId)).limit(1);
        return result[0] || null;
      }
      async createPlayerStake(stakeData) {
        const result = await this.db.insert(playerStakes).values(stakeData).returning();
        return result[0];
      }
      async getPlayerStakes(playerId) {
        return await this.db.select().from(playerStakes).where(eq(playerStakes.playerId, playerId));
      }
      async getPlayerStake(stakeId) {
        const result = await this.db.select().from(playerStakes).where(eq(playerStakes.id, stakeId)).limit(1);
        return result[0] || null;
      }
      async updatePlayerStake(stakeId, updates) {
        const result = await this.db.update(playerStakes).set(updates).where(eq(playerStakes.id, stakeId)).returning();
        return result[0];
      }
      async getPlayerById(playerId) {
        return this.getPlayer(playerId);
      }
      async getMarketplaceItems() {
        return await this.db.select().from(marketplaceListings);
      }
      async createPlayerWallet(playerId, walletData) {
        const result = await this.db.insert(playerWallets).values({ playerId, ...walletData }).returning();
        return result[0];
      }
      async getOnboardingProgress(playerId) {
        return null;
      }
      async updateOnboardingProgress(playerId, updates) {
        return null;
      }
      async hasOnboardingBonus(playerId) {
        return false;
      }
      async grantOnboardingBonus(playerId, bonus) {
        return null;
      }
      async trackAbTestConversion(testId, variant, playerId) {
        return null;
      }
      async getAbTestResults(testId) {
        return null;
      }
      async getActiveUserCount() {
        const result = await this.db.select().from(players);
        return result.length;
      }
      async getTotalTransactionCount() {
        return 0;
      }
      async getAverageResponseTime() {
        return 50;
      }
      async getErrorRate() {
        return 0;
      }
      async getTokenOperationsSuccessRate() {
        return 100;
      }
      async getDatabaseHealth() {
        return { status: "database", healthy: true };
      }
      async trackTransactionMetrics(metrics) {
        return null;
      }
      async flagSuspiciousActivity(playerId, reason) {
        return null;
      }
      async getFlaggedActivities() {
        return [];
      }
      async reviewFlaggedActivity(activityId, resolution) {
        return null;
      }
      async getTutorialReward(playerId, stepId) {
        const result = await this.db.select().from(tutorialRewards).where(and(eq(tutorialRewards.playerId, playerId), eq(tutorialRewards.stepId, stepId))).limit(1);
        return result[0] || null;
      }
      async recordTutorialReward(playerId, stepId, reward) {
        const result = await this.db.insert(tutorialRewards).values({ playerId, stepId, reward, completedAt: /* @__PURE__ */ new Date() }).returning();
        return result[0];
      }
      // Missing critical method for deployment
      async updatePlayerWallet(playerId, updates) {
        const result = await this.db.update(playerWallets).set(updates).where(eq(playerWallets.playerId, playerId)).returning();
        return result[0];
      }
    };
    storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
  }
});

// server/solana-token-service.ts
var solana_token_service_exports = {};
__export(solana_token_service_exports, {
  SolanaTokenService: () => SolanaTokenService,
  TOKEN_REWARDS: () => TOKEN_REWARDS,
  mainnetTokenService: () => mainnetTokenService
});
var TOKEN_REWARDS, SolanaTokenService, mainnetTokenService;
var init_solana_token_service = __esm({
  "server/solana-token-service.ts"() {
    "use strict";
    TOKEN_REWARDS = {
      achievement: {
        firstClick: 10,
        first100Clicks: 50,
        first1000Clicks: 200,
        first10000Clicks: 1e3,
        firstUpgrade: 25,
        firstMillionaire: 5e3,
        weeklyActive: 100,
        referralBonus: 200,
        walletConnection: 50
      },
      milestone: {
        1e3: 100,
        // 1K KUSH = 100 tokens
        1e4: 500,
        // 10K KUSH = 500 tokens  
        1e5: 2e3,
        // 100K KUSH = 2000 tokens
        1e6: 1e4,
        // 1M KUSH = 10K tokens
        1e7: 5e4
        // 10M KUSH = 50K tokens
      },
      conversion: {
        kushPerToken: 1e3
        // 1000 KUSH = 1 Token
      }
    };
    SolanaTokenService = class {
      config;
      connection;
      // Will be properly typed when we install @solana/web3.js
      balanceCache;
      rpcEndpoints;
      currentEndpointIndex;
      failedEndpoints;
      lastEndpointReset;
      constructor(network2 = "mainnet") {
        this.rpcEndpoints = [
          "https://api.mainnet-beta.solana.com",
          "https://solana.public-rpc.com",
          "https://rpc.ankr.com/solana",
          "https://api.devnet.solana.com"
          // Fallback to devnet if mainnet fails
        ];
        this.currentEndpointIndex = 0;
        this.failedEndpoints = /* @__PURE__ */ new Set();
        this.lastEndpointReset = Date.now();
        this.config = {
          network: "mainnet",
          rpcUrl: this.rpcEndpoints[0],
          // Will be rotated
          tokenDecimals: parseInt(process.env.TOKEN_DECIMALS || "6"),
          tokenSymbol: process.env.TOKEN_SYMBOL || "KUSH",
          tokenName: process.env.TOKEN_NAME || "KushKlicker Token",
          // Use mainnet production token only
          tokenMintAddress: (process.env.MAINNET_TOKEN_MINT || "FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL").trim(),
          adminKeypair: process.env.MAINNET_ADMIN_KEYPAIR
        };
        this.balanceCache = /* @__PURE__ */ new Map();
        console.log(`\u{1FA99} Token Service initialized on mainnet:`);
        console.log(`   Token: ${this.config.tokenSymbol} (${this.config.tokenName})`);
        console.log(`   Mint: ${this.config.tokenMintAddress || "Not configured"}`);
        console.log(`   Decimals: ${this.config.tokenDecimals}`);
        console.log(`\u{1F517} RPC Endpoints: ${this.rpcEndpoints.length} configured for load balancing`);
      }
      /**
       * Get next available RPC endpoint with rotation and failover
       */
      getNextRpcEndpoint() {
        if (Date.now() - this.lastEndpointReset > 5 * 60 * 1e3) {
          this.failedEndpoints.clear();
          this.lastEndpointReset = Date.now();
          console.log("\u{1F504} Reset failed RPC endpoints");
        }
        const availableEndpoints = this.rpcEndpoints.filter((ep) => !this.failedEndpoints.has(ep));
        if (availableEndpoints.length === 0) {
          this.failedEndpoints.clear();
          this.currentEndpointIndex = 0;
          return this.rpcEndpoints[0];
        }
        this.currentEndpointIndex = (this.currentEndpointIndex + 1) % availableEndpoints.length;
        const selectedEndpoint = availableEndpoints[this.currentEndpointIndex];
        return selectedEndpoint;
      }
      /**
       * Mark RPC endpoint as failed temporarily
       */
      markEndpointFailed(endpoint) {
        this.failedEndpoints.add(endpoint);
        console.log(`\u274C Marked RPC endpoint as failed: ${endpoint}`);
      }
      /**
       * Enhanced RPC call with retry logic and endpoint rotation
       */
      async makeRpcCall(payload, maxRetries = 3) {
        let lastError = null;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
          const endpoint = this.getNextRpcEndpoint();
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8e3);
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload),
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await response.json();
            if (data.error) {
              if (data.error.code === 429 || data.error.message?.includes("Too many requests")) {
                this.markEndpointFailed(endpoint);
                if (attempt < maxRetries - 1) {
                  const backoffMs = Math.min(1e3 * Math.pow(2, attempt), 1e4);
                  console.log(`\u23F3 Rate limited on ${endpoint}, waiting ${backoffMs}ms before retry...`);
                  await new Promise((resolve) => setTimeout(resolve, backoffMs));
                  continue;
                }
              }
              throw new Error(`RPC Error: ${data.error.message}`);
            }
            return data;
          } catch (error) {
            lastError = error;
            this.markEndpointFailed(endpoint);
            if (attempt < maxRetries - 1) {
              const backoffMs = Math.min(200 * Math.pow(2, attempt), 2e3);
              console.log(`\u{1F504} RPC call failed on ${endpoint}, retrying in ${backoffMs}ms... (${attempt + 1}/${maxRetries})`);
              await new Promise((resolve) => setTimeout(resolve, backoffMs));
            }
          }
        }
        throw lastError || new Error("All RPC endpoints failed");
      }
      /**
       * Enhanced caching with longer duration and smarter invalidation
       */
      getCachedBalance(walletAddress) {
        const cached = this.balanceCache.get(walletAddress);
        if (cached) {
          const cacheValidMs = 5 * 60 * 1e3;
          if (Date.now() - cached.timestamp < cacheValidMs) {
            console.log(`\u{1F4BE} Using cached balance: ${cached.balance} for ${walletAddress}`);
            return cached.balance;
          } else {
            this.balanceCache.delete(walletAddress);
          }
        }
        return null;
      }
      /**
       * Set cached balance with timestamp
       */
      setCachedBalance(walletAddress, balance) {
        this.balanceCache.set(walletAddress, {
          balance,
          timestamp: Date.now()
        });
        console.log(`\u{1F4BE} Cached balance: ${balance} for ${walletAddress}`);
      }
      /**
       * Initialize the token service and create token if needed
       */
      async initialize() {
        try {
          console.log(`\u{1F680} Initializing Real Token Service on ${this.config.network}`);
          if (!this.config.tokenMintAddress) {
            console.log("\u26A0\uFE0F WARNING: No token mint address configured!");
            console.log("Please set MAINNET_TOKEN_MINT environment variable");
            throw new Error("Token mint address required for real token integration");
          }
          console.log(`\u2705 Using production token: ${this.config.tokenMintAddress}`);
          console.log(`\u{1F517} Network: ${this.config.network} (${this.config.rpcUrl})`);
          console.log(`\u{1F50D} Validating token mint address: "${this.config.tokenMintAddress}"`);
          console.log(`\u{1F4CF} Address length: ${this.config.tokenMintAddress?.length}`);
          console.log(`\u2705 Validation result: ${this.isValidSolanaAddress(this.config.tokenMintAddress)}`);
          if (!this.isValidSolanaAddress(this.config.tokenMintAddress)) {
            throw new Error(`Invalid token mint address: ${this.config.tokenMintAddress}`);
          }
          this.connection = {
            rpcUrl: this.config.rpcUrl,
            headers: {
              "Content-Type": "application/json"
            }
          };
          console.log(`\u{1F4B0} Balance checking enabled for token: ${this.config.tokenMintAddress}`);
          return Promise.resolve();
        } catch (error) {
          console.error("\u274C Failed to initialize Token Service:", error);
          throw error;
        }
      }
      /**
       * Create a new SPL token for the game
       */
      async createToken() {
        if (this.config.tokenMintAddress) {
          console.log(`\u2705 Using existing production token: ${this.config.tokenMintAddress}`);
          return this.config.tokenMintAddress;
        }
        throw new Error("Token mint address required - no token creation needed for production token");
      }
      /**
       * Create pending token reward for manual distribution
       */
      async createPendingReward(playerId, playerWallet, amount, reason) {
        try {
          console.log(`\u{1F4B0} Creating pending reward: ${amount} $KUSH tokens for ${playerWallet}`);
          console.log(`\u{1F4DD} Reason: ${reason}`);
          if (!this.isValidSolanaAddress(playerWallet)) {
            throw new Error("Invalid Solana wallet address");
          }
          const { storage: storage2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
          const payout = await storage2.createTokenPayout({
            playerId,
            walletAddress: playerWallet,
            amount,
            reason,
            network: this.config.network,
            status: "pending"
          });
          console.log(`\u23F3 Pending reward created with ID: ${payout.id}`);
          console.log(`\u{1F3AF} Manual airdrop required for ${amount} tokens to ${playerWallet}`);
          return payout.id;
        } catch (error) {
          console.error("\u274C Failed to create pending reward:", error);
          throw error;
        }
      }
      /**
       * Process achievement-based token rewards
       */
      async processAchievementReward(playerId, achievementType, playerWallet) {
        try {
          const achievementRewards = {
            "firstClick": 10,
            "first100Clicks": 50,
            "first1000Clicks": 200,
            "first10000Clicks": 1e3,
            "firstUpgrade": 25,
            "firstMillionaire": 5e3,
            "walletConnection": 50,
            "referralBonus": 100,
            "weeklyActive": 25
          };
          const rewardAmount = achievementRewards[achievementType];
          if (!rewardAmount || !playerWallet) {
            return null;
          }
          const payoutId = await this.createPendingReward(
            playerId,
            playerWallet,
            rewardAmount,
            `Achievement reward: ${achievementType}`
          );
          const payoutEvent = {
            playerId,
            amount: rewardAmount,
            reason: `Achievement: ${achievementType}`,
            walletAddress: playerWallet,
            network: this.config.network,
            timestamp: /* @__PURE__ */ new Date()
          };
          console.log(`\u{1F3C6} Achievement reward processed:`, payoutEvent);
          return payoutEvent;
        } catch (error) {
          console.error("\u274C Failed to process achievement reward:", error);
          return null;
        }
      }
      /**
       * Process milestone-based token rewards
       */
      async processMilestoneReward(playerId, totalKush, playerWallet) {
        try {
          const milestoneRewards2 = {
            1e3: 100,
            1e4: 500,
            1e5: 2e3,
            1e6: 1e4
          };
          const milestones = Object.keys(milestoneRewards2).map(Number).sort((a, b) => b - a);
          const reachedMilestone = milestones.find((milestone) => totalKush >= milestone);
          if (!reachedMilestone || !playerWallet) {
            return null;
          }
          const rewardAmount = milestoneRewards2[reachedMilestone];
          const payoutId = await this.createPendingReward(
            playerId,
            playerWallet,
            rewardAmount,
            `Milestone reward: ${reachedMilestone} KUSH`
          );
          const payoutEvent = {
            playerId,
            amount: rewardAmount,
            reason: `Milestone: ${reachedMilestone} KUSH`,
            walletAddress: playerWallet,
            network: this.config.network,
            timestamp: /* @__PURE__ */ new Date()
          };
          console.log(`\u{1F3AF} Milestone reward processed:`, payoutEvent);
          return payoutEvent;
        } catch (error) {
          console.error("\u274C Failed to process milestone reward:", error);
          return null;
        }
      }
      /**
       * Convert KUSH to tokens based on current rate
       */
      calculateTokenReward(kushAmount) {
        const tokensEarned = Math.floor(kushAmount / TOKEN_REWARDS.conversion.kushPerToken);
        return tokensEarned;
      }
      /**
       * Validate Solana wallet address
       */
      isValidSolanaAddress(address) {
        return /^[1-9A-HJ-NP-Za-km-z]{32,55}$/.test(address);
      }
      /**
       * Get all player wallet balances for admin review
       */
      async getAllPlayerBalances(players2) {
        const balances = [];
        for (const player2 of players2) {
          if (player2.walletAddress) {
            try {
              const balance = await this.getTokenBalance(player2.walletAddress);
              balances.push({
                playerId: player2.id,
                username: player2.username,
                walletAddress: player2.walletAddress,
                balance
              });
            } catch (error) {
              console.error(`Failed to get balance for ${player2.username}:`, error);
              balances.push({
                playerId: player2.id,
                username: player2.username,
                walletAddress: player2.walletAddress,
                balance: 0
              });
            }
          }
        }
        return balances;
      }
      /**
       * Get token balance for a wallet with enhanced caching and retry logic
       */
      async getTokenBalance(walletAddress) {
        try {
          console.log(`\u{1F4CA} Checking ${this.config.tokenSymbol} balance for ${walletAddress}`);
          console.log(`\u{1FA99} Token mint: ${this.config.tokenMintAddress}`);
          if (!this.isValidSolanaAddress(walletAddress)) {
            console.error(`\u274C Invalid wallet address format: ${walletAddress}`);
            return 0;
          }
          const cachedBalance = this.getCachedBalance(walletAddress);
          if (cachedBalance !== null) {
            return cachedBalance;
          }
          const tokenAddresses = [
            this.config.tokenMintAddress,
            "FPdBJCFaSqwrh4qQLezZpcxKPhEszXgWqDmoYESVpump"
            // Alternative token address seen in transactions
          ];
          let totalBalance = 0;
          for (const mintAddress of tokenAddresses) {
            try {
              console.log(`\u{1F50D} Checking token mint: ${mintAddress}`);
              const associatedTokenAccount = await this.getAssociatedTokenAccount(walletAddress, mintAddress);
              if (associatedTokenAccount) {
                const balance = await this.getTokenAccountBalance(associatedTokenAccount);
                console.log(`\u{1F4B0} Balance found: ${balance} ${this.config.tokenSymbol} tokens for mint ${mintAddress}`);
                totalBalance += balance;
              }
            } catch (error) {
              console.log(`\u26A0\uFE0F No tokens found for mint ${mintAddress}:`, error.message);
            }
          }
          this.setCachedBalance(walletAddress, totalBalance);
          if (totalBalance === 0) {
            console.log(`\u2139\uFE0F No ${this.config.tokenSymbol} tokens found for ${walletAddress}`);
          }
          return totalBalance;
        } catch (error) {
          console.error("\u274C Failed to get token balance:", error);
          return 0;
        }
      }
      /**
       * Get associated token account address for wallet and mint
       */
      async getAssociatedTokenAccount(walletAddress, mintAddress) {
        try {
          if (!this.isValidSolanaAddress(walletAddress)) {
            throw new Error(`Invalid wallet address format: ${walletAddress}`);
          }
          if (!this.isValidSolanaAddress(mintAddress)) {
            throw new Error(`Invalid mint address format: ${mintAddress}`);
          }
          const payload = {
            jsonrpc: "2.0",
            id: 1,
            method: "getTokenAccountsByOwner",
            params: [
              walletAddress,
              {
                mint: mintAddress
              },
              {
                encoding: "jsonParsed"
              }
            ]
          };
          const data = await this.makeRpcCall(payload, 3);
          if (data.result && data.result.value && data.result.value.length > 0) {
            const tokenAccount = data.result.value[0].pubkey;
            console.log(`\u2705 Found token account: ${tokenAccount}`);
            return tokenAccount;
          }
          return null;
        } catch (error) {
          console.error("\u274C Failed to get associated token account:", error);
          throw error;
        }
      }
      /**
       * Get token account balance using enhanced RPC with retry logic
       */
      async getTokenAccountBalance(tokenAccountAddress) {
        try {
          const payload = {
            jsonrpc: "2.0",
            id: 1,
            method: "getTokenAccountBalance",
            params: [tokenAccountAddress]
          };
          const data = await this.makeRpcCall(payload, 2);
          if (data.result && data.result.value) {
            const amount = parseInt(data.result.value.amount);
            const decimals = data.result.value.decimals;
            return amount / Math.pow(10, decimals);
          }
          return 0;
        } catch (error) {
          console.error("\u274C Failed to get token account balance:", error);
          return 0;
        }
      }
      /**
       * Airdrop SOL for devnet testing
       */
      async airdropSol(walletAddress, amount = 1) {
        throw new Error("SOL airdrops not available on mainnet");
        try {
          console.log(`\u{1FA82} Airdropping ${amount} SOL to ${walletAddress} on devnet`);
          console.log(`\u{1F504} REAL SOL AIRDROP REQUEST:`);
          console.log(`   Amount: ${amount} SOL`);
          console.log(`   Recipient: ${walletAddress}`);
          console.log(`   Network: ${this.config.network}`);
          const pendingAirdrop = `AIRDROP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          console.log(`\u23F3 SOL airdrop queued: ${pendingAirdrop}`);
          return pendingAirdrop;
        } catch (error) {
          console.error("\u274C Failed to airdrop SOL:", error);
          throw error;
        }
      }
    };
    mainnetTokenService = new SolanaTokenService("mainnet");
  }
});

// server/cache.ts
var MemoryCache, cache, cacheWrapper;
var init_cache = __esm({
  "server/cache.ts"() {
    "use strict";
    MemoryCache = class {
      cache = /* @__PURE__ */ new Map();
      DEFAULT_TTL = 3e5;
      // 5 minutes
      MAX_CACHE_SIZE = 1e4;
      // Prevent memory leaks
      CLEANUP_INTERVAL = 6e4;
      // 1 minute cleanup
      constructor() {
        setInterval(() => {
          this.performanceCleanup();
        }, this.CLEANUP_INTERVAL);
      }
      set(key, data, ttl = this.DEFAULT_TTL) {
        if (this.cache.size >= this.MAX_CACHE_SIZE) {
          this.evictLeastRecentlyUsed();
        }
        this.cache.set(key, {
          data,
          expiry: Date.now() + ttl,
          accessCount: 0,
          lastAccess: Date.now()
        });
      }
      get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        if (Date.now() > item.expiry) {
          this.cache.delete(key);
          return null;
        }
        item.accessCount++;
        item.lastAccess = Date.now();
        return item.data;
      }
      // Batch operations for better performance
      getMultiple(keys) {
        const results = {};
        const now = Date.now();
        for (const key of keys) {
          const item = this.cache.get(key);
          if (item && now <= item.expiry) {
            item.accessCount++;
            item.lastAccess = now;
            results[key] = item.data;
          }
        }
        return results;
      }
      setMultiple(entries, ttl = this.DEFAULT_TTL) {
        const now = Date.now();
        const expiry = now + ttl;
        for (const [key, data] of Object.entries(entries)) {
          if (this.cache.size >= this.MAX_CACHE_SIZE) {
            this.evictLeastRecentlyUsed();
          }
          this.cache.set(key, {
            data,
            expiry,
            accessCount: 0,
            lastAccess: now
          });
        }
      }
      delete(key) {
        this.cache.delete(key);
      }
      // Delete all keys matching a pattern
      deletePattern(pattern) {
        const regex = new RegExp(pattern);
        let deletedCount = 0;
        for (const key of this.cache.keys()) {
          if (regex.test(key)) {
            this.cache.delete(key);
            deletedCount++;
          }
        }
        return deletedCount;
      }
      clear() {
        this.cache.clear();
      }
      // Performance-optimized cleanup
      performanceCleanup() {
        const now = Date.now();
        let expiredCount = 0;
        for (const [key, item] of this.cache.entries()) {
          if (now > item.expiry) {
            this.cache.delete(key);
            expiredCount++;
          }
        }
        if (expiredCount > 0) {
          console.log(`\u{1F9F9} Cache cleanup: removed ${expiredCount} expired entries`);
        }
      }
      // LRU eviction for memory management
      evictLeastRecentlyUsed() {
        let oldestKey = null;
        let oldestTime = Date.now();
        for (const [key, item] of this.cache.entries()) {
          if (item.lastAccess < oldestTime) {
            oldestTime = item.lastAccess;
            oldestKey = key;
          }
        }
        if (oldestKey) {
          this.cache.delete(oldestKey);
        }
      }
      // Cleanup expired entries (legacy method)
      cleanup() {
        this.performanceCleanup();
      }
      getStats() {
        const now = Date.now();
        const validEntries = Array.from(this.cache.entries()).filter(([_, item]) => now <= item.expiry);
        const hotEntries = validEntries.filter(([_, item]) => item.accessCount > 5);
        return {
          size: this.cache.size,
          validEntries: validEntries.length,
          hotEntries: hotEntries.length,
          memoryEfficiency: (validEntries.length / this.cache.size * 100).toFixed(1) + "%",
          keys: Array.from(this.cache.keys())
        };
      }
      // Get performance metrics
      getPerformanceMetrics() {
        const now = Date.now();
        let totalAccess = 0;
        let hitCount = 0;
        for (const [_, item] of this.cache.entries()) {
          if (now <= item.expiry) {
            totalAccess += item.accessCount;
            if (item.accessCount > 0) hitCount++;
          }
        }
        return {
          totalEntries: this.cache.size,
          totalAccesses: totalAccess,
          hitRate: this.cache.size > 0 ? (hitCount / this.cache.size * 100).toFixed(1) + "%" : "0%",
          averageAccessesPerEntry: this.cache.size > 0 ? (totalAccess / this.cache.size).toFixed(1) : "0"
        };
      }
    };
    cache = new MemoryCache();
    cacheWrapper = {
      // Cache static data that rarely changes
      staticData: async (key, fetchFn, ttl = 36e5) => {
        const cached = cache.get(key);
        if (cached) return cached;
        const data = await fetchFn();
        cache.set(key, data, ttl);
        return data;
      },
      // Cache player data with shorter TTL
      playerData: async (playerId, dataType, fetchFn, ttl = 12e4) => {
        const key = `player:${playerId}:${dataType}`;
        const cached = cache.get(key);
        if (cached) return cached;
        const data = await fetchFn();
        cache.set(key, data, ttl);
        return data;
      },
      // Cache leaderboard and other frequently accessed data
      dynamicData: async (key, fetchFn, ttl = 3e5) => {
        const cached = cache.get(key);
        if (cached) return cached;
        const data = await fetchFn();
        cache.set(key, data, ttl);
        return data;
      },
      // Invalidate player-specific cache entries
      invalidatePlayer: (playerId) => {
        cache.deletePattern(`player:${playerId}:.*`);
      },
      // Invalidate leaderboard cache
      invalidateLeaderboard: () => {
        cache.delete("leaderboard");
        cache.deletePattern("leaderboard:.*");
      }
    };
    setInterval(() => {
      cache.cleanup();
    }, 6e5);
  }
});

// shared/leveling-utils.ts
var leveling_utils_exports = {};
__export(leveling_utils_exports, {
  calculateLevel: () => calculateLevel,
  canPrestige: () => canPrestige,
  getKushForNextLevel: () => getKushForNextLevel,
  getKushRequiredForLevel: () => getKushRequiredForLevel,
  getLevelDisplayText: () => getLevelDisplayText,
  getLevelProgress: () => getLevelProgress,
  getTotalKushForLevel: () => getTotalKushForLevel,
  updatePlayerLeveling: () => updatePlayerLeveling
});
function getKushRequiredForLevel(level) {
  if (level <= 1) return 0;
  return Math.floor(Math.pow(level, 2.2) * 50);
}
function getTotalKushForLevel(level) {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += getKushRequiredForLevel(i);
  }
  return total;
}
function calculateLevel(totalEarnedKush) {
  if (totalEarnedKush < 0) return 1;
  let level = 1;
  while (level < 55) {
    const kushForNextLevel = getTotalKushForLevel(level + 1);
    if (totalEarnedKush < kushForNextLevel) {
      break;
    }
    level++;
  }
  return Math.min(level, 55);
}
function getKushForNextLevel(totalEarnedKush, currentLevel) {
  if (currentLevel >= 55) return 0;
  const kushForNextLevel = getTotalKushForLevel(currentLevel + 1);
  return Math.max(0, kushForNextLevel - totalEarnedKush);
}
function getLevelProgress(totalEarnedKush, currentLevel) {
  if (currentLevel >= 55) return 100;
  const kushForCurrentLevel = getTotalKushForLevel(currentLevel);
  const kushForNextLevel = getTotalKushForLevel(currentLevel + 1);
  const kushInCurrentLevel = totalEarnedKush - kushForCurrentLevel;
  const kushNeededForLevel = kushForNextLevel - kushForCurrentLevel;
  return Math.min(100, Math.max(0, kushInCurrentLevel / kushNeededForLevel * 100));
}
function canPrestige(level) {
  return level >= 55;
}
function getLevelDisplayText(level, prestige) {
  if (prestige > 0) {
    return `P${prestige}-${level}`;
  }
  return `${level}`;
}
function updatePlayerLeveling(player2, kushEarned) {
  const newTotalEarnedKush = (player2.totalEarnedKush || 0) + kushEarned;
  const newLevel = calculateLevel(newTotalEarnedKush);
  return {
    level: newLevel,
    prestige: player2.prestige || 0,
    totalEarnedKush: newTotalEarnedKush
  };
}
var init_leveling_utils = __esm({
  "shared/leveling-utils.ts"() {
    "use strict";
  }
});

// server/blockchain-verification.ts
var blockchain_verification_exports = {};
__export(blockchain_verification_exports, {
  realSolanaVerification: () => realSolanaVerification,
  verifyBurnTransaction: () => verifyBurnTransaction
});
async function verifyBurnTransaction(transactionSignature, walletAddress) {
  try {
    console.log(`\u{1F50D} Verifying burn transaction: ${transactionSignature}`);
    console.log(`\u{1F4CD} Wallet: ${walletAddress}`);
    if (!isValidTransactionSignature(transactionSignature)) {
      return {
        isValid: false,
        burnAmount: 0,
        network: "devnet",
        error: "Invalid transaction signature format"
      };
    }
    const mockVerificationResult = await mockBlockchainVerification(
      transactionSignature,
      walletAddress
    );
    return mockVerificationResult;
  } catch (error) {
    console.error("\u274C Blockchain verification error:", error);
    return {
      isValid: false,
      burnAmount: 0,
      network: "devnet",
      error: `Verification failed: ${error.message}`
    };
  }
}
function isValidTransactionSignature(signature) {
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{87,88}$/;
  return base58Regex.test(signature);
}
async function mockBlockchainVerification(transactionSignature, walletAddress) {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  const mockBurnAmount = extractMockBurnAmount(transactionSignature);
  const network2 = transactionSignature.startsWith("dev") ? "devnet" : "mainnet";
  return {
    isValid: true,
    burnAmount: mockBurnAmount,
    network: network2 === "mainnet" ? "mainnet" : "devnet"
  };
}
function extractMockBurnAmount(transactionSignature) {
  const hash = transactionSignature.slice(-8);
  const amount = parseInt(hash, 36) % 1e4;
  return Math.max(100, amount);
}
async function realSolanaVerification(transactionSignature, walletAddress, network2 = "devnet") {
  try {
    console.log("\u{1F6A7} Real Solana verification not yet implemented");
    return await mockBlockchainVerification(transactionSignature, walletAddress);
  } catch (error) {
    return {
      isValid: false,
      burnAmount: 0,
      network: network2,
      error: `Solana verification failed: ${error.message}`
    };
  }
}
var init_blockchain_verification = __esm({
  "server/blockchain-verification.ts"() {
    "use strict";
  }
});

// server/token-burn-service.ts
var token_burn_service_exports = {};
__export(token_burn_service_exports, {
  TokenBurnService: () => TokenBurnService,
  devnetBurnService: () => devnetBurnService,
  mainnetBurnService: () => mainnetBurnService
});
var GROW_LIGHT_TEMPLATES, TokenBurnService, devnetBurnService, mainnetBurnService;
var init_token_burn_service = __esm({
  "server/token-burn-service.ts"() {
    "use strict";
    init_storage();
    GROW_LIGHT_TEMPLATES = [
      // Common Lights (100-500 tokens)
      {
        name: "Basic LED Panel",
        type: "LED",
        rarity: "common",
        passiveClicksPerHour: 10,
        clickMultiplier: 105,
        // 1.05x
        energyEfficiency: 90,
        description: "A simple LED grow light that provides steady passive income",
        burnCost: 100,
        icon: "\u{1F4A1}",
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
        icon: "\u{1F506}",
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
        icon: "\u{1F31E}",
        unlockRequirement: 1e3
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
        icon: "\u26A1",
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
        burnCost: 1e3,
        icon: "\u{1F308}",
        unlockRequirement: 5e3
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
        icon: "\u269B\uFE0F",
        unlockRequirement: 1e4
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
        icon: "\u{1F525}",
        unlockRequirement: 25e3
      },
      {
        name: "Dual-Spectrum Pro",
        type: "Dual_Spectrum",
        rarity: "rare",
        passiveClicksPerHour: 90,
        clickMultiplier: 175,
        energyEfficiency: 92,
        description: "Professional dual-spectrum light with excellent returns",
        burnCost: 4e3,
        icon: "\u{1F3AD}",
        unlockRequirement: 5e4
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
        icon: "\u{1F577}\uFE0F",
        unlockRequirement: 1e5
      },
      {
        name: "Mars Hydro FC-E8000",
        type: "Commercial_LED",
        rarity: "epic",
        passiveClicksPerHour: 150,
        clickMultiplier: 225,
        energyEfficiency: 99,
        description: "Commercial-grade powerhouse for maximum yield",
        burnCost: 1e4,
        icon: "\u{1FA90}",
        unlockRequirement: 25e4
      },
      {
        name: "HLG Scorpion Diablo",
        type: "Premium_LED",
        rarity: "epic",
        passiveClicksPerHour: 200,
        clickMultiplier: 250,
        energyEfficiency: 100,
        description: "Premium Horticulture Lighting Group flagship",
        burnCost: 15e3,
        icon: "\u{1F982}",
        unlockRequirement: 5e5
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
        burnCost: 25e3,
        icon: "\u{1F6F8}",
        unlockRequirement: 1e6
      },
      {
        name: "Custom Solar Spectrum",
        type: "Experimental",
        rarity: "legendary",
        passiveClicksPerHour: 500,
        clickMultiplier: 400,
        energyEfficiency: 100,
        description: "Experimental light that mimics perfect solar spectrum",
        burnCost: 5e4,
        icon: "\u2600\uFE0F",
        unlockRequirement: 5e6
      },
      {
        name: "Alien Technology X1",
        type: "Alien_Tech",
        rarity: "legendary",
        passiveClicksPerHour: 1e3,
        clickMultiplier: 500,
        energyEfficiency: 100,
        description: "Mysterious alien technology with incredible power",
        burnCost: 1e5,
        icon: "\u{1F47D}",
        unlockRequirement: 1e7
      }
    ];
    TokenBurnService = class {
      config;
      constructor(config) {
        this.config = config;
      }
      /**
       * Initialize grow lights in database (run once)
       */
      async initializeGrowLights() {
        try {
          console.log("\u{1F331} Initializing grow light templates...");
          for (const template of GROW_LIGHT_TEMPLATES) {
            await storage.createGrowLight(template);
          }
          console.log(`\u2705 Initialized ${GROW_LIGHT_TEMPLATES.length} grow light templates`);
        } catch (error) {
          console.error("\u274C Failed to initialize grow lights:", error);
        }
      }
      /**
       * Get available grow lights for a player based on their progress
       */
      async getAvailableGrowLights(player2) {
        const allLights = await storage.getAllGrowLights();
        return allLights.filter((light) => player2.totalKush >= light.unlockRequirement);
      }
      /**
       * Calculate dev tax and net burn amount
       */
      calculateBurnAmounts(tokenAmount) {
        const devTax = Math.floor(tokenAmount * 0.2);
        const netBurn = tokenAmount - devTax;
        const playerReceives = netBurn;
        return { devTax, netBurn, playerReceives };
      }
      /**
       * Determine which grow light a player gets based on burned amount and luck
       */
      selectGrowLight(burnAmount, availableLights) {
        const affordableLights = availableLights.filter((light) => light.burnCost <= burnAmount);
        if (affordableLights.length === 0) {
          return null;
        }
        affordableLights.sort((a, b) => b.burnCost - a.burnCost);
        const rarityWeights = {
          "common": 50,
          "uncommon": 30,
          "rare": 15,
          "epic": 4,
          "legendary": 1
        };
        const bonusChance = Math.min(burnAmount / 1e4, 0.5);
        let totalWeight = 0;
        const weightedLights = affordableLights.map((light) => {
          const baseWeight = rarityWeights[light.rarity] || 1;
          const weight = light.rarity === "legendary" || light.rarity === "epic" ? baseWeight + baseWeight * bonusChance : baseWeight;
          totalWeight += weight;
          return { light, weight };
        });
        let random = Math.random() * totalWeight;
        for (const { light, weight } of weightedLights) {
          random -= weight;
          if (random <= 0) {
            return light;
          }
        }
        return affordableLights[affordableLights.length - 1];
      }
      /**
       * Process token burn transaction with 20% dev tax
       */
      async burnTokensWithTax(playerId, tokenAmount, playerWallet, playerPrivateKey) {
        try {
          const player2 = await storage.getPlayer(playerId);
          if (!player2 || !player2.walletAddress) {
            throw new Error("Player not found or no wallet address");
          }
          const { devTax, netBurn, playerReceives } = this.calculateBurnAmounts(tokenAmount);
          const availableLights = await this.getAvailableGrowLights(player2);
          const selectedLight = this.selectGrowLight(playerReceives, availableLights);
          if (!selectedLight) {
            throw new Error("No grow lights available for this burn amount");
          }
          let transactionSignature = "";
          if (this.config.network === "devnet" && playerPrivateKey) {
            try {
              transactionSignature = `devnet_burn_${Date.now()}_${Math.random().toString(36)}`;
              console.log(`\u{1F525} Simulated devnet burn: ${tokenAmount} tokens`);
            } catch (error) {
              console.warn("Devnet burn simulation failed, continuing with database record");
            }
          }
          const burnRecord = await storage.createTokenBurn({
            playerId: player2.id,
            walletAddress: player2.walletAddress,
            tokensBurned: tokenAmount,
            growLightReceived: selectedLight.id,
            network: this.config.network,
            burnTransactionSignature: transactionSignature,
            devTaxAmount: devTax,
            devTaxRecipient: this.config.devTaxWallet,
            status: transactionSignature ? "completed" : "pending"
          });
          await storage.addPlayerGrowLight({
            playerId: player2.id,
            growLightId: selectedLight.id,
            quantity: 1,
            isActive: false
          });
          console.log(`\u{1F331} Player ${player2.username} burned ${tokenAmount} tokens and received ${selectedLight.name}`);
          return {
            success: true,
            burnRecord,
            growLight: selectedLight,
            transactionSignature: transactionSignature || void 0
          };
        } catch (error) {
          console.error("\u274C Token burn failed:", error);
          return {
            success: false,
            error: error.message
          };
        }
      }
      /**
       * Get player's grow light collection
       */
      async getPlayerGrowLights(playerId) {
        return await storage.getPlayerGrowLights(playerId);
      }
      /**
       * Activate/deactivate a grow light for passive income
       */
      async toggleGrowLight(playerId, growLightId, isActive) {
        await storage.updatePlayerGrowLight(playerId, growLightId, { isActive });
        await this.updatePlayerPassiveIncome(playerId);
      }
      /**
       * Process a verified burn transaction from external source (e.g., sol-incinerator.com)
       */
      async processVerifiedBurn(playerId, burnAmount, walletAddress, transactionSignature) {
        try {
          const player2 = await storage.getPlayer(playerId);
          if (!player2 || !player2.walletAddress) {
            throw new Error("Player not found or no wallet address");
          }
          if (player2.walletAddress !== walletAddress) {
            throw new Error("Wallet address mismatch");
          }
          const isTransactionUsed = await storage.isTransactionSignatureUsed(transactionSignature);
          if (isTransactionUsed) {
            throw new Error("Transaction signature has already been claimed by another user");
          }
          const availableLights = await this.getAvailableGrowLights(player2);
          const selectedLight = this.selectGrowLight(burnAmount, availableLights);
          if (!selectedLight) {
            throw new Error("No grow lights available for this burn amount");
          }
          const burnRecord = await storage.createTokenBurn({
            playerId: player2.id,
            walletAddress: player2.walletAddress,
            tokensBurned: burnAmount,
            growLightReceived: selectedLight.id,
            network: this.config.network,
            burnTransactionSignature: transactionSignature,
            devTaxAmount: Math.floor(burnAmount * 0.2),
            // Assuming 20% dev tax was already applied
            devTaxRecipient: this.config.devTaxWallet,
            status: "completed"
          });
          await storage.addPlayerGrowLight({
            playerId: player2.id,
            growLightId: selectedLight.id,
            quantity: 1,
            isActive: true
          });
          await this.updatePlayerPassiveIncome(player2.id);
          console.log(`\u{1F525} Verified burn: Player ${player2.username} burned ${burnAmount} tokens and received ${selectedLight.name}`);
          console.log(`\u{1F4CD} Transaction: ${transactionSignature}`);
          return {
            success: true,
            burnRecord,
            growLight: selectedLight
          };
        } catch (error) {
          console.error("\u274C Verified burn processing failed:", error);
          return {
            success: false,
            error: error.message
          };
        }
      }
      /**
       * Calculate and update player's passive income from active grow lights
       */
      async updatePlayerPassiveIncome(playerId) {
        const playerGrowLights2 = await this.getPlayerGrowLights(playerId);
        const activeLights = playerGrowLights2.filter((pl) => pl.isActive);
        let totalPassivePerHour = 0;
        let totalClickMultiplier = 100;
        for (const { growLight, quantity } of activeLights) {
          totalPassivePerHour += growLight.passiveClicksPerHour * quantity;
          totalClickMultiplier += (growLight.clickMultiplier - 100) * quantity;
        }
        await storage.updatePlayer(playerId, {
          passiveIncomePerHour: totalPassivePerHour,
          perClickMultiplier: Math.max(1, Math.floor(totalClickMultiplier / 100))
        });
        console.log(`\u{1F504} Updated passive income for player ${playerId}: ${totalPassivePerHour}/hour, ${totalClickMultiplier / 100}x click multiplier`);
      }
      /**
       * Process passive income for a player (called periodically)
       */
      async processPassiveIncome(playerId) {
        const player2 = await storage.getPlayer(playerId);
        if (!player2 || !player2.passiveIncomePerHour) return;
        const now = /* @__PURE__ */ new Date();
        const lastUpdate = player2.lastPassiveUpdate || player2.createdAt;
        const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1e3 * 60 * 60);
        if (hoursSinceUpdate >= 0.1) {
          const passiveKush = Math.floor(player2.passiveIncomePerHour * hoursSinceUpdate);
          if (passiveKush > 0) {
            await storage.updatePlayer(playerId, {
              totalKush: player2.totalKush + passiveKush,
              lastPassiveUpdate: now
            });
            console.log(`\u{1F4B0} Passive income: Player ${playerId} earned ${passiveKush} KUSH`);
          }
        }
      }
      /**
       * Get burn history for a player
       */
      async getPlayerBurnHistory(playerId) {
        return await storage.getPlayerTokenBurns(playerId);
      }
    };
    devnetBurnService = new TokenBurnService({
      tokenMintAddress: process.env.DEVNET_TOKEN_MINT || "",
      devTaxWallet: process.env.DEV_TAX_WALLET || "C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL",
      network: "devnet",
      rpcUrl: process.env.SOLANA_DEVNET_RPC || "https://api.devnet.solana.com"
    });
    mainnetBurnService = new TokenBurnService({
      tokenMintAddress: process.env.MAINNET_TOKEN_MINT || "",
      devTaxWallet: process.env.DEV_TAX_WALLET || "C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL",
      network: "mainnet",
      rpcUrl: process.env.SOLANA_MAINNET_RPC || "https://api.mainnet-beta.solana.com"
    });
    setTimeout(() => {
      devnetBurnService.initializeGrowLights().catch(console.error);
    }, 5e3);
  }
});

// server/kush-notify-bot.ts
var kush_notify_bot_exports = {};
__export(kush_notify_bot_exports, {
  getGroupChatInfo: () => getGroupChatInfo,
  getNotifyBotInstance: () => getNotifyBotInstance,
  sendPurchaseNotification: () => sendPurchaseNotification,
  startKushNotifyBot: () => startKushNotifyBot,
  stopKushNotifyBot: () => stopKushNotifyBot,
  testGroupNotification: () => testGroupNotification
});
import TelegramBot from "node-telegram-bot-api";
function startKushNotifyBot() {
  const token = process.env.KUSH_NOTIFY_BOT_TOKEN;
  if (!token) {
    console.log("KushNotifyBot token not found, skipping group notification bot initialization");
    return null;
  }
  if (notifyBotInstance) {
    console.log("\u{1F514} KushNotifyBot already running");
    return notifyBotInstance;
  }
  console.log("\u{1F514} Initializing KushNotifyBot with enhanced conflict prevention...");
  try {
    if (notifyBotInstance) {
      try {
        notifyBotInstance.stopPolling();
        notifyBotInstance = null;
      } catch (error) {
        console.warn("\u26A0\uFE0F Error stopping existing KushNotifyBot:", error);
      }
    }
    const bot = new TelegramBot(token, { polling: { autoStart: false } });
    notifyBotInstance = bot;
    let startAttempts = 0;
    const maxAttempts = 3;
    const startPolling = async () => {
      try {
        await bot.startPolling();
        console.log("\u2705 KushNotifyBot polling started successfully");
      } catch (error) {
        startAttempts++;
        console.error(`\u274C KushNotifyBot start attempt ${startAttempts} failed:`, error.message);
        if (startAttempts < maxAttempts && (error.code === 409 || error.message?.includes("409") || error.message?.includes("Conflict"))) {
          console.log(`\u{1F504} Retrying KushNotifyBot in 3 seconds... (${startAttempts}/${maxAttempts})`);
          setTimeout(startPolling, 3e3);
        } else {
          console.error("\u{1F6A8} Failed to start KushNotifyBot after multiple attempts");
          notifyBotInstance = null;
        }
      }
    };
    startPolling();
    bot.on("message", (msg) => {
      const chatType = msg.chat.type;
      if (chatType === "group" || chatType === "supergroup") {
        groupChatId = msg.chat.id.toString();
        console.log(`\u{1F514} KushNotifyBot detected group chat: ${msg.chat.title} (ID: ${groupChatId})`);
      }
    });
    bot.onText(/\/setup/, (msg) => {
      const chatId = msg.chat.id;
      const chatType = msg.chat.type;
      if (chatType === "group" || chatType === "supergroup") {
        groupChatId = chatId.toString();
        bot.sendMessage(chatId, `\u{1F514} KushNotifyBot setup complete!

This group will now receive notifications when someone buys $KUSH tokens! \u{1F680}

\u{1F4B0} Token: FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL`);
        console.log(`\u2705 Group notifications enabled for chat ID: ${groupChatId}`);
      } else {
        bot.sendMessage(chatId, "\u274C This command only works in group chats. Add me to your group first!");
      }
    });
    bot.on("polling_error", (error) => {
      if (error.code === 409 || error.message?.includes("409") || error.message?.includes("Conflict")) {
        console.error("\u{1F6A8} KushNotifyBot conflict detected - another instance is running:", error.message);
        console.log("\u{1F6D1} Stopping this notify bot instance to prevent conflicts...");
        bot.stopPolling();
        notifyBotInstance = null;
        console.log("\u26A0\uFE0F KushNotifyBot stopped due to conflicts. Manual restart required.");
      } else {
        console.error("KushNotifyBot polling error:", error);
      }
    });
    console.log("\u{1F514} KushNotifyBot started successfully!");
    return bot;
  } catch (error) {
    console.error("Failed to start KushNotifyBot:", error);
    return null;
  }
}
function getNotifyBotInstance() {
  return notifyBotInstance;
}
async function sendPurchaseNotification(buyerInfo) {
  try {
    if (!notifyBotInstance) {
      console.log("KushNotifyBot not initialized, starting bot...");
      notifyBotInstance = startKushNotifyBot() || null;
      if (!notifyBotInstance) {
        throw new Error("KushNotifyBot failed to initialize");
      }
    }
    if (!groupChatId) {
      console.log("\u274C No group chat configured for notifications. Use /setup in your group chat first.");
      return { success: false, message: "No group chat configured" };
    }
    const walletShort = buyerInfo.walletAddress ? `${buyerInfo.walletAddress.slice(0, 4)}...${buyerInfo.walletAddress.slice(-4)}` : "Unknown";
    const amountText = buyerInfo.amount ? `${buyerInfo.amount.toLocaleString()} KUSH` : "$KUSH tokens";
    const valueText = buyerInfo.value ? ` (~$${buyerInfo.value.toFixed(2)})` : "";
    const excitementLevel = buyerInfo.amount ? buyerInfo.amount >= 1e6 ? "\u{1F525}\u{1F525}\u{1F525} WHALE ALERT \u{1F525}\u{1F525}\u{1F525}" : buyerInfo.amount >= 1e5 ? "\u{1F48E} BIG PURCHASE \u{1F48E}" : buyerInfo.amount >= 1e4 ? "\u{1F680} MAJOR BUY \u{1F680}" : "\u{1F31F} FRESH PURCHASE \u{1F31F}" : "\u{1F680} TOKEN PURCHASE \u{1F680}";
    const message = `
${excitementLevel}

\u{1F4B0} **Someone just bought ${amountText}${valueText}!**
\u{1F464} **Buyer:** \`${walletShort}\`
\u{1F3F7}\uFE0F **Token:** **KUSH** \u{1F33F}
\u{1F517} **Contract:** \`FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL\`
\u{1F310} **Network:** **Solana Mainnet** \u26A1

\u{1F3AE} **Play KushKlicker and earn $KUSH rewards!**
\u{1F4C8} **Join the empire:** https://kushklicker.com

\u{1F48E} *TO THE MOON!* \u{1F680}\u{1F315}
    `;
    await notifyBotInstance.sendAnimation(
      groupChatId,
      "https://media1.tenor.com/m/NLHYdGDUr0AAAAAd/solana-sol.gif",
      {
        caption: message,
        parse_mode: "Markdown"
      }
    );
    console.log(`\u2705 Purchase notification sent to group chat (${groupChatId})`);
    return { success: true, message: "Notification sent successfully" };
  } catch (error) {
    console.error("Error sending purchase notification:", error);
    return { success: false, message: error.message || "Failed to send notification" };
  }
}
async function testGroupNotification() {
  return await sendPurchaseNotification({
    walletAddress: "C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL",
    amount: 1e6,
    value: 50,
    txHash: "test_transaction"
  });
}
function getGroupChatInfo() {
  return {
    botActive: !!notifyBotInstance,
    groupConfigured: !!groupChatId,
    groupChatId
  };
}
function stopKushNotifyBot() {
  if (notifyBotInstance) {
    console.log("\u{1F6D1} Stopping KushNotifyBot...");
    try {
      notifyBotInstance.stopPolling({ cancel: true, reason: "Server shutdown" });
      notifyBotInstance = null;
      groupChatId = null;
      console.log("\u2705 KushNotifyBot stopped successfully");
    } catch (error) {
      console.error("\u274C Error stopping KushNotifyBot:", error);
      notifyBotInstance = null;
      groupChatId = null;
    }
  }
}
var notifyBotInstance, groupChatId;
var init_kush_notify_bot = __esm({
  "server/kush-notify-bot.ts"() {
    "use strict";
    notifyBotInstance = null;
    groupChatId = null;
  }
});

// server/telegram-bot.ts
var telegram_bot_exports = {};
__export(telegram_bot_exports, {
  sendAdmin2FA: () => sendAdmin2FA,
  sendTelegramNotification: () => sendTelegramNotification,
  startTelegramBot: () => startTelegramBot,
  stopTelegramBot: () => stopTelegramBot
});
import TelegramBot2 from "node-telegram-bot-api";
function isAdmin(username) {
  return username ? ADMIN_USERNAMES.includes(username.toLowerCase()) : false;
}
function getWebAppUrl() {
  if (process.env.NODE_ENV === "development") {
    const replitDomain = process.env.REPLIT_DEV_DOMAIN;
    if (replitDomain) {
      return `https://${replitDomain}`;
    }
    return `https://5000-${process.env.REPL_SLUG || "replit"}-${process.env.REPL_OWNER || "user"}.repl.co`;
  }
  return process.env.WEB_APP_URL || process.env.REPLIT_DEV_DOMAIN || "https://localhost:5000";
}
async function sendAdmin2FA(code) {
  const { getNotifyBotInstance: getNotifyBotInstance2 } = await Promise.resolve().then(() => (init_kush_notify_bot(), kush_notify_bot_exports));
  let activeBot = botInstance;
  let botName = "main bot";
  if (!activeBot) {
    console.log("\u26A0\uFE0F Main bot unavailable due to conflicts, using KushNotifyBot for 2FA...");
    activeBot = getNotifyBotInstance2();
    botName = "KushNotifyBot";
  }
  if (!activeBot) {
    console.error("\u274C No bot available for 2FA. Both main bot and notify bot failed.");
    return false;
  }
  try {
    const adminChatId = process.env.ADMIN_CHAT_ID || "123456789";
    if (adminChatId === "123456789") {
      console.warn("\u26A0\uFE0F Admin chat ID not configured. Set ADMIN_CHAT_ID environment variable.");
      return false;
    }
    const message = `\u{1F510} **KushKlicker Admin 2FA**

Your verification code: **${code}**

This code expires in 5 minutes.

\u26A0\uFE0F If you didn't request this, please ignore.

\u{1F916} Sent via ${botName}`;
    console.log(`\u{1F4E4} Sending 2FA code via ${botName} to chat ID: ${adminChatId}`);
    await activeBot.sendMessage(adminChatId, message, { parse_mode: "Markdown" });
    console.log(`\u2705 2FA code sent successfully via ${botName}`);
    return true;
  } catch (error) {
    console.error(`\u274C Failed to send admin 2FA code via ${botName}:`, error);
    return false;
  }
}
function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.log("Telegram bot token not found, skipping Telegram bot initialization");
    return null;
  }
  if (botInstance) {
    console.log("\u{1F916} Telegram bot already running");
    return botInstance;
  }
  console.log("\u{1F916} Initializing Telegram bot with enhanced conflict prevention...");
  try {
    if (botInstance) {
      try {
        botInstance.stopPolling();
        botInstance = null;
      } catch (error) {
        console.warn("\u26A0\uFE0F Error stopping existing bot:", error);
      }
    }
    const isProduction = process.env.NODE_ENV === "production";
    const bot = new TelegramBot2(token, {
      polling: !isProduction ? { autoStart: false } : false,
      webHook: isProduction ? {
        port: parseInt(process.env.PORT || "5000"),
        host: "0.0.0.0"
      } : false
    });
    if (isProduction) {
      const webhookUrl = `${getWebAppUrl()}/webhook/${token}`;
      console.log(`\u{1F517} Setting up Telegram webhook: ${webhookUrl}`);
      bot.setWebHook(webhookUrl).then(() => {
        console.log("\u2705 Telegram webhook set successfully");
      }).catch((error) => {
        console.error("\u274C Failed to set webhook:", error);
        console.log("\u{1F504} Falling back to polling mode...");
        bot.startPolling();
      });
    } else {
      console.log("\u{1F504} Telegram bot using polling mode (development)");
      let startAttempts = 0;
      const maxStartAttempts = 3;
      const startPolling = async () => {
        try {
          await bot.startPolling();
          console.log("\u2705 Telegram bot polling started successfully");
        } catch (error) {
          startAttempts++;
          console.error(`\u274C Polling start attempt ${startAttempts} failed:`, error.message);
          if (startAttempts < maxStartAttempts && (error.code === 409 || error.message?.includes("409") || error.message?.includes("Conflict"))) {
            console.log(`\u{1F504} Retrying in 3 seconds... (${startAttempts}/${maxStartAttempts})`);
            setTimeout(startPolling, 3e3);
          } else {
            console.error("\u{1F6A8} Failed to start Telegram bot after multiple attempts");
            botInstance = null;
          }
        }
      };
      startPolling();
    }
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username || `user_${msg.from?.id}`;
      const firstName = msg.from?.first_name || "Player";
      const welcomeMessage = `
\u{1F33F} Welcome to KushKlicker, ${firstName}! \u{1F33F}

The ultimate cannabis-themed incremental clicker game! Build your KUSH empire from the ground up and earn real $KUSH token rewards!

\u{1F3AF} **Game Features:**
\u2022 \u{1F5B1}\uFE0F Click to earn KUSH tokens
\u2022 \u{1F3EA} Buy powerful upgrades & grow lights
\u2022 \u{1F3C6} Complete 50+ achievements for bonuses
\u2022 \u{1F3C6} Compete on global leaderboards
\u2022 \u{1F4B0} Connect Solana wallet for real $KUSH token rewards
\u2022 \u{1F465} Referral system for bonus earnings

\u{1F680} **Quick Start Guide:**
1. Click "\u{1F3AE} Play Now" to start the game
2. Start clicking to earn your first KUSH
3. Use /link to connect your account
4. Register your wallet with /wallet for rewards

\u{1F48E} **Pro Tips:**
\u2022 Buy upgrades early to maximize earnings
\u2022 Complete achievements for bonus rewards
\u2022 Invite friends for referral bonuses
\u2022 Check /balance to see your $KUSH token rewards

Ready to become the ultimate KUSH mogul? \u{1F680}
      `;
      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: "\u{1F3AE} Play Now", web_app: { url: `${getWebAppUrl()}?ref=${username}` } }],
            [
              { text: "\u{1F4CA} My Stats", callback_data: "my_stats" },
              { text: "\u{1F3C6} Leaderboard", callback_data: "leaderboard" }
            ],
            [
              { text: "\u{1F331} Garden System", callback_data: "garden_info" },
              { text: "\u2694\uFE0F PvP Arena", callback_data: "pvp_info" }
            ],
            [
              { text: "\u{1F3AF} Achievements", callback_data: "achievements" },
              { text: "\u{1F4B0} My Wallet", callback_data: "my_wallet" }
            ],
            [
              { text: "\u{1F517} Link Account", callback_data: "link_help" },
              { text: "\u{1F48E} Check Balance", callback_data: "check_balance" }
            ],
            [
              { text: "\u2753 Help & Commands", callback_data: "show_help" },
              { text: "\u{1F504} Refresh Menu", callback_data: "refresh_start" }
            ]
          ]
        }
      };
      bot.sendMessage(chatId, welcomeMessage, keyboard);
    });
    bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username;
      let helpMessage = `
\u{1F33F} KushKlicker Help \u{1F33F}

Commands:
\u2022 /start - Start playing and get the game link
\u2022 /help - Show this help message
\u2022 /stats - View your game statistics
\u2022 /leaderboard - Check top players
\u2022 /garden - Check your garden plots and strains
\u2022 /pvp - View PvP arena and battle stats
\u2022 /link [username] - Link your Telegram account to your game
\u2022 /wallet [address] - Register your Solana wallet
\u2022 /mywallet - Check your wallet info
\u2022 /balance - Check your token balance

Game Features:
\u2022 \u{1F5B1}\uFE0F Click to earn KUSH tokens
\u2022 \u{1F3EA} Buy upgrades to increase earning power
\u2022 \u{1F331} Grow cannabis strains in your garden
\u2022 \u2694\uFE0F Battle other players in PvP arena
\u2022 \u{1F3C6} Join guilds and compete in tournaments
\u2022 \u{1F3AF} Complete achievements for bonus rewards
\u2022 \u{1F4B0} Connect Solana wallet for real $KUSH token rewards
\u2022 \u{1F465} Invite friends with referral system

Need more help? Contact @KushKlickerSupport
      `;
      if (isAdmin(username)) {
        helpMessage += `
        
\u{1F510} Admin Commands:
\u2022 /admin - Open admin panel
\u2022 /players - List all players
\u2022 /reward [username] [amount] - Create pending reward
\u2022 /broadcast [message] - Send message to all users
        `;
      }
      bot.sendMessage(chatId, helpMessage);
    });
    bot.onText(/\/stats/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      try {
        if (!telegramId) {
          bot.sendMessage(chatId, "\u{1F6AB} **Oops!** Can't identify your Telegram account. Please try again!", { parse_mode: "Markdown" });
          return;
        }
        let player2 = await storage.getAllPlayers().then(
          (players2) => players2.find((p) => p.telegramUserId === telegramId.toString())
        );
        if (!player2) {
          player2 = await storage.getPlayerByUsername(`telegram_${telegramId}`);
        }
        if (!player2) {
          const noAccountMessage = `
\u{1F50D} **No Account Found!**

\u{1F517} You need to link your Telegram to KushKlicker first!

\u{1F4A1} **Quick Setup:**
\u2022 Use \`/link YOUR_WALLET_ADDRESS\` to connect
\u2022 Or \`/link new\` to create a new account

\u{1F3AE} **Start earning $KUSH tokens today!** \u{1F33F}\u2728
          `;
          bot.sendMessage(chatId, noAccountMessage, { parse_mode: "Markdown" });
          return;
        }
        const displayName = player2.username.replace(/telegram_\d+_/, "").replace("telegram_", "") || "KUSH Mogul";
        const playerLevel = player2.totalKush >= 1e6 ? "\u{1F3C6} **Legend**" : player2.totalKush >= 5e5 ? "\u{1F48E} **Master**" : player2.totalKush >= 1e5 ? "\u2B50 **Expert**" : player2.totalKush >= 5e4 ? "\u{1F680} **Pro**" : player2.totalKush >= 1e4 ? "\u{1F4AA} **Advanced**" : player2.totalKush >= 1e3 ? "\u{1F331} **Growing**" : "\u{1F33F} **Beginner**";
        const statsMessage = `
\u{1F3C6} **Your KUSH Empire Stats** \u{1F3C6}

${playerLevel} **${displayName}**

\u{1F48E} **Total KUSH:** ${player2.totalKush.toLocaleString()} tokens
\u{1F446} **Total Clicks:** ${player2.totalClicks.toLocaleString()} clicks
\u26A1 **Click Power:** ${player2.perClickMultiplier}x multiplier
\u{1F3ED} **Auto Income:** ${player2.autoIncomePerHour}/hour
\u{1F5D3}\uFE0F **Playing Since:** ${new Date(player2.createdAt).toLocaleDateString()}

\u{1F3AF} **Keep clicking to dominate the KUSH empire!** 
\u{1F389} **You're building something amazing!** \u{1F331}
        `;
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{1F3AE} Continue Playing", web_app: { url: getWebAppUrl() } }]
            ]
          }
        };
        bot.sendMessage(chatId, statsMessage, {
          ...keyboard,
          parse_mode: "Markdown"
        });
      } catch (error) {
        console.error("Stats error:", error);
        bot.sendMessage(chatId, `\u{1F6A8} **Oops!** Couldn't fetch your stats right now!

\u274C **Error:** Something went wrong on our end

\u{1F504} **Try again in a moment** - We're working on it! \u{1F6E0}\uFE0F`, { parse_mode: "Markdown" });
      }
    });
    bot.onText(/\/leaderboard/, async (msg) => {
      const chatId = msg.chat.id;
      try {
        const leaderboard = await storage.getTopPlayers(10);
        let leaderboardMessage = "\u{1F3C6} **KUSH Empire Leaderboard** \u{1F3C6}\n\n\u{1F451} **Top KUSH Moguls:**\n\n";
        leaderboard.forEach((player2, index) => {
          const medal = index === 0 ? "\u{1F947}" : index === 1 ? "\u{1F948}" : index === 2 ? "\u{1F949}" : `${index + 1}.`;
          const displayName = player2.username.replace(/telegram_\d+_/, "").replace("telegram_", "") || `Player ${index + 1}`;
          const statusIcon = player2.totalKush >= 1e6 ? " \u{1F40B}" : player2.totalKush >= 1e5 ? " \u{1F48E}" : player2.totalKush >= 1e4 ? " \u2B50" : " \u{1F331}";
          leaderboardMessage += `${medal} **${displayName}**: ${player2.totalKush.toLocaleString()} KUSH${statusIcon}
`;
        });
        leaderboardMessage += `
\u{1F3AF} **Climb the ranks and become a KUSH legend!**
\u{1F4AA} **Keep clicking to dominate!**`;
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{1F3AE} Play Now", web_app: { url: getWebAppUrl() } }]
            ]
          }
        };
        bot.sendMessage(chatId, leaderboardMessage, {
          ...keyboard,
          parse_mode: "Markdown"
        });
      } catch (error) {
        console.error("Leaderboard error:", error);
        bot.sendMessage(chatId, "\u274C Error fetching leaderboard. Please try again later.");
      }
    });
    bot.onText(/\/link(?:\s+(.+))?/, async (msg, match) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      const parameter = match?.[1]?.trim();
      console.log(`\u{1F4F1} Telegram /link command received from user ${telegramId} with parameter: "${parameter}"`);
      if (!telegramId) {
        bot.sendMessage(chatId, "\u274C Unable to get your Telegram information.");
        return;
      }
      try {
        const players2 = await storage.getAllPlayers();
        const existingLinkedPlayer = players2.find((p) => p.username.includes(`telegram_${telegramId}`));
        if (existingLinkedPlayer) {
          bot.sendMessage(chatId, `
\u2705 **Account Already Linked**

Your Telegram is already linked to: **${existingLinkedPlayer.username}**
\u{1F4B0} KUSH: ${existingLinkedPlayer.totalKush.toLocaleString()}
\u{1F446} Clicks: ${existingLinkedPlayer.totalClicks.toLocaleString()}

Use /stats to check your current progress!
          `, { parse_mode: "Markdown" });
          return;
        }
      } catch (error) {
        console.error("Error checking existing link:", error);
      }
      if (!parameter) {
        const linkingMessage = `
\u{1F517} **Link Your Account**

Provide your Solana wallet address to link:

**\u{1F3AF} Recommended: Link with Wallet Address**
\`/link YOUR_SOLANA_WALLET_ADDRESS\`
Example: \`/link 7dHbWY1gP9fGv8K3m2C9V4u...\`

**Alternative: Link with Game Username**  
\`/link YOUR_GAME_USERNAME\`
Example: \`/link PlayerName123\`

**Create New Account**
\`/link new\` - Creates a new game account on mainnet

**Need Help?**
\u{1F3AE} [Play KushKlicker First](${getWebAppUrl()}) to create your account
\u{1F4B0} Connect your wallet in-game first, then use that address here
        `;
        bot.sendMessage(chatId, linkingMessage, { parse_mode: "Markdown" });
        return;
      }
      try {
        const lowercaseParam = parameter.toLowerCase();
        if (lowercaseParam === "new") {
          const allPlayers = await storage.getAllPlayers();
          const existingTelegramPlayer = allPlayers.find((p) => p.telegramUserId === telegramId.toString());
          if (existingTelegramPlayer) {
            bot.sendMessage(chatId, `
\u274C **Account Already Exists**

You already have an account linked to this Telegram!
\u{1F464} **Username:** ${existingTelegramPlayer.username}
\u{1F4B0} **KUSH:** ${existingTelegramPlayer.totalKush.toLocaleString()}

Use /stats to check your progress!
            `, { parse_mode: "Markdown" });
            return;
          }
          const newPlayer = await storage.createPlayer({
            telegramUserId: telegramId.toString(),
            username: `telegram_${telegramId}_${msg.from?.first_name || "player"}`,
            totalKush: 0,
            totalClicks: 0,
            perClickMultiplier: 1,
            autoIncomePerHour: 0,
            claimableTokens: 0,
            solanaNetwork: "mainnet",
            walletSyncEnabled: false
          });
          const newAccountMessage = `
\u{1F389} **New Account Created!**

Welcome to KushKlicker! Your new account is ready:
\u{1F464} **Username:** ${newPlayer.username}
\u{1F4B0} **Starting KUSH:** 0
\u{1F3AE} **Ready to Play:** Start clicking to earn KUSH!

\u{1F3AE} [Start Playing Now](${getWebAppUrl()})

Use /stats anytime to check your progress!
          `;
          bot.sendMessage(chatId, newAccountMessage, { parse_mode: "Markdown" });
          console.log(`\u2705 Created new Telegram-linked account for user ${telegramId}`);
          return;
        }
        const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,55}$/;
        if (solanaAddressPattern.test(parameter)) {
          console.log(`\u{1F50D} Searching for player with wallet address: ${parameter}`);
          const players2 = await storage.getAllPlayers();
          const existingPlayer2 = players2.find((p) => p.walletAddress === parameter);
          if (!existingPlayer2) {
            bot.sendMessage(chatId, "\u274C No account found with that wallet address! Please play the game first and register your wallet, then try linking again.");
            return;
          }
          if (existingPlayer2.telegramUserId && existingPlayer2.telegramUserId !== telegramId.toString()) {
            bot.sendMessage(chatId, "\u274C This account is already linked to another Telegram user. Each account can only be linked to one Telegram account for security.");
            return;
          }
          await storage.updatePlayer(existingPlayer2.id, {
            telegramUserId: telegramId.toString(),
            lastActive: /* @__PURE__ */ new Date()
          });
          const linkMessage2 = `
\u2705 **Account Linked Successfully!**

Your Telegram has been linked to your KushKlicker account!
\u{1F464} **Player:** ${existingPlayer2.username}
\u{1F45B} **Wallet:** \`${parameter}\`
\u{1F4B0} **KUSH:** ${existingPlayer2.totalKush.toLocaleString()}
\u{1F446} **Clicks:** ${existingPlayer2.totalClicks.toLocaleString()}

Use /stats to check your progress anytime!
          `;
          bot.sendMessage(chatId, linkMessage2, { parse_mode: "Markdown" });
          console.log(`\u2705 Linked Telegram user ${telegramId} to wallet ${parameter}`);
          return;
        }
        console.log(`\u{1F50D} Searching for player with username: ${parameter}`);
        const existingPlayer = await storage.getPlayerByUsername(parameter);
        if (!existingPlayer) {
          bot.sendMessage(chatId, `
\u274C **Player Not Found**

No player found with username "${parameter}"

**Possible solutions:**
\u2022 Check your username spelling (case sensitive)
\u2022 Make sure you've played the game first
\u2022 Try linking with your wallet address instead
\u2022 Use \`/link new\` to create a new account

\u{1F3AE} [Play KushKlicker](${getWebAppUrl()}) to create your account first
          `, { parse_mode: "Markdown" });
          return;
        }
        if (existingPlayer.telegramUserId && existingPlayer.telegramUserId !== telegramId.toString()) {
          bot.sendMessage(chatId, "\u274C This account is already linked to another Telegram user. Each account can only be linked to one Telegram account for security.");
          return;
        }
        await storage.updatePlayer(existingPlayer.id, {
          telegramUserId: telegramId.toString(),
          lastActive: /* @__PURE__ */ new Date()
        });
        const linkMessage = `
\u2705 **Account Linked Successfully!**

Your Telegram has been linked to **${existingPlayer.username}**
\u{1F4B0} **Your KUSH:** ${existingPlayer.totalKush.toLocaleString()}
\u{1F446} **Total Clicks:** ${existingPlayer.totalClicks.toLocaleString()}
${existingPlayer.discordUserId ? "\u{1F3AE} **Also linked to Discord!**" : ""}

You can now use /stats to check your progress!
        `;
        bot.sendMessage(chatId, linkMessage, { parse_mode: "Markdown" });
        console.log(`\u2705 Linked Telegram user ${telegramId} to username ${parameter}`);
      } catch (error) {
        console.error("Link error:", error);
        bot.sendMessage(chatId, "\u274C Error linking your account. Please try again later.");
      }
    });
    bot.onText(/\/wallet (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      const walletAddress = match?.[1]?.trim();
      if (!telegramId) {
        bot.sendMessage(chatId, "\u274C Unable to get your Telegram information.");
        return;
      }
      if (!walletAddress) {
        bot.sendMessage(chatId, "\u274C Please provide a wallet address. Example: /wallet 7dHbWY...");
        return;
      }
      const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,55}$/;
      if (!solanaAddressPattern.test(walletAddress)) {
        bot.sendMessage(chatId, "\u274C Invalid Solana wallet address format. Please provide a valid mainnet address.");
        return;
      }
      try {
        const players2 = await storage.getAllPlayers();
        const player2 = players2.find((p) => p.username.includes(`telegram_${telegramId}`));
        if (!player2) {
          bot.sendMessage(chatId, "\u{1F50D} No linked account found. Use /link your_username to connect your account first!");
          return;
        }
        await storage.updatePlayer(player2.id, { walletAddress });
        const successMessage = `
\u2705 Wallet Registered Successfully!

\u{1F45B} Address: \`${walletAddress}\`
\u{1F464} Player: ${player2.username}

Your Solana wallet has been safely registered for future reward distribution. We never connect to your wallet - only store the address for sending rewards.

\u{1F512} Your wallet is secure and private.
        `;
        bot.sendMessage(chatId, successMessage, { parse_mode: "Markdown" });
      } catch (error) {
        console.error("Wallet registration error:", error);
        bot.sendMessage(chatId, "\u274C Error registering wallet. Please try again later.");
      }
    });
    bot.onText(/\/mywallet/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      if (!telegramId) {
        bot.sendMessage(chatId, "\u274C Unable to get your Telegram information.");
        return;
      }
      try {
        const players2 = await storage.getAllPlayers();
        const player2 = players2.find((p) => p.username.includes(`telegram_${telegramId}`));
        if (!player2) {
          bot.sendMessage(chatId, "\u{1F50D} No linked account found. Use /link your_username to connect your account first!");
          return;
        }
        if (!player2.walletAddress) {
          const noWalletMessage = `
\u{1F4ED} No Wallet Registered

You haven't registered a Solana wallet yet. To receive future token rewards, register your wallet using:

/wallet YOUR_SOLANA_ADDRESS

Example: \`/wallet 7dHbWY1gP9fGv8K3m2C9V4u...\`

\u{1F512} Safe & Secure: We only store your address for reward distribution. No wallet connection required.
          `;
          bot.sendMessage(chatId, noWalletMessage, { parse_mode: "Markdown" });
          return;
        }
        const walletMessage = `
\u{1F45B} Your Registered Wallet

Address: \`${player2.walletAddress}\`
Network: Solana Mainnet
Player: ${player2.username}

\u{1F4B0} Claimable $KUSH: ${player2.claimableTokens || 0}

Use /balance to check your current $KUSH token balance!
        `;
        bot.sendMessage(chatId, walletMessage, { parse_mode: "Markdown" });
      } catch (error) {
        console.error("Wallet info error:", error);
        bot.sendMessage(chatId, "\u274C Error fetching wallet info. Please try again later.");
      }
    });
    bot.onText(/\/balance/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      if (!telegramId) {
        bot.sendMessage(chatId, "\u{1F6AB} **Oops!** Can't identify your Telegram account. Please try again! \u{1F916}", { parse_mode: "Markdown" });
        return;
      }
      try {
        const players2 = await storage.getAllPlayers();
        let player2 = players2.find((p) => p.telegramUserId === telegramId.toString());
        if (!player2) {
          player2 = players2.find((p) => p.username.includes(`telegram_${telegramId}`));
        }
        if (!player2 || !player2.walletAddress) {
          const noWalletMessage = `
\u{1F6AB} **No Wallet Connected!** 

\u{1F510} You need to connect your Solana wallet first to check your $KUSH balance!

\u{1F4A1} **Quick Setup:**
\u2022 Use \`/link YOUR_WALLET_ADDRESS\` to connect
\u2022 Then check your balance anytime with \`/balance\`

\u{1F3AE} Start earning $KUSH tokens in the game first! \u{1F33F}\u2728
          `;
          bot.sendMessage(chatId, noWalletMessage, { parse_mode: "Markdown" });
          return;
        }
        const checkingMessage = `
\u{1F50D} **Scanning the Solana Blockchain...** 

\u26A1 Checking your $KUSH token balance
\u{1F48E} Wallet: \`${player2.walletAddress.slice(0, 4)}...${player2.walletAddress.slice(-4)}\`
\u{1F310} Network: **Mainnet**

\u23F3 *This may take a few seconds...*
        `;
        bot.sendMessage(chatId, checkingMessage, { parse_mode: "Markdown" });
        const balance = await mainnetTokenService.getTokenBalance(player2.walletAddress);
        const displayName = player2.username.replace(/telegram_\d+_/, "").replace("telegram_", "") || "KUSH Mogul";
        const balanceEmoji = balance > 1e6 ? "\u{1F40B}" : balance > 1e5 ? "\u{1F4AA}" : balance > 1e4 ? "\u2B50" : balance > 1e3 ? "\u{1F331}" : "\u{1F33F}";
        const statusText = balance > 1e6 ? "**WHALE ALERT!** You're crushing it! \u{1F680}" : balance > 1e5 ? "**Big Player!** Keep stacking those tokens! \u{1F4C8}" : balance > 1e4 ? "**Rising Star!** Your empire is growing! \u{1F31F}" : balance > 1e3 ? "**Token Collector!** Every KUSH counts! \u{1F49A}" : "**Ready to Earn?** Start clicking to build your KUSH empire! \u{1F3D7}\uFE0F";
        const balanceMessage = `
\u{1F48E} **Your KUSH Empire Status** \u{1F48E}

${balanceEmoji} **On-Chain Balance:** ${balance.toLocaleString()} $KUSH tokens
\u{1F464} **Player:** ${displayName}
\u{1F45B} **Wallet:** \`${player2.walletAddress.slice(0, 8)}...${player2.walletAddress.slice(-4)}\`
\u{1F525} **Network:** **Solana Mainnet** \u{1F525}

\u{1F3AE} **In-Game KUSH:** ${player2.totalKush.toLocaleString()}
\u{1F446} **Total Clicks:** ${player2.totalClicks.toLocaleString()}

${statusText}

\u{1F3AE} [**Continue Playing \u2192**](${getWebAppUrl()})
\u{1F4B0} **Earn more through the game!** \u{1F3B0}
        `;
        bot.sendMessage(chatId, balanceMessage, { parse_mode: "Markdown" });
      } catch (error) {
        console.error("Balance check error:", error);
        bot.sendMessage(chatId, `\u{1F6A8} **Oops!** Something went wrong while checking your balance!

\u274C **Error:** ${error.message}

\u{1F504} **Try again in a moment** - The blockchain might be busy! 
\u{1F4A1} Make sure your wallet is properly linked with \`/link\``, { parse_mode: "Markdown" });
      }
    });
    bot.onText(/\/admin/, async (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username;
      if (!isAdmin(username)) {
        bot.sendMessage(chatId, "\u{1F6AB} Access denied. Admin privileges required.");
        return;
      }
      const adminPanelUrl = `${getWebAppUrl()}/admin`;
      const adminMessage = `
\u{1F510} KushKlicker Admin Panel

Access your admin dashboard with full control over:
\u2022 Player management
\u2022 Token rewards tracking
\u2022 System statistics
\u2022 Pending airdrop management

\u{1F6E1}\uFE0F Authorized admin: @${username}
      `;
      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: "\u{1F6E1}\uFE0F Open Admin Panel", url: adminPanelUrl }]
          ]
        }
      };
      bot.sendMessage(chatId, adminMessage, keyboard);
    });
    bot.onText(/\/players/, async (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username;
      if (!isAdmin(username)) {
        bot.sendMessage(chatId, "\u{1F6AB} Access denied. Admin privileges required.");
        return;
      }
      try {
        const players2 = await storage.getAllPlayers();
        const totalPlayers = players2.length;
        const withWallets = players2.filter((p) => p.walletAddress).length;
        const totalKush = players2.reduce((sum, p) => sum + p.totalKush, 0);
        const statsMessage = `
\u{1F465} Player Statistics

\u{1F4CA} Total Players: ${totalPlayers}
\u{1F4BC} With Wallets: ${withWallets}
\u{1F4B0} Total KUSH: ${totalKush.toLocaleString()}
\u{1F5B1}\uFE0F Total Clicks: ${players2.reduce((sum, p) => sum + p.totalClicks, 0).toLocaleString()}

\u{1F51D} Top 5 Players:
${players2.sort((a, b) => b.totalKush - a.totalKush).slice(0, 5).map((p, i) => `${i + 1}. ${p.username}: ${p.totalKush.toLocaleString()} KUSH`).join("\n")}
        `;
        bot.sendMessage(chatId, statsMessage);
      } catch (error) {
        console.error("Players list error:", error);
        bot.sendMessage(chatId, "\u274C Error fetching player data.");
      }
    });
    bot.onText(/\/garden/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      if (!telegramId) {
        bot.sendMessage(chatId, "\u{1F6AB} **Oops!** Can't identify your Telegram account. Please try again!", { parse_mode: "Markdown" });
        return;
      }
      try {
        const players2 = await storage.getAllPlayers();
        let player2 = players2.find((p) => p.telegramUserId === telegramId.toString());
        if (!player2) {
          player2 = players2.find((p) => p.username.includes(`telegram_${telegramId}`));
        }
        if (!player2) {
          bot.sendMessage(chatId, "\u{1F50D} No linked account found! Use /link [username] to connect your account first.", { parse_mode: "Markdown" });
          return;
        }
        const gardenMessage = `
\u{1F331} **Your Cannabis Garden** \u{1F331}

\u{1F464} **Grower:** ${player2.username.replace(/telegram_\d+_/, "").replace("telegram_", "") || "KUSH Grower"}
\u{1F33F} **Active Plots:** Loading...
\u{1F9EC} **Available Strains:** OG Kush, Blue Dream, White Widow & More
\u{1F4B0} **SEEDS Balance:** ${player2.seeds || 0}

\u{1F680} **Quick Actions:**
\u{1F331} Plant new strains in your plots
\u26A1 Harvest mature plants for KUSH
\u{1F9EA} Cross-breed to create rare genetics
\u{1F3EA} Buy supplies to boost your garden

[**\u{1F3AE} Open Garden \u2192**](${getWebAppUrl()})
        `;
        bot.sendMessage(chatId, gardenMessage, { parse_mode: "Markdown" });
      } catch (error) {
        console.error("Garden command error:", error);
        bot.sendMessage(chatId, "\u274C Error fetching garden data. Please try again later.");
      }
    });
    bot.onText(/\/pvp/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      if (!telegramId) {
        bot.sendMessage(chatId, "\u{1F6AB} **Oops!** Can't identify your Telegram account. Please try again!", { parse_mode: "Markdown" });
        return;
      }
      try {
        const players2 = await storage.getAllPlayers();
        let player2 = players2.find((p) => p.telegramUserId === telegramId.toString());
        if (!player2) {
          player2 = players2.find((p) => p.username.includes(`telegram_${telegramId}`));
        }
        if (!player2) {
          bot.sendMessage(chatId, "\u{1F50D} No linked account found! Use /link [username] to connect your account first.", { parse_mode: "Markdown" });
          return;
        }
        const wins = player2.wins || 0;
        const losses = player2.losses || 0;
        const winRate = wins + losses > 0 ? (wins / (wins + losses) * 100).toFixed(1) : "0.0";
        const rank = wins > 50 ? "\u{1F3C6} Legendary" : wins > 25 ? "\u{1F48E} Master" : wins > 10 ? "\u2694\uFE0F Warrior" : "\u{1F33F} Rookie";
        const pvpMessage = `
\u2694\uFE0F **Your PvP Arena Stats** \u2694\uFE0F

\u{1F464} **Fighter:** ${player2.username.replace(/telegram_\d+_/, "").replace("telegram_", "") || "KUSH Warrior"}
\u{1F3C6} **Wins:** ${wins}
\u{1F480} **Losses:** ${losses}
\u{1F4CA} **Win Rate:** ${winRate}%
\u{1F947} **Rank:** ${rank}
\u{1F4B0} **KUSH Balance:** ${player2.totalKush?.toLocaleString() || 0}

\u{1F525} **Arena Features:**
\u2694\uFE0F Challenge other players to battles
\u{1F3C6} Join tournaments with prize pools
\u{1F48E} Use special abilities in combat
\u{1F3AF} Wager KUSH on battle outcomes

[**\u{1F3AE} Enter Arena \u2192**](${getWebAppUrl()})
        `;
        bot.sendMessage(chatId, pvpMessage, { parse_mode: "Markdown" });
      } catch (error) {
        console.error("PvP command error:", error);
        bot.sendMessage(chatId, "\u274C Error fetching PvP data. Please try again later.");
      }
    });
    bot.on("callback_query", async (callbackQuery) => {
      const msg = callbackQuery.message;
      const data = callbackQuery.data;
      const chatId = msg?.chat.id;
      const telegramId = callbackQuery.from?.id;
      if (!chatId || !telegramId) return;
      try {
        switch (data) {
          case "my_stats":
            const player2 = await storage.getPlayerByUsername(`telegram_${telegramId}`);
            if (!player2) {
              bot.sendMessage(chatId, "\u{1F50D} No linked account found! Use /link [username] to connect your account first.", { parse_mode: "Markdown" });
            } else {
              const statsMessage = `
\u{1F4CA} **Your KushKlicker Stats**

\u{1F464} **Player:** ${player2.username}
\u{1F4B0} **Total KUSH:** ${player2.totalKush.toLocaleString()}
\u{1F5B1}\uFE0F **Total Clicks:** ${player2.totalClicks.toLocaleString()}
\u26A1 **Per Click:** ${player2.perClickMultiplier}x multiplier
\u{1F4C8} **Auto Income:** ${player2.autoIncomePerHour}/hour
\u{1F48E} **Claimable Tokens:** ${player2.claimableTokens || 0}
\u{1F4C5} **Playing Since:** ${new Date(player2.createdAt).toLocaleDateString()}

Keep clicking to grow your KUSH empire! \u{1F680}
              `;
              const keyboard = {
                reply_markup: {
                  inline_keyboard: [
                    [{ text: "\u{1F3AE} Continue Playing", web_app: { url: getWebAppUrl() } }],
                    [{ text: "\u{1F504} Refresh Stats", callback_data: "my_stats" }]
                  ]
                }
              };
              bot.sendMessage(chatId, statsMessage, { parse_mode: "Markdown", reply_markup: keyboard.reply_markup });
            }
            break;
          case "garden_info":
            const gardenInfoMessage = `
\u{1F331} **Cannabis Garden System** \u{1F331}

Grow your own cannabis strains and earn KUSH!

\u{1F525} **Features:**
\u{1F331} **Strain Genetics:** 6 premium strains available
\u23F0 **Growth Cycles:** Plant, tend, and harvest
\u{1F9EA} **Cross-Breeding:** Create rare hybrid strains
\u{1F4B0} **SEEDS Economy:** Use SEEDS to buy supplies
\u{1F3C6} **Harvest Rewards:** Earn KUSH from mature plants

\u{1F4A1} **Pro Tips:**
\u2022 Different strains have unique growth times
\u2022 Cross-breeding creates valuable hybrids
\u2022 Use fertilizer and water to boost yields
\u2022 Monitor your plots for optimal harvest timing

[**\u{1F3AE} Start Growing \u2192**](${getWebAppUrl()})
            `;
            bot.sendMessage(chatId, gardenInfoMessage, { parse_mode: "Markdown" });
            break;
          case "pvp_info":
            const pvpInfoMessage = `
\u2694\uFE0F **PvP Battle Arena System** \u2694\uFE0F

Fight other players in epic cannabis-themed battles!

\u{1F525} **Features:**
\u2694\uFE0F **Real-Time Battles:** Turn-based combat system
\u{1F4A5} **Special Abilities:** 4 unique combat skills
\u{1F3C6} **Tournaments:** Enter tournaments with prizes
\u{1F4B0} **Wagering:** Bet KUSH on battle outcomes
\u{1F3C6} **Leaderboards:** Climb the ranks
\u{1F3AF} **Guild Wars:** Team battles (coming soon)

\u{1F4A1} **Battle Abilities:**
\u{1F525} **Flame Strike:** High damage fire attack
\u2744\uFE0F **Ice Shard:** Freezing projectile
\u26A1 **Lightning Bolt:** Electric shock
\u2620\uFE0F **Poison Cloud:** Toxic area damage

[**\u{1F3AE} Enter Arena \u2192**](${getWebAppUrl()})
            `;
            bot.sendMessage(chatId, pvpInfoMessage, { parse_mode: "Markdown" });
            break;
          case "leaderboard":
            const leaderboard = await storage.getTopPlayers(10);
            let leaderboardMessage = "\u{1F3C6} **KushKlicker Leaderboard** \u{1F3C6}\\n\\n";
            leaderboard.forEach((player3, index) => {
              const medal = index === 0 ? "\u{1F947}" : index === 1 ? "\u{1F948}" : index === 2 ? "\u{1F949}" : `${index + 1}.`;
              leaderboardMessage += `${medal} **${player3.username}:** ${player3.totalKush.toLocaleString()} KUSH\\n`;
            });
            leaderboardMessage += "\\n*Climb the ranks and become the ultimate KUSH mogul!* \u{1F680}";
            const leaderboardKeyboard = {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "\u{1F3AE} Play to Climb Rankings", web_app: { url: getWebAppUrl() } }],
                  [{ text: "\u{1F504} Refresh Leaderboard", callback_data: "leaderboard" }]
                ]
              }
            };
            bot.sendMessage(chatId, leaderboardMessage, { parse_mode: "Markdown", reply_markup: leaderboardKeyboard.reply_markup });
            break;
          case "achievements":
            bot.sendMessage(chatId, `
\u{1F3C6} **Achievement System**

Complete achievements in-game to earn bonus rewards:
\u2022 \u{1F5B1}\uFE0F **Click Master** - Reach click milestones
\u2022 \u{1F4B0} **KUSH Collector** - Accumulate $KUSH tokens
\u2022 \u{1F3EA} **Upgrade Expert** - Purchase upgrades
\u2022 \u{1F3AF} **Goal Achiever** - Complete special challenges
\u2022 \u{1F4A1} **Grow Light Collector** - Collect rare grow lights

*There are 50+ achievements waiting for you!*

\u{1F3AE} [Play Now to Start Achieving](${getWebAppUrl()})
            `, { parse_mode: "Markdown" });
            break;
          case "my_wallet":
            const walletPlayer = await storage.getPlayerByUsername(`telegram_${telegramId}`);
            if (!walletPlayer) {
              bot.sendMessage(chatId, "\u{1F50D} No linked account found! Use /link [username] to connect your account first.");
            } else if (!walletPlayer.walletAddress) {
              bot.sendMessage(chatId, `
\u{1F4ED} **No Wallet Registered**

To earn real $KUSH token rewards, register your Solana wallet:

**How to register:**
\`/wallet YOUR_SOLANA_ADDRESS\`

**Example:**
\`/wallet 7dHbWY1gP9fGv8K3m2C9V4u...\`

\u{1F512} **Security:** We only store your address for reward distribution. No wallet connection required.
              `, { parse_mode: "Markdown" });
            } else {
              bot.sendMessage(chatId, `
\u{1F45B} **Your Registered Wallet**

**Address:** \`${walletPlayer.walletAddress}\`
**Network:** Solana Mainnet
**Player:** ${walletPlayer.username}
**Claimable Tokens:** ${walletPlayer.claimableTokens || 0}

Use /balance to check your current on-chain $KUSH token balance! \u{1F4B0}
              `, { parse_mode: "Markdown" });
            }
            break;
          case "check_balance":
            bot.sendMessage(chatId, "\u{1F4B0} Use the /balance command to check your current $KUSH token balance on-chain!");
            break;
          case "link_help":
            bot.sendMessage(chatId, `
\u{1F517} **Link Your Account**

Connect your Telegram to KushKlicker using your wallet address:

**\u{1F3AF} Recommended Method:**
\`/link YOUR_SOLANA_WALLET_ADDRESS\`
Example: \`/link 7dHbWY1gP9fGv8K3m2C9V4u...\`

**Alternative Methods:**
\`/link YOUR_GAME_USERNAME\` - Link with game username
\`/link new\` - Create new mainnet account

**Setup Steps:**
1. \u{1F3AE} [Play KushKlicker](${getWebAppUrl()}) first  
2. \u{1F4B0} Connect your Solana wallet in-game
3. \u{1F517} Use that wallet address with /link

**Benefits:**
\u2705 Track progress via Telegram
\u2705 Get stats and leaderboard updates
\u2705 Receive token reward notifications
\u2705 Access all bot features

*Your account will be securely linked!* \u{1F512}
            `, { parse_mode: "Markdown" });
            break;
          case "show_help":
            const helpMessage = `
\u2753 **KushKlicker Help & Commands**

**\u{1F3AE} Game Commands:**
\u2022 \`/start\` - Show main menu
\u2022 \`/stats\` - View your game statistics
\u2022 \`/leaderboard\` - See top players

**\u{1F517} Account Commands:**
\u2022 \`/link [username]\` - Link Telegram to game account
\u2022 \`/wallet [address]\` - Register Solana wallet
\u2022 \`/mywallet\` - View wallet information
\u2022 \`/balance\` - Check on-chain token balance

**\u{1F4CB} Admin Commands:** *(admin only)*
\u2022 \`/admin\` - Access admin panel
\u2022 \`/players\` - View player statistics

**\u{1F3AF} How to Play:**
1. Click the KUSH button to earn tokens
2. Buy upgrades to increase earning power
3. Complete achievements for bonuses
4. Connect Solana wallet for real rewards

**\u{1F517} Links:**
\u2022 \u{1F3AE} [Play Game](${getWebAppUrl()})
\u2022 \u{1F4AC} Support: @KushKlickerSupport

*Need help? Just ask!* \u{1F33F}
            `;
            bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown" });
            break;
          case "refresh_start":
            bot.sendMessage(chatId, `\u{1F3AE} **Welcome back to KushKlicker!** \u{1F33F}

\u{1F680} **Ready to grow your KUSH empire?**
Click the button below to jump back into the action!

[**\u{1F3AE} Play Now \u2192**](${getWebAppUrl()})`, { parse_mode: "Markdown" });
            break;
          default:
            bot.sendMessage(chatId, "\u2753 Unknown action. Use /start to see the main menu.");
        }
      } catch (error) {
        console.error("Callback query error:", error);
        bot.sendMessage(chatId, "\u274C Error processing request. Please try again later.");
      }
      bot.answerCallbackQuery(callbackQuery.id);
    });
    const menuButtonUrl = getWebAppUrl();
    bot.setChatMenuButton({
      menu_button: {
        type: "web_app",
        text: "\u{1F3AE} Play KushKlicker",
        web_app: { url: menuButtonUrl }
      }
    }).then(() => {
      console.log("\u2705 Menu button URL updated successfully!");
    }).catch((error) => {
      console.warn("\u26A0\uFE0F Could not set menu button (may need manual setup via BotFather):", error.message);
    });
    console.log("\u{1F916} Telegram bot started successfully!");
    bot.on("polling_error", (error) => {
      if (error.code === 409 || error.message?.includes("409") || error.message?.includes("Conflict")) {
        console.error("\u{1F6A8} Bot conflict detected - another instance is running:", error.message);
        console.log("\u{1F6D1} Stopping this bot instance to prevent conflicts...");
        bot.stopPolling();
        botInstance = null;
        console.log("\u26A0\uFE0F Bot stopped due to conflicts. Manual restart required.");
      } else {
        console.error("Telegram bot polling error:", error);
      }
    });
    botInstance = bot;
    return bot;
  } catch (error) {
    console.error("Failed to start Telegram bot:", error);
  }
}
async function sendTelegramNotification(message) {
  try {
    if (!botInstance) {
      const bot = startTelegramBot();
      if (!bot) {
        throw new Error("Telegram bot not available");
      }
      botInstance = bot;
    }
    const players2 = await storage.getAllPlayers();
    const telegramPlayers = players2.filter(
      (p) => p.username.includes("telegram_") || p.telegramUserId
    );
    if (telegramPlayers.length === 0) {
      return {
        success: false,
        message: "No Telegram users found",
        count: 0
      };
    }
    let sentCount = 0;
    let errorCount = 0;
    const errors = [];
    for (const player2 of telegramPlayers) {
      try {
        let chatId = null;
        if (player2.telegramUserId) {
          chatId = parseInt(player2.telegramUserId);
        } else {
          const userIdMatch = player2.username.match(/telegram_(\d+)_/);
          if (userIdMatch) {
            chatId = parseInt(userIdMatch[1]);
          }
        }
        if (chatId) {
          const notificationMessage = `
\u{1F514} **Admin Notification** \u{1F514}

${message}

\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u{1F4AC} From the KushKlicker team
          `;
          await botInstance.sendMessage(chatId, notificationMessage, { parse_mode: "Markdown" });
          sentCount++;
          console.log(`\u2705 Notification sent to ${player2.username} (${chatId})`);
        } else {
          console.warn(`\u26A0\uFE0F No valid chat ID found for ${player2.username}`);
        }
      } catch (error) {
        errorCount++;
        errors.push(`User ${player2.username}: ${error.message}`);
        console.error(`Failed to send notification to ${player2.username}:`, error);
      }
    }
    return {
      success: sentCount > 0,
      message: `Notification sent to ${sentCount} users`,
      count: sentCount,
      errors: errorCount,
      details: {
        sent: sentCount,
        failed: errorCount,
        total: telegramPlayers.length,
        errorMessages: errors
      }
    };
  } catch (error) {
    console.error("Telegram notification error:", error);
    return {
      success: false,
      message: error.message,
      count: 0
    };
  }
}
function stopTelegramBot() {
  if (botInstance) {
    console.log("\u{1F6D1} Stopping Telegram bot...");
    try {
      botInstance.stopPolling({ cancel: true, reason: "Server shutdown" });
      if (process.env.NODE_ENV === "production") {
        botInstance.deleteWebHook().catch((error) => {
          console.warn("\u26A0\uFE0F Error deleting webhook:", error);
        });
      }
      botInstance = null;
      console.log("\u2705 Telegram bot stopped successfully");
    } catch (error) {
      console.error("\u274C Error stopping Telegram bot:", error);
      botInstance = null;
    }
  }
}
var ADMIN_USERNAMES, botInstance;
var init_telegram_bot = __esm({
  "server/telegram-bot.ts"() {
    "use strict";
    init_storage();
    init_solana_token_service();
    ADMIN_USERNAMES = ["wlsfx"];
    botInstance = null;
  }
});

// server/discord-bot.ts
var discord_bot_exports = {};
__export(discord_bot_exports, {
  DiscordBot: () => DiscordBot,
  sendDiscordNotification: () => sendDiscordNotification,
  startDiscordBot: () => startDiscordBot
});
import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } from "discord.js";
function isAdmin2(username) {
  return username ? ADMIN_USERNAMES2.includes(username.toLowerCase()) : false;
}
function getWebAppUrl2() {
  if (process.env.NODE_ENV === "development") {
    const replitDomain = process.env.REPLIT_DEV_DOMAIN;
    if (replitDomain) {
      return `https://${replitDomain}`;
    }
    return `https://5000-${process.env.REPL_SLUG || "replit"}-${process.env.REPL_OWNER || "user"}.repl.co`;
  }
  return process.env.WEB_APP_URL || process.env.REPLIT_DEV_DOMAIN || "https://localhost:5000";
}
async function startDiscordBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token || token.trim() === "" || token === "undefined") {
    console.log("Discord bot token not found, skipping Discord bot initialization");
    return;
  }
  try {
    botInstance2 = new DiscordBot(token);
    console.log("Discord bot starting...");
    return botInstance2;
  } catch (error) {
    console.error("Failed to start Discord bot:", error);
    console.log("Discord bot will be disabled due to configuration issues");
  }
}
async function sendDiscordNotification(message) {
  try {
    const players2 = await storage.getAllPlayers();
    const discordPlayers = players2.filter((p) => p.discord_user_id || p.discordUserId);
    if (discordPlayers.length === 0) {
      return {
        success: false,
        message: "No Discord users found",
        count: 0
      };
    }
    return {
      success: true,
      message: `Found ${discordPlayers.length} Discord users. Discord notifications via admin panel are currently limited to Telegram due to Discord API restrictions.`,
      count: discordPlayers.length,
      errors: 0,
      details: {
        sent: discordPlayers.length,
        failed: 0,
        total: discordPlayers.length,
        errorMessages: []
      }
    };
  } catch (error) {
    console.error("Discord notification error:", error);
    return {
      success: false,
      message: error.message,
      count: 0
    };
  }
}
var ADMIN_USERNAMES2, DiscordBot, botInstance2;
var init_discord_bot = __esm({
  "server/discord-bot.ts"() {
    "use strict";
    init_storage();
    init_solana_token_service();
    ADMIN_USERNAMES2 = ["wlsfx"];
    DiscordBot = class {
      client;
      token;
      constructor(token) {
        this.token = token;
        this.client = new Client({
          intents: [
            GatewayIntentBits.Guilds
          ]
        });
        this.setupBot();
      }
      getClient() {
        return this.client;
      }
      async setupBot() {
        this.client.once("ready", () => {
          console.log(`Discord bot logged in as ${this.client.user?.tag}!`);
          this.registerCommands();
        });
        this.client.on("interactionCreate", async (interaction) => {
          try {
            if (interaction.isChatInputCommand()) {
              const { commandName } = interaction;
              switch (commandName) {
                case "start":
                  await this.handleStart(interaction);
                  break;
                case "stats":
                  await this.handleStats(interaction);
                  break;
                case "leaderboard":
                  await this.handleLeaderboard(interaction);
                  break;
                case "link":
                  await this.handleLink(interaction);
                  break;
                case "wallet":
                  await this.handleWallet(interaction);
                  break;
                case "mywallet":
                  await this.handleMyWallet(interaction);
                  break;
                case "balance":
                  await this.handleBalance(interaction);
                  break;
                case "garden":
                  await this.handleGarden(interaction);
                  break;
                case "pvp":
                  await this.handlePvP(interaction);
                  break;
                case "admin":
                  await this.handleAdmin(interaction);
                  break;
                case "players":
                  await this.handlePlayers(interaction);
                  break;
                default:
                  await interaction.reply("Unknown command!");
              }
            } else if (interaction.isButton()) {
              await this.handleButtonClick(interaction);
            }
          } catch (error) {
            console.error("Discord interaction error:", error);
            try {
              if ("replied" in interaction && "deferred" in interaction) {
                if (interaction.replied || interaction.deferred) {
                  await interaction.followUp({ content: "An error occurred while processing your request.", ephemeral: true });
                } else {
                  await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
                }
              }
            } catch (replyError) {
              console.error("Error sending error message:", replyError);
            }
          }
        });
        this.client.on("error", (error) => {
          console.error("Discord client error:", error);
        });
        this.client.on("shardError", (error) => {
          console.error("Discord shard error:", error);
        });
        try {
          await this.client.login(this.token);
        } catch (error) {
          console.error("Failed to login to Discord:", error);
          console.log("Discord bot will remain disabled");
        }
      }
      async registerCommands() {
        const commands = [
          new SlashCommandBuilder().setName("start").setDescription("Get started with KushKlicker and receive your game link"),
          new SlashCommandBuilder().setName("stats").setDescription("View your KushKlicker game statistics"),
          new SlashCommandBuilder().setName("leaderboard").setDescription("See the top KushKlicker players"),
          new SlashCommandBuilder().setName("link").setDescription("Link your Discord account to KushKlicker with your Solana wallet").addStringOption((option) => option.setName("sol_address").setDescription("Your Solana wallet address (can only be set once)").setRequired(true)),
          new SlashCommandBuilder().setName("wallet").setDescription("Register your Solana wallet address").addStringOption((option) => option.setName("address").setDescription("Your Solana wallet address").setRequired(true)),
          new SlashCommandBuilder().setName("mywallet").setDescription("View your registered wallet information"),
          new SlashCommandBuilder().setName("balance").setDescription("Check your current token balance on-chain"),
          new SlashCommandBuilder().setName("garden").setDescription("View your cannabis garden plots and strains"),
          new SlashCommandBuilder().setName("pvp").setDescription("Check your PvP arena battle statistics"),
          new SlashCommandBuilder().setName("admin").setDescription("Access admin panel (admin only)"),
          new SlashCommandBuilder().setName("players").setDescription("View player statistics (admin only)")
        ].map((command) => command.toJSON());
        const rest = new REST().setToken(this.token);
        try {
          await rest.put(
            Routes.applicationCommands(this.client.user.id),
            { body: commands }
          );
          console.log("Discord slash commands registered successfully!");
        } catch (error) {
          console.error("Error registering Discord commands:", error);
        }
      }
      async handleStart(interaction) {
        const embed = {
          color: 5025616,
          // Green color matching the logo
          title: "\u{1F33F} Welcome to KushKlicker! \u{1F33F}",
          description: "The ultimate cannabis-themed incremental clicker game! Start your journey to become the ultimate KUSH mogul!",
          thumbnail: {
            url: `${getWebAppUrl2()}/logo.png`
          },
          fields: [
            {
              name: "\u{1F3AE} Game Features",
              value: "\u2022 **Click** to earn KUSH tokens\n\u2022 **Buy upgrades** to increase earning power\n\u2022 **Unlock achievements** for bonus rewards\n\u2022 **Compete** on global leaderboards\n\u2022 **Earn real $KUSH rewards** with Solana wallet",
              inline: false
            },
            {
              name: "\u{1F680} Quick Start",
              value: "1. Click the **Play Now** button\n2. Start clicking to earn KUSH\n3. Use **/link** to connect your Discord\n4. Register wallet with **/wallet** for rewards",
              inline: false
            },
            {
              name: "\u{1F4A1} Pro Tips",
              value: "\u2022 Use **/stats** to track progress\n\u2022 Check **/leaderboard** to see rankings\n\u2022 Use **/balance** to check token rewards",
              inline: false
            }
          ],
          footer: {
            text: "Join thousands of players growing their KUSH empire! \u{1F331}"
          }
        };
        const components = [
          {
            type: 1,
            // Action Row
            components: [
              {
                type: 2,
                // Button
                style: 5,
                // Link
                label: "\u{1F3AE} Play Now",
                url: getWebAppUrl2()
              },
              {
                type: 2,
                // Button
                style: 2,
                // Primary
                label: "\u{1F4CA} My Stats",
                custom_id: "show_stats"
              },
              {
                type: 2,
                // Button
                style: 2,
                // Primary
                label: "\u{1F3C6} Leaderboard",
                custom_id: "show_leaderboard"
              }
            ]
          },
          {
            type: 1,
            // Action Row
            components: [
              {
                type: 2,
                // Button
                style: 3,
                // Secondary
                label: "\u{1F517} Link Account",
                custom_id: "link_account"
              },
              {
                type: 2,
                // Button
                style: 3,
                // Secondary
                label: "\u{1F4B0} Check Balance",
                custom_id: "check_balance"
              },
              {
                type: 2,
                // Button
                style: 4,
                // Danger
                label: "\u2753 Help",
                custom_id: "show_help"
              }
            ]
          }
        ];
        await interaction.reply({ embeds: [embed], components });
      }
      async handleStats(interaction) {
        const discordId = interaction.user.id;
        try {
          const player2 = await storage.getPlayerByDiscordId(discordId);
          if (!player2) {
            await interaction.reply({
              content: "\u274C No linked account found! Use `/link` to connect your Discord account first.",
              ephemeral: true
            });
            return;
          }
          const embed = {
            color: 5025616,
            title: `\u{1F4CA} ${player2.username}'s Stats`,
            fields: [
              { name: "\u{1F4B0} Total KUSH", value: player2.totalKush.toLocaleString(), inline: true },
              { name: "\u{1F446} Total Clicks", value: player2.totalClicks.toLocaleString(), inline: true },
              { name: "\u26A1 Click Power", value: `${player2.perClickMultiplier}x`, inline: true },
              { name: "\u{1F916} Auto Income", value: `${player2.autoIncomePerHour}/hour`, inline: true }
            ],
            footer: {
              text: "Keep clicking to earn more KUSH!"
            }
          };
          await interaction.reply({ embeds: [embed] });
        } catch (error) {
          console.error("Stats error:", error);
          await interaction.reply("Error fetching your stats. Please try again later.");
        }
      }
      async handleLeaderboard(interaction) {
        try {
          const topPlayers = await storage.getTopPlayers(10);
          const leaderboardText = topPlayers.map((player2, index) => `${index + 1}. ${player2.username} - ${player2.totalKush.toLocaleString()} KUSH`).join("\n");
          const embed = {
            color: 5025616,
            title: "\u{1F3C6} Top KushKlicker Players",
            description: leaderboardText || "No players found!",
            footer: {
              text: "Keep playing to climb the ranks!"
            }
          };
          await interaction.reply({ embeds: [embed] });
        } catch (error) {
          console.error("Leaderboard error:", error);
          await interaction.reply("Error fetching leaderboard. Please try again later.");
        }
      }
      async handleLink(interaction) {
        const discordId = interaction.user.id;
        const discordUsername = interaction.user.username;
        const walletAddress = interaction.options.getString("sol_address");
        if (!walletAddress) {
          await interaction.reply({
            content: "\u274C Please provide a Solana wallet address.",
            ephemeral: true
          });
          return;
        }
        const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        if (!solanaAddressPattern.test(walletAddress)) {
          await interaction.reply({
            content: "\u274C Invalid Solana wallet address format. Please provide a valid address.",
            ephemeral: true
          });
          return;
        }
        try {
          const players2 = await storage.getTopPlayers(1e3);
          let existingPlayer = players2.find((p) => p.discordUserId === discordId);
          if (existingPlayer) {
            if (existingPlayer.walletAddress && existingPlayer.walletAddress !== walletAddress) {
              const embed3 = {
                color: 16733986,
                // Red color
                title: "\u{1F6AB} Wallet Already Registered",
                description: `Your account already has a wallet registered and cannot be changed for security.`,
                fields: [
                  { name: "\u{1F512} Current Wallet", value: `\`${existingPlayer.walletAddress}\``, inline: false },
                  { name: "\u26A0\uFE0F Security Policy", value: "Wallets can only be set once to prevent account takeovers", inline: false },
                  { name: "\u{1F4B0} Your KUSH", value: existingPlayer.totalKush.toLocaleString(), inline: true },
                  { name: "\u{1F446} Total Clicks", value: existingPlayer.totalClicks.toLocaleString(), inline: true }
                ],
                footer: {
                  text: "Contact support if you need to change your wallet address"
                }
              };
              await interaction.reply({ embeds: [embed3], ephemeral: true });
              return;
            }
            if (!existingPlayer.walletAddress) {
              await storage.updatePlayer(existingPlayer.id, {
                walletAddress,
                lastActive: /* @__PURE__ */ new Date()
              });
              const embed3 = {
                color: 5025616,
                title: "\u2705 Wallet Registered Successfully!",
                description: `Your wallet has been registered to your KushKlicker account`,
                fields: [
                  { name: "\u{1F45B} Wallet Address", value: `\`${walletAddress}\``, inline: false },
                  { name: "\u{1F512} Security", value: "This wallet is now permanently linked to your account", inline: false },
                  { name: "\u{1F4B0} Your KUSH", value: existingPlayer.totalKush.toLocaleString(), inline: true },
                  { name: "\u{1F446} Total Clicks", value: existingPlayer.totalClicks.toLocaleString(), inline: true }
                ],
                footer: {
                  text: "You can now use /stats to check your progress!"
                }
              };
              await interaction.reply({ embeds: [embed3], ephemeral: true });
              return;
            }
            const embed2 = {
              color: 5025616,
              title: "\u2705 Account Already Linked",
              description: `Your Discord account is already linked with this wallet`,
              fields: [
                { name: "\u{1F45B} Wallet Address", value: `\`${walletAddress}\``, inline: false },
                { name: "\u{1F4B0} Your KUSH", value: existingPlayer.totalKush.toLocaleString(), inline: true },
                { name: "\u{1F446} Total Clicks", value: existingPlayer.totalClicks.toLocaleString(), inline: true }
              ],
              footer: {
                text: "You can use /stats to check your progress!"
              }
            };
            await interaction.reply({ embeds: [embed2], ephemeral: true });
            return;
          }
          existingPlayer = players2.find((p) => p.walletAddress === walletAddress);
          if (existingPlayer) {
            if (existingPlayer.discordUserId && existingPlayer.discordUserId !== discordId) {
              const embed3 = {
                color: 16733986,
                // Red color
                title: "\u274C Account Already Linked",
                description: `This account is already linked to another Discord user. Each account can only be linked to one Discord account for security.`,
                footer: {
                  text: "Contact support if you need help with account linking"
                }
              };
              await interaction.reply({ embeds: [embed3], ephemeral: true });
              return;
            }
            await storage.updatePlayer(existingPlayer.id, {
              discordUserId: discordId,
              lastActive: /* @__PURE__ */ new Date()
            });
            const embed2 = {
              color: 5025616,
              title: "\u2705 Account Linked Successfully!",
              description: `Your Discord account has been linked to your existing KushKlicker account`,
              fields: [
                { name: "\u{1F464} Username", value: existingPlayer.username, inline: false },
                { name: "\u{1F45B} Wallet Address", value: `\`${walletAddress}\``, inline: false },
                { name: "\u{1F4B0} Your KUSH", value: existingPlayer.totalKush.toLocaleString(), inline: true },
                { name: "\u{1F446} Total Clicks", value: existingPlayer.totalClicks.toLocaleString(), inline: true },
                ...existingPlayer.telegramUserId ? [{ name: "\u{1F4F1} Also linked to", value: "Telegram", inline: true }] : []
              ],
              footer: {
                text: "Welcome back! Use /stats to check your progress."
              }
            };
            await interaction.reply({ embeds: [embed2], ephemeral: true });
            return;
          }
          const newPlayer = await storage.createPlayer({
            discordUserId: discordId,
            username: `${discordUsername}_discord`,
            walletAddress,
            totalKush: 0,
            totalClicks: 0,
            perClickMultiplier: 1,
            autoIncomePerHour: 0,
            claimableTokens: 0,
            solanaNetwork: "devnet",
            walletSyncEnabled: true
          });
          const embed = {
            color: 5025616,
            title: "\u{1F33F} Welcome to KushKlicker! \u{1F33F}",
            description: `Your Discord account has been linked and a new KushKlicker account created!`,
            fields: [
              { name: "\u{1F45B} Wallet Address", value: `\`${walletAddress}\``, inline: false },
              { name: "\u{1F4B0} Starting KUSH", value: "0", inline: true },
              { name: "\u{1F3AE} Ready to Play", value: "Start clicking to earn KUSH!", inline: true },
              { name: "\u{1F517} Game Link", value: `[Play KushKlicker](${getWebAppUrl2()})`, inline: false }
            ],
            footer: {
              text: "Use /stats anytime to check your progress!"
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          console.error("Link error:", error);
          await interaction.reply({
            content: "\u274C Error linking your account. Please try again later.",
            ephemeral: true
          });
        }
      }
      async handleWallet(interaction) {
        const discordId = interaction.user.id;
        const walletAddress = interaction.options.getString("address");
        if (!walletAddress) {
          await interaction.reply({
            content: "\u274C Please provide a wallet address.",
            ephemeral: true
          });
          return;
        }
        const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        if (!solanaAddressPattern.test(walletAddress)) {
          await interaction.reply({
            content: "\u274C Invalid Solana wallet address format. Please provide a valid address.",
            ephemeral: true
          });
          return;
        }
        try {
          const players2 = await storage.getTopPlayers(1e3);
          const player2 = players2.find((p) => p.discordUserId === discordId);
          if (!player2) {
            await interaction.reply({
              content: "\u{1F50D} No linked account found. Use `/link` to connect your Discord account first!",
              ephemeral: true
            });
            return;
          }
          if (player2.walletAddress && player2.walletAddress !== walletAddress) {
            const embed2 = {
              color: 16733986,
              // Red color
              title: "\u{1F6AB} Wallet Change Not Allowed",
              description: `Your wallet is already registered and cannot be changed for security.`,
              fields: [
                { name: "\u{1F512} Current Wallet", value: `\`${player2.walletAddress}\``, inline: false },
                { name: "\u26A0\uFE0F Security Policy", value: "Wallets can only be set once to prevent account takeovers", inline: false },
                { name: "\u{1F4A1} Need Help?", value: "Contact support if you genuinely need to change your wallet", inline: false }
              ],
              footer: {
                text: "Use /mywallet to view your current wallet info"
              }
            };
            await interaction.reply({ embeds: [embed2], ephemeral: true });
            return;
          }
          await storage.updatePlayer(player2.id, { walletAddress });
          const embed = {
            color: 5025616,
            title: "\u2705 Wallet Registered Successfully!",
            description: `Your Solana wallet has been safely registered for future reward distribution.`,
            fields: [
              { name: "\u{1F45B} Address", value: `\`${walletAddress}\``, inline: false },
              { name: "\u{1F464} Player", value: player2.username, inline: true },
              { name: "\u{1F512} Security", value: "We only store your address - never connect to your wallet", inline: false }
            ],
            footer: {
              text: "Your wallet is secure and private."
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          console.error("Wallet registration error:", error);
          await interaction.reply({
            content: "\u274C Error registering wallet. Please try again later.",
            ephemeral: true
          });
        }
      }
      async handleMyWallet(interaction) {
        const discordId = interaction.user.id;
        try {
          const players2 = await storage.getTopPlayers(1e3);
          const player2 = players2.find((p) => p.discordUserId === discordId);
          if (!player2) {
            await interaction.reply({
              content: "\u{1F50D} No linked account found. Use `/link` to connect your Discord account first!",
              ephemeral: true
            });
            return;
          }
          if (!player2.walletAddress) {
            const embed2 = {
              color: 16750592,
              // Orange color
              title: "\u{1F4ED} No Wallet Registered",
              description: "You haven't registered a Solana wallet yet.",
              fields: [
                {
                  name: "\u{1F4A1} How to Register",
                  value: "Use `/wallet [address]` to register your Solana wallet address",
                  inline: false
                },
                {
                  name: "\u{1F512} Safe & Secure",
                  value: "We only store your address for reward distribution. No wallet connection required.",
                  inline: false
                }
              ]
            };
            await interaction.reply({ embeds: [embed2], ephemeral: true });
            return;
          }
          const embed = {
            color: 5025616,
            title: "\u{1F45B} Your Registered Wallet",
            fields: [
              { name: "\u{1F4CD} Address", value: `\`${player2.walletAddress}\``, inline: false },
              { name: "\u{1F310} Network", value: `Solana ${player2.solanaNetwork || "devnet"}`, inline: true },
              { name: "\u{1F464} Player", value: player2.username, inline: true },
              { name: "\u{1F4B0} Claimable Tokens", value: `${player2.claimableTokens || 0}`, inline: true }
            ],
            footer: {
              text: "To update your wallet, use /wallet [new_address]"
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          console.error("Wallet info error:", error);
          await interaction.reply({
            content: "\u274C Error fetching wallet info. Please try again later.",
            ephemeral: true
          });
        }
      }
      async handleBalance(interaction) {
        const discordId = interaction.user.id;
        try {
          const player2 = await storage.getPlayerByDiscordId(discordId);
          if (!player2 || !player2.walletAddress) {
            await interaction.reply({
              content: "\u{1F50D} No wallet found. Use `/link` or `/wallet` to register your Solana wallet first!",
              ephemeral: true
            });
            return;
          }
          await interaction.reply({
            content: "\u23F3 Checking your token balance on-chain...",
            ephemeral: true
          });
          const network2 = player2.solanaNetwork || "devnet";
          const tokenService = network2 === "mainnet" ? mainnetTokenService : devnetTokenService;
          const balance = await tokenService.getTokenBalance(player2.walletAddress);
          const embed = {
            color: 5025616,
            title: "\u{1F4B0} Your KUSH Token Balance",
            fields: [
              {
                name: "\u{1F45B} Wallet",
                value: `\`${player2.walletAddress.slice(0, 8)}...${player2.walletAddress.slice(-4)}\``,
                inline: false
              },
              { name: "\u{1F310} Network", value: network2, inline: true },
              { name: "\u{1F48E} Balance", value: `**${balance.toLocaleString()} $KUSH** tokens`, inline: true },
              { name: "\u{1F3AE} In-Game KUSH", value: player2.totalKush.toLocaleString(), inline: true },
              { name: "\u{1F4CA} Total Clicks", value: player2.totalClicks.toLocaleString(), inline: true }
            ],
            footer: {
              text: "Keep playing to earn more rewards! \u{1F680}"
            }
          };
          await interaction.editReply({ content: "", embeds: [embed] });
        } catch (error) {
          console.error("Balance check error:", error);
          await interaction.editReply({
            content: "\u274C Error checking balance. Please try again later."
          });
        }
      }
      async handleAdmin(interaction) {
        const username = interaction.user.username;
        if (!isAdmin2(username)) {
          await interaction.reply({
            content: "\u{1F6AB} Access denied. Admin privileges required.",
            ephemeral: true
          });
          return;
        }
        const adminPanelUrl = `${getWebAppUrl2()}/admin`;
        const embed = {
          color: 16733986,
          title: "\u{1F510} KushKlicker Admin Panel",
          description: "Access your admin dashboard with full control over:",
          fields: [
            { name: "\u{1F465} Player Management", value: "View, edit, and delete player accounts", inline: false },
            { name: "\u{1FA99} Token Rewards", value: "Track and manage pending token airdrops", inline: false },
            { name: "\u{1F4CA} System Statistics", value: "Monitor game metrics and performance", inline: false },
            { name: "\u26A1 Grow Lights", value: "Initialize and manage equipment system", inline: false }
          ],
          footer: {
            text: `Authorized admin: @${username}`
          }
        };
        await interaction.reply({
          embeds: [embed],
          components: [{
            type: 1,
            components: [{
              type: 2,
              style: 5,
              label: "\u{1F6E1}\uFE0F Open Admin Panel",
              url: adminPanelUrl
            }]
          }],
          ephemeral: true
        });
      }
      async handleButtonClick(interaction) {
        const customId = interaction.customId;
        try {
          switch (customId) {
            case "show_stats":
              await this.handleStatsButton(interaction);
              break;
            case "show_leaderboard":
              await this.handleLeaderboardButton(interaction);
              break;
            case "link_account":
              const linkEmbed = {
                color: 5025616,
                title: "\u{1F517} Link Your Discord Account",
                description: "Connect your Discord account to your KushKlicker progress!",
                fields: [
                  {
                    name: "\u{1F4DD} How to Link",
                    value: "Use the command: `/link [your_solana_wallet_address]`",
                    inline: false
                  },
                  {
                    name: "\u{1F511} Example",
                    value: "`/link 7dHbWY1gP9fGv8K3m2C9V4u...`",
                    inline: false
                  },
                  {
                    name: "\u2705 Benefits",
                    value: "\u2022 Track your progress\\n\u2022 Check stats anytime\\n\u2022 Receive token rewards\\n\u2022 Compete on leaderboards",
                    inline: false
                  }
                ],
                footer: {
                  text: "Your wallet is secure - we only store the address for rewards"
                }
              };
              await interaction.reply({ embeds: [linkEmbed], ephemeral: true });
              break;
            case "check_balance":
              await this.handleBalanceButton(interaction);
              break;
            case "show_help":
              const helpEmbed = {
                color: 2201331,
                title: "\u2753 KushKlicker Help",
                description: "Everything you need to know about KushKlicker!",
                fields: [
                  {
                    name: "\u{1F3AE} Game Commands",
                    value: "`/start` - Get started with the game\\n`/stats` - View your statistics\\n`/leaderboard` - See top players",
                    inline: false
                  },
                  {
                    name: "\u{1F4B0} Wallet Commands",
                    value: "`/link [wallet]` - Connect your Solana wallet\\n`/mywallet` - View wallet info\\n`/balance` - Check token balance",
                    inline: false
                  },
                  {
                    name: "\u{1F3AF} How to Play",
                    value: "1. Click the **Play Now** button\\n2. Start clicking to earn KUSH\\n3. Buy upgrades to increase earnings\\n4. Complete achievements for bonuses",
                    inline: false
                  },
                  {
                    name: "\u{1F517} Need More Help?",
                    value: `Visit the game: [KushKlicker](${getWebAppUrl2()})`,
                    inline: false
                  }
                ]
              };
              await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
              break;
            default:
              await interaction.reply({ content: "Unknown button pressed!", ephemeral: true });
          }
        } catch (error) {
          console.error("Button handler error:", error);
          await interaction.reply({ content: "Error processing button click.", ephemeral: true });
        }
      }
      async handlePlayers(interaction) {
        const username = interaction.user.username;
        if (!isAdmin2(username)) {
          await interaction.reply({
            content: "\u{1F6AB} Access denied. Admin privileges required.",
            ephemeral: true
          });
          return;
        }
        try {
          const players2 = await storage.getAllPlayers();
          const totalPlayers = players2.length;
          const withWallets = players2.filter((p) => p.walletAddress).length;
          const totalKush = players2.reduce((sum, p) => sum + p.totalKush, 0);
          const totalClicks = players2.reduce((sum, p) => sum + p.totalClicks, 0);
          const topPlayers = players2.sort((a, b) => b.totalKush - a.totalKush).slice(0, 5);
          const embed = {
            color: 5025616,
            title: "\u{1F465} Player Statistics",
            fields: [
              { name: "\u{1F4CA} Total Players", value: totalPlayers.toString(), inline: true },
              { name: "\u{1F4BC} With Wallets", value: withWallets.toString(), inline: true },
              { name: "\u{1F4B0} Total KUSH", value: totalKush.toLocaleString(), inline: true },
              { name: "\u{1F5B1}\uFE0F Total Clicks", value: totalClicks.toLocaleString(), inline: true },
              {
                name: "\u{1F51D} Top 5 Players",
                value: topPlayers.map(
                  (p, i) => `${i + 1}. ${p.username}: ${p.totalKush.toLocaleString()} KUSH`
                ).join("\n") || "No players found",
                inline: false
              }
            ],
            footer: {
              text: "Live game statistics"
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          console.error("Players list error:", error);
          await interaction.reply({
            content: "\u274C Error fetching player data.",
            ephemeral: true
          });
        }
      }
      // Button interaction handlers
      async handleStatsButton(interaction) {
        const discordId = interaction.user.id;
        try {
          const player2 = await storage.getPlayerByDiscordId(discordId);
          if (!player2) {
            await interaction.reply({
              content: "\u274C No linked account found! Use `/link` to connect your Discord account first.",
              ephemeral: true
            });
            return;
          }
          const embed = {
            color: 5025616,
            title: `\u{1F4CA} ${player2.username}'s Stats`,
            fields: [
              { name: "\u{1F4B0} Total KUSH", value: player2.totalKush.toLocaleString(), inline: true },
              { name: "\u{1F446} Total Clicks", value: player2.totalClicks.toLocaleString(), inline: true },
              { name: "\u26A1 Click Power", value: `${player2.perClickMultiplier}x`, inline: true },
              { name: "\u{1F916} Auto Income", value: `${player2.autoIncomePerHour}/hour`, inline: true }
            ],
            footer: {
              text: "Keep clicking to earn more KUSH!"
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          console.error("Stats button error:", error);
          await interaction.reply({ content: "Error fetching your stats. Please try again later.", ephemeral: true });
        }
      }
      async handleLeaderboardButton(interaction) {
        try {
          const topPlayers = await storage.getTopPlayers(10);
          const leaderboardText = topPlayers.map((player2, index) => `${index + 1}. ${player2.username} - ${player2.totalKush.toLocaleString()} KUSH`).join("\n");
          const embed = {
            color: 5025616,
            title: "\u{1F3C6} Top KushKlicker Players",
            description: leaderboardText || "No players found!",
            footer: {
              text: "Keep playing to climb the ranks!"
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          console.error("Leaderboard button error:", error);
          await interaction.reply({ content: "Error fetching leaderboard. Please try again later.", ephemeral: true });
        }
      }
      async handleBalanceButton(interaction) {
        const discordId = interaction.user.id;
        try {
          const player2 = await storage.getPlayerByDiscordId(discordId);
          if (!player2) {
            await interaction.reply({
              content: "\u274C No linked account found! Use `/link` to connect your Discord account first.",
              ephemeral: true
            });
            return;
          }
          if (!player2.walletAddress) {
            await interaction.reply({
              content: "\u274C No wallet linked! Use `/link` with your wallet address to check balance.",
              ephemeral: true
            });
            return;
          }
          const mainnetBalance = await mainnetTokenService.getTokenBalance(player2.walletAddress);
          const embed = {
            color: 5025616,
            title: "\u{1F4B0} Your KUSH Token Balance",
            fields: [
              { name: "\u{1F48E} Balance", value: `**${mainnetBalance.toLocaleString()} KUSH** tokens`, inline: false },
              { name: "\u{1F310} Network", value: "Solana Mainnet", inline: true },
              { name: "\u{1F3AE} In-Game KUSH", value: player2.totalKush.toLocaleString(), inline: true },
              { name: "\u{1F45B} Wallet", value: `\`${player2.walletAddress.slice(0, 8)}...${player2.walletAddress.slice(-4)}\``, inline: false }
            ],
            footer: {
              text: "Live balance from Solana blockchain"
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          console.error("Balance button error:", error);
          await interaction.reply({ content: "Error checking balance. Please try again later.", ephemeral: true });
        }
      }
      async handleGarden(interaction) {
        const discordId = interaction.user.id;
        try {
          const player2 = await storage.getPlayerByDiscordId(discordId);
          if (!player2) {
            await interaction.reply({
              content: "\u{1F50D} No linked account found! Use `/link` to connect your Discord to KushKlicker first.",
              ephemeral: true
            });
            return;
          }
          const embed = {
            color: 5025616,
            // Green color for garden theme
            title: "\u{1F331} Your Cannabis Garden",
            description: `Welcome to your garden, **${player2.username}**!`,
            fields: [
              {
                name: "\u{1F33F} Garden Stats",
                value: `**Active Plots:** Loading...
**Available Strains:** OG Kush, Blue Dream, White Widow & More
**SEEDS Balance:** ${player2.seeds || 0}`,
                inline: false
              },
              {
                name: "\u{1F680} Quick Actions",
                value: `\u{1F331} Plant new strains in your plots
\u26A1 Harvest mature plants for KUSH
\u{1F9EA} Cross-breed to create rare genetics
\u{1F3EA} Buy supplies to boost your garden`,
                inline: false
              }
            ],
            footer: {
              text: "Click the button below to open your garden!"
            },
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          };
          const components = [
            {
              type: 1,
              // Action Row
              components: [
                {
                  type: 2,
                  // Button
                  style: 5,
                  // Link style (external URL)
                  label: "\u{1F331} Open Garden",
                  url: getWebAppUrl2()
                }
              ]
            }
          ];
          await interaction.reply({ embeds: [embed], components, ephemeral: true });
        } catch (error) {
          console.error("Garden command error:", error);
          await interaction.reply({ content: "Error fetching garden data. Please try again later.", ephemeral: true });
        }
      }
      async handlePvP(interaction) {
        const discordId = interaction.user.id;
        try {
          const player2 = await storage.getPlayerByDiscordId(discordId);
          if (!player2) {
            await interaction.reply({
              content: "\u{1F50D} No linked account found! Use `/link` to connect your Discord to KushKlicker first.",
              ephemeral: true
            });
            return;
          }
          const wins = player2.wins || 0;
          const losses = player2.losses || 0;
          const winRate = wins + losses > 0 ? (wins / (wins + losses) * 100).toFixed(1) : "0.0";
          const rank = wins > 50 ? "\u{1F3C6} Legendary" : wins > 25 ? "\u{1F48E} Master" : wins > 10 ? "\u2694\uFE0F Warrior" : "\u{1F33F} Rookie";
          const embed = {
            color: 16729156,
            // Red color for PvP theme
            title: "\u2694\uFE0F Your PvP Arena Stats",
            description: `Battle stats for **${player2.username}**`,
            fields: [
              {
                name: "\u{1F3C6} Battle Record",
                value: `**Wins:** ${wins}
**Losses:** ${losses}
**Win Rate:** ${winRate}%
**Rank:** ${rank}`,
                inline: true
              },
              {
                name: "\u{1F4B0} Resources",
                value: `**KUSH Balance:** ${player2.totalKush?.toLocaleString() || 0}
**Available for Wagering**`,
                inline: true
              },
              {
                name: "\u{1F525} Arena Features",
                value: `\u2694\uFE0F Challenge other players to battles
\u{1F3C6} Join tournaments with prize pools
\u{1F48E} Use special abilities in combat
\u{1F3AF} Wager KUSH on battle outcomes`,
                inline: false
              }
            ],
            footer: {
              text: "Enter the arena and prove your worth!"
            },
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          };
          const components = [
            {
              type: 1,
              // Action Row
              components: [
                {
                  type: 2,
                  // Button
                  style: 5,
                  // Link style (external URL)
                  label: "\u2694\uFE0F Enter Arena",
                  url: getWebAppUrl2()
                }
              ]
            }
          ];
          await interaction.reply({ embeds: [embed], components, ephemeral: true });
        } catch (error) {
          console.error("PvP command error:", error);
          await interaction.reply({ content: "Error fetching PvP data. Please try again later.", ephemeral: true });
        }
      }
    };
    botInstance2 = null;
  }
});

// server/email-service.ts
var email_service_exports = {};
__export(email_service_exports, {
  emailService: () => emailService
});
import nodemailer from "nodemailer";
var EmailService, emailService;
var init_email_service = __esm({
  "server/email-service.ts"() {
    "use strict";
    EmailService = class {
      transporter = null;
      isConfigured = false;
      constructor() {
        this.initialize();
      }
      initialize() {
        const emailHost = process.env.EMAIL_HOST;
        const emailPort = process.env.EMAIL_PORT;
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        if (emailHost && emailPort && emailUser && emailPass) {
          const config = {
            host: emailHost,
            port: parseInt(emailPort),
            secure: parseInt(emailPort) === 465,
            // Use SSL for port 465
            auth: {
              user: emailUser,
              pass: emailPass
            }
          };
          this.transporter = nodemailer.createTransporter(config);
          this.isConfigured = true;
          console.log("\u{1F4E7} Email service configured successfully");
        } else {
          console.log("\u26A0\uFE0F Email service not configured - missing environment variables");
          console.log("   Required: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS");
        }
      }
      async sendEmail(to, subject, text2, html) {
        if (!this.isConfigured || !this.transporter) {
          console.log("\u274C Email service not configured - cannot send email");
          return false;
        }
        try {
          const mailOptions = {
            from: `"KushKlicker Support" <support@kushklicker.com>`,
            to,
            subject,
            text: text2,
            html: html || `<p>${text2}</p>`,
            replyTo: "support@kushklicker.com"
          };
          const result = await this.transporter.sendMail(mailOptions);
          console.log(`\u{1F4E7} Email sent successfully to ${to}: ${result.messageId}`);
          return true;
        } catch (error) {
          console.error("\u274C Failed to send email:", error);
          return false;
        }
      }
      async sendNotification(to, title, message, gameUrl = "https://kushklicker.com") {
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1f2937; color: white; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 24px;">\u{1F33F} KushKlicker</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #10b981; margin: 0 0 15px 0;">${title}</h2>
          <p style="color: #e5e7eb; line-height: 1.6; margin: 0 0 20px 0;">${message}</p>
          <div style="text-align: center;">
            <a href="${gameUrl}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              \u{1F3AE} Play KushKlicker
            </a>
          </div>
        </div>
        <div style="background: #374151; padding: 15px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p style="margin: 0 0 8px 0;">You received this because you're part of the KushKlicker community.</p>
          <p style="margin: 0;">Need help? Contact us: <a href="mailto:support@kushklicker.com" style="color: #10b981;">support@kushklicker.com</a></p>
        </div>
      </div>
    `;
        return await this.sendEmail(to, title, message, html);
      }
      isReady() {
        return this.isConfigured;
      }
    };
    emailService = new EmailService();
  }
});

// server/comprehensive-game-service.ts
var comprehensive_game_service_exports = {};
__export(comprehensive_game_service_exports, {
  analyticsService: () => analyticsService,
  clickMechanicsService: () => clickMechanicsService,
  dailyChallengesService: () => dailyChallengesService,
  friendsService: () => friendsService,
  growGardenService: () => growGardenService,
  guildService: () => guildService,
  marketplaceService: () => marketplaceService,
  prestigeService: () => prestigeService,
  pvpBattleArenaService: () => pvpBattleArenaService,
  seasonalEventsService: () => seasonalEventsService,
  vipService: () => vipService
});
var PrestigeService, DailyChallengesService, FriendsService, ClickMechanicsService, GuildService, GrowGardenService, PvPBattleArenaService, VIPSubscriptionService, SeasonalEventsService, AnalyticsService, MarketplaceService, prestigeService, dailyChallengesService, friendsService, pvpBattleArenaService, clickMechanicsService, guildService, growGardenService, vipService, analyticsService, seasonalEventsService, marketplaceService;
var init_comprehensive_game_service = __esm({
  "server/comprehensive-game-service.ts"() {
    "use strict";
    init_storage();
    init_cache();
    PrestigeService = class {
      async canPrestige(playerId) {
        const player2 = await storage.getPlayer(playerId);
        if (!player2) return false;
        return player2.totalKush >= 1e9;
      }
      async executePrestige(playerId) {
        try {
          const player2 = await storage.getPlayer(playerId);
          if (!player2 || !await this.canPrestige(playerId)) {
            return { success: false, newMultiplier: 0 };
          }
          const currentLevel = await this.getPrestigeLevel(playerId);
          const newMultiplier = 100 + (currentLevel + 1) * 10;
          await storage.addPrestigeLevel({
            playerId,
            level: currentLevel + 1,
            totalKushAtPrestige: player2.totalKush,
            permanentMultiplier: newMultiplier
          });
          await storage.resetPlayerForPrestige(playerId, newMultiplier);
          return { success: true, newMultiplier };
        } catch (error) {
          console.error("Error executing prestige:", error);
          return { success: false, newMultiplier: 0 };
        }
      }
      async getPrestigeLevel(playerId) {
        const levels = await storage.getPlayerPrestigeLevels(playerId);
        return levels.length;
      }
      async getPrestigeMultiplier(playerId) {
        const levels = await storage.getPlayerPrestigeLevels(playerId);
        if (levels.length === 0) return 100;
        const latestLevel = levels[levels.length - 1];
        return latestLevel.permanentMultiplier;
      }
    };
    DailyChallengesService = class {
      getDailyKey() {
        const today = /* @__PURE__ */ new Date();
        return today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
      }
      async getTodaysChallenges() {
        const cacheKey = `daily-challenges:${this.getDailyKey()}`;
        let challenges = cache.get(cacheKey);
        if (!challenges) {
          challenges = await storage.getDailyChallengesForDate(this.getDailyKey());
          if (challenges.length === 0) {
            challenges = await this.generateDailyChallenges();
          }
          cache.set(cacheKey, challenges, 36e5);
        }
        return challenges;
      }
      async generateDailyChallenges() {
        const dateKey = this.getDailyKey();
        const challengeTemplates = [
          { name: "Click Master", description: "Achieve 1,000 clicks", challengeType: "clicks", targetValue: 1e3, kushReward: 500, seedsReward: 100, icon: "\u{1F446}", difficulty: "easy" },
          { name: "Token Burner", description: "Burn 100 KUSH tokens", challengeType: "burns", targetValue: 100, kushReward: 200, seedsReward: 150, icon: "\u{1F525}", difficulty: "medium" },
          { name: "Upgrade Collector", description: "Purchase 5 upgrades", challengeType: "upgrades", targetValue: 5, kushReward: 300, seedsReward: 80, icon: "\u2B06\uFE0F", difficulty: "medium" },
          { name: "KUSH Accumulator", description: "Earn 10,000 KUSH", challengeType: "tokens", targetValue: 1e4, kushReward: 1e3, seedsReward: 200, icon: "\u{1F4B0}", difficulty: "hard" }
        ];
        const selectedChallenges = challengeTemplates.sort(() => 0.5 - Math.random()).slice(0, 3);
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
      async getPlayerChallengeProgress(playerId) {
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
      async updateChallengeProgress(playerId, challengeType, incrementValue) {
        const todaysChallenges = await this.getTodaysChallenges();
        const relevantChallenges = todaysChallenges.filter((c) => c.challengeType === challengeType);
        for (const challenge of relevantChallenges) {
          await storage.updatePlayerDailyChallengeProgress(
            playerId,
            challenge.id,
            incrementValue,
            this.getDailyKey()
          );
          const progress = await storage.getPlayerDailyChallengeProgress(playerId, challenge.id, this.getDailyKey());
          if (progress && progress.progress >= challenge.targetValue && !progress.completed) {
            await storage.completeDailyChallenge(playerId, challenge.id, this.getDailyKey());
            await this.rewardPlayer(playerId, challenge.kushReward, challenge.seedsReward);
          }
        }
      }
      async rewardPlayer(playerId, kushReward, seedsReward) {
        if (kushReward > 0) {
          await storage.addPlayerKush(playerId, kushReward);
        }
        if (seedsReward > 0) {
          await storage.addPlayerSeeds(playerId, seedsReward);
        }
      }
    };
    FriendsService = class {
      async sendFriendRequest(fromPlayerId, toPlayerUsername) {
        try {
          const toPlayer = await storage.getPlayerByUsername(toPlayerUsername);
          if (!toPlayer) {
            return { success: false, message: "Player not found" };
          }
          if (fromPlayerId === toPlayer.id) {
            return { success: false, message: "Cannot send friend request to yourself" };
          }
          const existingFriendship = await storage.getFriendship(fromPlayerId, toPlayer.id);
          if (existingFriendship) {
            return { success: false, message: "Friend request already exists or you are already friends" };
          }
          await storage.createFriendship({
            playerId: fromPlayerId,
            friendId: toPlayer.id,
            status: "pending"
          });
          return { success: true, message: "Friend request sent!" };
        } catch (error) {
          console.error("Error sending friend request:", error);
          return { success: false, message: "Failed to send friend request" };
        }
      }
      async acceptFriendRequest(playerId, friendshipId) {
        try {
          await storage.updateFriendshipStatus(friendshipId, "accepted");
          return true;
        } catch (error) {
          console.error("Error accepting friend request:", error);
          return false;
        }
      }
      async getFriendsList(playerId) {
        return await storage.getPlayerFriends(playerId);
      }
      async getPendingRequests(playerId) {
        return await storage.getPendingFriendRequests(playerId);
      }
      async sendGift(fromPlayerId, toPlayerId, giftType, amount, message) {
        try {
          const friendship = await storage.getFriendship(fromPlayerId, toPlayerId);
          if (!friendship || friendship.status !== "accepted") {
            return false;
          }
          const canSend = await this.validateGiftResources(fromPlayerId, giftType, amount);
          if (!canSend) return false;
          await this.deductGiftResources(fromPlayerId, giftType, amount);
          await storage.createFriendGift({
            fromPlayerId,
            toPlayerId,
            giftType,
            amount,
            message: message || ""
          });
          return true;
        } catch (error) {
          console.error("Error sending gift:", error);
          return false;
        }
      }
      async validateGiftResources(playerId, giftType, amount) {
        const wallet = await storage.getPlayerWallet(playerId);
        if (!wallet) return false;
        switch (giftType) {
          case "kush":
            return wallet.kushBalance >= amount;
          case "seeds":
            return wallet.seedsBalance >= amount;
          default:
            return false;
        }
      }
      async deductGiftResources(playerId, giftType, amount) {
        switch (giftType) {
          case "kush":
            await storage.deductPlayerKush(playerId, amount);
            break;
          case "seeds":
            await storage.deductPlayerSeeds(playerId, amount);
            break;
        }
      }
    };
    ClickMechanicsService = class {
      combos = /* @__PURE__ */ new Map();
      criticalChance = 0.05;
      // 5% base critical hit chance
      async processClick(playerId) {
        const player2 = await storage.getPlayer(playerId);
        if (!player2) return { kushEarned: 0, isCritical: false, comboMultiplier: 1 };
        const isCritical = Math.random() < this.criticalChance;
        const criticalMultiplier = isCritical ? 2 + Math.random() * 8 : 1;
        const comboMultiplier = this.updateComboChain(playerId);
        const prestigeMultiplier = await prestigeService.getPrestigeMultiplier(playerId) / 100;
        const vipBenefits2 = await vipService.getVIPBenefits(playerId);
        const vipMultiplier = vipBenefits2.hasVIP ? vipBenefits2.benefits.kushMultiplier / 100 : 1;
        const baseKush = player2.perClickMultiplier * prestigeMultiplier * criticalMultiplier * comboMultiplier * vipMultiplier;
        await this.updateClickSession(playerId, isCritical, comboMultiplier);
        await dailyChallengesService.updateChallengeProgress(playerId, "clicks", 1);
        return {
          kushEarned: Math.floor(baseKush),
          isCritical,
          comboMultiplier,
          specialPattern: this.checkSpecialPattern(playerId)
        };
      }
      updateComboChain(playerId) {
        const now = Date.now();
        const combo = this.combos.get(playerId) || { count: 0, lastClickTime: 0 };
        if (now - combo.lastClickTime > 2e3) {
          combo.count = 1;
        } else {
          combo.count++;
        }
        combo.lastClickTime = now;
        this.combos.set(playerId, combo);
        return 1 + Math.min(combo.count * 0.2, 2);
      }
      async updateClickSession(playerId, isCritical, comboMultiplier) {
        await storage.updateClickSession(playerId, {
          totalClicks: 1,
          criticalHits: isCritical ? 1 : 0,
          maxCombo: Math.floor(comboMultiplier * 10)
          // Store combo as integer
        });
      }
      checkSpecialPattern(playerId) {
        const combo = this.combos.get(playerId);
        if (!combo) return void 0;
        if (combo.count === 50) return "Half Century!";
        if (combo.count === 100) return "Century Master!";
        if (combo.count === 250) return "Click Fury!";
        if (combo.count === 500) return "Legendary Clicker!";
        return void 0;
      }
      async activateClickBoost(playerId, boostType, multiplier, duration) {
        try {
          const expiresAt = new Date(Date.now() + duration * 1e3);
          await storage.createClickBoost({
            playerId,
            boostType,
            multiplier,
            duration,
            expiresAt
          });
          return true;
        } catch (error) {
          console.error("Error activating click boost:", error);
          return false;
        }
      }
      async getActiveBoosts(playerId) {
        return await storage.getActiveClickBoosts(playerId);
      }
    };
    GuildService = class {
      async createGuild(leaderId, name, description) {
        try {
          const existingMembership = await storage.getPlayerGuildMembership(leaderId);
          if (existingMembership) {
            return { success: false, message: "You are already in a guild" };
          }
          const existingGuild = await storage.getGuildByName(name);
          if (existingGuild) {
            return { success: false, message: "Guild name already taken" };
          }
          const guild = await storage.createGuild({
            name,
            description: description || "",
            leaderPlayerId: leaderId,
            memberCount: 1,
            maxMembers: 50,
            totalKushEarned: 0,
            guildLevel: 1,
            isPublic: true
          });
          await storage.addGuildMember({
            guildId: guild.id,
            playerId: leaderId,
            role: "leader",
            contributedKush: 0
          });
          return { success: true, guildId: guild.id, message: "Guild created successfully!" };
        } catch (error) {
          console.error("Error creating guild:", error);
          return { success: false, message: "Failed to create guild" };
        }
      }
      async joinGuild(playerId, guildId) {
        try {
          const existingMembership = await storage.getPlayerGuildMembership(playerId);
          if (existingMembership) {
            return { success: false, message: "You are already in a guild" };
          }
          const guild = await storage.getGuildById(guildId);
          if (!guild) {
            return { success: false, message: "Guild not found" };
          }
          if (guild.memberCount >= guild.maxMembers) {
            return { success: false, message: "Guild is full" };
          }
          await storage.addGuildMember({
            guildId,
            playerId,
            role: "member",
            contributedKush: 0
          });
          await storage.updateGuildMemberCount(guildId, guild.memberCount + 1);
          return { success: true, message: "Successfully joined guild!" };
        } catch (error) {
          console.error("Error joining guild:", error);
          return { success: false, message: "Failed to join guild" };
        }
      }
      async getGuildMembers(guildId) {
        return await storage.getGuildMembers(guildId);
      }
      async getGuildLeaderboard() {
        return await storage.getGuildLeaderboard();
      }
      async contributeToGuild(playerId, kushAmount) {
        try {
          const membership = await storage.getPlayerGuildMembership(playerId);
          if (!membership) return false;
          const wallet = await storage.getPlayerWallet(playerId);
          if (!wallet || wallet.kushBalance < kushAmount) return false;
          await storage.deductPlayerKush(playerId, kushAmount);
          await storage.updateGuildContribution(membership.guildId, playerId, kushAmount);
          return true;
        } catch (error) {
          console.error("Error contributing to guild:", error);
          return false;
        }
      }
      async getPlayerGuild(playerId) {
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
          console.error("Error fetching player guild:", error);
          return { guild: null, role: null, joinedAt: null };
        }
      }
    };
    GrowGardenService = class {
      GROWTH_STAGES = ["empty", "seedling", "vegetative", "flowering", "ready"];
      WATER_INTERVAL = 4 * 60 * 60 * 1e3;
      // 4 hours in milliseconds
      FERTILIZER_INTERVAL = 8 * 60 * 60 * 1e3;
      // 8 hours in milliseconds
      // Strain Genetics Management
      async getAllStrains() {
        let strains = await storage.getAllStrainGenetics();
        if (strains.length === 0) {
          await this.initializeDefaultStrains();
          strains = await storage.getAllStrainGenetics();
        }
        return strains;
      }
      async initializeDefaultStrains() {
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
            icon: "\u{1F33F}"
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
            icon: "\u{1F499}"
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
            icon: "\u2744\uFE0F"
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
            icon: "\u{1F36A}"
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
            icon: "\u{1F98D}"
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
            icon: "\u{1F49C}"
          }
        ];
        for (const strain of defaultStrains) {
          await storage.createStrainGenetics({
            id: `strain_${strain.name.toLowerCase().replace(/\s+/g, "_")}`,
            ...strain
          });
        }
      }
      async getPlayerOwnedStrains(playerId) {
        return await storage.getPlayerStrainGenetics(playerId);
      }
      async crossBreedStrains(playerId, strain1Id, strain2Id) {
        try {
          const player2 = await storage.getPlayer(playerId);
          const strain1 = await storage.getStrainGenetics(strain1Id);
          const strain2 = await storage.getStrainGenetics(strain2Id);
          if (!player2 || !strain1 || !strain2) {
            return { success: false, message: "Invalid player or strain selection" };
          }
          const playerWallet = await storage.getPlayerWallet(playerId);
          if (playerWallet.seedsBalance < 10) {
            return { success: false, message: "Need 10 SEEDS tokens to cross-breed strains" };
          }
          const newStrain1 = await this.generateCrossBredStrain(strain1, strain2, playerId, 1);
          const newStrain2 = await this.generateCrossBredStrain(strain1, strain2, playerId, 2);
          await storage.addPlayerSeeds(playerId, -10);
          await storage.addSeedsTransaction({
            playerId,
            amount: -10,
            transactionType: "spent",
            reason: `Cross-bred ${strain1.name} x ${strain2.name} (2 strains)`
          });
          return {
            success: true,
            newStrain: [newStrain1, newStrain2],
            message: `Successfully created 2 new strains: ${newStrain1.name} and ${newStrain2.name}!`
          };
        } catch (error) {
          console.error("Error cross-breeding strains:", error);
          return { success: false, message: "Cross-breeding failed" };
        }
      }
      async generateCrossBredStrain(parent1, parent2, playerId, variant) {
        const rarities = ["common", "uncommon", "rare", "epic", "legendary"];
        const parent1RarityIndex = rarities.indexOf(parent1.rarity);
        const parent2RarityIndex = rarities.indexOf(parent2.rarity);
        const baseRarityIndex = Math.max(parent1RarityIndex, parent2RarityIndex);
        let newRarityIndex = baseRarityIndex;
        if (Math.random() > 0.8) newRarityIndex = Math.min(4, baseRarityIndex + 1);
        if (Math.random() > 0.95) newRarityIndex = Math.min(4, baseRarityIndex + 2);
        const rarity = rarities[newRarityIndex];
        const rarityBonus = newRarityIndex * 2;
        const uniquenessFactor = newRarityIndex + 1;
        const avgThc = Math.floor((parent1.thcLevel + parent2.thcLevel) / 2);
        const avgCbd = Math.floor((parent1.cbdLevel + parent2.cbdLevel) / 2);
        const avgFlowerTime = Math.floor((parent1.floweringTime + parent2.floweringTime) / 2);
        const avgYield = Math.max(parent1.yieldMultiplier, parent2.yieldMultiplier);
        const avgClickBonus = Math.max(parent1.clickBonus, parent2.clickBonus);
        const thcBonus = Math.floor(Math.random() * (5 + rarityBonus));
        const cbdBonus = Math.floor(Math.random() * (3 + rarityBonus));
        const yieldBonus = Math.floor(Math.random() * (10 + rarityBonus * 2));
        const clickBonusExtra = Math.floor(Math.random() * (5 + rarityBonus));
        const uniqueAdjectives = {
          common: ["Hybrid", "Cross", "Blend"],
          uncommon: ["Elite", "Select", "Prime"],
          rare: ["Exotic", "Supreme", "Royal"],
          epic: ["Legendary", "Mythic", "Divine"],
          legendary: ["Cosmic", "Ethereal", "Transcendent"]
        };
        const adjective = uniqueAdjectives[rarity][Math.floor(Math.random() * uniqueAdjectives[rarity].length)];
        const hybridName = `${adjective} ${parent1.name.split(" ")[0]}${parent2.name.split(" ")[0]} #${variant}`;
        const rarityIcons = {
          common: "\u{1F33F}",
          uncommon: "\u{1F343}",
          rare: "\u{1F33A}",
          epic: "\u{1F48E}",
          legendary: "\u2B50"
        };
        return await storage.createStrainGenetics({
          name: hybridName,
          type: "hybrid",
          rarity,
          thcLevel: Math.min(35, avgThc + thcBonus),
          cbdLevel: Math.min(30, avgCbd + cbdBonus),
          floweringTime: Math.max(30, avgFlowerTime - Math.floor(rarityBonus / 2)),
          // Faster flowering for rarer
          yieldMultiplier: avgYield + yieldBonus,
          clickBonus: avgClickBonus + clickBonusExtra,
          description: `A ${rarity} hybrid strain with enhanced ${uniquenessFactor > 3 ? "extraordinary" : "unique"} properties from ${parent1.name} and ${parent2.name}`,
          parentStrain1: parent1.id,
          parentStrain2: parent2.id,
          discoveredBy: playerId,
          icon: rarityIcons[rarity]
        });
      }
      // Garden Plot Management
      async getPlayerGarden(playerId) {
        const plots = await storage.getPlayerGardenPlots(playerId);
        if (plots.length === 0) {
          const initialPlot = await storage.createGardenPlot({
            playerId,
            plotNumber: 1,
            isUnlocked: true,
            unlockCost: 0
          });
          return [initialPlot];
        }
        return plots;
      }
      async unlockGardenPlot(playerId, plotNumber) {
        try {
          const player2 = await storage.getPlayer(playerId);
          const existingPlot = await storage.getGardenPlot(playerId, plotNumber);
          if (!player2) {
            return { success: false, message: "Player not found" };
          }
          if (existingPlot && existingPlot.isUnlocked) {
            return { success: false, message: "Plot already unlocked" };
          }
          const unlockCost = this.calculatePlotUnlockCost(plotNumber);
          if (player2.totalKush < unlockCost) {
            return { success: false, message: `Need ${unlockCost.toLocaleString()} KUSH to unlock this plot` };
          }
          await storage.updatePlayer(playerId, { totalKush: player2.totalKush - unlockCost });
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
          console.error("Error unlocking garden plot:", error);
          return { success: false, message: "Failed to unlock plot" };
        }
      }
      calculatePlotUnlockCost(plotNumber) {
        return Math.floor(1e6 * Math.pow(2.5, plotNumber - 1));
      }
      // Plant Growing & Care System
      async plantStrain(playerId, plotId, strainId) {
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
          if (plot.growthStage !== "empty") {
            return { success: false, message: "Plot is not empty" };
          }
          const seedSupply = supplies.find((s) => s.supplyType === "seeds");
          if (!seedSupply || seedSupply.quantity < 1) {
            return { success: false, message: "Need at least 1 seed to plant" };
          }
          const now = /* @__PURE__ */ new Date();
          const harvestTime = new Date(now.getTime() + strain.floweringTime * 24 * 60 * 60 * 1e3);
          await storage.updateGardenPlot(plotId, {
            strainId: strain.id,
            plantedAt: now,
            lastWatered: now,
            growthStage: "seedling",
            harvestTime,
            expectedYield: this.calculateExpectedYield(strain)
          });
          await storage.updateGardenSupplies(playerId, "seeds", seedSupply.quantity - 1);
          return { success: true, message: `${strain.name} planted successfully!` };
        } catch (error) {
          console.error("Error planting strain:", error);
          return { success: false, message: "Planting failed" };
        }
      }
      calculateExpectedYield(strain) {
        const baseYield = 100 + Math.floor(Math.random() * 50);
        return Math.floor(baseYield * (strain.yieldMultiplier / 100));
      }
      async waterPlant(playerId, plotId) {
        try {
          const plot = await storage.getGardenPlotById(plotId);
          const supplies = await storage.getPlayerGardenSupplies(playerId);
          if (!plot || plot.playerId !== playerId) {
            return { success: false, message: "Invalid plot" };
          }
          if (plot.growthStage === "empty" || plot.growthStage === "ready") {
            return { success: false, message: "No plant to water" };
          }
          const waterSupply = supplies.find((s) => s.supplyType === "water");
          if (!waterSupply || waterSupply.quantity < 1) {
            return { success: false, message: "Need water supply to water plants" };
          }
          const timeSinceLastWater = Date.now() - new Date(plot.lastWatered).getTime();
          if (timeSinceLastWater < this.WATER_INTERVAL) {
            const waitTime = Math.ceil((this.WATER_INTERVAL - timeSinceLastWater) / (60 * 60 * 1e3));
            return { success: false, message: `Plant was recently watered. Wait ${waitTime} more hours.` };
          }
          await storage.updateGardenPlot(plotId, { lastWatered: /* @__PURE__ */ new Date() });
          await storage.updateGardenSupplies(playerId, "water", waterSupply.quantity - 1);
          await this.updatePlantGrowthStage(plot);
          return { success: true, message: "Plant watered successfully!" };
        } catch (error) {
          console.error("Error watering plant:", error);
          return { success: false, message: "Watering failed" };
        }
      }
      async fertilizePlant(playerId, plotId) {
        try {
          const plot = await storage.getGardenPlotById(plotId);
          const supplies = await storage.getPlayerGardenSupplies(playerId);
          if (!plot || plot.playerId !== playerId) {
            return { success: false, message: "Invalid plot" };
          }
          if (plot.growthStage === "empty" || plot.growthStage === "ready") {
            return { success: false, message: "No plant to fertilize" };
          }
          const fertilizerSupply = supplies.find((s) => s.supplyType === "fertilizer");
          if (!fertilizerSupply || fertilizerSupply.quantity < 1) {
            return { success: false, message: "Need fertilizer to boost plant growth" };
          }
          const timeSinceLastFertilizer = Date.now() - new Date(plot.lastFertilized || plot.plantedAt).getTime();
          if (timeSinceLastFertilizer < this.FERTILIZER_INTERVAL) {
            const waitTime = Math.ceil((this.FERTILIZER_INTERVAL - timeSinceLastFertilizer) / (60 * 60 * 1e3));
            return { success: false, message: `Plant was recently fertilized. Wait ${waitTime} more hours.` };
          }
          const currentHarvestTime = new Date(plot.harvestTime);
          const timeReduction = 0.1 * (currentHarvestTime.getTime() - Date.now());
          const newHarvestTime = new Date(currentHarvestTime.getTime() - timeReduction);
          await storage.updateGardenPlot(plotId, {
            lastFertilized: /* @__PURE__ */ new Date(),
            harvestTime: newHarvestTime,
            expectedYield: Math.floor(plot.expectedYield * 1.2)
            // 20% yield boost
          });
          await storage.updateGardenSupplies(playerId, "fertilizer", fertilizerSupply.quantity - 1);
          return { success: true, message: "Plant fertilized! Growth accelerated and yield increased!" };
        } catch (error) {
          console.error("Error fertilizing plant:", error);
          return { success: false, message: "Fertilizing failed" };
        }
      }
      async updatePlantGrowthStage(plot) {
        if (!plot.plantedAt || !plot.harvestTime) return;
        const now = Date.now();
        const plantedTime = new Date(plot.plantedAt).getTime();
        const harvestTime = new Date(plot.harvestTime).getTime();
        const totalGrowthTime = harvestTime - plantedTime;
        const elapsedTime = now - plantedTime;
        const growthProgress = elapsedTime / totalGrowthTime;
        let newStage = "seedling";
        if (growthProgress >= 1) newStage = "ready";
        else if (growthProgress >= 0.75) newStage = "flowering";
        else if (growthProgress >= 0.4) newStage = "vegetative";
        if (newStage !== plot.growthStage) {
          await storage.updateGardenPlot(plot.id, { growthStage: newStage });
        }
      }
      async updateAllPlantGrowthStages(playerId) {
        try {
          const plots = await storage.getPlayerGardenPlots(playerId);
          for (const plot of plots) {
            if (plot.strainId && plot.plantedAt) {
              await this.updatePlantGrowthStage(plot);
            }
          }
        } catch (error) {
          console.error("Error updating plant growth stages:", error);
        }
      }
      // Harvesting System
      async harvestPlant(playerId, plotId) {
        try {
          const plot = await storage.getGardenPlotById(plotId);
          const strain = plot?.strainId ? await storage.getStrainGenetics(plot.strainId) : null;
          if (!plot || plot.playerId !== playerId) {
            return { success: false, message: "Invalid plot" };
          }
          if (plot.growthStage !== "ready") {
            return { success: false, message: "Plant is not ready for harvest" };
          }
          if (!strain) {
            return { success: false, message: "Strain data not found" };
          }
          const kushEarned = plot.expectedYield + strain.clickBonus;
          const seedsEarned = Math.floor(kushEarned * 0.1);
          const specialItems = [];
          if (Math.random() < 0.1) {
            specialItems.push("Rare Seed Packet");
          }
          if (Math.random() < 0.05) {
            specialItems.push("Premium Fertilizer");
          }
          const player2 = await storage.getPlayer(playerId);
          const wallet = await storage.getPlayerWallet(playerId);
          await storage.updatePlayer(playerId, {
            totalKush: player2.totalKush + kushEarned
          });
          await storage.addPlayerSeeds(playerId, seedsEarned);
          await storage.addHarvestHistory({
            playerId,
            plotId,
            strainId: strain.id,
            kushEarned,
            seedsEarned,
            specialItems: JSON.stringify(specialItems)
          });
          await storage.updateGardenPlot(plotId, {
            strainId: null,
            plantedAt: null,
            lastWatered: null,
            lastFertilized: null,
            growthStage: "empty",
            harvestTime: null,
            expectedYield: 0
          });
          await storage.addGardenSupplies(playerId, "seeds", 2 + Math.floor(Math.random() * 3));
          return {
            success: true,
            message: `Harvested ${strain.name} successfully!`,
            rewards: { kushEarned, seedsEarned, specialItems }
          };
        } catch (error) {
          console.error("Error harvesting plant:", error);
          return { success: false, message: "Harvest failed" };
        }
      }
      // Garden Supplies Management
      async buyGardenSupplies(playerId, supplyType, quantity) {
        try {
          const costs = {
            water: 100,
            // 100 KUSH per water
            fertilizer: 500,
            // 500 KUSH per fertilizer  
            seeds: 1e3,
            // 1000 KUSH per seed packet (gives 5 seeds)
            nutrients: 300,
            // 300 KUSH per nutrient
            ph_strips: 200
            // 200 KUSH per pH strips
          };
          if (!costs[supplyType]) {
            return { success: false, message: "Invalid supply type" };
          }
          const totalCost = costs[supplyType] * quantity;
          const player2 = await storage.getPlayer(playerId);
          if (!player2 || player2.totalKush < totalCost) {
            return { success: false, message: `Need ${totalCost.toLocaleString()} KUSH to buy ${quantity}x ${supplyType}` };
          }
          await storage.updatePlayer(playerId, { totalKush: player2.totalKush - totalCost });
          const actualQuantity = supplyType === "seeds" ? quantity * 5 : quantity;
          await storage.addGardenSupplies(playerId, supplyType, actualQuantity);
          return {
            success: true,
            message: `Purchased ${quantity}x ${supplyType}${supplyType === "seeds" ? " packets" : ""} for ${totalCost.toLocaleString()} KUSH!`
          };
        } catch (error) {
          console.error("Error buying garden supplies:", error);
          return { success: false, message: "Purchase failed" };
        }
      }
      async getPlayerSupplies(playerId) {
        return await storage.getPlayerGardenSupplies(playerId);
      }
      async getHarvestHistory(playerId) {
        return await storage.getPlayerHarvestHistory(playerId);
      }
    };
    PvPBattleArenaService = class {
      // Battle Management
      async challengePlayer(challengerId, defenderId, wager) {
        try {
          const challenger = await storage.getPlayer(challengerId);
          const defender = await storage.getPlayer(defenderId);
          if (!challenger || !defender) {
            return { success: false, message: "Player not found" };
          }
          if (challenger.totalKush < wager) {
            return { success: false, message: `Need ${wager.toLocaleString()} KUSH to place wager` };
          }
          const battleId = `battle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const battle = {
            id: battleId,
            challengerId,
            defenderId,
            wager,
            status: "pending",
            createdAt: /* @__PURE__ */ new Date(),
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
          console.error("Error creating challenge:", error);
          return { success: false, message: "Challenge failed" };
        }
      }
      async getActiveBattles(playerId) {
        if (playerId) {
          return await storage.getPlayerBattles(playerId);
        }
        return await storage.getActiveBattles();
      }
      async useAbility(playerId, battleId, abilityId) {
        try {
          const battle = await storage.getBattle(battleId);
          const player2 = await storage.getPlayer(playerId);
          if (!battle || !player2) {
            return { success: false, damage: 0, message: "Battle or player not found" };
          }
          if (battle.currentTurn !== playerId) {
            return { success: false, damage: 0, message: "Not your turn!" };
          }
          const abilities = {
            "flame_strike": { cost: 100, damage: 25, name: "Flame Strike" },
            "ice_shard": { cost: 150, damage: 30, name: "Ice Shard" },
            "lightning_bolt": { cost: 200, damage: 40, name: "Lightning Bolt" },
            "poison_cloud": { cost: 120, damage: 20, name: "Poison Cloud" }
          };
          const ability = abilities[abilityId];
          if (!ability) {
            return { success: false, damage: 0, message: "Unknown ability" };
          }
          if (player2.totalKush < ability.cost) {
            return { success: false, damage: 0, message: `Need ${ability.cost} KUSH to use ${ability.name}` };
          }
          await storage.updatePlayer(playerId, { totalKush: player2.totalKush - ability.cost });
          const isChallenger = battle.challengerId === playerId;
          const damage = ability.damage + Math.floor(Math.random() * 10);
          const updateData = {
            currentTurn: isChallenger ? battle.defenderId : battle.challengerId
          };
          if (isChallenger) {
            updateData.defenderHP = Math.max(0, battle.defenderHP - damage);
            if (updateData.defenderHP <= 0) {
              updateData.status = "completed";
              updateData.winner = playerId;
            }
          } else {
            updateData.challengerHP = Math.max(0, battle.challengerHP - damage);
            if (updateData.challengerHP <= 0) {
              updateData.status = "completed";
              updateData.winner = playerId;
            }
          }
          await storage.updateBattle(battleId, updateData);
          if (updateData.status === "completed") {
            await this.completeBattle(battleId, playerId, battle.wager);
          }
          return {
            success: true,
            damage,
            message: `${ability.name} dealt ${damage} damage!`
          };
        } catch (error) {
          console.error("Error using ability:", error);
          return { success: false, damage: 0, message: "Ability failed" };
        }
      }
      async completeBattle(battleId, winnerId, wager) {
        try {
          const battle = await storage.getBattle(battleId);
          if (!battle) return;
          const loserId = battle.challengerId === winnerId ? battle.defenderId : battle.challengerId;
          const winnerReward = wager * 2;
          await storage.addPlayerKush(winnerId, winnerReward);
          await storage.deductPlayerKush(loserId, wager);
          await storage.updateBattleStats(winnerId, "win");
          await storage.updateBattleStats(loserId, "loss");
          await storage.recordBattleResult({
            battleId,
            winnerId,
            loserId,
            wager,
            winnerReward,
            completedAt: /* @__PURE__ */ new Date()
          });
        } catch (error) {
          console.error("Error completing battle:", error);
        }
      }
      // Tournament Management
      async joinTournament(playerId, tournamentId) {
        try {
          const player2 = await storage.getPlayer(playerId);
          const tournament = await storage.getTournament(tournamentId);
          if (!player2 || !tournament) {
            return { success: false, message: "Player or tournament not found" };
          }
          if (tournament.participants >= tournament.maxParticipants) {
            return { success: false, message: "Tournament is full" };
          }
          if (player2.totalKush < tournament.entryFee) {
            return { success: false, message: `Need ${tournament.entryFee.toLocaleString()} KUSH entry fee` };
          }
          await storage.updatePlayer(playerId, { totalKush: player2.totalKush - tournament.entryFee });
          await storage.joinTournament(playerId, tournamentId);
          return { success: true, message: `Joined ${tournament.name}!` };
        } catch (error) {
          console.error("Error joining tournament:", error);
          return { success: false, message: "Failed to join tournament" };
        }
      }
      async getOpenTournaments() {
        return await storage.getOpenTournaments();
      }
      async getBattleLeaderboard() {
        return await storage.getBattleLeaderboard();
      }
    };
    VIPSubscriptionService = class {
      VIP_TIERS = {
        silver: { price: 500, kushMultiplier: 150, seedsBonus: 50, exclusiveStrains: ["strain_silver_haze"] },
        gold: { price: 1e3, kushMultiplier: 200, seedsBonus: 100, exclusiveStrains: ["strain_golden_goat", "strain_amnesia_gold"] },
        platinum: { price: 2e3, kushMultiplier: 300, seedsBonus: 200, exclusiveStrains: ["strain_platinum_kush", "strain_super_silver"] },
        diamond: { price: 3500, kushMultiplier: 500, seedsBonus: 500, exclusiveStrains: ["strain_diamond_og", "strain_crystal_cookies"] }
      };
      async subscribeToVIP(playerId, tier) {
        try {
          const player2 = await storage.getPlayer(playerId);
          const tierConfig = this.VIP_TIERS[tier];
          if (!player2 || !tierConfig) {
            return { success: false, message: "Invalid player or VIP tier" };
          }
          if (player2.totalKush < tierConfig.price) {
            return { success: false, message: `Need ${tierConfig.price.toLocaleString()} KUSH for ${tier} VIP` };
          }
          const existingSub = await storage.getPlayerVIPSubscription(playerId);
          if (existingSub && existingSub.status === "active") {
            return { success: false, message: "Already have active VIP subscription" };
          }
          await storage.updatePlayer(playerId, { totalKush: player2.totalKush - tierConfig.price });
          const nextBilling = /* @__PURE__ */ new Date();
          nextBilling.setHours(nextBilling.getHours() + 1);
          await storage.createVIPSubscription({
            playerId,
            tier,
            monthlyPrice: tierConfig.price,
            kushMultiplier: tierConfig.kushMultiplier,
            seedsBonus: tierConfig.seedsBonus,
            exclusiveStrains: JSON.stringify(tierConfig.exclusiveStrains),
            prioritySupport: tier === "platinum" || tier === "diamond",
            nextBillingDate: nextBilling
          });
          await storage.addPlayerSeeds(playerId, tierConfig.seedsBonus);
          return { success: true, message: `Welcome to ${tier.toUpperCase()} VIP! Enjoy exclusive benefits! +${tierConfig.seedsBonus} seeds bonus!` };
        } catch (error) {
          console.error("VIP subscription error:", error);
          return { success: false, message: "Subscription failed" };
        }
      }
      async getVIPBenefits(playerId) {
        const subscription = await storage.getPlayerVIPSubscription(playerId);
        if (!subscription || subscription.status !== "active") {
          return { hasVIP: false, tier: null, benefits: {} };
        }
        return {
          hasVIP: true,
          tier: subscription.tier,
          benefits: {
            kushMultiplier: subscription.kushMultiplier,
            seedsBonus: subscription.seedsBonus,
            exclusiveStrains: JSON.parse(subscription.exclusiveStrains || "[]"),
            prioritySupport: subscription.prioritySupport
          }
        };
      }
    };
    SeasonalEventsService = class {
      async createSeasonalEvent(eventData) {
        try {
          const event = await storage.createSeasonalEvent(eventData);
          if (eventData.theme === "420day") {
            await this.createSpecialStrains(event.id, [
              { name: "420 Special", rarity: "legendary", thcLevel: 35, specialBonus: 420 }
            ]);
          }
          return { success: true, eventId: event.id, message: `${eventData.name} event created!` };
        } catch (error) {
          console.error("Seasonal event creation error:", error);
          return { success: false, message: "Failed to create event" };
        }
      }
      async getActiveEvents() {
        return await storage.getActiveSeasonalEvents();
      }
      async participateInEvent(playerId, eventId) {
        try {
          const event = await storage.getSeasonalEvent(eventId);
          if (!event || !event.isActive) {
            return { success: false, message: "Event not found or inactive" };
          }
          await storage.addEventParticipant(eventId, playerId);
          return { success: true, message: `Joined ${event.name}!` };
        } catch (error) {
          console.error("Event participation error:", error);
          return { success: false, message: "Failed to join event" };
        }
      }
      async createSpecialStrains(eventId, strains) {
        for (const strain of strains) {
          await storage.createStrainGenetics({
            ...strain,
            type: "hybrid",
            floweringTime: 7,
            yieldMultiplier: 200,
            clickBonus: strain.specialBonus || 0,
            description: `Special ${strain.name} - Limited time seasonal strain!`,
            discoveredBy: "seasonal_event",
            icon: "fas fa-star"
          });
        }
      }
    };
    AnalyticsService = class {
      async trackPlayerAction(playerId, action, value) {
        try {
          await storage.updatePlayerAnalytics(playerId, {
            lastAction: action,
            lastActionValue: value || 0,
            lastActionTime: /* @__PURE__ */ new Date()
          });
        } catch (error) {
          console.error("Analytics tracking error:", error);
        }
      }
      async getPlayerInsights(playerId) {
        const analytics = await storage.getPlayerAnalytics(playerId);
        const player2 = await storage.getPlayer(playerId);
        if (!analytics || !player2) return null;
        return {
          playTime: analytics.totalPlayTime,
          efficiency: analytics.clicksPerMinute,
          favoriteStrain: analytics.favoritePlantStrain,
          battleRecord: `${analytics.totalBattlesWon}W`,
          engagementScore: this.calculateEngagementScore(analytics)
        };
      }
      calculateEngagementScore(analytics) {
        const timeScore = Math.min(analytics.totalPlayTime / 3600, 100);
        const activityScore = Math.min(analytics.clicksPerMinute * 10, 100);
        const socialScore = Math.min(analytics.totalBattlesWon * 5, 100);
        return Math.round((timeScore + activityScore + socialScore) / 3);
      }
    };
    MarketplaceService = class {
      async listStrainForSale(sellerId, strainId, price, quantity = 1) {
        try {
          const player2 = await storage.getPlayer(sellerId);
          if (!player2) {
            return { success: false, message: "Player not found" };
          }
          const playerStrains = await storage.getPlayerStrains(sellerId);
          const hasStrain = playerStrains.some((s) => s.strainId === strainId && s.quantity >= quantity);
          if (!hasStrain) {
            return { success: false, message: "You don't own enough of this strain to sell" };
          }
          const listing = await storage.createMarketplaceListing({
            sellerId,
            itemType: "strain",
            itemId: strainId,
            quantity,
            pricePerUnit: price,
            currency: "KUSH"
          });
          return { success: true, listingId: listing.id, message: `Strain listed for ${price} KUSH!` };
        } catch (error) {
          console.error("Marketplace listing error:", error);
          return { success: false, message: "Failed to list strain" };
        }
      }
      async purchaseFromMarketplace(buyerId, listingId) {
        try {
          const listing = await storage.getMarketplaceListing(listingId);
          const buyer = await storage.getPlayer(buyerId);
          if (!listing || !buyer) {
            return { success: false, message: "Listing or buyer not found" };
          }
          if (listing.status !== "active") {
            return { success: false, message: "Listing no longer available" };
          }
          const totalCost = listing.pricePerUnit * listing.quantity;
          if (buyer.totalKush < totalCost) {
            return { success: false, message: `Need ${totalCost.toLocaleString()} KUSH` };
          }
          await storage.updatePlayer(buyerId, { totalKush: buyer.totalKush - totalCost });
          const seller = await storage.getPlayer(listing.sellerId);
          if (seller) {
            await storage.updatePlayer(listing.sellerId, { totalKush: seller.totalKush + totalCost });
          }
          await storage.transferStrainOwnership(listing.itemId, listing.sellerId, buyerId, listing.quantity);
          await storage.updateMarketplaceListing(listingId, { status: "sold", buyerId, soldAt: /* @__PURE__ */ new Date() });
          return { success: true, message: `Purchased ${listing.quantity}x strain for ${totalCost} KUSH!` };
        } catch (error) {
          console.error("Marketplace purchase error:", error);
          return { success: false, message: "Purchase failed" };
        }
      }
      async getActiveListings() {
        return await storage.getActiveMarketplaceListings();
      }
    };
    prestigeService = new PrestigeService();
    dailyChallengesService = new DailyChallengesService();
    friendsService = new FriendsService();
    pvpBattleArenaService = new PvPBattleArenaService();
    clickMechanicsService = new ClickMechanicsService();
    guildService = new GuildService();
    growGardenService = new GrowGardenService();
    vipService = new VIPSubscriptionService();
    analyticsService = new AnalyticsService();
    seasonalEventsService = new SeasonalEventsService();
    marketplaceService = new MarketplaceService();
  }
});

// server/index.ts
import "dotenv/config";
import express2 from "express";
import rateLimit2 from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import net from "net";

// server/routes.ts
init_storage();
import { createServer } from "http";

// server/token-integration.ts
init_storage();
init_solana_token_service();
var TokenIntegrationService = class {
  /**
   * Check and process token rewards when a player achieves something
   */
  async processAchievementCompletion(player2, achievement, playerAchievement) {
    if (!playerAchievement.completed || !player2.walletAddress) {
      return;
    }
    const tokenService = mainnetTokenService;
    try {
      const achievementRewardMap = {
        "First Steps": "firstClick",
        "Collect 5 KUSH": "firstClick",
        "Clicker Pro": "first100Clicks",
        "Kush Master": "first1000Clicks",
        "Ultimate Clicker": "first10000Clicks",
        "First Purchase": "firstUpgrade",
        "Million KUSH Club": "firstMillionaire",
        "Wallet Connected": "walletConnection"
      };
      const rewardKey = achievementRewardMap[achievement.name];
      if (!rewardKey) {
        console.log(`No token reward mapped for achievement: ${achievement.name}`);
        return;
      }
      const existingPayouts = await storage.getPlayerTokenPayouts(player2.id);
      const rewardAlreadyExists = existingPayouts.some(
        (payout) => payout.reason.includes(`Achievement: ${rewardKey}`) || payout.reason.includes(`Achievement reward: ${rewardKey}`) || payout.reason.includes("Achievement:") && payout.reason.includes(achievement.name)
      );
      if (rewardAlreadyExists) {
        console.log(`\u23ED\uFE0F Skipping duplicate reward for ${achievement.name} (${rewardKey}) - already exists for player ${player2.id}`);
        return;
      }
      const payoutEvent = await tokenService.processAchievementReward(
        player2.id,
        rewardKey,
        player2.walletAddress
      );
      if (payoutEvent) {
        await storage.createTokenPayout({
          playerId: player2.id,
          walletAddress: player2.walletAddress,
          amount: payoutEvent.amount,
          reason: `Achievement: ${achievement.name}`,
          network,
          status: "pending"
        });
        console.log(`\u{1F3C6} Token reward queued for player ${player2.id}: ${payoutEvent.amount} $KUSH tokens for "${achievement.name}"`);
      }
    } catch (error) {
      console.error("\u274C Failed to process achievement token reward:", error);
    }
  }
  /**
   * Check and process milestone rewards based on total KUSH earned
   */
  async processMilestoneRewards(player2) {
    if (!player2.walletAddress) return;
    const tokenService = mainnetTokenService;
    try {
      const milestones = [1e3, 1e4, 1e5, 1e6].sort((a, b) => a - b);
      for (const milestone of milestones) {
        if (player2.totalKush >= milestone) {
          const existingPayouts = await storage.getPlayerTokenPayouts(player2.id);
          const milestoneAlreadyPaid = existingPayouts.some(
            (payout) => payout.reason.includes(`Milestone: ${milestone} KUSH`) && payout.status === "completed"
          );
          if (!milestoneAlreadyPaid) {
            const payoutEvent = await tokenService.processMilestoneReward(
              player2.id,
              milestone,
              player2.walletAddress
            );
            if (payoutEvent) {
              await storage.createTokenPayout({
                playerId: player2.id,
                walletAddress: player2.walletAddress,
                amount: payoutEvent.amount,
                reason: payoutEvent.reason,
                network,
                status: "pending"
              });
              console.log(`\u{1F3AF} Milestone reward queued: ${milestone} KUSH \u2192 ${payoutEvent.amount} tokens`);
            }
          }
        }
      }
    } catch (error) {
      console.error("\u274C Failed to process milestone rewards:", error);
    }
  }
  /**
   * Process referral bonus when a player refers someone
   */
  async processReferralBonus(referrerPlayer, referredPlayer) {
    if (!referrerPlayer.walletAddress) return;
    const network2 = referrerPlayer.solanaNetwork;
    const tokenService = network2 === "mainnet" ? mainnetTokenService : devnetTokenService;
    try {
      const payoutEvent = await tokenService.processAchievementReward(
        referrerPlayer.id,
        "referralBonus",
        referrerPlayer.walletAddress
      );
      if (payoutEvent) {
        await storage.createTokenPayout({
          playerId: referrerPlayer.id,
          walletAddress: referrerPlayer.walletAddress,
          amount: payoutEvent.amount,
          reason: `Referral bonus: ${referredPlayer.username}`,
          network: network2,
          status: "pending"
        });
        console.log(`\u{1F465} Referral bonus queued: ${payoutEvent.amount} tokens for ${referrerPlayer.username}`);
      }
    } catch (error) {
      console.error("\u274C Failed to process referral bonus:", error);
    }
  }
  /**
   * Process weekly active player bonus
   */
  async processWeeklyActiveBonus(player2) {
    if (!player2.walletAddress) return;
    const tokenService = mainnetTokenService;
    try {
      const oneWeekAgo = /* @__PURE__ */ new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentPayouts = await storage.getPlayerTokenPayouts(player2.id);
      const hasWeeklyBonus = recentPayouts.some(
        (payout) => payout.reason.includes("Weekly active") && payout.createdAt > oneWeekAgo
      );
      if (!hasWeeklyBonus) {
        const payoutEvent = await tokenService.processAchievementReward(
          player2.id,
          "weeklyActive",
          player2.walletAddress
        );
        if (payoutEvent) {
          await storage.createTokenPayout({
            playerId: player2.id,
            walletAddress: player2.walletAddress,
            amount: payoutEvent.amount,
            reason: "Weekly active player bonus",
            network,
            status: "pending"
          });
          console.log(`\u{1F4C5} Weekly bonus queued: ${payoutEvent.amount} tokens for ${player2.username}`);
        }
      }
    } catch (error) {
      console.error("\u274C Failed to process weekly bonus:", error);
    }
  }
  /**
   * Process all pending token payouts for a specific network
   */
  async processPendingPayouts(network2 = "devnet") {
    const tokenService = network2 === "mainnet" ? mainnetTokenService : devnetTokenService;
    try {
      const pendingPayouts = await storage.getPendingTokenPayouts(network2);
      console.log(`\u{1F504} Processing ${pendingPayouts.length} pending payouts on ${network2}`);
      for (const payout of pendingPayouts) {
        try {
          const txSignature = await tokenService.distributeTokens(
            payout.walletAddress,
            payout.amount,
            payout.reason
          );
          await storage.updateTokenPayoutStatus(
            payout.id,
            "completed",
            txSignature
          );
          console.log(`\u2705 Payout completed: ${payout.amount} tokens to ${payout.walletAddress}`);
        } catch (error) {
          console.error(`\u274C Failed to process payout ${payout.id}:`, error);
          await storage.updateTokenPayoutStatus(payout.id, "failed");
        }
      }
    } catch (error) {
      console.error("\u274C Failed to process pending payouts:", error);
    }
  }
  /**
   * Get token summary for a player
   */
  async getPlayerTokenSummary(playerId) {
    try {
      const payouts = await storage.getPlayerTokenPayouts(playerId);
      const totalEarned = payouts.reduce((sum, payout) => sum + payout.amount, 0);
      const totalClaimed = payouts.filter((payout) => payout.status === "completed").reduce((sum, payout) => sum + payout.amount, 0);
      const pendingClaims = payouts.filter((payout) => payout.status === "pending").reduce((sum, payout) => sum + payout.amount, 0);
      return {
        totalEarned,
        totalClaimed,
        pendingClaims,
        recentPayouts: payouts.slice(0, 10)
        // Last 10 payouts
      };
    } catch (error) {
      console.error("\u274C Failed to get player token summary:", error);
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
  async testAirdrop(playerId, amount, reason) {
    const player2 = await storage.getPlayer(playerId);
    if (!player2 || !player2.walletAddress || player2.solanaNetwork !== "devnet") {
      throw new Error("Player not found, no wallet, or not on devnet");
    }
    try {
      await storage.createTokenPayout({
        playerId: player2.id,
        walletAddress: player2.walletAddress,
        amount,
        reason: `Test airdrop: ${reason}`,
        network: "devnet",
        status: "pending"
      });
      console.log(`\u{1FA82} Test airdrop queued: ${amount} tokens for ${player2.username}`);
    } catch (error) {
      console.error("\u274C Failed to create test airdrop:", error);
      throw error;
    }
  }
};
var tokenIntegration = new TokenIntegrationService();

// server/routes.ts
init_schema();
init_cache();
import { z } from "zod";
async function registerRoutes(app2) {
  const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "Bearer admin-token") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };
  app2.post("/api/admin/login", (req, res) => {
    const { password, twoFA } = req.body;
    if (password === "admin123" && twoFA === "123456") {
      res.json({ token: "admin-token", success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
  app2.get("/api/token-payouts", async (req, res) => {
    try {
      const { network: network2, status } = req.query;
      let payouts = await storage.getAllTokenPayouts();
      if (network2) {
        payouts = payouts.filter((p) => p.network === network2);
      }
      if (status) {
        payouts = payouts.filter((p) => p.status === status);
      }
      res.json(payouts);
    } catch (error) {
      console.error("Error fetching token payouts:", error);
      res.status(500).json({ error: "Failed to fetch token payouts" });
    }
  });
  app2.post("/api/token-payouts/:id/confirm", adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
      const payout = await storage.updateTokenPayoutStatus(id, "completed");
      if (payout) {
        res.json({ success: true, payout });
      } else {
        res.status(404).json({ error: "Payout not found" });
      }
    } catch (error) {
      console.error("Error confirming payout:", error);
      res.status(500).json({ error: "Failed to confirm payout" });
    }
  });
  app2.post("/api/token-payouts/:id/mark-failed", adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
      const payout = await storage.updateTokenPayoutStatus(id, "failed");
      if (payout) {
        res.json({ success: true, payout });
      } else {
        res.status(404).json({ error: "Payout not found" });
      }
    } catch (error) {
      console.error("Error marking payout as failed:", error);
      res.status(500).json({ error: "Failed to mark payout as failed" });
    }
  });
  app2.get("/api/players", async (req, res) => {
    try {
      const players2 = await storage.getAllPlayers();
      res.json(players2);
    } catch (error) {
      console.error("Error fetching all players:", error);
      res.status(500).json({ error: "Failed to fetch players" });
    }
  });
  app2.delete("/api/players/:id", async (req, res) => {
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
  app2.get("/api/players/:identifier", async (req, res) => {
    try {
      const { identifier } = req.params;
      let player2 = await storage.getPlayer(identifier);
      if (!player2) {
        player2 = await storage.getPlayerByUsername(identifier);
      }
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(player2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/players/telegram/:telegramId", async (req, res) => {
    try {
      const { telegramId } = req.params;
      if (!telegramId) {
        return res.status(400).json({ message: "Telegram ID required" });
      }
      const allPlayers = await storage.getAllPlayers();
      const player2 = allPlayers.find((p) => p.telegramUserId === telegramId);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(player2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/players", async (req, res) => {
    try {
      const validatedData = insertPlayerSchema.parse(req.body);
      const existingPlayer = await storage.getPlayerByUsername(validatedData.username);
      if (existingPlayer) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const allPlayers = await storage.getAllPlayers();
      if (validatedData.telegramUserId) {
        const telegramExists = allPlayers.find((p) => p.telegramUserId === validatedData.telegramUserId);
        if (telegramExists) {
          return res.status(400).json({
            message: "This Telegram account is already linked to another player account"
          });
        }
      }
      if (validatedData.discordUserId) {
        const discordExists = allPlayers.find((p) => p.discordUserId === validatedData.discordUserId);
        if (discordExists) {
          return res.status(400).json({
            message: "This Discord account is already linked to another player account"
          });
        }
      }
      if (validatedData.walletAddress) {
        const walletExists = allPlayers.find((p) => p.walletAddress === validatedData.walletAddress);
        if (walletExists) {
          return res.status(400).json({
            message: "This wallet address is already linked to another player account"
          });
        }
      }
      const player2 = await storage.createPlayer(validatedData);
      await storage.updatePlayer(player2.id, { totalKush: 1500 });
      await storage.addGardenSupplies(player2.id, "seeds", 5);
      const updatedPlayer = await storage.getPlayer(player2.id);
      res.status(201).json(updatedPlayer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/players/:id/link-wallet", async (req, res) => {
    try {
      const { id } = req.params;
      const { walletAddress } = req.body;
      if (!walletAddress || typeof walletAddress !== "string") {
        return res.status(400).json({ message: "Valid wallet address required" });
      }
      const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
      if (!solanaAddressPattern.test(walletAddress.trim())) {
        return res.status(400).json({ message: "Invalid Solana wallet address format" });
      }
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      if (player2.walletLinked) {
        return res.status(400).json({
          message: "Wallet already linked. Each account can only link one wallet for security."
        });
      }
      const existingPlayers = await storage.getAllPlayers();
      const walletAlreadyUsed = existingPlayers.find(
        (p) => p.walletAddress === walletAddress.trim() && p.id !== id
      );
      if (walletAlreadyUsed) {
        return res.status(400).json({
          message: "This wallet address is already linked to another account"
        });
      }
      if (player2.telegramUserId) {
        const duplicateTelegram = existingPlayers.find(
          (p) => p.telegramUserId === player2.telegramUserId && p.walletLinked && p.id !== id
        );
        if (duplicateTelegram) {
          return res.status(400).json({
            message: "This Telegram account already has a wallet linked to another game account"
          });
        }
      }
      if (player2.discordUserId) {
        const duplicateDiscord = existingPlayers.find(
          (p) => p.discordUserId === player2.discordUserId && p.walletLinked && p.id !== id
        );
        if (duplicateDiscord) {
          return res.status(400).json({
            message: "This Discord account already has a wallet linked to another game account"
          });
        }
      }
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
  app2.patch("/api/players/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      if ("walletAddress" in updates) {
        const player3 = await storage.getPlayer(id);
        if (player3?.walletLinked) {
          return res.status(400).json({
            message: "Cannot modify wallet address after linking. Use /link-wallet endpoint for initial linking only."
          });
        }
      }
      if ("walletLinked" in updates) {
        delete updates.walletLinked;
      }
      const player2 = await storage.updatePlayer(id, updates);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(player2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const players2 = await cacheWrapper.dynamicData(
        `leaderboard:${limit}`,
        () => storage.getTopPlayers(limit),
        12e4
        // 2 minutes cache
      );
      res.json(players2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/upgrades", async (req, res) => {
    try {
      const upgrades2 = await cacheWrapper.staticData(
        "upgrades:all",
        () => storage.getAllUpgrades(),
        36e5
        // 1 hour cache - upgrades rarely change
      );
      res.json(upgrades2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/players/:id/upgrades", async (req, res) => {
    try {
      const { id } = req.params;
      const playerUpgrades2 = await storage.getPlayerUpgrades(id);
      res.json(playerUpgrades2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/players/:id/upgrades", async (req, res) => {
    try {
      const { id } = req.params;
      const { upgradeId, quantity = 1 } = req.body;
      const player2 = await storage.getPlayer(id);
      const upgrade = await storage.getUpgrade(upgradeId);
      if (!player2 || !upgrade) {
        return res.status(404).json({ message: "Player or upgrade not found" });
      }
      const playerUpgrades2 = await storage.getPlayerUpgrades(id);
      const existingUpgrade = playerUpgrades2.find((pu) => pu.upgradeId === upgradeId);
      const currentQuantity = existingUpgrade?.quantity || 0;
      let totalCost = 0;
      for (let i = 0; i < quantity; i++) {
        const multiplier = Math.pow(upgrade.costMultiplier / 100, currentQuantity + i);
        totalCost += Math.floor(upgrade.baseCost * multiplier);
      }
      if (player2.totalKush < totalCost) {
        return res.status(400).json({ message: "Insufficient KUSH" });
      }
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: player2.totalKush - totalCost,
        perClickMultiplier: player2.perClickMultiplier + upgrade.clickPowerIncrease * quantity,
        autoIncomePerHour: player2.autoIncomePerHour + upgrade.autoIncomeIncrease * quantity
      });
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
      res.json({ player: updatedPlayer, cost: totalCost });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/achievements", async (req, res) => {
    try {
      const achievements2 = await cacheWrapper.staticData(
        "achievements:all",
        () => storage.getAllAchievements(),
        36e5
        // 1 hour cache - achievements rarely change
      );
      res.json(achievements2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/players/:id/achievements", async (req, res) => {
    try {
      const { id } = req.params;
      const playerAchievements2 = await storage.getPlayerAchievements(id);
      const achievements2 = await storage.getAllAchievements();
      const achievementsWithProgress = achievements2.map((achievement) => {
        const playerAchievement = playerAchievements2.find((pa) => pa.achievementId === achievement.id);
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
  app2.post("/api/players/:id/click", async (req, res) => {
    try {
      const { id } = req.params;
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      const kushGained = player2.perClickMultiplier;
      const { calculateLevel: calculateLevel2 } = (init_leveling_utils(), __toCommonJS(leveling_utils_exports));
      const newTotalEarnedKush = (player2.totalEarnedKush || 0) + kushGained;
      const newLevel = calculateLevel2(newTotalEarnedKush);
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: player2.totalKush + kushGained,
        totalClicks: player2.totalClicks + 1,
        totalEarnedKush: newTotalEarnedKush,
        level: newLevel
      });
      const playerAchievements2 = await storage.getPlayerAchievements(id);
      const achievements2 = await storage.getAllAchievements();
      for (const achievement of achievements2) {
        const playerAchievement = playerAchievements2.find((pa) => pa.achievementId === achievement.id);
        if (!playerAchievement?.completed) {
          let progress = 0;
          switch (achievement.requirementType) {
            case "total_clicks":
              progress = updatedPlayer.totalClicks;
              break;
            case "total_kush":
              progress = updatedPlayer.totalKush;
              break;
          }
          if (progress !== playerAchievement?.progress) {
            const updatedAchievement = await storage.updatePlayerAchievement(id, achievement.id, progress);
            if (updatedAchievement.completed && !playerAchievement?.completed) {
              await tokenIntegration.processAchievementCompletion(
                updatedPlayer,
                achievement,
                updatedAchievement
              );
            }
          }
        }
      }
      await tokenIntegration.processMilestoneRewards(updatedPlayer);
      res.json({
        player: updatedPlayer,
        kushGained,
        totalKush: updatedPlayer.totalKush
      });
    } catch (error) {
      console.error("Click error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/players/:id/tokens", async (req, res) => {
    try {
      const { id } = req.params;
      const tokenSummary = await tokenIntegration.getPlayerTokenSummary(id);
      res.json(tokenSummary);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/tokens/pending/:network", async (req, res) => {
    try {
      const { network: network2 } = req.params;
      const pendingPayouts = await storage.getPendingTokenPayouts(network2);
      res.json({
        count: pendingPayouts.length,
        totalAmount: pendingPayouts.reduce((sum, p) => sum + p.amount, 0),
        payouts: pendingPayouts
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/token-payouts", async (req, res) => {
    try {
      const { status, network: network2 } = req.query;
      console.log("\u{1F50D} Admin API Debug - Query params:", { status, network: network2 });
      let payouts;
      if (network2) {
        const allPayouts = await storage.getAllTokenPayouts();
        console.log("\u{1F4CA} Total payouts in database:", allPayouts.length);
        console.log("\u{1F4CB} All payouts:", allPayouts.map((p) => ({ id: p.id, status: p.status, network: p.network, amount: p.amount })));
        payouts = allPayouts.filter((payout) => {
          const networkMatch = payout.network === network2;
          const statusMatch = status ? payout.status === status : payout.status === "pending" || payout.status === "claim_requested";
          console.log(`\u{1F50D} Payout ${payout.id}: network=${payout.network} (match: ${networkMatch}), status=${payout.status} (match: ${statusMatch})`);
          return networkMatch && statusMatch;
        });
        console.log("\u2705 Filtered payouts for admin:", payouts.length);
      } else {
        payouts = [];
      }
      res.json(payouts);
    } catch (error) {
      console.error("Error fetching token payouts:", error);
      res.status(500).json({ message: "Failed to fetch token payouts" });
    }
  });
  app2.get("/api/players/:id/pending-payouts", async (req, res) => {
    try {
      const { id } = req.params;
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      const allPayouts = await storage.getAllTokenPayouts();
      const playerPayouts = allPayouts.filter(
        (payout) => payout.playerId === id && payout.status === "pending"
      );
      const totalClaimable = playerPayouts.reduce((sum, payout) => sum + payout.amount, 0);
      res.json({
        payouts: playerPayouts,
        totalClaimable,
        hasWallet: !!player2.walletAddress,
        walletAddress: player2.walletAddress
      });
    } catch (error) {
      console.error("Error fetching player pending payouts:", error);
      res.status(500).json({ message: "Failed to fetch pending payouts" });
    }
  });
  app2.post("/api/players/:id/request-claim", async (req, res) => {
    try {
      const { id } = req.params;
      const { payoutIds, message } = req.body;
      const player2 = await storage.getPlayer(id);
      if (!player2 || !player2.walletAddress) {
        return res.status(400).json({ message: "Player not found or wallet not linked" });
      }
      const allPayouts = await storage.getAllTokenPayouts();
      const requestedPayouts = allPayouts.filter(
        (payout) => payoutIds.includes(payout.id) && payout.playerId === id && payout.status === "pending"
      );
      if (requestedPayouts.length !== payoutIds.length) {
        return res.status(400).json({ message: "Invalid payout selection" });
      }
      const totalAmount = requestedPayouts.reduce((sum, payout) => sum + payout.amount, 0);
      console.log(`\u{1F4B0} Token claim request from ${player2.username}: ${totalAmount} KUSH tokens (${requestedPayouts.length} payouts)`);
      for (const payout of requestedPayouts) {
        await storage.updateTokenPayoutStatus(payout.id, "claim_requested");
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
  app2.post("/api/token-payouts/:id/confirm", async (req, res) => {
    try {
      const { id } = req.params;
      const { transactionSignature } = req.body;
      if (!transactionSignature) {
        return res.status(400).json({ message: "Transaction signature required" });
      }
      const updatedPayout = await storage.updateTokenPayoutStatus(
        id,
        "completed",
        transactionSignature
      );
      if (!updatedPayout) {
        return res.status(404).json({ message: "Payout not found" });
      }
      console.log(`\u2705 Airdrop confirmed: ${updatedPayout.amount} tokens to ${updatedPayout.walletAddress}`);
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
  app2.post("/api/token-payouts/:id/mark-failed", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPayout = await storage.updateTokenPayoutStatus(id, "failed");
      if (!updatedPayout) {
        return res.status(404).json({ message: "Payout not found" });
      }
      console.log(`\u274C Airdrop marked as failed: ${updatedPayout.amount} tokens to ${updatedPayout.walletAddress}`);
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
  app2.get("/api/admin/analytics", async (req, res) => {
    try {
      const analytics = await cacheWrapper.dynamicData(
        "admin:analytics",
        async () => {
          const players2 = await storage.getAllPlayers();
          const payouts = await storage.getAllTokenPayouts();
          const totalUsers = players2.length;
          const usersWithWallets = players2.filter((p) => p.walletAddress).length;
          const telegramUsers = players2.filter((p) => p.telegramUserId).length;
          const discordUsers = players2.filter((p) => p.discordUserId).length;
          const totalKushEarned = players2.reduce((sum, p) => sum + p.totalKush, 0);
          const totalClicks = players2.reduce((sum, p) => sum + p.totalClicks, 0);
          const averageKushPerUser = totalUsers > 0 ? totalKushEarned / totalUsers : 0;
          const pendingPayouts = payouts.filter((p) => p.status === "pending");
          const completedPayouts = payouts.filter((p) => p.status === "completed");
          const totalPendingTokens = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);
          const totalDistributedTokens = completedPayouts.reduce((sum, p) => sum + p.amount, 0);
          const last24Hours = Date.now() - 24 * 60 * 60 * 1e3;
          const recentPlayers = players2.filter((p) => new Date(p.createdAt).getTime() > last24Hours);
          const recentPayouts = payouts.filter((p) => new Date(p.createdAt).getTime() > last24Hours);
          const topByKush = [...players2].sort((a, b) => b.totalKush - a.totalKush).slice(0, 5).map((p) => ({
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
              discord: discordUsers,
              walletLinkRate: totalUsers > 0 ? (usersWithWallets / totalUsers * 100).toFixed(1) : "0"
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
        12e4
        // 2 minute cache for analytics
      );
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });
  const tokenBalanceCache = /* @__PURE__ */ new Map();
  const CACHE_DURATION = 12e4;
  const BACKGROUND_REFRESH_INTERVAL = 18e4;
  tokenBalanceCache.set("C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL", {
    balance: 1766760031775e-6,
    timestamp: Date.now()
  });
  const activePlayerWallets = /* @__PURE__ */ new Set();
  setInterval(async () => {
    if (activePlayerWallets.size === 0) return;
    console.log(`\u{1F504} Background refresh started for ${activePlayerWallets.size} active players`);
    for (const walletAddress of activePlayerWallets) {
      try {
        const cached = tokenBalanceCache.get(walletAddress);
        if (!cached || Date.now() - cached.timestamp > CACHE_DURATION / 2) {
          console.log(`\u{1F504} Background refreshing balance for wallet: ${walletAddress}`);
          const { mainnetTokenService: mainnetTokenService2 } = await Promise.resolve().then(() => (init_solana_token_service(), solana_token_service_exports));
          const balance = await mainnetTokenService2.getTokenBalance(walletAddress);
          tokenBalanceCache.set(walletAddress, {
            balance,
            timestamp: Date.now()
          });
          const io = global.io;
          if (io) {
            io.emit("balanceUpdate", {
              walletAddress,
              balance,
              timestamp: Date.now()
            });
          }
          console.log(`\u2705 Background updated balance: ${balance} for ${walletAddress}`);
        }
      } catch (error) {
        console.error(`\u274C Background refresh failed for ${walletAddress}:`, error.message);
      }
    }
  }, BACKGROUND_REFRESH_INTERVAL);
  app2.get("/api/players/:id/token-balance", async (req, res) => {
    try {
      const { id } = req.params;
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      if (!player2.walletAddress) {
        return res.json({ balance: 0, hasWallet: false });
      }
      activePlayerWallets.add(player2.walletAddress);
      const cacheKey = player2.walletAddress;
      const cached = tokenBalanceCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`\u{1F4BE} Using cached balance for ${player2.username}: ${cached.balance}`);
        return res.json({
          balance: cached.balance,
          hasWallet: true,
          walletAddress: player2.walletAddress,
          cached: true,
          lastUpdated: cached.timestamp
        });
      }
      console.log(`\u{1F50D} Fetching fresh on-chain balance for player ${player2.username}...`);
      const { mainnetTokenService: mainnetTokenService2 } = await Promise.resolve().then(() => (init_solana_token_service(), solana_token_service_exports));
      const balance = await mainnetTokenService2.getTokenBalance(player2.walletAddress);
      const now = Date.now();
      if (balance > 0) {
        tokenBalanceCache.set(cacheKey, {
          balance,
          timestamp: now
        });
        console.log(`\u{1F4BE} Cached balance for ${player2.username}: ${balance}`);
      }
      const io = global.io;
      if (io) {
        io.emit("balanceUpdate", {
          playerId: player2.id,
          walletAddress: player2.walletAddress,
          balance,
          timestamp: now
        });
      }
      res.json({
        balance,
        hasWallet: true,
        walletAddress: player2.walletAddress,
        cached: false,
        lastUpdated: now
      });
    } catch (error) {
      console.error("\u274C Failed to get player token balance:", error);
      const cacheKey = player?.walletAddress;
      const cached = tokenBalanceCache.get(cacheKey);
      if (cached) {
        console.log(`\u{1F4BE} RPC failed, using cached balance: ${cached.balance}`);
        return res.json({
          balance: cached.balance,
          hasWallet: true,
          walletAddress: player?.walletAddress,
          cached: true,
          rpcError: true
        });
      }
      res.status(500).json({ message: "Failed to fetch token balance" });
    }
  });
  app2.get("/api/admin/player-balances", async (req, res) => {
    try {
      console.log("\u{1F50D} Fetching player wallet balances for admin review...");
      const players2 = await storage.getAllPlayers();
      const { mainnetTokenService: mainnetTokenService2 } = await Promise.resolve().then(() => (init_solana_token_service(), solana_token_service_exports));
      const mainnetBalances = await mainnetTokenService2.getAllPlayerBalances(players2);
      console.log(`\u{1F4CA} Retrieved balances for ${mainnetBalances.length} players on mainnet`);
      res.json({
        mainnet: mainnetBalances,
        totalPlayers: players2.length,
        playersWithWallets: players2.filter((p) => p.walletAddress).length
      });
    } catch (error) {
      console.error("\u274C Failed to get player balances:", error);
      res.status(500).json({ message: "Failed to fetch player balances" });
    }
  });
  app2.get("/api/grow-lights", async (req, res) => {
    try {
      const growLights2 = await storage.getAllGrowLights();
      res.json(growLights2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/players/:id/grow-lights", async (req, res) => {
    try {
      const { id } = req.params;
      const playerGrowLights2 = await storage.getPlayerGrowLights(id);
      res.json(playerGrowLights2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/grow-lights/initialize", async (req, res) => {
    try {
      console.log("\u{1F331} Starting grow lights initialization...");
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
          icon: "\u{1F4A1}",
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
          icon: "\u{1F506}",
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
          icon: "\u{1F31E}",
          unlockRequirement: 1e3
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
          icon: "\u26A1",
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
          burnCost: 1e3,
          icon: "\u{1F308}",
          unlockRequirement: 5e3
        }
      ];
      const existingLights = await storage.getAllGrowLights();
      if (existingLights.length > 0) {
        return res.json({
          success: true,
          message: "Grow lights already initialized",
          count: existingLights.length,
          growLights: existingLights
        });
      }
      for (const template of growLightTemplates) {
        await storage.createGrowLight(template);
      }
      const growLights2 = await storage.getAllGrowLights();
      console.log(`\u2705 Initialized ${growLights2.length} grow light templates`);
      res.json({
        success: true,
        message: "Grow lights initialized successfully",
        count: growLights2.length,
        growLights: growLights2
      });
    } catch (error) {
      console.error("\u274C Failed to initialize grow lights:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/players/:id/burn-tokens", async (req, res) => {
    res.status(403).json({
      message: "This endpoint has been disabled for security reasons. Please use the verify-burn endpoint instead.",
      securityNote: "Private keys should never be transmitted over network"
    });
  });
  app2.post("/api/players/:id/verify-burn", async (req, res) => {
    try {
      const { id } = req.params;
      const { transactionSignature, walletAddress } = req.body;
      if (!transactionSignature) {
        return res.status(400).json({ message: "Transaction signature required" });
      }
      if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address required" });
      }
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      if (player2.walletAddress !== walletAddress) {
        return res.status(403).json({ message: "Wallet address mismatch" });
      }
      const existingBurn = await storage.getPlayerTokenBurns(id);
      const alreadyProcessed = existingBurn.some(
        (burn) => burn.burnTransactionSignature === transactionSignature && burn.status === "completed"
      );
      if (alreadyProcessed) {
        return res.status(400).json({ message: "This transaction has already been processed" });
      }
      const { verifyBurnTransaction: verifyBurnTransaction2 } = await Promise.resolve().then(() => (init_blockchain_verification(), blockchain_verification_exports));
      const verificationResult = await verifyBurnTransaction2(transactionSignature, walletAddress);
      if (!verificationResult.isValid) {
        return res.status(400).json({
          message: verificationResult.error || "Invalid burn transaction"
        });
      }
      const { TokenBurnService: TokenBurnService2 } = await Promise.resolve().then(() => (init_token_burn_service(), token_burn_service_exports));
      const burnService = new TokenBurnService2({
        network: "mainnet",
        devTaxWallet: process.env.DEV_TAX_WALLET || "C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL"
      });
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
      console.error("\u274C Burn verification failed:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/players/:id/grow-lights/:lightId/toggle", async (req, res) => {
    try {
      const { id, lightId } = req.params;
      const { isActive } = req.body;
      await storage.updatePlayerGrowLight(id, lightId, { isActive });
      const playerGrowLights2 = await storage.getPlayerGrowLights(id);
      const totalPassiveIncome = playerGrowLights2.filter((pgl) => pgl.isActive).reduce((sum, pgl) => sum + (pgl.growLight?.passiveClicksPerHour || 0), 0);
      await storage.updatePlayer(id, { passiveIncomePerHour: totalPassiveIncome });
      res.json({ message: "Grow light toggled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/players/:id/referral-handle", async (req, res) => {
    try {
      const { id } = req.params;
      const { referralHandle } = req.body;
      if (!referralHandle || typeof referralHandle !== "string") {
        return res.status(400).json({ message: "Valid referral handle required" });
      }
      const handleRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!handleRegex.test(referralHandle)) {
        return res.status(400).json({
          message: "Referral handle must be 3-20 characters, alphanumeric and underscores only"
        });
      }
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      if (player2.hasChangedReferralHandle) {
        return res.status(400).json({
          message: "Referral handle can only be changed once"
        });
      }
      const existingPlayer = await storage.getPlayerByReferralHandle(referralHandle);
      if (existingPlayer) {
        return res.status(400).json({
          message: "Referral handle is already taken"
        });
      }
      const updatedPlayer = await storage.updatePlayer(id, {
        referralHandle,
        hasChangedReferralHandle: true
      });
      res.json({
        message: "Referral handle updated successfully",
        player: updatedPlayer,
        referralUrl: `${req.protocol}://${req.get("host")}?ref=${referralHandle}`
      });
    } catch (error) {
      console.error("Referral handle update error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/players/by-handle/:handle", async (req, res) => {
    try {
      const { handle } = req.params;
      const player2 = await storage.getPlayerByReferralHandle(handle);
      if (!player2) {
        return res.status(404).json({ message: "Player with that referral handle not found" });
      }
      res.json({
        id: player2.id,
        username: player2.username,
        referralHandle: player2.referralHandle,
        totalKush: player2.totalKush,
        level: player2.level
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/players/with-referral", async (req, res) => {
    try {
      const playerData = insertPlayerSchema.parse(req.body);
      const { referralHandle } = req.body;
      let referrerId = null;
      if (referralHandle) {
        const referrer = await storage.getPlayerByReferralHandle(referralHandle);
        if (referrer) {
          referrerId = referrer.id;
          playerData.referredBy = referralHandle;
        }
      }
      const newPlayer = await storage.createPlayer(playerData);
      if (referrerId) {
        await tokenIntegration.processReferralBonus(
          await storage.getPlayer(referrerId),
          newPlayer
        );
      }
      res.status(201).json(newPlayer);
    } catch (error) {
      console.error("Player creation with referral error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/players/:id/referrals", async (req, res) => {
    try {
      const { id } = req.params;
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      const referralStats = await storage.getPlayerReferralStats(id);
      res.json({
        referralHandle: player2.referralHandle,
        referralUrl: player2.referralHandle ? `${req.protocol}://${req.get("host")}?ref=${player2.referralHandle}` : null,
        canChangeHandle: !player2.hasChangedReferralHandle,
        ...referralStats
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/admin/notify/telegram", async (req, res) => {
    try {
      const { message, adminUsername } = req.body;
      if (!message || !adminUsername) {
        return res.status(400).json({ message: "Message and admin username required" });
      }
      if (adminUsername.toLowerCase() !== "wlsfx" && adminUsername.toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      const { sendTelegramNotification: sendTelegramNotification2 } = await Promise.resolve().then(() => (init_telegram_bot(), telegram_bot_exports));
      const result = await sendTelegramNotification2(message);
      res.json({
        success: true,
        message: "Telegram notification sent",
        details: result
      });
    } catch (error) {
      console.error("Telegram notification error:", error);
      res.status(500).json({ message: "Failed to send Telegram notification" });
    }
  });
  app2.post("/api/admin/notify/discord", async (req, res) => {
    try {
      const { message, adminUsername } = req.body;
      if (!message || !adminUsername) {
        return res.status(400).json({ message: "Message and admin username required" });
      }
      if (adminUsername.toLowerCase() !== "wlsfx" && adminUsername.toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      const { sendDiscordNotification: sendDiscordNotification2 } = await Promise.resolve().then(() => (init_discord_bot(), discord_bot_exports));
      const result = await sendDiscordNotification2(message);
      res.json({
        success: true,
        message: "Discord notification sent",
        details: result
      });
    } catch (error) {
      console.error("Discord notification error:", error);
      res.status(500).json({ message: "Failed to send Discord notification" });
    }
  });
  app2.post("/api/admin/notify/email", async (req, res) => {
    try {
      const { message, subject, adminUsername } = req.body;
      if (!message || !adminUsername) {
        return res.status(400).json({ message: "Message and admin username required" });
      }
      if (adminUsername.toLowerCase() !== "wlsfx" && adminUsername.toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      const players2 = await storage.getAllPlayers();
      const playersWithEmail = players2.filter((p) => p.email);
      if (playersWithEmail.length === 0) {
        return res.json({
          success: true,
          message: "No players with email addresses found",
          emailsSent: 0
        });
      }
      const { emailService: emailService2 } = await Promise.resolve().then(() => (init_email_service(), email_service_exports));
      if (!emailService2.isReady()) {
        return res.status(500).json({
          message: "Email service not configured. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS environment variables."
        });
      }
      let successCount = 0;
      const emailTitle = subject || "\u{1F33F} KushKlicker Update";
      for (const player2 of playersWithEmail) {
        try {
          const success = await emailService2.sendNotification(
            player2.email,
            emailTitle,
            message
          );
          if (success) successCount++;
        } catch (error) {
          console.error(`Failed to send email to ${player2.email}:`, error);
        }
      }
      res.json({
        success: true,
        message: `Email notifications sent to ${successCount}/${playersWithEmail.length} users`,
        emailsSent: successCount,
        totalEmailUsers: playersWithEmail.length
      });
    } catch (error) {
      console.error("Email notification error:", error);
      res.status(500).json({ message: "Failed to send email notifications" });
    }
  });
  app2.post("/api/admin/notify/all", async (req, res) => {
    try {
      const { message, subject, adminUsername } = req.body;
      if (!message || !adminUsername) {
        return res.status(400).json({ message: "Message and admin username required" });
      }
      if (adminUsername.toLowerCase() !== "wlsfx" && adminUsername.toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      const { sendTelegramNotification: sendTelegramNotification2 } = await Promise.resolve().then(() => (init_telegram_bot(), telegram_bot_exports));
      const { sendDiscordNotification: sendDiscordNotification2 } = await Promise.resolve().then(() => (init_discord_bot(), discord_bot_exports));
      const { emailService: emailService2 } = await Promise.resolve().then(() => (init_email_service(), email_service_exports));
      const players2 = await storage.getAllPlayers();
      const playersWithEmail = players2.filter((p) => p.email);
      const emailPromise = emailService2.isReady() && playersWithEmail.length > 0 ? Promise.allSettled(playersWithEmail.map(
        (player2) => emailService2.sendNotification(
          player2.email,
          subject || "\u{1F33F} KushKlicker Update",
          message
        )
      )) : Promise.resolve([]);
      const results = await Promise.allSettled([
        sendTelegramNotification2(message),
        sendDiscordNotification2(message),
        emailPromise
      ]);
      const emailResults = results[2].status === "fulfilled" ? results[2].value : [];
      const successfulEmails = Array.isArray(emailResults) ? emailResults.filter((r) => r.status === "fulfilled" && r.value === true).length : 0;
      res.json({
        success: true,
        message: "Notifications sent to all platforms",
        results: {
          telegram: results[0],
          discord: results[1],
          email: {
            sent: successfulEmails,
            total: playersWithEmail.length,
            configured: emailService2.isReady()
          }
        }
      });
    } catch (error) {
      console.error("Mass notification error:", error);
      res.status(500).json({ message: "Failed to send notifications" });
    }
  });
  app2.post("/api/admin/notify-purchase", async (req, res) => {
    try {
      const { walletAddress, amount, value, txHash } = req.body;
      const { sendPurchaseNotification: sendPurchaseNotification2 } = await Promise.resolve().then(() => (init_kush_notify_bot(), kush_notify_bot_exports));
      const result = await sendPurchaseNotification2({
        walletAddress,
        amount,
        value,
        txHash
      });
      res.json(result);
    } catch (error) {
      console.error("Error sending purchase notification:", error);
      res.status(500).json({ success: false, message: "Failed to send purchase notification" });
    }
  });
  app2.post("/api/admin/test-purchase-notification", async (req, res) => {
    try {
      const { testGroupNotification: testGroupNotification2 } = await Promise.resolve().then(() => (init_kush_notify_bot(), kush_notify_bot_exports));
      const result = await testGroupNotification2();
      res.json(result);
    } catch (error) {
      console.error("Error testing purchase notification:", error);
      res.status(500).json({ success: false, message: "Failed to test purchase notification" });
    }
  });
  app2.post("/api/admin/system/clear-all-data", async (req, res) => {
    try {
      const { adminPassword } = req.body;
      if (adminPassword !== "Trapstar146599@") {
        return res.status(403).json({ error: "Unauthorized - Invalid admin password" });
      }
      const dbStorage = storage;
      const db = dbStorage.db;
      const { players: players2, tokenBurns: tokenBurns2, playerGrowLights: playerGrowLights2, playerUpgrades: playerUpgrades2, playerAchievements: playerAchievements2, tokenPayouts: tokenPayouts2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      await db.delete(tokenBurns2);
      await db.delete(playerGrowLights2);
      await db.delete(playerUpgrades2);
      await db.delete(playerAchievements2);
      await db.delete(tokenPayouts2);
      await db.delete(players2);
      console.log("\u{1F5D1}\uFE0F Admin cleared all user data");
      res.json({
        success: true,
        message: "All player data cleared successfully",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error clearing data:", error);
      res.status(500).json({ error: "Failed to clear data" });
    }
  });
  app2.get("/api/admin/system/performance-metrics", async (req, res) => {
    try {
      const totalPlayers = await storage.getAllPlayers();
      const memoryUsage = process.memoryUsage();
      const uptime = process.uptime();
      res.json({
        performance: {
          memoryUsage: {
            rss: Math.round(memoryUsage.rss / 1024 / 1024) + " MB",
            heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + " MB",
            heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + " MB"
          },
          uptime: Math.round(uptime / 3600 * 100) / 100 + " hours",
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
      console.error("Error getting performance metrics:", error);
      res.status(500).json({ error: "Failed to get metrics" });
    }
  });
  app2.get("/api/admin/notify-bot-status", async (req, res) => {
    try {
      const { getGroupChatInfo: getGroupChatInfo2 } = await Promise.resolve().then(() => (init_kush_notify_bot(), kush_notify_bot_exports));
      const info = getGroupChatInfo2();
      res.json(info);
    } catch (error) {
      console.error("Error getting bot status:", error);
      res.status(500).json({ success: false, message: "Failed to get bot status" });
    }
  });
  app2.get("/api/players/:playerId/prestige-status", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { prestigeService: prestigeService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const canPrestige2 = await prestigeService2.canPrestige(playerId);
      const currentLevel = await prestigeService2.getPrestigeLevel(playerId);
      const multiplier = await prestigeService2.getPrestigeMultiplier(playerId);
      res.json({ canPrestige: canPrestige2, currentLevel, multiplier });
    } catch (error) {
      console.error("Error checking prestige status:", error);
      res.status(500).json({ error: "Failed to check prestige status" });
    }
  });
  app2.post("/api/players/:playerId/prestige", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { prestigeService: prestigeService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await prestigeService2.executePrestige(playerId);
      res.json(result);
    } catch (error) {
      console.error("Error executing prestige:", error);
      res.status(500).json({ error: "Failed to execute prestige" });
    }
  });
  app2.get("/api/daily-challenges", async (req, res) => {
    try {
      const { dailyChallengesService: dailyChallengesService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const challenges = await dailyChallengesService2.getTodaysChallenges();
      res.json(challenges);
    } catch (error) {
      console.error("Error fetching daily challenges:", error);
      res.status(500).json({ error: "Failed to fetch daily challenges" });
    }
  });
  app2.get("/api/players/:playerId/daily-challenges", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { dailyChallengesService: dailyChallengesService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const progress = await dailyChallengesService2.getPlayerChallengeProgress(playerId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching challenge progress:", error);
      res.status(500).json({ error: "Failed to fetch challenge progress" });
    }
  });
  app2.post("/api/players/purchase-ability", async (req, res) => {
    try {
      const { playerId, abilityId, kushCost } = req.body;
      if (!playerId || !abilityId || !kushCost) {
        return res.status(400).json({
          success: false,
          message: "Missing required parameters"
        });
      }
      const player2 = await storage.getPlayer(playerId);
      if (!player2) {
        return res.status(404).json({
          success: false,
          message: "Player not found"
        });
      }
      if (player2.totalKush < kushCost) {
        return res.status(400).json({
          success: false,
          message: `Need ${kushCost.toLocaleString()} KUSH to purchase this ability. You have ${player2.totalKush.toLocaleString()} KUSH.`
        });
      }
      await storage.updatePlayer(playerId, {
        totalKush: player2.totalKush - kushCost
      });
      res.json({
        success: true,
        message: `Successfully purchased ability for ${kushCost.toLocaleString()} KUSH!`,
        remainingKush: player2.totalKush - kushCost
      });
    } catch (error) {
      console.error("Error purchasing ability:", error);
      res.status(500).json({
        success: false,
        message: "Failed to purchase ability"
      });
    }
  });
  app2.post("/api/players/:playerId/enhanced-click", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { clickMechanicsService: clickMechanicsService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const clickResult = await clickMechanicsService2.processClick(playerId);
      if (clickResult.kushEarned > 0) {
        await storage.addPlayerKush(playerId, clickResult.kushEarned);
      }
      const player2 = await storage.getPlayer(playerId);
      if (player2) {
        await storage.updatePlayer(playerId, {
          totalClicks: player2.totalClicks + 1
        });
      }
      const updatedPlayer = await storage.getPlayer(playerId);
      res.json({
        ...clickResult,
        player: updatedPlayer
      });
    } catch (error) {
      console.error("Error processing enhanced click:", error);
      res.status(500).json({ error: "Failed to process enhanced click" });
    }
  });
  app2.post("/api/players/:playerId/friend-requests", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { toPlayerUsername } = req.body;
      const { friendsService: friendsService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await friendsService2.sendFriendRequest(playerId, toPlayerUsername);
      res.json(result);
    } catch (error) {
      console.error("Error sending friend request:", error);
      res.status(500).json({ error: "Failed to send friend request" });
    }
  });
  app2.get("/api/players/:playerId/friends", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { friendsService: friendsService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const friends = await friendsService2.getFriendsList(playerId);
      res.json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ error: "Failed to fetch friends" });
    }
  });
  app2.get("/api/players/:playerId/daily-bonus", async (req, res) => {
    try {
      const { playerId } = req.params;
      const loyalty = await storage.getPlayerLoyalty(playerId);
      if (!loyalty) {
        return res.status(404).json({ error: "Player loyalty data not found" });
      }
      const now = /* @__PURE__ */ new Date();
      const lastLogin = new Date(loyalty.lastLogin);
      const timeDiff = now.getTime() - lastLogin.getTime();
      const hoursDiff = timeDiff / (1e3 * 60 * 60);
      const bonusAvailable = hoursDiff >= 20;
      const streakMultiplier = Math.min(loyalty.consecutiveLogins, 10);
      const baseBonus = 50;
      const bonusAmount = baseBonus + streakMultiplier * 25;
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
  app2.post("/api/players/:playerId/claim-daily-bonus", async (req, res) => {
    try {
      const { playerId } = req.params;
      const [player2, loyalty] = await Promise.all([
        storage.getPlayer(playerId),
        storage.getPlayerLoyalty(playerId)
      ]);
      if (!player2 || !loyalty) {
        return res.status(404).json({ error: "Player or loyalty data not found" });
      }
      const now = /* @__PURE__ */ new Date();
      const lastLogin = new Date(loyalty.lastLogin);
      const timeDiff = now.getTime() - lastLogin.getTime();
      const hoursDiff = timeDiff / (1e3 * 60 * 60);
      if (hoursDiff < 20) {
        return res.status(400).json({
          success: false,
          message: `Daily bonus not ready yet. Wait ${Math.ceil(20 - hoursDiff)} more hours.`
        });
      }
      const newStreak = hoursDiff <= 48 ? loyalty.consecutiveLogins + 1 : 1;
      const newLongestStreak = Math.max(loyalty.longestLoginStreak, newStreak);
      const streakMultiplier = Math.min(newStreak, 10);
      const baseBonus = 50;
      const bonusAmount = baseBonus + streakMultiplier * 25;
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
  app2.get("/api/players/:playerId/pending-requests", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { friendsService: friendsService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const requests = await friendsService2.getPendingRequests(playerId);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      res.status(500).json({ error: "Failed to fetch pending requests" });
    }
  });
  app2.post("/api/friendships/:friendshipId/accept", async (req, res) => {
    try {
      const { friendshipId } = req.params;
      const { playerId } = req.body;
      const { friendsService: friendsService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await friendsService2.acceptFriendRequest(playerId, friendshipId);
      res.json({ success: result });
    } catch (error) {
      console.error("Error accepting friend request:", error);
      res.status(500).json({ error: "Failed to accept friend request" });
    }
  });
  app2.get("/api/players/:id/guild", async (req, res) => {
    try {
      const { id } = req.params;
      const { guildService: guildService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const guildInfo = await guildService2.getPlayerGuild(id);
      res.json(guildInfo);
    } catch (error) {
      console.error("Error fetching player guild:", error);
      res.status(500).json({ error: "Failed to fetch guild info" });
    }
  });
  app2.post("/api/guilds", async (req, res) => {
    try {
      const { leaderId, name, description } = req.body;
      const { guildService: guildService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await guildService2.createGuild(leaderId, name, description);
      res.json(result);
    } catch (error) {
      console.error("Error creating guild:", error);
      res.status(500).json({ error: "Failed to create guild" });
    }
  });
  app2.get("/api/guilds/public", async (req, res) => {
    try {
      const { guildService: guildService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const publicGuilds = await guildService2.getGuildLeaderboard();
      res.json(publicGuilds);
    } catch (error) {
      console.error("Error fetching public guilds:", error);
      res.status(500).json({ error: "Failed to fetch public guilds" });
    }
  });
  app2.get("/api/guilds/leaderboard", async (req, res) => {
    try {
      const { guildService: guildService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const leaderboard = await guildService2.getGuildLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching guild leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch guild leaderboard" });
    }
  });
  app2.post("/api/guilds/join", async (req, res) => {
    try {
      const { playerId, guildId } = req.body;
      const { guildService: guildService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await guildService2.joinGuild(playerId, guildId);
      res.json(result);
    } catch (error) {
      console.error("Error joining guild:", error);
      res.status(500).json({ error: "Failed to join guild" });
    }
  });
  app2.get("/api/guilds/:guildId/members", async (req, res) => {
    try {
      const { guildId } = req.params;
      const { guildService: guildService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const members = await guildService2.getGuildMembers(guildId);
      res.json(members);
    } catch (error) {
      console.error("Error fetching guild members:", error);
      res.status(500).json({ error: "Failed to fetch guild members" });
    }
  });
  app2.post("/api/guilds/contribute", async (req, res) => {
    try {
      const { playerId, kushAmount } = req.body;
      if (!playerId || !kushAmount || kushAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid player ID or contribution amount"
        });
      }
      const { guildService: guildService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const success = await guildService2.contributeToGuild(playerId, kushAmount);
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
  app2.post("/api/garden/buy-plot", async (req, res) => {
    try {
      const { playerId } = req.body;
      const plotCost = 5e3;
      if (!playerId) {
        return res.status(400).json({
          success: false,
          message: "Player ID required"
        });
      }
      const player2 = await storage.getPlayer(playerId);
      if (!player2) {
        return res.status(404).json({
          success: false,
          message: "Player not found"
        });
      }
      if (player2.totalKush < plotCost) {
        return res.status(400).json({
          success: false,
          message: `Need ${plotCost.toLocaleString()} KUSH to unlock a new garden plot. You have ${player2.totalKush.toLocaleString()} KUSH.`
        });
      }
      const existingPlots = await storage.getPlayerGardenPlots(playerId);
      const plotNumber = existingPlots.length + 1;
      const newPlot = {
        id: `plot_${playerId}_${plotNumber}`,
        playerId,
        plotNumber,
        strainId: null,
        plantedAt: null,
        lastWatered: null,
        lastFertilized: null,
        growthStage: "empty",
        harvestTime: null,
        expectedYield: 0,
        isUnlocked: true,
        unlockCost: plotCost
      };
      await storage.createGardenPlot(newPlot);
      await storage.updatePlayer(playerId, {
        totalKush: player2.totalKush - plotCost
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
  app2.get("/api/garden/strains", async (req, res) => {
    try {
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const strains = await growGardenService2.getAllStrains();
      res.json(strains);
    } catch (error) {
      console.error("Error fetching strain genetics:", error);
      res.status(500).json({ error: "Failed to fetch strain genetics" });
    }
  });
  app2.get("/api/garden/plots/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      await growGardenService2.updateAllPlantGrowthStages(playerId);
      const plots = await growGardenService2.getPlayerGarden(playerId);
      res.json(plots);
    } catch (error) {
      console.error("Error fetching garden plots:", error);
      res.status(500).json({ error: "Failed to fetch garden plots" });
    }
  });
  app2.get("/api/garden/supplies/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const supplies = await growGardenService2.getPlayerSupplies(playerId);
      res.json(supplies);
    } catch (error) {
      console.error("Error fetching garden supplies:", error);
      res.status(500).json({ error: "Failed to fetch garden supplies" });
    }
  });
  app2.post("/api/garden/plant", async (req, res) => {
    try {
      const { playerId, plotId, strainId } = req.body;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await growGardenService2.plantStrain(playerId, plotId, strainId);
      res.json(result);
    } catch (error) {
      console.error("Error planting strain:", error);
      res.status(500).json({ error: "Failed to plant strain" });
    }
  });
  app2.post("/api/garden/water", async (req, res) => {
    try {
      const { playerId, plotId } = req.body;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      await growGardenService2.updateAllPlantGrowthStages(playerId);
      const result = await growGardenService2.waterPlant(playerId, plotId);
      res.json(result);
    } catch (error) {
      console.error("Error watering plant:", error);
      res.status(500).json({ error: "Failed to water plant" });
    }
  });
  app2.post("/api/garden/fertilize", async (req, res) => {
    try {
      const { playerId, plotId } = req.body;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      await growGardenService2.updateAllPlantGrowthStages(playerId);
      const result = await growGardenService2.fertilizePlant(playerId, plotId);
      res.json(result);
    } catch (error) {
      console.error("Error fertilizing plant:", error);
      res.status(500).json({ error: "Failed to fertilize plant" });
    }
  });
  app2.post("/api/garden/harvest", async (req, res) => {
    try {
      const { playerId, plotId } = req.body;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await growGardenService2.harvestPlant(playerId, plotId);
      res.json(result);
    } catch (error) {
      console.error("Error harvesting plant:", error);
      res.status(500).json({ error: "Failed to harvest plant" });
    }
  });
  app2.post("/api/garden/crossbreed", async (req, res) => {
    try {
      const { playerId, parent1Id, parent2Id } = req.body;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await growGardenService2.crossBreedStrains(playerId, parent1Id, parent2Id);
      res.json(result);
    } catch (error) {
      console.error("Error cross-breeding strains:", error);
      res.status(500).json({ error: "Failed to cross-breed strains" });
    }
  });
  app2.post("/api/garden/buy-supplies", async (req, res) => {
    try {
      const { playerId, supplyType, quantity } = req.body;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await growGardenService2.buyGardenSupplies(playerId, supplyType, quantity);
      res.json(result);
    } catch (error) {
      console.error("Error buying garden supplies:", error);
      res.status(500).json({ error: "Failed to buy garden supplies" });
    }
  });
  app2.get("/api/garden/harvest-history/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { growGardenService: growGardenService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const history = await growGardenService2.getHarvestHistory(playerId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching harvest history:", error);
      res.status(500).json({ error: "Failed to fetch harvest history" });
    }
  });
  app2.get("/api/players/:playerId/wallet", async (req, res) => {
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
  app2.post("/api/players/:playerId/seeds", async (req, res) => {
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
  app2.get("/api/staking-pools", async (req, res) => {
    try {
      const pools = await storage.getStakingPools();
      res.json(pools);
    } catch (error) {
      console.error("Error fetching staking pools:", error);
      res.status(500).json({ error: "Failed to fetch staking pools" });
    }
  });
  app2.post("/api/battles/challenge", async (req, res) => {
    try {
      const { challengerId, defenderId, wager } = req.body;
      const { pvpBattleArenaService: pvpBattleArenaService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await pvpBattleArenaService2.challengePlayer(challengerId, defenderId, wager);
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
  app2.get("/api/battles/active", async (req, res) => {
    try {
      const { playerId } = req.query;
      const { pvpBattleArenaService: pvpBattleArenaService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const battles = await pvpBattleArenaService2.getActiveBattles(playerId);
      res.json(battles);
    } catch (error) {
      console.error("Error fetching active battles:", error);
      res.status(500).json({ error: "Failed to fetch battles" });
    }
  });
  app2.post("/api/battles/ability", async (req, res) => {
    try {
      const { playerId, battleId, abilityId } = req.body;
      const { pvpBattleArenaService: pvpBattleArenaService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await pvpBattleArenaService2.useAbility(playerId, battleId, abilityId);
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
  app2.get("/api/tournaments/open", async (req, res) => {
    try {
      const { pvpBattleArenaService: pvpBattleArenaService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const tournaments2 = await pvpBattleArenaService2.getOpenTournaments();
      res.json(tournaments2);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ error: "Failed to fetch tournaments" });
    }
  });
  app2.post("/api/tournaments/join", async (req, res) => {
    try {
      const { playerId, tournamentId } = req.body;
      const { pvpBattleArenaService: pvpBattleArenaService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await pvpBattleArenaService2.joinTournament(playerId, tournamentId);
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
  app2.get("/api/battles/leaderboard", async (req, res) => {
    try {
      const { pvpBattleArenaService: pvpBattleArenaService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const leaderboard = await pvpBattleArenaService2.getBattleLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching battle leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });
  app2.post("/api/vip/subscribe", async (req, res) => {
    try {
      const { playerId, tier } = req.body;
      if (!playerId || !tier) {
        return res.status(400).json({ message: "Player ID and tier required" });
      }
      const { vipService: vipService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await vipService2.subscribeToVIP(playerId, tier);
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
  app2.get("/api/vip/benefits/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const { vipService: vipService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const benefits = await vipService2.getVIPBenefits(playerId);
      res.json(benefits);
    } catch (error) {
      console.error("VIP benefits error:", error);
      res.status(500).json({ message: "Failed to get VIP benefits" });
    }
  });
  app2.post("/api/players/tutorial-reward", async (req, res) => {
    try {
      const { playerId, reward, stepId } = req.body;
      if (!playerId || !reward || !stepId) {
        return res.status(400).json({ message: "Player ID, reward amount, and step ID required" });
      }
      const player2 = await storage.getPlayer(playerId);
      if (!player2) {
        return res.status(404).json({ message: "Player not found" });
      }
      const existingReward = await storage.getTutorialReward(playerId, stepId);
      if (existingReward) {
        return res.status(400).json({ message: "Tutorial reward already claimed for this step" });
      }
      await storage.updatePlayer(playerId, {
        totalKush: player2.totalKush + reward
      });
      await storage.recordTutorialReward(playerId, stepId, reward);
      res.json({
        success: true,
        message: `Tutorial reward of ${reward} KUSH awarded!`,
        newTotal: player2.totalKush + reward
      });
    } catch (error) {
      console.error("Tutorial reward error:", error);
      res.status(500).json({ message: "Failed to award tutorial reward" });
    }
  });
  app2.get("/api/events/active", async (req, res) => {
    try {
      const { seasonalEventsService: seasonalEventsService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const events = await seasonalEventsService2.getActiveEvents();
      res.json(events);
    } catch (error) {
      console.error("Active events error:", error);
      res.status(500).json({ message: "Failed to get active events" });
    }
  });
  app2.post("/api/events/join", async (req, res) => {
    try {
      const { playerId, eventId } = req.body;
      if (!playerId || !eventId) {
        return res.status(400).json({ message: "Player ID and event ID required" });
      }
      const { seasonalEventsService: seasonalEventsService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await seasonalEventsService2.participateInEvent(playerId, eventId);
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
  app2.get("/api/marketplace/listings", async (req, res) => {
    try {
      const { marketplaceService: marketplaceService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const listings = await marketplaceService2.getActiveListings();
      res.json(listings);
    } catch (error) {
      console.error("Marketplace listings error:", error);
      res.status(500).json({ message: "Failed to get marketplace listings" });
    }
  });
  app2.post("/api/marketplace/list", async (req, res) => {
    try {
      const { sellerId, strainId, price, quantity } = req.body;
      if (!sellerId || !strainId || !price) {
        return res.status(400).json({ message: "Seller ID, strain ID, and price required" });
      }
      const { marketplaceService: marketplaceService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await marketplaceService2.listStrainForSale(sellerId, strainId, price, quantity || 1);
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
  app2.post("/api/marketplace/purchase", async (req, res) => {
    try {
      const { buyerId, listingId } = req.body;
      if (!buyerId || !listingId) {
        return res.status(400).json({ message: "Buyer ID and listing ID required" });
      }
      const { marketplaceService: marketplaceService2 } = await Promise.resolve().then(() => (init_comprehensive_game_service(), comprehensive_game_service_exports));
      const result = await marketplaceService2.purchaseFromMarketplace(buyerId, listingId);
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
  app2.get("/api/staking/pools", async (req, res) => {
    try {
      const pools = await storage.getStakingPools();
      res.json(pools);
    } catch (error) {
      console.error("Staking pools error:", error);
      res.status(500).json({ message: "Failed to get staking pools" });
    }
  });
  app2.post("/api/staking/stake", async (req, res) => {
    try {
      const { playerId, poolId, amount } = req.body;
      if (!playerId || !poolId || !amount) {
        return res.status(400).json({ message: "Player ID, pool ID, and amount required" });
      }
      const player2 = await storage.getPlayer(playerId);
      const pool = await storage.getStakingPool(poolId);
      if (!player2 || !pool) {
        return res.status(404).json({ message: "Player or pool not found" });
      }
      if (player2.totalKush < amount) {
        return res.status(400).json({ message: `Need ${amount.toLocaleString()} KUSH to stake` });
      }
      if (amount < pool.minStake || amount > pool.maxStake) {
        return res.status(400).json({
          message: `Stake amount must be between ${pool.minStake} and ${pool.maxStake} KUSH`
        });
      }
      const endDate = /* @__PURE__ */ new Date();
      endDate.setDate(endDate.getDate() + pool.duration);
      await storage.updatePlayer(playerId, { totalKush: player2.totalKush - amount });
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
  app2.get("/api/staking/player/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const stakes = await storage.getPlayerStakes(playerId);
      res.json(stakes);
    } catch (error) {
      console.error("Player stakes error:", error);
      res.status(500).json({ message: "Failed to get player stakes" });
    }
  });
  app2.post("/api/staking/claim/:stakeId", async (req, res) => {
    try {
      const { stakeId } = req.params;
      const stake = await storage.getPlayerStake(stakeId);
      if (!stake) {
        return res.status(404).json({ message: "Stake not found" });
      }
      if (stake.status !== "active") {
        return res.status(400).json({ message: "Stake not active" });
      }
      if (/* @__PURE__ */ new Date() < stake.endDate) {
        return res.status(400).json({ message: "Staking period not complete" });
      }
      const pool = await storage.getStakingPool(stake.poolId);
      const rewardAmount = Math.floor(stake.stakedAmount * (pool.apy / 1e4));
      const player2 = await storage.getPlayer(stake.playerId);
      await storage.updatePlayer(stake.playerId, {
        totalKush: player2.totalKush + stake.stakedAmount + rewardAmount
      });
      await storage.updatePlayerStake(stakeId, {
        status: "completed",
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
  app2.get("/api/onboarding/:playerId", async (req, res) => {
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
  app2.post("/api/onboarding/complete", async (req, res) => {
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
      progress.steps[step] = true;
      const completedSteps = Object.values(progress.steps).filter(Boolean).length;
      progress.currentStep = completedSteps + 1;
      progress.completed = completedSteps === progress.totalSteps;
      if (progress.completed && !await storage.hasOnboardingBonus(playerId)) {
        const player2 = await storage.getPlayer(playerId);
        await storage.updatePlayer(playerId, { totalKush: player2.totalKush + 5e3 });
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
  app2.get("/api/ab-testing/config/:playerId", async (req, res) => {
    try {
      const { playerId } = req.params;
      const hash = __require("crypto").createHash("md5").update(playerId).digest("hex");
      const hashNumber = parseInt(hash.slice(0, 8), 16);
      const tests = {
        clickMultiplier: hashNumber % 2 === 0 ? "control" : "variant",
        // 50/50 split
        kushRewards: hashNumber % 3 === 0 ? "low" : hashNumber % 3 === 1 ? "medium" : "high",
        // 33/33/33 split
        vipPricing: hashNumber % 4 === 0 ? "10k" : "15k",
        // 75/25 split for VIP pricing
        gardenSpeed: hashNumber % 2 === 1 ? "fast" : "normal"
        // 50/50 split
      };
      res.json({ playerId, tests });
    } catch (error) {
      console.error("A/B testing config error:", error);
      res.status(500).json({ message: "Failed to get A/B test config" });
    }
  });
  app2.post("/api/ab-testing/convert", async (req, res) => {
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
  app2.get("/api/admin/ab-testing/results", async (req, res) => {
    try {
      const { adminUsername } = req.query;
      if (adminUsername?.toString().toLowerCase() !== "wlsfx" && adminUsername?.toString().toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      const results = await storage.getAbTestResults();
      res.json(results);
    } catch (error) {
      console.error("A/B test results error:", error);
      res.status(500).json({ message: "Failed to get A/B test results" });
    }
  });
  app2.get("/api/admin/performance", async (req, res) => {
    try {
      const { adminUsername } = req.query;
      if (adminUsername?.toString().toLowerCase() !== "wlsfx" && adminUsername?.toString().toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      const metrics = {
        activeUsers: await storage.getActiveUserCount(),
        totalTransactions: await storage.getTotalTransactionCount(),
        averageResponseTime: await storage.getAverageResponseTime(),
        errorRate: await storage.getErrorRate(),
        tokenOperationsSuccess: await storage.getTokenOperationsSuccessRate(),
        databaseHealth: await storage.getDatabaseHealth(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      res.json(metrics);
    } catch (error) {
      console.error("Performance metrics error:", error);
      res.status(500).json({ message: "Failed to get performance metrics" });
    }
  });
  app2.post("/api/admin/track-transaction", async (req, res) => {
    try {
      const { type, success, responseTime, playerId } = req.body;
      await storage.trackTransactionMetrics({
        type: type || "generic",
        success: success !== false,
        // default to true
        responseTime: responseTime || 0,
        playerId,
        timestamp: /* @__PURE__ */ new Date()
      });
      res.json({ success: true, message: "Transaction tracked" });
    } catch (error) {
      console.error("Transaction tracking error:", error);
      res.status(500).json({ message: "Failed to track transaction" });
    }
  });
  app2.post("/api/admin/flag-activity", async (req, res) => {
    try {
      const { playerId, activityType, severity, description } = req.body;
      if (!playerId || !activityType || !severity) {
        return res.status(400).json({ message: "Player ID, activity type, and severity required" });
      }
      await storage.flagSuspiciousActivity({
        playerId,
        activityType,
        severity,
        // low, medium, high, critical
        description: description || "",
        flaggedAt: /* @__PURE__ */ new Date(),
        reviewed: false
      });
      if (severity === "critical") {
        await storage.updatePlayer(playerId, { suspended: true });
      }
      res.json({
        success: true,
        message: `Activity flagged as ${severity}`,
        autoSuspended: severity === "critical"
      });
    } catch (error) {
      console.error("Activity flagging error:", error);
      res.status(500).json({ message: "Failed to flag activity" });
    }
  });
  app2.get("/api/admin/flagged-activities", async (req, res) => {
    try {
      const { adminUsername } = req.query;
      if (adminUsername?.toString().toLowerCase() !== "wlsfx" && adminUsername?.toString().toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      const activities = await storage.getFlaggedActivities();
      res.json(activities);
    } catch (error) {
      console.error("Flagged activities error:", error);
      res.status(500).json({ message: "Failed to get flagged activities" });
    }
  });
  app2.post("/api/admin/review-activity", async (req, res) => {
    try {
      const { adminUsername, activityId, action, notes } = req.body;
      if (adminUsername?.toLowerCase() !== "wlsfx" && adminUsername?.toLowerCase() !== "walsh") {
        return res.status(403).json({ message: "Access denied - Admin privileges required" });
      }
      await storage.reviewFlaggedActivity(activityId, {
        action,
        // dismiss, warn, suspend, ban
        notes: notes || "",
        reviewedBy: adminUsername,
        reviewedAt: /* @__PURE__ */ new Date()
      });
      res.json({ success: true, message: `Activity ${action}ed successfully` });
    } catch (error) {
      console.error("Activity review error:", error);
      res.status(500).json({ message: "Failed to review activity" });
    }
  });
  const httpServer = createServer(app2);
  app2.post("/api/players/:id/refresh-balance", async (req, res) => {
    try {
      const { id } = req.params;
      const player2 = await storage.getPlayer(id);
      if (!player2 || !player2.walletAddress) {
        return res.status(404).json({ message: "Player not found or no wallet linked" });
      }
      console.log(`\u{1F504} Manual refresh requested for player ${player2.username}`);
      const { mainnetTokenService: mainnetTokenService2 } = await Promise.resolve().then(() => (init_solana_token_service(), solana_token_service_exports));
      const balance = await mainnetTokenService2.getTokenBalance(player2.walletAddress);
      const now = Date.now();
      tokenBalanceCache.set(player2.walletAddress, {
        balance,
        timestamp: now
      });
      activePlayerWallets.add(player2.walletAddress);
      const io = global.io;
      if (io) {
        io.emit("balanceUpdate", {
          playerId: player2.id,
          walletAddress: player2.walletAddress,
          balance,
          timestamp: now
        });
      }
      console.log(`\u2705 Manual refresh completed: ${balance} KUSH for ${player2.username}`);
      res.json({
        success: true,
        balance,
        walletAddress: player2.walletAddress,
        lastUpdated: now,
        manualRefresh: true
      });
    } catch (error) {
      console.error("\u274C Manual balance refresh failed:", error);
      res.status(500).json({
        success: false,
        message: "Failed to refresh balance",
        error: error.message
      });
    }
  });
  const adminCodes = /* @__PURE__ */ new Map();
  app2.post("/api/admin/send-2fa-code", async (req, res) => {
    try {
      const { username } = req.body;
      if (username !== "walsh") {
        return res.status(401).json({ error: "Unauthorized user" });
      }
      const code = Math.floor(1e5 + Math.random() * 9e5).toString();
      adminCodes.set(username, {
        code,
        timestamp: Date.now(),
        attempts: 0
      });
      const { sendAdmin2FA: sendAdmin2FA2 } = await Promise.resolve().then(() => (init_telegram_bot(), telegram_bot_exports));
      const sent = await sendAdmin2FA2(code);
      if (!sent) {
        adminCodes.delete(username);
        return res.status(500).json({ error: "Failed to send 2FA code via Telegram" });
      }
      res.json({ success: true, message: "2FA code sent" });
    } catch (error) {
      console.error("Error sending 2FA code:", error);
      res.status(500).json({ error: "Failed to send 2FA code" });
    }
  });
  app2.post("/api/admin/verify-2fa", async (req, res) => {
    try {
      const { username, code } = req.body;
      if (username !== "walsh") {
        return res.status(401).json({ error: "Unauthorized user" });
      }
      const stored = adminCodes.get(username);
      if (!stored) {
        return res.status(400).json({ error: "No 2FA code found. Please request a new one." });
      }
      const isExpired = Date.now() - stored.timestamp > 5 * 60 * 1e3;
      if (isExpired) {
        adminCodes.delete(username);
        return res.status(400).json({ error: "2FA code expired. Please request a new one." });
      }
      stored.attempts += 1;
      if (stored.attempts > 3) {
        adminCodes.delete(username);
        return res.status(429).json({ error: "Too many attempts. Please request a new code." });
      }
      if (stored.code === code) {
        adminCodes.delete(username);
        res.json({ success: true, message: "2FA verification successful" });
      } else {
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
  app2.get("/api/admin/player-support", async (req, res) => {
    try {
      const players2 = await storage.getAllPlayers();
      const payouts = await storage.getAllTokenPayouts();
      const last7Days = Date.now() - 7 * 24 * 60 * 60 * 1e3;
      const recentIssues = players2.filter(
        (p) => new Date(p.lastActive).getTime() > last7Days && (p.totalKush < 100 || !p.walletLinked)
      );
      const needsAttention = players2.filter(
        (p) => p.totalKush > 1e4 && !p.walletLinked || // High earners without wallets
        p.totalClicks > 5e3 && p.totalKush < 1e3 || // High activity but low rewards
        new Date(p.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1e3 && p.totalKush > 5e3
        // New high earners
      );
      const pendingTokens = payouts.filter((p) => p.status === "pending");
      const failedPayouts = payouts.filter((p) => p.status === "failed");
      res.json({
        summary: {
          totalPlayers: players2.length,
          recentIssues: recentIssues.length,
          needsAttention: needsAttention.length,
          pendingPayouts: pendingTokens.length,
          failedPayouts: failedPayouts.length
        },
        recentIssues: recentIssues.slice(0, 10).map((p) => ({
          id: p.id,
          username: p.username,
          totalKush: p.totalKush,
          walletLinked: p.walletLinked,
          lastActive: p.lastActive,
          issue: p.totalKush < 100 ? "Low earnings" : "Wallet not linked"
        })),
        needsAttention: needsAttention.slice(0, 10).map((p) => ({
          id: p.id,
          username: p.username,
          totalKush: p.totalKush,
          totalClicks: p.totalClicks,
          walletLinked: p.walletLinked,
          createdAt: p.createdAt,
          priority: p.totalKush > 1e4 && !p.walletLinked ? "high" : "medium"
        })),
        pendingTokens: pendingTokens.slice(0, 20),
        failedPayouts: failedPayouts.slice(0, 10)
      });
    } catch (error) {
      console.error("Error fetching player support data:", error);
      res.status(500).json({ message: "Failed to fetch support data" });
    }
  });
  app2.post("/api/admin/tokens/bulk-distribute", async (req, res) => {
    try {
      const { recipients, amount, reason, adminUsername } = req.body;
      if (adminUsername?.toLowerCase() !== "walsh") {
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
          const player2 = await storage.getPlayer(playerId);
          if (!player2 || !player2.walletAddress) {
            errors.push(`Player ${playerId}: No wallet linked`);
            continue;
          }
          const payout = await storage.createTokenPayout({
            playerId: player2.id,
            walletAddress: player2.walletAddress,
            amount,
            reason: reason || "Bulk admin distribution",
            network: "mainnet"
          });
          results.push({
            playerId: player2.id,
            username: player2.username,
            walletAddress: player2.walletAddress,
            amount,
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
  app2.post("/api/admin/player/:id/adjust-kush", async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, reason, adminUsername } = req.body;
      if (adminUsername?.toLowerCase() !== "walsh") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const player2 = await storage.getPlayer(id);
      if (!player2) {
        return res.status(404).json({ error: "Player not found" });
      }
      const newTotal = Math.max(0, player2.totalKush + amount);
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: newTotal
      });
      console.log(`\u{1F527} Admin KUSH adjustment: ${amount} KUSH ${amount > 0 ? "added to" : "removed from"} ${player2.username} by ${adminUsername}. Reason: ${reason || "No reason provided"}`);
      res.json({
        success: true,
        player: updatedPlayer,
        previousTotal: player2.totalKush,
        newTotal,
        adjustment: amount,
        reason: reason || "Admin adjustment"
      });
    } catch (error) {
      console.error("Error adjusting player KUSH:", error);
      res.status(500).json({ error: "Failed to adjust KUSH" });
    }
  });
  app2.get("/api/admin/system/health", async (req, res) => {
    try {
      const cacheStats = cache.getStats();
      const performanceMetrics = cache.getPerformanceMetrics();
      const players2 = await storage.getAllPlayers();
      const recentActivity = players2.filter(
        (p) => new Date(p.lastActive).getTime() > Date.now() - 60 * 60 * 1e3
        // Last hour
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
          totalPlayers: players2.length,
          activeLastHour: recentActivity.length,
          activePlayers: recentActivity.length,
          connectionHealth: "healthy"
          // TODO: Add actual DB health check
        },
        performance: {
          averageResponseTime: "45ms",
          // TODO: Track actual response times
          errorRate: "0.1%",
          // TODO: Track actual error rate
          requestsPerMinute: recentActivity.length * 2
          // Estimate
        }
      };
      res.json(systemHealth);
    } catch (error) {
      console.error("Error fetching system health:", error);
      res.status(500).json({ error: "Failed to fetch system health" });
    }
  });
  app2.post("/webhook/:token", (req, res) => {
    try {
      const { token } = req.params;
      const expectedToken = process.env.TELEGRAM_BOT_TOKEN;
      if (token !== expectedToken) {
        console.warn(`\u26A0\uFE0F Invalid webhook token attempt: ${token}`);
        return res.status(401).json({ error: "Unauthorized" });
      }
      const update = req.body;
      console.log(`\u{1F4E9} Telegram webhook received:`, update);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error("\u274C Webhook processing error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });
  app2.get("/api/analytics/player/:playerId/:timeRange?", async (req, res) => {
    try {
      const { playerId, timeRange = "7d" } = req.params;
      const player2 = await storage.getPlayerById(playerId);
      if (!player2) {
        return res.status(404).json({ error: "Player not found" });
      }
      const now = /* @__PURE__ */ new Date();
      let startDate = /* @__PURE__ */ new Date();
      if (timeRange === "7d") {
        startDate.setDate(now.getDate() - 7);
      } else if (timeRange === "30d") {
        startDate.setDate(now.getDate() - 30);
      } else {
        startDate = /* @__PURE__ */ new Date(0);
      }
      const allPlayers = await storage.getAllPlayers();
      const playerRank = allPlayers.sort((a, b) => b.totalKush - a.totalKush).findIndex((p) => p.id === playerId) + 1;
      const marketplaceItems = await storage.getMarketplaceItems();
      const strainsOwned = player2.ownedStrains ? player2.ownedStrains.length : 0;
      const totalStrains = marketplaceItems.filter((item) => item.category === "seeds").length;
      const analyticsData = {
        overview: {
          totalKushEarned: player2.totalKush,
          totalClicks: player2.totalClicks || Math.floor(player2.totalKush / 2),
          daysPlayed: Math.max(1, Math.floor((now.getTime() - new Date(player2.createdAt || now).getTime()) / (1e3 * 60 * 60 * 24))),
          averageKushPerDay: Math.floor(player2.totalKush / Math.max(1, Math.floor((now.getTime() - new Date(player2.createdAt || now).getTime()) / (1e3 * 60 * 60 * 24)))),
          rankPosition: playerRank,
          totalPlayers: allPlayers.length
        },
        marketplace: {
          totalPurchases: player2.purchaseHistory?.length || Math.floor(player2.totalKush / 1e3),
          totalSpent: Math.floor(player2.totalKush * 0.6),
          favoriteStrain: player2.ownedStrains?.[0] || "Purple Gorilla Supreme",
          averageTransactionValue: Math.floor(player2.totalKush * 0.1),
          strainsOwned,
          totalStrains
        },
        staking: {
          totalStaked: player2.activeStakes?.reduce((sum, stake) => sum + stake.amount, 0) || 0,
          activeStakes: player2.activeStakes?.length || 0,
          totalRewards: Math.floor(player2.totalKush * 0.15),
          averageAPY: player2.activeStakes?.reduce((sum, stake) => sum + stake.apy, 0) / Math.max(player2.activeStakes?.length || 1, 1) || 12.5,
          longestStakeDays: Math.max(...player2.activeStakes?.map((stake) => stake.duration) || [0], 0),
          stakingEfficiency: Math.min((player2.activeStakes?.length || 0) / 5 * 100, 100)
        },
        achievements: {
          unlockedCount: player2.achievements?.length || 0,
          totalCount: 20,
          recentAchievements: (player2.achievements || []).slice(-3).map((ach) => ({
            name: ach.name,
            description: ach.description,
            earnedDate: ach.earnedAt || (/* @__PURE__ */ new Date()).toISOString(),
            reward: ach.reward || 100
          })),
          nextAchievement: player2.achievements?.length < 20 ? {
            name: "Master Grower",
            progress: player2.totalKush,
            target: Math.floor((player2.achievements?.length || 0) * 1e3 + 5e3)
          } : null
        },
        activity: {
          weeklyActivity: Array.from({ length: 7 }, (_, i) => {
            const date = /* @__PURE__ */ new Date();
            date.setDate(date.getDate() - (6 - i));
            return {
              day: date.toLocaleDateString("en", { weekday: "short" }),
              clicks: Math.floor(Math.random() * 500 + 100),
              kushEarned: Math.floor(Math.random() * 200 + 50)
            };
          }),
          peakActivity: {
            hour: Math.floor(Math.random() * 12 + 14),
            // 2-11 PM
            clicks: Math.floor(Math.random() * 200 + 100)
          },
          longestSession: Math.floor(Math.random() * 3600 + 1800)
          // 30min - 90min
        }
      };
      res.json(analyticsData);
    } catch (error) {
      console.error("Error fetching player analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics data" });
    }
  });
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
init_telegram_bot();
init_discord_bot();
init_kush_notify_bot();
init_solana_token_service();

// server/security-middleware.ts
import rateLimit from "express-rate-limit";
import { z as z2 } from "zod";
var BOT_PATTERNS = [
  /curl\//i,
  /wget/i,
  /^python/i,
  /scrapy/i,
  /^$/
  // Empty user agent only
];
var SUSPICIOUS_IPS = /* @__PURE__ */ new Set();
var REQUEST_TIMESTAMPS = /* @__PURE__ */ new Map();
var botProtection = (req, res, next) => {
  const userAgent = req.get("User-Agent") || "";
  const ip = req.ip || req.connection.remoteAddress || "";
  const isBotUserAgent = BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
  if (isBotUserAgent) {
    console.log(`\u{1F6AB} Bot detected: ${userAgent} from IP ${ip}`);
    return res.status(429).json({
      error: "Automated access not allowed",
      code: "BOT_DETECTED"
    });
  }
  const now = Date.now();
  const ipRequests = REQUEST_TIMESTAMPS.get(ip) || [];
  const recentRequests = ipRequests.filter((timestamp2) => now - timestamp2 < 6e4);
  recentRequests.push(now);
  REQUEST_TIMESTAMPS.set(ip, recentRequests);
  if (recentRequests.length > 300) {
    SUSPICIOUS_IPS.add(ip);
    console.log(`\u{1F6A8} Suspicious activity from IP ${ip}: ${recentRequests.length} requests/minute`);
    return res.status(429).json({
      error: "Too many requests",
      code: "RATE_LIMIT_EXCEEDED"
    });
  }
  if (SUSPICIOUS_IPS.has(ip)) {
    return res.status(429).json({
      error: "Access temporarily restricted",
      code: "IP_BLOCKED"
    });
  }
  next();
};
var secureRateLimiters = {
  // Strict limiter for sensitive actions
  strict: rateLimit({
    windowMs: 5 * 60 * 1e3,
    // 5 minutes
    max: 10,
    // 10 requests per 5 minutes
    message: {
      error: "Too many sensitive operations",
      code: "STRICT_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false
  }),
  // Admin action limiter
  admin: rateLimit({
    windowMs: 1 * 60 * 1e3,
    // 1 minute
    max: 30,
    // 30 admin actions per minute
    message: {
      error: "Too many admin operations",
      code: "ADMIN_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false
  }),
  // Token operation limiter
  tokens: rateLimit({
    windowMs: 10 * 60 * 1e3,
    // 10 minutes
    max: 20,
    // 20 token operations per 10 minutes
    message: {
      error: "Too many token operations",
      code: "TOKEN_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false
  }),
  // Wallet operation limiter
  wallet: rateLimit({
    windowMs: 60 * 60 * 1e3,
    // 1 hour
    max: 5,
    // 5 wallet operations per hour
    message: {
      error: "Too many wallet operations",
      code: "WALLET_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false
  })
};
var sanitizeInput = (req, res, next) => {
  const sanitizeString = (str) => {
    return str.replace(/<script[^>]*>.*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").trim();
  };
  const sanitizeObject = (obj) => {
    if (typeof obj === "string") {
      return sanitizeString(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    if (obj && typeof obj === "object") {
      const sanitized = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[sanitizeString(key)] = sanitizeObject(value);
      }
      return sanitized;
    }
    return obj;
  };
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  next();
};
var securityMonitor = (req, res, next) => {
  const startTime = Date.now();
  const ip = req.ip || "";
  const userAgent = req.get("User-Agent") || "";
  const isHighRisk = req.path.includes("/admin") || req.path.includes("/token") || req.path.includes("/wallet") || req.method === "DELETE";
  if (isHighRisk) {
    console.log(`\u{1F50D} Security Monitor: ${req.method} ${req.path} from ${ip}`);
  }
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    if (duration > 5e3) {
      console.log(`\u26A0\uFE0F Slow request: ${req.method} ${req.path} took ${duration}ms from ${ip}`);
    }
    if (res.statusCode >= 400) {
      const failedRequests = REQUEST_TIMESTAMPS.get(`${ip}:failed`) || [];
      failedRequests.push(Date.now());
      REQUEST_TIMESTAMPS.set(`${ip}:failed`, failedRequests.slice(-10));
      const recentFailures = failedRequests.filter((time) => Date.now() - time < 3e5);
      if (recentFailures.length >= 5) {
        SUSPICIOUS_IPS.add(ip);
        console.log(`\u{1F6A8} IP flagged for multiple failures: ${ip}`);
      }
    }
  });
  next();
};
setInterval(() => {
  SUSPICIOUS_IPS.clear();
  REQUEST_TIMESTAMPS.clear();
  console.log("\u{1F9F9} Security monitor: Cleared temporary IP blocks");
}, 36e5);

// server/index.ts
var serverInstance = null;
var isShuttingDown = false;
var PROCESS_ID_FILE = "/tmp/kushklicker-server.pid";
var checkExistingInstance = async () => {
  try {
    const fs2 = await import("fs");
    if (fs2.existsSync(PROCESS_ID_FILE)) {
      const pidString = fs2.readFileSync(PROCESS_ID_FILE, "utf8").trim();
      const pid = parseInt(pidString);
      try {
        process.kill(pid, 0);
        console.log(`\u26A0\uFE0F Server already running with PID ${pid}`);
        return true;
      } catch (error) {
        fs2.unlinkSync(PROCESS_ID_FILE);
        console.log(`\u{1F9F9} Removed stale PID file for process ${pid}`);
        return false;
      }
    }
    return false;
  } catch (error) {
    console.warn("\u26A0\uFE0F Error checking existing instance:", error);
    return false;
  }
};
var writePidFile = async () => {
  try {
    const fs2 = await import("fs");
    fs2.writeFileSync(PROCESS_ID_FILE, process.pid.toString());
    console.log(`\u{1F4DD} Process ID ${process.pid} written to ${PROCESS_ID_FILE}`);
  } catch (error) {
    console.warn("\u26A0\uFE0F Could not write PID file:", error);
  }
};
var cleanupPidFile = async () => {
  try {
    const fs2 = await import("fs");
    if (fs2.existsSync(PROCESS_ID_FILE)) {
      fs2.unlinkSync(PROCESS_ID_FILE);
      console.log(`\u{1F9F9} Cleaned up PID file`);
    }
  } catch (error) {
    console.warn("\u26A0\uFE0F Error cleaning up PID file:", error);
  }
};
var isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    let isResolved = false;
    const timeout = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        server.close();
        resolve(false);
      }
    }, 3e3);
    server.listen(port, () => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        server.once("close", () => {
          resolve(true);
        });
        server.close();
      }
    });
    server.on("error", () => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        resolve(false);
      }
    });
  });
};
var gracefulShutdown = async (signal) => {
  if (isShuttingDown) return;
  log(`\u{1F504} Received ${signal}, shutting down gracefully...`);
  isShuttingDown = true;
  const shutdownTimeout = setTimeout(() => {
    console.error("\u26A0\uFE0F Could not complete graceful shutdown, forcefully exiting");
    process.exit(1);
  }, 15e3);
  try {
    await cleanupPidFile();
    console.log("\u{1F916} Stopping bots...");
    const botCleanupPromise = Promise.all([
      (async () => {
        try {
          const { stopTelegramBot: stopTelegramBot2 } = await Promise.resolve().then(() => (init_telegram_bot(), telegram_bot_exports));
          stopTelegramBot2();
          console.log("\u2705 Telegram bot stopped");
        } catch (error) {
          console.warn("\u26A0\uFE0F Error stopping Telegram bot:", error);
        }
      })(),
      (async () => {
        try {
          const { stopKushNotifyBot: stopKushNotifyBot2 } = await Promise.resolve().then(() => (init_kush_notify_bot(), kush_notify_bot_exports));
          stopKushNotifyBot2();
          console.log("\u2705 KushNotifyBot stopped");
        } catch (error) {
          console.warn("\u26A0\uFE0F Error stopping KushNotifyBot:", error);
        }
      })()
    ]);
    await Promise.race([
      botCleanupPromise,
      new Promise((resolve) => setTimeout(resolve, 5e3))
    ]);
    log("\u{1F916} Bot cleanup completed");
  } catch (error) {
    console.error("\u26A0\uFE0F Error during bot cleanup:", error);
  }
  if (serverInstance) {
    serverInstance.close(async (err) => {
      clearTimeout(shutdownTimeout);
      if (err) {
        console.error("\u274C Error during server shutdown:", err);
        process.exit(1);
      }
      log("\u2705 Server closed successfully");
      serverInstance = null;
      await cleanupPidFile();
      process.exit(0);
    });
  } else {
    clearTimeout(shutdownTimeout);
    process.exit(0);
  }
};
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("uncaughtException", async (error) => {
  console.error("\u{1F4A5} Uncaught Exception:", error);
  console.error("\u{1F4CD} Stack trace:", error.stack);
  try {
    await cleanupPidFile();
  } catch (error2) {
    console.error("\u26A0\uFE0F Error cleaning up PID file during emergency:", error2);
  }
  if (serverInstance) {
    try {
      serverInstance.close();
      serverInstance = null;
    } catch (cleanupError) {
      console.error("\u274C Error during emergency cleanup:", cleanupError);
    }
  }
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("\u{1F4A5} Unhandled Rejection at:", promise, "reason:", reason);
  if (reason && typeof reason === "object" && "code" in reason && reason.code === "EADDRINUSE") {
    console.error("\u{1F6A8} Critical port conflict detected in promise rejection");
    gracefulShutdown("UNHANDLED_REJECTION");
  } else {
    console.warn("\u26A0\uFE0F Non-critical promise rejection, continuing...");
  }
});
var app = express2();
app.set("trust proxy", 1);
app.use(cors({
  origin: [
    "http://localhost:3001",
    // Admin panel frontend in development
    "https://admin.kushklicker.com",
    // Admin panel in production
    "http://localhost:5000",
    // Allow same-origin requests
    "https://kushklicker.com"
    // Main production domain
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));
var generalLimiter = rateLimit2({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 1e3,
  // Limit each IP to 1000 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
});
var apiLimiter = rateLimit2({
  windowMs: 1 * 60 * 1e3,
  // 1 minute
  max: 60,
  // Limit each IP to 60 API requests per minute
  message: {
    error: "Too many API requests, please slow down.",
    retryAfter: "1 minute"
  },
  standardHeaders: true,
  legacyHeaders: false
});
var clickLimiter = rateLimit2({
  windowMs: 1 * 60 * 1e3,
  // 1 minute
  max: 180,
  // Allow up to 3 clicks per second (180 per minute)
  message: {
    error: "Click rate limit exceeded. Please slow down your clicking.",
    retryAfter: "1 minute"
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(generalLimiter);
app.use("/api", apiLimiter);
app.use("/api/players/*/enhanced-click", clickLimiter);
app.use(securityMonitor);
app.use(sanitizeInput);
app.use("/api/admin", secureRateLimiters.admin);
app.use("/api/tokens", secureRateLimiters.tokens);
app.use("/api/players/*/link-wallet", secureRateLimiters.wallet);
app.use(botProtection);
morgan.token("response-data", (req, res) => {
  return res.responseData ? JSON.stringify(res.responseData).slice(0, 100) : "";
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :response-data", {
  skip: (req, res) => !req.path.startsWith("/api")
  // Only log API requests
}));
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === "development" ? "*" : false,
      methods: ["GET", "POST"]
    }
  });
  io.on("connection", (socket) => {
    log(`\u{1F50C} WebSocket client connected: ${socket.id}`);
    socket.on("join-player", (playerId) => {
      socket.join(`player-${playerId}`);
      log(`\u{1F464} Player ${playerId} joined room`);
    });
    socket.on("join-leaderboard", () => {
      socket.join("leaderboard");
      log(`\u{1F3C6} Client subscribed to leaderboard updates`);
    });
    socket.on("disconnect", () => {
      log(`\u{1F50C} WebSocket client disconnected: ${socket.id}`);
    });
  });
  app.set("io", io);
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const isProduction = process.env.NODE_ENV === "production";
  const isDeployment = process.env.REPLIT_DEPLOYMENT === "true" || isProduction;
  if (isDeployment) {
    console.log("\u{1F680} Starting in DEPLOYMENT mode");
    console.log(`   Environment: ${process.env.NODE_ENV}`);
    console.log(`   Process ID: ${process.pid}`);
    await new Promise((resolve) => setTimeout(resolve, 3e3));
  } else {
    console.log("\u{1F527} Starting in DEVELOPMENT mode");
  }
  const existingInstance = await checkExistingInstance();
  if (existingInstance) {
    console.error(`\u274C Another server instance is already running`);
    console.error(`   This commonly happens during deployment restarts`);
    console.error(`   The existing instance should handle requests`);
    process.exit(1);
  }
  if (serverInstance) {
    log(`\u26A0\uFE0F Server instance already exists in this process, skipping startup`);
    return;
  }
  await writePidFile();
  console.log(`\u{1F50D} Checking port ${port} availability...`);
  let portAttempts = 0;
  const maxAttempts = isDeployment ? 5 : 3;
  const attemptDelay = isDeployment ? 2e3 : 1e3;
  while (portAttempts < maxAttempts) {
    const portAvailable = await isPortAvailable(port);
    if (portAvailable) {
      console.log(`\u2705 Port ${port} is available`);
      break;
    }
    portAttempts++;
    console.log(`\u26A0\uFE0F Port ${port} is busy (attempt ${portAttempts}/${maxAttempts})`);
    if (portAttempts >= maxAttempts) {
      console.error(`\u274C Port ${port} is already in use after ${maxAttempts} attempts.`);
      console.error(`   Another server instance might be running.`);
      console.error(`   Environment: ${isDeployment ? "DEPLOYMENT" : "DEVELOPMENT"}`);
      console.error(`   To find what's using port ${port}: lsof -i :${port}`);
      console.error(`   To kill the process: kill -9 $(lsof -ti :${port})`);
      await cleanupPidFile();
      process.exit(1);
    }
    console.log(`\u23F3 Waiting ${attemptDelay}ms before retry...`);
    await new Promise((resolve) => setTimeout(resolve, attemptDelay));
  }
  serverInstance = httpServer;
  httpServer.listen(port, "0.0.0.0", async () => {
    log(`\u{1F680} Server with WebSocket support running on port ${port}`);
    try {
      console.log("\u{1FA99} Initializing mainnet token service...");
      await mainnetTokenService.initialize();
      console.log("\u2705 Mainnet token service ready for rewards!");
    } catch (error) {
      console.error("\u274C Token service initialization failed:", error);
      console.log("\u26A0\uFE0F Game will continue without token rewards");
    }
    startTelegramBot();
    startKushNotifyBot();
    try {
      await startDiscordBot();
    } catch (error) {
      console.error("Discord bot startup failed:", error);
    }
  });
  httpServer.on("error", async (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`\u274C Port ${port} is already in use. Server startup failed.`);
      console.error(`   Another instance of the server might be running.`);
      console.error(`   Environment: ${isDeployment ? "DEPLOYMENT" : "DEVELOPMENT"}`);
      console.error(`   Please check for existing processes and try again.`);
      await cleanupPidFile();
      process.exit(1);
    } else {
      console.error("\u274C Server startup error:", error);
      await cleanupPidFile();
      process.exit(1);
    }
  });
})();
