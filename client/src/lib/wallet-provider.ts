// Real Solana Wallet Integration
// Direct browser wallet detection without additional dependencies

export interface Wallet {
  name: string;
  icon: string;
  url: string;
  adapter: WalletAdapter;
}

export interface WalletAdapter {
  name: string;
  url: string;
  icon: string;
  connect(): Promise<{ publicKey: string }>;
  disconnect(): Promise<void>;
  signTransaction?(transaction: any): Promise<any>;
  signMessage?(message: Uint8Array): Promise<{ signature: Uint8Array }>;
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
}

class PhantomWalletAdapter implements WalletAdapter {
  name = 'Phantom';
  url = 'https://phantom.app';
  icon = 'https://phantom.app/img/phantom-logo.svg';
  
  get connected(): boolean {
    return window.solana?.isConnected || false;
  }

  get connecting(): boolean {
    return false;
  }

  get publicKey(): string | null {
    return window.solana?.publicKey?.toString() || null;
  }

  async connect(): Promise<{ publicKey: string }> {
    if (!window.solana) {
      throw new Error('Phantom wallet not found! Please install it from phantom.app');
    }

    if (!window.solana.isPhantom) {
      throw new Error('Phantom wallet not detected');
    }

    try {
      const response = await window.solana.connect();
      return { publicKey: response.publicKey.toString() };
    } catch (error: any) {
      throw new Error(`Failed to connect to Phantom: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (window.solana) {
      await window.solana.disconnect();
    }
  }

  async signTransaction(transaction: any): Promise<any> {
    if (!window.solana) {
      throw new Error('Phantom wallet not connected');
    }
    return await window.solana.signTransaction(transaction);
  }

  async signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }> {
    if (!window.solana) {
      throw new Error('Phantom wallet not connected');
    }
    const response = await window.solana.signMessage(message, 'utf8');
    return { signature: response.signature };
  }
}

class SolflareWalletAdapter implements WalletAdapter {
  name = 'Solflare';
  url = 'https://solflare.com';
  icon = 'https://solflare.com/assets/logo.svg';
  
  get connected(): boolean {
    return window.solflare?.isConnected || false;
  }

  get connecting(): boolean {
    return false;
  }

  get publicKey(): string | null {
    return window.solflare?.publicKey?.toString() || null;
  }

  async connect(): Promise<{ publicKey: string }> {
    if (!window.solflare) {
      throw new Error('Solflare wallet not found! Please install it from solflare.com');
    }

    try {
      const response = await window.solflare.connect();
      return { publicKey: response.publicKey.toString() };
    } catch (error: any) {
      throw new Error(`Failed to connect to Solflare: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (window.solflare) {
      await window.solflare.disconnect();
    }
  }

  async signTransaction(transaction: any): Promise<any> {
    if (!window.solflare) {
      throw new Error('Solflare wallet not connected');
    }
    return await window.solflare.signTransaction(transaction);
  }

  async signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }> {
    if (!window.solflare) {
      throw new Error('Solflare wallet not connected');
    }
    const response = await window.solflare.signMessage(message);
    return { signature: response.signature };
  }
}

// Available wallets
export const SUPPORTED_WALLETS: Wallet[] = [
  {
    name: 'Phantom',
    icon: 'https://phantom.app/img/phantom-logo.svg',
    url: 'https://phantom.app',
    adapter: new PhantomWalletAdapter()
  },
  {
    name: 'Solflare', 
    icon: 'https://solflare.com/assets/logo.svg',
    url: 'https://solflare.com',
    adapter: new SolflareWalletAdapter()
  }
];

// Wallet detection utility
export function getInstalledWallets(): Wallet[] {
  return SUPPORTED_WALLETS.filter(wallet => {
    if (wallet.name === 'Phantom') {
      return typeof window !== 'undefined' && window.solana?.isPhantom;
    }
    if (wallet.name === 'Solflare') {
      return typeof window !== 'undefined' && window.solflare;
    }
    return false;
  });
}

export function getMostPopularWallet(): Wallet | null {
  // Check for Phantom first (most popular)
  if (typeof window !== 'undefined' && window.solana?.isPhantom) {
    return SUPPORTED_WALLETS.find(w => w.name === 'Phantom') || null;
  }
  
  // Check for Solflare
  if (typeof window !== 'undefined' && window.solflare) {
    return SUPPORTED_WALLETS.find(w => w.name === 'Solflare') || null;
  }
  
  return null;
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      isConnected: boolean;
      publicKey: { toString(): string };
      connect(): Promise<{ publicKey: { toString(): string } }>;
      disconnect(): Promise<void>;
      signTransaction(transaction: any): Promise<any>;
      signMessage(message: Uint8Array, encoding: string): Promise<{ signature: Uint8Array }>;
    };
    solflare?: {
      isConnected: boolean;
      publicKey: { toString(): string };
      connect(): Promise<{ publicKey: { toString(): string } }>;
      disconnect(): Promise<void>;
      signTransaction(transaction: any): Promise<any>;
      signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
    };
  }
}