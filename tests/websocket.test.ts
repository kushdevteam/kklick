import { Server } from 'socket.io';
import { createServer } from 'http';
import { io as ioc, Socket as ClientSocket } from 'socket.io-client';

describe('WebSocket Tests', () => {
  let httpServer: any;
  let io: Server;
  let clientSocket: ClientSocket;
  let port: number;

  beforeAll((done) => {
    httpServer = createServer();
    io = new Server(httpServer);
    port = 3001; // Use different port for testing
    
    httpServer.listen(port, () => {
      done();
    });
  });

  afterAll((done) => {
    httpServer.close(() => {
      done();
    });
  });

  beforeEach((done) => {
    clientSocket = ioc(`http://localhost:${port}`);
    
    io.on('connection', (socket) => {
      // Mock the same event handlers as in main server
      socket.on('join-player', (playerId: string) => {
        socket.join(`player-${playerId}`);
        socket.emit('joined-player', playerId);
      });

      socket.on('join-leaderboard', () => {
        socket.join('leaderboard');
        socket.emit('joined-leaderboard');
      });
    });

    clientSocket.on('connect', () => {
      done();
    });
  });

  afterEach(() => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
  });

  describe('Connection Management', () => {
    test('Should establish WebSocket connection', (done) => {
      expect(clientSocket.connected).toBe(true);
      done();
    });

    test('Should handle disconnection gracefully', (done) => {
      clientSocket.on('disconnect', () => {
        expect(clientSocket.connected).toBe(false);
        done();
      });
      
      clientSocket.disconnect();
    });
  });

  describe('Player Room Management', () => {
    test('Should join player-specific room', (done) => {
      const testPlayerId = 'test-player-123';
      
      clientSocket.on('joined-player', (playerId) => {
        expect(playerId).toBe(testPlayerId);
        done();
      });
      
      clientSocket.emit('join-player', testPlayerId);
    });

    test('Should join leaderboard room', (done) => {
      clientSocket.on('joined-leaderboard', () => {
        done();
      });
      
      clientSocket.emit('join-leaderboard');
    });
  });

  describe('Real-time Updates Simulation', () => {
    test('Should broadcast to player room', (done) => {
      const testPlayerId = 'broadcast-test-player';
      
      // First join the room
      clientSocket.emit('join-player', testPlayerId);
      
      // Setup listener for broadcast
      clientSocket.on('player-update', (data) => {
        expect(data.type).toBe('kush-update');
        expect(data.playerId).toBe(testPlayerId);
        done();
      });
      
      // Simulate server broadcasting to player room
      setTimeout(() => {
        io.to(`player-${testPlayerId}`).emit('player-update', {
          type: 'kush-update',
          playerId: testPlayerId,
          newKush: 1000
        });
      }, 50);
    });

    test('Should broadcast to leaderboard room', (done) => {
      // Join leaderboard room
      clientSocket.emit('join-leaderboard');
      
      // Setup listener for leaderboard updates
      clientSocket.on('leaderboard-update', (data) => {
        expect(data.type).toBe('rank-change');
        expect(Array.isArray(data.leaders)).toBe(true);
        done();
      });
      
      // Simulate server broadcasting to leaderboard room
      setTimeout(() => {
        io.to('leaderboard').emit('leaderboard-update', {
          type: 'rank-change',
          leaders: [
            { id: '1', username: 'player1', totalKush: 5000 },
            { id: '2', username: 'player2', totalKush: 3000 }
          ]
        });
      }, 50);
    });
  });

  describe('Error Handling', () => {
    test('Should handle invalid room join attempts', (done) => {
      // Test with invalid player ID
      clientSocket.emit('join-player', null);
      clientSocket.emit('join-player', '');
      clientSocket.emit('join-player', undefined);
      
      // Should not crash the connection
      setTimeout(() => {
        expect(clientSocket.connected).toBe(true);
        done();
      }, 100);
    });

    test('Should handle multiple room joins', (done) => {
      // Join multiple rooms
      clientSocket.emit('join-player', 'player-1');
      clientSocket.emit('join-player', 'player-2');
      clientSocket.emit('join-leaderboard');
      
      // Connection should remain stable
      setTimeout(() => {
        expect(clientSocket.connected).toBe(true);
        done();
      }, 100);
    });
  });
});