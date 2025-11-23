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
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  await pool.query(sql);
}

async function getAll() {
  const r = await pool.query('SELECT id, user_id, title, content, created_at FROM journals ORDER BY created_at DESC');
  return r.rows;
}

async function getById(id) {
  const r = await pool.query('SELECT id, user_id, title, content, created_at FROM journals WHERE id = $1', [Number(id)]);
  return r.rows[0] || null;
}

async function create({ user_id, title = '', content = '' } = {}) {
  const r = await pool.query(
    'INSERT INTO journals (user_id, title, content) VALUES ($1, $2, $3) RETURNING id, user_id, title, content, created_at',
    [user_id, title, content]
  );
  return r.rows[0];
}

async function update(id, data = {}) {
  const fields = [];
  const values = [];
  let idx = 1;
  if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); }
  if (data.content !== undefined) { fields.push(`content = $${idx++}`); values.push(data.content); }
  // Always update created_at to now() when editing
  fields.push('created_at = now()');
  values.push(Number(id));
  const sql = `UPDATE journals SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, title, content, created_at`;
  const r = await pool.query(sql, values);
  return r.rows[0] || null;
}

async function remove(id) {
  const r = await pool.query('DELETE FROM journals WHERE id = $1 RETURNING id', [Number(id)]);
  return r.rowCount > 0;
}

module.exports = { init, getAll, getById, create, update, remove };
