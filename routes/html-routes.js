var path = require('path');

module.exports = function(app) {
    app.get('/', function (req, res, next) {
        res.render('signin', {layout: 'signin-layout'});
    });
    
    app.get('/arena', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../public/mirror.html'));
    });

    app.get('/profile', function(req, res, next) {
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
};