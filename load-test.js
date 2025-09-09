#!/usr/bin/env node

import https from 'https';
import http from 'http';
import { performance } from 'perf_hooks';

// Configuration
const CONFIG = {
  BASE_URL: process.env.TEST_URL || 'http://localhost:5000',
  CONCURRENT_USERS: 1000,
  TEST_DURATION: 60000, // 1 minute
  RAMP_UP_TIME: 10000,   // 10 seconds to reach full load
  endpoints: [
    { method: 'GET', path: '/api/leaderboard', weight: 20 },
    { method: 'GET', path: '/api/upgrades', weight: 15 },
    { method: 'GET', path: '/api/players/{playerId}', weight: 25, requiresPlayer: true },
    { method: 'POST', path: '/api/players/{playerId}/click', weight: 30, requiresPlayer: true },
    { method: 'GET', path: '/api/players/{playerId}/upgrades', weight: 10, requiresPlayer: true }
  ]
};

// Test data generators
const generateUsername = () => `loadtest_${Math.random().toString(36).substr(2, 9)}`;
const generateWalletAddress = () => Math.random().toString(36).substr(2, 44);

// Metrics tracking
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  responseTimes: [],
  errors: {},
  startTime: 0,
  endTime: 0
};

// HTTP request helper
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const isHttps = options.hostname.includes('replit.app') || options.hostname.includes('https');
    const client = isHttps ? https : http;
    
    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        metrics.totalRequests++;
        metrics.responseTimes.push(responseTime);
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          metrics.successfulRequests++;
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } catch (e) {
            resolve(responseData);
          }
        } else {
          metrics.failedRequests++;
          const errorKey = `${res.statusCode}`;
          metrics.errors[errorKey] = (metrics.errors[errorKey] || 0) + 1;
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      metrics.totalRequests++;
      metrics.failedRequests++;
      const errorKey = error.code || 'UNKNOWN';
      metrics.errors[errorKey] = (metrics.errors[errorKey] || 0) + 1;
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Create a test player
async function createTestPlayer(userId) {
  const playerData = {
    telegramUserId: `loadtest_${userId}`,
    username: generateUsername(),
    totalKush: 0,
    totalClicks: 0,
    perClickMultiplier: 1,
    autoIncomePerHour: 0,
    claimableTokens: 0
  };
  
  const url = new URL(CONFIG.BASE_URL);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: '/api/players',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'LoadTest/1.0'
    }
  };
  
  try {
    const player = await makeRequest(options, playerData);
    return player;
  } catch (error) {
    console.error(`Failed to create player ${userId}:`, error.message);
    return null;
  }
}

// Simulate user actions
async function simulateUser(userId, player) {
  const actions = [];
  const url = new URL(CONFIG.BASE_URL);
  
  // Weight-based endpoint selection
  const weightedEndpoints = [];
  CONFIG.endpoints.forEach(endpoint => {
    for (let i = 0; i < endpoint.weight; i++) {
      weightedEndpoints.push(endpoint);
    }
  });
  
  const sessionDuration = CONFIG.TEST_DURATION;
  const actionsPerSecond = 2; // 2 actions per second per user
  const totalActions = Math.floor((sessionDuration / 1000) * actionsPerSecond);
  
  for (let i = 0; i < totalActions; i++) {
    const endpoint = weightedEndpoints[Math.floor(Math.random() * weightedEndpoints.length)];
    
    // Skip player-specific endpoints if no player
    if (endpoint.requiresPlayer && !player) continue;
    
    let path = endpoint.path;
    if (player && path.includes('{playerId}')) {
      path = path.replace('{playerId}', player.id);
    }
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: path,
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'LoadTest/1.0'
      }
    };
    
    const action = async () => {
      try {
        await makeRequest(options, endpoint.method === 'POST' ? {} : null);
      } catch (error) {
        // Errors are already tracked in makeRequest
      }
    };
    
    actions.push(action);
  }
  
  // Execute actions with random intervals
  for (const action of actions) {
    await action();
    // Random delay between 200ms - 800ms
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 600));
  }
}

