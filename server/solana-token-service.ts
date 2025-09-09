/**
 * Solana Token Service for KushKlicker
 * Handles token creation, distribution, and payouts
 * Supports both devnet (testing) and mainnet (production)
 */

export interface TokenConfig {
  network: 'devnet' | 'mainnet';
  rpcUrl: string;
  tokenMintAddress?: string; // Will be created on first run
  adminKeypair?: string; // Base58 encoded private key for token operations
  tokenDecimals: number;
  tokenSymbol: string;
  tokenName: string;
}

export interface PayoutEvent {
  playerId: string;
  amount: number;
  reason: string;
  walletAddress: string;
  network: 'devnet' | 'mainnet';
  timestamp: Date;
}

export interface TokenDistribution {
  achievement: {
    // Base token rewards for achievements
    firstClick: 10,
    first100Clicks: 50,
    first1000Clicks: 200,
    first10000Clicks: 1000,
    firstUpgrade: 25,
    firstMillionaire: 5000,
    weeklyActive: 100,
    referralBonus: 200,
    walletConnection: 50
  },
  milestone: {
    // Milestone rewards for total KUSH earned
    1000: 100,    // 1K KUSH = 100 tokens
    10000: 500,   // 10K KUSH = 500 tokens  
    100000: 2000, // 100K KUSH = 2000 tokens
    1000000: 10000, // 1M KUSH = 10K tokens
    10000000: 50000 // 10M KUSH = 50K tokens
  },
  conversion: {
    // Dynamic conversion rate: KUSH -> Tokens
    kushPerToken: 1000 // 1000 KUSH = 1 Token
  }
}

// Token distribution configuration constants
export const TOKEN_REWARDS = {
  achievement: {
    firstClick: 10,
    first100Clicks: 50,
    first1000Clicks: 200,
    first10000Clicks: 1000,
    firstUpgrade: 25,
    firstMillionaire: 5000,
    weeklyActive: 100,
    referralBonus: 200,
    walletConnection: 50
  },
  milestone: {
    1000: 100,    // 1K KUSH = 100 tokens
    10000: 500,   // 10K KUSH = 500 tokens  
    100000: 2000, // 100K KUSH = 2000 tokens
    1000000: 10000, // 1M KUSH = 10K tokens
    10000000: 50000 // 10M KUSH = 50K tokens
  },
  conversion: {
    kushPerToken: 1000 // 1000 KUSH = 1 Token
  }
} as const;

class SolanaTokenService {
  private config: TokenConfig;
  private connection: any; // Will be properly typed when we install @solana/web3.js
  private balanceCache: Map<string, { balance: number; timestamp: number }>;
  private rpcEndpoints: string[];
  private currentEndpointIndex: number;
  private failedEndpoints: Set<string>;
  private lastEndpointReset: number;
  
  constructor(network: 'mainnet' = 'mainnet') {
    // Multiple RPC endpoints for load balancing and failover - Updated with more reliable endpoints
    this.rpcEndpoints = [
      'https://api.mainnet-beta.solana.com',
      'https://solana.public-rpc.com',
      'https://rpc.ankr.com/solana',
      'https://api.devnet.solana.com' // Fallback to devnet if mainnet fails
    ];
    this.currentEndpointIndex = 0;
    this.failedEndpoints = new Set();
    this.lastEndpointReset = Date.now();
    
    this.config = {
      network: 'mainnet',
      rpcUrl: this.rpcEndpoints[0], // Will be rotated
      tokenDecimals: parseInt(process.env.TOKEN_DECIMALS || '6'),
      tokenSymbol: process.env.TOKEN_SYMBOL || 'KUSH',
      tokenName: process.env.TOKEN_NAME || 'KushKlicker Token',
      // Use mainnet production token only
      tokenMintAddress: (process.env.MAINNET_TOKEN_MINT || 'FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL').trim(),
      adminKeypair: process.env.MAINNET_ADMIN_KEYPAIR
    };
    
    // Initialize balance cache with longer duration
    this.balanceCache = new Map();
    
    // Log the token configuration on startup
    console.log(`🪙 Token Service initialized on mainnet:`);
    console.log(`   Token: ${this.config.tokenSymbol} (${this.config.tokenName})`);
    console.log(`   Mint: ${this.config.tokenMintAddress || 'Not configured'}`);
    console.log(`   Decimals: ${this.config.tokenDecimals}`);
    console.log(`🔗 RPC Endpoints: ${this.rpcEndpoints.length} configured for load balancing`);
  }

