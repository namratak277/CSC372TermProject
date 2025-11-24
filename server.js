const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Allow CORS from the frontend during development. Set FRONTEND_URL in .env if different.
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

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

// Use backend MVC routes located in project root routes/
const journalsRouter = require('./routes/journals');
const authRouter = require('./routes/auth');
const quoteRouter = require('./routes/quote');
const quotesRouter = require('./routes/quotes');
const habitsRouter = require('./routes/habits');

app.use('/api/journals', journalsRouter);
app.use('/api/auth', authRouter);
app.use('/api/quote', quoteRouter);
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
app.get('/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }));

// Initialize DB models (create tables) before starting server
const Journal = require('./models/journalModel');
const Users = require('./models/userModel');
const Habits = require('./models/habitModel');

async function start() {
  try {
    await Users.init();
    await Journal.init();
    await Habits.init();
    // Ensure quotes table exists
    const Quotes = require('./models/quoteModel');
    await Quotes.init();
    // Bind explicitly to localhost to avoid potential permission issues
    const server = app.listen(PORT, '127.0.0.1', () => {
      console.log(`Daily Diary backend listening on http://127.0.0.1:${PORT}`);
    });
    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is in use. Kill the process using it or set PORT to a free port.`);
        process.exit(1);
      } else {
        console.error('Server error', err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
}

start();
