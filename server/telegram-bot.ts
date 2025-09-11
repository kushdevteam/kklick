import TelegramBot from 'node-telegram-bot-api';
import { storage } from './storage';
import { mainnetTokenService } from './solana-token-service';

// Admin usernames who can access admin functions
const ADMIN_USERNAMES = ['wlsfx'];

// Check if user is admin
function isAdmin(username?: string): boolean {
  return username ? ADMIN_USERNAMES.includes(username.toLowerCase()) : false;
}

// Get the current development or production URL
function getWebAppUrl(): string {
  // Always use the production URL
  return 'https://kushklicker.com/';
}

// Global bot instance to prevent duplicate initialization
let botInstance: TelegramBot | null = null;

// Admin 2FA function
export async function sendAdmin2FA(code: string): Promise<boolean> {
  // Import the working notify bot as fallback
  const { getNotifyBotInstance } = await import('./kush-notify-bot.js');
  
  // Try main bot first, fallback to notify bot if conflicts
  let activeBot = botInstance;
  let botName = 'main bot';
  
  if (!activeBot) {
    console.log('⚠️ Main bot unavailable due to conflicts, using KushNotifyBot for 2FA...');
    activeBot = getNotifyBotInstance();
    botName = 'KushNotifyBot';
  }
  
  if (!activeBot) {
    console.error('❌ No bot available for 2FA. Both main bot and notify bot failed.');
    return false;
  }

  try {
    // Get admin chat ID from environment or use fallback
    const adminChatId = process.env.ADMIN_CHAT_ID || '123456789'; 
    
    if (adminChatId === '123456789') {
      console.warn('⚠️ Admin chat ID not configured. Set ADMIN_CHAT_ID environment variable.');
      return false;
    }
    
    const message = `🔐 **KushKlicker Admin 2FA**\n\nYour verification code: **${code}**\n\nThis code expires in 5 minutes.\n\n⚠️ If you didn't request this, please ignore.\n\n🤖 Sent via ${botName}`;
    
    console.log(`📤 Sending 2FA code via ${botName} to chat ID: ${adminChatId}`);
    await activeBot.sendMessage(adminChatId, message, { parse_mode: 'Markdown' });
    console.log(`✅ 2FA code sent successfully via ${botName}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send admin 2FA code via ${botName}:`, error);
    return false;
  }
}

