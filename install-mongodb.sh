#!/bin/bash

echo "🔧 Installing MongoDB Community Edition..."
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew is not installed. Please install it first:"
    echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

echo "✅ Homebrew found"
echo ""

# Tap MongoDB formula
echo "📥 Adding MongoDB tap..."
brew tap mongodb/brew

# Install MongoDB
echo "📦 Installing MongoDB Community Edition..."
brew install mongodb-community@8.0

# Start MongoDB service
echo "🚀 Starting MongoDB service..."
brew services start mongodb-community@8.0

# Wait a moment for service to start
sleep 3

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null; then
    echo ""
    echo "✅ MongoDB installed and running successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Seed the database: npm run seed"
    echo "2. Start the application: npm run dev"
else
    echo ""
    echo "⚠️  MongoDB installed but may not be running yet"
    echo "   Try: brew services start mongodb-community@8.0"
fi

echo ""
echo "💡 Useful commands:"
echo "   Start:   brew services start mongodb-community@8.0"
echo "   Stop:    brew services stop mongodb-community@8.0"
echo "   Restart: brew services restart mongodb-community@8.0"
echo "   Status:  brew services list | grep mongodb"
