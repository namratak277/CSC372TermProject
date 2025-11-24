// Postgres-backed Habits model. Each habit belongs to a user.
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });

async function init() {
  // Create table if it doesn't exist
  const sql = `
    CREATE TABLE IF NOT EXISTS habits (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      color TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  await pool.query(sql);
  // safe adds (no-op if already present)
  await pool.query("ALTER TABLE habits ADD COLUMN IF NOT EXISTS color TEXT");
  // Create habit_completions table for per-habit per-day completion tracking
  const completionsSql = `
    CREATE TABLE IF NOT EXISTS habit_completions (
      id SERIAL PRIMARY KEY,
      habit_id INTEGER NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      UNIQUE (habit_id, date)
    );
  `;
  await pool.query(completionsSql);
  await pool.query('CREATE INDEX IF NOT EXISTS idx_habit_completions_habit_date ON habit_completions (habit_id, date)');
}

async function getAllForUser(user_id) {
  const r = await pool.query('SELECT id, user_id, name, color, created_at FROM habits WHERE user_id = $1 ORDER BY created_at DESC', [Number(user_id)]);
  return r.rows;
}

async function getById(id) {
  const r = await pool.query('SELECT id, user_id, name, color, created_at FROM habits WHERE id = $1', [Number(id)]);
  return r.rows[0] || null;
}

async function create({ user_id, name, color = null } = {}) {
  const r = await pool.query(
    'INSERT INTO habits (user_id, name, color) VALUES ($1, $2, $3) RETURNING id, user_id, name, color, created_at',
    [user_id, name, color]
  );
  return r.rows[0];
}

async function update(id, data = {}) {
  const fields = [];
  const values = [];
  let idx = 1;
  if (data.name !== undefined) { fields.push(`name = $${idx++}`); values.push(data.name); }
  if (data.color !== undefined) { fields.push(`color = $${idx++}`); values.push(data.color); }
  values.push(Number(id));
  const sql = `UPDATE habits SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, user_id, name, color, created_at`;
  const r = await pool.query(sql, values);
  return r.rows[0] || null;
}

async function remove(id) {
  const r = await pool.query('DELETE FROM habits WHERE id = $1 RETURNING id', [Number(id)]);
  return r.rowCount > 0;
}

module.exports = { init, getAllForUser, getById, create, update, remove };

// --- Completions API ---
async function getCompletionsForHabit(habit_id, startDate, endDate) {
  const r = await pool.query(
    `SELECT date, completed FROM habit_completions WHERE habit_id = $1 AND date >= $2 AND date <= $3 ORDER BY date ASC`,
    [Number(habit_id), startDate, endDate]
  );
  return r.rows;
}

async function setCompletion(habit_id, date, completed = true) {
  const r = await pool.query(
    `INSERT INTO habit_completions (habit_id, date, completed) VALUES ($1, $2, $3)
     ON CONFLICT (habit_id, date) DO UPDATE SET completed = EXCLUDED.completed
     RETURNING id, habit_id, date, completed, created_at`,
    [Number(habit_id), date, completed]
  );
  return r.rows[0];
}

async function removeCompletion(habit_id, date) {
  const r = await pool.query('DELETE FROM habit_completions WHERE habit_id = $1 AND date = $2 RETURNING id', [Number(habit_id), date]);
  return r.rowCount > 0;
}

module.exports = { init, getAllForUser, getById, create, update, remove, getCompletionsForHabit, setCompletion, removeCompletion };
