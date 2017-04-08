module.exports = {
  index : function(req, res){
      res.render('dashboard/salons/index');
  },

  admin : function(req, res){
      res.render('dashboard/salons/admin');
  },

  service: function(req, res){
      res.render('dashboard/salons/service');
  },

  product: function(req, res){
      res.render('dashboard/salons/product');
  },

  style: function(req, res){
      res.render('dashboard/salons/style');
  },

  edit : function(req, res){
      res.render('dashboard/salons/edit');
  },

  news : function(req, res){
      res.render('dashboard/salons/news');
  },
  
  profile : function(req, res){
      res.render('dashboard/salons/profile');
}
};