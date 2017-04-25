const Salon     = require('../models/salon');

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

addsalon: (req, res)=> {
    Salon.find({},(err,salon)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/salon', {
         salon:salon
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