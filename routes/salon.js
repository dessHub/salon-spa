module.exports = {
  index : (req, res)=> {
      res.render('dashboard/salons/index');
  },

  admin : (req, res)=> {
      res.render('dashboard/salons/admin');
  },

  service: (req, res)=> {
      res.render('dashboard/salons/salonservices');
  },

  newservice: (req,res)=> {
     res.render('dashboard/salons/service');
  },

  product: (req, res)=> {
      res.render('dashboard/salons/salonproducts');
  },

  newproduct: (req,res)=> {
     res.render('dashboard/salons/product');
  },

  style: (req, res)=> {
      res.render('dashboard/salons/salonstyles');
  },

  newstyle: (req,res)=> {
     res.render('dashboard/salons/style');
  },

  news : (req, res)=> {
      res.render('dashboard/salons/salonnews');
  },
  
  newnews: (req,res)=> {
     res.render('dashboard/salons/news');
  },
  profile : (req, res)=> {
      res.render('dashboard/salons/profile');
}
};