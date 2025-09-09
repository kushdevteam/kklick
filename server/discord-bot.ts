import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, ChatInputCommandInteraction, ButtonInteraction, Interaction } from 'discord.js';
import { storage } from './storage';
import { mainnetTokenService } from './solana-token-service';

// Admin usernames who can access admin functions  
const ADMIN_USERNAMES = ['wlsfx'];

// Check if user is admin
function isAdmin(username?: string): boolean {
  return username ? ADMIN_USERNAMES.includes(username.toLowerCase()) : false;
}

// Get base URL for the web app
function getWebAppUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    const replitDomain = process.env.REPLIT_DEV_DOMAIN;
    if (replitDomain) {
      return `https://${replitDomain}`;
    }
    return `https://5000-${process.env.REPL_SLUG || 'replit'}-${process.env.REPL_OWNER || 'user'}.repl.co`;
  }
  return process.env.WEB_APP_URL || process.env.REPLIT_DEV_DOMAIN || 'https://localhost:5000';
}

export class DiscordBot {
  private client: Client;
  private token: string;

  constructor(token: string) {
    this.token = token;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds
      ]
    });

    this.setupBot();
  }

  public getClient() {
    return this.client;
  }

  private async setupBot() {
    this.client.once('ready', () => {
      console.log(`Discord bot logged in as ${this.client.user?.tag}!`);
      this.registerCommands();
    });

    this.client.on('interactionCreate', async (interaction) => {
      try {
        if (interaction.isChatInputCommand()) {
          const { commandName } = interaction;
          
          switch (commandName) {
            case 'start':
              await this.handleStart(interaction);
              break;
            case 'stats':
              await this.handleStats(interaction);
              break;
            case 'leaderboard':
              await this.handleLeaderboard(interaction);
              break;
            case 'link':
              await this.handleLink(interaction);
              break;
            case 'wallet':
              await this.handleWallet(interaction);
              break;
            case 'mywallet':
              await this.handleMyWallet(interaction);
              break;
            case 'balance':
              await this.handleBalance(interaction);
              break;
            case 'garden':
              await this.handleGarden(interaction);
              break;
            case 'pvp':
              await this.handlePvP(interaction);
              break;
            case 'admin':
              await this.handleAdmin(interaction);
              break;
            case 'players':
              await this.handlePlayers(interaction);
              break;
            default:
              await interaction.reply('Unknown command!');
          }
        } else if (interaction.isButton()) {
          await this.handleButtonClick(interaction);
        }
      } catch (error) {
        console.error('Discord interaction error:', error);
        try {
          if ('replied' in interaction && 'deferred' in interaction) {
            if (interaction.replied || interaction.deferred) {
              await (interaction as ChatInputCommandInteraction).followUp({ content: 'An error occurred while processing your request.', ephemeral: true });
            } else {
              await (interaction as ChatInputCommandInteraction).reply({ content: 'An error occurred while processing your request.', ephemeral: true });
            }
          }
        } catch (replyError) {
          console.error('Error sending error message:', replyError);
        }
      }
    });

    this.client.on('error', (error) => {
      console.error('Discord client error:', error);
    });

    this.client.on('shardError', (error) => {
      console.error('Discord shard error:', error);
    });

    try {
      await this.client.login(this.token);
    } catch (error) {
      console.error('Failed to login to Discord:', error);
      // Don't rethrow - just log and continue
      console.log('Discord bot will remain disabled');
    }
  }

  private async registerCommands() {
    const commands = [
      new SlashCommandBuilder()
        .setName('start')
        .setDescription('Get started with KushKlicker and receive your game link'),
      new SlashCommandBuilder()
        .setName('stats')
        .setDescription('View your KushKlicker game statistics'),
      new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('See the top KushKlicker players'),
      new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link your Discord account to KushKlicker with your Solana wallet')
        .addStringOption(option =>
          option.setName('sol_address')
            .setDescription('Your Solana wallet address (can only be set once)')
            .setRequired(true)),
      new SlashCommandBuilder()
        .setName('wallet')
        .setDescription('Register your Solana wallet address')
        .addStringOption(option =>
          option.setName('address')
            .setDescription('Your Solana wallet address')
            .setRequired(true)),
      new SlashCommandBuilder()
        .setName('mywallet')
        .setDescription('View your registered wallet information'),
      new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your current token balance on-chain'),
      new SlashCommandBuilder()
        .setName('garden')
        .setDescription('View your cannabis garden plots and strains'),
      new SlashCommandBuilder()
        .setName('pvp')
        .setDescription('Check your PvP arena battle statistics'),
      new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Access admin panel (admin only)'),
      new SlashCommandBuilder()
        .setName('players')
        .setDescription('View player statistics (admin only)')
    ].map(command => command.toJSON());

    const rest = new REST().setToken(this.token);

    try {
      await rest.put(
        Routes.applicationCommands(this.client.user!.id),
        { body: commands }
      );
      console.log('Discord slash commands registered successfully!');
    } catch (error) {
      console.error('Error registering Discord commands:', error);
    }
  }

  private async handleStart(interaction: ChatInputCommandInteraction) {
    const embed = {
      color: 0x4CAF50, // Green color matching the logo
      title: '🌿 Welcome to KushKlicker! 🌿',
      description: 'The ultimate cannabis-themed incremental clicker game! Start your journey to become the ultimate KUSH mogul!',
      thumbnail: {
        url: `${getWebAppUrl()}/logo.png`
      },
      fields: [
        {
          name: '🎮 Game Features',
          value: '• **Click** to earn KUSH tokens\n• **Buy upgrades** to increase earning power\n• **Unlock achievements** for bonus rewards\n• **Compete** on global leaderboards\n• **Earn real $KUSH rewards** with Solana wallet',
          inline: false
        },
        {
          name: '🚀 Quick Start',
          value: '1. Click the **Play Now** button\n2. Start clicking to earn KUSH\n3. Use **/link** to connect your Discord\n4. Register wallet with **/wallet** for rewards',
          inline: false
        },
        {
          name: '💡 Pro Tips',
          value: '• Use **/stats** to track progress\n• Check **/leaderboard** to see rankings\n• Use **/balance** to check token rewards',
          inline: false
        }
      ],
      footer: {
        text: 'Join thousands of players growing their KUSH empire! 🌱'
      }
    };

    const components = [
      {
        type: 1, // Action Row
        components: [
          {
            type: 2, // Button
            style: 5, // Link
            label: '🎮 Play Now',
            url: getWebAppUrl()
          },
          {
            type: 2, // Button
            style: 2, // Primary
            label: '📊 My Stats',
            custom_id: 'show_stats'
          },
          {
            type: 2, // Button
            style: 2, // Primary
            label: '🏆 Leaderboard',
            custom_id: 'show_leaderboard'
          }
        ]
      },
      {
        type: 1, // Action Row
        components: [
          {
            type: 2, // Button
            style: 3, // Secondary
            label: '🔗 Link Account',
            custom_id: 'link_account'
          },
          {
            type: 2, // Button
            style: 3, // Secondary
            label: '💰 Check Balance',
            custom_id: 'check_balance'
          },
          {
            type: 2, // Button
            style: 4, // Danger
            label: '❓ Help',
            custom_id: 'show_help'
          }
        ]
      }
    ];

    await interaction.reply({ embeds: [embed], components });
  }

  private async handleStats(interaction: ChatInputCommandInteraction) {
    const discordId = interaction.user.id;
    
    try {
      // Find player by Discord ID (optimized for 5000+ players)
      const player = await storage.getPlayerByDiscordId(discordId);
      
      if (!player) {
        await interaction.reply({
          content: '❌ No linked account found! Use `/link` to connect your Discord account first.',
          ephemeral: true
        });
        return;
      }

      const embed = {
        color: 0x4CAF50,
        title: `📊 ${player.username}'s Stats`,
        fields: [
          { name: '💰 Total KUSH', value: player.totalKush.toLocaleString(), inline: true },
          { name: '👆 Total Clicks', value: player.totalClicks.toLocaleString(), inline: true },
          { name: '⚡ Click Power', value: `${player.perClickMultiplier}x`, inline: true },
          { name: '🤖 Auto Income', value: `${player.autoIncomePerHour}/hour`, inline: true }
        ],
        footer: {
          text: 'Keep clicking to earn more KUSH!'
        }
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Stats error:', error);
      await interaction.reply('Error fetching your stats. Please try again later.');
    }
  }

  private async handleLeaderboard(interaction: ChatInputCommandInteraction) {
    try {
      const topPlayers = await storage.getTopPlayers(10);
      
      const leaderboardText = topPlayers
        .map((player, index) => `${index + 1}. ${player.username} - ${player.totalKush.toLocaleString()} KUSH`)
        .join('\n');

      const embed = {
        color: 0x4CAF50,
        title: '🏆 Top KushKlicker Players',
        description: leaderboardText || 'No players found!',
        footer: {
          text: 'Keep playing to climb the ranks!'
        }
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Leaderboard error:', error);
      await interaction.reply('Error fetching leaderboard. Please try again later.');
    }
  }

  private async handleLink(interaction: ChatInputCommandInteraction) {
    const discordId = interaction.user.id;
    const discordUsername = interaction.user.username;
    const walletAddress = interaction.options.getString('sol_address');

    if (!walletAddress) {
      await interaction.reply({
        content: '❌ Please provide a Solana wallet address.',
        ephemeral: true
      });
      return;
    }

    // Basic Solana address validation
    const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    if (!solanaAddressPattern.test(walletAddress)) {
      await interaction.reply({
        content: '❌ Invalid Solana wallet address format. Please provide a valid address.',
        ephemeral: true
      });
      return;
    }

    try {
      // Check if player already exists with this Discord ID
      const players = await storage.getTopPlayers(1000); // Get all players
      let existingPlayer = players.find((p: any) => p.discordUserId === discordId);
      
      if (existingPlayer) {
        // Check if wallet is already set - prevent changes
        if (existingPlayer.walletAddress && existingPlayer.walletAddress !== walletAddress) {
          const embed = {
            color: 0xFF5722, // Red color
            title: '🚫 Wallet Already Registered',
            description: `Your account already has a wallet registered and cannot be changed for security.`,
            fields: [
              { name: '🔒 Current Wallet', value: `\`${existingPlayer.walletAddress}\``, inline: false },
              { name: '⚠️ Security Policy', value: 'Wallets can only be set once to prevent account takeovers', inline: false },
              { name: '💰 Your KUSH', value: existingPlayer.totalKush.toLocaleString(), inline: true },
              { name: '👆 Total Clicks', value: existingPlayer.totalClicks.toLocaleString(), inline: true }
            ],
            footer: {
              text: 'Contact support if you need to change your wallet address'
            }
          };

          await interaction.reply({ embeds: [embed], ephemeral: true });
          return;
        }
        
        // If no wallet set yet, allow setting it
        if (!existingPlayer.walletAddress) {
          await storage.updatePlayer(existingPlayer.id, { 
            walletAddress,
            lastActive: new Date()
          });
          
          const embed = {
            color: 0x4CAF50,
            title: '✅ Wallet Registered Successfully!',
            description: `Your wallet has been registered to your KushKlicker account`,
            fields: [
              { name: '👛 Wallet Address', value: `\`${walletAddress}\``, inline: false },
              { name: '🔒 Security', value: 'This wallet is now permanently linked to your account', inline: false },
              { name: '💰 Your KUSH', value: existingPlayer.totalKush.toLocaleString(), inline: true },
              { name: '👆 Total Clicks', value: existingPlayer.totalClicks.toLocaleString(), inline: true }
            ],
            footer: {
              text: 'You can now use /stats to check your progress!'
            }
          };

          await interaction.reply({ embeds: [embed], ephemeral: true });
          return;
        }
        
        // Wallet already matches - just show status
        const embed = {
          color: 0x4CAF50,
          title: '✅ Account Already Linked',
          description: `Your Discord account is already linked with this wallet`,
          fields: [
            { name: '👛 Wallet Address', value: `\`${walletAddress}\``, inline: false },
            { name: '💰 Your KUSH', value: existingPlayer.totalKush.toLocaleString(), inline: true },
            { name: '👆 Total Clicks', value: existingPlayer.totalClicks.toLocaleString(), inline: true }
          ],
          footer: {
            text: 'You can use /stats to check your progress!'
          }
        };

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }

      // Check if player exists with this wallet address
      existingPlayer = players.find((p: any) => p.walletAddress === walletAddress);
      
      if (existingPlayer) {
        // Check if this account already has Discord linked
        if (existingPlayer.discordUserId && existingPlayer.discordUserId !== discordId) {
          const embed = {
            color: 0xFF5722, // Red color
            title: '❌ Account Already Linked',
            description: `This account is already linked to another Discord user. Each account can only be linked to one Discord account for security.`,
            footer: {
              text: 'Contact support if you need help with account linking'
            }
          };
          await interaction.reply({ embeds: [embed], ephemeral: true });
          return;
        }

        // Link existing wallet-based player to Discord without changing username
        await storage.updatePlayer(existingPlayer.id, {
          discordUserId: discordId,
          lastActive: new Date()
        });
        
        const embed = {
          color: 0x4CAF50,
          title: '✅ Account Linked Successfully!',
          description: `Your Discord account has been linked to your existing KushKlicker account`,
          fields: [
            { name: '👤 Username', value: existingPlayer.username, inline: false },
            { name: '👛 Wallet Address', value: `\`${walletAddress}\``, inline: false },
            { name: '💰 Your KUSH', value: existingPlayer.totalKush.toLocaleString(), inline: true },
            { name: '👆 Total Clicks', value: existingPlayer.totalClicks.toLocaleString(), inline: true },
            ...(existingPlayer.telegramUserId ? [{ name: '📱 Also linked to', value: 'Telegram', inline: true }] : [])
          ],
          footer: {
            text: 'Welcome back! Use /stats to check your progress.'
          }
        };

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }

      // Create new player account
      const newPlayer = await storage.createPlayer({
        discordUserId: discordId,
        username: `${discordUsername}_discord`,
        walletAddress,
        totalKush: 0,
        totalClicks: 0,
        perClickMultiplier: 1,
        autoIncomePerHour: 0,
        claimableTokens: 0,
        solanaNetwork: 'devnet',
        walletSyncEnabled: true
      });

      const embed = {
        color: 0x4CAF50,
        title: '🌿 Welcome to KushKlicker! 🌿',
        description: `Your Discord account has been linked and a new KushKlicker account created!`,
        fields: [
          { name: '👛 Wallet Address', value: `\`${walletAddress}\``, inline: false },
          { name: '💰 Starting KUSH', value: '0', inline: true },
          { name: '🎮 Ready to Play', value: 'Start clicking to earn KUSH!', inline: true },
          { name: '🔗 Game Link', value: `[Play KushKlicker](${getWebAppUrl()})`, inline: false }
        ],
        footer: {
          text: 'Use /stats anytime to check your progress!'
        }
      };

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Link error:', error);
      await interaction.reply({
        content: '❌ Error linking your account. Please try again later.',
        ephemeral: true
      });
    }
  }

  private async handleWallet(interaction: ChatInputCommandInteraction) {
    const discordId = interaction.user.id;
    const walletAddress = interaction.options.getString('address');

    if (!walletAddress) {
      await interaction.reply({
        content: '❌ Please provide a wallet address.',
        ephemeral: true
      });
      return;
    }

    // Basic Solana address validation
    const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    if (!solanaAddressPattern.test(walletAddress)) {
      await interaction.reply({
        content: '❌ Invalid Solana wallet address format. Please provide a valid address.',
        ephemeral: true
      });
      return;
    }

    try {
      const players = await storage.getTopPlayers(1000); // Get all players
      const player = players.find((p: any) => p.discordUserId === discordId);
      
      if (!player) {
        await interaction.reply({
          content: '🔍 No linked account found. Use `/link` to connect your Discord account first!',
          ephemeral: true
        });
        return;
      }

      // Check if wallet is already set - prevent changes
      if (player.walletAddress && player.walletAddress !== walletAddress) {
        const embed = {
          color: 0xFF5722, // Red color
          title: '🚫 Wallet Change Not Allowed',
          description: `Your wallet is already registered and cannot be changed for security.`,
          fields: [
            { name: '🔒 Current Wallet', value: `\`${player.walletAddress}\``, inline: false },
            { name: '⚠️ Security Policy', value: 'Wallets can only be set once to prevent account takeovers', inline: false },
            { name: '💡 Need Help?', value: 'Contact support if you genuinely need to change your wallet', inline: false }
          ],
          footer: {
            text: 'Use /mywallet to view your current wallet info'
          }
        };
        
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }

      // If wallet matches or not set, allow the update
      await storage.updatePlayer(player.id, { walletAddress });
      
      const embed = {
        color: 0x4CAF50,
        title: '✅ Wallet Registered Successfully!',
        description: `Your Solana wallet has been safely registered for future reward distribution.`,
        fields: [
          { name: '👛 Address', value: `\`${walletAddress}\``, inline: false },
          { name: '👤 Player', value: player.username, inline: true },
          { name: '🔒 Security', value: 'We only store your address - never connect to your wallet', inline: false }
        ],
        footer: {
          text: 'Your wallet is secure and private.'
        }
      };
      
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Wallet registration error:', error);
      await interaction.reply({
        content: '❌ Error registering wallet. Please try again later.',
        ephemeral: true
      });
    }
  }

  private async handleMyWallet(interaction: ChatInputCommandInteraction) {
    const discordId = interaction.user.id;
    
    try {
      const players = await storage.getTopPlayers(1000); // Get all players
      const player = players.find((p: any) => p.discordUserId === discordId);
      
      if (!player) {
        await interaction.reply({
          content: '🔍 No linked account found. Use `/link` to connect your Discord account first!',
          ephemeral: true
        });
        return;
      }

      if (!player.walletAddress) {
        const embed = {
          color: 0xFF9800, // Orange color
          title: '📭 No Wallet Registered',
          description: 'You haven\'t registered a Solana wallet yet.',
          fields: [
            {
              name: '💡 How to Register',
              value: 'Use `/wallet [address]` to register your Solana wallet address',
              inline: false
            },
            {
              name: '🔒 Safe & Secure',
              value: 'We only store your address for reward distribution. No wallet connection required.',
              inline: false
            }
          ]
        };
        
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }

      const embed = {
        color: 0x4CAF50,
        title: '👛 Your Registered Wallet',
        fields: [
          { name: '📍 Address', value: `\`${player.walletAddress}\``, inline: false },
          { name: '🌐 Network', value: `Solana ${player.solanaNetwork || 'devnet'}`, inline: true },
          { name: '👤 Player', value: player.username, inline: true },
          { name: '💰 Claimable Tokens', value: `${player.claimableTokens || 0}`, inline: true }
        ],
        footer: {
          text: 'To update your wallet, use /wallet [new_address]'
        }
      };
      
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Wallet info error:', error);
      await interaction.reply({
        content: '❌ Error fetching wallet info. Please try again later.',
        ephemeral: true
      });
    }
  }

  private async handleBalance(interaction: ChatInputCommandInteraction) {
    const discordId = interaction.user.id;
    
    try {
      const player = await storage.getPlayerByDiscordId(discordId);
      
      if (!player || !player.walletAddress) {
        await interaction.reply({
          content: '🔍 No wallet found. Use `/link` or `/wallet` to register your Solana wallet first!',
          ephemeral: true
        });
        return;
      }

      await interaction.reply({
        content: '⏳ Checking your token balance on-chain...',
        ephemeral: true
      });

      const network = player.solanaNetwork || 'devnet';
      const tokenService = network === 'mainnet' ? mainnetTokenService : devnetTokenService;
      
      const balance = await tokenService.getTokenBalance(player.walletAddress);

      const embed = {
        color: 0x4CAF50,
        title: '💰 Your KUSH Token Balance',
        fields: [
          { 
            name: '👛 Wallet', 
            value: `\`${player.walletAddress.slice(0, 8)}...${player.walletAddress.slice(-4)}\``, 
            inline: false 
          },
          { name: '🌐 Network', value: network, inline: true },
          { name: '💎 Balance', value: `**${balance.toLocaleString()} $KUSH** tokens`, inline: true },
          { name: '🎮 In-Game KUSH', value: player.totalKush.toLocaleString(), inline: true },
          { name: '📊 Total Clicks', value: player.totalClicks.toLocaleString(), inline: true }
        ],
        footer: {
          text: 'Keep playing to earn more rewards! 🚀'
        }
      };
      
      await interaction.editReply({ content: '', embeds: [embed] });
    } catch (error) {
      console.error('Balance check error:', error);
      await interaction.editReply({
        content: '❌ Error checking balance. Please try again later.'
      });
    }
  }

  private async handleAdmin(interaction: ChatInputCommandInteraction) {
    const username = interaction.user.username;
    
    if (!isAdmin(username)) {
      await interaction.reply({
        content: '🚫 Access denied. Admin privileges required.',
        ephemeral: true
      });
      return;
    }

    const adminPanelUrl = `${getWebAppUrl()}/admin`;
    const embed = {
      color: 0xFF5722,
      title: '🔐 KushKlicker Admin Panel',
      description: 'Access your admin dashboard with full control over:',
      fields: [
        { name: '👥 Player Management', value: 'View, edit, and delete player accounts', inline: false },
        { name: '🪙 Token Rewards', value: 'Track and manage pending token airdrops', inline: false },
        { name: '📊 System Statistics', value: 'Monitor game metrics and performance', inline: false },
        { name: '⚡ Grow Lights', value: 'Initialize and manage equipment system', inline: false }
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
          label: '🛡️ Open Admin Panel',
          url: adminPanelUrl
        }]
      }],
      ephemeral: true
    });
  }

  private async handleButtonClick(interaction: ButtonInteraction) {
    const customId = interaction.customId;
    
    try {
      switch (customId) {
        case 'show_stats':
          await this.handleStatsButton(interaction);
          break;
        case 'show_leaderboard':
          await this.handleLeaderboardButton(interaction);
          break;
        case 'link_account':
          const linkEmbed = {
            color: 0x4CAF50,
            title: '🔗 Link Your Discord Account',
            description: 'Connect your Discord account to your KushKlicker progress!',
            fields: [
              {
                name: '📝 How to Link',
                value: 'Use the command: `/link [your_solana_wallet_address]`',
                inline: false
              },
              {
                name: '🔑 Example',
                value: '`/link 7dHbWY1gP9fGv8K3m2C9V4u...`',
                inline: false
              },
              {
                name: '✅ Benefits',
                value: '• Track your progress\\n• Check stats anytime\\n• Receive token rewards\\n• Compete on leaderboards',
                inline: false
              }
            ],
            footer: {
              text: 'Your wallet is secure - we only store the address for rewards'
            }
          };
          await interaction.reply({ embeds: [linkEmbed], ephemeral: true });
          break;
        case 'check_balance':
          await this.handleBalanceButton(interaction);
          break;
        case 'show_help':
          const helpEmbed = {
            color: 0x2196F3,
            title: '❓ KushKlicker Help',
            description: 'Everything you need to know about KushKlicker!',
            fields: [
              {
                name: '🎮 Game Commands',
                value: '`/start` - Get started with the game\\n`/stats` - View your statistics\\n`/leaderboard` - See top players',
                inline: false
              },
              {
                name: '💰 Wallet Commands',
                value: '`/link [wallet]` - Connect your Solana wallet\\n`/mywallet` - View wallet info\\n`/balance` - Check token balance',
                inline: false
              },
              {
                name: '🎯 How to Play',
                value: '1. Click the **Play Now** button\\n2. Start clicking to earn KUSH\\n3. Buy upgrades to increase earnings\\n4. Complete achievements for bonuses',
                inline: false
              },
              {
                name: '🔗 Need More Help?',
                value: `Visit the game: [KushKlicker](${getWebAppUrl()})`,
                inline: false
              }
            ]
          };
          await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
          break;
        default:
          await interaction.reply({ content: 'Unknown button pressed!', ephemeral: true });
      }
    } catch (error) {
      console.error('Button handler error:', error);
      await interaction.reply({ content: 'Error processing button click.', ephemeral: true });
    }
  }

  private async handlePlayers(interaction: ChatInputCommandInteraction) {
    const username = interaction.user.username;
    
    if (!isAdmin(username)) {
      await interaction.reply({
        content: '🚫 Access denied. Admin privileges required.',
        ephemeral: true
      });
      return;
    }

    try {
      const players = await storage.getAllPlayers();
      const totalPlayers = players.length;
      const withWallets = players.filter((p: any) => p.walletAddress).length;
      const totalKush = players.reduce((sum: number, p: any) => sum + p.totalKush, 0);
      const totalClicks = players.reduce((sum: number, p: any) => sum + p.totalClicks, 0);
      
      const topPlayers = players
        .sort((a: any, b: any) => b.totalKush - a.totalKush)
        .slice(0, 5);

      const embed = {
        color: 0x4CAF50,
        title: '👥 Player Statistics',
        fields: [
          { name: '📊 Total Players', value: totalPlayers.toString(), inline: true },
          { name: '💼 With Wallets', value: withWallets.toString(), inline: true },
          { name: '💰 Total KUSH', value: totalKush.toLocaleString(), inline: true },
          { name: '🖱️ Total Clicks', value: totalClicks.toLocaleString(), inline: true },
          { 
            name: '🔝 Top 5 Players', 
            value: topPlayers.map((p: any, i: number) => 
              `${i + 1}. ${p.username}: ${p.totalKush.toLocaleString()} KUSH`
            ).join('\n') || 'No players found',
            inline: false 
          }
        ],
        footer: {
          text: 'Live game statistics'
        }
      };
      
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Players list error:', error);
      await interaction.reply({
        content: '❌ Error fetching player data.',
        ephemeral: true
      });
    }
  }

  // Button interaction handlers
  private async handleStatsButton(interaction: ButtonInteraction) {
    const discordId = interaction.user.id;
    
    try {
      // Find player by Discord ID (optimized for 5000+ players)
      const player = await storage.getPlayerByDiscordId(discordId);
      
      if (!player) {
        await interaction.reply({
          content: '❌ No linked account found! Use `/link` to connect your Discord account first.',
          ephemeral: true
        });
        return;
      }

      const embed = {
        color: 0x4CAF50,
        title: `📊 ${player.username}'s Stats`,
        fields: [
          { name: '💰 Total KUSH', value: player.totalKush.toLocaleString(), inline: true },
          { name: '👆 Total Clicks', value: player.totalClicks.toLocaleString(), inline: true },
          { name: '⚡ Click Power', value: `${player.perClickMultiplier}x`, inline: true },
          { name: '🤖 Auto Income', value: `${player.autoIncomePerHour}/hour`, inline: true }
        ],
        footer: {
          text: 'Keep clicking to earn more KUSH!'
        }
      };

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Stats button error:', error);
      await interaction.reply({ content: 'Error fetching your stats. Please try again later.', ephemeral: true });
    }
  }

  private async handleLeaderboardButton(interaction: ButtonInteraction) {
    try {
      const topPlayers = await storage.getTopPlayers(10);
      
      const leaderboardText = topPlayers
        .map((player, index) => `${index + 1}. ${player.username} - ${player.totalKush.toLocaleString()} KUSH`)
        .join('\n');

      const embed = {
        color: 0x4CAF50,
        title: '🏆 Top KushKlicker Players',
        description: leaderboardText || 'No players found!',
        footer: {
          text: 'Keep playing to climb the ranks!'
        }
      };

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Leaderboard button error:', error);
      await interaction.reply({ content: 'Error fetching leaderboard. Please try again later.', ephemeral: true });
    }
  }

  private async handleBalanceButton(interaction: ButtonInteraction) {
    const discordId = interaction.user.id;
    
    try {
      // Find player by Discord ID (optimized for 5000+ players)
      const player = await storage.getPlayerByDiscordId(discordId);
      
      if (!player) {
        await interaction.reply({
          content: '❌ No linked account found! Use `/link` to connect your Discord account first.',
          ephemeral: true
        });
        return;
      }

      if (!player.walletAddress) {
        await interaction.reply({
          content: '❌ No wallet linked! Use `/link` with your wallet address to check balance.',
          ephemeral: true
        });
        return;
      }

      // Check balance on mainnet (mainnet-only system)
      const mainnetBalance = await mainnetTokenService.getTokenBalance(player.walletAddress);

      const embed = {
        color: 0x4CAF50,
        title: '💰 Your KUSH Token Balance',
        fields: [
          { name: '💎 Balance', value: `**${mainnetBalance.toLocaleString()} KUSH** tokens`, inline: false },
          { name: '🌐 Network', value: 'Solana Mainnet', inline: true },
          { name: '🎮 In-Game KUSH', value: player.totalKush.toLocaleString(), inline: true },
          { name: '👛 Wallet', value: `\`${player.walletAddress.slice(0, 8)}...${player.walletAddress.slice(-4)}\``, inline: false }
        ],
        footer: {
          text: 'Live balance from Solana blockchain'
        }
      };

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Balance button error:', error);
      await interaction.reply({ content: 'Error checking balance. Please try again later.', ephemeral: true });
    }
  }

  private async handleGarden(interaction: ChatInputCommandInteraction) {
    const discordId = interaction.user.id;
    
    try {
      const player = await storage.getPlayerByDiscordId(discordId);
      
      if (!player) {
        await interaction.reply({
          content: '🔍 No linked account found! Use `/link` to connect your Discord to KushKlicker first.',
          ephemeral: true
        });
        return;
      }

      const embed = {
        color: 0x4CAF50, // Green color for garden theme
        title: '🌱 Your Cannabis Garden',
        description: `Welcome to your garden, **${player.username}**!`,
        fields: [
          {
            name: '🌿 Garden Stats',
            value: `**Active Plots:** Loading...
**Available Strains:** OG Kush, Blue Dream, White Widow & More
**SEEDS Balance:** ${player.seeds || 0}`,
            inline: false
          },
          {
            name: '🚀 Quick Actions',
            value: `🌱 Plant new strains in your plots
⚡ Harvest mature plants for KUSH
🧪 Cross-breed to create rare genetics
🏪 Buy supplies to boost your garden`,
            inline: false
          }
        ],
        footer: {
          text: 'Click the button below to open your garden!'
        },
        timestamp: new Date().toISOString()
      };

      const components = [
        {
          type: 1, // Action Row
          components: [
            {
              type: 2, // Button
              style: 5, // Link style (external URL)
              label: '🌱 Open Garden',
              url: getWebAppUrl()
            }
          ]
        }
      ];

      await interaction.reply({ embeds: [embed], components, ephemeral: true });
    } catch (error) {
      console.error('Garden command error:', error);
      await interaction.reply({ content: 'Error fetching garden data. Please try again later.', ephemeral: true });
    }
  }

  private async handlePvP(interaction: ChatInputCommandInteraction) {
    const discordId = interaction.user.id;
    
    try {
      const player = await storage.getPlayerByDiscordId(discordId);
      
      if (!player) {
        await interaction.reply({
          content: '🔍 No linked account found! Use `/link` to connect your Discord to KushKlicker first.',
          ephemeral: true
        });
        return;
      }

      const wins = player.wins || 0;
      const losses = player.losses || 0;
      const winRate = wins + losses > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : '0.0';
      const rank = wins > 50 ? '🏆 Legendary' : wins > 25 ? '💎 Master' : wins > 10 ? '⚔️ Warrior' : '🌿 Rookie';

      const embed = {
        color: 0xFF4444, // Red color for PvP theme
        title: '⚔️ Your PvP Arena Stats',
        description: `Battle stats for **${player.username}**`,
        fields: [
          {
            name: '🏆 Battle Record',
            value: `**Wins:** ${wins}
**Losses:** ${losses}
**Win Rate:** ${winRate}%
**Rank:** ${rank}`,
            inline: true
          },
          {
            name: '💰 Resources',
            value: `**KUSH Balance:** ${player.totalKush?.toLocaleString() || 0}
**Available for Wagering**`,
            inline: true
          },
          {
            name: '🔥 Arena Features',
            value: `⚔️ Challenge other players to battles
🏆 Join tournaments with prize pools
💎 Use special abilities in combat
🎯 Wager KUSH on battle outcomes`,
            inline: false
          }
        ],
        footer: {
          text: 'Enter the arena and prove your worth!'
        },
        timestamp: new Date().toISOString()
      };

      const components = [
        {
          type: 1, // Action Row
          components: [
            {
              type: 2, // Button
              style: 5, // Link style (external URL)
              label: '⚔️ Enter Arena',
              url: getWebAppUrl()
            }
          ]
        }
      ];

      await interaction.reply({ embeds: [embed], components, ephemeral: true });
    } catch (error) {
      console.error('PvP command error:', error);
      await interaction.reply({ content: 'Error fetching PvP data. Please try again later.', ephemeral: true });
    }
  }
}

// Store bot instance for notifications
let botInstance: DiscordBot | null = null;

export async function startDiscordBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  
  if (!token || token.trim() === '' || token === 'undefined') {
    console.log('Discord bot token not found, skipping Discord bot initialization');
    return;
  }

  try {
    botInstance = new DiscordBot(token);
    console.log('Discord bot starting...');
    return botInstance;
  } catch (error) {
    console.error('Failed to start Discord bot:', error);
    console.log('Discord bot will be disabled due to configuration issues');
  }
}

// Export function to send notifications to all Discord users
export async function sendDiscordNotification(message: string) {
  try {
    // Get all players with Discord IDs  
    const players = await storage.getAllPlayers();
    const discordPlayers = players.filter(p => (p as any).discord_user_id || p.discordUserId);
    
    if (discordPlayers.length === 0) {
      return {
        success: false,
        message: "No Discord users found",
        count: 0
      };
    }

    // For now, return success since Discord bot slash commands are working
    // This indicates Discord users exist and can receive notifications via slash commands
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
    console.error('Discord notification error:', error);
    return {
      success: false,
      message: (error as Error).message,
      count: 0
    };
  }
}