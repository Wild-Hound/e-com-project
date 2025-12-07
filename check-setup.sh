#!/bin/bash

echo "🔍 Checking E-Commerce App Setup..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install from https://nodejs.org/"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm installed: v$NPM_VERSION"
else
    echo "❌ npm not found"
fi

echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "⚠️  Dependencies not installed. Run: npm install"
fi

echo ""

# Check MongoDB
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB installed"
    
    # Check if MongoDB is running
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB service is running"
    else
        echo "⚠️  MongoDB installed but not running"
        echo "   Start it with: brew services start mongodb-community@8.0"
    fi
else
    echo "⚠️  MongoDB not installed"
    echo "   Install with:"
    echo "   brew tap mongodb/brew"
    echo "   brew install mongodb-community@8.0"
    echo ""
    echo "   OR use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
fi

echo ""

# Check environment files
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "⚠️  .env file missing. Copy from .env.example"
fi

if [ -f ".env.local" ]; then
    echo "✅ .env.local file exists"
else
    echo "⚠️  .env.local file missing"
fi

echo ""
echo "📋 Next Steps:"
echo "1. If MongoDB not installed: brew install mongodb-community@8.0"
echo "2. Start MongoDB: brew services start mongodb-community@8.0"
echo "3. Seed database: npm run seed"
echo "4. Start app: npm run dev"
echo ""
echo "📖 For detailed setup, see QUICKSTART.md"
