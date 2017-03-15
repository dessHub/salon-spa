module.exports = {
  index : function(req, res){
      res.render('dashboard/user',{
      });
  },

  signup : function(req, res){
      res.render('signup',{
      });
  },

  users : function(req, res){
      res.render('users',{
      });
  }

};
