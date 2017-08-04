var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var flash = require('connect-flash'); //needed?
var session = require('express-session');
var GoogleAuth = require('google-auth-library');




//cookies is needed to remember that users are logged in. Reads cookies
var cookieParser = require("cookie-parser");
//telling server start using cookie parser

//secret key helps us decrypt the hash passport

var passport = require('passport');
var env = require('dotenv').load();

var PORT = process.env.PORT || 7500;

var app = express();

var db = require("./models");
// var User = require('./models/index').User;
var authRoute = require('./routes/html-routes.js')(app); //check path (different from tutorial)

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.text());
//extended: false uses queryString library & extended: true uses qs library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// For Passport
app.use(session({ secret: 'keyboard cat' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static("public"));

app.use(cookieParser());

// app.engine("handlebars", exphbs({ defaultLayout: "main"}));
// app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app, passport);
require("./routes/html-routes.js")(app, passport);
//load passport strategies
require('./config/passport.js')(passport, db.User);

require('./config/auth.js');

// require("./config/passport") //ADD BACK AND REMOVE ABOVE PER MARIAM'S WORK

// change force to false if we want to keep the model/table or this will drop it.
// change force to true to drop the model/table if it exists
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
