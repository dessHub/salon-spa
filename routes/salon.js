const Salon     = require('../models/salon');
const Appointment     = require('../models/appoinment');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {
profile : (req, res)=> {
  Salon.find({'user':req.user._id},(err,salon)=>{
   if(err) res.send(err);
   var salon_id = "";
   for(i=0; i<salon.length; i++){
    salon_id = salon[i].id;
   }
  Appointment.find({"salon":salon_id},(err,appointment)=>{
   if(err) res.send(err);
   res.render('dashboard/salons/index', {
    salon : salon,
    appointment : appointment
   });
  });

});
  },

 //salon routes

index: (req, res)=> {
    Salon.find({},(err,salon)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/profile', {
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
       salon.user = req.user.id;
       salon.location = req.body.location;
       salon.contact = req.body.contact;
       salon.hours =req.body.hours;
       salon.user = req.user.id;
       salon.description = req.body.description;
       salon.img = target_path;
       console.log(salon.title);
        
       salon.save((err,salon)=>{
        if(err) return (err);
          
          
        console.log(salon)
        res.redirect('/salonprofile');
      });

  },

  editsalon: (req, res)=>{
    Salon.findOne({ _id : req.params.id },(err, salon)=>{
      if(err) return err;
      res.render('dashboard/salons/editsalon', {
          title      : "update",
          salon   : salon
      });
    });  
  },

  updatesalon: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const name = req.body.name;
       const location = req.body.location;
       const description = req.body.description;
       const contact = req.body.contact;
       const hours = req.body.hours;
       const salon = new Salon();
        salon._id =  req.params.id;
        salon.update({name:name,location:location,contact:contact,description:description,hours}, (err, salon)=>{
          if(err) return next(err);
          console.log(salon)
          res.redirect('/salon');
        });
      //});
     }

};