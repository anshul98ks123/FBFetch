const express    = require("express"),
      router     = express.Router(),
      db         = require('../db/database'),
      FB         = require('../passport/passport').FB;

// ROUTE FOR HOME PAGE
router.get('/', (req,res) => {
    if(req.user){
        res.locals.currentUser = req.user;
    }
    res.render('index');
});

// ROUTE FOR POSTS PAGE
router.get('/posts', isLoggedIn, (req,response) => {
    // It uses FB api module of node.js
    // it makes a get request to fb api to get all posts
    FB.api('/126976547314225/posts', {
        // these fields are requested via the api
        "fields":"shares,likes,message,created_time,story",
        "limit": 24
    }, function (res) {
        // if there is any error
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return response.render('index');
        }
        // if not, then
        // it stores the data fetched from fb api in database
        // and fetches the posts from the db
        db.storeAnsFetchPosts(res.data).then(function (posts) {
            response.locals.currentUser = req.user;
            response.render('posts', {posts: posts});
        }).catch(function (err) {
            console.log('ERR - '+ err);
            response.render('index');
        });
    });
});

// middleware to check whether a user is logged in or not
function isLoggedIn(req,res,next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;