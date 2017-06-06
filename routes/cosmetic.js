const Cosmetic     = require('../models/cosmetic');
const Order     = require('../models/order');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {
profile: (req, res)=> {
  Cosmetic.find({user:req.params.user},(err,cosmetic)=>{
   if(err) res.send(err);
   if (cosmetic){
  Order.find({},(err,order)=>{
   if(err) res.send(err);
   res.render('dashboard/cosmetics/index', {
    cosmetic : cosmetic,
    order : order
   });
  });
}
});
  },

 //salon routes

index: (req, res)=> {
    Cosmetic.find({},(err,cosmetic)=>{
      if(err) res.send(err);
      res.render('dashboard/cosmetics/profile', {
         cosmetic:cosmetic
      });
    });
  },

postcosmetic: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/cosmetic' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const cosmetic = new Cosmetic();
       cosmetic.name = req.body.name;
       cosmetic.user = req.user.id;
       cosmetic.location = req.body.location;
       cosmetic.contact =req.body.contact;
       cosmetic.hours =req.body.hours;
       cosmetic.description = req.body.description;
       cosmetic.img = target_path;
        
       cosmetic.save((err,cosmetic)=>{
        if(err) return (err);
          
          
        console.log(cosmetic)
        res.redirect('/cosmeticprofile');
      });

  },

  editcosmetic: (req, res)=>{
    Cosmetic.findOne({ _id : req.params.id },(err, cosmetic)=>{
      if(err) return err;
      res.render('dashboard/salons/editsalon', {
          title      : "update",
          cosmetic   : cosmetic
      });
    });  
  },

  updatecosmetic: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const name = req.body.name;
       const location = req.body.location;
       const description = req.body.description;
       const contact = req.body.contact;
       const hours = req.body.hours;
       const salon = new Salon();
        cosmetic._id =  req.params.id;
        cosmetic.update({name:name,location:location,contact:contact,description:description,hours}, (err, cosmetic)=>{
          if(err) return next(err);
          console.log(cosmetic)
          res.redirect('/cosmetic');
        });
      //});
     }

};