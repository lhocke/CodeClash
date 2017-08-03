var path = require('path');
var authController = require('./authcontroller.js');
var passport = require('passport'); //passport check

module.exports = function(app) {
    app.get("/", function (req,res) {
       res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/arena", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/mirror.html"));
    });

    app.get("/profile", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }));
};