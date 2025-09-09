import { useState, useEffect } from 'react';

interface GuildSystemProps {
  playerId: string;
}

interface Guild {
  id: string;
  name: string;
  description: string;
  leaderPlayerId: string;
  memberCount: number;
  maxMembers: number;
  totalKushEarned: number;
  guildLevel: number;
  isPublic: boolean;
}

interface GuildMember {
  id: string;
  guildId: string;
  playerId: string;
  username: string;
  role: 'leader' | 'member';
  contributedKush: number;
  joinedDate: string;
}

export default function GuildSystem({ playerId }: GuildSystemProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'create' | 'browse' | 'members' | 'leaderboard'>('overview');
  const [currentGuild, setCurrentGuild] = useState<Guild | null>(null);
  const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
  const [availableGuilds, setAvailableGuilds] = useState<Guild[]>([]);
  const [guildLeaderboard, setGuildLeaderboard] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');
  const [newGuildDescription, setNewGuildDescription] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [isContributing, setIsContributing] = useState(false);

  useEffect(() => {
    fetchGuildData();
  }, [playerId]);

  const fetchGuildData = async () => {
    setLoading(true);
    try {
      // Check if player is in a guild
      const membershipResponse = await fetch(`/api/players/${playerId}/guild`);
      if (membershipResponse.ok) {
        const membershipData = await membershipResponse.json();
        if (membershipData.guild) {
          setCurrentGuild(membershipData.guild);
          fetchGuildMembers(membershipData.guild.id);
        }
      }

      // Fetch available guilds to join
      const guildsResponse = await fetch('/api/guilds/public');
      if (guildsResponse.ok) {
        const guildsData = await guildsResponse.json();
        setAvailableGuilds(Array.isArray(guildsData) ? guildsData : []);
      }

      // Fetch guild leaderboard
      const leaderboardResponse = await fetch('/api/guilds/leaderboard');
      if (leaderboardResponse.ok) {
        const leaderboardData = await leaderboardResponse.json();
        setGuildLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      }
    } catch (error) {
      console.error('Error fetching guild data:', error);
    }
    setLoading(false);
  };

  const fetchGuildMembers = async (guildId: string) => {
    try {
      const response = await fetch(`/api/guilds/${guildId}/members`);
      if (response.ok) {
        const members = await response.json();
        setGuildMembers(Array.isArray(members) ? members : []);
      }
    } catch (error) {
      console.error('Error fetching guild members:', error);
    }
  };

  const createGuild = async () => {
    if (!newGuildName.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/guilds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leaderId: playerId,
          name: newGuildName.trim(),
          description: newGuildDescription.trim()
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setNewGuildName('');
        setNewGuildDescription('');
        await fetchGuildData();
        setActiveSubTab('overview');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error creating guild:', error);
    }
    setLoading(false);
  };

  const joinGuild = async (guildId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/guilds/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, guildId })
      });
      
      const result = await response.json();
      if (result.success) {
        await fetchGuildData();
        setActiveSubTab('overview');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error joining guild:', error);
    }
    setLoading(false);
  };

  const contributeToGuild = async () => {
    if (!contributionAmount || parseInt(contributionAmount) <= 0) {
      alert('Please enter a valid contribution amount');
      return;
    }

    setIsContributing(true);
    try {
      const response = await fetch('/api/guilds/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          playerId, 
          kushAmount: parseInt(contributionAmount) 
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        setContributionAmount('');
        fetchGuildData(); // Refresh guild data to show updated contributions
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error contributing to guild:', error);
      alert('Failed to contribute to guild');
    }
    setIsContributing(false);
  };

  const SubTabButton = ({ id, label, icon }: { id: string; label: string; icon: string }) => (
    <button
      onClick={() => setActiveSubTab(id as any)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all min-h-[44px] touch-action-manipulation ${
        activeSubTab === id 
          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
      }`}
    >
      <i className={`fas ${icon}`}></i>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 md:p-6 border border-orange-500/20 shadow-xl guild-mobile-scroll">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <i className="fas fa-shield-alt text-white text-xl"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">⚔️ Guild System</h3>
          <p className="text-muted-foreground text-sm">
            Team up with other players and compete together!
          </p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
        <SubTabButton id="overview" label="Overview" icon="fa-home" />
        {!currentGuild && <SubTabButton id="create" label="Create Guild" icon="fa-plus" />}
        {!currentGuild && <SubTabButton id="browse" label="Browse Guilds" icon="fa-search" />}
        {currentGuild && <SubTabButton id="members" label="Members" icon="fa-users" />}
        <SubTabButton id="leaderboard" label="Leaderboard" icon="fa-trophy" />
      </div>

      {loading && (
        <div className="text-center py-8">
          <i className="fas fa-spinner fa-spin text-2xl text-orange-400"></i>
          <p className="text-muted-foreground mt-2">Loading guild data...</p>
        </div>
      )}

      {/* Overview Tab */}
      {activeSubTab === 'overview' && !loading && (
        <div className="space-y-4">
          {currentGuild ? (
            <div className="space-y-4">
              <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-orange-400">Your Guild: {currentGuild.name}</h4>
                  <div className="text-sm text-muted-foreground">Level {currentGuild.guildLevel}</div>
                </div>
                <p className="text-sm text-foreground mb-4">{currentGuild.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{currentGuild.memberCount}</div>
                    <div className="text-xs text-muted-foreground">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-accent">{currentGuild.totalKushEarned.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total KUSH</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-400">{currentGuild.guildLevel}</div>
                    <div className="text-xs text-muted-foreground">Guild Level</div>
                  </div>
                </div>
              </div>

              {/* Guild Contribution Section */}
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                <h4 className="text-lg font-semibold text-primary mb-4">💰 Contribute to Guild</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Donate your KUSH to help grow the guild and increase its power!
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    placeholder="Enter KUSH amount..."
                    className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                    min="1"
                  />
                  <button
                    onClick={contributeToGuild}
                    disabled={!contributionAmount || parseInt(contributionAmount) <= 0 || isContributing}
                    className="bg-primary hover:bg-primary/80 disabled:bg-muted text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed min-h-[44px] touch-action-manipulation"
                  >
                    {isContributing ? 'Contributing...' : 'Contribute'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                <i className="fas fa-shield-alt text-2xl text-muted-foreground"></i>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Not in a Guild</h4>
                <p className="text-muted-foreground text-sm">
                  Join or create a guild to team up with other players!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setActiveSubTab('create')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] touch-action-manipulation"
                >
                  Create Guild
                </button>
                <button
                  onClick={() => setActiveSubTab('browse')}
                  className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] touch-action-manipulation"
                >
                  Browse Guilds
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Guild Tab */}
      {activeSubTab === 'create' && !loading && !currentGuild && (
        <div className="space-y-4">
          <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
            <h4 className="text-lg font-semibold text-orange-400 mb-4">Create New Guild</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Guild Name *</label>
                <input
                  type="text"
                  value={newGuildName}
                  onChange={(e) => setNewGuildName(e.target.value)}
                  placeholder="Enter guild name..."
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                  maxLength={30}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description (Optional)</label>
                <textarea
                  value={newGuildDescription}
                  onChange={(e) => setNewGuildDescription(e.target.value)}
                  placeholder="Describe your guild..."
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground h-20 resize-none"
                  maxLength={200}
                />
              </div>
              <button
                onClick={createGuild}
                disabled={!newGuildName.trim() || loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-muted text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed min-h-[48px] touch-action-manipulation"
              >
                {loading ? 'Creating...' : 'Create Guild'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Browse Guilds Tab */}
      {activeSubTab === 'browse' && !loading && !currentGuild && (
        <div className="space-y-4 mobile-scroll">
          <h4 className="text-lg font-semibold text-foreground">Available Guilds</h4>
          {availableGuilds.length > 0 ? (
            <div className="space-y-3 mobile-scroll max-h-[50vh] overflow-y-auto">
              {availableGuilds.map((guild) => (
                <div key={guild.id} className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-foreground">{guild.name}</h5>
                      <p className="text-sm text-muted-foreground">{guild.description}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {guild.memberCount}/{guild.maxMembers} members • Level {guild.guildLevel}
                      </div>
                    </div>
                    <button
                      onClick={() => joinGuild(guild.id)}
                      disabled={guild.memberCount >= guild.maxMembers}
                      className="bg-primary hover:bg-primary/80 disabled:bg-muted text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed min-h-[44px] touch-action-manipulation"
                    >
                      {guild.memberCount >= guild.maxMembers ? 'Full' : 'Join'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No public guilds available. Create your own!
            </div>
          )}
        </div>
      )}

      {/* Members Tab */}
      {activeSubTab === 'members' && !loading && currentGuild && (
        <div className="space-y-4 mobile-scroll">
          <h4 className="text-lg font-semibold text-foreground">Guild Members</h4>
          {guildMembers.length > 0 ? (
            <div className="space-y-2 mobile-scroll max-h-[50vh] overflow-y-auto">
              {guildMembers.map((member) => (
                <div key={member.id} className="bg-muted/30 rounded-lg p-3 border border-border flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground flex items-center space-x-2">
                      <span>{member.username}</span>
                      {member.role === 'leader' && (
                        <i className="fas fa-crown text-yellow-400 text-xs"></i>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Contributed: {member.contributedKush.toLocaleString()} KUSH
                    </div>
                  </div>
                  <div className="text-sm capitalize text-accent">{member.role}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Loading guild members...
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeSubTab === 'leaderboard' && !loading && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Guild Leaderboard</h4>
          {guildLeaderboard.length > 0 ? (
            <div className="space-y-2">
              {guildLeaderboard.map((guild, index) => (
                <div key={guild.id} className="bg-muted/30 rounded-lg p-3 border border-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{guild.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {guild.memberCount} members • Level {guild.guildLevel}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-accent">
                    {guild.totalKushEarned.toLocaleString()} KUSH
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No guild rankings available yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}