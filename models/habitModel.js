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
