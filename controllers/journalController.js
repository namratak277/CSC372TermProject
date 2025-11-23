const Journal = require('../models/journalModel');

async function list(req, res) {
  try {
    // If authentication is used, return only this user's journals
    if (req.user && req.user.id) {
      const items = await Journal.getAll();
      // filter for this user
      const filtered = items.filter(i => i.user_id === req.user.id);
      return res.json(filtered);
    }
    const items = await Journal.getAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list journals' });
  }
}

async function get(req, res) {
  try {
    const id = req.params.id;
    const item = await Journal.getById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    if (!req.user || req.user.id !== item.user_id) return res.status(403).json({ error: 'Forbidden' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get journal' });
  }
}

async function create(req, res) {
  try {
    const { title, content } = req.body;
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const entry = await Journal.create({ user_id: userId, title, content });
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create journal' });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    // ensure ownership
    const items = await Journal.getAll();
    const item = items.find(i => i.id === Number(id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    if (!req.user || req.user.id !== item.user_id) return res.status(403).json({ error: 'Forbidden' });
    const updated = await Journal.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update journal' });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    // ensure ownership
    const items = await Journal.getAll();
    const item = items.find(i => i.id === Number(id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    if (!req.user || req.user.id !== item.user_id) return res.status(403).json({ error: 'Forbidden' });
    const ok = await Journal.remove(id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete journal' });
  }
}

module.exports = { list, create, get, update, remove };
