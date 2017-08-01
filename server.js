var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var PORT = process.env.PORT || 7500;

var app = express();

var db = require("./models");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require('./routes/control.js');

app.use('/', routes);

db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});