import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  telegramUserId: text("telegram_user_id"), // Telegram user ID for identification
  discordUserId: text("discord_user_id"), // Discord user ID for identification
  email: text("email"), // Optional email for notifications
  username: text("username").notNull().unique(), // Telegram username with @ or Discord username
  totalKush: integer("total_kush").notNull().default(0),
  totalClicks: integer("total_clicks").notNull().default(0),
  perClickMultiplier: integer("per_click_multiplier").notNull().default(1),
  autoIncomePerHour: integer("auto_income_per_hour").notNull().default(0),
  passiveIncomePerHour: integer("passive_income_per_hour").notNull().default(0),
  claimableTokens: integer("claimable_tokens").notNull().default(0),
  walletAddress: text("wallet_address"),
  walletLinked: boolean("wallet_linked").notNull().default(false), // Track if wallet was already linked (one-time only)
  solanaNetwork: text("solana_network").notNull().default("devnet"), // "mainnet" or "devnet"
  walletSyncEnabled: boolean("wallet_sync_enabled").notNull().default(true),
  lastWalletSync: timestamp("last_wallet_sync"),
  referralHandle: text("referral_handle"), // Custom referral handle (one-time change)
  referredBy: text("referred_by"), // Will store Telegram @username or referral handle
  hasChangedReferralHandle: boolean("has_changed_referral_handle").notNull().default(false),
  tutorialCompleted: boolean("tutorial_completed").notNull().default(false),
  level: integer("level").notNull().default(1),
  prestige: integer("prestige").notNull().default(0),
  totalEarnedKush: integer("total_earned_kush").notNull().default(0), // Track total KUSH earned for leveling
  lastPassiveUpdate: timestamp("last_passive_update"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  lastActive: timestamp("last_active").notNull().default(sql`now()`),
}, (table) => ({
  // Performance indexes for 1000+ players
  usernameIdx: index("players_username_idx").on(table.username),
  telegramUserIdIdx: index("players_telegram_user_id_idx").on(table.telegramUserId),
  discordUserIdIdx: index("players_discord_user_id_idx").on(table.discordUserId),
  walletAddressIdx: index("players_wallet_address_idx").on(table.walletAddress),
  totalKushIdx: index("players_total_kush_idx").on(table.totalKush),
  lastActiveIdx: index("players_last_active_idx").on(table.lastActive),
  levelPrestigeIdx: index("players_level_prestige_idx").on(table.level, table.prestige),
}));

export const upgrades = pgTable("upgrades", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  baseCost: integer("base_cost").notNull(),
  costMultiplier: integer("cost_multiplier").notNull().default(150), // 1.5x in percentage
  clickPowerIncrease: integer("click_power_increase").notNull().default(0),
  autoIncomeIncrease: integer("auto_income_increase").notNull().default(0),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // 'click', 'auto', 'special'
  unlockRequirement: integer("unlock_requirement").notNull().default(0),
});

export const playerUpgrades = pgTable("player_upgrades", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  upgradeId: text("upgrade_id").notNull(),
  quantity: integer("quantity").notNull().default(0),
  purchasedAt: timestamp("purchased_at").notNull().default(sql`now()`),
}, (table) => ({
  // Performance indexes 
  playerIdIdx: index("player_upgrades_player_id_idx").on(table.playerId),
  upgradeIdIdx: index("player_upgrades_upgrade_id_idx").on(table.upgradeId),
  playerUpgradeIdx: index("player_upgrades_player_upgrade_idx").on(table.playerId, table.upgradeId),
}));

export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  requirement: integer("requirement").notNull(),
  requirementType: text("requirement_type").notNull(), // 'total_kush', 'total_clicks', 'upgrades_bought', etc.
  reward: integer("reward").notNull(),
  icon: text("icon").notNull(),
});

export const playerAchievements = pgTable("player_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  achievementId: text("achievement_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  progress: integer("progress").notNull().default(0),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  // Performance indexes for achievements
  playerIdIdx: index("player_achievements_player_id_idx").on(table.playerId),
  achievementIdIdx: index("player_achievements_achievement_id_idx").on(table.achievementId),
  completedIdx: index("player_achievements_completed_idx").on(table.completed),
  playerCompletedIdx: index("player_achievements_player_completed_idx").on(table.playerId, table.completed),
}));

export const tokenPayouts = pgTable("token_payouts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  walletAddress: text("wallet_address").notNull(),
  amount: integer("amount").notNull(), // Token amount in smallest units
  reason: text("reason").notNull(), // Achievement, milestone, etc.
  network: text("network").notNull(), // devnet or mainnet
  transactionSignature: text("transaction_signature"), // Solana tx hash
  status: text("status").notNull().default("pending"), // pending, completed, failed
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  processedAt: timestamp("processed_at"),
}, (table) => ({
  // Performance indexes for token operations
  playerIdIdx: index("token_payouts_player_id_idx").on(table.playerId),
  statusIdx: index("token_payouts_status_idx").on(table.status),
  networkIdx: index("token_payouts_network_idx").on(table.network),
  createdAtIdx: index("token_payouts_created_at_idx").on(table.createdAt),
  walletAddressIdx: index("token_payouts_wallet_address_idx").on(table.walletAddress),
  statusNetworkIdx: index("token_payouts_status_network_idx").on(table.status, table.network),
}));

