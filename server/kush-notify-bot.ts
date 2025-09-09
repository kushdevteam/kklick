import TelegramBot from 'node-telegram-bot-api';

// KushNotifyBot - Separate bot for group chat notifications
let notifyBotInstance: TelegramBot | null = null;
let groupChatId: string | null = null;

export function startKushNotifyBot() {
  const token = process.env.KUSH_NOTIFY_BOT_TOKEN;
  
  if (!token) {
    console.log('KushNotifyBot token not found, skipping group notification bot initialization');
    return null;
  }

  if (notifyBotInstance) {
    console.log('🔔 KushNotifyBot already running');
    return notifyBotInstance;
  }
  
  console.log('🔔 Initializing KushNotifyBot with enhanced conflict prevention...');

  try {
    // Stop any existing instance first
    if (notifyBotInstance) {
      try {
        notifyBotInstance.stopPolling();
        notifyBotInstance = null;
      } catch (error) {
        console.warn('⚠️ Error stopping existing KushNotifyBot:', error);
      }
    }

    const bot = new TelegramBot(token, { polling: { autoStart: false } });
    notifyBotInstance = bot;

    // Start polling with retry mechanism
    let startAttempts = 0;
    const maxAttempts = 3;
    
    const startPolling = async () => {
      try {
        await bot.startPolling();
        console.log('✅ KushNotifyBot polling started successfully');
      } catch (error: any) {
        startAttempts++;
        console.error(`❌ KushNotifyBot start attempt ${startAttempts} failed:`, error.message);
        
        if (startAttempts < maxAttempts && 
            (error.code === 409 || error.message?.includes('409') || error.message?.includes('Conflict'))) {
          console.log(`🔄 Retrying KushNotifyBot in 3 seconds... (${startAttempts}/${maxAttempts})`);
          setTimeout(startPolling, 3000);
        } else {
          console.error('🚨 Failed to start KushNotifyBot after multiple attempts');
          notifyBotInstance = null;
        }
      }
    };
    
    startPolling();

    // Handle incoming messages to detect when bot is added to groups
    bot.on('message', (msg) => {
      const chatType = msg.chat.type;
      
      // If this is a group or supergroup, store the chat ID
      if (chatType === 'group' || chatType === 'supergroup') {
        groupChatId = msg.chat.id.toString();
        console.log(`🔔 KushNotifyBot detected group chat: ${msg.chat.title} (ID: ${groupChatId})`);
      }
    });

    // Handle bot commands
    bot.onText(/\/setup/, (msg) => {
      const chatId = msg.chat.id;
      const chatType = msg.chat.type;
      
      if (chatType === 'group' || chatType === 'supergroup') {
        groupChatId = chatId.toString();
        bot.sendMessage(chatId, `🔔 KushNotifyBot setup complete!\n\nThis group will now receive notifications when someone buys $KUSH tokens! 🚀\n\n💰 Token: FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL`);
        console.log(`✅ Group notifications enabled for chat ID: ${groupChatId}`);
      } else {
        bot.sendMessage(chatId, '❌ This command only works in group chats. Add me to your group first!');
      }
    });

    // Handle errors with conflict detection
    bot.on('polling_error', (error: any) => {
      if (error.code === 409 || error.message?.includes('409') || error.message?.includes('Conflict')) {
        console.error('🚨 KushNotifyBot conflict detected - another instance is running:', error.message);
        console.log('🛑 Stopping this notify bot instance to prevent conflicts...');
        
        // Stop polling and clear instance
        bot.stopPolling();
        notifyBotInstance = null;
        
        // Don't restart automatically to prevent infinite loops
        console.log('⚠️ KushNotifyBot stopped due to conflicts. Manual restart required.');
      } else {
        console.error('KushNotifyBot polling error:', error);
      }
    });

    console.log('🔔 KushNotifyBot started successfully!');
    return bot;

  } catch (error) {
    console.error('Failed to start KushNotifyBot:', error);
    return null;
  }
}

