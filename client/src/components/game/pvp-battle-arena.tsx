import React, { useState, useEffect } from "react";

interface PvPBattleArenaProps {
  playerId: string;
}

interface Battle {
  id: string;
  challenger: { id: string; username: string; level: number; totalKush: number };
  defender: { id: string; username: string; level: number; totalKush: number };
  wager: number;
  status: 'pending' | 'active' | 'completed';
  winner?: string;
  createdAt: Date;
}

interface Tournament {
  id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  status: 'open' | 'active' | 'completed';
  startTime: Date;
}

interface BattleAbility {
  id: string;
  name: string;
  description: string;
  kushCost: number;
  cooldown: number;
  damage: number;
  icon: string;
}

const BATTLE_ABILITIES: BattleAbility[] = [
  {
    id: 'flame_strike',
    name: 'Flame Strike',
    description: 'Burn your opponent with fire damage',
    kushCost: 100,
    cooldown: 3,
    damage: 25,
    icon: 'fa-fire'
  },
  {
    id: 'ice_shard',
    name: 'Ice Shard',
    description: 'Freeze and damage opponent',
    kushCost: 150,
    cooldown: 4,
    damage: 30,
    icon: 'fa-snowflake'
  },
  {
    id: 'lightning_bolt',
    name: 'Lightning Bolt',
    description: 'Strike with electric power',
    kushCost: 200,
    cooldown: 5,
    damage: 40,
    icon: 'fa-bolt'
  },
  {
    id: 'poison_cloud',
    name: 'Poison Cloud',
    description: 'Toxic damage over time',
    kushCost: 120,
    cooldown: 6,
    damage: 20,
    icon: 'fa-skull-crossbones'
  }
];

