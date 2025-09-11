/**
 * Social Features System
 * Guild chat, friend referrals, and social interactions
 * SECURITY: Address scanning only - no wallet connections
 */

interface Guild {
  id: string;
  name: string;
  description: string;
  icon: string;
  ownerId: string;
  members: GuildMember[];
  level: number;
  experience: number;
  totalKushEarned: number;
  createdAt: Date;
  isPublic: boolean;
  maxMembers: number;
  perks: GuildPerk[];
}

interface GuildMember {
  playerId: string;
  username: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
  contributedKush: number;
  lastActive: Date;
  walletAddress?: string;
}

interface GuildPerk {
  id: string;
  name: string;
  description: string;
  bonusType: 'click_multiplier' | 'idle_bonus' | 'token_bonus';
  bonusValue: number;
  requiredLevel: number;
}

interface ChatMessage {
  id: string;
  guildId: string;
  playerId: string;
  username: string;
  message: string;
  timestamp: Date;
  edited: boolean;
  reactions: { [emoji: string]: string[] }; // emoji -> playerIds
}

interface FriendRequest {
  id: string;
  fromPlayerId: string;
  toPlayerId: string;
  fromUsername: string;
  toUsername: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

interface Friendship {
  id: string;
  player1Id: string;
  player2Id: string;
  establishedAt: Date;
  lastInteraction: Date;
  mutualKushEarned: number;
}

export class SocialFeaturesSystem {
  private guilds: Map<string, Guild> = new Map();
  private chatMessages: Map<string, ChatMessage[]> = new Map();
  private friendRequests: Map<string, FriendRequest[]> = new Map();
  private friendships: Map<string, Friendship[]> = new Map();
  private webSocketClients: Map<string, any> = new Map();

  constructor(private storage: any, private webSocketServer?: any) {
    this.initializeDefaultGuilds();
    if (webSocketServer) {
      this.setupWebSocketHandlers();
    }
  }

  private initializeDefaultGuilds(): void {
    // Create default public guilds
    const defaultGuilds: Partial<Guild>[] = [
      {
        id: 'kush-legends',
        name: '🌿 KUSH Legends',
        description: 'Elite players pushing the boundaries of earning',
        icon: '🌿',
        isPublic: true,
        maxMembers: 50,
        perks: [
          {
            id: 'legend-click-boost',
            name: 'Legend Click Boost',
            description: '+15% click multiplier for all members',
            bonusType: 'click_multiplier',
            bonusValue: 1.15,
            requiredLevel: 5
          },
          {
            id: 'legend-token-bonus',
            name: 'Token Bonus',
            description: '+10% bonus tokens from achievements',
            bonusType: 'token_bonus',
            bonusValue: 1.10,
            requiredLevel: 10
          }
        ]
      },
      {
        id: 'burn-masters',
        name: '🔥 Burn Masters',
        description: 'Dedicated token burners and grow light collectors',
        icon: '🔥',
        isPublic: true,
        maxMembers: 30,
        perks: [
          {
            id: 'burn-idle-boost',
            name: 'Idle Burn Boost',
            description: '+20% idle earnings with active grow lights',
            bonusType: 'idle_bonus',
            bonusValue: 1.20,
            requiredLevel: 3
          }
        ]
      },
      {
        id: 'click-warriors',
        name: '⚡ Click Warriors',
        description: 'Fast clickers competing for speed records',
        icon: '⚡',
        isPublic: true,
        maxMembers: 100,
        perks: [
          {
            id: 'warrior-speed-boost',
            name: 'Speed Boost',
            description: '+25% click multiplier during competitions',
            bonusType: 'click_multiplier',
            bonusValue: 1.25,
            requiredLevel: 2
          }
        ]
      }
    ];

    for (const guildData of defaultGuilds) {
      const guild: Guild = {
        ...guildData,
        ownerId: 'system',
        members: [],
        level: 1,
        experience: 0,
        totalKushEarned: 0,
        createdAt: new Date()
      } as Guild;
      
      this.guilds.set(guild.id, guild);
    }

    console.log(`🏰 Initialized ${this.guilds.size} default guilds`);
  }

  private setupWebSocketHandlers(): void {
    if (!this.webSocketServer) return;

    this.webSocketServer.on('connection', (ws: any, req: any) => {
      const playerId = this.extractPlayerIdFromRequest(req);
      if (playerId) {
        this.webSocketClients.set(playerId, ws);
        console.log(`🔗 Social features client connected: ${playerId}`);

        ws.on('message', (data: string) => {
          this.handleWebSocketMessage(playerId, data);
        });

        ws.on('close', () => {
          this.webSocketClients.delete(playerId);
          console.log(`🔌 Social features client disconnected: ${playerId}`);
        });
      }
    });
  }

  private extractPlayerIdFromRequest(req: any): string | null {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      return url.searchParams.get('playerId');
    } catch {
      return null;
    }
  }

  private async handleWebSocketMessage(playerId: string, data: string): Promise<void> {
    try {
      const message = JSON.parse(data);
      
      switch (message.type) {
        case 'guild_chat':
          await this.handleGuildChatMessage(playerId, message.data);
          break;
        case 'guild_reaction':
          await this.handleGuildReaction(playerId, message.data);
          break;
        default:
          console.log(`Unknown WebSocket message type: ${message.type}`);
      }
    } catch (error) {
      console.error('❌ WebSocket message error:', error);
    }
  }

