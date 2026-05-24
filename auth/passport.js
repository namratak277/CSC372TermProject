require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/userModel');

const GOOGLE_CLIENT_ID = process.env.clientID || process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.clientSecret || process.env.GOOGLE_CLIENT_SECRET;
let GOOGLE_CALLBACK_URL = process.env.callbackURL || process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback';

if (GOOGLE_CALLBACK_URL && GOOGLE_CALLBACK_URL.startsWith('/')) {
  const backendBase = process.env.BACKEND_URL || process.env.BASE_URL || (`http://localhost:${process.env.PORT || 4000}`);
  GOOGLE_CALLBACK_URL = backendBase.replace(/\/$/, '') + GOOGLE_CALLBACK_URL;
}

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const googleId = profile.id;
      let user = await Users.getUserByGoogleId(googleId);
      
      if (!user) {
        const displayName = profile.displayName || '';
        const firstName = (profile.name && profile.name.givenName) || '';
        const lastName = (profile.name && profile.name.familyName) || '';
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || null;
        let username = displayName.replace(/\s+/g, '_').toLowerCase() || `user_${googleId}`;
        
        user = await Users.createNewUser({ 
          googleId, 
          displayName, 
          firstName, 
          lastName, 
          email,
          username: username
        });
      }
      return done(null, user);
    } catch (err) {
      console.error('Google OAuth strategy error:', err);
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.getUserById(id);
      done(null, user);
    } catch (err) {
      console.error('Error deserializing user:', err);
      done(err);
    }
  });

  passport.googleConfigured = true;
} else {
  passport.googleConfigured = false;
}

if (passport.googleConfigured) {
  console.log('✅ Google OAuth: CONFIGURED');
  console.log('   Callback URL:', GOOGLE_CALLBACK_URL);
} else {
  console.warn('⚠️  Google OAuth: NOT CONFIGURED');
  console.warn('   To enable Google sign-in, set these environment variables:');
  console.warn('   - GOOGLE_CLIENT_ID (or clientID)');
  console.warn('   - GOOGLE_CLIENT_SECRET (or clientSecret)');
  console.warn('   - GOOGLE_CALLBACK_URL (optional, defaults to http://localhost:4000/api/auth/google/callback)');
}

module.exports = passport;