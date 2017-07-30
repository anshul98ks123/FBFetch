const express    = require("express"),
      router     = express.Router(),
      db         = require('../db/database'),
      FB         = require('../passport/passport').FB;

router.get('/', (req,res) => {
    if(req.user){
        res.locals.currentUser = req.user;
    }
    res.render('index');
});

router.get('/posts', isLoggedIn, (req,response) => {
    FB.api('/126976547314225/posts', {
        "fields":"shares,likes,message,created_time,story",
        "limit": 24
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return response.render('index');
        }
        db.storeAnsFetchPosts(res.data).then(function (posts) {
            response.locals.currentUser = req.user;
            response.render('posts', {posts: posts});
        }).catch(function (err) {
            console.log('ERR - '+ err);
            response.render('index');
        });
    });
});

function isLoggedIn(req,res,next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;