  /**
   * Get next available RPC endpoint with rotation and failover
   */
  private getNextRpcEndpoint(): string {
    // Reset failed endpoints every 5 minutes
    if (Date.now() - this.lastEndpointReset > 5 * 60 * 1000) {
      this.failedEndpoints.clear();
      this.lastEndpointReset = Date.now();
      console.log('🔄 Reset failed RPC endpoints');
    }

    const availableEndpoints = this.rpcEndpoints.filter(ep => !this.failedEndpoints.has(ep));
    
    if (availableEndpoints.length === 0) {
      // All endpoints failed, reset and use first
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
  private markEndpointFailed(endpoint: string) {
    this.failedEndpoints.add(endpoint);
    console.log(`❌ Marked RPC endpoint as failed: ${endpoint}`);
  }

  /**
   * Enhanced RPC call with retry logic and endpoint rotation
   */
  private async makeRpcCall(payload: any, maxRetries: number = 3): Promise<any> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const endpoint = this.getNextRpcEndpoint();
      
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        const data = await response.json();
        
        if (data.error) {
          // Rate limiting - try different endpoint
          if (data.error.code === 429 || data.error.message?.includes('Too many requests')) {
            this.markEndpointFailed(endpoint);
            
            if (attempt < maxRetries - 1) {
              const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
              console.log(`⏳ Rate limited on ${endpoint}, waiting ${backoffMs}ms before retry...`);
              await new Promise(resolve => setTimeout(resolve, backoffMs));
              continue;
            }
          }
          
          throw new Error(`RPC Error: ${data.error.message}`);
        }

        // Success - return data
        return data;
        
      } catch (error) {
        lastError = error as Error;
        this.markEndpointFailed(endpoint);
        
        if (attempt < maxRetries - 1) {
          const backoffMs = Math.min(200 * Math.pow(2, attempt), 2000); // Faster retries: 200ms, 400ms, 800ms
          console.log(`🔄 RPC call failed on ${endpoint}, retrying in ${backoffMs}ms... (${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
        }
      }
    }
    
    throw lastError || new Error('All RPC endpoints failed');
  }

  /**
   * Enhanced caching with longer duration and smarter invalidation
   */
  private getCachedBalance(walletAddress: string): number | null {
    const cached = this.balanceCache.get(walletAddress);
    if (cached) {
      // Cache for 5 minutes instead of 30 seconds
      const cacheValidMs = 5 * 60 * 1000;
      if (Date.now() - cached.timestamp < cacheValidMs) {
        console.log(`💾 Using cached balance: ${cached.balance} for ${walletAddress}`);
        return cached.balance;
      } else {
        // Remove expired cache entry
        this.balanceCache.delete(walletAddress);
      }
    }
    return null;
  }

  /**
   * Set cached balance with timestamp
   */
  private setCachedBalance(walletAddress: string, balance: number) {
    this.balanceCache.set(walletAddress, {
      balance,
      timestamp: Date.now()
    });
    console.log(`💾 Cached balance: ${balance} for ${walletAddress}`);
  }

  /**
   * Initialize the token service and create token if needed
   */
  async initialize(): Promise<void> {
    try {
      console.log(`🚀 Initializing Real Token Service on ${this.config.network}`);
      
      if (!this.config.tokenMintAddress) {
        console.log('⚠️ WARNING: No token mint address configured!');
        console.log('Please set MAINNET_TOKEN_MINT environment variable');
        throw new Error('Token mint address required for real token integration');
      }
      
      console.log(`✅ Using production token: ${this.config.tokenMintAddress}`);
      console.log(`🔗 Network: ${this.config.network} (${this.config.rpcUrl})`);
      
      // Validate token mint address format
      console.log(`🔍 Validating token mint address: "${this.config.tokenMintAddress}"`);
      console.log(`📏 Address length: ${this.config.tokenMintAddress?.length}`);
      console.log(`✅ Validation result: ${this.isValidSolanaAddress(this.config.tokenMintAddress!)}`);
      
      if (!this.isValidSolanaAddress(this.config.tokenMintAddress!)) {
        throw new Error(`Invalid token mint address: ${this.config.tokenMintAddress}`);
      }
      
      // Initialize connection for balance checking
      this.connection = {
        rpcUrl: this.config.rpcUrl,
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      console.log(`💰 Balance checking enabled for token: ${this.config.tokenMintAddress}`);
      
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Failed to initialize Token Service:', error);
      throw error;
    }
  }

  /**
   * Create a new SPL token for the game
   */
  async createToken(): Promise<string> {
    // Real token integration - token already exists
    if (this.config.tokenMintAddress) {
      console.log(`✅ Using existing production token: ${this.config.tokenMintAddress}`);
      return this.config.tokenMintAddress;
    }
    
    throw new Error('Token mint address required - no token creation needed for production token');
  }

  /**
   * Create pending token reward for manual distribution
   */
  async createPendingReward(
    playerId: string,
    playerWallet: string, 
    amount: number, 
    reason: string
  ): Promise<string> {
    try {
      console.log(`💰 Creating pending reward: ${amount} $KUSH tokens for ${playerWallet}`);
      console.log(`📝 Reason: ${reason}`);
      
      // Validate wallet address
      if (!this.isValidSolanaAddress(playerWallet)) {
        throw new Error('Invalid Solana wallet address');
      }
      
      // Import storage service to create the pending payout record
      const { storage } = await import('./storage');
      
      // Create pending payout record
      const payout = await storage.createTokenPayout({
        playerId,
        walletAddress: playerWallet,
        amount,
        reason,
        network: this.config.network,
        status: 'pending'
      });
      
      console.log(`⏳ Pending reward created with ID: ${payout.id}`);
      console.log(`🎯 Manual airdrop required for ${amount} tokens to ${playerWallet}`);
      
      return payout.id;
    } catch (error) {
      console.error('❌ Failed to create pending reward:', error);
      throw error;
    }
  }

  /**
   * Process achievement-based token rewards
   */
  async processAchievementReward(
    playerId: string,
    achievementType: string,
    playerWallet: string
  ): Promise<PayoutEvent | null> {
    try {
      const achievementRewards = {
        'firstClick': 10,
        'first100Clicks': 50,
        'first1000Clicks': 200,
        'first10000Clicks': 1000,
        'firstUpgrade': 25,
        'firstMillionaire': 5000,
        'walletConnection': 50,
        'referralBonus': 100,
        'weeklyActive': 25
      };
      
      const rewardAmount = achievementRewards[achievementType as keyof typeof achievementRewards];
      
      if (!rewardAmount || !playerWallet) {
        return null;
      }

      const payoutId = await this.createPendingReward(
        playerId,
        playerWallet, 
        rewardAmount, 
        `Achievement reward: ${achievementType}`
      );

      const payoutEvent: PayoutEvent = {
        playerId,
        amount: rewardAmount,
        reason: `Achievement: ${achievementType}`,
        walletAddress: playerWallet,
        network: this.config.network,
        timestamp: new Date()
      };

      console.log(`🏆 Achievement reward processed:`, payoutEvent);
      return payoutEvent;
      
    } catch (error) {
      console.error('❌ Failed to process achievement reward:', error);
      return null;
    }
  }

  /**
   * Process milestone-based token rewards
   */
  async processMilestoneReward(
    playerId: string,
    totalKush: number,
    playerWallet: string
  ): Promise<PayoutEvent | null> {
    try {
      // Check if player has reached a milestone
      const milestoneRewards: Record<number, number> = {
        1000: 100,
        10000: 500,
        100000: 2000,
        1000000: 10000
      };
      
      const milestones = Object.keys(milestoneRewards)
        .map(Number)
        .sort((a, b) => b - a); // Descending order

      const reachedMilestone = milestones.find(milestone => totalKush >= milestone);
      
      if (!reachedMilestone || !playerWallet) {
        return null;
      }

      const rewardAmount = milestoneRewards[reachedMilestone];
      
      const payoutId = await this.createPendingReward(
        playerId,
        playerWallet,
        rewardAmount,
        `Milestone reward: ${reachedMilestone} KUSH`
      );

      const payoutEvent: PayoutEvent = {
        playerId,
        amount: rewardAmount,
        reason: `Milestone: ${reachedMilestone} KUSH`,
        walletAddress: playerWallet,
        network: this.config.network,
        timestamp: new Date()
      };

      console.log(`🎯 Milestone reward processed:`, payoutEvent);
      return payoutEvent;
      
    } catch (error) {
      console.error('❌ Failed to process milestone reward:', error);
      return null;
    }
  }

  /**
   * Convert KUSH to tokens based on current rate
   */
  calculateTokenReward(kushAmount: number): number {
    const tokensEarned = Math.floor(kushAmount / TOKEN_REWARDS.conversion.kushPerToken);
    return tokensEarned;
  }

  /**
   * Validate Solana wallet address
   */
  private isValidSolanaAddress(address: string): boolean {
    // Extended validation for token addresses - 32-55 characters, base58
    // Some token addresses can be longer than standard wallet addresses
    return /^[1-9A-HJ-NP-Za-km-z]{32,55}$/.test(address);
  }

  /**
   * Get all player wallet balances for admin review
   */
  async getAllPlayerBalances(players: Array<{id: string, username: string, walletAddress?: string}>): Promise<Array<{playerId: string, username: string, walletAddress: string, balance: number}>> {
    const balances = [];
    
    for (const player of players) {
      if (player.walletAddress) {
        try {
          const balance = await this.getTokenBalance(player.walletAddress);
          balances.push({
            playerId: player.id,
            username: player.username,
            walletAddress: player.walletAddress,
            balance
          });
        } catch (error) {
          console.error(`Failed to get balance for ${player.username}:`, error);
          balances.push({
            playerId: player.id,
            username: player.username,
            walletAddress: player.walletAddress,
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
  async getTokenBalance(walletAddress: string): Promise<number> {
    try {
      console.log(`📊 Checking ${this.config.tokenSymbol} balance for ${walletAddress}`);
      console.log(`🪙 Token mint: ${this.config.tokenMintAddress}`);
      
      // Validate wallet address format
      if (!this.isValidSolanaAddress(walletAddress)) {
        console.error(`❌ Invalid wallet address format: ${walletAddress}`);
        return 0;
      }

      // Check cache first
      const cachedBalance = this.getCachedBalance(walletAddress);
      if (cachedBalance !== null) {
        return cachedBalance;
      }
      
      // List of token addresses to check (primary and alternative)
      const tokenAddresses = [
        this.config.tokenMintAddress!,
        'FPdBJCFaSqwrh4qQLezZpcxKPhEszXgWqDmoYESVpump' // Alternative token address seen in transactions
      ];
      
      let totalBalance = 0;
      
      for (const mintAddress of tokenAddresses) {
        try {
          console.log(`🔍 Checking token mint: ${mintAddress}`);
          
          // Get associated token account for this wallet and token mint
          const associatedTokenAccount = await this.getAssociatedTokenAccount(walletAddress, mintAddress);
          
          if (associatedTokenAccount) {
            // Get token account balance using enhanced RPC call
            const balance = await this.getTokenAccountBalance(associatedTokenAccount);
            console.log(`💰 Balance found: ${balance} ${this.config.tokenSymbol} tokens for mint ${mintAddress}`);
            totalBalance += balance;
          }
        } catch (error) {
          console.log(`⚠️ No tokens found for mint ${mintAddress}:`, (error as Error).message);
        }
      }
      
      // Cache the result (even if 0)
      this.setCachedBalance(walletAddress, totalBalance);
      
      if (totalBalance === 0) {
        console.log(`ℹ️ No ${this.config.tokenSymbol} tokens found for ${walletAddress}`);
      }
      
      return totalBalance;
    } catch (error) {
      console.error('❌ Failed to get token balance:', error);
      return 0;
    }
  }


  /**
   * Get associated token account address for wallet and mint
   */
  private async getAssociatedTokenAccount(walletAddress: string, mintAddress: string): Promise<string | null> {
    try {
      // Validate addresses first
      if (!this.isValidSolanaAddress(walletAddress)) {
        throw new Error(`Invalid wallet address format: ${walletAddress}`);
      }
      if (!this.isValidSolanaAddress(mintAddress)) {
        throw new Error(`Invalid mint address format: ${mintAddress}`);
      }
      
      // Use enhanced RPC call with retry logic and endpoint rotation
      const payload = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountsByOwner',
        params: [
          walletAddress,
          {
            mint: mintAddress
          },
          {
            encoding: 'jsonParsed'
          }
        ]
      };
      
      const data = await this.makeRpcCall(payload, 3);
      
      if (data.result && data.result.value && data.result.value.length > 0) {
        const tokenAccount = data.result.value[0].pubkey;
        console.log(`✅ Found token account: ${tokenAccount}`);
        return tokenAccount;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Failed to get associated token account:', error);
      throw error;
    }
  }

  /**
   * Get token account balance using enhanced RPC with retry logic
   */
  private async getTokenAccountBalance(tokenAccountAddress: string): Promise<number> {
    try {
      const payload = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountBalance',
        params: [tokenAccountAddress]
      };
      
      const data = await this.makeRpcCall(payload, 2);
      
      if (data.result && data.result.value) {
        // Convert from smallest unit to tokens based on decimals
        const amount = parseInt(data.result.value.amount);
        const decimals = data.result.value.decimals;
        return amount / Math.pow(10, decimals);
      }
      
      return 0;
    } catch (error) {
      console.error('❌ Failed to get token account balance:', error);
      return 0;
    }
  }

  /**
   * Airdrop SOL for devnet testing
   */
  async airdropSol(walletAddress: string, amount: number = 1): Promise<string> {
    throw new Error('SOL airdrops not available on mainnet');

    try {
      console.log(`🪂 Airdropping ${amount} SOL to ${walletAddress} on devnet`);
      
      // Real SOL airdrop for devnet testing
      console.log(`🔄 REAL SOL AIRDROP REQUEST:`);
      console.log(`   Amount: ${amount} SOL`);
      console.log(`   Recipient: ${walletAddress}`);
      console.log(`   Network: ${this.config.network}`);
      
      // TODO: Implement actual SOL airdrop when @solana/web3.js is installed
      const pendingAirdrop = `AIRDROP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log(`⏳ SOL airdrop queued: ${pendingAirdrop}`);
      
      return pendingAirdrop;
    } catch (error) {
      console.error('❌ Failed to airdrop SOL:', error);
      throw error;
    }
  }
}

// Export mainnet-only singleton instance
export const mainnetTokenService = new SolanaTokenService('mainnet');

// Export the class for custom instances
export { SolanaTokenService };

// Token rewards configuration already exported above