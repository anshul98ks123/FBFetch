const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const FB = require('fb');
const config = require('../config');

passport.use(new facebookStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ['id', 'name'],
    passReqToCallback: true
}, function (req, authToken, refreshToken, profile, cb) {
    FB.setAccessToken(authToken);
    return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = {
    passport, FB
};
