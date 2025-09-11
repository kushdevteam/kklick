import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Wallet, MessageCircle, Gamepad2, LogIn } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface LoginProps {
  onLoginSuccess: (playerId: string) => void;
  onCreateNew: () => void;
}

interface LoginResponse {
  playerId: string;
  username: string;
  totalKush: number;
  linkedAccounts: {
    telegram: boolean;
    discord: boolean;
    wallet: boolean;
  };
}

export function AccountLogin({ onLoginSuccess, onCreateNew }: LoginProps) {
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  // Get Telegram data if available
  const tgWebApp = (window as any).Telegram?.WebApp;
  const tgData = tgWebApp?.initDataUnsafe;
  const telegramUserId = tgData?.user?.id?.toString() || null;
  const isInTelegram = !!telegramUserId;

  const walletLoginMutation = useMutation({
    mutationFn: async (walletAddr: string) => {
      const response = await apiRequest('POST', '/api/players/login/wallet', {
        walletAddress: walletAddr
      });
      return await response.json() as LoginResponse;
    },
    onSuccess: (data) => {
      localStorage.setItem('kushKlickerPlayerId', data.playerId);
      toast({
        title: "✅ Welcome Back!",
        description: `Logged in as ${data.username} with ${data.totalKush.toLocaleString()} KUSH`,
      });
      onLoginSuccess(data.playerId);
    },
    onError: (error: any) => {
      toast({
        title: "❌ Login Failed",
        description: error.message || "No account found with this wallet address",
        variant: "destructive",
      });
    },
  });

  const telegramLoginMutation = useMutation({
    mutationFn: async () => {
      if (!telegramUserId) throw new Error('Telegram ID not available');
      const response = await apiRequest('POST', '/api/players/login/telegram', {
        telegramUserId
      });
      return await response.json() as LoginResponse;
    },
    onSuccess: (data) => {
      localStorage.setItem('kushKlickerPlayerId', data.playerId);
      toast({
        title: "✅ Welcome Back!",
        description: `Logged in as ${data.username} with ${data.totalKush.toLocaleString()} KUSH`,
      });
      onLoginSuccess(data.playerId);
    },
    onError: (error: any) => {
      toast({
        title: "❌ Login Failed",
        description: error.message || "No account found with this Telegram account",
        variant: "destructive",
      });
    },
  });


  const handleWalletLogin = () => {
    if (!walletAddress.trim()) {
      toast({
        title: "❌ Invalid Input",
        description: "Please enter your wallet address",
        variant: "destructive",
      });
      return;
    }
    walletLoginMutation.mutate(walletAddress.trim());
  };

  const handleTelegramLogin = () => {
    telegramLoginMutation.mutate();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-green-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-green-400">Welcome Back to KushKlicker!</CardTitle>
          <CardDescription className="text-gray-400">
            Reconnect to your existing account to continue your KUSH empire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={isInTelegram ? "telegram" : "wallet"} className="w-full">
            <TabsList className={`grid w-full ${isInTelegram ? 'grid-cols-2' : 'grid-cols-1'} bg-gray-800`}>
              {isInTelegram && (
                <TabsTrigger value="telegram" className="text-xs">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Telegram
                </TabsTrigger>
              )}
              <TabsTrigger value="wallet" className="text-xs">
                <Wallet className="w-4 h-4 mr-1" />
                Wallet
              </TabsTrigger>
            </TabsList>

            {isInTelegram && (
              <TabsContent value="telegram" className="space-y-4">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                  <p className="text-sm text-gray-400 mb-4">
                    Login with your Telegram account
                  </p>
                  <Button 
                    onClick={handleTelegramLogin}
                    disabled={telegramLoginMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {telegramLoginMutation.isPending ? (
                      "Checking Account..."
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Login with Telegram
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            )}

            <TabsContent value="wallet" className="space-y-4">
              <div>
                <Wallet className="w-12 h-12 mx-auto mb-2 text-orange-400" />
                <p className="text-sm text-gray-400 mb-4 text-center">
                  Enter your Solana wallet address
                </p>
                <Input
                  type="text"
                  placeholder="Enter your wallet address..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  data-testid="input-wallet-address"
                />
                <Button 
                  onClick={handleWalletLogin}
                  disabled={walletLoginMutation.isPending}
                  className="w-full mt-3 bg-orange-600 hover:bg-orange-700"
                  data-testid="button-wallet-login"
                >
                  {walletLoginMutation.isPending ? (
                    "Checking Wallet..."
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login with Wallet
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-3">
              Don't have an account?
            </p>
            <Button 
              variant="outline" 
              onClick={onCreateNew}
              className="w-full border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
              data-testid="button-create-new"
            >
              Create New Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}