export function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!token) {
    console.log('Telegram bot token not found, skipping Telegram bot initialization');
    return null;
  }

  // Force bot recreation if token might have changed
  if (botInstance) {
    console.log('🤖 Stopping existing Telegram bot for token update...');
    try {
      botInstance.stopPolling();
    } catch (error) {
      console.warn('⚠️ Error stopping existing bot:', error);
    }
    botInstance = null;
  }

  // Check for existing polling processes to prevent conflicts
  console.log('🤖 Initializing Telegram bot with enhanced conflict prevention...');

  try {
    // Stop any existing polling first
    if (botInstance) {
      try {
        botInstance.stopPolling();
        botInstance = null;
      } catch (error) {
        console.warn('⚠️ Error stopping existing bot:', error);
      }
    }

    // Force polling mode to avoid port conflicts with main server
    const bot = new TelegramBot(token, { 
      polling: { autoStart: false },
      webHook: false
    });

    console.log('🔄 Telegram bot using polling mode (no webhooks)');
    
    // Start polling with retry mechanism
    let startAttempts = 0;
    const maxStartAttempts = 3;
    
    const startPolling = async () => {
      try {
        await bot.startPolling();
        console.log('✅ Telegram bot polling started successfully');
      } catch (error: any) {
        startAttempts++;
        console.error(`❌ Polling start attempt ${startAttempts} failed:`, error.message);
        
        if (startAttempts < maxStartAttempts && 
            (error.code === 409 || error.message?.includes('409') || error.message?.includes('Conflict'))) {
          console.log(`🔄 Retrying in 3 seconds... (${startAttempts}/${maxStartAttempts})`);
          setTimeout(startPolling, 3000);
        } else {
          console.error('🚨 Failed to start Telegram bot after multiple attempts');
          botInstance = null;
        }
      }
    };
    
    startPolling();

    // Bot command handlers
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username || `user_${msg.from?.id}`;
      const firstName = msg.from?.first_name || 'Player';
      
      const welcomeMessage = `
🌿 Welcome to KushKlicker, ${firstName}! 🌿

The ultimate cannabis-themed incremental clicker game! Build your KUSH empire from the ground up and earn real $KUSH token rewards!

🎯 **Game Features:**
• 🖱️ Click to earn KUSH tokens
• 🏪 Buy powerful upgrades & grow lights
• 🏆 Complete 50+ achievements for bonuses
• 🏆 Compete on global leaderboards
• 💰 Connect Solana wallet for real $KUSH token rewards
• 👥 Referral system for bonus earnings

🚀 **Quick Start Guide:**
1. Click "🎮 Play Now" to start the game
2. Start clicking to earn your first KUSH
3. Use /link to connect your account
4. Register your wallet with /wallet for rewards

💎 **Pro Tips:**
• Buy upgrades early to maximize earnings
• Complete achievements for bonus rewards
• Invite friends for referral bonuses
• Check /balance to see your $KUSH token rewards

Ready to become the ultimate KUSH mogul? 🚀
      `;
      
      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🎮 Play Now', web_app: { url: `${getWebAppUrl()}?ref=${username}` } }],
            [
              { text: '📊 My Stats', callback_data: 'my_stats' },
              { text: '🏆 Leaderboard', callback_data: 'leaderboard' }
            ],
            [
              { text: '🌱 Garden System', callback_data: 'garden_info' },
              { text: '⚔️ PvP Arena', callback_data: 'pvp_info' }
            ],
            [
              { text: '🎯 Achievements', callback_data: 'achievements' },
              { text: '💰 My Wallet', callback_data: 'my_wallet' }
            ],
            [
              { text: '🔗 Link Account', callback_data: 'link_help' },
              { text: '💎 Check Balance', callback_data: 'check_balance' }
            ],
            [
              { text: '❓ Help & Commands', callback_data: 'show_help' },
              { text: '🔄 Refresh Menu', callback_data: 'refresh_start' }
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
🌿 KushKlicker Help 🌿

Commands:
• /start - Start playing and get the game link
• /help - Show this help message
• /stats - View your game statistics
• /leaderboard - Check top players
• /garden - Check your garden plots and strains
• /pvp - View PvP arena and battle stats
• /link [username] - Link your Telegram account to your game
• /wallet [address] - Register your Solana wallet
• /mywallet - Check your wallet info
• /balance - Check your token balance

Game Features:
• 🖱️ Click to earn KUSH tokens
• 🏪 Buy upgrades to increase earning power
• 🌱 Grow cannabis strains in your garden
• ⚔️ Battle other players in PvP arena
• 🏆 Join guilds and compete in tournaments
• 🎯 Complete achievements for bonus rewards
• 💰 Connect Solana wallet for real $KUSH token rewards
• 👥 Invite friends with referral system

Need more help? Contact @KushKlickerSupport
      `;
      
      // Add admin commands if user is admin
      if (isAdmin(username)) {
        helpMessage += `
        
🔐 Admin Commands:
• /admin - Open admin panel
• /players - List all players
• /reward [username] [amount] - Create pending reward
• /broadcast [message] - Send message to all users
        `;
      }
      
      bot.sendMessage(chatId, helpMessage);
    });

    bot.onText(/\/stats/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      
      try {
        if (!telegramId) {
          bot.sendMessage(chatId, "🚫 **Oops!** Can't identify your Telegram account. Please try again!", { parse_mode: 'Markdown' });
          return;
        }
        
        // First try to find by telegramUserId, then by username pattern
        let player = await storage.getAllPlayers().then(players => 
          players.find(p => p.telegramUserId === telegramId.toString())
        );
        
        if (!player) {
          player = await storage.getPlayerByUsername(`telegram_${telegramId}`);
        }
        
        if (!player) {
          const noAccountMessage = `
🔍 **No Account Found!**

🔗 You need to link your Telegram to KushKlicker first!

💡 **Quick Setup:**
• Use \`/link YOUR_WALLET_ADDRESS\` to connect
• Or \`/link new\` to create a new account

🎮 **Start earning $KUSH tokens today!** 🌿✨
          `;
          bot.sendMessage(chatId, noAccountMessage, { parse_mode: 'Markdown' });
          return;
        }

        const displayName = player.username.replace(/telegram_\d+_/, '').replace('telegram_', '') || 'KUSH Mogul';
        const playerLevel = player.totalKush >= 1000000 ? '🏆 **Legend**' :
          player.totalKush >= 500000 ? '💎 **Master**' :
          player.totalKush >= 100000 ? '⭐ **Expert**' :
          player.totalKush >= 50000 ? '🚀 **Pro**' :
          player.totalKush >= 10000 ? '💪 **Advanced**' :
          player.totalKush >= 1000 ? '🌱 **Growing**' : '🌿 **Beginner**';

        const statsMessage = `
🏆 **Your KUSH Empire Stats** 🏆

${playerLevel} **${displayName}**

💎 **Total KUSH:** ${player.totalKush.toLocaleString()} tokens
👆 **Total Clicks:** ${player.totalClicks.toLocaleString()} clicks
⚡ **Click Power:** ${player.perClickMultiplier}x multiplier
🏭 **Auto Income:** ${player.autoIncomePerHour}/hour
🗓️ **Playing Since:** ${new Date(player.createdAt).toLocaleDateString()}

🎯 **Keep clicking to dominate the KUSH empire!** 
🎉 **You're building something amazing!** 🌱
        `;
        
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: '🎮 Continue Playing', web_app: { url: getWebAppUrl() } }]
            ]
          }
        };
        
        bot.sendMessage(chatId, statsMessage, { 
          ...keyboard,
          parse_mode: 'Markdown' 
        });
      } catch (error) {
        console.error('Stats error:', error);
        bot.sendMessage(chatId, `🚨 **Oops!** Couldn't fetch your stats right now!

❌ **Error:** Something went wrong on our end

🔄 **Try again in a moment** - We're working on it! 🛠️`, { parse_mode: 'Markdown' });
      }
    });

    bot.onText(/\/leaderboard/, async (msg) => {
      const chatId = msg.chat.id;
      
      try {
        const leaderboard = await storage.getTopPlayers(10);
        let leaderboardMessage = "🏆 **KUSH Empire Leaderboard** 🏆\n\n👑 **Top KUSH Moguls:**\n\n";
        
        leaderboard.forEach((player, index) => {
          const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;
          const displayName = player.username.replace(/telegram_\d+_/, '').replace('telegram_', '') || `Player ${index + 1}`;
          const statusIcon = player.totalKush >= 1000000 ? ' 🐋' : 
            player.totalKush >= 100000 ? ' 💎' : 
            player.totalKush >= 10000 ? ' ⭐' : ' 🌱';
          leaderboardMessage += `${medal} **${displayName}**: ${player.totalKush.toLocaleString()} KUSH${statusIcon}\n`;
        });
        
        leaderboardMessage += `\n🎯 **Climb the ranks and become a KUSH legend!**\n💪 **Keep clicking to dominate!**`;
        
        const keyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: '🎮 Play Now', web_app: { url: getWebAppUrl() } }]
            ]
          }
        };
        
        bot.sendMessage(chatId, leaderboardMessage, { 
          ...keyboard,
          parse_mode: 'Markdown' 
        });
      } catch (error) {
        console.error('Leaderboard error:', error);
        bot.sendMessage(chatId, "❌ Error fetching leaderboard. Please try again later.");
      }
    });

    // Enhanced link command with multiple options
    bot.onText(/\/link(?:\s+(.+))?/, async (msg, match) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      const parameter = match?.[1]?.trim();

      console.log(`📱 Telegram /link command received from user ${telegramId} with parameter: "${parameter}"`);

      if (!telegramId) {
        bot.sendMessage(chatId, "❌ Unable to get your Telegram information.");
        return;
      }

      // Check if user already linked
      try {
        const players = await storage.getAllPlayers();
        const existingLinkedPlayer = players.find(p => p.username.includes(`telegram_${telegramId}`));
        
        if (existingLinkedPlayer) {
          bot.sendMessage(chatId, `
✅ **Account Already Linked**

Your Telegram is already linked to: **${existingLinkedPlayer.username}**
💰 KUSH: ${existingLinkedPlayer.totalKush.toLocaleString()}
👆 Clicks: ${existingLinkedPlayer.totalClicks.toLocaleString()}

Use /stats to check your current progress!
          `, { parse_mode: 'Markdown' });
          return;
        }
      } catch (error) {
        console.error('Error checking existing link:', error);
      }

      if (!parameter) {
        // Show linking options
        const linkingMessage = `
🔗 **Link Your Account**

Provide your Solana wallet address to link:

**🎯 Recommended: Link with Wallet Address**
\`/link YOUR_SOLANA_WALLET_ADDRESS\`
Example: \`/link 7dHbWY1gP9fGv8K3m2C9V4u...\`

**Alternative: Link with Game Username**  
\`/link YOUR_GAME_USERNAME\`
Example: \`/link PlayerName123\`

**Create New Account**
\`/link new\` - Creates a new game account on mainnet

**Need Help?**
🎮 [Play KushKlicker First](${getWebAppUrl()}) to create your account
💰 Connect your wallet in-game first, then use that address here
        `;
        
        bot.sendMessage(chatId, linkingMessage, { parse_mode: 'Markdown' });
        return;
      }

      try {
        const lowercaseParam = parameter.toLowerCase();
        
        // Option 3: Create new account
        if (lowercaseParam === 'new') {
          // First check if this Telegram user already has an account
          const allPlayers = await storage.getAllPlayers();
          const existingTelegramPlayer = allPlayers.find(p => p.telegramUserId === telegramId.toString());
          
          if (existingTelegramPlayer) {
            bot.sendMessage(chatId, `
❌ **Account Already Exists**

You already have an account linked to this Telegram!
👤 **Username:** ${existingTelegramPlayer.username}
💰 **KUSH:** ${existingTelegramPlayer.totalKush.toLocaleString()}

Use /stats to check your progress!
            `, { parse_mode: 'Markdown' });
            return;
          }

          const newPlayer = await storage.createPlayer({
            telegramUserId: telegramId.toString(),
            username: `telegram_${telegramId}_${msg.from?.first_name || 'player'}`,
            totalKush: 0,
            totalClicks: 0,
            perClickMultiplier: 1,
            autoIncomePerHour: 0,
            claimableTokens: 0,
            solanaNetwork: 'mainnet',
            walletSyncEnabled: false
          });

          const newAccountMessage = `
🎉 **New Account Created!**

Welcome to KushKlicker! Your new account is ready:
👤 **Username:** ${newPlayer.username}
💰 **Starting KUSH:** 0
🎮 **Ready to Play:** Start clicking to earn KUSH!

🎮 [Start Playing Now](${getWebAppUrl()})

Use /stats anytime to check your progress!
          `;
          
          bot.sendMessage(chatId, newAccountMessage, { parse_mode: 'Markdown' });
          console.log(`✅ Created new Telegram-linked account for user ${telegramId}`);
          return;
        }

        // Check if parameter is a Solana wallet address (extended for mainnet tokens)
        const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,55}$/;
        if (solanaAddressPattern.test(parameter)) {
          // Option 1: Link by wallet address
          console.log(`🔍 Searching for player with wallet address: ${parameter}`);
          const players = await storage.getAllPlayers();
          const existingPlayer = players.find(p => p.walletAddress === parameter);
          
          if (!existingPlayer) {
            bot.sendMessage(chatId, "❌ No account found with that wallet address! Please play the game first and register your wallet, then try linking again.");
            return;
          }

          // Check if this account already has Telegram linked
          if (existingPlayer.telegramUserId && existingPlayer.telegramUserId !== telegramId.toString()) {
            bot.sendMessage(chatId, "❌ This account is already linked to another Telegram user. Each account can only be linked to one Telegram account for security.");
            return;
          }

          // Add Telegram ID to existing account without changing username
          await storage.updatePlayer(existingPlayer.id, {
            telegramUserId: telegramId.toString(),
            lastActive: new Date()
          });

          const linkMessage = `
✅ **Account Linked Successfully!**

Your Telegram has been linked to your KushKlicker account!
👤 **Player:** ${existingPlayer.username}
👛 **Wallet:** \`${parameter}\`
💰 **KUSH:** ${existingPlayer.totalKush.toLocaleString()}
👆 **Clicks:** ${existingPlayer.totalClicks.toLocaleString()}

Use /stats to check your progress anytime!
          `;

          bot.sendMessage(chatId, linkMessage, { parse_mode: 'Markdown' });
          console.log(`✅ Linked Telegram user ${telegramId} to wallet ${parameter}`);
          return;
        }

        // Option 2: Link by username
        console.log(`🔍 Searching for player with username: ${parameter}`);
        const existingPlayer = await storage.getPlayerByUsername(parameter);
        
        if (!existingPlayer) {
          bot.sendMessage(chatId, `
❌ **Player Not Found**

No player found with username "${parameter}"

**Possible solutions:**
• Check your username spelling (case sensitive)
• Make sure you've played the game first
• Try linking with your wallet address instead
• Use \`/link new\` to create a new account

🎮 [Play KushKlicker](${getWebAppUrl()}) to create your account first
          `, { parse_mode: 'Markdown' });
          return;
        }

        // Check if this account already has Telegram linked
        if (existingPlayer.telegramUserId && existingPlayer.telegramUserId !== telegramId.toString()) {
          bot.sendMessage(chatId, "❌ This account is already linked to another Telegram user. Each account can only be linked to one Telegram account for security.");
          return;
        }

        // Add Telegram ID to existing account without changing username
        await storage.updatePlayer(existingPlayer.id, {
          telegramUserId: telegramId.toString(),
          lastActive: new Date()
        });

        const linkMessage = `
✅ **Account Linked Successfully!**

Your Telegram has been linked to **${existingPlayer.username}**
💰 **Your KUSH:** ${existingPlayer.totalKush.toLocaleString()}
👆 **Total Clicks:** ${existingPlayer.totalClicks.toLocaleString()}
${existingPlayer.discordUserId ? '🎮 **Also linked to Discord!**' : ''}

You can now use /stats to check your progress!
        `;

        bot.sendMessage(chatId, linkMessage, { parse_mode: 'Markdown' });
        console.log(`✅ Linked Telegram user ${telegramId} to username ${parameter}`);
        
      } catch (error) {
        console.error('Link error:', error);
        bot.sendMessage(chatId, "❌ Error linking your account. Please try again later.");
      }
    });

    // Wallet registration command
    bot.onText(/\/wallet (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      const walletAddress = match?.[1]?.trim();
      
      if (!telegramId) {
        bot.sendMessage(chatId, "❌ Unable to get your Telegram information.");
        return;
      }

      if (!walletAddress) {
        bot.sendMessage(chatId, "❌ Please provide a wallet address. Example: /wallet 7dHbWY...");
        return;
      }

      // Basic Solana address validation (extended for mainnet tokens)
      const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,55}$/;
      if (!solanaAddressPattern.test(walletAddress)) {
        bot.sendMessage(chatId, "❌ Invalid Solana wallet address format. Please provide a valid mainnet address.");
        return;
      }

      try {
        const players = await storage.getAllPlayers();
        const player = players.find(p => p.username.includes(`telegram_${telegramId}`));
        
        if (!player) {
          bot.sendMessage(chatId, "🔍 No linked account found. Use /link your_username to connect your account first!");
          return;
        }

        await storage.updatePlayer(player.id, { walletAddress });
        
        const successMessage = `
✅ Wallet Registered Successfully!

👛 Address: \`${walletAddress}\`
👤 Player: ${player.username}

Your Solana wallet has been safely registered for future reward distribution. We never connect to your wallet - only store the address for sending rewards.

🔒 Your wallet is secure and private.
        `;
        
        bot.sendMessage(chatId, successMessage, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error('Wallet registration error:', error);
        bot.sendMessage(chatId, "❌ Error registering wallet. Please try again later.");
      }
    });

    // Show wallet command
    bot.onText(/\/mywallet/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      
      if (!telegramId) {
        bot.sendMessage(chatId, "❌ Unable to get your Telegram information.");
        return;
      }

      try {
        const players = await storage.getAllPlayers();
        const player = players.find(p => p.username.includes(`telegram_${telegramId}`));
        
        if (!player) {
          bot.sendMessage(chatId, "🔍 No linked account found. Use /link your_username to connect your account first!");
          return;
        }

        if (!player.walletAddress) {
          const noWalletMessage = `
📭 No Wallet Registered

You haven't registered a Solana wallet yet. To receive future token rewards, register your wallet using:

/wallet YOUR_SOLANA_ADDRESS

Example: \`/wallet 7dHbWY1gP9fGv8K3m2C9V4u...\`

🔒 Safe & Secure: We only store your address for reward distribution. No wallet connection required.
          `;
          
          bot.sendMessage(chatId, noWalletMessage, { parse_mode: 'Markdown' });
          return;
        }

        const walletMessage = `
👛 Your Registered Wallet

Address: \`${player.walletAddress}\`
Network: Solana Mainnet
Player: ${player.username}

💰 Claimable $KUSH: ${player.claimableTokens || 0}

Use /balance to check your current $KUSH token balance!
        `;
        
        bot.sendMessage(chatId, walletMessage, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error('Wallet info error:', error);
        bot.sendMessage(chatId, "❌ Error fetching wallet info. Please try again later.");
      }
    });

    // Balance checking command
    bot.onText(/\/balance/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      
      if (!telegramId) {
        bot.sendMessage(chatId, "🚫 **Oops!** Can't identify your Telegram account. Please try again! 🤖", { parse_mode: 'Markdown' });
        return;
      }

      try {
        const players = await storage.getAllPlayers();
        // Look for player by telegramUserId first, then by username pattern
        let player = players.find(p => p.telegramUserId === telegramId.toString());
        if (!player) {
          player = players.find(p => p.username.includes(`telegram_${telegramId}`));
        }
        
        if (!player || !player.walletAddress) {
          const noWalletMessage = `
🚫 **No Wallet Connected!** 

🔐 You need to connect your Solana wallet first to check your $KUSH balance!

💡 **Quick Setup:**
• Use \`/link YOUR_WALLET_ADDRESS\` to connect
• Then check your balance anytime with \`/balance\`

🎮 Start earning $KUSH tokens in the game first! 🌿✨
          `;
          bot.sendMessage(chatId, noWalletMessage, { parse_mode: 'Markdown' });
          return;
        }

        const checkingMessage = `
🔍 **Scanning the Solana Blockchain...** 

⚡ Checking your $KUSH token balance
💎 Wallet: \`${player.walletAddress.slice(0,4)}...${player.walletAddress.slice(-4)}\`
🌐 Network: **Mainnet**

⏳ *This may take a few seconds...*
        `;
        bot.sendMessage(chatId, checkingMessage, { parse_mode: 'Markdown' });

        // Use mainnet only
        const balance = await mainnetTokenService.getTokenBalance(player.walletAddress);

        const displayName = player.username.replace(/telegram_\d+_/, '').replace('telegram_', '') || 'KUSH Mogul';
        const balanceEmoji = balance > 1000000 ? '🐋' : balance > 100000 ? '💪' : balance > 10000 ? '⭐' : balance > 1000 ? '🌱' : '🌿';
        const statusText = balance > 1000000 ? '**WHALE ALERT!** You\'re crushing it! 🚀' :
          balance > 100000 ? '**Big Player!** Keep stacking those tokens! 📈' :
          balance > 10000 ? '**Rising Star!** Your empire is growing! 🌟' :
          balance > 1000 ? '**Token Collector!** Every KUSH counts! 💚' :
          '**Ready to Earn?** Start clicking to build your KUSH empire! 🏗️';

        const balanceMessage = `
💎 **Your KUSH Empire Status** 💎

${balanceEmoji} **On-Chain Balance:** ${balance.toLocaleString()} $KUSH tokens
👤 **Player:** ${displayName}
👛 **Wallet:** \`${player.walletAddress.slice(0, 8)}...${player.walletAddress.slice(-4)}\`
🔥 **Network:** **Solana Mainnet** 🔥

🎮 **In-Game KUSH:** ${player.totalKush.toLocaleString()}
👆 **Total Clicks:** ${player.totalClicks.toLocaleString()}

${statusText}

🎮 [**Continue Playing →**](${getWebAppUrl()})
💰 **Earn more through the game!** 🎰
        `;
        
        bot.sendMessage(chatId, balanceMessage, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error('Balance check error:', error);
        bot.sendMessage(chatId, `🚨 **Oops!** Something went wrong while checking your balance!

❌ **Error:** ${(error as Error).message}

🔄 **Try again in a moment** - The blockchain might be busy! 
💡 Make sure your wallet is properly linked with \`/link\``, { parse_mode: 'Markdown' });
      }
    });

    // Admin panel command
    bot.onText(/\/admin/, async (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username;
      
      if (!isAdmin(username)) {
        bot.sendMessage(chatId, "🚫 Access denied. Admin privileges required.");
        return;
      }

      const adminPanelUrl = `${getWebAppUrl()}/admin`;
      const adminMessage = `
🔐 KushKlicker Admin Panel

Access your admin dashboard with full control over:
• Player management
• Token rewards tracking
• System statistics
• Pending airdrop management

🛡️ Authorized admin: @${username}
      `;
      
      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🛡️ Open Admin Panel', url: adminPanelUrl }]
          ]
        }
      };
      
      bot.sendMessage(chatId, adminMessage, keyboard);
    });

    // List players command (admin only)
    bot.onText(/\/players/, async (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username;
      
      if (!isAdmin(username)) {
        bot.sendMessage(chatId, "🚫 Access denied. Admin privileges required.");
        return;
      }

      try {
        const players = await storage.getAllPlayers();
        const totalPlayers = players.length;
        const withWallets = players.filter(p => p.walletAddress).length;
        const totalKush = players.reduce((sum, p) => sum + p.totalKush, 0);
        
        const statsMessage = `
👥 Player Statistics

📊 Total Players: ${totalPlayers}
💼 With Wallets: ${withWallets}
💰 Total KUSH: ${totalKush.toLocaleString()}
🖱️ Total Clicks: ${players.reduce((sum, p) => sum + p.totalClicks, 0).toLocaleString()}

🔝 Top 5 Players:
${players
  .sort((a, b) => b.totalKush - a.totalKush)
  .slice(0, 5)
  .map((p, i) => `${i + 1}. ${p.username}: ${p.totalKush.toLocaleString()} KUSH`)
  .join('\n')}
        `;
        
        bot.sendMessage(chatId, statsMessage);
      } catch (error) {
        console.error('Players list error:', error);
        bot.sendMessage(chatId, "❌ Error fetching player data.");
      }
    });

    // Garden command
    bot.onText(/\/garden/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      
      if (!telegramId) {
        bot.sendMessage(chatId, "🚫 **Oops!** Can't identify your Telegram account. Please try again!", { parse_mode: 'Markdown' });
        return;
      }

      try {
        const players = await storage.getAllPlayers();
        let player = players.find(p => p.telegramUserId === telegramId.toString());
        if (!player) {
          player = players.find(p => p.username.includes(`telegram_${telegramId}`));
        }
        
        if (!player) {
          bot.sendMessage(chatId, "🔍 No linked account found! Use /link [username] to connect your account first.", { parse_mode: 'Markdown' });
          return;
        }

        // Fetch garden data
        const gardenMessage = `
🌱 **Your Cannabis Garden** 🌱

👤 **Grower:** ${player.username.replace(/telegram_\d+_/, '').replace('telegram_', '') || 'KUSH Grower'}
🌿 **Active Plots:** Loading...
🧬 **Available Strains:** OG Kush, Blue Dream, White Widow & More
💰 **SEEDS Balance:** ${(player as any).seeds || 0}

🚀 **Quick Actions:**
🌱 Plant new strains in your plots
⚡ Harvest mature plants for KUSH
🧪 Cross-breed to create rare genetics
🏪 Buy supplies to boost your garden

[**🎮 Open Garden →**](${getWebAppUrl()})
        `;
        
        bot.sendMessage(chatId, gardenMessage, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error('Garden command error:', error);
        bot.sendMessage(chatId, "❌ Error fetching garden data. Please try again later.");
      }
    });

    // PvP Arena command
    bot.onText(/\/pvp/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id;
      
      if (!telegramId) {
        bot.sendMessage(chatId, "🚫 **Oops!** Can't identify your Telegram account. Please try again!", { parse_mode: 'Markdown' });
        return;
      }

      try {
        const players = await storage.getAllPlayers();
        let player = players.find(p => p.telegramUserId === telegramId.toString());
        if (!player) {
          player = players.find(p => p.username.includes(`telegram_${telegramId}`));
        }
        
        if (!player) {
          bot.sendMessage(chatId, "🔍 No linked account found! Use /link [username] to connect your account first.", { parse_mode: 'Markdown' });
          return;
        }

        const wins = (player as any).wins || 0;
        const losses = (player as any).losses || 0;
        const winRate = wins + losses > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : '0.0';
        const rank = wins > 50 ? '🏆 Legendary' : wins > 25 ? '💎 Master' : wins > 10 ? '⚔️ Warrior' : '🌿 Rookie';

        const pvpMessage = `
⚔️ **Your PvP Arena Stats** ⚔️

👤 **Fighter:** ${player.username.replace(/telegram_\d+_/, '').replace('telegram_', '') || 'KUSH Warrior'}
🏆 **Wins:** ${wins}
💀 **Losses:** ${losses}
📊 **Win Rate:** ${winRate}%
🥇 **Rank:** ${rank}
💰 **KUSH Balance:** ${player.totalKush?.toLocaleString() || 0}

🔥 **Arena Features:**
⚔️ Challenge other players to battles
🏆 Join tournaments with prize pools
💎 Use special abilities in combat
🎯 Wager KUSH on battle outcomes

[**🎮 Enter Arena →**](${getWebAppUrl()})
        `;
        
        bot.sendMessage(chatId, pvpMessage, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error('PvP command error:', error);
        bot.sendMessage(chatId, "❌ Error fetching PvP data. Please try again later.");
      }
    });

    // Callback query handlers
    bot.on('callback_query', async (callbackQuery) => {
      const msg = callbackQuery.message;
      const data = callbackQuery.data;
      const chatId = msg?.chat.id;
      const telegramId = callbackQuery.from?.id;
      
      if (!chatId || !telegramId) return;
      
      try {
        switch (data) {
          case 'my_stats':
            const player = await storage.getPlayerByUsername(`telegram_${telegramId}`);
            if (!player) {
              bot.sendMessage(chatId, "🔍 No linked account found! Use /link [username] to connect your account first.", { parse_mode: 'Markdown' });
            } else {
              const statsMessage = `
📊 **Your KushKlicker Stats**

👤 **Player:** ${player.username}
💰 **Total KUSH:** ${player.totalKush.toLocaleString()}
🖱️ **Total Clicks:** ${player.totalClicks.toLocaleString()}
⚡ **Per Click:** ${player.perClickMultiplier}x multiplier
📈 **Auto Income:** ${player.autoIncomePerHour}/hour
💎 **Claimable Tokens:** ${player.claimableTokens || 0}
📅 **Playing Since:** ${new Date(player.createdAt).toLocaleDateString()}

Keep clicking to grow your KUSH empire! 🚀
              `;
              const keyboard = {
                reply_markup: {
                  inline_keyboard: [
                    [{ text: '🎮 Continue Playing', web_app: { url: getWebAppUrl() } }],
                    [{ text: '🔄 Refresh Stats', callback_data: 'my_stats' }]
                  ]
                }
              };
              bot.sendMessage(chatId, statsMessage, { parse_mode: 'Markdown', reply_markup: keyboard.reply_markup });
            }
            break;
          case 'garden_info':
            const gardenInfoMessage = `
🌱 **Cannabis Garden System** 🌱

Grow your own cannabis strains and earn KUSH!

🔥 **Features:**
🌱 **Strain Genetics:** 6 premium strains available
⏰ **Growth Cycles:** Plant, tend, and harvest
🧪 **Cross-Breeding:** Create rare hybrid strains
💰 **SEEDS Economy:** Use SEEDS to buy supplies
🏆 **Harvest Rewards:** Earn KUSH from mature plants

💡 **Pro Tips:**
• Different strains have unique growth times
• Cross-breeding creates valuable hybrids
• Use fertilizer and water to boost yields
• Monitor your plots for optimal harvest timing

[**🎮 Start Growing →**](${getWebAppUrl()})
            `;
            bot.sendMessage(chatId, gardenInfoMessage, { parse_mode: 'Markdown' });
            break;
          case 'pvp_info':
            const pvpInfoMessage = `
⚔️ **PvP Battle Arena System** ⚔️

Fight other players in epic cannabis-themed battles!

🔥 **Features:**
⚔️ **Real-Time Battles:** Turn-based combat system
💥 **Special Abilities:** 4 unique combat skills
🏆 **Tournaments:** Enter tournaments with prizes
💰 **Wagering:** Bet KUSH on battle outcomes
🏆 **Leaderboards:** Climb the ranks
🎯 **Guild Wars:** Team battles (coming soon)

💡 **Battle Abilities:**
🔥 **Flame Strike:** High damage fire attack
❄️ **Ice Shard:** Freezing projectile
⚡ **Lightning Bolt:** Electric shock
☠️ **Poison Cloud:** Toxic area damage

[**🎮 Enter Arena →**](${getWebAppUrl()})
            `;
            bot.sendMessage(chatId, pvpInfoMessage, { parse_mode: 'Markdown' });
            break;
          case 'leaderboard':
            const leaderboard = await storage.getTopPlayers(10);
            let leaderboardMessage = "🏆 **KushKlicker Leaderboard** 🏆\\n\\n";
            leaderboard.forEach((player, index) => {
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;
              leaderboardMessage += `${medal} **${player.username}:** ${player.totalKush.toLocaleString()} KUSH\\n`;
            });
            leaderboardMessage += "\\n*Climb the ranks and become the ultimate KUSH mogul!* 🚀";
            const leaderboardKeyboard = {
              reply_markup: {
                inline_keyboard: [
                  [{ text: '🎮 Play to Climb Rankings', web_app: { url: getWebAppUrl() } }],
                  [{ text: '🔄 Refresh Leaderboard', callback_data: 'leaderboard' }]
                ]
              }
            };
            bot.sendMessage(chatId, leaderboardMessage, { parse_mode: 'Markdown', reply_markup: leaderboardKeyboard.reply_markup });
            break;
          case 'achievements':
            bot.sendMessage(chatId, `
🏆 **Achievement System**

Complete achievements in-game to earn bonus rewards:
• 🖱️ **Click Master** - Reach click milestones
• 💰 **KUSH Collector** - Accumulate $KUSH tokens
• 🏪 **Upgrade Expert** - Purchase upgrades
• 🎯 **Goal Achiever** - Complete special challenges
• 💡 **Grow Light Collector** - Collect rare grow lights

*There are 50+ achievements waiting for you!*

🎮 [Play Now to Start Achieving](${getWebAppUrl()})
            `, { parse_mode: 'Markdown' });
            break;
          case 'my_wallet':
            const walletPlayer = await storage.getPlayerByUsername(`telegram_${telegramId}`);
            if (!walletPlayer) {
              bot.sendMessage(chatId, "🔍 No linked account found! Use /link [username] to connect your account first.");
            } else if (!walletPlayer.walletAddress) {
              bot.sendMessage(chatId, `
📭 **No Wallet Registered**

To earn real $KUSH token rewards, register your Solana wallet:

**How to register:**
\`/wallet YOUR_SOLANA_ADDRESS\`

**Example:**
\`/wallet 7dHbWY1gP9fGv8K3m2C9V4u...\`

🔒 **Security:** We only store your address for reward distribution. No wallet connection required.
              `, { parse_mode: 'Markdown' });
            } else {
              bot.sendMessage(chatId, `
👛 **Your Registered Wallet**

**Address:** \`${walletPlayer.walletAddress}\`
**Network:** Solana Mainnet
**Player:** ${walletPlayer.username}
**Claimable Tokens:** ${walletPlayer.claimableTokens || 0}

Use /balance to check your current on-chain $KUSH token balance! 💰
              `, { parse_mode: 'Markdown' });
            }
            break;
          case 'check_balance':
            bot.sendMessage(chatId, "💰 Use the /balance command to check your current $KUSH token balance on-chain!");
            break;
          case 'link_help':
            bot.sendMessage(chatId, `
🔗 **Link Your Account**

Connect your Telegram to KushKlicker using your wallet address:

**🎯 Recommended Method:**
\`/link YOUR_SOLANA_WALLET_ADDRESS\`
Example: \`/link 7dHbWY1gP9fGv8K3m2C9V4u...\`

**Alternative Methods:**
\`/link YOUR_GAME_USERNAME\` - Link with game username
\`/link new\` - Create new mainnet account

**Setup Steps:**
1. 🎮 [Play KushKlicker](${getWebAppUrl()}) first  
2. 💰 Connect your Solana wallet in-game
3. 🔗 Use that wallet address with /link

**Benefits:**
✅ Track progress via Telegram
✅ Get stats and leaderboard updates
✅ Receive token reward notifications
✅ Access all bot features

*Your account will be securely linked!* 🔒
            `, { parse_mode: 'Markdown' });
            break;
          case 'show_help':
            const helpMessage = `
❓ **KushKlicker Help & Commands**

**🎮 Game Commands:**
• \`/start\` - Show main menu
• \`/stats\` - View your game statistics
• \`/leaderboard\` - See top players

**🔗 Account Commands:**
• \`/link [username]\` - Link Telegram to game account
• \`/wallet [address]\` - Register Solana wallet
• \`/mywallet\` - View wallet information
• \`/balance\` - Check on-chain token balance

**📋 Admin Commands:** *(admin only)*
• \`/admin\` - Access admin panel
• \`/players\` - View player statistics

**🎯 How to Play:**
1. Click the KUSH button to earn tokens
2. Buy upgrades to increase earning power
3. Complete achievements for bonuses
4. Connect Solana wallet for real rewards

**🔗 Links:**
• 🎮 [Play Game](${getWebAppUrl()})
• 💬 Support: @KushKlickerSupport

*Need help? Just ask!* 🌿
            `;
            bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
            break;
          case 'refresh_start':
            // Trigger the start command manually with proper keyboard
            const refreshMessage = `
🌿 Welcome to KushKlicker! 🌿

The ultimate cannabis-themed incremental clicker game! Build your KUSH empire from the ground up and earn real $KUSH token rewards!

🎯 **Game Features:**
• 🖱️ Click to earn KUSH tokens
• 🏪 Buy powerful upgrades & grow lights
• 🏆 Complete 50+ achievements for bonuses
• 🏆 Compete on global leaderboards
• 💰 Connect Solana wallet for real $KUSH token rewards
• 👥 Referral system for bonus earnings

🚀 **Quick Start Guide:**
1. Click "🎮 Play Now" to start the game
2. Start clicking to earn your first KUSH
3. Use /link to connect your account
4. Register your wallet with /wallet for rewards

💎 **Pro Tips:**
• Buy upgrades early to maximize earnings
• Complete achievements for bonus rewards
• Invite friends for referral bonuses
• Check /balance to see your $KUSH token rewards

Ready to become the ultimate KUSH mogul? 🚀
            `;
            
            const refreshKeyboard = {
              reply_markup: {
                inline_keyboard: [
                  [{ text: '🎮 Play Now', web_app: { url: getWebAppUrl() } }],
                  [
                    { text: '📊 My Stats', callback_data: 'my_stats' },
                    { text: '🏆 Leaderboard', callback_data: 'leaderboard' }
                  ],
                  [
                    { text: '🌱 Garden System', callback_data: 'garden_info' },
                    { text: '⚔️ PvP Arena', callback_data: 'pvp_info' }
                  ],
                  [
                    { text: '🎯 Achievements', callback_data: 'achievements' },
                    { text: '💰 My Wallet', callback_data: 'my_wallet' }
                  ],
                  [
                    { text: '🔗 Link Account', callback_data: 'link_help' },
                    { text: '💎 Check Balance', callback_data: 'check_balance' }
                  ],
                  [
                    { text: '❓ Help & Commands', callback_data: 'show_help' },
                    { text: '🔄 Refresh Menu', callback_data: 'refresh_start' }
                  ]
                ]
              }
            };
            
            bot.sendMessage(chatId, refreshMessage, refreshKeyboard);
            break;
          default:
            bot.sendMessage(chatId, "❓ Unknown action. Use /start to see the main menu.");
        }
      } catch (error) {
        console.error('Callback query error:', error);
        bot.sendMessage(chatId, "❌ Error processing request. Please try again later.");
      }
      
      bot.answerCallbackQuery(callbackQuery.id);
    });

    // Set the menu button URL programmatically
    const menuButtonUrl = getWebAppUrl();
    
    bot.setChatMenuButton({
      menu_button: {
        type: 'web_app',
        text: '🎮 Play KushKlicker',
        web_app: { url: menuButtonUrl }
      }
    }).then(() => {
      console.log('✅ Menu button URL updated successfully!');
    }).catch((error) => {
      console.warn('⚠️ Could not set menu button (may need manual setup via BotFather):', error.message);
    });

    console.log('🤖 Telegram bot started successfully!');
    
    // Handle bot errors with conflict detection
    bot.on('polling_error', (error: any) => {
      if (error.code === 409 || error.message?.includes('409') || error.message?.includes('Conflict')) {
        console.error('🚨 Bot conflict detected - another instance is running:', error.message);
        console.log('🛑 Stopping this bot instance to prevent conflicts...');
        
        // Stop polling and clear instance
        bot.stopPolling();
        botInstance = null;
        
        // Don't restart automatically to prevent infinite loops
        console.log('⚠️ Bot stopped due to conflicts. Manual restart required.');
      } else {
        console.error('Telegram bot polling error:', error);
      }
    });
    
    // Store the bot instance
    botInstance = bot;
    return bot;
  } catch (error) {
    console.error('Failed to start Telegram bot:', error);
  }
}

