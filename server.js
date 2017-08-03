var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var flash = require('connect-flash'); //needed?
var session = require('express-session');
var passport = require('passport');
var env = require('dotenv').load();

var PORT = process.env.PORT || 7500;

var app = express();

var db = require("./models");
var authRoute = require('./routes/html-routes.js')(app); //check path (different from tutorial)

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.text());
//extended: false uses queryString library & extended: true uses qs library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// For Passport
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized:true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
// FOR HANDLEBARS PER TUTORIAL
// app.set('views', './views')
// app.engine('handlebars', exphbs({
//     extname: '.handlebars'
// }));
// app.set('view engine', '.handlebars');

require("./routes/api-routes.js")(app, passport);
require("./routes/html-routes.js")(app);
//load passport strategies
require('./config/passport/passport.js')(passport);

// change force to false if we want to keep the model/table or this will drop it.
// change force to true to drop the model/table if it exists
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});