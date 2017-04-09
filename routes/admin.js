module.exports = {
  index : function(req, res){
      res.render('dashboard/admin/index');
  },

  service: function(req, res){
      res.render('dashboard/admin/services');
  },

  adservice: function(req, res){
      res.render('dashboard/admin/addservice');
  },

  product: function(req, res){
      res.render('dashboard/admin/products');
    },

  adproduct: function(req, res){
      res.render('dashboard/admin/addproduct');
  },

  news : function(req, res){
      res.render('dashboard/admin/news');
  },

  adnews: function(req, res){
      res.render('dashboard/admin/addnews');
  },

  salon : function(req, res){
      res.render('dashboard/admin/salons');
  },

  adsalon: function(req, res){
      res.render('dashboard/admin/addsalon');
  }
};