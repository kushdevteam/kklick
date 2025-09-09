import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import net from "net";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { startTelegramBot } from "./telegram-bot";
import { startDiscordBot } from "./discord-bot";
import { startKushNotifyBot } from "./kush-notify-bot";
import { mainnetTokenService } from "./solana-token-service";
import { tokenIntegration } from "./token-integration";
import { 
  botProtection, 
  sanitizeInput, 
  securityMonitor,
  secureRateLimiters 
} from "./security-middleware";

// Global server instance tracking with process ID
let serverInstance: http.Server | null = null;
let isShuttingDown = false;

// Process tracking for deployment
const PROCESS_ID_FILE = '/tmp/kushklicker-server.pid';

// Check if another instance is already running
const checkExistingInstance = async (): Promise<boolean> => {
  try {
    const fs = await import('fs');
    if (fs.existsSync(PROCESS_ID_FILE)) {
      const pidString = fs.readFileSync(PROCESS_ID_FILE, 'utf8').trim();
      const pid = parseInt(pidString);
      
      // Check if process is still running
      try {
        process.kill(pid, 0); // Signal 0 checks if process exists
        console.log(`⚠️ Server already running with PID ${pid}`);
        return true;
      } catch (error) {
        // Process doesn't exist, remove stale PID file
        fs.unlinkSync(PROCESS_ID_FILE);
        console.log(`🧹 Removed stale PID file for process ${pid}`);
        return false;
      }
    }
    return false;
  } catch (error) {
    console.warn('⚠️ Error checking existing instance:', error);
    return false;
  }
};

// Write current process ID to file
const writePidFile = async (): Promise<void> => {
  try {
    const fs = await import('fs');
    fs.writeFileSync(PROCESS_ID_FILE, process.pid.toString());
    console.log(`📝 Process ID ${process.pid} written to ${PROCESS_ID_FILE}`);
  } catch (error) {
    console.warn('⚠️ Could not write PID file:', error);
  }
};

// Clean up PID file
const cleanupPidFile = async (): Promise<void> => {
  try {
    const fs = await import('fs');
    if (fs.existsSync(PROCESS_ID_FILE)) {
      fs.unlinkSync(PROCESS_ID_FILE);
      console.log(`🧹 Cleaned up PID file`);
    }
  } catch (error) {
    console.warn('⚠️ Error cleaning up PID file:', error);
  }
};

// Enhanced port availability checker with timeout
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer();
    let isResolved = false;
    
    // Set timeout to prevent hanging
    const timeout = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        server.close();
        resolve(false);
      }
    }, 3000);
    
    server.listen(port, () => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        server.once('close', () => {
          resolve(true);
        });
        server.close();
      }
    });
    
    server.on('error', () => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        resolve(false);
      }
    });
  });
};

// Enhanced graceful shutdown handler with complete cleanup
const gracefulShutdown = async (signal: string) => {
  if (isShuttingDown) return;
  
  log(`🔄 Received ${signal}, shutting down gracefully...`);
  isShuttingDown = true;
  
  // Set shorter timeout for quick shutdown
  const shutdownTimeout = setTimeout(() => {
    console.error('⚠️ Could not complete graceful shutdown, forcefully exiting');
    process.exit(1);
  }, 15000);
  
  try {
    // Clean up PID file first
    await cleanupPidFile();
    
    // Clean up bots first with timeout
    console.log('🤖 Stopping bots...');
    const botCleanupPromise = Promise.all([
      (async () => {
        try {
          const { stopTelegramBot } = await import('./telegram-bot.js');
          stopTelegramBot();
          console.log('✅ Telegram bot stopped');
        } catch (error) {
          console.warn('⚠️ Error stopping Telegram bot:', error);
        }
      })(),
      (async () => {
        try {
          const { stopKushNotifyBot } = await import('./kush-notify-bot.js');
          stopKushNotifyBot();
          console.log('✅ KushNotifyBot stopped');
        } catch (error) {
          console.warn('⚠️ Error stopping KushNotifyBot:', error);
        }
      })()
    ]);
    
    // Wait for bot cleanup with timeout
    await Promise.race([
      botCleanupPromise,
      new Promise(resolve => setTimeout(resolve, 5000))
    ]);
    
    log('🤖 Bot cleanup completed');
  } catch (error) {
    console.error('⚠️ Error during bot cleanup:', error);
  }
  
  // Close server
  if (serverInstance) {
    serverInstance.close(async (err) => {
      clearTimeout(shutdownTimeout);
      if (err) {
        console.error('❌ Error during server shutdown:', err);
        process.exit(1);
      }
      log('✅ Server closed successfully');
      serverInstance = null;
      await cleanupPidFile();
      process.exit(0);
    });
  } else {
    clearTimeout(shutdownTimeout);
    process.exit(0);
  }
};