export default function PvPBattleArena({ playerId }: PvPBattleArenaProps) {
  const [activeSubTab, setActiveSubTab] = useState<'battles' | 'tournaments' | 'leaderboard' | 'abilities'>('battles');
  const [battles, setBattles] = useState<Battle[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [availablePlayers, setAvailablePlayers] = useState<any[]>([]);
  const [battleLeaderboard, setBattleLeaderboard] = useState<any[]>([]);
  const [abilityPurchasing, setAbilityPurchasing] = useState<string | null>(null);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [activeBattle, setActiveBattle] = useState<Battle | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<BattleAbility | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBattleData();
  }, [playerId]);

  const fetchBattleData = async () => {
    setLoading(true);
    try {
      // Fetch active battles
      const battlesResponse = await fetch(`/api/battles/active`);
      const battlesData = await battlesResponse.json();
      setBattles(battlesData);

      // Fetch tournaments
      const tournamentsResponse = await fetch(`/api/tournaments/open`);
      const tournamentsData = await tournamentsResponse.json();
      
      // Convert startTime strings to Date objects
      const processedTournaments = tournamentsData.map((tournament: any) => ({
        ...tournament,
        startTime: tournament.startTime ? new Date(tournament.startTime) : new Date()
      }));
      
      setTournaments(processedTournaments);

      // Fetch real players to challenge (excluding current player)
      const playersResponse = await fetch(`/api/players/leaderboard?limit=10`);
      if (playersResponse.ok) {
        const playersData = await playersResponse.json();
        // Filter out current player and take top players
        const challengeable = playersData.filter((p: any) => p.id !== playerId).slice(0, 4);
        setAvailablePlayers(challengeable);

        // Use the same leaderboard data for battle leaderboard with mock battle stats
        const battleLeaderData = playersData.slice(0, 10).map((player: any, index: number) => ({
          rank: index + 1,
          id: player.id,
          username: player.username || `Player${index + 1}`,
          wins: Math.floor(Math.random() * 50) + 10, // Mock battle wins
          losses: Math.floor(Math.random() * 20) + 5, // Mock battle losses  
          points: Math.floor((player.totalKush || 0) / 10) + Math.floor(Math.random() * 1000), // Battle points based on KUSH
          winRate: 0, // Will be calculated below
          isCurrentPlayer: player.id === playerId
        }));

        // Calculate win rates
        battleLeaderData.forEach(player => {
          const totalGames = player.wins + player.losses;
          player.winRate = totalGames > 0 ? Math.round((player.wins / totalGames) * 100 * 10) / 10 : 0;
        });

        setBattleLeaderboard(battleLeaderData);
      }
    } catch (error) {
      console.error('Error fetching battle data:', error);
    }
    setLoading(false);
  };

  const challengePlayer = async (defenderId: string, wager: number) => {
    try {
      const response = await fetch('/api/battles/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengerId: playerId, defenderId, wager })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Challenge sent successfully!');
        await fetchBattleData();
      } else {
        alert(result.message || 'Failed to challenge player');
      }
    } catch (error) {
      console.error('Error challenging player:', error);
      alert('Failed to challenge player');
    }
  };

  const joinTournament = async (tournamentId: string) => {
    try {
      const response = await fetch('/api/tournaments/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, tournamentId })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Successfully joined tournament!');
        await fetchBattleData();
      } else {
        alert(result.message || 'Failed to join tournament');
      }
    } catch (error) {
      console.error('Error joining tournament:', error);
      alert('Failed to join tournament');
    }
  };

  const useAbility = async (abilityId: string, battleId: string) => {
    try {
      const response = await fetch('/api/battles/ability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, battleId, abilityId })
      });
      
      if (response.ok) {
        const result = await response.json();
        // Update battle state based on ability result
        setOpponentHP(prev => Math.max(0, prev - result.damage));
      }
    } catch (error) {
      console.error('Error using ability:', error);
    }
  };

  const purchaseAbility = async (ability: BattleAbility) => {
    setAbilityPurchasing(ability.id);
    try {
      const response = await fetch('/api/players/purchase-ability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          playerId, 
          abilityId: ability.id,
          kushCost: ability.kushCost
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(`Successfully purchased ${ability.name}! You can now use this ability in battles.`);
      } else {
        alert(result.message || `Need ${ability.kushCost} KUSH to purchase ${ability.name}`);
      }
    } catch (error) {
      console.error('Error purchasing ability:', error);
      alert('Failed to purchase ability');
    }
    setAbilityPurchasing(null);
  };

  const subTabs = [
    { id: 'battles', label: 'Battles', icon: 'fa-swords', color: 'text-red-400' },
    { id: 'tournaments', label: 'Tournaments', icon: 'fa-trophy', color: 'text-yellow-400' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'fa-crown', color: 'text-purple-400' },
    { id: 'abilities', label: 'Abilities', icon: 'fa-magic', color: 'text-blue-400' }
  ];

  const SubTabButton = ({ tab }: { tab: typeof subTabs[0] }) => (
    <button
      onClick={() => setActiveSubTab(tab.id as any)}
      className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg text-xs transition-all ${
        activeSubTab === tab.id 
          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
      }`}
    >
      <i className={`fas ${tab.icon} ${activeSubTab === tab.id ? tab.color : ''}`}></i>
      <span className="font-medium">{tab.label}</span>
    </button>
  );

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-red-900/20 to-orange-800/20 rounded-xl p-6 border border-red-500/20">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-400"></div>
          <span className="text-red-400">Loading Battle Arena...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/30 to-orange-800/30 rounded-xl p-4 border border-red-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <i className="fas fa-swords text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-400">⚔️ PvP Battle Arena</h2>
            <p className="text-red-300/80 text-sm">Challenge players to epic cannabis battles!</p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="bg-card/50 rounded-xl p-2 border border-border/50">
        <div className="grid grid-cols-4 gap-1">
          {subTabs.map((tab) => (
            <SubTabButton key={tab.id} tab={tab} />
          ))}
        </div>
      </div>

      {/* Active Battles */}
      {activeSubTab === 'battles' && (
        <div className="space-y-4">
          {/* Battle Arena */}
          {activeBattle && (
            <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-red-500/20">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-bold text-red-400">🔥 Active Battle</h3>
                
                {/* Battle Arena Display */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Player */}
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <i className="fas fa-user text-white text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-400">You</h4>
                      <div className="bg-blue-500/20 rounded-full h-3 mb-2">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full" 
                             style={{ width: `${playerHP}%` }}></div>
                      </div>
                      <p className="text-sm text-blue-300">{playerHP}/100 HP</p>
                    </div>
                  </div>

                  {/* Opponent */}
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                      <i className="fas fa-user-ninja text-white text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-400">{activeBattle.defender.username}</h4>
                      <div className="bg-red-500/20 rounded-full h-3 mb-2">
                        <div className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full" 
                             style={{ width: `${opponentHP}%` }}></div>
                      </div>
                      <p className="text-sm text-red-300">{opponentHP}/100 HP</p>
                    </div>
                  </div>
                </div>

                {/* Battle Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {BATTLE_ABILITIES.map(ability => (
                    <button
                      key={ability.id}
                      onClick={() => activeBattle && useAbility(ability.id, activeBattle.id)}
                      className="p-3 bg-gradient-to-br from-card to-card/80 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all text-center">
                      <i className={`fas ${ability.icon} text-red-400 text-xl mb-2`}></i>
                      <h5 className="font-semibold text-sm">{ability.name}</h5>
                      <p className="text-xs text-muted-foreground">{ability.damage} DMG</p>
                      <p className="text-xs text-yellow-400">{ability.kushCost} KUSH</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Challenge Players */}
          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-red-500/20">
            <h3 className="text-lg font-bold text-red-400 mb-4">⚔️ Challenge Players</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePlayers.length > 0 ? (
                availablePlayers.map(player => (
                  <div key={player.id} className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-500/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-white"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{player.username}</h4>
                          <p className="text-xs text-muted-foreground">Level {player.level || 1} • {(player.totalKush || 0).toLocaleString()} KUSH</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => challengePlayer(player.id, 1000)}
                        className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded text-xs font-medium hover:from-red-400 hover:to-orange-400 transition-all">
                        Challenge (1k)
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-2xl text-muted-foreground"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">No Players Available</h4>
                  <p className="text-muted-foreground text-sm">
                    No other players are currently available for challenges.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tournaments */}
      {activeSubTab === 'tournaments' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-yellow-500/20">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">🏆 Active Tournaments</h3>
            <div className="space-y-4">
              {tournaments.map(tournament => (
                <div key={tournament.id} className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-semibold text-yellow-400">{tournament.name}</h4>
                      <p className="text-sm text-muted-foreground">{tournament.participants}/{tournament.maxParticipants} players</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-400">🏆 {tournament.prizePool.toLocaleString()} KUSH</div>
                      <div className="text-xs text-yellow-400">Entry: {tournament.entryFee.toLocaleString()} KUSH</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Starts in: {Math.floor((new Date(tournament.startTime).getTime() - Date.now()) / 60000)} minutes
                    </div>
                    <button 
                      onClick={() => joinTournament(tournament.id)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded text-sm font-medium hover:from-yellow-400 hover:to-orange-400 transition-all">
                      Join Tournament
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeSubTab === 'leaderboard' && (
        <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-purple-400 mb-4">👑 Battle Leaderboard</h3>
          <div className="space-y-3">
            {battleLeaderboard.length > 0 ? (
              battleLeaderboard.map(player => (
                <div key={player.rank} 
                     className={`bg-gradient-to-r rounded-lg p-3 border transition-all ${
                       player.isCurrentPlayer 
                         ? 'from-blue-500/10 to-purple-500/10 border-blue-500/30' 
                         : 'from-purple-500/5 to-pink-500/5 border-purple-500/20'
                     }`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white' :
                        player.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-300 text-black' :
                        player.rank === 3 ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white' :
                        'bg-gradient-to-r from-purple-500 to-purple-400 text-white'
                      }`}>
                        {player.rank}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          {player.isCurrentPlayer ? 'You' : player.username}
                        </h4>
                        <p className="text-xs text-muted-foreground">{player.wins}W - {player.losses}L • {player.winRate}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-purple-400">{player.points.toLocaleString()} pts</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-trophy text-2xl text-muted-foreground"></i>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">No Battle Data</h4>
                <p className="text-muted-foreground text-sm">
                  Battle leaderboard will appear as players compete in PvP battles.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Battle Abilities */}
      {activeSubTab === 'abilities' && (
        <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-lg font-bold text-blue-400 mb-4">🔮 Battle Abilities</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Purchase powerful abilities to enhance your combat effectiveness!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BATTLE_ABILITIES.map(ability => (
              <button
                key={ability.id}
                onClick={() => purchaseAbility(ability)}
                disabled={abilityPurchasing === ability.id}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all text-left group disabled:cursor-not-allowed disabled:opacity-50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className={`fas ${ability.icon} text-white`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 group-hover:text-blue-300">{ability.name}</h4>
                    <p className="text-xs text-muted-foreground">{ability.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div className="text-center">
                    <div className="text-yellow-400 font-semibold">{ability.kushCost}</div>
                    <div className="text-muted-foreground">KUSH Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 font-semibold">{ability.damage}</div>
                    <div className="text-muted-foreground">Damage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">{ability.cooldown}s</div>
                    <div className="text-muted-foreground">Cooldown</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs font-medium text-green-400 group-hover:text-green-300">
                    {abilityPurchasing === ability.id ? 'Purchasing...' : 'Click to Purchase'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}