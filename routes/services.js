const Service     = require('../models/service');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {

//service routes
  services: (req,res)=> {
    Service.find({},(err,service)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/salonservices', {
         service:service
      });
    });
  },

  addservice: (req,res)=> {
    Service.find({},(err,service)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/service');
    });
  },

  postservice: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/services' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const service = new Service();
       service.title = req.body.title;
       service.description = req.body.description;
       service.img = target_path;
       console.log(service.title);
        
       service.save((err,service)=>{
        if(err) return (err);
          
          
        console.log(service)
        res.redirect('/service');
      });

  },

  
  deleteservice : (req, res)=>{
    Service.findOne({_id:req.params.id}, (err, service)=>{
      if(err) res.send(err);

      if(service){
        service.remove({}, (err, product)=> {
          if (err) res.send(err);
            console.log('service delete');
             res.redirect('/service');
          });
        }else{
          res.send("service not deleted");
        }
    });
  },

  editservice: (req, res)=>{
    Service.findOne({ _id : req.params.id },(err, service)=>{
      if(err) return err;
      res.render('dashboard/salons/editservice', {
          title      : "update",
          service    : service
      });
    });  
  },

  updateservice: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const title = req.body.title;
       const description = req.body.description;
       const service = new Service();
        service._id =  req.params.id;
        service.update({title:title, description:description}, (err, service)=>{
          if(err) return next(err);
          console.log(service)
          res.redirect('/service');
        });
      //});
     }

};