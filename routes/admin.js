const Salon     = require('../models/salon');
const Cosmetic     = require('../models/cosmetic');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {
  index : (req, res)=> {
  Salon.find({},(err,salon)=>{
   if(err) res.send(err);
   res.render('dashboard/admin/index', {
    salon : salon
   });
  });
  },

cosmetic: (req, res)=> {
  Cosmetic.find({},(err,cosmetic)=>{
   if(err) res.send(err);
   res.render('dashboard/admin/cosmetic', {
    cosmetic : cosmetic
   });
  });
  },

addsalon: (req, res)=> {
    Salon.find({},(err,salon)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/salon', {
         salon:salon
      });
    });
  },

addcosmetic: (req, res)=> {
    Cosmetic.find({},(err,cosmetic)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/cosmetic', {
         cosmetic:cosmetic
      });
    });
  },


postsalon: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/salon' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const salon = new Salon();
       salon.name = req.body.name;
       salon.location = req.body.location;
       salon.contacts = req.body.contacts;
       salon.hours =req.body.hours;
       salon.description = req.body.description;
       salon.img = target_path;
       console.log(salon.title);
        
       salon.save((err,salon)=>{
        if(err) return (err);
          
          
        console.log(salon)
        res.redirect('/adminindex');
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
        res.redirect('/admincosmetic');
      });

  },

  editcosmetic: (req, res)=>{
    Cosmetic.findOne({ _id : req.params.id },(err, cosmetic)=>{
      if(err) return err;
      res.render('dashboard/admin/editcosmetic', {
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
          res.redirect('/admincosmetic');
        });
      //});
     },

  deletesalon : (req, res)=>{
    Salon.findOne({_id:req.params.id}, (err, salon)=>{
      if(err) res.send(err);

      if(salon){
        salon.remove({}, (err, salon)=> {
          if (err) res.send(err);
            console.log('salon delete');
             res.redirect('/adminindex');
          });
        }else{
          res.send("salon not deleted");
        }
    });
  },

    deletecosmetic : (req, res)=>{
    Cosmetic.findOne({_id:req.params.id}, (err, cosmetic)=>{
      if(err) res.send(err);

      if(cosmetic){
        cosmetic.remove({}, (err, cosmetic)=> {
          if (err) res.send(err);
            console.log('cosmetic delete');
             res.redirect('/admincosmetic');
          });
        }else{
          res.send("cosmetic shop not deleted");
        }
    });
  },

    editsalon: (req, res)=>{
    Salon.findOne({ _id : req.params.id },(err, salon)=>{
      if(err) return err;
      res.render('dashboard/admin/editsalon', {
          title      : "update",
          salon   : salon
      });
    });  
  },

  updatesalon: (req, res, next)=>{
    console.log(req.params.id);
       const name = req.body.name;
       const location = req.body.location;
       const description = req.body.description;
       const hours = req.body.hours;
       const contacts = req.body.contacts;
       const salon = new Salon();
        salon._id =  req.params.id;
        salon.update({name:name,location:location,description:description,hours:hours,contacts:contacts}, (err, salon)=>{
          if(err) return next(err);
          console.log(salon)
          res.redirect('/adminindex');
        });
     }
};