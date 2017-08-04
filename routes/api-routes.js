var db = require("../models");
var passport = require('passport');
var path = require('path');
var bcrypt = require("bcrypt");

//Turning it into a hashbrown and putting salt on it
//salt adds an extra layer of crypting
var saltRounds = 10;

// Routes
// =============================================================
module.exports = function(app, passport) {

  app.post("/",
    passport.authenticate('local', { 
        successRedirect: '/profile',
        failureRedirect: '/',
        // failureFlash: true 
    })
  );

  app.get('/api/profile/:id', function (req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      console.log(dbUser)
      console.log('GET: /profile/:id', dbUser[0]);
      res.json(dbUser);
    });
  });

  app.post("/api/profile/:id", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      console.log('dbUser post', dbUser)
      // var hbsObject = {
      //   burger: dbBurger
      // };
      res.json(dbUser);
      // res.render("index", hbsObject)
    });
  });

  // app.put("/api/profile/:id", function(req, res) {
  //   db.User.update(
  //     req.body.
  //     )
  // })

  app.get('/api/questions', function (req, res) {
    db.Question.findAll({
    }).then(function(dbQuestion) {
      res.json(dbQuestion)
    });
  });

  app.get('/api/questions/:id', function (req, res) {
    db.Question.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });
};
