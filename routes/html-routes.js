var path = require('path');

module.exports = function(app, passport) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
        // res.render('signin', {layout: 'signin-layout'});
    });
    
    app.get('/arena', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/mirror.html'));
    });

    app.get('/profile', function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect("/profile");
        } 
        else {
            res.redirect("/");
        }
        // res.render('profile', {layout: 'profile-layout'});
        
    });

    app.get('/signup', function(req, res) {
        // res.render('signup', {layout: 'signup-layout'});
        res.sendFile(path.join(__dirname, '../public/signup.html'));
    });

    // app.get('/signin', function(req, res) {
    //     // res.render('signin', {layout: 'signin-layout'});
    //     res.sendFile(path.join(__dirname, '../public/index.html'));
    // });

    app.get('/logout', function(req, res) {
        // res.render('logout');
        res.sendFile(path.join(__dirname, '../public/logout.html'));
    });
    // function isLoggedIn(req, res, next) {
 
    // if (req.isAuthenticated())
     
    //     return next();
         
    // res.redirect('/');
 
    // };

};