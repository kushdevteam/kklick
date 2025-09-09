import { useState } from "react";
import EnhancedWallet from "./enhanced-wallet";
import PrestigeSystem from "./prestige-system";
import DailyChallenges from "./daily-challenges";
import FriendsSystem from "./friends-system";
import GrowGarden from "./grow-garden";
import PvPBattleArena from "./pvp-battle-arena";
import GuildSystem from "./guild-system";

interface ComprehensiveFeaturesProps {
  playerId: string;
}

export default function ComprehensiveFeatures({ playerId }: ComprehensiveFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'wallet' | 'prestige' | 'challenges' | 'friends' | 'garden' | 'pvp' | 'guilds'>('wallet');

  const tabs = [
    { id: 'wallet', label: 'Wallet', icon: 'fa-wallet', color: 'text-primary' },
    { id: 'prestige', label: 'Prestige', icon: 'fa-crown', color: 'text-purple-400' },
    { id: 'challenges', label: 'Challenges', icon: 'fa-tasks', color: 'text-accent' },
    { id: 'friends', label: 'Friends', icon: 'fa-users', color: 'text-blue-400' },
    { id: 'garden', label: 'Garden', icon: 'fa-seedling', color: 'text-green-400' },
    { id: 'pvp', label: 'PvP Arena', icon: 'fa-fist-raised', color: 'text-red-400' },
    { id: 'guilds', label: 'Guilds', icon: 'fa-shield-alt', color: 'text-orange-400' },
  ];

  const TabButton = ({ tab }: { tab: typeof tabs[0] }) => (
    <button
      onClick={() => setActiveTab(tab.id as any)}
      className={`flex flex-col items-center space-y-1 px-2 py-3 rounded-lg text-xs transition-all ${
        activeTab === tab.id 
          ? 'bg-primary/20 text-primary border border-primary/30' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
      }`}
    >
      <i className={`fas ${tab.icon} ${activeTab === tab.id ? tab.color : ''}`}></i>
      <span className="font-medium">{tab.label}</span>
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Mobile-Friendly Tab Navigation */}
      <div className="bg-card/50 rounded-xl p-2 border border-border/50">
        <div className="grid grid-cols-7 gap-1">
          {tabs.map((tab) => (
            <TabButton key={tab.id} tab={tab} />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="mobile-scroll min-h-[200px] max-h-[80vh] overflow-y-auto">
        {activeTab === 'wallet' && <EnhancedWallet playerId={playerId} />}
        {activeTab === 'prestige' && <PrestigeSystem playerId={playerId} />}
        {activeTab === 'challenges' && <DailyChallenges playerId={playerId} />}
        {activeTab === 'friends' && <FriendsSystem playerId={playerId} />}
        {activeTab === 'garden' && <GrowGarden playerId={playerId} gameState={{ id: playerId }} />}
        {activeTab === 'pvp' && <PvPBattleArena playerId={playerId} />}
        {activeTab === 'guilds' && <GuildSystem playerId={playerId} />}
      </div>

      {/* Quick Access Action Bar */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-3 border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <i className="fas fa-bolt text-white text-sm"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">⚡ Quick Actions</p>
              <p className="text-xs text-muted-foreground">Fast access to key features</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('challenges')}
              className="bg-accent text-accent-foreground px-3 py-2 rounded-lg text-xs font-medium hover:bg-accent/80 transition-colors"
            >
              🎯 View Challenges
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium hover:bg-primary/80 transition-colors"
            >
              👥 Add Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}