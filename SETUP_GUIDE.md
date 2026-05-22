# Daily Diary - Complete Setup Guide

This guide walks you through every step to get Daily Diary running locally with Google OAuth sign-in.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Google OAuth Configuration](#google-oauth-configuration)
4. [Database Setup](#database-setup)
5. [Backend Setup](#backend-setup)
6. [Frontend Setup](#frontend-setup)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, make sure you have:

- **Node.js 16+** - [Download](https://nodejs.org/)
  ```bash
  node --version
  npm --version
  ```

- **Git** - [Download](https://git-scm.com/)

- **A Google Account** - For OAuth configuration

- **PostgreSQL Database** - Either local or Neon (recommended)

---

## Environment Setup

### Step 1: Copy Environment Template

```bash
# From project root
cp .env.example .env
```

### Step 2: Edit .env File

Open `.env` and fill in your configuration:

```env
PORT=4000
NODE_ENV=development

# Get this from Neon (see Database Setup section)
DATABASE_URL=postgres://user:password@host/database?sslmode=require

# Create a random string (e.g., use: openssl rand -base64 32)
JWT_SECRET=your-super-secret-key

FRONTEND_URL=http://localhost:3000

# Get these from Google Cloud Console (see Google OAuth section)
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here

SESSION_SECRET=your-session-secret
```

---

## Google OAuth Configuration

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "New Project"
4. Enter project name: `Daily Diary` (or your preference)
5. Click "Create"
6. Wait for project to be created (may take a minute)

### Step 2: Enable Google+ API

1. In the sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click the result
4. Click "Enable"
5. Wait for it to enable

### Step 3: Create OAuth 2.0 Credentials

1. In the sidebar, click "APIs & Services" → "Credentials"
2. Click "Create Credentials" (top button) → "OAuth client ID"
3. Choose "Web application"
4. Under "Authorized redirect URIs", click "Add URI" and enter:
   ```
   http://localhost:4000/api/auth/google/callback
   ```
5. Click "Create"
6. A popup appears with your credentials

### Step 4: Copy Credentials to .env

Copy the Client ID and Client Secret into your `.env` file:

```env
GOOGLE_CLIENT_ID=abc123xyz...
GOOGLE_CLIENT_SECRET=xyz789abc...
```

**Important:** Never commit these secrets! Keep them private.

### Step 5: Test Google OAuth Setup (Optional)

Before you test this step, make sure the backend is running in a separate terminal:

```bash
npm run dev:backend
```

If you open the URL before the server starts, the browser will show `ERR_CONNECTION_REFUSED`.

Then visit:
```
http://localhost:4000/api/auth/debug
```

If you prefer the terminal, this works too:

```bash
curl http://localhost:4000/api/auth/debug
```

You should see:
```json
{
  "googleReady": true,
  "clientID": true,
  "clientSecret": true,
  "callback": "/api/auth/google/callback"
}
```

---

## Database Setup

### Option A: Using Neon (Recommended - Free)

1. Go to [Neon Console](https://console.neon.tech/)
2. Click "Sign up" and create an account
3. Create a new project
4. In the project overview, you'll see a connection string
5. Copy the connection string that looks like:
   ```
   postgres://user:password@ep-xxx.neon.tech/neondb?sslmode=require
   ```
6. Paste it in `.env`:
   ```env
   DATABASE_URL=postgres://user:password@ep-xxx.neon.tech/neondb?sslmode=require
   ```

### Option B: Using Local PostgreSQL

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Open Terminal/Command Prompt
3. Create a database:
   ```bash
   psql -U postgres
   CREATE DATABASE daily_diary;
   \q
   ```
4. Update `.env`:
   ```env
   DATABASE_URL=postgres://postgres:your-password@localhost:5432/daily_diary
   ```

### Testing Database Connection

Once backend is running, test with:
```bash
curl http://localhost:4000/health/db
```

Expected response:
```json
{"ok": true}
```

---

## Backend Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Create Database Tables (Optional - Auto-created)

To manually seed sample data:
```bash
npm run seed
```

This creates test users:
- Username: `namrata`, Password: `1234`
- Username: `person`, Password: `1111`

### Step 3: Start Backend

```bash
npm run dev:backend
```

You should see:
```
Daily Diary backend listening on port 4000
✅ Google OAuth: CONFIGURED
```

### Step 4: Test Backend Health

In another terminal:
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{"ok": true, "env": "development", "db": true}
```

---

## Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend
npm install
cd ..
```

### Step 2: Configure Environment

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE=http://localhost:4000
NEXT_PUBLIC_QUOTE_API=http://localhost:4000/api/quotes/random
```

### Step 3: Start Frontend

From root directory:
```bash
npm run dev:frontend
```

Or from frontend directory:
```bash
cd frontend
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
- Environments: .env.local
```

---

## Testing

### Step 1: Test Traditional Login

1. Visit http://localhost:3000
2. Click "Sign up"
3. Create a new account:
   - Username: `testuser`
   - Password: `testpass123`
4. You should be logged in!
5. Create a journal entry to test database

### Step 2: Test Google Sign-In

1. Go to http://localhost:3000/login
2. Click "Sign in with Google" button
3. You'll be redirected to Google login page
4. Sign in with your Google account
5. You'll be redirected back and automatically logged in!
6. Check that you're logged in (see username in header)

### Step 3: Test Logout

1. Click "Logout" button in header
2. Should be redirected to home page
3. Username should disappear

### Step 4: Test Protected Routes

Try accessing `/journals` without logging in:
- Should redirect to login page

---

## Troubleshooting

### `nodemon` is not recognized

This usually means the root dependencies have not been installed yet.

**Fix:**
```bash
npm install
```

Then start the backend again:
```bash
npm run dev:backend
```

### Google Sign-In Not Working

**Check 1: Verify OAuth is configured**
```bash
curl http://localhost:4000/api/auth/debug
```

Should show `"googleReady": true`

**Check 2: Verify callback URL matches**
- In Google Cloud Console, check that your redirect URI exactly matches:
  - `http://localhost:4000/api/auth/google/callback`
- No trailing slashes, no typos

**Check 3: Check browser console**
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab to see if requests are failing

**Check 4: Verify environment variables**
```bash
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_CLIENT_SECRET
```

Should both have values

### Login Not Working

**Check 1: Verify database is running**
```bash
curl http://localhost:4000/health/db
```

Should return `{"ok": true}`

**Check 2: Verify user exists**
- If using seeded data, username is `namrata` with password `1234`
- Or create new account via signup page

**Check 3: Check backend logs**
- Look for error messages in terminal where backend is running

### Database Connection Failed

**Check 1: Verify DATABASE_URL**
```bash
echo $DATABASE_URL
```

Should show your connection string

**Check 2: Test connection manually**
```bash
psql $DATABASE_URL -c "SELECT 1"
```

Should return `1`

DATABASE_URL -c "SELECT 1"
Command 'psql' not found, but can be installed with:
sudo apt install postgresql-client-common

**Check 3: For Neon users**
- Log into https://console.neon.tech/
- Check if database is in "Active" state
- If suspended, activate it

### CORS Errors

**Symptoms:** Browser console shows "Access-Control-Allow-Origin" error

**Solutions:**
1. Verify `FRONTEND_URL` in `.env` matches your frontend URL
2. Backend should have CORS enabled for development
3. Check that backend is running on port 4000

### Token Errors

**Symptoms:** "Unauthorized" errors when trying to access protected routes

**Check 1:** Verify JWT_SECRET is set and consistent
```bash
echo $JWT_SECRET
```

**Check 2:** Try logging out and logging back in
- Old tokens may be invalid if JWT_SECRET changed

---

## Production Deployment

Once testing is complete, you can deploy:

### Frontend (Vercel)
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import repository
4. Add environment variables:
   - `NEXT_PUBLIC_API_BASE` → Your backend URL
   - `NEXT_PUBLIC_QUOTE_API` → Your backend URL/api/quotes/random
5. Deploy!

### Backend (Render)
1. Go to [Render](https://render.com/)
2. Create new project
3. Connect GitHub repository
4. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `FRONTEND_URL` → Your Vercel frontend URL
   - `BACKEND_URL` → Your Render backend URL
   - `GOOGLE_CALLBACK_URL` → `https://your-render-service.onrender.com/api/auth/google/callback`
5. Deploy!

### Google OAuth Production Setup
1. In Google Cloud Console, add production redirect URI:
   ```
   https://your-render-service.onrender.com/api/auth/google/callback
   ```
2. Update production `.env` with the same callback URL if you are not using `GOOGLE_CALLBACK_URL`

---

## Common Commands

```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend

# Both together
npm run dev

# Seed database with test data
npm run seed

# Test database connection
npm run test-db

# Build frontend for production
npm run build

# Start frontend production server
npm run start:frontend
```

---

## Getting Help

1. Check this guide's Troubleshooting section
2. Read the main [README.md](./README.md)
3. Check backend logs for errors
4. Check browser DevTools (F12) Console tab
5. Look for error messages in `.env` validation

---

**Last Updated:** May 2026
**Status:** ✅ Ready for Production
