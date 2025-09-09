#!/usr/bin/env node

import https from 'https';
import http from 'http';

// Configuration for test data generation
const CONFIG = {
  BASE_URL: process.env.TEST_URL || 'http://localhost:5000',
  PLAYERS_COUNT: 200,
  MAX_CLICKS_PER_PLAYER: 10000,
  MAX_KUSH_PER_PLAYER: 50000,
  WALLET_PERCENTAGE: 60, // 60% of players will have wallets
};

// Test data generators
const PLAYER_NAMES = [
  'KushMaster', 'BudGrower', 'GreenThumb', 'TokeKing', 'HazeQueen', 'BluntForce',
  'SmokeSignal', 'ChronicGamer', 'BudTender', 'GanjaPro', 'WeedWizard', 'HerbHero',
  'StonedSage', 'NugNinja', 'BlazeBoss', 'DankDude', 'PotPrince', 'CannaClicker',
  'JointJockey', 'BongMaster', 'VapeVibes', 'EdibleEater', 'TrichomeHunter', 'KiefKing',
  'HashHustler', 'BudBaron', 'WeedWarrior', 'StashSlayer', 'NugHunter', 'GreenGuru'
];

const TELEGRAM_NAMES = [
  '@kushgod420', '@budmaster', '@greengoddess', '@smokestack', '@toketime',
  '@blazeit247', '@nuglife', '@herbivore420', '@stoned_gamer', '@weed_wizard',
  '@dank_memer', '@joint_venture', '@bong_lord', '@vape_nation', '@edible_expert'
];

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateUsername() {
  const baseName = getRandomElement(PLAYER_NAMES);
  const suffix = Math.floor(Math.random() * 9999);
  return `${baseName}${suffix}`;
}

function generateTelegramUsername() {
  const baseName = getRandomElement(TELEGRAM_NAMES);
  const suffix = Math.floor(Math.random() * 999);
  return `${baseName}${suffix}`;
}

function generateWalletAddress() {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generatePlayerStats() {
  const totalClicks = Math.floor(Math.random() * CONFIG.MAX_CLICKS_PER_PLAYER);
  const totalKush = Math.floor(Math.random() * CONFIG.MAX_KUSH_PER_PLAYER);
  const perClickMultiplier = 1 + Math.floor(totalClicks / 100); // Increase with clicks
  const autoIncomePerHour = Math.floor(totalKush / 50); // Passive income based on total KUSH
  
  return {
    totalClicks,
    totalKush,
    perClickMultiplier,
    autoIncomePerHour,
    claimableTokens: Math.floor(Math.random() * 1000)
  };
}

// HTTP request helper
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(CONFIG.BASE_URL);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } catch (e) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Create a realistic test player
async function createTestPlayer(index) {
  const stats = generatePlayerStats();
  const hasTelegram = Math.random() > 0.3; // 70% have Telegram
  const hasWallet = Math.random() < (CONFIG.WALLET_PERCENTAGE / 100);
  
  const playerData = {
    telegramUserId: hasTelegram ? `test_tg_${index}` : null,
    username: hasTelegram ? generateTelegramUsername() : generateUsername(),
    walletAddress: hasWallet ? generateWalletAddress() : null,
    walletLinked: hasWallet,
    ...stats,
    solanaNetwork: Math.random() > 0.8 ? 'mainnet' : 'devnet', // 20% mainnet
    walletSyncEnabled: hasWallet
  };
  
  const url = new URL(CONFIG.BASE_URL);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: '/api/players',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'TestDataGenerator/1.0'
    }
  };
  
  try {
    const player = await makeRequest(options, playerData);
    console.log(`✅ Created player: ${player.username} (${player.totalKush} KUSH, ${player.totalClicks} clicks)`);
    return player;
  } catch (error) {
    console.error(`❌ Failed to create player ${index}:`, error.message);
    return null;
  }
}

// Create player upgrades based on their progression
async function createPlayerUpgrades(player) {
  try {
    // Get available upgrades
    const url = new URL(CONFIG.BASE_URL);
    const upgradesOptions = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: '/api/upgrades',
      method: 'GET',
      headers: {
        'User-Agent': 'TestDataGenerator/1.0'
      }
    };
    
    const upgrades = await makeRequest(upgradesOptions);
    if (!upgrades || upgrades.length === 0) return;
    
    // Determine which upgrades this player can afford and would likely buy
    const affordableUpgrades = upgrades.filter(upgrade => upgrade.baseCost <= player.totalKush * 0.8);
    const numUpgrades = Math.min(affordableUpgrades.length, Math.floor(player.totalClicks / 500));
    
    for (let i = 0; i < numUpgrades; i++) {
      const upgrade = affordableUpgrades[i];
      const quantity = Math.max(1, Math.floor(player.totalClicks / 1000));
      
      const purchaseOptions = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `/api/players/${player.id}/upgrades`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TestDataGenerator/1.0'
        }
      };
      
      try {
        await makeRequest(purchaseOptions, {
          upgradeId: upgrade.id,
          quantity: quantity
        });
        console.log(`  📈 Added upgrade: ${upgrade.name} x${quantity} to ${player.username}`);
      } catch (error) {
        // Ignore upgrade purchase failures (expected for some players)
      }
    }
  } catch (error) {
    console.error(`Failed to create upgrades for ${player.username}:`, error.message);
  }
}