// Wallet Authentication table for secure login
export const walletAuth = pgTable("wallet_auth", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  playerId: text("player_id"), // Link to player who owns this wallet
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  lastLogin: timestamp("last_login"),
}, (table) => ({
  // Performance indexes for wallet authentication
  walletAddressIdx: index("wallet_auth_wallet_address_idx").on(table.walletAddress),
  playerIdIdx: index("wallet_auth_player_id_idx").on(table.playerId),
  activeIdx: index("wallet_auth_active_idx").on(table.isActive),
}));

export const growLights = pgTable("grow_lights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // LED, HPS, CMH, Quantum_Board, etc.
  rarity: text("rarity").notNull(), // common, uncommon, rare, epic, legendary
  passiveClicksPerHour: integer("passive_clicks_per_hour").notNull().default(0),
  clickMultiplier: integer("click_multiplier").notNull().default(100), // 100 = 1.0x
  energyEfficiency: integer("energy_efficiency").notNull().default(100), // Lower is better
  description: text("description").notNull(),
  burnCost: integer("burn_cost").notNull(), // Tokens required to get this light
  icon: text("icon").notNull(),
  unlockRequirement: integer("unlock_requirement").notNull().default(0),
});

export const playerGrowLights = pgTable("player_grow_lights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  growLightId: text("grow_light_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  isActive: boolean("is_active").notNull().default(false),
  acquiredAt: timestamp("acquired_at").notNull().default(sql`now()`),
});

export const tokenBurns = pgTable("token_burns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  walletAddress: text("wallet_address").notNull(),
  tokensBurned: integer("tokens_burned").notNull(),
  growLightReceived: text("grow_light_id"),
  network: text("network").notNull(),
  burnTransactionSignature: text("burn_transaction_signature"),
  devTaxAmount: integer("dev_tax_amount").notNull().default(0), // No dev tax
  devTaxRecipient: text("dev_tax_recipient").notNull().default(''),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  processedAt: timestamp("processed_at"),
});

// ===== COMPREHENSIVE GAME FEATURE EXTENSIONS =====

// 1. PRESTIGE SYSTEM - Reset with permanent multipliers
export const prestigeLevels = pgTable("prestige_levels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  level: integer("level").notNull().default(0),
  totalKushAtPrestige: integer("total_kush_at_prestige").notNull(),
  permanentMultiplier: integer("permanent_multiplier").notNull().default(100), // 100 = 1.0x
  prestigeDate: timestamp("prestige_date").notNull().default(sql`now()`),
});

// 2. DAILY CHALLENGES SYSTEM 
export const dailyChallenges = pgTable("daily_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  challengeType: text("challenge_type").notNull(), // 'clicks', 'tokens', 'upgrades', 'burns'
  targetValue: integer("target_value").notNull(),
  kushReward: integer("kush_reward").notNull().default(0),
  seedsReward: integer("seeds_reward").notNull().default(0),
  dateActive: text("date_active").notNull(), // YYYY-MM-DD format
  icon: text("icon").notNull(),
  difficulty: text("difficulty").notNull().default("medium"), // easy, medium, hard
});

export const playerDailyChallenges = pgTable("player_daily_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  challengeId: text("challenge_id").notNull(),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  dateActive: text("date_active").notNull(), // YYYY-MM-DD format
});

// 3. FRIEND SYSTEM
export const friendships = pgTable("friendships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  friendId: text("friend_id").notNull(),
  status: text("status").notNull().default("pending"), // pending, accepted, blocked
  requestedAt: timestamp("requested_at").notNull().default(sql`now()`),
  acceptedAt: timestamp("accepted_at"),
}, (table) => ({
  // Critical indexes for friend system performance
  playerIdIdx: index("friendships_player_id_idx").on(table.playerId),
  friendIdIdx: index("friendships_friend_id_idx").on(table.friendId),
  statusIdx: index("friendships_status_idx").on(table.status),
  playerStatusIdx: index("friendships_player_status_idx").on(table.playerId, table.status),
  friendStatusIdx: index("friendships_friend_status_idx").on(table.friendId, table.status),
  requestedAtIdx: index("friendships_requested_at_idx").on(table.requestedAt),
}));

export const friendGifts = pgTable("friend_gifts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromPlayerId: text("from_player_id").notNull(),
  toPlayerId: text("to_player_id").notNull(),
  giftType: text("gift_type").notNull(), // 'kush', 'seeds', 'boost'
  amount: integer("amount").notNull(),
  message: text("message"),
  sentAt: timestamp("sent_at").notNull().default(sql`now()`),
  claimedAt: timestamp("claimed_at"),
});

// 4. GUILD SYSTEM
export const guilds = pgTable("guilds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  leaderPlayerId: text("leader_player_id").notNull(),
  memberCount: integer("member_count").notNull().default(1),
  maxMembers: integer("max_members").notNull().default(50),
  totalKushEarned: integer("total_kush_earned").notNull().default(0),
  guildLevel: integer("guild_level").notNull().default(1),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const guildMembers = pgTable("guild_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull(),
  playerId: text("player_id").notNull(),
  role: text("role").notNull().default("member"), // member, officer, leader
  joinedAt: timestamp("joined_at").notNull().default(sql`now()`),
  contributedKush: integer("contributed_kush").notNull().default(0),
});