  /**
   * Get public guilds available to join
   */
  getPublicGuilds(): Guild[] {
    return Array.from(this.guilds.values()).filter(guild => guild.isPublic);
  }

  /**
   * Get player's guilds
   */
  async getPlayerGuilds(playerId: string): Promise<Guild[]> {
    return Array.from(this.guilds.values()).filter(guild =>
      guild.members.some(member => member.playerId === playerId)
    );
  }

  /**
   * Join a guild
   */
  async joinGuild(playerId: string, guildId: string): Promise<boolean> {
    try {
      const guild = this.guilds.get(guildId);
      if (!guild) return false;

      if (guild.members.length >= guild.maxMembers) return false;

      const player = await this.storage.getPlayer(playerId);
      if (!player) return false;

      // Check if already a member
      if (guild.members.some(member => member.playerId === playerId)) {
        return false;
      }

      // Add member
      const newMember: GuildMember = {
        playerId,
        username: player.username,
        role: 'member',
        joinedAt: new Date(),
        contributedKush: 0,
        lastActive: new Date(),
        walletAddress: player.walletAddress
      };

      guild.members.push(newMember);
      console.log(`🏰 Player ${playerId} joined guild ${guildId}`);
      return true;

    } catch (error) {
      console.error('❌ Join guild error:', error);
      return false;
    }
  }

  /**
   * Leave a guild
   */
  async leaveGuild(playerId: string, guildId: string): Promise<boolean> {
    try {
      const guild = this.guilds.get(guildId);
      if (!guild) return false;

      const memberIndex = guild.members.findIndex(member => member.playerId === playerId);
      if (memberIndex === -1) return false;

      guild.members.splice(memberIndex, 1);
      console.log(`🚪 Player ${playerId} left guild ${guildId}`);
      return true;

    } catch (error) {
      console.error('❌ Leave guild error:', error);
      return false;
    }
  }

  /**
   * Send a chat message to guild
   */
  async sendGuildChatMessage(
    playerId: string,
    guildId: string,
    message: string
  ): Promise<ChatMessage | null> {
    try {
      const guild = this.guilds.get(guildId);
      if (!guild) return null;

      const member = guild.members.find(m => m.playerId === playerId);
      if (!member) return null;

      const chatMessage: ChatMessage = {
        id: this.generateMessageId(),
        guildId,
        playerId,
        username: member.username,
        message: message.trim(),
        timestamp: new Date(),
        edited: false,
        reactions: {}
      };

      // Add to chat history
      if (!this.chatMessages.has(guildId)) {
        this.chatMessages.set(guildId, []);
      }
      this.chatMessages.get(guildId)!.push(chatMessage);

      // Broadcast to all guild members
      await this.broadcastToGuildMembers(guildId, {
        type: 'guild_chat_message',
        data: chatMessage
      });

      console.log(`💬 Guild chat message sent in ${guildId} by ${playerId}`);
      return chatMessage;

    } catch (error) {
      console.error('❌ Guild chat error:', error);
      return null;
    }
  }

  /**
   * Get guild chat messages
   */
  async getGuildChatMessages(guildId: string, limit: number = 50): Promise<ChatMessage[]> {
    const messages = this.chatMessages.get(guildId) || [];
    return messages.slice(-limit);
  }

  private async handleGuildChatMessage(playerId: string, data: any): Promise<void> {
    await this.sendGuildChatMessage(playerId, data.guildId, data.message);
  }

  private async handleGuildReaction(playerId: string, data: any): Promise<void> {
    // TODO: Implement message reactions
  }

  private async broadcastToGuildMembers(guildId: string, message: any): Promise<void> {
    try {
      const guild = this.guilds.get(guildId);
      if (!guild) return;

      for (const member of guild.members) {
        const client = this.webSocketClients.get(member.playerId);
        if (client && client.readyState === 1) {
          client.send(JSON.stringify(message));
        }
      }
    } catch (error) {
      console.error('❌ Guild broadcast error:', error);
    }
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Send friend request
   */
  async sendFriendRequest(
    fromPlayerId: string,
    toPlayerId: string,
    message?: string
  ): Promise<boolean> {
    try {
      const fromPlayer = await this.storage.getPlayer(fromPlayerId);
      const toPlayer = await this.storage.getPlayer(toPlayerId);
      
      if (!fromPlayer || !toPlayer) return false;

      const request: FriendRequest = {
        id: this.generateRequestId(),
        fromPlayerId,
        toPlayerId,
        fromUsername: fromPlayer.username,
        toUsername: toPlayer.username,
        message,
        status: 'pending',
        createdAt: new Date()
      };

      if (!this.friendRequests.has(toPlayerId)) {
        this.friendRequests.set(toPlayerId, []);
      }
      this.friendRequests.get(toPlayerId)!.push(request);

      console.log(`👥 Friend request sent from ${fromPlayerId} to ${toPlayerId}`);
      return true;

    } catch (error) {
      console.error('❌ Friend request error:', error);
      return false;
    }
  }

  /**
   * Get pending friend requests for a player
   */
  async getPendingFriendRequests(playerId: string): Promise<FriendRequest[]> {
    return this.friendRequests.get(playerId) || [];
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const socialFeaturesSystem = new SocialFeaturesSystem(null);