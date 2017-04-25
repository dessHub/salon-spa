const Adminproduct     = require('../models/adminproduct');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {

//product routes

  product: (req, res)=> {
    Adminproduct.find({},(err,adminproduct)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/adminproducts', {
         adminproduct:adminproduct
      });
    });
  },

  newproduct: (req,res)=> {
    Adminproduct.find({},(err,adminproduct)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/product');
    });
  },

  postproduct: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/adminproducts' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const adminproduct = new Adminproduct();
       adminproduct.title = req.body.title;
       adminproduct.description = req.body.description;
       adminproduct.img = target_path;
       console.log(adminproduct.title);
        
       adminproduct.save((err,adminproduct)=>{
        if(err) return (err);
          
          
        console.log(adminproduct)
        res.redirect('/adminproduct');
      });

  },

  deleteproduct : (req, res)=>{
    Adminproduct.findOne({_id:req.params.id}, (err, adminproduct)=>{
      if(err) res.send(err);

      if(adminproduct){
        adminproduct.remove({}, (err, adminproduct)=> {
          if (err) res.send(err);
            console.log('adminproduct delete');
             res.redirect('/adminproduct');
          });
        }else{
          res.send("adminproduct not deleted");
        }
    });
  },

  editproduct: (req, res)=>{
    Adminproduct.findOne({ _id : req.params.id },(err, adminproduct)=>{
      if(err) return err;
      res.render('dashboard/admin/editproduct', {
          title      : "update",
          adminproduct   : adminproduct
      });
    });  
  },

  updateproduct: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const title = req.body.title;
       const description = req.body.description;
       const adminproduct = new Adminproduct();
        adminproduct._id =  req.params.id;
        adminproduct.update({title:title, description:description}, (err, adminproduct)=>{
          if(err) return next(err);
          console.log(adminproduct)
          res.redirect('/adminproduct');
        });
      //});
     }

};

