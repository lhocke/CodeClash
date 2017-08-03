var path = require('path');

module.exports = function(app, passport) {
    app.get('/', function (req, res, next) {
        res.render('signin', {layout: 'signin-layout'});
    });
    
    app.get('/arena', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../public/mirror.html'));
    });

    app.get('/profile', isLoggedIn, function(req, res, next) {
        res.render('profile', {layout: 'profile-layout'});
    });

    app.get('/signup', function(req, res, next) {
        res.render('signup', {layout: 'signup-layout'});
    });

    app.get('/signin', function(req, res, next) {
        res.render('signin', {layout: 'signin-layout'});
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