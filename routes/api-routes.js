var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    db.Burger.findAll({
      // include: [db.Post]
    }).then(function(dbBurger) {
      var hbsObject = {
        burger: dbBurger.dataValues
      };
      console.log('from get', hbsObject);
      
      // res.render("index", hbsObject)
    });
  });

  app.post("/", function(req, res) {
    db.Burger.create(req.body).then(function(dbBurger) {
      console.log('dbBurger post', dbBurger)
      console.log('dbBurger sections', Object.keys(dbBurger.dataValues.burger_name))
      var hbsObject = {
        burger: dbBurger
      };
      console.log('from post', hbsObject);
      res.render("index", hbsObject)
    });
  });
};
