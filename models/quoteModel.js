// Postgres-backed Quotes model for persisted/stored quotes
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });

async function init() {
  const sql = `
    CREATE TABLE IF NOT EXISTS quotes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      content TEXT NOT NULL,
      author TEXT,
      source TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  await pool.query(sql);
}

async function getAll() {
  const r = await pool.query('SELECT id, user_id, content, author, source, created_at FROM quotes ORDER BY created_at DESC');
  return r.rows;
}

async function getAllForUser(user_id) {
  const r = await pool.query('SELECT id, user_id, content, author, source, created_at FROM quotes WHERE user_id = $1 ORDER BY created_at DESC', [Number(user_id)]);
  return r.rows;
}

async function getById(id) {
  const r = await pool.query('SELECT id, user_id, content, author, source, created_at FROM quotes WHERE id = $1', [Number(id)]);
  return r.rows[0] || null;
}

async function create({ user_id = null, content, author = null, source = null } = {}) {
  const r = await pool.query(
    'INSERT INTO quotes (user_id, content, author, source) VALUES ($1, $2, $3, $4) RETURNING id, user_id, content, author, source, created_at',
    [user_id, content, author, source]
  );
  return r.rows[0];
}

async function remove(id) {
  const r = await pool.query('DELETE FROM quotes WHERE id = $1 RETURNING id', [Number(id)]);
  return r.rowCount > 0;
}

module.exports = { init, getAll, getAllForUser, getById, create, remove };
