#!/bin/bash

# Daily Diary Quick Start Script
# This script helps set up and test the Daily Diary application

set -e

echo "=========================================="
echo "Daily Diary - Quick Start Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env from .env.example"
        echo ""
        echo "📋 Please edit .env and fill in your credentials:"
        echo "   - DATABASE_URL (Neon PostgreSQL connection string)"
        echo "   - JWT_SECRET (any random string)"
        echo "   - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (from Google Cloud Console)"
        echo ""
    else
        echo "❌ .env.example not found"
        exit 1
    fi
fi

echo "📦 Installing backend dependencies..."
npm install

echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1️⃣  Setup Google OAuth (if not done):"
echo "   - Go to: https://console.cloud.google.com/"
echo "   - Create project → Enable Google+ API"
echo "   - Create OAuth 2.0 credentials (Web app)"
echo "   - Add redirect URI: http://localhost:4000/api/auth/google/callback"
echo "   - Copy Client ID & Secret to .env"
echo ""
echo "2️⃣  Setup PostgreSQL Database (if needed):"
echo "   - Use Neon: https://console.neon.tech/"
echo "   - Create project → Copy connection string to DATABASE_URL in .env"
echo ""
echo "3️⃣  Test database connection:"
echo "   npm run test-db"
echo ""
echo "4️⃣  Run the application:"
echo "   npm run dev"
echo ""
echo "5️⃣  Visit in browser:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend health: http://localhost:4000/health"
echo "   - Backend DB health: http://localhost:4000/health/db"
echo ""
echo "✨ For more details, see README.md"
