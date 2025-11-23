// Seed script: creates users with bcrypt-hashed passwords and sample journals.
// Usage: from repo root run `node scripts/seed.js` or `npm run seed` (if added to package.json)

const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL not set in environment. Add it to .env or set env var.');
  process.exit(1);
}

const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });

async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS journals (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title TEXT,
      content TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `);
}

async function upsertUser(username, plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  // Try insert; if conflict on username, return existing
  const r = await pool.query(
    `INSERT INTO users (username, password_hash) VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash
     RETURNING id, username`,
    [username, hash]
  );
  return r.rows[0];
}

async function createJournal(userId, title, content) {
  const r = await pool.query(
    'INSERT INTO journals (user_id, title, content) VALUES ($1, $2, $3) RETURNING id, user_id, title, created_at',
    [userId, title, content]
  );
  return r.rows[0];
}

async function main() {
  try {
    await ensureTables();
    console.log('Tables ensured.');

    const usersToCreate = [
      { username: 'namrata', password: '1234' },
      { username: 'person', password: '1111' }
    ];

    const created = [];
    for (const u of usersToCreate) {
      const row = await upsertUser(u.username, u.password);
      console.log('Upserted user:', row.username, 'id=', row.id);
      created.push(row);
    }

    // Create sample journals for each user
    for (const u of created) {
      await createJournal(u.id, 'Welcome', `Hello ${u.username}, this is a seeded entry.`);
      await createJournal(u.id, 'Sample', 'This is another seeded note.');
      console.log('Seeded journals for', u.username);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

main();