export const guildChallenges = pgTable("guild_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetValue: integer("target_value").notNull(),
  kushReward: integer("kush_reward").notNull(),
  seedsReward: integer("seeds_reward").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  challengeType: text("challenge_type").notNull(), // 'collective_clicks', 'collective_kush'
});

// 5. ADVANCED TOKENOMICS - STAKING SYSTEM
export const stakingPools = pgTable("staking_pools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poolName: text("pool_name").notNull(),
  duration: integer("duration").notNull(), // in days (30, 60, 90)
  apy: integer("apy").notNull(), // Annual Percentage Yield in basis points
  minStake: integer("min_stake").notNull(),
  maxStake: integer("max_stake").notNull(),
  totalStaked: integer("total_staked").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const playerStakes = pgTable("player_stakes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  poolId: text("pool_id").notNull(),
  stakedAmount: integer("staked_amount").notNull(),
  startDate: timestamp("start_date").notNull().default(sql`now()`),
  endDate: timestamp("end_date").notNull(),
  rewardsClaimed: integer("rewards_claimed").notNull().default(0),
  status: text("status").notNull().default("active"), // active, completed, withdrawn
});

// 6. SEEDS SECONDARY TOKEN SYSTEM
export const seedsTransactions = pgTable("seeds_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  amount: integer("amount").notNull(),
  transactionType: text("transaction_type").notNull(), // 'earned', 'spent', 'gifted'
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// 7. SEASONAL EVENTS SYSTEM
export const seasonalEvents = pgTable("seasonal_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  theme: text("theme").notNull(), // halloween, christmas, 420day
  description: text("description").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  specialMultiplier: integer("special_multiplier").notNull().default(100), // 100 = 1.0x
});

export const eventRewards = pgTable("event_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: text("event_id").notNull(),
  playerId: text("player_id").notNull(),
  rewardType: text("reward_type").notNull(), // 'grow_light', 'kush', 'seeds', 'nft'
  rewardId: text("reward_id"), // ID of the specific reward
  claimedAt: timestamp("claimed_at").notNull().default(sql`now()`),
});

// 8. NFT GROW LIGHTS SYSTEM
export const nftGrowLights = pgTable("nft_grow_lights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tokenId: text("token_id").notNull().unique(),
  name: text("name").notNull(),
  rarity: text("rarity").notNull(), // legendary_nft, mythic_nft
  passiveClicksPerHour: integer("passive_clicks_per_hour").notNull(),
  clickMultiplier: integer("click_multiplier").notNull().default(200), // 200 = 2.0x
  specialAbility: text("special_ability"),
  imageUrl: text("image_url"),
  mintedAt: timestamp("minted_at").notNull().default(sql`now()`),
});

export const playerNftGrowLights = pgTable("player_nft_grow_lights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  nftGrowLightId: text("nft_grow_light_id").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  acquiredAt: timestamp("acquired_at").notNull().default(sql`now()`),
});

// 9. CLICK MECHANICS TRACKING
export const clickSessions = pgTable("click_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  sessionStart: timestamp("session_start").notNull().default(sql`now()`),
  totalClicks: integer("total_clicks").notNull().default(0),
  criticalHits: integer("critical_hits").notNull().default(0),
  maxCombo: integer("max_combo").notNull().default(0),
  specialPatternsHit: integer("special_patterns_hit").notNull().default(0),
  sessionEnd: timestamp("session_end"),
});

export const clickBoosts = pgTable("click_boosts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  boostType: text("boost_type").notNull(), // 'critical_chance', 'auto_click_speed', 'combo_multiplier'
  multiplier: integer("multiplier").notNull(), // 200 = 2.0x
  duration: integer("duration").notNull(), // in seconds
  startedAt: timestamp("started_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at").notNull(),
});

// 10. COMMUNITY GOALS
export const communityGoals = pgTable("community_goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  targetValue: integer("target_value").notNull(),
  currentProgress: integer("current_progress").notNull().default(0),
  goalType: text("goal_type").notNull(), // 'total_clicks', 'total_kush', 'tokens_burned'
  kushReward: integer("kush_reward").notNull(),
  seedsReward: integer("seeds_reward").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

// 11. SOCIAL SHARING & REFERRAL TRACKING
export const socialShares = pgTable("social_shares", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  platform: text("platform").notNull(), // 'twitter', 'discord', 'telegram'
  shareType: text("share_type").notNull(), // 'achievement', 'milestone', 'referral'
  content: text("content").notNull(),
  rewardClaimed: boolean("reward_claimed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// 12. TOKEN GOVERNANCE SYSTEM
export const governanceProposals = pgTable("governance_proposals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  proposerPlayerId: text("proposer_player_id").notNull(),
  votesFor: integer("votes_for").notNull().default(0),
  votesAgainst: integer("votes_against").notNull().default(0),
  totalVotingPower: integer("total_voting_power").notNull().default(0),
  status: text("status").notNull().default("active"), // active, passed, failed, executed
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  votingEnds: timestamp("voting_ends").notNull(),
});

export const governanceVotes = pgTable("governance_votes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  proposalId: text("proposal_id").notNull(),
  playerId: text("player_id").notNull(),
  vote: text("vote").notNull(), // 'for', 'against'
  votingPower: integer("voting_power").notNull(),
  votedAt: timestamp("voted_at").notNull().default(sql`now()`),
});

// Add SEEDS balance to players table extension
export const playerWallets = pgTable("player_wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull().unique(),
  kushBalance: integer("kush_balance").notNull().default(0),
  seedsBalance: integer("seeds_balance").notNull().default(0),
  stakedKush: integer("staked_kush").notNull().default(0),
  totalEarnedKush: integer("total_earned_kush").notNull().default(0),
  totalEarnedSeeds: integer("total_earned_seeds").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull().default(sql`now()`),
});

