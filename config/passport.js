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

//possible reference below

// const db = require('./../models/');
// var bCrypt = require('bcrypt-nodejs');
// // var flash = require('connect-flash');


// module.exports = function(passport) {

//     var User = db.User;
//     var LocalStrategy = require('passport-local').Strategy;

//     passport.use('local-signup', new LocalStrategy(

//         {
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true
//         },
//         function(req, email, password, done) {
//           var generateHash = function(password) {
//             return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//           };

//             User.findOne({
//                 where: {
//                     email: email
//                 }
//             }).then(function(user) {
//                 if (user) {
//                   return done(null, false, {message: req.flash('email already taken')});
//                   console.log('mail already taken');
//                 }
//                 else {
//                     var pass = generateHash(password);

//                     var data =

//                         {
//                             firstname: firstname,
//                             lastname: lastname,
//                             username: req.body.username,
//                             email: email,
//                             password: pass,
//                             // public_key: '0',
//                             last_login: null

//                         };

//                     User.create(data).then(function(newUser, created) {

//                         if (!newUser) {

//                             return done(null, false);

//                         }

//                         if (newUser) {
//                             return done(null, newUser, {message: req.flash('tappost')});
//                         }
//                     });
//                 }
//             }).catch(function(err) {
//               console.log(err);
//             });
//         }
//     ));
//     passport.serializeUser(function(user, done) {
//             done(null, user.id);
//         });

//         passport.deserializeUser(function(id, done) {
//             User.findById(id).then(function(user){
//                 done(null, user);
//             }).catch(function(e){
//                 done(e, false);
//             });
//         });
// }