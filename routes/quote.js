const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const r = await axios.get('https://api.quotable.io/random');
    res.json({ ok: true, quote: r.data.content, author: r.data.author });
  } catch (err) {
    res.status(502).json({ ok: false, error: 'Failed to fetch quote' });
  }
});

module.exports = router;
