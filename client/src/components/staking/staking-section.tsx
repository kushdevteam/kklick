import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/hooks/use-game-state';

interface StakingPool {
  id: string;
  name: string;
  duration: number; // in days
  apy: number; // in basis points (100 = 1%)
  minStake: number;
  maxStake: number;
  totalStaked: number;
  participants: number;
}

interface PlayerStake {
  id: string;
  poolId: string;
  stakedAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  rewardsClaimed?: number;
}

export default function StakingSection() {
  const [pools, setPools] = useState<StakingPool[]>([]);
  const [playerStakes, setPlayerStakes] = useState<PlayerStake[]>([]);
  const [stakeAmounts, setStakeAmounts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { gameState } = useGameState();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [gameState?.id]);

  const fetchData = async () => {
    try {
      const [poolsResponse, stakesResponse] = await Promise.all([
        fetch('/api/staking/pools'),
        gameState?.id ? fetch(`/api/staking/player/${gameState.id}`) : null
      ]);

      if (poolsResponse.ok) {
        const poolsData = await poolsResponse.json();
        setPools(poolsData);
      }

      if (stakesResponse && stakesResponse.ok) {
        const stakesData = await stakesResponse.json();
        setPlayerStakes(stakesData);
      }
    } catch (error) {
      console.error('Error fetching staking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async (poolId: string) => {
    const amount = parseInt(stakeAmounts[poolId] || '0');
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid stake amount",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/staking/stake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: gameState?.id,
          poolId,
          amount
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Staking Successful!",
          description: result.message,
        });
        setStakeAmounts(prev => ({ ...prev, [poolId]: '' }));
        fetchData(); // Refresh data
      } else {
        toast({
          title: "Staking Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stake tokens",
        variant: "destructive",
      });
    }
  };

  const handleClaim = async (stakeId: string) => {
    try {
      const response = await fetch(`/api/staking/claim/${stakeId}`, {
        method: 'POST'
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Rewards Claimed!",
          description: result.message,
        });
        fetchData(); // Refresh data
      } else {
        toast({
          title: "Claim Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim rewards",
        variant: "destructive",
      });
    }
  };

  const formatAPY = (apy: number) => {
    return (apy / 100).toFixed(1) + '%';
  };

  const isStakeReady = (endDate: string) => {
    return new Date() >= new Date(endDate);
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ready to claim!';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="fas fa-coins text-primary"></i>
            $KUSH Staking Pools
          </CardTitle>
          <CardDescription>
            Stake your $KUSH tokens to earn passive rewards. Lock up your tokens for guaranteed returns.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Active Stakes */}
      {playerStakes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Active Stakes</h3>
          {playerStakes.map((stake) => (
            <Card key={stake.id} className="border-primary/50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold">{stake.stakedAmount.toLocaleString()} $KUSH Staked</p>
                    <p className="text-sm text-muted-foreground">{getTimeRemaining(stake.endDate)}</p>
                    <Badge variant={stake.status === 'active' ? 'default' : 'secondary'}>
                      {stake.status}
                    </Badge>
                  </div>
                  {stake.status === 'active' && isStakeReady(stake.endDate) && (
                    <Button onClick={() => handleClaim(stake.id)}>
                      <i className="fas fa-hand-holding-dollar mr-2"></i>
                      Claim Rewards
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Available Pools */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Staking Pools</h3>
        {pools.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <i className="fas fa-coins text-4xl text-muted-foreground mb-4"></i>
              <p className="text-muted-foreground">No staking pools available</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {pools.map((pool) => (
              <Card key={pool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{pool.name}</span>
                    <Badge variant="secondary">{formatAPY(pool.apy)} APY</Badge>
                  </CardTitle>
                  <CardDescription>{pool.duration} day lock period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Min Stake</p>
                        <p className="font-semibold">{pool.minStake.toLocaleString()} $KUSH</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Max Stake</p>
                        <p className="font-semibold">{pool.maxStake.toLocaleString()} $KUSH</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Staked</p>
                        <p className="font-semibold">{pool.totalStaked.toLocaleString()} $KUSH</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Participants</p>
                        <p className="font-semibold">{pool.participants}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder={`Stake amount (${pool.minStake}-${pool.maxStake})`}
                        value={stakeAmounts[pool.id] || ''}
                        onChange={(e) => setStakeAmounts(prev => ({ ...prev, [pool.id]: e.target.value }))}
                        min={pool.minStake}
                        max={Math.min(pool.maxStake, gameState?.totalKush || 0)}
                      />
                      <Button
                        className="w-full"
                        onClick={() => handleStake(pool.id)}
                        disabled={!gameState || !stakeAmounts[pool.id] || parseInt(stakeAmounts[pool.id] || '0') < pool.minStake}
                      >
                        <i className="fas fa-lock mr-2"></i>
                        Stake $KUSH
                      </Button>
                      {gameState && gameState.totalKush < pool.minStake && (
                        <p className="text-xs text-muted-foreground text-center">
                          Need {(pool.minStake - gameState.totalKush).toLocaleString()} more KUSH
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}