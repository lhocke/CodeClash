var db = require("../models");
var passport = require('passport'); //passport check
var path = require('path');
// Routes
// =============================================================
module.exports = function(app, passport) {

  // app.post('/login',
  // passport.authenticate('local', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/',
  //   failureFlash: 'Invalid username or password.'
  // }));

  // app.get('/api/users/me',
  // passport.authenticate('basic', { session: false }),
  // function(req, res) {
  //   res.json({ id: req.user.id, username: req.user.username });
  // });

  // RM: I need to work out the route
  app.get('/profile/:id', function (req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      var hbsObject = {
        user: dbUser[0]
      };
      console.log('GET: api/profile/:id', hbsObject);
      // res.json(dbUser);
      res.render('profile', hbsObject);
    });
  });

  app.post("/api/profile/:id", function(req, res) {
    // db.Burger.create(req.body).then(function(dbBurger) {
    //   console.log('dbBurger post', dbBurger)
    //   console.log('dbBurger sections', Object.keys(dbBurger.dataValues.burger_name))
    //   var hbsObject = {
    //     burger: dbBurger
    //   };
    //   console.log('from post', hbsObject);
    //   res.render("index", hbsObject)
    // });
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

  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/profile',
      failureRedirect: '/signin'
  }));

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup'
  }));

};
