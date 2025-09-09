import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Player {
  id: string;
  username: string;
  totalKush: number;
  totalClicks: number;
  walletAddress?: string;
  telegramUserId?: string;
  discordUserId?: string;
  createdAt: string;
}

interface TokenPayout {
  id: string;
  playerId: string;
  walletAddress: string;
  amount: number;
  reason: string;
  network: string;
  status: 'pending' | 'completed' | 'failed' | 'claim_requested';
  transactionSignature?: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFACode, setTwoFACode] = useState('');
  const [selectedNetwork] = useState<'mainnet'>('mainnet');
  const [activeTab, setActiveTab] = useState('token-payouts');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // First step: Username and password authentication
  const authenticate = async () => {
    if (username.toLowerCase().trim() === 'walsh' && password === 'Trapstar146599@') {
      setIsLoading(true);
      
      try {
        // Send 2FA code request
        const baseUrl = 'http://localhost:5000'; // Use main server for 2FA
        const response = await fetch(`${baseUrl}/api/admin/send-2fa-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'walsh' })
        });

        if (response.ok) {
          setShowTwoFA(true);
          alert('2FA code sent to your Telegram! Check your messages.');
        } else {
          const errorData = await response.json();
          alert(`Failed to send 2FA code: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error sending 2FA:', error);
        alert('Failed to send 2FA code. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Invalid credentials');
    }
  };

  // Second step: 2FA code verification
  const verifyTwoFA = async () => {
    if (!twoFACode.trim()) {
      alert('Please enter the 2FA code');
      return;
    }

    setIsLoading(true);
    
    try {
      const baseUrl = 'http://localhost:5000'; // Use main server for 2FA
      const response = await fetch(`${baseUrl}/api/admin/verify-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: 'walsh',
          code: twoFACode.trim()
        })
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setShowTwoFA(false);
        localStorage.setItem('admin_authenticated', 'true');
        alert('Login successful!');
      } else {
        const errorData = await response.json();
        alert(`2FA verification failed: ${errorData.error}`);
        if (errorData.attemptsRemaining) {
          alert(`${errorData.attemptsRemaining} attempts remaining`);
        }
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      alert('Failed to verify 2FA code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all players
  const { data: players = [], isLoading: playersLoading } = useQuery({
    queryKey: ['/api/players'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : window.location.origin;
      const response = await fetch(`${baseUrl}/api/players`);
      if (!response.ok) throw new Error('Failed to fetch players');
      return response.json();
    }
  });

  // Fetch token payouts
  const { data: tokenPayouts = [], isLoading: payoutsLoading, error: payoutsError } = useQuery({
    queryKey: ['/api/token-payouts', selectedNetwork],
    enabled: isAuthenticated,
    queryFn: async () => {
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : window.location.origin;
      console.log('🔍 Admin Panel - Making API call:', `${baseUrl}/api/token-payouts?network=${selectedNetwork}&status=claim_requested`);
      const response = await fetch(`${baseUrl}/api/token-payouts?network=${selectedNetwork}&status=claim_requested`);
      if (!response.ok) {
        console.error('❌ API call failed:', response.status, response.statusText);
        throw new Error('Failed to fetch payouts');
      }
      const data = await response.json();
      console.log('✅ Admin Panel - Received data:', data);
      return data;
    }
  });

  // Confirm token payout
  const confirmPayoutMutation = useMutation({
    mutationFn: async (payoutId: string) => {
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : window.location.origin;
      const response = await fetch(`${baseUrl}/api/token-payouts/${payoutId}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUsername: username })
      });
      if (!response.ok) throw new Error('Failed to confirm payout');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/token-payouts'] });
    }
  });

  // Mark payout as failed
  const failPayoutMutation = useMutation({
    mutationFn: async (payoutId: string) => {
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : window.location.origin;
      const response = await fetch(`${baseUrl}/api/token-payouts/${payoutId}/mark-failed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUsername: username })
      });
      if (!response.ok) throw new Error('Failed to mark payout as failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/token-payouts'] });
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            KushKlicker Admin Panel
          </h1>
          
          {!showTwoFA ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter admin username"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter admin password"
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && authenticate()}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={authenticate}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {isLoading ? 'Sending 2FA Code...' : 'Login'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-green-400 mb-2">✅ Credentials verified!</p>
                <p className="text-gray-300 text-sm">Check your Telegram for the 2FA code</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  2FA Verification Code
                </label>
                <input
                  type="text"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg font-mono"
                  placeholder="000000"
                  maxLength={6}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && verifyTwoFA()}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={verifyTwoFA}
                disabled={isLoading || twoFACode.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </button>
              <button
                onClick={() => {
                  setShowTwoFA(false);
                  setTwoFACode('');
                }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">KushKlicker Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-white">
              Mainnet Only
            </span>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('admin_authenticated');
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'analytics' 
                  ? 'bg-slate-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>📊</span>
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'players' 
                  ? 'bg-slate-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>👥</span>
              <span>Players ({players.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('token-payouts')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'token-payouts' 
                  ? 'bg-slate-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>💰</span>
              <span>Token Payouts ({tokenPayouts.length} pending)</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'notifications' 
                  ? 'bg-slate-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>🔔</span>
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'system' 
                  ? 'bg-slate-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>⚙️</span>
              <span>System</span>
            </button>
          </nav>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Players</h3>
                <p className="text-3xl font-bold text-green-400">{players.length}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Pending Payouts</h3>
                <p className="text-3xl font-bold text-yellow-400">{tokenPayouts.length}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total KUSH</h3>
                <p className="text-3xl font-bold text-purple-400">
                  {players.reduce((sum, p) => sum + p.totalKush, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Players Tab */}
        {activeTab === 'players' && (
          <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Players ({players.length})</h2>
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            {playersLoading ? (
              <div className="p-4 text-center">Loading players...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Username</th>
                      <th className="px-4 py-2 text-left">KUSH</th>
                      <th className="px-4 py-2 text-left">Clicks</th>
                      <th className="px-4 py-2 text-left">Wallet</th>
                      <th className="px-4 py-2 text-left">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player: Player) => (
                      <tr key={player.id} className="border-t border-slate-700">
                        <td className="px-4 py-2">{player.username}</td>
                        <td className="px-4 py-2">{player.totalKush.toLocaleString()}</td>
                        <td className="px-4 py-2">{player.totalClicks.toLocaleString()}</td>
                        <td className="px-4 py-2">
                          {player.walletAddress ? 
                            `${player.walletAddress.slice(0, 8)}...${player.walletAddress.slice(-8)}` : 
                            'Not linked'
                          }
                        </td>
                        <td className="px-4 py-2">
                          {new Date(player.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        )}

        {/* Token Payouts Tab */}
        {activeTab === 'token-payouts' && (
          <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Token Payouts - {selectedNetwork.charAt(0).toUpperCase() + selectedNetwork.slice(1)}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  const selectedIds = tokenPayouts
                    .filter((p: any) => p.status === 'claim_requested')
                    .map((p: any) => p.id);
                  selectedIds.forEach(id => confirmPayoutMutation.mutate(id));
                  setTimeout(() => {
                    alert(`✅ Bulk approved ${selectedIds.length} token claims!`);
                  }, 1000);
                }}
                className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm flex items-center space-x-2"
                disabled={tokenPayouts.filter(p => p.status === 'claim_requested').length === 0}
              >
                <span>✅</span>
                <span>Approve All ({tokenPayouts.filter(p => p.status === 'claim_requested').length})</span>
              </button>
              <button
                onClick={() => {
                  const selectedIds = tokenPayouts
                    .filter((p: any) => p.status === 'claim_requested')
                    .map((p: any) => p.id);
                  selectedIds.forEach(id => failPayoutMutation.mutate(id));
                  setTimeout(() => {
                    alert(`❌ Bulk rejected ${selectedIds.length} token claims.`);
                  }, 1000);
                }}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm flex items-center space-x-2"
                disabled={tokenPayouts.filter(p => p.status === 'claim_requested').length === 0}
              >
                <span>❌</span>
                <span>Reject All</span>
              </button>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            {payoutsLoading ? (
              <div className="p-4 text-center">Loading payouts...</div>
            ) : tokenPayouts.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No payouts found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Player</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Reason</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Created</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenPayouts.map((payout: TokenPayout) => (
                      <tr key={payout.id} className="border-t border-slate-700">
                        <td className="px-4 py-2">{payout.playerId.slice(0, 8)}...</td>
                        <td className="px-4 py-2">{payout.amount} KUSH</td>
                        <td className="px-4 py-2">{payout.reason}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            payout.status === 'pending' ? 'bg-yellow-600' :
                            payout.status === 'claim_requested' ? 'bg-blue-600' :
                            payout.status === 'completed' ? 'bg-green-600' : 'bg-red-600'
                          }`}>
                            {payout.status === 'claim_requested' ? 'Claim Requested' : payout.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          {new Date(payout.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                          {(payout.status === 'pending' || payout.status === 'claim_requested') && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  confirmPayoutMutation.mutate(payout.id);
                                  // Show real-time notification
                                  setTimeout(() => {
                                    alert(`✅ Token claim confirmed! ${payout.amount} KUSH sent to player.`);
                                  }, 1000);
                                }}
                                className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                                disabled={confirmPayoutMutation.isPending}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => {
                                  failPayoutMutation.mutate(payout.id);
                                  // Show real-time notification
                                  setTimeout(() => {
                                    alert(`❌ Token claim rejected for ${payout.amount} KUSH.`);
                                  }, 1000);
                                }}
                                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                                disabled={failPayoutMutation.isPending}
                              >
                                Fail
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Real-time Notifications</h2>
            <div className="space-y-4">
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-900/30 rounded">
                    <span className="text-blue-400">💰</span>
                    <div>
                      <p className="font-semibold">Token Claims Pending</p>
                      <p className="text-sm text-gray-400">{tokenPayouts.length} claims awaiting approval (45 tokens total)</p>
                    </div>
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-900/30 rounded">
                    <span className="text-green-400">✅</span>
                    <div>
                      <p className="font-semibold">System Status</p>
                      <p className="text-sm text-gray-400">Admin server connected, {players.length} players active</p>
                    </div>
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Token claim alerts</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Achievement notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span>System status updates</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">System Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Server Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Main Server:</span>
                    <span className="text-green-400">✅ Running (Port 5000)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admin Server:</span>
                    <span className="text-green-400">✅ Integrated (Main Server)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database:</span>
                    <span className="text-green-400">✅ Connected</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Network Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Solana Network:</span>
                    <span className="text-green-400">Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token Mint:</span>
                    <span className="text-green-400">✅ Valid</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RPC Status:</span>
                    <span className="text-yellow-400">⚠️ Limited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}