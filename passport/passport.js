const passport         = require('passport'),
      facebookStrategy = require('passport-facebook').Strategy,
      FB               = require('fb'),
      config           = require('../config');

// Configures facebook strategy provided by passport
// It uses the FB App credentials to use passport strategy
passport.use(new facebookStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ['id', 'name'],
    passReqToCallback: true
}, function (req, authToken, refreshToken, profile, cb) {
    // once user has logged in , it saves the Access Token in FB Object
    FB.setAccessToken(authToken);
    return cb(null, profile);
}));

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.

// It supplies the user iD when serializing
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

// It queries the user record by iD when deserealizing
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = {
    passport, FB
};
