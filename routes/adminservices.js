const Adminservice     = require('../models/adminservice');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {

//service routes
  services: (req,res)=> {
    Adminservice.find({},(err,adminservice)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/adminservices', {
         adminservice:adminservice
      });
    });
  },

  addservice: (req,res)=> {
    Adminservice.find({},(err,adminservice)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/service');
    });
  },

  postservice: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/adminservices' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const adminservice = new Adminservice();
       adminservice.title = req.body.title;
       adminservice.description = req.body.description;
       adminservice.img = target_path;
       console.log(adminservice.title);
        
       adminservice.save((err,adminservice)=>{
        if(err) return (err);
          
          
        console.log(adminservice)
        res.redirect('/adminservice');
      });

  },

  
  deleteservice : (req, res)=>{
    Adminservice.findOne({_id:req.params.id}, (err, adminservice)=>{
      if(err) res.send(err);

      if(adminservice){
        adminservice.remove({}, (err, product)=> {
          if (err) res.send(err);
            console.log('adminservice delete');
             res.redirect('/adminservice');
          });
        }else{
          res.send("Adminservice not deleted");
        }
    });
  },

  editservice: (req, res)=>{
    Adminservice.findOne({ _id : req.params.id },(err, adminservice)=>{
      if(err) return err;
      res.render('dashboard/admin/editservice', {
          title      : "update",
          adminservice    : adminservice
      });
    });  
  },

  updateservice: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const title = req.body.title;
       const description = req.body.description;
       const adminservice = new Adminservice();
        adminservice._id =  req.params.id;
        adminservice.update({title:title, description:description}, (err, adminservice)=>{
          if(err) return next(err);
          console.log(adminservice)
          res.redirect('/adminservice');
        });
      //});
     }

};