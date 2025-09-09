# KushKlicker Bot Commands & Content Integration

## 🤖 Discord Bot Commands (COMPREHENSIVE CONTENT SUPPORT)

### `/link [sol_address]`
- **Purpose**: Link Discord account to KushKlicker with Solana wallet address
- **Security**: Wallets can only be registered ONCE per account
- **Content Access**: Unlocks access to marketplace, staking, tournaments
- **Behavior**:
  - **New User**: Creates fresh account with provided wallet and full content access
  - **Existing User (no wallet)**: Adds wallet to existing account with content unlocked
  - **Existing User (has wallet)**: Shows security warning, prevents change
  - **Wallet Already Used**: Links Discord to existing wallet-based account

### `/stats`
- **Purpose**: Display comprehensive player statistics across all content systems
- **Requires**: Linked Discord account via `/link`
- **Enhanced Display**: KUSH total, staking positions, tournament entries, achievement progress, daily streak

### `/marketplace`
- **Purpose**: View current marketplace listings with realistic strain names
- **Shows**: All 12 strain listings with authentic cannabis names and prices
- **Featured Strains**: Purple Gorilla Supreme, Cosmic Cookies Drip, Sticky Mango Bomb, etc.

### `/staking`
- **Purpose**: View staking pool information and player positions
- **Shows**: All 5 pools with APY rates from 8% to 35% and duration options
- **Player Info**: Current staking positions and pending rewards

### `/tournaments`
- **Purpose**: Display active tournament information
- **Shows**: All 3 tournaments with entry fees, prize pools, and current standings
- **Competition Info**: KUSH Sprint, High Stakes Battle, Elite Grower Tournament

### `/achievements`
- **Purpose**: Show achievement progress across all 20 achievements
- **Categories**: Garden mastery, social engagement, marketplace activity, KUSH milestones
- **Progress**: Detailed completion status and reward information

### `/daily`
- **Purpose**: Check daily bonus status and streak information
- **Shows**: Next bonus availability, current streak, loyalty multiplier
- **Cooldown**: 20-hour cooldown system with progressive rewards

### `/wallet [address]`
- **Purpose**: Register/update wallet address (PROTECTED)
- **Security**: Prevents changing existing wallets with warning
- **Validation**: Checks Solana address format and production token compatibility

### `/mywallet`
- **Purpose**: Display current wallet information and content access
- **Shows**: Registered address, network, claimable tokens, content unlock status

### `/balance`
- **Purpose**: Check real-time token balance on-chain
- **Features**: Live blockchain verification, network detection, content reward tracking
- **Shows**: Current KUSH tokens, wallet info, staking rewards, tournament winnings

### `/admin` (Admin Only)
- **Purpose**: Access comprehensive admin panel for @wlsfx only
- **Features**: Content management, player analytics, token distribution oversight
- **Security**: Restricted to authorized admins only

### `/players` (Admin Only)
- **Purpose**: View comprehensive player statistics across all content systems
- **Shows**: Total players, content engagement, marketplace activity, staking participation
- **Analytics**: Tournament participation, achievement completion rates, daily bonus streaks

### `/leaderboard`
- **Purpose**: Show top players across comprehensive content systems
- **Enhanced Display**: KUSH earnings, tournament rankings, achievement counts, staking rewards

## 📱 Telegram Bot Commands (CONTENT-INTEGRATED)

### `/start`
- **Purpose**: Welcome message with comprehensive game introduction
- **Shows**: Game instructions, content system overview, quick access buttons
- **Content Preview**: Marketplace highlights, staking opportunities, tournament info

### `/link [username]`
- **Purpose**: Link Telegram account to existing KushKlicker username
- **Content Access**: Unlocks all content systems after linking
- **Note**: Different from Discord - uses username, not wallet

### `/marketplace`
- **Purpose**: Browse marketplace with realistic strain names
- **Shows**: All 12 strain listings with authentic cannabis names
- **Quick Access**: Direct links to premium strains and equipment

### `/staking`
- **Purpose**: View staking opportunities and current positions
- **Shows**: All 5 pools with competitive APY rates
- **Investment Guide**: Risk/reward information for different pool options

### `/tournaments`
- **Purpose**: Check tournament status and entry information
- **Shows**: All 3 active tournaments with entry fees and prize pools
- **Competition Status**: Current rankings and time remaining

### `/achievements`
- **Purpose**: View achievement progress across all 20 achievements
- **Categories**: Garden, social, economy, milestone achievements
- **Progress Tracking**: Detailed completion status and rewards

### `/daily`
- **Purpose**: Check daily bonus and streak status
- **Shows**: Next bonus time, current streak, multiplier information
- **Loyalty System**: Long-term engagement reward tracking

### `/stats`
- **Purpose**: Display comprehensive linked account statistics
- **Enhanced Content**: Marketplace purchases, staking positions, tournament entries
- **Requires**: Account linking via `/link`

### `/wallet [address]`
- **Purpose**: Register Solana wallet (PROTECTED)
- **Security**: Same wallet protection as Discord with content access
- **Content Unlock**: Full access to staking, tournaments, marketplace after linking

### `/mywallet`
- **Purpose**: Display wallet information and content access status
- **Shows**: Wallet address, token balance, content system access

### `/help`
- **Purpose**: Show comprehensive help with all content systems
- **Features**: Dynamic command list based on user permissions
- **Content Guide**: Overview of marketplace, staking, tournaments, achievements

### `/balance`
- **Purpose**: Check real-time token balance with content reward tracking
- **Features**: Live blockchain verification, staking rewards, tournament winnings
- **Comprehensive**: Shows total from all content systems (clicking, staking, tournaments, daily bonuses)