// Export function to send notifications to all Telegram users
export async function sendTelegramNotification(message: string) {
  try {
    if (!botInstance) {
      const bot = startTelegramBot();
      if (!bot) {
        throw new Error('Telegram bot not available');
      }
      botInstance = bot;
    }

    // Get all players with Telegram usernames OR telegramUserId
    const players = await storage.getAllPlayers();
    const telegramPlayers = players.filter(p => 
      p.username.includes('telegram_') || p.telegramUserId
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
    const errors: string[] = [];

    // Send notification to each Telegram user
    for (const player of telegramPlayers) {
      try {
        let chatId: number | null = null;
        
        // Try to get chat ID from telegramUserId field first
        if (player.telegramUserId) {
          chatId = parseInt(player.telegramUserId);
        } else {
          // Fallback: Extract Telegram ID from username (format: telegram_USERID_originalname)
          const userIdMatch = player.username.match(/telegram_(\d+)_/);
          if (userIdMatch) {
            chatId = parseInt(userIdMatch[1]);
          }
        }
        
        if (chatId) {
          const notificationMessage = `
🔔 **Admin Notification** 🔔

${message}

────────────────────
💬 From the KushKlicker team
          `;

          await botInstance.sendMessage(chatId, notificationMessage, { parse_mode: 'Markdown' });
          sentCount++;
          console.log(`✅ Notification sent to ${player.username} (${chatId})`);
        } else {
          console.warn(`⚠️ No valid chat ID found for ${player.username}`);
        }
      } catch (error: any) {
        errorCount++;
        errors.push(`User ${player.username}: ${error.message}`);
        console.error(`Failed to send notification to ${player.username}:`, error);
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
    console.error('Telegram notification error:', error);
    return {
      success: false,
      message: (error as Error).message,
      count: 0
    };
  }
}

// Export function to stop bot for graceful shutdown
export function stopTelegramBot() {
  if (botInstance) {
    console.log('🛑 Stopping Telegram bot...');
    try {
      // Stop polling first
      botInstance.stopPolling({ cancel: true, reason: 'Server shutdown' });
      
      // Clear webhooks if any
      if (process.env.NODE_ENV === 'production') {
        botInstance.deleteWebHook().catch((error) => {
          console.warn('⚠️ Error deleting webhook:', error);
        });
      }
      
      // Clear instance
      botInstance = null;
      console.log('✅ Telegram bot stopped successfully');
    } catch (error) {
      console.error('❌ Error stopping Telegram bot:', error);
      botInstance = null; // Force clear instance even on error
    }
  }
}