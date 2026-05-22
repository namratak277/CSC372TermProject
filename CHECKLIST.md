# Daily Diary - Pre-Launch Checklist

Use this checklist to verify everything is working before deploying to production.

## ✅ Environment & Configuration

- [ ] `.env` file exists in project root
- [ ] `.env.example` is properly documented
- [ ] All required environment variables are filled in:
  - [ ] `DATABASE_URL` is set
  - [ ] `JWT_SECRET` is set to a random string
  - [ ] `GOOGLE_CLIENT_ID` is set
  - [ ] `GOOGLE_CLIENT_SECRET` is set
  - [ ] `FRONTEND_URL` is set (http://localhost:3000 for dev)
- [ ] `.env` file is in `.gitignore` (secrets not committed)

## 🗄️ Database

- [ ] Database is created (Neon or local PostgreSQL)
- [ ] `DATABASE_URL` points to correct database
- [ ] Backend can connect to database:
  ```bash
  curl http://localhost:4000/health/db
  # Should return: {"ok": true}
  ```
- [ ] Tables are auto-created on first run
- [ ] Sample data is seeded (optional):
  ```bash
  npm run seed
  ```

## 🔐 Google OAuth

- [ ] Google Cloud project is created
- [ ] Google+ API is enabled in Cloud project
- [ ] OAuth 2.0 credentials are created (Web app)
- [ ] Client ID and Secret are copied to `.env`
- [ ] Redirect URI is added to Google Cloud Console:
  - [ ] Development: `http://localhost:4000/api/auth/google/callback`
  - [ ] Production: `https://your-domain.com/api/auth/google/callback` (when deploying)
- [ ] OAuth configuration is verified:
  ```bash
  curl http://localhost:4000/api/auth/debug
  # Should return: {"googleReady": true, "clientID": true, "clientSecret": true, ...}
  ```

## 🚀 Backend

- [ ] Dependencies are installed: `npm install`
- [ ] Backend starts successfully: `npm run dev:backend`
- [ ] Logs show "Google OAuth: CONFIGURED"
- [ ] Health check works:
  ```bash
  curl http://localhost:4000/health
  # Returns: {"ok": true, "env": "development", "db": true}
  ```
- [ ] All auth routes are responding:
  - [ ] `POST /api/auth/signup`
  - [ ] `POST /api/auth/login`
  - [ ] `GET /api/auth/google`
  - [ ] `GET /api/auth/google/callback`
  - [ ] `GET /api/auth/me`

## 🎨 Frontend

- [ ] Frontend dependencies installed: `cd frontend && npm install && cd ..`
- [ ] `frontend/.env.local` exists and is configured:
  - [ ] `NEXT_PUBLIC_API_BASE=http://localhost:4000` (dev)
  - [ ] `NEXT_PUBLIC_QUOTE_API=http://localhost:4000/api/quotes/random` (dev)
- [ ] Frontend builds successfully: `npm run build`
- [ ] Frontend starts successfully: `npm run dev:frontend`
- [ ] Frontend is accessible: http://localhost:3000

## 🧪 Feature Testing

### Traditional Authentication
- [ ] Can navigate to `/signup`
- [ ] Can create new account with username and password
- [ ] Account is saved to database
- [ ] Can navigate to `/login`
- [ ] Can log in with created account
- [ ] Username appears in header after login
- [ ] Can navigate to `/journals`
- [ ] Can log out
- [ ] After logout, redirected to home page

### Journal Management
- [ ] Can create a new journal entry
- [ ] Journal entry is saved to database
- [ ] Can view all journals
- [ ] Can edit journal entry
- [ ] Can delete journal entry
- [ ] Can refresh page and entries persist

### Google OAuth Sign-In
- [ ] Can navigate to `/login`
- [ ] "Sign in with Google" button is visible and styled
- [ ] Clicking button redirects to Google login page
- [ ] Can sign in with Google account
- [ ] Google redirects back to app with auth token
- [ ] Username appears in header (email or Google name)
- [ ] New user is created in database from Google profile
- [ ] Can create journal entries after Google sign-in
- [ ] Can log out successfully

### Error Handling
- [ ] Invalid login shows appropriate error
- [ ] Duplicate username shows error on signup
- [ ] Missing required fields shows validation error
- [ ] Database errors show user-friendly message (not raw SQL)
- [ ] Network errors are handled gracefully

## 🔒 Security

- [ ] `JWT_SECRET` is a strong random string
- [ ] `SESSION_SECRET` is set and strong
- [ ] `.env` file is NOT committed to git
- [ ] Secrets are not logged to console
- [ ] Passwords are hashed with bcrypt
- [ ] JWT tokens have expiration time (7 days)
- [ ] CORS is configured correctly
- [ ] No sensitive data in error messages

## 📱 Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Mobile layout works (if responsive design is needed)

## 📚 Documentation

- [ ] README.md is comprehensive and accurate
- [ ] SETUP_GUIDE.md has all needed instructions
- [ ] Code comments explain complex logic
- [ ] Error messages are clear and helpful
- [ ] API endpoints are documented

## 🚢 Pre-Production (Before Deploying)

### Frontend Deployment (Vercel)
- [ ] Repository is pushed to GitHub
- [ ] Vercel project is created and connected
- [ ] Environment variables are set in Vercel:
  - [ ] `NEXT_PUBLIC_API_BASE` (production backend URL)
  - [ ] `NEXT_PUBLIC_QUOTE_API` (production backend URL)
- [ ] Build succeeds on Vercel
- [ ] Frontend is accessible at production URL

### Backend Deployment (Railway)
- [ ] Repository is pushed to GitHub
- [ ] Railway project is created and connected
- [ ] Environment variables are set in Railway:
  - [ ] `DATABASE_URL` (production database)
  - [ ] `JWT_SECRET` (strong secret)
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `FRONTEND_URL` (production frontend URL)
  - [ ] `GOOGLE_CALLBACK_URL` (production callback URL)
  - [ ] `PORT=4000`
- [ ] Build succeeds on Railway
- [ ] Backend is accessible at production URL
- [ ] Production health check passes:
  ```bash
  curl https://your-backend-url.com/health
  ```

### Google OAuth Production
- [ ] Production redirect URI is added to Google Cloud Console:
  ```
  https://your-backend-url.com/api/auth/google/callback
  ```
- [ ] Google OAuth still works after deployment
- [ ] Users can sign in with Google in production

## ✨ Final Verification

- [ ] All checklist items are checked
- [ ] No 404 errors on any page
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] Database is responsive
- [ ] Google OAuth flow is smooth
- [ ] All user workflows (signup, login, journal, Google) work end-to-end

---

## 📋 When Something Fails

1. Check the relevant section above
2. Read SETUP_GUIDE.md troubleshooting section
3. Check backend logs for errors
4. Check browser console (F12) for errors
5. Verify environment variables are correct
6. Test database connection separately
7. Test API endpoints with curl/Postman

---

## 🎯 You're Ready When...

✅ All items in this checklist are marked as complete
✅ No errors in logs or browser console
✅ All features work from signup to logout
✅ Google OAuth works smoothly
✅ Database persists data correctly

---

**Last Updated:** May 2026
**Project Status:** ✨ Ready for Production Deployment!
