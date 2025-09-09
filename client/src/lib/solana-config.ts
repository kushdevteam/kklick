export type SolanaNetwork = "mainnet" | "devnet";

export const SOLANA_NETWORKS = {
  mainnet: {
    name: "Mainnet",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    explorerUrl: "https://solscan.io",
    chainId: 101,
  },
  devnet: {
    name: "Devnet", 
    rpcUrl: "https://api.devnet.solana.com",
    explorerUrl: "https://solscan.io/?cluster=devnet",
    chainId: 103,
  }
} as const;

export const getNetworkConfig = (network: SolanaNetwork) => {
  return SOLANA_NETWORKS[network];
};

export const isValidSolanaAddress = (address: string): boolean => {
  try {
    // Basic Solana address validation - 32-44 chars, base58
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  } catch {
    return false;
  }
};

// Environment-based network detection
export const getDefaultNetwork = (): SolanaNetwork => {
  const isProduction = import.meta.env.PROD;
  return isProduction ? "mainnet" : "devnet";
};