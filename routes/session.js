//const passport   =  require('../config/passport');
const passport   =  require('passport');

module.exports =  {
  new : (req, res)=>{
    res.render('login', {
        message: req.flash('loginMessage'),
        title: "Login Page",
        errors: ""
    });
  },

  create : (req, res, next)=>{
    passport.authenticate('login', (err, user)=>{
      if (err) return next(err);
      if (!user) {
        console.log('user not found');
        return res.redirect('/login');
      }
      req.login(user, (err)=>{
        if (err) return next(err);
        /* 
         either redirect the user back to the resource he/she was trying to access
         or redirect to admin page after successful login, this means if i was trying 
         to access /insert and was instead redirected to /login because it is a protected
         route, then after i login, redirect me back to /insert not /admin as it was before 
         */
         req.flash('success', "Successfully logged in");
         console.log(req.user);
         if(req.user.role == 'customer'){
          console.log("login as normal user")
          res.redirect(req.session.returnTo || '/find');
          delete req.session.returnTo;
         }else if(req.user.role == 'salonuser'){
          console.log("login as admin user")
         res.redirect(req.session.returnTo || '/salonprofile');
         delete req.session.returnTo;
         }else if(req.user.role == 'admin'){
          console.log("login as admin user")
         res.redirect(req.session.returnTo || '/adminindex');
         delete req.session.returnTo;
         }else if(req.user.role == 'cosmeticuser'){
          console.log("login as admin user")
         res.redirect(req.session.returnTo || '/cosmeticprofile');
         delete req.session.returnTo;
       }else if(req.user.role == 'admin'){
          console.log("login as admin user")
         res.redirect(req.session.returnTo || '/adminindex');
         delete req.session.returnTo;
       }
      });
    })(req, res, next);
  },

  delete : (req, res)=>{
    req.logout();
    res.redirect('/');
    /* 
     since we're using friendly forwarding (see req.sessio.returnTo) when we 
     logout the (req.session.returnTo variable will still be around, 
    so we need to destroy it 
    */
   req.session.destroy();
  } 
};
