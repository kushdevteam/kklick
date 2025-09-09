import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseWebSocketOptions {
  playerId?: string;
  enableLeaderboard?: boolean;
}

interface WebSocketData {
  type: string;
  [key: string]: any;
}

export function useWebSocket({ playerId, enableLeaderboard = false }: UseWebSocketOptions) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketData | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socketUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000' 
      : window.location.origin;

    socketRef.current = io(socketUrl, {
      transports: ['websocket', 'polling'],
      timeout: 5000,
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('🔌 WebSocket connected:', socket.id);
      setIsConnected(true);

      // Join player-specific room if playerId provided
      if (playerId) {
        socket.emit('join-player', playerId);
        console.log(`👤 Joined player room: ${playerId}`);
      }

      // Join leaderboard room if enabled
      if (enableLeaderboard) {
        socket.emit('join-leaderboard');
        console.log('🏆 Joined leaderboard room');
      }
    });

    socket.on('disconnect', () => {
      console.log('🔌 WebSocket disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    });

    // Real-time update handlers
    socket.on('player-update', (data: WebSocketData) => {
      console.log('📊 Player update received:', data);
      setLastMessage(data);
    });

    socket.on('leaderboard-update', (data: WebSocketData) => {
      console.log('🏆 Leaderboard update received:', data);
      setLastMessage(data);
    });

    socket.on('achievement-unlocked', (data: WebSocketData) => {
      console.log('🏅 Achievement unlocked:', data);
      setLastMessage(data);
    });

    socket.on('vip-activated', (data: WebSocketData) => {
      console.log('💎 VIP activated:', data);
      setLastMessage(data);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [playerId, enableLeaderboard]);

  // Function to emit custom events
  const emit = (event: string, data?: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
    }
  };

  // Function to subscribe to custom events
  const on = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  // Function to unsubscribe from events
  const off = (event: string, callback?: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  return {
    isConnected,
    lastMessage,
    emit,
    on,
    off,
    socket: socketRef.current,
  };
}