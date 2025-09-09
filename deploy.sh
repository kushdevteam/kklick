#!/bin/bash

# KushKlicker Portable Deployment Script
# Run this script on any Linux machine to set up and start the game

set -e

echo "🌿 KushKlicker Portable Deployment Script 🌿"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Installing Node.js..."
    
    # Detect OS and install Node.js
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            # Ubuntu/Debian
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command -v yum &> /dev/null; then
            # CentOS/RHEL
            curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
            sudo yum install -y nodejs
        else
            echo "❌ Unsupported Linux distribution. Please install Node.js 18+ manually."
            exit 1
        fi
    else
        echo "❌ Unsupported operating system. Please install Node.js 18+ manually."
        exit 1
    fi
else
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18+."
        exit 1
    fi
    echo "✅ Node.js $(node -v) found"
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please edit .env file to configure your Telegram bot token and other settings"
    echo "   Default bot token is already configured, but you may want to customize other settings"
fi

# Build the application
echo "🔨 Building application for production..."
npm run build

# Check if port 5000 is available
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5000 is already in use. Please stop the service using port 5000 or change the PORT in .env"
    echo "   To find what's using port 5000: sudo lsof -i :5000"
    echo "   To kill the process: sudo kill -9 <PID>"
    read -p "   Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get local IP address
LOCAL_IP=$(hostname -I | awk '{print $1}')

echo ""
echo "🚀 Starting KushKlicker..."
echo "✅ Game will be available at:"
echo "   Local:    http://localhost:5000"
echo "   Network:  http://$LOCAL_IP:5000"
echo ""
echo "📱 To enable Telegram bot:"
echo "   1. Edit server/telegram-bot.ts (uncomment the code)"
echo "   2. Install telegram packages: npm install node-telegram-bot-api @types/node-telegram-bot-api"
echo "   3. Restart the application"
echo ""
echo "💰 To enable Solana wallet:"
echo "   1. Install Solana packages: npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-phantom @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets"
echo "   2. Edit client/src/components/wallet/solana-wallet.tsx (uncomment the actual implementation)"
echo "   3. Restart the application"
echo ""
echo "🔧 To stop the game: Press Ctrl+C"
echo "📋 For detailed setup instructions, see SETUP.md"
echo "👨‍💻 For developer information, see DEVELOPER.md"
echo ""
echo "Starting server in 3 seconds..."
sleep 3

# Start the application
NODE_ENV=production npm start