### `/admin` (Admin Only)
- **Purpose**: Access comprehensive admin panel for @wlsfx only
- **Content Management**: Marketplace oversight, tournament management, achievement distribution
- **Security**: Restricted to authorized admins only

### `/players` (Admin Only)
- **Purpose**: View comprehensive player analytics across all content
- **Content Analytics**: Marketplace engagement, staking participation, tournament activity
- **Security**: Admin access required

### `/leaderboard`
- **Purpose**: Show top players with comprehensive content rankings
- **Enhanced**: Tournament standings, achievement leaders, staking champions

## 🔐 Security Features (Content-Aware)

### Wallet Protection Policy (Content-Integrated)
1. **One-Time Registration**: Each account can only have ONE wallet address
2. **Content Access**: Wallet linking unlocks all premium content systems
3. **Change Prevention**: System blocks wallet modification attempts
4. **Content Security**: Prevents exploitation across marketplace, staking, tournaments

### Content Security Measures
- **Economic Balance**: Proper pricing validation across all content systems
- **Reward Validation**: Achievement and tournament reward distribution oversight
- **Staking Security**: Proper reward calculations and withdrawal validation
- **Marketplace Security**: Authentic content validation and price protection

### Error Handling (Content-Aware)
- **Content Errors**: Clear messages for content system issues
- **Invalid Transactions**: User-friendly marketplace and staking error messages
- **Tournament Errors**: Clear entry fee and eligibility validation
- **Achievement Errors**: Progress validation and reward distribution handling

## 🛠️ Development Notes (Content-Complete Environment)

### Content System Integration
- **Realistic Strain Database**: 12 authentic cannabis strain names using proper conventions
- **Economic Balance**: Carefully tuned pricing and rewards across all systems
- **Progressive Difficulty**: Content scales appropriately for player advancement
- **Mobile Optimization**: All content systems work perfectly in Telegram WebView

### Bot Token Setup (Production)
- `TELEGRAM_BOT_TOKEN`: Active production token with content integration
- `DISCORD_BOT_TOKEN`: Active production token with admin features

### Command Registration (Content-Enhanced)
- **Discord**: Automatic slash command registration with content system integration
- **Telegram**: Polling system with comprehensive content command support
- **Real-time Updates**: Commands reflect current content system status

### Database Integration (Content-Rich)
- **Comprehensive Schema**: Supports all content systems (marketplace, staking, tournaments, etc.)
- **Content Queries**: Optimized for content-heavy operations
- **Real-time Data**: Live updates across all content systems

## 🚀 Future AI Agent Handoff Notes

### **CURRENT STATE: COMPREHENSIVE CONTENT COMPLETE**
**The game now features a rich, complete economy with authentic content across all systems**

### Content System Status for New Agents
1. **Marketplace**: 12 realistic strain listings with authentic cannabis names ✅
2. **Staking**: 5 active pools with competitive APY rates (8%-35%) ✅
3. **Achievements**: 20 comprehensive achievements across all categories ✅
4. **Tournaments**: 3 competitive events with substantial prize pools ✅
5. **Daily Bonuses**: Smart cooldown system with streak tracking ✅
6. **Guild Wars**: Inter-guild competition with massive rewards ✅
7. **Global Events**: 3 seasonal events with special multipliers ✅
8. **Social Features**: Enhanced friend system with bonuses ✅

### Content Development Guidelines for Future Agents
1. **Authenticity**: Maintain realistic cannabis strain names and descriptions
2. **Economic Balance**: Preserve carefully tuned pricing across all systems
3. **Progressive Scaling**: Ensure new content scales with player progression
4. **Mobile First**: Design all content for Telegram WebView optimization
5. **Integration**: Ensure new features integrate with existing comprehensive systems

### Testing Checklist for Content Systems
- [x] **Marketplace**: 12 realistic strain names display properly (Purple Gorilla Supreme, etc.)
- [x] **Staking**: 5 pools operational with correct APY rates
- [x] **Achievements**: 20 total achievements track progress correctly
- [x] **Tournaments**: 3 events accept entries and track standings
- [x] **Daily Bonuses**: 20-hour cooldown and streak system working
- [x] **Guild Wars**: Inter-guild competition functional
- [x] **Global Events**: 3 seasonal events with proper multipliers
- [x] **Bot Integration**: All commands work with comprehensive content
- [x] **Token System**: Real token integration with manual distribution
- [x] **Mobile Experience**: All content accessible in Telegram WebView

### Code Locations for Content Systems
- **Marketplace**: `client/src/components/marketplace/`, `server/routes.ts` (marketplace endpoints)
- **Staking**: `client/src/components/staking/`, staking pool logic in comprehensive game service
- **Achievements**: Achievement components, `server/achievements-data.ts` (20 achievements)
- **Tournaments**: Tournament components, tournament logic in game service
- **Daily Bonuses**: Daily bonus components, cooldown logic in routes
- **Bot Integration**: `server/discord-bot.ts`, `server/telegram-bot.ts`
- **Database Schema**: `shared/schema.ts` (comprehensive content schema)
- **Main Documentation**: `replit.md` (current admin credentials and content status)

### **COMPREHENSIVE CONTENT VERIFICATION**
The game is now a **complete, content-rich cannabis clicker** with:
- Authentic strain marketplace using realistic cannabis naming
- Advanced staking economy with competitive returns
- Comprehensive achievement system covering all game areas
- Competitive tournament system with substantial rewards
- Smart daily bonus system with progression mechanics
- Inter-guild warfare with massive prize pools
- Seasonal global events with special multipliers
- Enhanced social features and friend bonuses

**Ready for**: Production deployment, UI polish, performance optimization, and continued expansion by future AI agents.