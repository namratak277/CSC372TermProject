const express = require('express');
const router = express.Router();
const axios = require('axios');
const Quote = require('../models/quoteModel');
const auth = require('../middleware/auth');

// Built-in fallback quotes used when external APIs are unreachable
const BUILTIN_QUOTES = [
  { content: "Life isn't about finding yourself. Life is about creating yourself.", author: 'George Bernard Shaw' },
  { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { content: "Don't watch the clock; do what it does. Keep going.", author: 'Sam Levenson' },
  { content: 'Keep your face always toward the sunshine—and shadows will fall behind you.', author: 'Walt Whitman' },
  { content: 'The future depends on what you do today.', author: 'Mahatma Gandhi' }
];

function getBuiltinQuote() {
  const q = BUILTIN_QUOTES[Math.floor(Math.random() * BUILTIN_QUOTES.length)];
  return { ok: true, content: q.content, author: q.author, fetchedFrom: 'builtin' };
}

// GET saved quotes (returns only the authenticated user's saved quotes)
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const rows = await Quote.getAllForUser(userId);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list saved quotes' });
  }
});

// POST save a quote (requires auth in future; accepts content, author, source)
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { content, author, source } = req.body;
    if (!content) return res.status(400).json({ error: 'Missing content' });
    const q = await Quote.create({ user_id: userId || null, content, author, source });
    res.status(201).json(q);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save quote' });
  }
});

