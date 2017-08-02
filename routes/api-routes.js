var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // RM: I need to work out the route
  app.get('/profile/:id', function (req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      var hbsObject = {
        user: dbUser
      };
      console.log('from get', hbsObject);
      // RM: I need to check the below line syntax/structure
      res.render('profile', {layout: 'profile-layout'}, hbsObject);
    });
  });

  app.post("/profile/:id", function(req, res) {
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

  app.get('/arena/:id', function (req, res) {


  });

  app.get('/arena/:id', function (req, res) {


  });


};
