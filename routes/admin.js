module.exports = {
  index : function(req, res){
      res.render('dashboard/admin');
  },

  service: function(req, res){
      res.render('dashboard/admin/service');
  },

  product: function(req, res){
      res.render('dashboard/admin/product');
    },
  news : function(req, res){
      res.render('dashboard/admin/news');
  },
  salon : function(req, res){
      res.render('dashboard/admin/salon');
  }
};