// Register shutdown handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', async (error) => {
  console.error('💥 Uncaught Exception:', error);
  console.error('📍 Stack trace:', error.stack);
  
  // Clean up server resources before exit
  try {
    await cleanupPidFile();
  } catch (error) {
    console.error('⚠️ Error cleaning up PID file during emergency:', error);
  }
  if (serverInstance) {
    try {
      serverInstance.close();
      serverInstance = null;
    } catch (cleanupError) {
      console.error('❌ Error during emergency cleanup:', cleanupError);
    }
  }
  
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  
  // For critical promise rejections, trigger cleanup
  if (reason && typeof reason === 'object' && 'code' in reason && reason.code === 'EADDRINUSE') {
    console.error('🚨 Critical port conflict detected in promise rejection');
    gracefulShutdown('UNHANDLED_REJECTION');
  } else {
    console.warn('⚠️ Non-critical promise rejection, continuing...');
  }
});

const app = express();

// Configure trust proxy for rate limiting (Replit uses proxies in all environments)
app.set('trust proxy', 1);

// Configure CORS to allow admin panel access
app.use(cors({
  origin: [
    'http://localhost:3001', // Admin panel frontend in development
    'https://admin.kushklicker.com', // Admin panel in production
    'http://localhost:5000', // Allow same-origin requests
    'https://kushklicker.com' // Main production domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting middleware
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 API requests per minute
  message: {
    error: "Too many API requests, please slow down.",
    retryAfter: "1 minute"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const clickLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 180, // Allow up to 3 clicks per second (180 per minute)
  message: {
    error: "Click rate limit exceeded. Please slow down your clicking.",
    retryAfter: "1 minute"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use(generalLimiter);
app.use('/api', apiLimiter);
app.use('/api/players/*/enhanced-click', clickLimiter);

// Enhanced security middleware
app.use(securityMonitor);
app.use(sanitizeInput);
app.use('/api/admin', secureRateLimiters.admin);
app.use('/api/tokens', secureRateLimiters.tokens);
app.use('/api/players/*/link-wallet', secureRateLimiters.wallet);
app.use(botProtection);

// Enhanced request logging with morgan
morgan.token('response-data', (req: any, res: any) => {
  return res.responseData ? JSON.stringify(res.responseData).slice(0, 100) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response-data', {
  skip: (req: any, res: any) => !req.path.startsWith('/api'), // Only log API requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Create HTTP server for Socket.IO integration
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'development' ? "*" : false,
      methods: ["GET", "POST"]
    }
  });

  // WebSocket connection handling
  io.on('connection', (socket) => {
    log(`🔌 WebSocket client connected: ${socket.id}`);
    
    // Join player-specific room for real-time updates
    socket.on('join-player', (playerId: string) => {
      socket.join(`player-${playerId}`);
      log(`👤 Player ${playerId} joined room`);
    });

    // Handle live leaderboard subscription
    socket.on('join-leaderboard', () => {
      socket.join('leaderboard');
      log(`🏆 Client subscribed to leaderboard updates`);
    });

    socket.on('disconnect', () => {
      log(`🔌 WebSocket client disconnected: ${socket.id}`);
    });
  });

  // Make Socket.IO available to routes
  app.set('io', io);

  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, httpServer);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  
  // Deployment environment detection
  const isProduction = process.env.NODE_ENV === 'production';
  const isDeployment = process.env.REPLIT_DEPLOYMENT === 'true' || isProduction;
  
  if (isDeployment) {
    console.log('🚀 Starting in DEPLOYMENT mode');
    console.log(`   Environment: ${process.env.NODE_ENV}`);
    console.log(`   Process ID: ${process.pid}`);
    // Additional deployment delay to prevent race conditions during deployment
    await new Promise(resolve => setTimeout(resolve, 3000));
  } else {
    console.log('🔧 Starting in DEVELOPMENT mode');
  }
  
  // Check for existing instances (important for deployment)
  const existingInstance = await checkExistingInstance();
  if (existingInstance) {
    console.error(`❌ Another server instance is already running`);
    console.error(`   This commonly happens during deployment restarts`);
    console.error(`   The existing instance should handle requests`);
    process.exit(1);
  }
  
  // Check if server instance is already running in this process
  if (serverInstance) {
    log(`⚠️ Server instance already exists in this process, skipping startup`);
    return;
  }
  
  // Write PID file to track this instance
  await writePidFile();
  
  // Skip port checking for deployment to avoid conflicts
  if (!isDeployment) {
    console.log(`🔍 Checking port ${port} availability...`);
    let portAttempts = 0;
    const maxAttempts = 3;
    const attemptDelay = 1000;
    
    while (portAttempts < maxAttempts) {
      const portAvailable = await isPortAvailable(port);
      if (portAvailable) {
        console.log(`✅ Port ${port} is available`);
        break;
      }
      
      portAttempts++;
      console.log(`⚠️ Port ${port} is busy (attempt ${portAttempts}/${maxAttempts})`);
      
      if (portAttempts >= maxAttempts) {
        console.error(`❌ Port ${port} is already in use after ${maxAttempts} attempts.`);
        console.error(`   Another server instance might be running.`);
        console.error(`   Environment: DEVELOPMENT`);
        console.error(`   To find what's using port ${port}: lsof -i :${port}`);
        console.error(`   To kill the process: kill -9 $(lsof -ti :${port})`);
        await cleanupPidFile(); // Clean up before exit
        process.exit(1);
      }
      
      // Wait before retrying
      console.log(`⏳ Waiting ${attemptDelay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, attemptDelay));
    }
  } else {
    console.log(`🚀 Deployment mode: skipping port availability check`);
  }
  
  // Store server instance reference
  serverInstance = httpServer;
  
  httpServer.listen(port, "0.0.0.0", async () => {
    log(`🚀 Server with WebSocket support running on port ${port}`);
    
    // Initialize mainnet token service
    try {
      console.log('🪙 Initializing mainnet token service...');
      await mainnetTokenService.initialize();
      console.log('✅ Mainnet token service ready for rewards!');
    } catch (error) {
      console.error('❌ Token service initialization failed:', error);
      console.log('⚠️ Game will continue without token rewards');
    }
    
    // Start bots after server is running
    startTelegramBot();
    startKushNotifyBot();
    try {
      await startDiscordBot();
    } catch (error) {
      console.error('Discord bot startup failed:', error);
    }
  });
  
  // Handle server startup errors
  httpServer.on('error', async (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${port} is already in use. Server startup failed.`);
      console.error(`   Another instance of the server might be running.`);
      console.error(`   Environment: ${isDeployment ? 'DEPLOYMENT' : 'DEVELOPMENT'}`);
      console.error(`   Please check for existing processes and try again.`);
      await cleanupPidFile();
      process.exit(1);
    } else {
      console.error('❌ Server startup error:', error);
      await cleanupPidFile();
      process.exit(1);
    }
  });
})();
