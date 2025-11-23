const express = require('express');
const router = express.Router();
const controller = require('../controllers/journalController');
const auth = require('../middleware/auth');

// All journal routes require authentication — entries are per-user
// Single entry (must come before the list route to avoid matching '/')
router.get('/:id', auth, controller.get);
router.get('/', auth, controller.list);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
