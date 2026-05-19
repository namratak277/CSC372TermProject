@echo off
REM Daily Diary Quick Start Script (Windows)

echo ==========================================
echo Daily Diary - Quick Start Setup
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js is not installed.
    echo Please install Node.js 16+ from https://nodejs.org/
    exit /b 1
)

echo Node.js version:
node --version

echo npm version:
npm --version
echo.

REM Check if .env file exists
if not exist ".env" (
    echo Warning: .env file not found. Creating from template...
    if exist ".env.example" (
        copy .env.example .env
        echo Created .env from .env.example
        echo.
        echo Please edit .env and fill in your credentials:
        echo   - DATABASE_URL (Neon PostgreSQL connection string)
        echo   - JWT_SECRET (any random string)
        echo   - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
        echo.
    ) else (
        echo Error: .env.example not found
        exit /b 1
    )
)

echo Installing backend dependencies...
call npm install

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installation complete!
echo.
echo ==========================================
echo Next Steps:
echo ==========================================
echo.
echo 1. Setup Google OAuth:
echo    - Go to: https://console.cloud.google.com/
echo    - Create project and enable Google+ API
echo    - Create OAuth 2.0 credentials
echo    - Add redirect URI: http://localhost:4000/api/auth/google/callback
echo    - Copy credentials to .env
echo.
echo 2. Setup PostgreSQL Database:
echo    - Use Neon: https://console.neon.tech/
echo    - Create project and copy connection string to .env
echo.
echo 3. Test database connection:
echo    npm run test-db
echo.
echo 4. Run the application:
echo    npm run dev
echo.
echo 5. Visit:
echo    - Frontend: http://localhost:3000
echo    - Backend health: http://localhost:4000/health
echo    - Backend DB health: http://localhost:4000/health/db
echo.
echo For more details, see README.md
echo.
pause
