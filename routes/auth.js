const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/forgot', controller.forgot);
router.post('/reset', controller.reset);

// Returns the authenticated user
router.get('/me', auth, controller.me);

module.exports = router;
