import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";

// Enhanced bot detection patterns (more specific to avoid false positives)
const BOT_PATTERNS = [
  /curl\//i,
  /wget/i,
  /^python/i,
  /scrapy/i,
  /^$/ // Empty user agent only
];

const SUSPICIOUS_IPS = new Set<string>();
const REQUEST_TIMESTAMPS = new Map<string, number[]>();

// Enhanced input validation middleware
export const validateInput = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      if (req.body && Object.keys(req.body).length > 0) {
        req.body = schema.parse(req.body);
      }
      
      // Security checks for common attack patterns
      const bodyStr = JSON.stringify(req.body);
      if (bodyStr && (
        bodyStr.includes('<script>') ||
        bodyStr.includes('javascript:') ||
        bodyStr.includes('sql') ||
        bodyStr.includes('DROP') ||
        bodyStr.includes('DELETE')
      )) {
        return res.status(400).json({ 
          error: "Invalid input detected",
          code: "SECURITY_VIOLATION"
        });
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid input format",
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      return res.status(400).json({ error: "Input validation failed" });
    }
  };
};

// Enhanced bot protection middleware
export const botProtection = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get('User-Agent') || '';
  const ip = req.ip || req.connection.remoteAddress || '';
  
  // Check for bot patterns in user agent
  const isBotUserAgent = BOT_PATTERNS.some(pattern => pattern.test(userAgent));
  
  if (isBotUserAgent) {
    console.log(`🚫 Bot detected: ${userAgent} from IP ${ip}`);
    return res.status(429).json({ 
      error: "Automated access not allowed",
      code: "BOT_DETECTED"
    });
  }
  
  // Track request frequency per IP
  const now = Date.now();
  const ipRequests = REQUEST_TIMESTAMPS.get(ip) || [];
  
  // Remove requests older than 1 minute
  const recentRequests = ipRequests.filter(timestamp => now - timestamp < 60000);
  recentRequests.push(now);
  REQUEST_TIMESTAMPS.set(ip, recentRequests);
  
  // Flag suspicious IPs (more than 300 requests per minute)
  if (recentRequests.length > 300) {
    SUSPICIOUS_IPS.add(ip);
    console.log(`🚨 Suspicious activity from IP ${ip}: ${recentRequests.length} requests/minute`);
    return res.status(429).json({ 
      error: "Too many requests",
      code: "RATE_LIMIT_EXCEEDED"
    });
  }
  
  // Block known suspicious IPs
  if (SUSPICIOUS_IPS.has(ip)) {
    return res.status(429).json({ 
      error: "Access temporarily restricted",
      code: "IP_BLOCKED"
    });
  }
  
  next();
};

// Enhanced rate limiters for different endpoint types
export const secureRateLimiters = {
  // Strict limiter for sensitive actions
  strict: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // 10 requests per 5 minutes
    message: {
      error: "Too many sensitive operations",
      code: "STRICT_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),
  
  // Admin action limiter
  admin: rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // 30 admin actions per minute
    message: {
      error: "Too many admin operations",
      code: "ADMIN_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),
  
  // Token operation limiter
  tokens: rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 20, // 20 token operations per 10 minutes
    message: {
      error: "Too many token operations",
      code: "TOKEN_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),

  // Wallet operation limiter
  wallet: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 wallet operations per hour
    message: {
      error: "Too many wallet operations",
      code: "WALLET_RATE_LIMIT"
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
};

// Comprehensive input sanitization
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeString = (str: string): string => {
    return str
      .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[sanitizeString(key)] = sanitizeObject(value);
      }
      return sanitized;
    }
    
    return obj;
  };

  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

// Request monitoring for security analytics
export const securityMonitor = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const ip = req.ip || '';
  const userAgent = req.get('User-Agent') || '';
  
  // Log high-risk operations
  const isHighRisk = (
    req.path.includes('/admin') ||
    req.path.includes('/token') ||
    req.path.includes('/wallet') ||
    req.method === 'DELETE'
  );
  
  if (isHighRisk) {
    console.log(`🔍 Security Monitor: ${req.method} ${req.path} from ${ip}`);
  }
  
  // Track response time for performance monitoring
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    // Log slow requests (> 5 seconds)
    if (duration > 5000) {
      console.log(`⚠️ Slow request: ${req.method} ${req.path} took ${duration}ms from ${ip}`);
    }
    
    // Log failed requests from same IP
    if (res.statusCode >= 400) {
      const failedRequests = REQUEST_TIMESTAMPS.get(`${ip}:failed`) || [];
      failedRequests.push(Date.now());
      REQUEST_TIMESTAMPS.set(`${ip}:failed`, failedRequests.slice(-10)); // Keep last 10 failures
      
      // Flag IP after 5 failures in 5 minutes
      const recentFailures = failedRequests.filter(time => Date.now() - time < 300000);
      if (recentFailures.length >= 5) {
        SUSPICIOUS_IPS.add(ip);
        console.log(`🚨 IP flagged for multiple failures: ${ip}`);
      }
    }
  });
  
  next();
};

// Clean up suspicious IPs periodically (unblock after 1 hour)
setInterval(() => {
  SUSPICIOUS_IPS.clear();
  REQUEST_TIMESTAMPS.clear();
  console.log('🧹 Security monitor: Cleared temporary IP blocks');
}, 3600000); // 1 hour