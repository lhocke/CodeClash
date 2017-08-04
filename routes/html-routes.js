var path = require('path');

module.exports = function(app, passport) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/signin.html'));
    });

    app.get('/signin', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/signin.html'));
    });
    
    app.get('/arena', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/mirror.html'));
    });

    app.get('/profile', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/profile.html'));
    });

    app.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/signup.html'));
    });

    app.get('/logout', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/logout.html'));
    });
};