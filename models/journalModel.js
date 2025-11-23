// Postgres-backed Journal model (works with Neon). Uses `pg` Pool.
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });

async function init() {
  // Create table if it doesn't exist
  const sql = `
    CREATE TABLE IF NOT EXISTS journals (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title TEXT,
      content TEXT,
      habit_completed BOOLEAN DEFAULT FALSE,
      habit_completed_at TIMESTAMP WITH TIME ZONE NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  await pool.query(sql);
  // Add columns if table already existed (safe migration)
  await pool.query("ALTER TABLE journals ADD COLUMN IF NOT EXISTS habit_completed BOOLEAN DEFAULT FALSE");
  await pool.query("ALTER TABLE journals ADD COLUMN IF NOT EXISTS habit_completed_at TIMESTAMP WITH TIME ZONE NULL");
}

async function getAll() {
  const r = await pool.query('SELECT id, user_id, title, content, habit_completed, habit_completed_at, created_at FROM journals ORDER BY created_at DESC');
  return r.rows;
}

async function getById(id) {
  const r = await pool.query('SELECT id, user_id, title, content, habit_completed, habit_completed_at, created_at FROM journals WHERE id = $1', [Number(id)]);
  return r.rows[0] || null;
}

async function create({ user_id, title = '', content = '', habit_completed = false } = {}) {
  const r = await pool.query(
    'INSERT INTO journals (user_id, title, content, habit_completed) VALUES ($1, $2, $3, $4) RETURNING id, user_id, title, content, habit_completed, habit_completed_at, created_at',
    [user_id, title, content, habit_completed]
  );
  return r.rows[0];
}

async function update(id, data = {}) {
  const fields = [];
  const values = [];
  let idx = 1;
  if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); }
  if (data.content !== undefined) { fields.push(`content = $${idx++}`); values.push(data.content); }
  if (data.habit_completed !== undefined) {
    fields.push(`habit_completed = $${idx++}`);
    values.push(data.habit_completed);
    if (data.habit_completed) {
      fields.push(`habit_completed_at = now()`);
    } else {
      fields.push(`habit_completed_at = NULL`);
    }
  }
  // Always update created_at to now() when editing
  fields.push('created_at = now()');
  values.push(Number(id));
  const sql = `UPDATE journals SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, title, content, habit_completed, habit_completed_at, created_at`;
  const r = await pool.query(sql, values);
  return r.rows[0] || null;
}

async function remove(id) {
  const r = await pool.query('DELETE FROM journals WHERE id = $1 RETURNING id', [Number(id)]);
  return r.rowCount > 0;
}

module.exports = { init, getAll, getById, create, update, remove };
