const User          = require('../models/user');
const Role          = require('../models/role');
const passport      = require('passport');

module.exports    = {
  new : (req, res)=>{
    const message=req.flash('message');
    console.log(message);
    const errors='';
    res.render('register', {
        errors:errors,
        message : req.flash('message'),
        title   : "Sign Up",
    });
  },

  create : (req, res)=>{
      /*req.checkBody('email','Email is required').notEmpty();
      req.checkBody('phone','Phone Number is required').notEmpty();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password2','Please you need to confirm your password').notEmpty();
      req.checkBody('password2', 'The passwords do not match').equals(req.body.password);
      req.checkBody('email','Email is invalid').isEmail();*/

      const errors = req.validationErrors();
      if(errors){
       res.render('register',{
          errors:errors,
          title:'Sign up',
          message: req.flash('signupMess')
        });
      }

      
      const user      = new User();
      user.fname    = req.body.fname;
      user.lname    = req.body.lname;
      user.email    = req.body.email;
      user.phone    = req.body.phone;
      user.username = req.body.username;
      user.password = req.body.password;
      user.role     = req.body.role;

      User.findOne({username: req.body.username},(err, foundUser, done)=>{
        const message = 'That Username is already taken';
        const errors  = '';
        if(err) throw err;

        if(foundUser){
          req.flash('message', 'Username already exists ');
          console.log(req.flash('message'));
          return res.redirect('/register');
        } else {
          console.log('You have no register errors');
          User.createUser(user,(err, user)=>{
            if (err) throw err;
               //res.redirect('/find');
            req.login(user,(err)=>{
              if (!err){
                console.log(user);

                if(req.user.role == 'customer' ){
                  res.redirect('/find');

                }if(req.user.role == 'cosmeticuser' ){
                  res.redirect('/cosmeticindex');


                }else if(req.user.role == 'salonuser'){
                  res.redirect('/salonindex');

                }

                 
              } else{
                console.log("There was an error i", err);
              }
            });
          });
        }
      });
  }
 }
