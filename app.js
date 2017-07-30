const express  = require('express'),
      passport = require('./passport/passport').passport,
      path     = require('path'),
      session  = require('express-session'),
      config   = require('./config');
      cp       = require('cookie-parser');

const indexRoutes = require('./routes/index'),
      authRoutes  = require('./routes/auth');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

app.use(cp(config.EXPRESS_SECRET));
app.use(session({
    secret: config.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/auth/facebook', authRoutes);

app.listen(8000, function () {
    console.log('Server has started');
});