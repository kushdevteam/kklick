import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../server/routes';

describe('KushKlicker API Tests', () => {
  let app: express.Application;
  let server: any;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    server = await registerRoutes(app);
  });

  afterAll(async () => {
    if (server && server.close) {
      await new Promise<void>((resolve) => {
        server.close(() => resolve());
      });
    }
  });

  describe('Player Management', () => {
    test('GET /api/players - should return players list', async () => {
      const response = await request(app)
        .get('/api/players')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/players - should create new player', async () => {
      const playerData = {
        username: 'test_player_' + Date.now(),
        telegramUserId: '123456789'
      };

      const response = await request(app)
        .post('/api/players')
        .send(playerData)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(playerData.username);
    });

    test('GET /api/players/:id - should get specific player', async () => {
      // First create a player
      const createResponse = await request(app)
        .post('/api/players')
        .send({ username: 'test_get_player', telegramUserId: '987654321' });
      
      const playerId = createResponse.body.id;

      const response = await request(app)
        .get(`/api/players/${playerId}`)
        .expect(200);
      
      expect(response.body.id).toBe(playerId);
      expect(response.body).toHaveProperty('totalKush');
      expect(response.body).toHaveProperty('totalClicks');
    });
  });

  describe('Game Mechanics', () => {
    let testPlayerId: string;

    beforeAll(async () => {
      const createResponse = await request(app)
        .post('/api/players')
        .send({ username: 'test_game_player', telegramUserId: '555666777' });
      testPlayerId = createResponse.body.id;
    });

    test('POST /api/players/:id/enhanced-click - should process click', async () => {
      const response = await request(app)
        .post(`/api/players/${testPlayerId}/enhanced-click`)
        .expect(200);
      
      expect(response.body).toHaveProperty('kushEarned');
      expect(response.body).toHaveProperty('isCritical');
      expect(response.body).toHaveProperty('comboMultiplier');
      expect(typeof response.body.kushEarned).toBe('number');
    });

    test('GET /api/players/:id/upgrades - should get player upgrades', async () => {
      const response = await request(app)
        .get(`/api/players/${testPlayerId}/upgrades`)
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/upgrades - should return available upgrades', async () => {
      const response = await request(app)
        .get('/api/upgrades')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('cost');
      }
    });
  });

  describe('Wallet Integration', () => {
    let testPlayerId: string;

    beforeAll(async () => {
      const createResponse = await request(app)
        .post('/api/players')
        .send({ username: 'test_wallet_player', telegramUserId: '111222333' });
      testPlayerId = createResponse.body.id;
    });

    test('POST /api/players/:id/link-wallet - should validate wallet address', async () => {
      const invalidWallet = { walletAddress: 'invalid-address' };
      
      const response = await request(app)
        .post(`/api/players/${testPlayerId}/link-wallet`)
        .send(invalidWallet)
        .expect(400);
      
      expect(response.body.message).toContain('Invalid Solana wallet address');
    });

    test('POST /api/players/:id/link-wallet - should accept valid wallet', async () => {
      const validWallet = { 
        walletAddress: '9JcQHyiBYphAFSuquR4Te6yzuzqKnndhkQsSNfZ8gBze'
      };
      
      const response = await request(app)
        .post(`/api/players/${testPlayerId}/link-wallet`)
        .send(validWallet)
        .expect(200);
      
      expect(response.body).toHaveProperty('walletLinked', true);
    });
  });

  describe('Security Tests', () => {
    test('POST /api/players/:id/burn-tokens - should be disabled for security', async () => {
      const response = await request(app)
        .post('/api/players/test-id/burn-tokens')
        .send({
          tokenAmount: 100,
          walletAddress: 'test',
          privateKey: 'test'
        })
        .expect(403);
      
      expect(response.body.message).toContain('disabled for security reasons');
      expect(response.body).toHaveProperty('securityNote');
    });

    test('Invalid routes should return 404', async () => {
      await request(app)
        .get('/api/nonexistent-endpoint')
        .expect(404);
    });
  });

  describe('Error Handling', () => {
    test('GET /api/players/invalid-id - should handle invalid player ID', async () => {
      const response = await request(app)
        .get('/api/players/invalid-player-id')
        .expect(404);
      
      expect(response.body).toHaveProperty('message');
    });

    test('POST /api/players/:id/upgrades - should handle invalid upgrade', async () => {
      const createResponse = await request(app)
        .post('/api/players')
        .send({ username: 'test_error_player' });
      
      const response = await request(app)
        .post(`/api/players/${createResponse.body.id}/upgrades`)
        .send({ upgradeId: 'nonexistent-upgrade' })
        .expect(404);
      
      expect(response.body.message).toContain('not found');
    });
  });
});