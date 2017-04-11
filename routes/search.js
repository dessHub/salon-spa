module.exports = {
  index : (req, res)=> {
      res.render('search/pages/index',{
      });
  },
  
  single : (req, res)=> {
      res.render('search/pages/single',{
      });
  },

  service : (req, res)=> {
      res.render('search/pages/services',{
      });
  },

  hair : (req, res)=> {
      res.render('search/pages/trends',{
      });
  },

  offer : (req, res)=> {
      res.render('search/pages/offers',{
      });
  },

  appointment : (req, res)=> {
      res.render('search/pages/appointment',{
      });
  }

};