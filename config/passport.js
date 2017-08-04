var passport = require('passport');
var db = require("../models");
var LocalStrategy = require('passport-local').Strategy;

//checking if user exists & if passport correct
//local login using usernam and passsword to determine 
// Login form, we named the username field "username" and we didn't have to do any further config
// because passports looks for that name specifically.  
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({where: {username:username}}).then(function (user, err) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//serialize creates an encrypted cookie 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
//decrypts the cookie
passport.deserializeUser(function(id, done) {
  db.users.findById(id).then(function(user, err) {
    done(err, user);
  });
});