// Export function to get notify bot instance for 2FA fallback
export function getNotifyBotInstance(): TelegramBot | null {
  return notifyBotInstance;
}

// Function to send purchase notifications to the group
export async function sendPurchaseNotification(buyerInfo: {
  walletAddress?: string;
  amount?: number;
  value?: number;
  txHash?: string;
}) {
  try {
    if (!notifyBotInstance) {
      console.log('KushNotifyBot not initialized, starting bot...');
      notifyBotInstance = startKushNotifyBot() || null;
      if (!notifyBotInstance) {
        throw new Error('KushNotifyBot failed to initialize');
      }
    }

    if (!groupChatId) {
      console.log('❌ No group chat configured for notifications. Use /setup in your group chat first.');
      return { success: false, message: 'No group chat configured' };
    }

    // Format the purchase notification message
    const walletShort = buyerInfo.walletAddress 
      ? `${buyerInfo.walletAddress.slice(0, 4)}...${buyerInfo.walletAddress.slice(-4)}`
      : 'Unknown';

    const amountText = buyerInfo.amount 
      ? `${buyerInfo.amount.toLocaleString()} KUSH` 
      : '$KUSH tokens';

    const valueText = buyerInfo.value 
      ? ` (~$${buyerInfo.value.toFixed(2)})`
      : '';

    const excitementLevel = buyerInfo.amount 
      ? (buyerInfo.amount >= 1000000 ? '🔥🔥🔥 WHALE ALERT 🔥🔥🔥' :
         buyerInfo.amount >= 100000 ? '💎 BIG PURCHASE 💎' :
         buyerInfo.amount >= 10000 ? '🚀 MAJOR BUY 🚀' : '🌟 FRESH PURCHASE 🌟')
      : '🚀 TOKEN PURCHASE 🚀';

    const message = `
${excitementLevel}

💰 **Someone just bought ${amountText}${valueText}!**
👤 **Buyer:** \`${walletShort}\`
🏷️ **Token:** **KUSH** 🌿
🔗 **Contract:** \`FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL\`
🌐 **Network:** **Solana Mainnet** ⚡

🎮 **Play KushKlicker and earn $KUSH rewards!**
📈 **Join the empire:** https://kushklicker.com

💎 *TO THE MOON!* 🚀🌕
    `;

    // Send the notification with the Solana gif
    await notifyBotInstance.sendAnimation(
      groupChatId,
      'https://media1.tenor.com/m/NLHYdGDUr0AAAAAd/solana-sol.gif',
      {
        caption: message,
        parse_mode: 'Markdown'
      }
    );

    console.log(`✅ Purchase notification sent to group chat (${groupChatId})`);
    return { success: true, message: 'Notification sent successfully' };

  } catch (error: any) {
    console.error('Error sending purchase notification:', error);
    return { success: false, message: error.message || 'Failed to send notification' };
  }
}

// Function to test the notification system
export async function testGroupNotification() {
  return await sendPurchaseNotification({
    walletAddress: 'C3QDmfXPAmtZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL',
    amount: 1000000,
    value: 50.00,
    txHash: 'test_transaction'
  });
}

// Get current group chat info
export function getGroupChatInfo() {
  return {
    botActive: !!notifyBotInstance,
    groupConfigured: !!groupChatId,
    groupChatId: groupChatId
  };
}

// Export function to stop notify bot for graceful shutdown
export function stopKushNotifyBot() {
  if (notifyBotInstance) {
    console.log('🛑 Stopping KushNotifyBot...');
    try {
      // Stop polling with cancel option
      notifyBotInstance.stopPolling({ cancel: true, reason: 'Server shutdown' });
      
      // Clear instance and group chat ID
      notifyBotInstance = null;
      groupChatId = null;
      console.log('✅ KushNotifyBot stopped successfully');
    } catch (error) {
      console.error('❌ Error stopping KushNotifyBot:', error);
      // Force clear instance even on error
      notifyBotInstance = null;
      groupChatId = null;
    }
  }
}