// Simulate achievement progress for players
async function updatePlayerAchievements(player) {
  try {
    const url = new URL(CONFIG.BASE_URL);
    const achievementsOptions = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: `/api/players/${player.id}/achievements`,
      method: 'GET',
      headers: {
        'User-Agent': 'TestDataGenerator/1.0'
      }
    };
    
    const achievements = await makeRequest(achievementsOptions);
    if (!achievements || achievements.length === 0) return;
    
    // Complete some achievements based on player stats
    const completableAchievements = achievements.filter(ach => {
      if (ach.completed) return false;
      
      // Simple logic to determine if achievement should be completed
      if (ach.targetValue <= player.totalClicks || ach.targetValue <= player.totalKush) {
        return Math.random() > 0.3; // 70% chance to complete eligible achievements
      }
      return false;
    });
    
    for (const achievement of completableAchievements.slice(0, 5)) { // Max 5 achievements per player
      const updateOptions = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `/api/players/${player.id}/achievements/${achievement.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TestDataGenerator/1.0'
        }
      };
      
      try {
        await makeRequest(updateOptions, {
          completed: true,
          progress: achievement.targetValue,
          completedAt: new Date().toISOString()
        });
        console.log(`  🏆 Completed achievement: ${achievement.name} for ${player.username}`);
      } catch (error) {
        // Ignore achievement update failures
      }
    }
  } catch (error) {
    console.error(`Failed to update achievements for ${player.username}:`, error.message);
  }
}

// Generate token payouts for some players
async function createTokenPayouts(players) {
  console.log('\n💰 Generating token payouts...');
  
  const playersWithWallets = players.filter(p => p && p.walletAddress);
  const numPayouts = Math.floor(playersWithWallets.length * 0.3); // 30% of wallet players get payouts
  
  const url = new URL(CONFIG.BASE_URL);
  
  for (let i = 0; i < numPayouts; i++) {
    const player = getRandomElement(playersWithWallets);
    const amount = Math.floor(Math.random() * 1000) + 100; // 100-1100 tokens
    const reasons = ['Achievement reward', 'Daily bonus', 'Referral bonus', 'Manual reward'];
    const statuses = ['pending', 'completed', 'failed'];
    const networks = ['devnet', 'mainnet'];
    
    const payoutData = {
      playerId: player.id,
      walletAddress: player.walletAddress,
      amount: amount,
      reason: getRandomElement(reasons),
      network: getRandomElement(networks),
      status: getRandomElement(statuses)
    };
    
    const payoutOptions = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: '/api/tokens/create-payout',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TestDataGenerator/1.0'
      }
    };
    
    try {
      await makeRequest(payoutOptions, payoutData);
      console.log(`💸 Created ${amount} token payout for ${player.username} (${payoutData.status})`);
    } catch (error) {
      // Ignore payout creation failures
    }
  }
}

// Main data generation function
async function generateTestData() {
  console.log('🎯 KushKlicker Test Data Generator');
  console.log(`📊 Target: ${CONFIG.BASE_URL}`);
  console.log(`👥 Creating ${CONFIG.PLAYERS_COUNT} test players with realistic data...\n`);
  
  const startTime = Date.now();
  
  // Phase 1: Create players
  console.log('📝 Phase 1: Creating test players...');
  const playerPromises = [];
  
  for (let i = 0; i < CONFIG.PLAYERS_COUNT; i++) {
    // Add small delay to prevent overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 50));
    playerPromises.push(createTestPlayer(i));
  }
  
  const players = (await Promise.allSettled(playerPromises))
    .filter(result => result.status === 'fulfilled' && result.value)
    .map(result => result.value);
  
  console.log(`\n✅ Created ${players.length}/${CONFIG.PLAYERS_COUNT} players`);
  
  // Phase 2: Add upgrades to players
  console.log('\n📈 Phase 2: Adding player upgrades...');
  for (const player of players.slice(0, Math.floor(players.length * 0.7))) { // 70% get upgrades
    await createPlayerUpgrades(player);
    await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
  }
  
  // Phase 3: Update achievements
  console.log('\n🏆 Phase 3: Updating player achievements...');
  for (const player of players.slice(0, Math.floor(players.length * 0.8))) { // 80% get achievements
    await updatePlayerAchievements(player);
    await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
  }
  
  // Phase 4: Create token payouts
  await createTokenPayouts(players);
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  // Generate summary
  console.log('\n📊 TEST DATA GENERATION COMPLETE');
  console.log('='.repeat(50));
  console.log(`✅ Successfully created ${players.length} test players`);
  console.log(`⏱️  Total time: ${duration.toFixed(2)} seconds`);
  console.log(`📈 Average: ${(duration / players.length).toFixed(2)}s per player`);
  
  const playersWithWallets = players.filter(p => p.walletAddress).length;
  const playersWithTelegram = players.filter(p => p.telegramUserId).length;
  
  console.log(`\n📋 Data Summary:`);
  console.log(`   • Players with wallets: ${playersWithWallets} (${((playersWithWallets/players.length)*100).toFixed(1)}%)`);
  console.log(`   • Players with Telegram: ${playersWithTelegram} (${((playersWithTelegram/players.length)*100).toFixed(1)}%)`);
  console.log(`   • Total KUSH generated: ${players.reduce((sum, p) => sum + p.totalKush, 0).toLocaleString()}`);
  console.log(`   • Total clicks generated: ${players.reduce((sum, p) => sum + p.totalClicks, 0).toLocaleString()}`);
  
  console.log('\n🚀 Database is now populated with realistic test data!');
  console.log('Ready for load testing and deployment validation.');
}

// Handle script execution
if (import.meta.url === `file://${process.argv[1]}`) {
  generateTestData().catch(error => {
    console.error('❌ Test data generation failed:', error);
    process.exit(1);
  });
}

export { generateTestData, CONFIG };