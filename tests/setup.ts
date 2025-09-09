// Global test setup
import 'dotenv/config';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test';
process.env.PORT = '0'; // Let system assign port for tests

// Increase timeout for all tests
jest.setTimeout(10000);

// Global test utilities
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidUUID(): R;
      toBeValidSolanaAddress(): R;
    }
  }
}

// Custom Jest matchers
expect.extend({
  toBeValidUUID(received: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const pass = uuidRegex.test(received);
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid UUID`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid UUID`,
        pass: false,
      };
    }
  },

  toBeValidSolanaAddress(received: string) {
    // Basic Solana address validation (Base58, 32-44 characters)
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    const pass = solanaRegex.test(received);
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid Solana address`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid Solana address`,
        pass: false,
      };
    }
  },
});

// Global cleanup
afterEach(() => {
  // Clear any timers or intervals that might leak between tests
  jest.clearAllTimers();
});

console.log('🧪 Test environment initialized');