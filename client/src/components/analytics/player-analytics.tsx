import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SkeletonCard, SkeletonText } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, DollarSign, Trophy, Target, Clock } from 'lucide-react';

interface PlayerAnalyticsProps {
  playerId: string;
}

interface AnalyticsData {
  overview: {
    totalKushEarned: number;
    totalClicks: number;
    daysPlayed: number;
    averageKushPerDay: number;
    rankPosition: number;
    totalPlayers: number;
  };
  marketplace: {
    totalPurchases: number;
    totalSpent: number;
    favoriteStrain: string;
    averageTransactionValue: number;
    strainsOwned: number;
    totalStrains: number;
  };
  staking: {
    totalStaked: number;
    activeStakes: number;
    totalRewards: number;
    averageAPY: number;
    longestStakeDays: number;
    stakingEfficiency: number;
  };
  achievements: {
    unlockedCount: number;
    totalCount: number;
    recentAchievements: Array<{
      name: string;
      description: string;
      earnedDate: string;
      reward: number;
    }>;
    nextAchievement: {
      name: string;
      progress: number;
      target: number;
    } | null;
  };
  activity: {
    weeklyActivity: Array<{
      day: string;
      clicks: number;
      kushEarned: number;
    }>;
    peakActivity: {
      hour: number;
      clicks: number;
    };
    longestSession: number;
  };
}

