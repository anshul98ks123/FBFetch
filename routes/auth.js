const express    = require("express"),
      router     = express.Router(),
      passport   = require('../passport/passport').passport;

// LOGIN ROUTES
router.get('/',
    passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/posts'
}));

// LOGOUT ROUTE
router.get('/logout', (req,res) => {
    req.user = null;
    req.logout();
    res.redirect('/');
});

module.exports = router;