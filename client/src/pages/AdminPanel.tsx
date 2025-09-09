import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Shield, Users, DollarSign, Settings, AlertTriangle, Send, BarChart3, TrendingUp } from 'lucide-react';

interface Player {
  id: string;
  username: string;
  totalKush: number;
  totalClicks: number;
  walletAddress?: string;
  createdAt: string;
  onChainBalance?: number;
}

interface TokenPayout {
  id: string;
  playerId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  txHash?: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [telegramCode, setTelegramCode] = useState('');
  const [step, setStep] = useState<'login' | '2fa'>('login');
  const [players, setPlayers] = useState<Player[]>([]);
  const [tokenPayouts, setTokenPayouts] = useState<TokenPayout[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationPlatform, setNotificationPlatform] = useState<'telegram' | 'discord' | 'email' | 'all'>('all');
  const [notificationSubject, setNotificationSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balancesLoading, setBalancesLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const { toast } = useToast();

  // Admin authentication - Step 1: Username/Password
  const handleLogin = async () => {
    if (adminUsername === 'walsh' && adminPassword === 'Trapstar146599@') {
      try {
        // Send 2FA code via Telegram
        await apiRequest('POST', '/api/admin/send-2fa-code', { username: adminUsername });
        
        setStep('2fa');
        toast({
          title: "2FA Code Sent",
          description: "Check your Telegram for the verification code",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send 2FA code",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  // Admin authentication - Step 2: 2FA Verification
  const handle2FA = async () => {
    try {
      const response = await apiRequest('POST', '/api/admin/verify-2fa', { 
        username: adminUsername,
        code: telegramCode 
      });

      const result = await response.json();
      if (result.success) {
        setIsAuthenticated(true);
        toast({
          title: "Access Granted",
          description: "Welcome to the admin panel, walsh",
        });
        loadData();
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid 2FA code",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "2FA verification failed",
        variant: "destructive",
      });
    }
  };

  // Load admin data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [playersResponse, payoutsResponse] = await Promise.all([
        apiRequest('GET', '/api/players'),
        apiRequest('GET', '/api/token-payouts')
      ]);
      
      const playersData = await playersResponse.json();
      setPlayers(playersData);
      setTokenPayouts(await payoutsResponse.json());
      
      // Fetch on-chain balances for players with wallets
      fetchOnChainBalances(playersData);
      
      // Fetch analytics data
      loadAnalytics();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load analytics data
  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const response = await apiRequest('GET', '/api/admin/analytics');
      const analytics = await response.json();
      setAnalyticsData(analytics);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // Fetch on-chain balances for players
  const fetchOnChainBalances = async (playersData: Player[]) => {
    setBalancesLoading(true);
    try {
      const updatedPlayers = await Promise.all(
        playersData.map(async (player) => {
          if (player.walletAddress) {
            try {
              const balanceResponse = await apiRequest('GET', `/api/players/${player.id}/token-balance`);
              const balanceData = await balanceResponse.json();
              return { ...player, onChainBalance: balanceData.balance || 0 };
            } catch (error) {
              console.warn(`Failed to fetch balance for ${player.username}:`, error);
              return { ...player, onChainBalance: 0 };
            }
          }
          return player;
        })
      );
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error('Error fetching on-chain balances:', error);
    } finally {
      setBalancesLoading(false);
    }
  };

  // Filter players based on search
  const filteredPlayers = players.filter(player => 
    player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.id.includes(searchTerm)
  );

  // Delete player
  const deletePlayer = async (playerId: string) => {
    if (!confirm('Are you sure you want to delete this player? This action cannot be undone.')) {
      return;
    }

    try {
      await apiRequest('DELETE', `/api/players/${playerId}`);
      
      setPlayers(players.filter(p => p.id !== playerId));
      toast({
        title: "Success",
        description: "Player deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete player",
        variant: "destructive",
      });
    }
  };

  // Confirm token payout
  const confirmPayout = async (payoutId: string, txHash: string) => {
    if (!txHash.trim()) {
      toast({
        title: "Error",
        description: "Transaction hash is required",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest('POST', `/api/token-payouts/${payoutId}/confirm`, { txHash });
      
      loadData(); // Refresh data
      toast({
        title: "Success",
        description: "Payout confirmed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm payout",
        variant: "destructive",
      });
    }
  };

  // Mark payout as failed
  const markPayoutFailed = async (payoutId: string, reason: string) => {
    try {
      await apiRequest('POST', `/api/token-payouts/${payoutId}/mark-failed`, { reason });
      
      loadData(); // Refresh data
      toast({
        title: "Success",
        description: "Payout marked as failed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark payout as failed",
        variant: "destructive",
      });
    }
  };

  // Send notification
  const sendNotification = async () => {
    if (!notificationMessage.trim()) {
      toast({
        title: "Error",
        description: "Message cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const endpoint = notificationPlatform === 'all' 
        ? '/api/admin/notify/all'
        : `/api/admin/notify/${notificationPlatform}`;

      const payload = { 
        message: notificationMessage,
        adminUsername: adminUsername 
      };
      
      // Add subject for email notifications
      if (notificationPlatform === 'email' || notificationPlatform === 'all') {
        payload.subject = notificationSubject || '🌿 KushKlicker Update';
      }

      await apiRequest('POST', endpoint, payload);

      setNotificationMessage('');
      setNotificationSubject('');
      toast({
        title: "Success",
        description: `Notification sent to ${notificationPlatform}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    }
  };

  // Clear all data
  const clearAllData = async () => {
    const password = prompt('Enter admin password to clear all data:');
    if (!password) return;

    if (!confirm('This will DELETE ALL PLAYER DATA. Are you absolutely sure?')) {
      return;
    }

    try {
      await apiRequest('POST', '/api/admin/system/clear-all-data', { adminPassword: password });

      loadData(); // Refresh data
      toast({
        title: "Success",
        description: "All player data cleared",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear data",
        variant: "destructive",
      });
    }
  };

  // Login screen
  if (!isAuthenticated) {
    if (step === 'login') {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-green-400">
                <Shield className="h-6 w-6" />
                KushKlicker Admin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                data-testid="input-admin-username"
              />
              <Input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-gray-700 border-gray-600 text-white"
                data-testid="input-admin-password"
              />
              <Button 
                onClick={handleLogin} 
                className="w-full bg-green-600 hover:bg-green-700"
                data-testid="button-admin-login"
                disabled={isLoading}
              >
                {isLoading ? 'Sending 2FA...' : 'Continue to 2FA'}
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    // 2FA screen
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-green-400">
              <Shield className="h-6 w-6" />
              2FA Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-300 text-sm">
              A verification code has been sent to your Telegram. Enter it below:
            </p>
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={telegramCode}
              onChange={(e) => setTelegramCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyPress={(e) => e.key === 'Enter' && telegramCode.length === 6 && handle2FA()}
              className="bg-gray-700 border-gray-600 text-white text-center text-2xl tracking-widest"
              data-testid="input-2fa-code"
              maxLength={6}
            />
            <Button 
              onClick={handle2FA} 
              className="w-full bg-green-600 hover:bg-green-700"
              data-testid="button-verify-2fa"
              disabled={telegramCode.length !== 6 || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & Access Panel'}
            </Button>
            <Button 
              onClick={() => {
                setStep('login');
                setTelegramCode('');
                setAdminUsername('');
                setAdminPassword('');
              }}
              variant="outline" 
              className="w-full border-gray-600 text-gray-300"
              data-testid="button-back-to-login"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-400">KushKlicker Admin Panel</h1>
          <Button 
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-gray-600"
            data-testid="button-admin-logout"
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-green-600">
              <Users className="h-4 w-4 mr-2" />
              Players ({players.length})
            </TabsTrigger>
            <TabsTrigger value="payouts" className="data-[state=active]:bg-green-600">
              <DollarSign className="h-4 w-4 mr-2" />
              Token Payouts ({tokenPayouts.filter(p => p.status === 'pending').length} pending)
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-green-600">
              <Send className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-green-600">
              <Settings className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            {analyticsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p>Loading analytics...</p>
              </div>
            ) : analyticsData ? (
              <div className="space-y-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Total Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{analyticsData.users.total}</div>
                      <p className="text-xs text-gray-400">{analyticsData.users.walletLinkRate}% have wallets</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Total KUSH Earned
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-400">{analyticsData.activity.totalKushEarned.toLocaleString()}</div>
                      <p className="text-xs text-gray-400">Avg: {analyticsData.activity.averageKushPerUser.toLocaleString()}/user</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Token Rewards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-400">{analyticsData.tokens.totalDistributedTokens.toLocaleString()}</div>
                      <p className="text-xs text-gray-400">{analyticsData.tokens.pendingRewards} pending</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Platform Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-white space-y-1">
                        <div>Telegram: {analyticsData.users.telegram}</div>
                        <div>Discord: {analyticsData.users.discord}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User Activity */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        User Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Clicks:</span>
                        <span className="text-white font-mono">{analyticsData.activity.totalClicks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Users with Wallets:</span>
                        <span className="text-white font-mono">{analyticsData.users.withWallets}/{analyticsData.users.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">New Users Today:</span>
                        <span className="text-white font-mono">{analyticsData.recentActivity.newUsersToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Wallet Link Rate:</span>
                        <span className="text-green-400 font-mono">{analyticsData.users.walletLinkRate}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Token Distribution */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-yellow-400 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Token Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Completed Rewards:</span>
                        <span className="text-white font-mono">{analyticsData.tokens.completedRewards}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Pending Rewards:</span>
                        <span className="text-yellow-400 font-mono">{analyticsData.tokens.pendingRewards}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Tokens Distributed:</span>
                        <span className="text-green-400 font-mono">{analyticsData.tokens.totalDistributedTokens.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Tokens Pending:</span>
                        <span className="text-white font-mono">{analyticsData.tokens.totalPendingTokens.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Performers */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Top Performers (KUSH Leaderboard)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.leaderboard.map((player: any, index: number) => (
                        <div key={player.username} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="font-mono text-lg text-yellow-400">#{index + 1}</span>
                            <div>
                              <div className="font-medium text-white">{player.username}</div>
                              <div className="text-sm text-gray-400">{player.totalClicks.toLocaleString()} clicks</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-green-400">{player.totalKush.toLocaleString()} KUSH</div>
                            <div className="text-xs text-gray-400">{player.hasWallet ? '🔗 Wallet' : '❌ No wallet'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Quick Analytics Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        onClick={loadAnalytics}
                        disabled={analyticsLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                        data-testid="button-refresh-analytics"
                      >
                        🔄 Refresh Analytics
                      </Button>
                      <Button 
                        onClick={() => window.open('/admin#payouts', '_blank')}
                        className="bg-yellow-600 hover:bg-yellow-700"
                        data-testid="button-view-pending-payouts"
                      >
                        💰 View Pending Payouts ({analyticsData.tokens.pendingRewards})
                      </Button>
                      <Button 
                        onClick={() => window.open('/admin#players', '_blank')}
                        className="bg-green-600 hover:bg-green-700"
                        data-testid="button-view-all-players"
                      >
                        👥 View All Players ({analyticsData.users.total})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Analytics data unavailable</p>
                <Button 
                  onClick={loadAnalytics}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  data-testid="button-load-analytics"
                >
                  Load Analytics
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Player Management</CardTitle>
                <Input
                  placeholder="Search players by username or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                  data-testid="input-search-players"
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading players...</p>
                  ) : filteredPlayers.length === 0 ? (
                    <p className="text-gray-400">No players found</p>
                  ) : (
                    filteredPlayers.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{player.username}</h3>
                          <p className="text-sm text-gray-400">ID: {player.id}</p>
                          <p className="text-sm">
                            💰 {player.totalKush.toLocaleString()} KUSH | 
                            🖱️ {player.totalClicks.toLocaleString()} clicks
                          </p>
                          {player.walletAddress && (
                            <div>
                              <p className="text-xs text-green-400">🔗 Wallet connected</p>
                              <p className="text-xs text-blue-400">
                                🪙 On-chain: {balancesLoading ? 'Loading...' : 
                                  (player.onChainBalance !== undefined ? 
                                    `${player.onChainBalance.toLocaleString()} KUSH` : 
                                    'Checking...')}
                              </p>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => deletePlayer(player.id)}
                          variant="destructive"
                          size="sm"
                          data-testid={`button-delete-player-${player.id}`}
                        >
                          Delete
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Token Payouts Tab */}
          <TabsContent value="payouts">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Token Reward Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokenPayouts.filter(p => p.status === 'pending').map((payout) => (
                    <div key={payout.id} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">Player: {payout.playerId}</h3>
                          <p className="text-sm text-gray-400">{payout.reason}</p>
                          <p className="text-lg text-green-400">🪙 {payout.amount} tokens</p>
                        </div>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          {payout.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Input
                          placeholder="Transaction hash"
                          className="bg-gray-600 border-gray-500 flex-1"
                          data-testid={`input-tx-hash-${payout.id}`}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              confirmPayout(payout.id, input.value);
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            const input = document.querySelector(`[data-testid="input-tx-hash-${payout.id}"]`) as HTMLInputElement;
                            if (input) confirmPayout(payout.id, input.value);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          data-testid={`button-confirm-payout-${payout.id}`}
                        >
                          Confirm
                        </Button>
                        <Button
                          onClick={() => markPayoutFailed(payout.id, 'Admin marked as failed')}
                          variant="destructive"
                          data-testid={`button-fail-payout-${payout.id}`}
                        >
                          Mark Failed
                        </Button>
                      </div>
                    </div>
                  ))}
                  {tokenPayouts.filter(p => p.status === 'pending').length === 0 && (
                    <p className="text-gray-400">No pending payouts</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Send Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <select
                    value={notificationPlatform}
                    onChange={(e) => setNotificationPlatform(e.target.value as any)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                    data-testid="select-notification-platform"
                  >
                    <option value="all">All Platforms</option>
                    <option value="telegram">Telegram Only</option>
                    <option value="discord">Discord Only</option>
                    <option value="email">Email Only</option>
                  </select>
                </div>
                {(notificationPlatform === 'email' || notificationPlatform === 'all') && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Subject</label>
                    <Input
                      placeholder="🌿 KushKlicker Update"
                      value={notificationSubject}
                      onChange={(e) => setNotificationSubject(e.target.value)}
                      className="bg-gray-700 border-gray-600"
                      data-testid="input-notification-subject"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Enter notification message..."
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    rows={4}
                    data-testid="textarea-notification-message"
                  />
                </div>
                <Button
                  onClick={sendNotification}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  data-testid="button-send-notification"
                >
                  Send Notification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    This will permanently delete ALL player data including accounts, progress, and achievements.
                  </p>
                  <Button
                    onClick={clearAllData}
                    variant="destructive"
                    data-testid="button-clear-all-data"
                  >
                    Clear All Player Data
                  </Button>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-2">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Total Players</p>
                      <p className="text-xl font-bold text-green-400">{players.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Pending Payouts</p>
                      <p className="text-xl font-bold text-yellow-400">
                        {tokenPayouts.filter(p => p.status === 'pending').length}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Connected Wallets</p>
                      <p className="text-xl font-bold text-blue-400">
                        {players.filter(p => p.walletAddress).length}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Total KUSH</p>
                      <p className="text-xl font-bold text-purple-400">
                        {players.reduce((total, p) => total + p.totalKush, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}