export default function PlayerAnalytics({ playerId }: PlayerAnalyticsProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | 'all'>('7d');

  const { data: analytics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics/player', playerId, selectedTimeRange],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-6 section-fade-in" data-testid="analytics-loading">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <SkeletonText className="w-1/3 h-6" />
              <SkeletonCard className="h-48" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="text-center py-8" data-testid="analytics-error">
        <p className="text-muted-foreground">Unable to load analytics data</p>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6 section-fade-in" data-testid="player-analytics">
      {/* Header with Time Range Selection */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">📊 Player Analytics</h2>
        <div className="flex space-x-2">
          {(['7d', '30d', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm transition-all touch-interactive ${
                selectedTimeRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
              data-testid={`button-timerange-${range}`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="touch-interactive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              Total $KUSH Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500" data-testid="metric-total-kush">
              {formatNumber(analytics.overview.totalKushEarned)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatNumber(analytics.overview.averageKushPerDay)}/day avg
            </p>
          </CardContent>
        </Card>

        <Card className="touch-interactive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-500" data-testid="metric-total-clicks">
              {formatNumber(analytics.overview.totalClicks)}
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round(analytics.overview.totalClicks / Math.max(analytics.overview.daysPlayed, 1))}/day avg
            </p>
          </CardContent>
        </Card>

        <Card className="touch-interactive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Leaderboard Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-500" data-testid="metric-rank">
              #{analytics.overview.rankPosition}
            </p>
            <p className="text-xs text-muted-foreground">
              of {formatNumber(analytics.overview.totalPlayers)} players
            </p>
          </CardContent>
        </Card>

        <Card className="touch-interactive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              Days Played
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-500" data-testid="metric-days-played">
              {analytics.overview.daysPlayed}
            </p>
            <p className="text-xs text-muted-foreground">
              Active player
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace" className="touch-interactive">🏪 Market</TabsTrigger>
          <TabsTrigger value="staking" className="touch-interactive">💎 Staking</TabsTrigger>
          <TabsTrigger value="achievements" className="touch-interactive">🏆 Progress</TabsTrigger>
          <TabsTrigger value="activity" className="touch-interactive">📈 Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🏪 Marketplace Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary" data-testid="marketplace-purchases">
                    {analytics.marketplace.totalPurchases}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Purchases</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500" data-testid="marketplace-spent">
                    {formatNumber(analytics.marketplace.totalSpent)}
                  </p>
                  <p className="text-sm text-muted-foreground">$KUSH Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500" data-testid="marketplace-avg-value">
                    {formatNumber(analytics.marketplace.averageTransactionValue)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Transaction</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500" data-testid="marketplace-strains-owned">
                    {analytics.marketplace.strainsOwned}/{analytics.marketplace.totalStrains}
                  </p>
                  <p className="text-sm text-muted-foreground">Strains Owned</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Strain Collection Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((analytics.marketplace.strainsOwned / analytics.marketplace.totalStrains) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(analytics.marketplace.strainsOwned, analytics.marketplace.totalStrains)} 
                  className="h-2"
                />
              </div>

              {analytics.marketplace.favoriteStrain && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Favorite Strain</p>
                  <p className="font-semibold text-primary" data-testid="favorite-strain">
                    🌿 {analytics.marketplace.favoriteStrain}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>💎 Staking Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary" data-testid="staking-total">
                    {formatNumber(analytics.staking.totalStaked)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Staked</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500" data-testid="staking-rewards">
                    {formatNumber(analytics.staking.totalRewards)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Rewards</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500" data-testid="staking-apy">
                    {analytics.staking.averageAPY.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Average APY</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Staking Efficiency</span>
                  <span className="text-sm text-muted-foreground">
                    {analytics.staking.stakingEfficiency.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={analytics.staking.stakingEfficiency} 
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Active Stakes</p>
                  <p className="font-semibold text-primary" data-testid="active-stakes">
                    {analytics.staking.activeStakes}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Longest Stake</p>
                  <p className="font-semibold text-primary" data-testid="longest-stake">
                    {analytics.staking.longestStakeDays} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🏆 Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary" data-testid="achievements-completed">
                  {analytics.achievements.unlockedCount}/{analytics.achievements.totalCount}
                </p>
                <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completion Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((analytics.achievements.unlockedCount / analytics.achievements.totalCount) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(analytics.achievements.unlockedCount, analytics.achievements.totalCount)} 
                  className="h-2"
                />
              </div>

              {analytics.achievements.nextAchievement && (
                <div className="bg-accent/20 border border-accent/30 rounded-lg p-4">
                  <h4 className="font-semibold text-accent mb-2">🎯 Next Achievement</h4>
                  <p className="font-medium" data-testid="next-achievement-name">
                    {analytics.achievements.nextAchievement.name}
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span data-testid="next-achievement-progress">
                        {formatNumber(analytics.achievements.nextAchievement.progress)} / {formatNumber(analytics.achievements.nextAchievement.target)}
                      </span>
                    </div>
                    <Progress 
                      value={calculateProgress(analytics.achievements.nextAchievement.progress, analytics.achievements.nextAchievement.target)} 
                      className="h-2"
                    />
                  </div>
                </div>
              )}

              {/* Recent Achievements */}
              {analytics.achievements.recentAchievements.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">🆕 Recent Achievements</h4>
                  <div className="space-y-2">
                    {analytics.achievements.recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm" data-testid={`recent-achievement-${index}-name`}>
                            {achievement.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary" data-testid={`recent-achievement-${index}-reward`}>
                          +{formatNumber(achievement.reward)} $KUSH
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📈 Activity Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500" data-testid="peak-hour">
                    {analytics.activity.peakActivity.hour}:00
                  </p>
                  <p className="text-sm text-muted-foreground">Peak Activity Hour</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500" data-testid="peak-clicks">
                    {formatNumber(analytics.activity.peakActivity.clicks)}
                  </p>
                  <p className="text-sm text-muted-foreground">Peak Hour Clicks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500" data-testid="longest-session">
                    {Math.round(analytics.activity.longestSession / 60)}m
                  </p>
                  <p className="text-sm text-muted-foreground">Longest Session</p>
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div className="space-y-3">
                <h4 className="font-semibold">📊 Weekly Activity</h4>
                <div className="space-y-2">
                  {analytics.activity.weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-16" data-testid={`activity-day-${index}`}>
                        {day.day}
                      </span>
                      <div className="flex-1 mx-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                              style={{ 
                                width: `${Math.min((day.clicks / Math.max(...analytics.activity.weeklyActivity.map(d => d.clicks))) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground w-20 text-right" data-testid={`activity-clicks-${index}`}>
                        {formatNumber(day.clicks)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}