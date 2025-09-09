// Wallet Context Provider for Real Solana Wallet Integration
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getInstalledWallets, getMostPopularWallet, type Wallet, type WalletAdapter } from '@/lib/wallet-provider';

interface WalletContextType {
  wallet: WalletAdapter | null;
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
  availableWallets: Wallet[];
  connect: (walletName?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  selectWallet: (wallet: Wallet) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

interface WalletProviderProps {
  children: React.ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<WalletAdapter | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [availableWallets, setAvailableWallets] = useState<Wallet[]>([]);

  // Check for installed wallets on mount
  useEffect(() => {
    const checkWallets = () => {
      const installed = getInstalledWallets();
      setAvailableWallets(installed);
      
      // Auto-select the most popular installed wallet
      if (!wallet && installed.length > 0) {
        const popular = getMostPopularWallet();
        if (popular) {
          setWallet(popular.adapter);
        }
      }
    };

    checkWallets();

    // Check again after a short delay for wallets that inject asynchronously
    const timeout = setTimeout(checkWallets, 1000);
    return () => clearTimeout(timeout);
  }, [wallet]);

  // Monitor wallet connection state
  useEffect(() => {
    if (wallet) {
      const checkConnection = () => {
        const isConnected = wallet.connected;
        const walletPublicKey = wallet.publicKey;
        
        setConnected(isConnected);
        setPublicKey(walletPublicKey);
        
        if (!isConnected) {
          setPublicKey(null);
        }
      };

      checkConnection();

      // Set up polling to check connection status
      const interval = setInterval(checkConnection, 1000);
      return () => clearInterval(interval);
    }
  }, [wallet]);

  const connect = useCallback(async (walletName?: string) => {
    if (!wallet && !walletName) {
      throw new Error('No wallet selected. Please install Phantom or Solflare wallet.');
    }

    setConnecting(true);
    try {
      let targetWallet = wallet;
      
      if (walletName) {
        const walletToUse = availableWallets.find(w => w.name === walletName);
        if (!walletToUse) {
          throw new Error(`${walletName} wallet not found`);
        }
        targetWallet = walletToUse.adapter;
        setWallet(targetWallet);
      }

      if (!targetWallet) {
        throw new Error('No wallet available');
      }

      const response = await targetWallet.connect();
      setPublicKey(response.publicKey);
      setConnected(true);
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      setConnected(false);
      setPublicKey(null);
      throw error;
    } finally {
      setConnecting(false);
    }
  }, [wallet, availableWallets]);

  const disconnect = useCallback(async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setConnected(false);
        setPublicKey(null);
      } catch (error) {
        console.error('Wallet disconnection error:', error);
      }
    }
  }, [wallet]);

  const selectWallet = useCallback((selectedWallet: Wallet) => {
    setWallet(selectedWallet.adapter);
  }, []);

  return (
    <WalletContext.Provider value={{
      wallet,
      connected,
      connecting,
      publicKey,
      availableWallets,
      connect,
      disconnect,
      selectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
}