// ===== ADVANCED GAMING ECOSYSTEM FEATURES =====

// 1. GROW GARDEN SYSTEM - Plant cultivation with strain genetics
export const strainGenetics = pgTable("strain_genetics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'sativa', 'indica', 'hybrid'
  rarity: text("rarity").notNull(), // 'common', 'uncommon', 'rare', 'epic', 'legendary'
  thcLevel: integer("thc_level").notNull(), // 15-30%
  cbdLevel: integer("cbd_level").notNull(), // 0-25%
  floweringTime: integer("flowering_time").notNull(), // days (7-30)
  yieldMultiplier: integer("yield_multiplier").notNull().default(100), // 100 = 1.0x
  clickBonus: integer("click_bonus").notNull().default(0),
  description: text("description").notNull(),
  parentStrain1: text("parent_strain_1"), // For cross-breeding
  parentStrain2: text("parent_strain_2"),
  discoveredBy: text("discovered_by"), // Player who first bred this strain
  icon: text("icon").notNull(),
});

export const gardenPlots = pgTable("garden_plots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  plotNumber: integer("plot_number").notNull(), // 1-12
  strainId: text("strain_id"), // Current strain planted
  plantedAt: timestamp("planted_at"),
  lastWatered: timestamp("last_watered"),
  lastFertilized: timestamp("last_fertilized"),
  growthStage: text("growth_stage").default("empty"), // empty, seedling, vegetative, flowering, ready
  harvestTime: timestamp("harvest_time"),
  expectedYield: integer("expected_yield").notNull().default(0),
  isUnlocked: boolean("is_unlocked").notNull().default(false),
  unlockCost: integer("unlock_cost").notNull().default(1000000), // KUSH cost
});

export const gardenSupplies = pgTable("garden_supplies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  supplyType: text("supply_type").notNull(), // 'water', 'fertilizer', 'nutrients'
  quantity: integer("quantity").notNull().default(0),
  lastPurchased: timestamp("last_purchased"),
});

export const harvestHistory = pgTable("harvest_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  plotId: text("plot_id").notNull(),
  strainId: text("strain_id").notNull(),
  kushEarned: integer("kush_earned").notNull(),
  seedsEarned: integer("seeds_earned").notNull(),
  specialItems: text("special_items"), // JSON array of bonus items
  harvestDate: timestamp("harvest_date").notNull().default(sql`now()`),
});

// 2. PVP BATTLE ARENA SYSTEM
export const battleArena = pgTable("battle_arena", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  player1Id: text("player1_id").notNull(),
  player2Id: text("player2_id").notNull(),
  battleType: text("battle_type").notNull(), // 'casual', 'ranked', 'tournament'
  wagerAmount: integer("wager_amount").notNull().default(0),
  wagerToken: text("wager_token").notNull().default("KUSH"), // KUSH or SEEDS
  player1Score: integer("player1_score").notNull().default(0),
  player2Score: integer("player2_score").notNull().default(0),
  winnerId: text("winner_id"),
  battleDuration: integer("battle_duration").notNull().default(60), // seconds
  status: text("status").notNull().default("waiting"), // waiting, active, completed
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const tournaments = pgTable("tournaments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  entryFee: integer("entry_fee").notNull(),
  prizePool: integer("prize_pool").notNull(),
  maxParticipants: integer("max_participants").notNull().default(32),
  currentParticipants: integer("current_participants").notNull().default(0),
  status: text("status").notNull().default("registration"), // registration, active, completed
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  winnerId: text("winner_id"),
  createdBy: text("created_by").notNull(),
});

export const tournamentParticipants = pgTable("tournament_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tournamentId: text("tournament_id").notNull(),
  playerId: text("player_id").notNull(),
  registeredAt: timestamp("registered_at").notNull().default(sql`now()`),
  eliminated: boolean("eliminated").notNull().default(false),
  finalRank: integer("final_rank"),
});

export const playerBattleStats = pgTable("player_battle_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull().unique(),
  totalBattles: integer("total_battles").notNull().default(0),
  totalWins: integer("total_wins").notNull().default(0),
  totalLosses: integer("total_losses").notNull().default(0),
  winStreak: integer("win_streak").notNull().default(0),
  bestWinStreak: integer("best_win_streak").notNull().default(0),
  eloRating: integer("elo_rating").notNull().default(1200),
  totalWagered: integer("total_wagered").notNull().default(0),
  totalWon: integer("total_won").notNull().default(0),
});

