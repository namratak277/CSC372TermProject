const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = async function auth(req, res, next) {
  try {
    if (req.user && req.user.id) {
      return next();
    }

    const header = req.headers.authorization || '';
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = jwt.verify(match[1], JWT_SECRET);
    const userId = payload && (payload.userId || payload.id);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await Users.getUserById(userId);
    req.user = user || { id: userId };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};