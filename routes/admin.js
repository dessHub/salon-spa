module.exports = {
  index : (req, res)=>{
      res.render('dashboard/admin/index');
  },

  service: (req, res)=> {
      res.render('dashboard/admin/services');
  },

  adservice: (req, res)=> {
      res.render('dashboard/admin/addservice');
  },

  product: (req, res)=> {
      res.render('dashboard/admin/products');
    },

  adproduct: (req, res)=> {
      res.render('dashboard/admin/addproduct');
  },

  news : (req, res)=> {
      res.render('dashboard/admin/news');
  },

  adnews: (req, res)=> {
      res.render('dashboard/admin/addnews');
  },

  salon : (req, res)=> {
      res.render('dashboard/admin/salons');
  },

  adsalon: (req, res)=> {
      res.render('dashboard/admin/addsalon');
  }
};