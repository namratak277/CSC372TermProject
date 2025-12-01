const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const auth = require('../auth');
const passport = require('../auth/passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const FRONTEND_BASE = process.env.FRONTEND_URL || 'http://localhost:3000';

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/forgot', controller.forgot);
router.post('/reset', controller.reset);

// Returns the authenticated user
router.get('/me', auth, controller.me);

// Google OAuth start
router.get('/google', (req, res, next) => {
		// If passport not configured or Google strategy missing, return 501
		const googleReady = passport && (passport.googleConfigured || (passport._strategies && passport._strategies.google));
		if (!googleReady) return res.status(501).json({ error: 'OAuth not configured' });

		// Build the Google OAuth URL explicitly to ensure `scope` is always present
		try {
			const clientId = process.env.clientID || process.env.GOOGLE_CLIENT_ID;
			if (!clientId) {
				console.error('Google OAuth start attempted but client ID is missing');
				return res.status(500).json({ error: 'Google client ID not configured on server' });
			}
			const callbackPath = process.env.callbackURL || process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback';
			const backendBase = process.env.BACKEND_URL || process.env.BASE_URL || (`http://localhost:${process.env.PORT || 4000}`);
			const redirectUri = callbackPath.startsWith('/') ? backendBase.replace(/\/$/, '') + callbackPath : callbackPath;
			const params = new URLSearchParams({
				client_id: clientId,
				redirect_uri: redirectUri,
				response_type: 'code',
				scope: 'profile email',
				access_type: 'online',
				include_granted_scopes: 'true',
				prompt: 'select_account'
			});
			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
			if (process.env.NODE_ENV !== 'production') {
				console.log('Redirecting to Google OAuth URL:', authUrl);
			}
			return res.redirect(authUrl);
		} catch (err) {
			console.error('Failed to build Google auth URL', err);
			return res.status(500).json({ error: 'Failed to start OAuth' });
		}
});

// Google OAuth callback
router.get('/google/callback', (req, res, next) => {
	const googleReady = passport && (passport.googleConfigured || (passport._strategies && passport._strategies.google));
	if (!googleReady) return res.status(501).json({ error: 'OAuth not configured' });
	passport.authenticate('google', { failureRedirect: `${FRONTEND_BASE}/login`, session: true }, (err, user) => {
		if (err || !user) {
			console.error('Google auth failed', err);
			return res.redirect(`${FRONTEND_BASE}/login?error=oauth`);
		}
		// create a JWT so the frontend can use API endpoints
		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
		// redirect to frontend with token in query (frontend will store it)
		const redirectUrl = `${FRONTEND_BASE}/?token=${encodeURIComponent(token)}&username=${encodeURIComponent(user.username || user.display_name || '')}`;
		return res.redirect(redirectUrl);
	})(req, res, next);
});

// Dev debug route to report OAuth configuration status
router.get('/debug', (req, res) => {
	if (process.env.NODE_ENV === 'production') return res.status(404).json({ error: 'Not found' });
	const googleReady = !!(passport && (passport.googleConfigured || (passport._strategies && passport._strategies.google)));
	const clientID = !!(process.env.clientID || process.env.GOOGLE_CLIENT_ID);
	const clientSecret = !!(process.env.clientSecret || process.env.GOOGLE_CLIENT_SECRET);
	const callback = process.env.callbackURL || process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback';
	res.json({ googleReady, clientID, clientSecret, callback });
});

// Dev helper: return the constructed Google auth URL (so you can copy redirect_uri easily)
router.get('/google/url', (req, res) => {
	if (process.env.NODE_ENV === 'production') return res.status(404).json({ error: 'Not found' });
	const googleReady = passport && (passport.googleConfigured || (passport._strategies && passport._strategies.google));
	const clientId = process.env.clientID || process.env.GOOGLE_CLIENT_ID;
	const callbackPath = process.env.callbackURL || process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback';
	const backendBase = process.env.BACKEND_URL || process.env.BASE_URL || (`http://localhost:${process.env.PORT || 4000}`);
	const redirectUri = callbackPath.startsWith('/') ? backendBase.replace(/\/$/, '') + callbackPath : callbackPath;
	const params = new URLSearchParams({
		client_id: clientId || '',
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: 'profile email',
		access_type: 'online',
		include_granted_scopes: 'true',
		prompt: 'select_account'
	});
	const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
	res.json({ googleReady: !!googleReady, clientIdPresent: !!clientId, redirectUri, authUrl });
});

module.exports = router;
