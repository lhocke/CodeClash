var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: 'Invalid username or password.'
  }));

  app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });



  // RM: I need to work out the route
  app.get('/api/profile/:id', function (req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      var hbsObject = {
        user: dbUser[0]
      };
      console.log('GET: api/profile/:id', hbsObject);
      res.json(dbUser);
      // res.render('profile', hbsObject);
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

  app.get('/api/questions', function (req, res) {
    db.Question.findAll({
    }).then(function(dbQuestion) {
      res.json(dbQuestion)
    });
  });

  app.get('/questions/:id', function (req, res) {
    db.Question.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });


};