// 3. IN-GAME MARKETPLACE SYSTEM
export const marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: text("seller_id").notNull(),
  itemType: text("item_type").notNull(), // 'strain', 'equipment', 'nft', 'supplies'
  itemId: text("item_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  pricePerUnit: integer("price_per_unit").notNull(),
  currency: text("currency").notNull().default("KUSH"), // KUSH or SEEDS
  description: text("description"),
  status: text("status").notNull().default("active"), // active, sold, cancelled
  listedAt: timestamp("listed_at").notNull().default(sql`now()`),
  soldAt: timestamp("sold_at"),
  buyerId: text("buyer_id"),
});

export const auctionHouse = pgTable("auction_house", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: text("seller_id").notNull(),
  itemType: text("item_type").notNull(),
  itemId: text("item_id").notNull(),
  startingBid: integer("starting_bid").notNull(),
  currentBid: integer("current_bid").notNull().default(0),
  currentBidderId: text("current_bidder_id"),
  reservePrice: integer("reserve_price"),
  auctionEnd: timestamp("auction_end").notNull(),
  status: text("status").notNull().default("active"), // active, ended, cancelled
  winnerId: text("winner_id"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const auctionBids = pgTable("auction_bids", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auctionId: text("auction_id").notNull(),
  bidderId: text("bidder_id").notNull(),
  bidAmount: integer("bid_amount").notNull(),
  bidTime: timestamp("bid_time").notNull().default(sql`now()`),
  isWinning: boolean("is_winning").notNull().default(false),
});

export const tradeOffers = pgTable("trade_offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  offererId: text("offerer_id").notNull(),
  recipientId: text("recipient_id").notNull(),
  offeredItems: text("offered_items").notNull(), // JSON array
  requestedItems: text("requested_items").notNull(), // JSON array
  status: text("status").notNull().default("pending"), // pending, accepted, declined, cancelled
  message: text("message"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  respondedAt: timestamp("responded_at"),
});

// 4. ADVANCED YIELD FARMING & DeFi
export const liquidityPools = pgTable("liquidity_pools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poolName: text("pool_name").notNull(),
  token1: text("token1").notNull(), // KUSH
  token2: text("token2").notNull(), // SEEDS, SOL, USDC
  totalLiquidity: integer("total_liquidity").notNull().default(0),
  apr: integer("apr").notNull(), // Annual Percentage Rate
  lockPeriod: integer("lock_period").notNull().default(0), // days
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const liquidityPositions = pgTable("liquidity_positions", {
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
  status: text("status").notNull().default("active"), // active, withdrawn
});

export const yieldFarmingPools = pgTable("yield_farming_pools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poolName: text("pool_name").notNull(),
  stakingToken: text("staking_token").notNull(), // LP-KUSH-SEEDS, KUSH, SEEDS
  rewardToken: text("reward_token").notNull(),
  totalStaked: integer("total_staked").notNull().default(0),
  rewardRate: integer("reward_rate").notNull(), // tokens per day
  multiplier: integer("multiplier").notNull().default(100), // 100 = 1.0x
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isAutoCompound: boolean("is_auto_compound").notNull().default(false),
});

// 5. VIP SUBSCRIPTION SYSTEM
export const vipSubscriptions = pgTable("vip_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull().unique(),
  tier: text("tier").notNull(), // 'silver', 'gold', 'platinum', 'diamond'
  monthlyPrice: integer("monthly_price").notNull(), // in KUSH tokens
  kushMultiplier: integer("kush_multiplier").notNull().default(150), // 150 = 1.5x
  seedsBonus: integer("seeds_bonus").notNull().default(50), // extra seeds per day
  exclusiveStrains: text("exclusive_strains"), // JSON array of strain IDs
  prioritySupport: boolean("priority_support").notNull().default(false),
  status: text("status").notNull().default("active"), // active, cancelled, expired
  subscribedAt: timestamp("subscribed_at").notNull().default(sql`now()`),
  nextBillingDate: timestamp("next_billing_date").notNull(),
  lastPayment: timestamp("last_payment"),
});

export const vipBenefits = pgTable("vip_benefits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  benefitType: text("benefit_type").notNull(), // 'seeds_daily', 'kush_multiplier', 'exclusive_access'
  value: integer("value").notNull(),
  grantedAt: timestamp("granted_at").notNull().default(sql`now()`),
  expiresAt: timestamp("expires_at"),
});

export const tutorialRewards = pgTable("tutorial_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  stepId: integer("step_id").notNull(), // Tutorial step number
  reward: integer("reward").notNull(), // KUSH reward amount
  claimedAt: timestamp("claimed_at").notNull().default(sql`now()`),
});

export type TutorialReward = typeof tutorialRewards.$inferSelect;
export type InsertTutorialReward = typeof tutorialRewards.$inferInsert;

// 6. DYNAMIC & EVOLVING NFT SYSTEM
export const dynamicNfts = pgTable("dynamic_nfts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tokenId: text("token_id").notNull().unique(),
  ownerId: text("owner_id").notNull(),
  nftType: text("nft_type").notNull(), // 'growing_plant', 'equipment', 'strain', 'achievement'
  name: text("name").notNull(),
  rarity: text("rarity").notNull(),
  level: integer("level").notNull().default(1),
  experience: integer("experience").notNull().default(0),
  maxLevel: integer("max_level").notNull().default(10),
  baseStats: text("base_stats").notNull(), // JSON object
  currentStats: text("current_stats").notNull(), // JSON object
  evolutionStage: integer("evolution_stage").notNull().default(1),
  lastInteraction: timestamp("last_interaction").notNull().default(sql`now()`),
  imageUrl: text("image_url").notNull(),
  metadataUrl: text("metadata_url"),
  isStaked: boolean("is_staked").notNull().default(false),
});

