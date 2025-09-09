# KushKlicker Admin Panel

This is the separate admin panel for KushKlicker, designed to be hosted on `admin.kushklicker.com`.

## Features

- Player management and overview
- Token payout approval and management
- System monitoring and performance metrics
- Admin authentication with secure access controls

## Development

```bash
# Install dependencies
npm install

# Run development servers (client + admin API server)
npm run dev

# Run only the client (frontend)
npm run dev:client

# Run only the admin server (backend)
npm run dev:server
```

## Production Deployment

### For Replit Deployment

1. Create a new Replit project for the admin panel
2. Upload this admin-panel directory as the project root
3. Set environment variables:
   - `DATABASE_URL` - Same as main app
   - `ADMIN_PORT` - Default 3002
4. Configure subdomain routing to point `admin.kushklicker.com` to this Replit

### For Custom Hosting

1. Build the client:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Configure your web server (nginx/Apache) to:
   - Serve the built client files from `dist/` on `admin.kushklicker.com`
   - Proxy API requests to the admin server running on port 3002

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (shared with main app)
- `ADMIN_PORT` - Port for admin API server (default: 3002)
- `NODE_ENV` - Environment (development/production)

## Security

- Admin authentication required for all sensitive operations
- CORS configured for admin subdomain only
- Admin credentials hardcoded for initial setup (update for production)

## API Endpoints

- `GET /api/players` - List all players
- `GET /api/token-payouts` - List token payouts
- `POST /api/token-payouts/:id/confirm` - Confirm payout
- `POST /api/token-payouts/:id/mark-failed` - Mark payout as failed
- `GET /api/admin/player-balances` - Get player balance overview
- `GET /api/admin/system/performance-metrics` - System metrics

## Subdomain Configuration

For proper subdomain hosting, ensure:

1. DNS A record points `admin.kushklicker.com` to your server
2. SSL certificate covers the admin subdomain
3. Web server routes admin subdomain traffic to this application
4. CORS is properly configured for cross-origin requests to main app database