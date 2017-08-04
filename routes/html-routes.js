var path = require('path');

module.exports = function(app, passport) {
    // app.get('/', function (req, res, next) {
    //     res.render('signin', {layout: 'signin-layout'});
    // });
    app.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, "../public/signin.html"));
    })
    app.get('/arena', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../public/mirror.html'));
    });

    app.get('/profile', isLoggedIn, function(req, res, next) {
        // res.render('profile', {layout: 'profile-layout'});
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get('/signup', function(req, res, next) {
        // res.render('signup', {layout: 'signup-layout'});
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get('/signin', function(req, res, next) {
        // res.render('signin', {layout: 'signin-layout'});
        res.sendFile(path.join(__dirname, "../public/signin.html"));
    });

    app.get('/logout', function(req, res) {
        res.render('logout');
    });

    function isLoggedIn(req, res, next) {
     
        if (req.isAuthenticated())
         
            return next();
             
        res.redirect('/signin');
 
    };
};