// Test database performance with concurrent operations
async function testDatabaseLoad() {
  console.log('\n🔥 Testing database under concurrent load...');
  
  const url = new URL(CONFIG.BASE_URL);
  const concurrentOps = [];
  
  // Test concurrent player creation
  for (let i = 0; i < 50; i++) {
    concurrentOps.push(createTestPlayer(`db_test_${i}`));
  }
  
  const startTime = performance.now();
  const results = await Promise.allSettled(concurrentOps);
  const endTime = performance.now();
  
  const successful = results.filter(r => r.status === 'fulfilled' && r.value).length;
  const failed = results.length - successful;
  
  console.log(`📊 Database Load Test Results:`);
  console.log(`   • Concurrent Operations: ${results.length}`);
  console.log(`   • Successful: ${successful}`);
  console.log(`   • Failed: ${failed}`);
  console.log(`   • Duration: ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`   • Avg Time per Op: ${((endTime - startTime) / results.length).toFixed(2)}ms`);
}

// Generate test analytics
function generateReport() {
  const duration = (metrics.endTime - metrics.startTime) / 1000;
  const avgResponseTime = metrics.responseTimes.reduce((a, b) => a + b, 0) / metrics.responseTimes.length;
  const p95ResponseTime = metrics.responseTimes.sort((a, b) => a - b)[Math.floor(metrics.responseTimes.length * 0.95)];
  const requestsPerSecond = metrics.totalRequests / duration;
  
  console.log('\n📊 LOAD TEST RESULTS');
  console.log('='.repeat(50));
  console.log(`🎯 Test Configuration:`);
  console.log(`   • Concurrent Users: ${CONFIG.CONCURRENT_USERS}`);
  console.log(`   • Test Duration: ${duration.toFixed(2)}s`);
  console.log(`   • Target URL: ${CONFIG.BASE_URL}`);
  
  console.log(`\n📈 Performance Metrics:`);
  console.log(`   • Total Requests: ${metrics.totalRequests.toLocaleString()}`);
  console.log(`   • Successful: ${metrics.successfulRequests.toLocaleString()} (${((metrics.successfulRequests/metrics.totalRequests)*100).toFixed(2)}%)`);
  console.log(`   • Failed: ${metrics.failedRequests.toLocaleString()} (${((metrics.failedRequests/metrics.totalRequests)*100).toFixed(2)}%)`);
  console.log(`   • Requests/sec: ${requestsPerSecond.toFixed(2)}`);
  
  console.log(`\n⏱️  Response Times:`);
  console.log(`   • Average: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`   • 95th Percentile: ${p95ResponseTime.toFixed(2)}ms`);
  console.log(`   • Min: ${Math.min(...metrics.responseTimes).toFixed(2)}ms`);
  console.log(`   • Max: ${Math.max(...metrics.responseTimes).toFixed(2)}ms`);
  
  if (Object.keys(metrics.errors).length > 0) {
    console.log(`\n❌ Error Breakdown:`);
    Object.entries(metrics.errors).forEach(([error, count]) => {
      console.log(`   • ${error}: ${count} occurrences`);
    });
  }
  
  // Performance assessment
  const successRate = (metrics.successfulRequests / metrics.totalRequests) * 100;
  console.log(`\n🎯 Assessment:`);
  
  if (successRate >= 99.5 && avgResponseTime < 500 && requestsPerSecond > 50) {
    console.log(`   ✅ EXCELLENT - Ready for production deployment!`);
  } else if (successRate >= 95 && avgResponseTime < 1000 && requestsPerSecond > 20) {
    console.log(`   ⚠️  GOOD - Consider optimization before high-traffic deployment`);
  } else {
    console.log(`   ❌ NEEDS WORK - Optimize before deployment`);
  }
}

// Main load test execution
async function runLoadTest() {
  console.log('🚀 KushKlicker Load Test Starting...');
  console.log(`📊 Target: ${CONFIG.BASE_URL}`);
  console.log(`👥 Simulating ${CONFIG.CONCURRENT_USERS} concurrent users`);
  
  metrics.startTime = performance.now();
  
  // Phase 1: Create test players
  console.log('\n📝 Phase 1: Creating test players...');
  const playerPromises = [];
  
  for (let i = 0; i < Math.min(CONFIG.CONCURRENT_USERS, 100); i++) {
    playerPromises.push(createTestPlayer(i));
  }
  
  const players = (await Promise.allSettled(playerPromises))
    .filter(result => result.status === 'fulfilled' && result.value)
    .map(result => result.value);
  
  console.log(`✅ Created ${players.length} test players`);
  
  // Phase 2: Database stress test
  await testDatabaseLoad();
  
  // Phase 3: Simulate concurrent user load
  console.log('\n🔄 Phase 3: Simulating user load...');
  const userPromises = [];
  
  // Ramp up gradually
  const rampUpInterval = CONFIG.RAMP_UP_TIME / CONFIG.CONCURRENT_USERS;
  
  for (let i = 0; i < CONFIG.CONCURRENT_USERS; i++) {
    const player = players[i % players.length]; // Reuse players if we have fewer players than users
    
    setTimeout(() => {
      userPromises.push(simulateUser(i, player));
    }, i * rampUpInterval);
  }
  
  // Wait for all users to complete
  await new Promise(resolve => setTimeout(resolve, CONFIG.RAMP_UP_TIME + CONFIG.TEST_DURATION));
  await Promise.allSettled(userPromises);
  
  metrics.endTime = performance.now();
  
  // Phase 4: Generate report
  generateReport();
  
  console.log('\n🏁 Load test completed!');
}

// Handle script execution
if (import.meta.url === `file://${process.argv[1]}`) {
  runLoadTest().catch(error => {
    console.error('❌ Load test failed:', error);
    process.exit(1);
  });
}

export { runLoadTest, CONFIG, metrics };