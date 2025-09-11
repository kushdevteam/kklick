/**
 * Blockchain Verification Service
 * Verifies token burn transactions on Solana blockchain
 */

interface VerificationResult {
  isValid: boolean;
  burnAmount: number;
  network: 'devnet' | 'mainnet';
  error?: string;
}

// Replay protection: Store used transaction signatures
const usedTransactionSignatures = new Set<string>();

/**
 * Verify a burn transaction on the Solana blockchain
 */
export async function verifyBurnTransaction(
  transactionSignature: string, 
  walletAddress: string
): Promise<VerificationResult> {
  try {
    console.log(`🔍 Verifying burn transaction: ${transactionSignature}`);
    console.log(`📍 Wallet: ${walletAddress}`);

    // Validate transaction signature format
    if (!isValidTransactionSignature(transactionSignature)) {
      console.log(`❌ Signature validation failed for: ${transactionSignature}`);
      return {
        isValid: false,
        burnAmount: 0,
        network: 'devnet',
        error: 'Invalid transaction signature format'
      };
    }

    console.log(`✅ Signature validation passed`);

    // For now, this is a mock implementation
    // In production, this would connect to Solana RPC and verify:
    // 1. Transaction exists and is confirmed
    // 2. Transaction involves burning tokens
    // 3. Transaction was initiated by the specified wallet
    // 4. Extract the actual burn amount from transaction logs

    // Check if we're in development mode for mock verification
    // SECURITY: Only allow mock verification in non-production environments
    const isDevelopment = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      console.log(`🚧 Using MOCK verification (development mode)`);
      // Mock verification logic for development testing
      const mockVerificationResult = await mockBlockchainVerification(
        transactionSignature, 
        walletAddress
      );

      return mockVerificationResult;
    } else {
      console.log(`🔒 Production mode: Using real Solana RPC verification`);
      // Use real Solana verification in production
      const realVerificationResult = await realSolanaVerification(
        transactionSignature,
        walletAddress,
        'mainnet'
      );

      return realVerificationResult;
    }

  } catch (error) {
    console.error('❌ Blockchain verification error:', error);
    return {
      isValid: false,
      burnAmount: 0,
      network: 'devnet',
      error: `Verification failed: ${(error as Error).message}`
    };
  }
}

/**
 * Validate transaction signature format
 */
function isValidTransactionSignature(signature: string): boolean {
  // Solana transaction signatures are base58 encoded and typically 87-88 characters
  // For testing, we'll be more permissive and just check basic format
  if (!signature || signature.length < 32) {
    console.log(`❌ Signature too short: ${signature?.length || 0} characters`);
    return false;
  }
  
  // Allow any reasonable length signature for testing
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,100}$/;
  const isValid = base58Regex.test(signature);
  
  console.log(`🔍 Signature validation: ${signature.substring(0, 20)}... (${signature.length} chars) -> ${isValid ? 'VALID' : 'INVALID'}`);
  return isValid;
}

/**
 * Mock blockchain verification (replace with real implementation)
 */
async function mockBlockchainVerification(
  transactionSignature: string, 
  walletAddress: string
): Promise<VerificationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For testing purposes, accept any valid-format signature
  // In production, this would make actual RPC calls to Solana
  
  // Extract mock burn amount from signature (for testing)
  const mockBurnAmount = extractMockBurnAmount(transactionSignature);
  
  // Determine network based on signature (mock logic)
  const network = transactionSignature.startsWith('dev') ? 'devnet' : 'mainnet';

  return {
    isValid: true,
    burnAmount: mockBurnAmount,
    network: network === 'mainnet' ? 'mainnet' : 'devnet',
  };
}

/**
 * Extract burn amount from transaction (mock implementation)
 */
function extractMockBurnAmount(transactionSignature: string): number {
  // In production, this would parse transaction logs to find burn amount
  // For testing, use signature hash to generate consistent amount
  const hash = transactionSignature.slice(-8);
  const amount = parseInt(hash, 36) % 10000;
  const burnAmount = Math.max(100, amount); // Minimum 100 tokens
  
  console.log(`💰 Mock burn amount calculated: ${burnAmount} tokens from signature hash: ${hash}`);
  return burnAmount;
}

/**
 * Real Solana verification implementation (template for future)
 */
