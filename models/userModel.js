const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });

async function init() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      google_id TEXT,
      display_name TEXT,
      first_name TEXT,
      last_name TEXT,
      email TEXT UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        reset_token TEXT,
        reset_expires TIMESTAMP WITH TIME ZONE
    );
  `;
  await pool.query(sql);
    // ensure columns exist for older installations
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token TEXT;")
      .catch(() => {})
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_expires TIMESTAMP WITH TIME ZONE;")
      .catch(() => {})
    // Add optional google-related columns if missing
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id TEXT").catch(()=>{});
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT").catch(()=>{});
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name TEXT").catch(()=>{});
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT").catch(()=>{});
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT").catch(()=>{});
}

async function createUser(username, passwordHash) {
  const r = await pool.query(
    'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
    [username, passwordHash]
  );
  return r.rows[0];
}

// Create a user record from Google profile data
async function createNewUser({ googleId, displayName, firstName, lastName, email }) {
  const r = await pool.query(
    'INSERT INTO users (google_id, display_name, first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, google_id, display_name, first_name, last_name, email, created_at',
    [googleId, displayName, firstName, lastName, email, '']
  );
  return r.rows[0];
}

async function getUserByGoogleId(googleId) {
  const r = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
  return r.rows[0] || null;
}

async function getUserById(id) {
  const r = await pool.query('SELECT * FROM users WHERE id = $1', [Number(id)]);
  return r.rows[0] || null;
}

async function findByUsername(username) {
  const r = await pool.query('SELECT id, username, password_hash FROM users WHERE username = $1', [username]);
  return r.rows[0] || null;
}

async function findById(id) {
  const r = await pool.query('SELECT id, username, created_at FROM users WHERE id = $1', [id]);
  return r.rows[0] || null;
}

async function setResetToken(userId, token, expires) {
  const r = await pool.query('UPDATE users SET reset_token = $1, reset_expires = $2 WHERE id = $3 RETURNING id, username', [token, expires, userId]);
  return r.rows[0] || null;
}

async function findByResetToken(token) {
  const r = await pool.query('SELECT id, username, reset_expires FROM users WHERE reset_token = $1', [token]);
  return r.rows[0] || null;
}

async function updatePassword(id, passwordHash) {
  const r = await pool.query('UPDATE users SET password_hash = $1, reset_token = NULL, reset_expires = NULL WHERE id = $2 RETURNING id, username', [passwordHash, id]);
  return r.rows[0] || null;
}

module.exports = { init, createUser, findByUsername, findById, setResetToken, findByResetToken, updatePassword, createNewUser, getUserByGoogleId, getUserById };
