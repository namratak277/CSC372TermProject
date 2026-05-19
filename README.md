# Daily Diary — CSC372 Term Project

A fast, lightweight full-stack journaling application designed for busy students and employees to quickly record their thoughts and stay motivated with daily inspirational quotes.

**Demo Video:** [Watch on SharePoint](https://uncg-my.sharepoint.com/:v:/r/personal/n_karki_uncg_edu/Documents/TermProjectDemo.mp4?csf=1&web=1&e=2SdPwX)

## Features

### Authentication
- ✅ Sign up for a new account
- ✅ Log in / Log out with secure JWT authentication
- ✅ **Google OAuth sign-in** (single-click login with Google account)
- ✅ Password reset via email token

### Journal Management
- ✅ Create new journal entries
- ✅ Edit existing entries
- ✅ Delete entries
- ✅ View all journal entries in a clean UI

### Motivational Content
- ✅ Integrated with motivational quotes API
- ✅ Display daily inspiration

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Deployed on:** Vercel
- **Live URL:** https://csc-372-term-project.vercel.app/

### Backend
- **Node.js + Express** - REST API server
- **JWT Authentication** - Secure token-based auth
- **Passport.js** - OAuth strategy support
- **Deployed on:** Railway
- **Live URL:** https://csc372termproject-production.up.railway.app/

### Database
- **PostgreSQL** via Neon
- **Models:** Users, Journals, Habits, Quotes

### External APIs
- **Google OAuth 2.0** - Third-party authentication
- **Motivational Quotes API** - Inspiration content

---

## Quick Start Guide

### Prerequisites
- Node.js 16+ and npm
- A PostgreSQL database (Neon is recommended for free hosting)
- Google OAuth credentials (for Google sign-in feature)

### 1. Environment Setup

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Fill in your credentials:

```
# Backend Configuration
PORT=4000
NODE_ENV=development

# Database (PostgreSQL)
# Get this from Neon: https://console.neon.tech/
DATABASE_URL=postgres://user:password@ep-xxx.neon.tech/neondb?sslmode=require

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-key-here

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Google OAuth (follow setup instructions below)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Session Secret
SESSION_SECRET=your-session-secret
```

### 2. Google OAuth Setup

Follow these steps to enable Google sign-in:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - **Development:** `http://localhost:4000/api/auth/google/callback`
     - **Production:** `https://your-domain.com/api/auth/google/callback`
   - Copy the Client ID and Client Secret into your `.env` file

### 3. Database Setup

#### Using Neon (Recommended - Free)

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string
4. Add it to `.env` as `DATABASE_URL`
5. Tables will be auto-created on first server startup

#### Using Local PostgreSQL

```bash
psql -U postgres
CREATE DATABASE daily_diary;
```

Then update `.env`:
```
DATABASE_URL=postgres://postgres:password@localhost:5432/daily_diary
```

### 4. Backend Installation & Running

```bash
# Install dependencies
npm install

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev:backend
```

Backend runs on: http://localhost:4000

### 5. Frontend Installation & Running

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: http://localhost:3000

### 6. Run Both Together (Optional)

From the root directory:

```bash
npm run dev
```

This runs both frontend and backend concurrently.

---

## Testing the Application

### Health Checks
```bash
# Backend health
curl http://localhost:4000/health

# Database connection
curl http://localhost:4000/health/db

# Google OAuth config status (dev only)
curl http://localhost:4000/api/auth/debug
```

### Test Authentication

1. **Sign Up:** Go to http://localhost:3000/signup
2. **Traditional Login:** Use the credentials you created
3. **Google Sign-In:** Click "Sign in with Google" button on login page
4. **Create Entry:** After login, create a journal entry to verify database connection

---

## Project Structure

```
daily-diary/
├── server.js                 # Backend entry point
├── auth/
│   └── passport.js          # Passport.js configuration
├── routes/
│   ├── auth.js              # Authentication endpoints
│   ├── journals.js          # Journal CRUD endpoints
│   ├── quotes.js            # Quotes endpoint
│   └── habits.js            # Habits endpoint
├── controllers/
│   ├── authController.js    # Auth business logic
│   └── journalController.js # Journal business logic
├── models/
│   ├── userModel.js         # User DB operations
│   ├── journalModel.js      # Journal DB operations
│   ├── habitModel.js        # Habit DB operations
│   └── quoteModel.js        # Quote DB operations
├── frontend/                # Next.js application
│   ├── pages/
│   │   ├── login.js         # Login page with Google OAuth
│   │   ├── signup.js        # Signup page
│   │   ├── journals/        # Journal pages
│   │   └── _app.js          # App wrapper
│   ├── components/
│   │   ├── Header.js        # Navigation header
│   │   ├── JournalEntry.js  # Journal entry component
│   │   └── Quote.js         # Quote display component
│   └── styles/              # CSS files
└── scripts/
    └── seed.js              # Database seeding script
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new account
- `POST /api/auth/login` - Login with username/password
- `GET /api/auth/google` - Start Google OAuth flow
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user (requires JWT)
- `POST /api/auth/forgot` - Request password reset
- `POST /api/auth/reset` - Reset password with token

### Journals
- `GET /api/journals` - Get all journals for user
- `POST /api/journals` - Create new journal
- `PUT /api/journals/:id` - Update journal
- `DELETE /api/journals/:id` - Delete journal

### Quotes
- `GET /api/quotes/random` - Get random motivational quote

### Health
- `GET /health` - Backend health check
- `GET /health/db` - Database connection check

---

## Troubleshooting

### Google Sign-In Not Working

1. **Check configuration:**
   ```bash
   curl http://localhost:4000/api/auth/debug
   ```
   Should show `googleReady: true` if configured correctly.

2. **Verify environment variables:**
   ```bash
   echo $GOOGLE_CLIENT_ID
   echo $GOOGLE_CLIENT_SECRET
   ```

3. **Check callback URL matches:**
   - In Google Cloud Console, ensure redirect URI matches exactly
   - Development: `http://localhost:4000/api/auth/google/callback`
   - Check logs: `http://localhost:4000/api/auth/google/url` (dev only)

4. **Browser console errors:**
   - Open browser DevTools (F12)
   - Check Console tab for CORS or API errors
   - Check Network tab to see actual request

### Database Connection Issues

1. **Check DATABASE_URL:**
   ```bash
   curl http://localhost:4000/health/db
   ```

2. **Test connection manually:**
   ```bash
   psql $DATABASE_URL -c "SELECT 1"
   ```

3. **For Neon users:**
   - Ensure `sslmode=require` is in connection string
   - Check if database is in "Active" state in Neon console

### Login Not Working

1. Verify database is running: `curl http://localhost:4000/health/db`
2. Check JWT_SECRET is set: `echo $JWT_SECRET`
3. Verify user exists (sign up first if needed)
4. Check backend logs for errors

---

## Learning Outcomes

This project covers:
- ✅ Full-stack architecture (frontend + backend + database)
- ✅ REST API design and implementation
- ✅ Authentication methods (JWT, OAuth 2.0)
- ✅ Database design and querying (PostgreSQL)
- ✅ Deployment strategies (Vercel, Railway, Neon)
- ✅ Git version control
- ✅ Environment configuration and secrets management

---

## Future Ideas

- 🎯 Tagging and categories for journal entries
- 🖼️ Add images or media to entries
- 🌙 Dark mode toggle
- 📱 Mobile app version
- 📊 Journal analytics (word count, entry frequency)
- 🔍 Full-text search for entries
- 👥 Social features (share entries, follow friends)

---

## Challenges Faced & Solutions

| Challenge | Solution |
|-----------|----------|
| Small code changes breaking entire app | Improved error handling and logging throughout |
| Frontend-backend integration | Added CORS configuration and comprehensive error messages |
| Database connection management | Implemented connection pooling and health checks |
| Google OAuth setup complexity | Created detailed setup guide and debug endpoints |
| Token persistence across browser tabs | Implemented localStorage and storage event listeners |

---

## Contributing

To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add your feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is part of CSC372 (Web Development) at UNCG.

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [JWT Introduction](https://jwt.io/)

---

**Last Updated:** May 2026
**Status:** Active Development ✨