export async function realSolanaVerification(
  transactionSignature: string,
  walletAddress: string,
  network: 'devnet' | 'mainnet' = 'mainnet'
): Promise<VerificationResult> {
  try {
    console.log(`🔍 SECURE: Starting burn verification for ${transactionSignature}`);
    console.log(`📍 Address scanning: ${walletAddress}, Network: ${network}`);

    // Import Solana Web3.js for address validation only
    const { Connection, PublicKey, SystemProgram, AddressLookupTableAccount } = await import('@solana/web3.js');
    
    // Multiple RPC endpoints for reliability
    const rpcEndpoints = network === 'mainnet' ? [
      'https://api.mainnet-beta.solana.com',
      'https://rpc.ankr.com/solana',
      'https://solana-api.projectserum.com',
      'https://api.mainnet-beta.solana.com'
    ] : ['https://api.devnet.solana.com'];
    
    console.log(`🔗 Scanning via ${rpcEndpoints[0]}`);
    const connection = new Connection(rpcEndpoints[0], 'confirmed');
    
    // Fetch transaction with full instruction parsing
    console.log(`🔎 Parsing transaction instructions...`);
    const transaction = await connection.getTransaction(transactionSignature, {
      maxSupportedTransactionVersion: 0,
      commitment: 'confirmed'
    });
    
    if (!transaction || !transaction.meta || !transaction.transaction) {
      console.log(`❌ Transaction not found or incomplete`);
      return { 
        isValid: false, 
        burnAmount: 0, 
        network, 
        error: 'Transaction not found or incomplete data' 
      };
    }

    // Check if transaction was successful
    if (transaction.meta.err !== null) {
      console.log(`❌ Transaction failed on-chain:`, transaction.meta.err);
      return { 
        isValid: false, 
        burnAmount: 0, 
        network, 
        error: 'Transaction failed on blockchain' 
      };
    }

    // SECURITY: Check for replay attacks
    if (usedTransactionSignatures.has(transactionSignature)) {
      console.log(`❌ SECURITY: Transaction signature already used (replay attack): ${transactionSignature}`);
      return { 
        isValid: false, 
        burnAmount: 0, 
        network, 
        error: 'Transaction signature already used (replay protection)' 
      };
    }

    // SECURITY: Verify signer authority without connecting to wallet
    const message = transaction.transaction.message;
    let accountKeys: InstanceType<typeof PublicKey>[];
    
    if ('getAccountKeys' in message && typeof message.getAccountKeys === 'function') {
      // VersionedMessage - get account keys with loaded addresses  
      const lookupTableAccounts: InstanceType<typeof AddressLookupTableAccount>[] = [];
      const accountKeysFromMessage = message.getAccountKeys({ 
        addressLookupTableAccounts: lookupTableAccounts
      });
      
      // Extract all account keys (static + loaded)
      accountKeys = accountKeysFromMessage.staticAccountKeys;
      
      // Add loaded addresses from transaction meta if available
      if (transaction.meta?.loadedAddresses) {
        if (transaction.meta.loadedAddresses.writable) {
          accountKeys = accountKeys.concat(transaction.meta.loadedAddresses.writable);
        }
        if (transaction.meta.loadedAddresses.readonly) {
          accountKeys = accountKeys.concat(transaction.meta.loadedAddresses.readonly);
        }
      }
    } else {
      // Legacy message
      accountKeys = (message as any).accountKeys || [];
    }
    
    const signers = accountKeys.slice(0, message.header.numRequiredSignatures);
    const userPublicKey = new PublicKey(walletAddress);
    const isSignedByWallet = signers.some((signer: InstanceType<typeof PublicKey>) => signer.equals(userPublicKey));

    if (!isSignedByWallet) {
      console.log(`❌ SECURITY: Transaction not signed by claimed address`);
      return { 
        isValid: false, 
        burnAmount: 0, 
        network, 
        error: 'Transaction not authorized by specified address' 
      };
    }

    // CRITICAL SECURITY: Parse SPL Token instructions directly (not logs)
    let burnAmount = 0;
    const KUSH_TOKEN_MINT = 'FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL';
    const SPL_TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
    const BURN_INSTRUCTION_DISCRIMINATOR = 8; // SPL Token Burn instruction ID
    
    // Parse all instructions for legitimate burn operations
    // Use compiledInstructions for VersionedMessage, instructions for legacy
    const instructions = 'compiledInstructions' in message 
      ? message.compiledInstructions 
      : (message as any).instructions || [];
    
    const programIds = accountKeys.map(key => key.toString());
    
    for (const instruction of instructions) {
      const programId = programIds[instruction.programIdIndex];
      
      // Only process SPL Token program instructions
      if (programId === SPL_TOKEN_PROGRAM_ID) {
        // Decode instruction data - handle both Uint8Array and base64 string
        let instructionData: Uint8Array;
        if (typeof instruction.data === 'string') {
          instructionData = Buffer.from(instruction.data, 'base64');
        } else {
          instructionData = new Uint8Array(instruction.data);
        }
        
        // Decode instruction data (first byte is instruction type)
        if (instructionData && instructionData.length > 0) {
          const instructionType = instructionData[0];
          
          // Check if this is a burn instruction
          if (instructionType === BURN_INSTRUCTION_DISCRIMINATOR) {
            console.log(`🔥 SECURITY: Found legitimate SPL burn instruction`);
            
            // Extract burn amount from instruction data (bytes 1-8 are amount as u64)
            if (instructionData.length >= 9) {
              const amountBytes = instructionData.slice(1, 9);
              const amount = Buffer.from(amountBytes).readBigUInt64LE(0);
              const burnAmountWithDecimals = Number(amount) / Math.pow(10, 6); // KUSH has 6 decimals
              
              // Verify this burn is for KUSH token by checking token account
              const tokenAccountIndex = instruction.accounts[0]; // First account is source token account
              
              if (transaction.meta.preTokenBalances && transaction.meta.postTokenBalances) {
                const preBalance = transaction.meta.preTokenBalances.find(b => 
                  b.accountIndex === tokenAccountIndex && b.mint === KUSH_TOKEN_MINT
                );
                
                if (preBalance && preBalance.owner === walletAddress) {
                  burnAmount += burnAmountWithDecimals;
                  console.log(`✅ VERIFIED: ${burnAmountWithDecimals} KUSH burned via SPL instruction`);
                }
              }
            }
          }
        }
      }
    }

    // SECURITY: Double-check with balance changes for additional validation
    if (burnAmount > 0 && transaction.meta.preTokenBalances && transaction.meta.postTokenBalances) {
      let balanceReduction = 0;
      
      for (const preBalance of transaction.meta.preTokenBalances) {
        if (preBalance.mint === KUSH_TOKEN_MINT && preBalance.owner === walletAddress) {
          const postBalance = transaction.meta.postTokenBalances.find(post => 
            post.accountIndex === preBalance.accountIndex
          );
          
          if (postBalance) {
            const preAmount = parseFloat(preBalance.uiTokenAmount.uiAmountString || '0');
            const postAmount = parseFloat(postBalance.uiTokenAmount.uiAmountString || '0');
            balanceReduction += (preAmount - postAmount);
          }
        }
      }
      
      // Verify instruction amount matches balance change (within 1% tolerance for rounding)
      const tolerance = burnAmount * 0.01;
      if (Math.abs(burnAmount - balanceReduction) > tolerance) {
        console.log(`❌ SECURITY: Amount mismatch - instruction: ${burnAmount}, balance: ${balanceReduction}`);
        return { 
          isValid: false, 
          burnAmount: 0, 
          network, 
          error: 'Burn amount verification failed - possible manipulation' 
        };
      }
    }

    if (burnAmount <= 0) {
      console.log(`❌ SECURITY: No legitimate burn instructions found`);
      return { 
        isValid: false, 
        burnAmount: 0, 
        network, 
        error: 'No valid SPL token burn detected in transaction' 
      };
    }

    // Mark transaction as used to prevent replay attacks
    usedTransactionSignatures.add(transactionSignature);
    
    console.log(`✅ SECURE BURN VERIFIED: ${burnAmount} KUSH burned via proper SPL instructions`);
    return { 
      isValid: true, 
      burnAmount: Math.floor(burnAmount), // Round down to whole tokens
      network 
    };

  } catch (error) {
    console.error(`❌ SECURITY: Burn verification error:`, error);
    return {
      isValid: false,
      burnAmount: 0,
      network,
      error: `Secure verification failed: ${(error as Error).message}`
    };
  }
}