export const nftEvolutionHistory = pgTable("nft_evolution_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nftId: text("nft_id").notNull(),
  fromStage: integer("from_stage").notNull(),
  toStage: integer("to_stage").notNull(),
  evolutionDate: timestamp("evolution_date").notNull().default(sql`now()`),
  triggeredBy: text("triggered_by").notNull(), // click_milestone, time_based, manual_upgrade
  newAbilities: text("new_abilities"), // JSON array
});

export const nftMarketplace = pgTable("nft_marketplace", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nftId: text("nft_id").notNull(),
  sellerId: text("seller_id").notNull(),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("KUSH"),
  status: text("status").notNull().default("listed"), // listed, sold, cancelled
  listedAt: timestamp("listed_at").notNull().default(sql`now()`),
  soldAt: timestamp("sold_at"),
  buyerId: text("buyer_id"),
});

// 6. ADVANCED GUILD WARFARE & TERRITORIES  
export const guildWars = pgTable("guild_wars", {
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
  status: text("status").notNull().default("active"), // active, completed
});

export const guildTerritories = pgTable("guild_territories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  controllingGuildId: text("controlling_guild_id"),
  bonusType: text("bonus_type").notNull(), // 'kush_multiplier', 'seeds_bonus', 'experience_boost'
  bonusValue: integer("bonus_value").notNull(),
  defenseStrength: integer("defense_strength").notNull().default(100),
  lastConquered: timestamp("last_conquered"),
  coordinates: text("coordinates"), // JSON for map position
});

export const guildBank = pgTable("guild_bank", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull().unique(),
  kushBalance: integer("kush_balance").notNull().default(0),
  seedsBalance: integer("seeds_balance").notNull().default(0),
  totalDeposited: integer("total_deposited").notNull().default(0),
  totalWithdrawn: integer("total_withdrawn").notNull().default(0),
  lastActivity: timestamp("last_activity").notNull().default(sql`now()`),
});

export const guildBankTransactions = pgTable("guild_bank_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull(),
  playerId: text("player_id").notNull(),
  transactionType: text("transaction_type").notNull(), // 'deposit', 'withdraw'
  tokenType: text("token_type").notNull(), // KUSH or SEEDS
  amount: integer("amount").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const guildQuests = pgTable("guild_quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  questType: text("quest_type").notNull(), // 'collective_clicks', 'harvest_strains', 'win_battles'
  targetValue: integer("target_value").notNull(),
  currentProgress: integer("current_progress").notNull().default(0),
  kushReward: integer("kush_reward").notNull(),
  seedsReward: integer("seeds_reward").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: text("status").notNull().default("active"), // active, completed, failed
});

// 7. LIVE EVENTS & COMMUNITY ACTIVITIES
export const liveEvents = pgTable("live_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventName: text("event_name").notNull(),
  eventType: text("event_type").notNull(), // 'happy_hour', 'flash_challenge', 'community_raid'
  description: text("description").notNull(),
  multiplier: integer("multiplier").notNull().default(200), // 200 = 2.0x
  duration: integer("duration").notNull(), // minutes
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  participantCount: integer("participant_count").notNull().default(0),
  totalRewards: integer("total_rewards").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  requirements: text("requirements"), // JSON object
});

export const eventParticipants = pgTable("event_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: text("event_id").notNull(),
  playerId: text("player_id").notNull(),
  joinedAt: timestamp("joined_at").notNull().default(sql`now()`),
  contribution: integer("contribution").notNull().default(0),
  rewardsClaimed: boolean("rewards_claimed").notNull().default(false),
  finalRank: integer("final_rank"),
});

export const communityRaids = pgTable("community_raids", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  raidName: text("raid_name").notNull(),
  bossName: text("boss_name").notNull(),
  bossHealth: integer("boss_health").notNull(),
  currentHealth: integer("current_health").notNull(),
  minParticipants: integer("min_participants").notNull().default(100),
  currentParticipants: integer("current_participants").notNull().default(0),
  raidRewards: text("raid_rewards").notNull(), // JSON object
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: text("status").notNull().default("preparing"), // preparing, active, victory, defeat
});

// 8. ADVANCED ANALYTICS & PLAYER INSIGHTS
export const playerAnalytics = pgTable("player_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull().unique(),
  totalPlayTime: integer("total_play_time").notNull().default(0), // minutes
  averageSessionLength: integer("average_session_length").notNull().default(0),
  clicksPerMinute: integer("clicks_per_minute").notNull().default(0),
  mostActiveHour: integer("most_active_hour").notNull().default(12),
  longestStreak: integer("longest_streak").notNull().default(0), // days
  totalUpgradesPurchased: integer("total_upgrades_purchased").notNull().default(0),
  favoritePlantStrain: text("favorite_plant_strain"),
  totalBattlesWon: integer("total_battles_won").notNull().default(0),
  lastAnalyticsUpdate: timestamp("last_analytics_update").notNull().default(sql`now()`),
});

