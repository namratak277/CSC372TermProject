const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Users = require('../models/userModel');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const existing = await Users.findByUsername(username);
    if (existing) return res.status(409).json({ error: 'username already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await Users.createUser(username, hash);
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ ok: true, user: { id: user.id, username: user.username }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const user = await Users.findByUsername(username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ ok: true, user: { id: user.id, username: user.username }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
}

async function me(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    res.json({ ok: true, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user' });
  }
}

async function forgot(req, res) {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'username required' });
    const user = await Users.findByUsername(username);
    if (!user) {
      // don't reveal whether user exists
      return res.json({ ok: true });
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await Users.setResetToken(user.id, token, expires);
    // In production, send token via email. For local/dev return token so tester can use it.
    console.log('Password reset token for', username, token);
    res.json({ ok: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to request password reset' });
  }
}

async function reset(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'token and password required' });
    const row = await Users.findByResetToken(token);
    if (!row) return res.status(400).json({ error: 'Invalid token' });
    if (row.reset_expires && new Date(row.reset_expires) < new Date()) return res.status(400).json({ error: 'Token expired' });
    const hash = await bcrypt.hash(password, 10);
    await Users.updatePassword(row.id, hash);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}

module.exports = { signup, login, me, forgot, reset };
