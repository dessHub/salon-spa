module.exports = {
  index : function(req, res){
      res.render('dashboard/salons/index');
  },

  new : function(req, res){
      res.render('dashboard/salons/new');
  },

  edit : function(req, res){
      res.render('dashboard/salons/edit');
  },

  profile : function(req, res){
      res.render('dashboard/salons/profile');
}
};