module.exports = {
  index : function(req, res){
      res.render('dashboard/user',{
      });
  },

  signup : function(req, res){
      res.render('signup',{
      });
  },

  profile : function(req, res){
      res.render('dashboard/user/profile',{
      });
  }

};
