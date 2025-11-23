const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(payload.userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    console.error('auth error', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
