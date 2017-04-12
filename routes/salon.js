const Service     = require('../models/service');



module.exports = {
  index : (req, res)=> {
   res.render('dashboard/salons/index');
  },

 service: (req,res)=> {
    Service.find({},(err,service)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/salonservices', {
         service:service
      });
    });
  },
  
  newservice: (req, res)=> {
    const newservice = new Service();
    newservice.title = req.body.title;
    newservice.description = req.body.description;
    //newservice.img.data = fs.readFileSync(req.files.userPhoto.path)
    //newservice.img.contentType - '';

    newservice.save((err,service)=>{
      if(err)res.send(err);
      console.log(service)
      res.redirect('/service');
    });
      
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