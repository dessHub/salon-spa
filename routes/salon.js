module.exports = {
  index : function(req, res){
      res.render('dashboard/salons/index');
  },

  admin : function(req, res){
      res.render('dashboard/salons/admin');
  },

  service: function(req, res){
      res.render('dashboard/salons/salonservices');
  },

  newservice: function(req,res){
     res.render('dashboard/salons/service');
  },

  product: function(req, res){
      res.render('dashboard/salons/salonproducts');
  },

  newproduct: function(req,res){
     res.render('dashboard/salons/product');
  },

  style: function(req, res){
      res.render('dashboard/salons/salonstyles');
  },

  newstyle: function(req,res){
     res.render('dashboard/salons/style');
  },

  news : function(req, res){
      res.render('dashboard/salons/salonnews');
  },
  
  newnews: function(req,res){
     res.render('dashboard/salons/news');
  },
  profile : function(req, res){
      res.render('dashboard/salons/profile');
}
};