module.exports = {
  index : function(req, res){
      res.render('search/pages/index',{
      });
  },
  
  single : function(req, res){
      res.render('search/pages/single',{
      });
  },

  service : function(req, res){
      res.render('search/pages/services',{
      });
  },

  hair : function(req, res){
      res.render('search/pages/trends',{
      });
  },

  offer : function(req, res){
      res.render('search/pages/offers',{
      });
  }

};