// DELETE a saved quote by id (requires auth). If the quote belongs to the user or is
// stored without user_id, allow deletion by an authenticated user who owns it.
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await Quote.getById(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    // If the quote has a user_id, ensure the requester owns it
    if (existing.user_id && (!req.user || req.user.id !== existing.user_id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const ok = await Quote.remove(id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to delete quote', err);
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

// GET external motivational quote (proxy). Uses MOTIVATIONAL_API_URL in .env if set, otherwise falls back.
router.get('/external', async (req, res) => {
  // Try configured URL plus a few common endpoints if the first attempt returns 404.
  const externalBase = process.env.MOTIVATIONAL_API_URL || 'https://api.quotable.io/random';
  const key = process.env.MOTIVATIONAL_API_KEY;
  const keyHeader = process.env.MOTIVATIONAL_API_KEY_HEADER || 'Authorization';
  const headers = {};
  if (key) headers[keyHeader] = key;

  // Helper to join base + path safely
  function joinUrl(base, path) {
    if (!path) return base;
    if (base.endsWith('/') && path.startsWith('/')) return base + path.slice(1);
    if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path;
    return base + path;
  }

  const candidates = [
    externalBase,
    joinUrl(externalBase, 'random'),
    joinUrl(externalBase, 'quote'),
    joinUrl(externalBase, 'api/quote'),
    joinUrl(externalBase, 'api/random'),
    joinUrl(externalBase, 'quotes/random'),
    joinUrl(externalBase, 'quote/random')
  ];

  let lastErr = null;
  for (const url of candidates) {
    try {
      const r = await axios.get(url, { headers });
      if (r && (r.status >= 200 && r.status < 300)) {
        // Normalize common shapes
        let content = '';
        let author = '';
        if (r.data) {
          if (typeof r.data === 'string') {
            content = r.data;
          } else if (Array.isArray(r.data) && r.data.length > 0) {
            const item = r.data[0];
            content = item.content || item.quote || item.text || item.message || JSON.stringify(item);
            author = item.author || item.person || '';
          } else if (typeof r.data === 'object') {
            content = r.data.content || r.data.quote || r.data.text || r.data.message || r.data.q || '';
            author = r.data.author || r.data.person || r.data.writer || r.data.a || '';
            if (!content) {
              for (const k of Object.keys(r.data)) {
                if (typeof r.data[k] === 'string' && r.data[k].length > 10) { content = r.data[k]; break }
              }
            }
            if (!content) content = JSON.stringify(r.data);
          }
        }
        console.log(`External quote fetched from ${url}`);
        return res.json({ ok: true, content, author, raw: r.data, fetchedFrom: url });
      }
      lastErr = new Error(`Status ${r.status} from ${url}`);
    } catch (err) {
      lastErr = err;
      const status = err && err.response && err.response.status;
      if (status === 404) {
        console.warn(`External quote endpoint returned 404 for ${url}, trying next candidate`);
        continue;
      }
      console.error(`External fetch error for ${url}:`, err.message || err);
      // Return builtin fallback instead of failing
      return res.json(getBuiltinQuote());
    }
  }

  console.error('External quote fetch failed for all candidates', lastErr && (lastErr.message || lastErr));
  // Return a built-in fallback quote so the frontend always has something to display
  return res.json(getBuiltinQuote());
});

// GET random quote (explicit path). This route prioritizes calling the `/quote` path
// on the configured MOTIVATIONAL_API_URL (example: https://nodejs-quoteapp.herokuapp.com/quote)
router.get('/random', async (req, res) => {
  const externalBase = process.env.MOTIVATIONAL_API_URL || 'https://api.quotable.io';
  const key = process.env.MOTIVATIONAL_API_KEY;
  const keyHeader = process.env.MOTIVATIONAL_API_KEY_HEADER || 'Authorization';
  const headers = {};
  if (key) headers[keyHeader] = key;

  function joinUrl(base, path) {
    if (!path) return base;
    if (base.endsWith('/') && path.startsWith('/')) return base + path.slice(1);
    if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path;
    return base + path;
  }

  const primary = joinUrl(externalBase, 'quote');
  try {
    const r = await axios.get(primary, { headers });
    if (r && r.status >= 200 && r.status < 300) {
      const data = r.data || {};
      const content = data.quote || data.content || data.q || '';
      const author = data.author || data.person || '';
      console.log(`External quote fetched from ${primary}`);
      return res.json({ ok: true, content, author, raw: r.data, fetchedFrom: primary });
    }
  } catch (err) {
    const status = err && err.response && err.response.status;
    if (status === 404) {
      console.warn(`/quote returned 404 at ${primary}, falling back to other candidates`);
    } else {
      console.warn(`Error fetching /quote at ${primary}:`, err.message || err);
    }
  }

  // Fallback: reuse the external candidate logic by trying several common endpoints
  // Build candidate list similar to /external route
  const candidates = [
    externalBase,
    joinUrl(externalBase, 'random'),
    joinUrl(externalBase, 'quote'),
    joinUrl(externalBase, 'api/quote'),
    joinUrl(externalBase, 'api/random'),
    joinUrl(externalBase, 'quotes/random'),
    joinUrl(externalBase, 'quote/random')
  ];

  let lastErr = null;
  for (const url of candidates) {
    try {
      const r = await axios.get(url, { headers });
      if (r && (r.status >= 200 && r.status < 300)) {
        let content = '';
        let author = '';
        if (r.data) {
          if (typeof r.data === 'string') {
            content = r.data;
          } else if (Array.isArray(r.data) && r.data.length > 0) {
            const item = r.data[0];
            content = item.content || item.quote || item.text || item.message || JSON.stringify(item);
            author = item.author || item.person || '';
          } else if (typeof r.data === 'object') {
            content = r.data.content || r.data.quote || r.data.text || r.data.message || r.data.q || '';
            author = r.data.author || r.data.person || r.data.writer || r.data.a || '';
            if (!content) {
              for (const k of Object.keys(r.data)) {
                if (typeof r.data[k] === 'string' && r.data[k].length > 10) { content = r.data[k]; break }
              }
            }
            if (!content) content = JSON.stringify(r.data);
          }
        }
        console.log(`External quote fetched from ${url}`);
        return res.json({ ok: true, content, author, raw: r.data, fetchedFrom: url });
      }
      lastErr = new Error(`Status ${r.status} from ${url}`);
    } catch (err) {
      lastErr = err;
      const status = err && err.response && err.response.status;
      if (status === 404) {
        console.warn(`External quote endpoint returned 404 for ${url}, trying next candidate`);
        continue;
      }
      console.error(`External fetch error for ${url}:`, err.message || err);
      // Return builtin fallback instead of failing
      return res.json(getBuiltinQuote());
    }
  }

  console.error('External quote fetch failed for all candidates', lastErr && (lastErr.message || lastErr));
  // Return a built-in fallback quote when external fetches fail
  return res.json(getBuiltinQuote());
});

module.exports = router;
