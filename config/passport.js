const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const User             = require('../models/user');

module.exports       = (passport) =>{
  passport.serializeUser((user, done)=> {
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
      if(err) done(err);
      done(null, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  (req, email, password, done)=>{
    User.findOne({ "email": email }, (err, user)=>{
      if (err) return done(err);

      if (!user) {
          console.log("can't find user with email ", email); 
          return done(null, false, req.flash('message', ' No user has been found'));
      }
      User.comparePassword(password, user.password, (err, isMatch)=>{
        if(err) throw(err);

        if (isMatch) {
          return done(null, user);
        }else{
          return done(null, false, req.flash('message', 'Oops! wrong password'));
        }
      });
    });
  }));
}