export const personalGoals = pgTable("personal_goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  goalType: text("goal_type").notNull(), // 'daily_kush', 'weekly_battles', 'harvest_strains'
  targetValue: integer("target_value").notNull(),
  currentProgress: integer("current_progress").notNull().default(0),
  deadline: timestamp("deadline").notNull(),
  reward: integer("reward").notNull(),
  rewardType: text("reward_type").notNull().default("KUSH"),
  status: text("status").notNull().default("active"), // active, completed, failed
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// 9. LOYALTY & REWARDS SYSTEM
export const loyaltyTiers = pgTable("loyalty_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tierName: text("tier_name").notNull(),
  minPoints: integer("min_points").notNull(),
  dailyBonusMultiplier: integer("daily_bonus_multiplier").notNull().default(100),
  specialPerks: text("special_perks").notNull(), // JSON array
  tierColor: text("tier_color").notNull(),
  icon: text("icon").notNull(),
});

export const playerLoyalty = pgTable("player_loyalty", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull().unique(),
  loyaltyPoints: integer("loyalty_points").notNull().default(0),
  currentTier: text("current_tier").notNull().default("Bronze"),
  consecutiveLogins: integer("consecutive_logins").notNull().default(0),
  longestLoginStreak: integer("longest_login_streak").notNull().default(0),
  lastLogin: timestamp("last_login").notNull().default(sql`now()`),
  totalAirdropsReceived: integer("total_airdrops_received").notNull().default(0),
  vipExpiresAt: timestamp("vip_expires_at"),
});

export const airdropHistory = pgTable("airdrop_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  airdropType: text("airdrop_type").notNull(), // 'surprise', 'milestone', 'loyalty'
  tokenAmount: integer("token_amount").notNull(),
  tokenType: text("token_type").notNull().default("KUSH"),
  reason: text("reason").notNull(),
  claimedAt: timestamp("claimed_at").notNull().default(sql`now()`),
});

export const milestoneRewards = pgTable("milestone_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  milestone: integer("milestone").notNull(), // 1000, 10000, 100000 etc
  milestoneType: text("milestone_type").notNull(), // 'total_kush', 'total_clicks', 'days_played'
  rewardAmount: integer("reward_amount").notNull(),
  rewardType: text("reward_type").notNull().default("KUSH"),
  specialReward: text("special_reward"), // NFT, rare strain, etc
  description: text("description").notNull(),
});

// 10. MINI-GAMES & SKILL-BASED CONTENT
export const miniGames = pgTable("mini_games", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameName: text("game_name").notNull(),
  gameType: text("game_type").notNull(), // 'rolling_papers', 'strain_guess', 'memory_match', 'trivia'
  difficulty: text("difficulty").notNull().default("medium"),
  entryFee: integer("entry_fee").notNull().default(0),
  maxReward: integer("max_reward").notNull(),
  playTimeSeconds: integer("play_time_seconds").notNull().default(60),
  isActive: boolean("is_active").notNull().default(true),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
});

export const miniGameScores = pgTable("mini_game_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  gameId: text("game_id").notNull(),
  score: integer("score").notNull(),
  reward: integer("reward").notNull(),
  rewardType: text("reward_type").notNull().default("KUSH"),
  playedAt: timestamp("played_at").notNull().default(sql`now()`),
  gameData: text("game_data"), // JSON object with game-specific data
});

export const triviaQuestions = pgTable("trivia_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON array of 4 options
  correctAnswer: integer("correct_answer").notNull(), // 0-3
  category: text("category").notNull(), // 'strains', 'growing', 'history', 'culture'
  difficulty: text("difficulty").notNull().default("medium"),
  rewardPoints: integer("reward_points").notNull().default(100),
});

