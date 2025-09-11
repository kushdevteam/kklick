import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';

interface WalletRegistrationProps {
  gameState: {
    id: string;
    username?: string;
    walletAddress?: string | null;
    walletLinked?: boolean;
    solanaNetwork?: string;
    telegramUserId?: string | null;
    discordUserId?: string | null;
  };
}

export default function WalletRegistration({ gameState }: WalletRegistrationProps) {
  const [walletAddress, setWalletAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if we're in Telegram WebView
  const tgWebApp = (window as any).Telegram?.WebApp;
  const isInTelegram = typeof tgWebApp !== 'undefined';
  const tgData = tgWebApp?.initDataUnsafe;
  const telegramUser = tgData?.user;

  // Check wallet registration status
  useEffect(() => {
    if (walletAddress.trim() && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress.trim())) {
      fetch(`/api/auth/wallet/${walletAddress.trim()}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setIsRegistered(data.data.isRegistered);
            setAuthMode(data.data.isRegistered ? 'login' : 'register');
          }
        })
        .catch(() => {
          setIsRegistered(false);
        });
    }
  }, [walletAddress]);

  // Wallet registration mutation
  const registerWalletMutation = useMutation({
    mutationFn: async ({ walletAddress, password, username }: { walletAddress: string; password: string; username?: string }) => {
      const response = await fetch('/api/auth/wallet/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: walletAddress.trim(),
          password,
          username: username || gameState.username || `player_${Date.now()}`,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register wallet');
      }
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "✅ Wallet Registered!",
        description: "Your wallet has been registered with password protection. You can now log in securely.",
      });
      setPassword('');
      setConfirmPassword('');
      setIsRegistered(true);
      setAuthMode('login');
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
    },
    onError: (error: any) => {
      toast({
        title: "❌ Registration Failed",
        description: error.message || "Failed to register wallet.",
        variant: "destructive",
      });
    },
  });

  // Wallet login mutation
  const loginWalletMutation = useMutation({
    mutationFn: async ({ walletAddress, password }: { walletAddress: string; password: string }) => {
      const response = await fetch('/api/auth/wallet/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: walletAddress.trim(),
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "✅ Login Successful!",
        description: `Welcome back! Your wallet is now linked to your account.`,
      });
      setPassword('');
      // Update player with wallet linked
      if (data.data.playerId) {
        queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
      }
    },
    onError: (error: any) => {
      toast({
        title: "❌ Login Failed",
        description: error.message || "Invalid wallet address or password.",
        variant: "destructive",
      });
    },
  });

  // Password validation helper
  const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Must be at least 8 characters');
    if (!/[a-z]/.test(password)) errors.push('Must contain lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('Must contain uppercase letter');
    if (!/\d/.test(password)) errors.push('Must contain number');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push('Must contain special character');
    return { valid: errors.length === 0, errors };
  };

  const handleWalletAuth = () => {
    // Validate wallet address
    if (!walletAddress.trim()) {
      toast({
        title: "❌ Invalid Address",
        description: "Please enter a valid Solana wallet address.",
        variant: "destructive",
      });
      return;
    }

    const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    if (!solanaAddressPattern.test(walletAddress.trim())) {
      toast({
        title: "❌ Invalid Format",
        description: "Please enter a valid Solana wallet address format.",
        variant: "destructive",
      });
      return;
    }

    // Validate password
    if (!password.trim()) {
      toast({
        title: "❌ Password Required",
        description: "Please enter your password.",
        variant: "destructive",
      });
      return;
    }

    if (authMode === 'register') {
      // Validate password strength for registration
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        toast({
          title: "❌ Password Too Weak",
          description: passwordValidation.errors.join(', '),
          variant: "destructive",
        });
        return;
      }

      // Check password confirmation
      if (password !== confirmPassword) {
        toast({
          title: "❌ Passwords Don't Match",
          description: "Please make sure both passwords match.",
          variant: "destructive",
        });
        return;
      }

      registerWalletMutation.mutate({ walletAddress, password });
    } else {
      loginWalletMutation.mutate({ walletAddress, password });
    }
  };

  const linkTelegramMutation = useMutation({
    mutationFn: async () => {
      if (!isInTelegram || !telegramUser) {
        throw new Error('Not in Telegram WebView');
      }
      const response = await fetch(`/api/players/${gameState.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramUserId: telegramUser.id.toString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to link Telegram');
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "✅ Telegram Linked!",
        description: "Your Telegram account has been successfully linked.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id] });
    },
    onError: (error: any) => {
      toast({
        title: "❌ Link Failed",
        description: error.message === 'Not in Telegram WebView' 
          ? "This feature only works when opened through Telegram."
          : "Failed to link Telegram account.",
        variant: "destructive",
      });
    },
  });

  const handleLinkTelegram = () => {
    linkTelegramMutation.mutate();
  };

  const handleLinkDiscord = () => {
    toast({
      title: "🔗 Discord Integration",
      description: "Discord linking is available through the Discord bot. Use /link command in Discord.",
    });
  };

  const isLoading = registerWalletMutation.isPending || loginWalletMutation.isPending;

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <i className="fas fa-wallet text-blue-400"></i>
          <span>{gameState.walletLinked ? 'Linked Wallet' : 'Secure Wallet Authentication'}</span>
        </CardTitle>
        <CardDescription>
          {gameState.walletLinked 
            ? 'Your wallet is securely linked to your account with password protection.'
            : 'Register your Solana wallet with password protection to securely receive token rewards.'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Already linked wallet display */}
        {gameState.walletLinked && gameState.walletAddress && (
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <i className="fas fa-lock text-blue-600 dark:text-blue-400"></i>
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Wallet Linked:</strong> Your wallet is securely linked with password protection.
              <br />
              <span className="font-mono text-xs">{gameState.walletAddress}</span>
            </AlertDescription>
          </Alert>
        )}

        {/* Wallet authentication form for non-linked wallets */}
        {!gameState.walletLinked && (
          <>
            {/* Trust Message */}
            <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <i className="fas fa-shield-alt text-green-600 dark:text-green-400"></i>
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>Enhanced Security:</strong> Your wallet is protected with password authentication. We never access your wallet directly.
              </AlertDescription>
            </Alert>

            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'register' | 'login')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="register" disabled={isRegistered}>
                  Register Wallet
                </TabsTrigger>
                <TabsTrigger value="login">
                  Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-wallet-address">Solana Wallet Address</Label>
                  <Input
                    id="register-wallet-address"
                    placeholder="Enter your Solana wallet address (e.g., 7dHbW...)"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="font-mono text-sm"
                    data-testid="input-register-wallet-address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Create Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-testid="input-register-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must contain uppercase, lowercase, number, and special character
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    data-testid="input-confirm-password"
                  />
                </div>

                <Button
                  onClick={handleWalletAuth}
                  disabled={isLoading || !walletAddress || !password || !confirmPassword}
                  className="w-full"
                  data-testid="button-register-wallet"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Registering...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus mr-2"></i>
                      Register Wallet
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-wallet-address">Solana Wallet Address</Label>
                  <Input
                    id="login-wallet-address"
                    placeholder="Enter your registered wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="font-mono text-sm"
                    data-testid="input-login-wallet-address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-testid="input-login-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleWalletAuth}
                  disabled={isLoading || !walletAddress || !password}
                  className="w-full"
                  data-testid="button-login-wallet"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Login to Wallet
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Status indicator for registered but not linked */}
        {isRegistered && !gameState.walletLinked && walletAddress && (
          <Alert className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
            <i className="fas fa-key text-yellow-600 dark:text-yellow-400"></i>
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              <strong>Wallet Registered:</strong> Please log in to link this wallet to your account.
            </AlertDescription>
          </Alert>
        )}

        {/* Platform Linking Options */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="font-medium text-foreground">Link Social Accounts for Easier Management</h4>
          
          {!gameState.telegramUserId && (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleLinkTelegram}
              disabled={linkTelegramMutation.isPending || !isInTelegram}
              data-testid="button-link-telegram"
            >
              {linkTelegramMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Linking...
                </>
              ) : (
                <>
                  <i className="fab fa-telegram mr-2 text-blue-500"></i>
                  {isInTelegram ? 'Link Telegram Account' : 'Open in Telegram'}
                </>
              )}
            </Button>
          )}
          
          {!gameState.discordUserId && (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleLinkDiscord}
              data-testid="button-link-discord"
            >
              <i className="fab fa-discord mr-2 text-indigo-500"></i>
              Link Discord Account
            </Button>
          )}

          {gameState.telegramUserId && gameState.discordUserId && (
            <Alert>
              <i className="fas fa-check text-green-600"></i>
              <AlertDescription>
                All social accounts linked! You can manage your wallet through Telegram or Discord.
              </AlertDescription>
            </Alert>
          )}
        </div>

      </CardContent>
    </Card>
  );
}