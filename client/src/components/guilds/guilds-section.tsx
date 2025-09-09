import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/hooks/use-game-state';

interface Guild {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  memberCount: number;
  level: number;
  totalPower: number;
  createdAt: string;
  territories?: Territory[];
  currentWar?: GuildWar;
  bankBalance?: number;
  warScore?: number;
}

interface Territory {
  id: string;
  name: string;
  bonusType: string;
  bonusValue: number;
  defenseStrength: number;
  controllingGuildId?: string;
}

interface GuildWar {
  id: string;
  guild1Id: string;
  guild2Id: string;
  guild1Score: number;
  guild2Score: number;
  startTime: string;
  endTime: string;
  prizePool: number;
  status: 'active' | 'completed';
}

interface GuildQuest {
  id: string;
  name: string;
  description: string;
  questType: string;
  targetValue: number;
  currentProgress: number;
  kushReward: number;
  timeRemaining: number;
  isCompleted: boolean;
}

interface PlayerGuild {
  guild?: Guild;
  role?: string;
  joinedAt?: string;
}

export default function GuildsSection() {
  const [playerGuild, setPlayerGuild] = useState<PlayerGuild | null>(null);
  const [availableGuilds, setAvailableGuilds] = useState<Guild[]>([]);
  const [guildLeaderboard, setGuildLeaderboard] = useState<Guild[]>([]);
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [guildQuests, setGuildQuests] = useState<GuildQuest[]>([]);
  const [activeWars, setActiveWars] = useState<GuildWar[]>([]);
  const [loading, setLoading] = useState(true);
  const [createMode, setCreateMode] = useState(false);
  const [viewMembersMode, setViewMembersMode] = useState(false);
  const [warDetailsMode, setWarDetailsMode] = useState(false);
  const [territoriesMode, setTerritoriesMode] = useState(false);
  const [questsMode, setQuestsMode] = useState(false);
  const [guildMembers, setGuildMembers] = useState<any[]>([]);
  const [guildName, setGuildName] = useState('');
  const [guildDescription, setGuildDescription] = useState('');
  const { gameState } = useGameState();
  const { toast } = useToast();

  useEffect(() => {
    if (gameState?.id) {
      fetchGuildData();
      fetchTerritories();
      fetchGuildQuests();
      fetchActiveWars();
    }
  }, [gameState?.id]);

  const fetchTerritories = async () => {
    try {
      // Mock territories for enhanced guild system
      const mockTerritories: Territory[] = [
        {
          id: 'territory-1',
          name: 'Emerald Valley',
          bonusType: 'kush_multiplier',
          bonusValue: 25,
          defenseStrength: 85,
          controllingGuildId: playerGuild?.guild?.id === 'guild-1' ? 'guild-1' : undefined
        },
        {
          id: 'territory-2', 
          name: 'Crystal Peaks',
          bonusType: 'seeds_bonus',
          bonusValue: 50,
          defenseStrength: 92,
          controllingGuildId: 'rival-guild-1'
        },
        {
          id: 'territory-3',
          name: 'Golden Fields',
          bonusType: 'experience_boost',
          bonusValue: 40,
          defenseStrength: 78,
          controllingGuildId: undefined
        }
      ];
      setTerritories(mockTerritories);
    } catch (error) {
      console.error('Error fetching territories:', error);
    }
  };

  const fetchGuildQuests = async () => {
    try {
      // Mock guild quests
      const mockQuests: GuildQuest[] = [
        {
          id: 'quest-1',
          name: 'Collective Harvest',
          description: 'Guild members harvest 1M KUSH together',
          questType: 'collective_kush',
          targetValue: 1000000,
          currentProgress: 750000,
          kushReward: 50000,
          timeRemaining: 48 * 3600,
          isCompleted: false
        },
        {
          id: 'quest-2',
          name: 'Territory Defenders',
          description: 'Successfully defend 3 territories',
          questType: 'territory_defense',
          targetValue: 3,
          currentProgress: 1,
          kushReward: 75000,
          timeRemaining: 72 * 3600,
          isCompleted: false
        }
      ];
      setGuildQuests(mockQuests);
    } catch (error) {
      console.error('Error fetching guild quests:', error);
    }
  };

  const fetchActiveWars = async () => {
    try {
      // Mock active wars
      const mockWars: GuildWar[] = [
        {
          id: 'war-1',
          guild1Id: playerGuild?.guild?.id || 'guild-1',
          guild2Id: 'rival-guild-1',
          guild1Score: 2850,
          guild2Score: 2630,
          startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          prizePool: 150000,
          status: 'active'
        }
      ];
      setActiveWars(mockWars);
    } catch (error) {
      console.error('Error fetching wars:', error);
    }
  };

  const fetchGuildData = async () => {
    try {
      const [playerGuildResponse, leaderboardResponse] = await Promise.all([
        fetch(`/api/players/${gameState?.id}/guild`),
        fetch('/api/guilds/leaderboard')
      ]);

      if (playerGuildResponse.ok) {
        const playerGuildData = await playerGuildResponse.json();
        setPlayerGuild(playerGuildData || null);
      } else {
        setPlayerGuild({ guild: null, role: null, joinedAt: null });
      }

      if (leaderboardResponse.ok) {
        const leaderboardData = await leaderboardResponse.json();
        setGuildLeaderboard(leaderboardData || []);
      }

      // Fetch available guilds if player is not in one
      if (!playerGuild?.guild) {
        const availableResponse = await fetch('/api/guilds/public');
        if (availableResponse.ok) {
          const availableData = await availableResponse.json();
          setAvailableGuilds(availableData || []);
        }
      }
    } catch (error) {
      console.error('Error fetching guild data:', error);
      setPlayerGuild({ guild: null, role: null, joinedAt: null });
    } finally {
      setLoading(false);
    }
  };

  const fetchGuildMembers = async () => {
    if (!playerGuild?.guild?.id) return;
    
    try {
      const response = await fetch(`/api/guilds/${playerGuild.guild.id}/members`);
      if (response.ok) {
        const members = await response.json();
        setGuildMembers(members || []);
      } else {
        setGuildMembers([]);
        toast({
          title: "Error",
          description: "Failed to load guild members",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching guild members:', error);
      setGuildMembers([]);
      toast({
        title: "Error",
        description: "Failed to load guild members",
        variant: "destructive",
      });
    }
  };

  const handleCreateGuild = async () => {
    if (!guildName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a guild name",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/guilds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leaderId: gameState?.id,
          name: guildName,
          description: guildDescription
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Guild Created!",
          description: result.message,
        });
        setCreateMode(false);
        setGuildName('');
        setGuildDescription('');
        fetchGuildData(); // Refresh data
      } else {
        toast({
          title: "Failed to Create Guild",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create guild",
        variant: "destructive",
      });
    }
  };

  const handleJoinGuild = async (guildId: string) => {
    try {
      const response = await fetch('/api/guilds/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: gameState?.id,
          guildId
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Joined Guild!",
          description: result.message,
        });
        fetchGuildData(); // Refresh data
      } else {
        toast({
          title: "Failed to Join Guild",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join guild",
        variant: "destructive",
      });
    }
  };

  const handleAttackTerritory = async (territoryId: string) => {
    if (!playerGuild?.guild) return;
    
    toast({
      title: "⚔️ Territory Attack!",
      description: "Your guild launches an assault on the territory. Battle results will be available soon!",
      className: "bg-gradient-to-r from-red-500 to-orange-600 text-white border-red-400",
    });
    
    // Mock territory attack - would be replaced with real API
    setTimeout(() => {
      const success = Math.random() > 0.6;
      if (success) {
        setTerritories(prev => prev.map(t => 
          t.id === territoryId 
            ? { ...t, controllingGuildId: playerGuild.guild?.id }
            : t
        ));
        toast({
          title: "🏆 Victory!",
          description: "Territory conquered! Your guild now controls this region.",
          className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400",
        });
      } else {
        toast({
          title: "💥 Defeat",
          description: "Attack failed. Prepare better and try again!",
          variant: "destructive",
        });
      }
    }, 3000);
  };

  const handleClaimQuest = async (questId: string) => {
    setGuildQuests(prev => prev.map(quest =>
      quest.id === questId 
        ? { ...quest, isCompleted: true }
        : quest
    ));
    
    const quest = guildQuests.find(q => q.id === questId);
    if (quest) {
      toast({
        title: "🎉 Guild Quest Complete!",
        description: `Guild earned ${quest.kushReward.toLocaleString()} KUSH reward!`,
        className: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400",
      });
    }
  };

  const formatTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getBonusIcon = (bonusType: string) => {
    switch (bonusType) {
      case 'kush_multiplier': return 'fas fa-coins text-yellow-500';
      case 'seeds_bonus': return 'fas fa-seedling text-green-500';
      case 'experience_boost': return 'fas fa-star text-purple-500';
      default: return 'fas fa-gift text-primary';
    }
  };

  const getQuestIcon = (questType: string) => {
    switch (questType) {
      case 'collective_kush': return 'fas fa-coins';
      case 'territory_defense': return 'fas fa-shield';
      case 'collective_clicks': return 'fas fa-mouse-pointer';
      case 'win_battles': return 'fas fa-sword';
      default: return 'fas fa-quest';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-card/50 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-card/50 h-32 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 pb-8 guild-mobile-scroll mobile-scroll overflow-y-auto max-h-[85vh]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="fas fa-shield text-primary"></i>
            Guild System
          </CardTitle>
          <CardDescription>
            Team up with other players and compete together!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Player's Guild */}
      {playerGuild?.guild ? (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fas fa-crown text-primary"></i>
                {playerGuild.guild.name}
              </div>
              <Badge variant="secondary">Level {playerGuild.guild.level}</Badge>
            </CardTitle>
            <CardDescription>{playerGuild.guild.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{playerGuild.guild.memberCount}</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{playerGuild.guild?.totalPower?.toLocaleString() || '0'}</p>
                <p className="text-sm text-muted-foreground">Total Power</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{playerGuild.role || 'Member'}</p>
                <p className="text-sm text-muted-foreground">Your Role</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {new Date(playerGuild.joinedAt || '').toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">Joined</p>
              </div>
            </div>
            {/* Enhanced Guild Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <Button 
                variant="outline" 
                className="min-h-[44px] touch-action-manipulation mobile-button-enhanced"
                onClick={() => {
                  setViewMembersMode(true);
                  fetchGuildMembers();
                }}
                data-testid="button-view-members"
              >
                <i className="fas fa-users mr-2"></i>
                Members
              </Button>
              <Button 
                variant="outline" 
                className={`min-h-[44px] touch-action-manipulation mobile-button-enhanced ${
                  activeWars.length > 0 ? 'border-red-500 text-red-500 animate-pulse' : ''
                }`}
                onClick={() => setWarDetailsMode(true)}
                data-testid="button-guild-wars"
              >
                <i className="fas fa-sword mr-2"></i>
                Wars {activeWars.length > 0 && `(${activeWars.length})`}
              </Button>
              <Button 
                variant="outline" 
                className="min-h-[44px] touch-action-manipulation mobile-button-enhanced"
                onClick={() => setTerritoriesMode(true)}
                data-testid="button-territories"
              >
                <i className="fas fa-map mr-2"></i>
                Territory
              </Button>
              <Button 
                variant="outline" 
                className={`min-h-[44px] touch-action-manipulation mobile-button-enhanced ${
                  guildQuests.some(q => !q.isCompleted && q.currentProgress >= q.targetValue) ? 'border-green-500 text-green-500 animate-pulse' : ''
                }`}
                onClick={() => setQuestsMode(true)}
                data-testid="button-guild-quests"
              >
                <i className="fas fa-scroll mr-2"></i>
                Quests
              </Button>
            </div>

            {/* Quick Status Indicators */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <i className="fas fa-piggy-bank text-green-500"></i>
                <div>
                  <div className="font-medium">{(playerGuild.guild.bankBalance || 50000).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Guild Bank</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <i className="fas fa-map-marked-alt text-blue-500"></i>
                <div>
                  <div className="font-medium">{territories.filter(t => t.controllingGuildId === playerGuild.guild?.id).length}</div>
                  <div className="text-xs text-muted-foreground">Territories</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <i className="fas fa-trophy text-yellow-500"></i>
                <div>
                  <div className="font-medium">{playerGuild.guild.warScore || 2850}</div>
                  <div className="text-xs text-muted-foreground">War Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Join or Create Guild */
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <i className="fas fa-shield text-4xl text-muted-foreground mb-4"></i>
              <h3 className="text-lg font-semibold mb-2">Not in a Guild</h3>
              <p className="text-muted-foreground mb-4">
                Join or create a guild to team up with other players!
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={() => setCreateMode(true)} className="min-h-[48px] touch-action-manipulation">
                  <i className="fas fa-plus mr-2"></i>
                  Create Guild
                </Button>
                <Button variant="outline" className="min-h-[48px] touch-action-manipulation">
                  <i className="fas fa-search mr-2"></i>
                  Browse Guilds
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create Guild Form */}
          {createMode && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Guild</CardTitle>
                <CardDescription>Start your own guild and invite other players</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Guild Name"
                  value={guildName}
                  onChange={(e) => setGuildName(e.target.value)}
                  maxLength={50}
                />
                <Textarea
                  placeholder="Guild Description (optional)"
                  value={guildDescription}
                  onChange={(e) => setGuildDescription(e.target.value)}
                  maxLength={200}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleCreateGuild} className="flex-1 min-h-[48px] touch-action-manipulation">
                    <i className="fas fa-crown mr-2"></i>
                    Create Guild
                  </Button>
                  <Button variant="outline" onClick={() => setCreateMode(false)} className="min-h-[48px] touch-action-manipulation">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Guilds */}
          {availableGuilds.length > 0 && (
            <div className="space-y-4 mobile-scroll max-h-[60vh] overflow-y-auto">
              <h3 className="text-lg font-semibold">Available Guilds</h3>
              {availableGuilds.map((guild) => (
                <Card key={guild.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{guild.name}</h3>
                          <Badge variant="secondary">Level {guild.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{guild.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span><i className="fas fa-users mr-1"></i>{guild.memberCount} members</span>
                          <span><i className="fas fa-bolt mr-1"></i>{guild.totalPower} power</span>
                        </div>
                      </div>
                      <Button onClick={() => handleJoinGuild(guild.id)} className="min-h-[44px] touch-action-manipulation">
                        <i className="fas fa-sign-in-alt mr-2"></i>
                        Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Guild Leaderboard */}
      {guildLeaderboard.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <i className="fas fa-trophy text-primary"></i>
              Guild Leaderboard
            </CardTitle>
            <CardDescription>Top performing guilds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {guildLeaderboard.slice(0, 5).map((guild, index) => (
                <div key={guild.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{guild.name}</p>
                      <p className="text-sm text-muted-foreground">{guild.memberCount} members</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{guild.totalPower?.toLocaleString() || '0'}</p>
                    <p className="text-sm text-muted-foreground">Power</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guild Members Modal */}
      {viewMembersMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-users text-primary"></i>
                  Guild Members
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setViewMembersMode(false)}
                  data-testid="button-close-members"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </CardTitle>
              <CardDescription>
                {playerGuild?.guild?.name} • {guildMembers.length} members
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              {guildMembers.length > 0 ? (
                <div className="space-y-2">
                  {guildMembers.map((member: any, index: number) => (
                    <div 
                      key={member.id || index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <i className="fas fa-user text-primary text-sm"></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.username || member.name || 'Unknown Player'}</span>
                            {member.role === 'leader' && (
                              <i className="fas fa-crown text-yellow-400 text-xs"></i>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Contributed: {(member.contributedKush || 0).toLocaleString()} KUSH
                          </div>
                        </div>
                      </div>
                      <Badge variant={member.role === 'leader' ? 'default' : 'secondary'}>
                        {member.role || 'Member'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <i className="fas fa-users text-2xl mb-2"></i>
                  <p>Loading guild members...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guild Wars Modal */}
      {warDetailsMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 touch-action-manipulation">
          <Card className="w-full max-w-2xl max-h-[85vh] overflow-hidden mobile-card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-sword text-red-500 animate-pulse"></i>
                  Guild Wars
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setWarDetailsMode(false)}
                  data-testid="button-close-wars"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </CardTitle>
              <CardDescription>
                Strategic battles between guilds for territory and glory
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-auto mobile-scroll">
              {activeWars.length > 0 ? (
                <div className="space-y-4">
                  {activeWars.map((war) => (
                    <div key={war.id} className="p-4 rounded-lg border bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-red-500">⚔️ Active War</h4>
                        <Badge className="bg-red-500 text-white animate-pulse">
                          {Math.floor((new Date(war.endTime).getTime() - Date.now()) / (24 * 60 * 60 * 1000))}d left
                        </Badge>
                      </div>
                      
                      {/* War Score Display */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-center flex-1">
                            <div className={`font-bold text-lg ${war.guild1Score > war.guild2Score ? 'text-green-500' : 'text-red-500'}`}>
                              {war.guild1Score.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Your Guild</div>
                          </div>
                          <div className="text-2xl font-bold text-muted-foreground mx-4">VS</div>
                          <div className="text-center flex-1">
                            <div className={`font-bold text-lg ${war.guild2Score > war.guild1Score ? 'text-green-500' : 'text-red-500'}`}>
                              {war.guild2Score.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Enemy Guild</div>
                          </div>
                        </div>
                        
                        {/* Prize Pool */}
                        <div className="text-center p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                          <div className="flex items-center justify-center gap-2">
                            <i className="fas fa-trophy text-yellow-500"></i>
                            <span className="font-semibold">Prize Pool: {war.prizePool.toLocaleString()} KUSH</span>
                          </div>
                        </div>
                        
                        {/* War Actions */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="bg-red-500 hover:bg-red-600 text-white mobile-button-enhanced">
                            <i className="fas fa-fist-raised mr-2"></i>
                            Battle
                          </Button>
                          <Button variant="outline" className="mobile-button-enhanced">
                            <i className="fas fa-shield mr-2"></i>
                            Defend
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fas fa-peace text-4xl text-muted-foreground mb-4"></i>
                  <p className="text-muted-foreground">No active wars</p>
                  <p className="text-sm text-muted-foreground mt-2">Your guild is at peace... for now</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Territories Modal */}
      {territoriesMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 touch-action-manipulation">
          <Card className="w-full max-w-2xl max-h-[85vh] overflow-hidden mobile-card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-map text-blue-500"></i>
                  Territory Control
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setTerritoriesMode(false)}
                  data-testid="button-close-territories"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </CardTitle>
              <CardDescription>
                Control territories for strategic bonuses and guild power
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-auto mobile-scroll">
              <div className="space-y-4">
                {territories.map((territory) => (
                  <div key={territory.id} className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] mobile-card-enhanced ${
                    territory.controllingGuildId === playerGuild?.guild?.id 
                      ? 'border-green-500 bg-green-500/10' 
                      : territory.controllingGuildId 
                        ? 'border-red-500 bg-red-500/10' 
                        : 'border-gray-500 bg-gray-500/10'
                  }`} data-testid={`territory-${territory.id}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          <i className={`${getBonusIcon(territory.bonusType)}`}></i>
                          {territory.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {territory.bonusType.replace('_', ' ').toUpperCase()}: +{territory.bonusValue}%
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          Defense: {territory.defenseStrength}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {territory.controllingGuildId === playerGuild?.guild?.id ? 'Controlled' : 
                           territory.controllingGuildId ? 'Enemy' : 'Neutral'}
                        </div>
                      </div>
                    </div>
                    
                    {territory.controllingGuildId !== playerGuild?.guild?.id && (
                      <Button 
                        className={`w-full mobile-button-enhanced touch-action-manipulation ${
                          territory.controllingGuildId 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        onClick={() => handleAttackTerritory(territory.id)}
                        data-testid={`button-attack-${territory.id}`}
                      >
                        <i className={`fas ${territory.controllingGuildId ? 'fa-sword' : 'fa-flag'} mr-2`}></i>
                        {territory.controllingGuildId ? 'Attack' : 'Claim'}
                      </Button>
                    )}
                    
                    {territory.controllingGuildId === playerGuild?.guild?.id && (
                      <div className="w-full p-2 rounded bg-green-500/20 text-center text-green-600 font-medium">
                        <i className="fas fa-crown mr-2"></i>
                        Under Your Control
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guild Quests Modal */}
      {questsMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 touch-action-manipulation">
          <Card className="w-full max-w-2xl max-h-[85vh] overflow-hidden mobile-card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-scroll text-purple-500 animate-pulse"></i>
                  Guild Quests
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuestsMode(false)}
                  data-testid="button-close-quests"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </CardTitle>
              <CardDescription>
                Work together to complete guild challenges and earn massive rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-auto mobile-scroll">
              <div className="space-y-4">
                {guildQuests.map((quest) => {
                  const progress = Math.min((quest.currentProgress / quest.targetValue) * 100, 100);
                  return (
                    <div key={quest.id} className={`p-4 rounded-lg border bg-card/50 transition-all duration-300 hover:scale-[1.02] mobile-card-enhanced ${
                      quest.isCompleted ? 'border-green-500 bg-green-500/10 animate-success-pulse' : 'border-border'
                    }`} data-testid={`quest-${quest.id}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <i className={`${getQuestIcon(quest.questType)} text-primary text-lg`}></i>
                          <div>
                            <h4 className="font-semibold">{quest.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{quest.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">
                            +{quest.kushReward.toLocaleString()} KUSH
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatTimeRemaining(quest.timeRemaining)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Quest Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Progress: {quest.currentProgress.toLocaleString()}/{quest.targetValue.toLocaleString()}
                          </span>
                          <span className="text-primary font-medium">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ease-out ${
                              progress === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse' : 'bg-primary'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {progress >= 100 && !quest.isCompleted && (
                        <Button 
                          className="w-full mt-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white animate-pulse mobile-button-enhanced touch-action-manipulation"
                          onClick={() => handleClaimQuest(quest.id)}
                          data-testid={`button-claim-quest-${quest.id}`}
                        >
                          <i className="fas fa-treasure-chest mr-2"></i>
                          Claim Guild Reward
                        </Button>
                      )}
                      
                      {quest.isCompleted && (
                        <div className="w-full mt-3 p-2 rounded bg-green-500/20 text-center text-green-600 font-medium">
                          <i className="fas fa-check-circle mr-2"></i>
                          Quest Completed!
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}