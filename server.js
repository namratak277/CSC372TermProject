const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Catch all uncaught errors early
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && (err.stack || err.message || err));
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 4000;

// Basic startup env logging (non-sensitive)
console.log('Startup: FRONTEND_URL =', process.env.FRONTEND_URL || 'http://localhost:3000');
console.log('Startup: PORT =', PORT);
if (process.env.MOTIVATIONAL_API_URL) console.log('Startup: MOTIVATIONAL_API_URL set');
if (process.env.DATABASE_URL) {
  try {
    const parsedHost = new URL(process.env.DATABASE_URL).hostname;
    console.log('Startup: DATABASE_URL host =', parsedHost);
  } catch (e) {
    console.log('Startup: DATABASE_URL present (could not parse host)');
  }
} else {
  console.warn('Startup: DATABASE_URL is not set');
}

// Allow CORS from the frontend during development. Set FRONTEND_URL in .env if different.
// Allow CORS from the frontend and support credentials for session cookies
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));

// Simple request logger to help debug incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());

// Session + Passport for OAuth
const session = require('express-session');
const passport = require('passport');
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-session-secret',
  resave: false,
  saveUninitialized: false,
}));

// Configure passport strategies (if any) and initialize passport middleware
try {
  require('./auth/passport');
  app.use(passport.initialize());
  app.use(passport.session());
} catch (e) {
  console.warn('Passport configuration not loaded:', e && e.message);
}

// Informational startup log about Google OAuth configuration (helps diagnose 501 responses)
try {
  if (passport && passport.googleConfigured) {
    console.log('Startup: Google OAuth is configured. OAuth routes are enabled.');
  } else {
    console.log('Startup: Google OAuth is NOT configured. `/api/auth/google` will return 501.');
    console.log(' - Set env vars `clientID` and `clientSecret` (or `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`).');
    console.log(' - Optionally set `callbackURL` or `GOOGLE_CALLBACK_URL` to your callback path.');
  }
} catch (e) {
  // ignore logging errors
}

// Use backend MVC routes located in project root routes/
const journalsRouter = require('./routes/journals');
const authRouter = require('./routes/auth');
const quotesRouter = require('./routes/quotes');
const habitsRouter = require('./routes/habits');

app.use('/api/journals', journalsRouter);
app.use('/api/auth', authRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/habits', habitsRouter);

// Root route: redirect to frontend dev server or provide info
app.get('/', (req, res) => {
  // If frontend is running on port 3000, redirect there for convenience
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  // Redirecting keeps browser UX simple when visiting backend root
  res.redirect(frontendUrl);
});

// Health check
app.get('/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development', db: process.env.DB_OK !== 'false' }));

// DB health check (lightweight SELECT 1)
const connectionString = process.env.DATABASE_URL || '';
const useSsl = connectionString && connectionString.includes('sslmode=require')
  ? { rejectUnauthorized: false }
  : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false);
const healthPool = connectionString ? new Pool({ connectionString, ssl: useSsl }) : null;

app.get('/health/db', async (req, res) => {
  if (!healthPool) return res.status(500).json({ ok: false, error: 'DATABASE_URL not set' });
  try {
    await healthPool.query('SELECT 1');
    return res.json({ ok: true });
  } catch (err) {
    console.error('DB health check failed', err && (err.message || err));
    return res.status(500).json({ ok: false, error: err && (err.message || 'DB error') });
  }
});

// Initialize DB models (create tables) before starting server
const Journal = require('./models/journalModel');
const Users = require('./models/userModel');
const Habits = require('./models/habitModel');

async function start() {
  // Start the server immediately without waiting for DB init
  const server = app.listen(PORT, () => {
    console.log(`Daily Diary backend listening on port ${PORT}`);
  });
  
  // Initialize DB in background (non-blocking)
  (async () => {
    try {
      await Users.init();
      await Journal.init();
      await Habits.init();
      // Ensure quotes table exists
      const Quotes = require('./models/quoteModel');
      await Quotes.init();
      console.log('Database initialization completed successfully');
    } catch (err) {
      console.error('Failed to initialize database:', err && (err.stack || err.message || err));
      console.warn('Database features may be degraded or unavailable.');
      process.env.DB_OK = 'false';
    }
  })();
  
  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is in use. Kill the process using it or set PORT to a free port.`);
      process.exit(1);
    } else {
      console.error('Server error', err);
      process.exit(1);
    }
  });
}

// Centralized error handler (returns JSON). Placed after routes and before server start.
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && (err.stack || err.message || err));
  const status = (err && err.status) || 500;
  const payload = { ok: false, error: err && (err.message || 'Internal server error') };
  // In development expose stack
  if (process.env.NODE_ENV !== 'production' && err && err.stack) payload.stack = err.stack;
  res.status(status).json(payload);
});

start().catch(err => {
  console.error('Fatal error in start():', err && (err.stack || err.message || err));
  process.exit(1);
});
