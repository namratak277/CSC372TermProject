const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Habits = require('../models/habitModel');

// List habits for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const rows = await Habits.getAllForUser(userId);
    res.json(rows);
  } catch (err) {
    console.error('Failed to list habits', err);
    res.status(500).json({ error: 'Failed to list habits' });
  }
});

// Create a new habit for the authenticated user
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const { name, color } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    const h = await Habits.create({ user_id: userId, name, color });
    res.status(201).json(h);
  } catch (err) {
    console.error('Failed to create habit', err);
    res.status(500).json({ error: 'Failed to create habit' });
  }
});

// Get a single habit (ensure ownership)
router.get('/:id', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const habit = await Habits.getById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Not found' });
    if (habit.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });
    res.json(habit);
  } catch (err) {
    console.error('Failed to get habit', err);
    res.status(500).json({ error: 'Failed to get habit' });
  }
});

// Update habit (ownership required)
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const habit = await Habits.getById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Not found' });
    if (habit.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });
    const updated = await Habits.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error('Failed to update habit', err);
    res.status(500).json({ error: 'Failed to update habit' });
  }
});

// Delete habit (ownership required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const habit = await Habits.getById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Not found' });
    if (habit.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });
    const ok = await Habits.remove(req.params.id);
    res.json({ ok });
  } catch (err) {
    console.error('Failed to delete habit', err);
    res.status(500).json({ error: 'Failed to delete habit' });
  }
});

// Get completions for a habit over a date range
// GET /api/habits/:id/completions?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/:id/completions', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const habit = await Habits.getById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Not found' });
    if (habit.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ error: 'Missing start or end query parameter' });
    const rows = await Habits.getCompletionsForHabit(habit.id, start, end);
    res.json(rows);
  } catch (err) {
    console.error('Failed to get completions', err);
    res.status(500).json({ error: 'Failed to get completions' });
  }
});

// Set or update a completion for a date
// POST /api/habits/:id/completions  body: { date: 'YYYY-MM-DD', completed: true }
router.post('/:id/completions', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const habit = await Habits.getById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Not found' });
    if (habit.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });
    const { date, completed = true } = req.body;
    if (!date) return res.status(400).json({ error: 'Missing date' });
    const rec = await Habits.setCompletion(habit.id, date, completed);
    res.json(rec);
  } catch (err) {
    console.error('Failed to set completion', err);
    res.status(500).json({ error: 'Failed to set completion' });
  }
});

// Delete a completion for a date
// DELETE /api/habits/:id/completions?date=YYYY-MM-DD
router.delete('/:id/completions', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const habit = await Habits.getById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Not found' });
    if (habit.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Missing date query parameter' });
    const ok = await Habits.removeCompletion(habit.id, date);
    res.json({ ok });
  } catch (err) {
    console.error('Failed to delete completion', err);
    res.status(500).json({ error: 'Failed to delete completion' });
  }
});

module.exports = router;
