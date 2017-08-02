var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 7500;

var app = express();

var db = require("./models");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get('/', function (req, res) {
    res.render('profile', {layout: 'profile-layout'}); //change this to main or any page you need to start for testing
});
// app.use(express.static("public"));

var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);

// change force to false if we want to keep the model/table or this will drop it.
// change force to true to drop the model/table if it exists
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});