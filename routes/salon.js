module.exports = {
  index : function(req, res){
      res.render('dashboard/salons/index');
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

  appointment : function(req, res){
      res.render('dashboard/salons/appointment');
  },

  news : function(req, res){
      res.render('dashboard/salons/news');
  },
  
  profile : function(req, res){
      res.render('dashboard/salons/profile');
}
};