export const strainGuessingGame = pgTable("strain_guessing_game", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  strainId: text("strain_id").notNull(),
  hints: text("hints").notNull(), // JSON array of progressive hints
  maxGuesses: integer("max_guesses").notNull().default(3),
  baseReward: integer("base_reward").notNull(),
  bonusReward: integer("bonus_reward").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

// ===== INSERT SCHEMAS FOR ALL NEW FEATURES =====

export const insertPrestigeLevelSchema = createInsertSchema(prestigeLevels).omit({
  id: true,
  prestigeDate: true,
});

export const insertDailyChallengeSchema = createInsertSchema(dailyChallenges).omit({
  id: true,
});

export const insertPlayerDailyChallengeSchema = createInsertSchema(playerDailyChallenges).omit({
  id: true,
  completedAt: true,
});

export const insertFriendshipSchema = createInsertSchema(friendships).omit({
  id: true,
  requestedAt: true,
});

export const insertFriendGiftSchema = createInsertSchema(friendGifts).omit({
  id: true,
  sentAt: true,
});

export const insertGuildSchema = createInsertSchema(guilds).omit({
  id: true,
  createdAt: true,
});

export const insertGuildMemberSchema = createInsertSchema(guildMembers).omit({
  id: true,
  joinedAt: true,
});

export const insertStakingPoolSchema = createInsertSchema(stakingPools).omit({
  id: true,
});

export const insertPlayerStakeSchema = createInsertSchema(playerStakes).omit({
  id: true,
  startDate: true,
});

export const insertSeedsTransactionSchema = createInsertSchema(seedsTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertSeasonalEventSchema = createInsertSchema(seasonalEvents).omit({
  id: true,
});

export const insertNftGrowLightSchema = createInsertSchema(nftGrowLights).omit({
  id: true,
  mintedAt: true,
});

export const insertClickSessionSchema = createInsertSchema(clickSessions).omit({
  id: true,
  sessionStart: true,
});

export const insertClickBoostSchema = createInsertSchema(clickBoosts).omit({
  id: true,
  startedAt: true,
});

export const insertCommunityGoalSchema = createInsertSchema(communityGoals).omit({
  id: true,
});

export const insertGovernanceProposalSchema = createInsertSchema(governanceProposals).omit({
  id: true,
  createdAt: true,
});

export const insertPlayerWalletSchema = createInsertSchema(playerWallets).omit({
  id: true,
  lastUpdated: true,
});

// ===== INSERT SCHEMAS FOR ADVANCED GAMING ECOSYSTEM =====

export const insertStrainGeneticsSchema = createInsertSchema(strainGenetics).omit({
  id: true,
});

export const insertGardenPlotSchema = createInsertSchema(gardenPlots).omit({
  id: true,
});

export const insertGardenSuppliesSchema = createInsertSchema(gardenSupplies).omit({
  id: true,
});

export const insertHarvestHistorySchema = createInsertSchema(harvestHistory).omit({
  id: true,
  harvestDate: true,
});

export const insertBattleArenaSchema = createInsertSchema(battleArena).omit({
  id: true,
  createdAt: true,
});

export const insertTournamentSchema = createInsertSchema(tournaments).omit({
  id: true,
});

export const insertPlayerBattleStatsSchema = createInsertSchema(playerBattleStats).omit({
  id: true,
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
  id: true,
  listedAt: true,
});

export const insertAuctionHouseSchema = createInsertSchema(auctionHouse).omit({
  id: true,
  createdAt: true,
});

export const insertLiquidityPoolSchema = createInsertSchema(liquidityPools).omit({
  id: true,
  createdAt: true,
});

export const insertDynamicNftSchema = createInsertSchema(dynamicNfts).omit({
  id: true,
  lastInteraction: true,
});

export const insertGuildWarSchema = createInsertSchema(guildWars).omit({
  id: true,
});

export const insertGuildBankSchema = createInsertSchema(guildBank).omit({
  id: true,
  lastActivity: true,
});

export const insertLiveEventSchema = createInsertSchema(liveEvents).omit({
  id: true,
});

export const insertPlayerAnalyticsSchema = createInsertSchema(playerAnalytics).omit({
  id: true,
  lastAnalyticsUpdate: true,
});

export const insertLoyaltyTierSchema = createInsertSchema(loyaltyTiers).omit({
  id: true,
});

export const insertPlayerLoyaltySchema = createInsertSchema(playerLoyalty).omit({
  id: true,
  lastLogin: true,
});

export const insertMiniGameSchema = createInsertSchema(miniGames).omit({
  id: true,
});

export const insertTriviaQuestionSchema = createInsertSchema(triviaQuestions).omit({
  id: true,
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  createdAt: true,
  lastActive: true,
});

export const insertUpgradeSchema = createInsertSchema(upgrades).omit({
  id: true,
});

export const insertPlayerUpgradeSchema = createInsertSchema(playerUpgrades).omit({
  id: true,
  purchasedAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertPlayerAchievementSchema = createInsertSchema(playerAchievements).omit({
  id: true,
  completedAt: true,
});

export const insertTokenPayoutSchema = createInsertSchema(tokenPayouts).omit({
  id: true,
  createdAt: true,
});

export const insertGrowLightSchema = createInsertSchema(growLights).omit({
  id: true,
});

export const insertPlayerGrowLightSchema = createInsertSchema(playerGrowLights).omit({
  id: true,
  acquiredAt: true,
});

export const insertTokenBurnSchema = createInsertSchema(tokenBurns).omit({
  id: true,
  createdAt: true,
});

export const insertWalletAuthSchema = createInsertSchema(walletAuth).omit({
  id: true,
  createdAt: true,
  lastLogin: true,
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;
export type InsertUpgrade = z.infer<typeof insertUpgradeSchema>;
export type Upgrade = typeof upgrades.$inferSelect;
export type InsertPlayerUpgrade = z.infer<typeof insertPlayerUpgradeSchema>;
export type PlayerUpgrade = typeof playerUpgrades.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertPlayerAchievement = z.infer<typeof insertPlayerAchievementSchema>;
export type PlayerAchievement = typeof playerAchievements.$inferSelect;
export type InsertTokenPayout = z.infer<typeof insertTokenPayoutSchema>;
export type TokenPayout = typeof tokenPayouts.$inferSelect;
export type InsertGrowLight = z.infer<typeof insertGrowLightSchema>;
export type GrowLight = typeof growLights.$inferSelect;
export type InsertPlayerGrowLight = z.infer<typeof insertPlayerGrowLightSchema>;
export type PlayerGrowLight = typeof playerGrowLights.$inferSelect;
export type InsertTokenBurn = z.infer<typeof insertTokenBurnSchema>;
export type TokenBurn = typeof tokenBurns.$inferSelect;
export type InsertWalletAuth = z.infer<typeof insertWalletAuthSchema>;
export type WalletAuth = typeof walletAuth.$inferSelect;
