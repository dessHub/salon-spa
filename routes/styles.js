const Style     = require('../models/style');
const Salon     = require('../models/salon');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {


 //style routes 

  style: (req, res)=> {
  Salon.find({},(err,salon)=>{
   if(err) res.send(err);
   if (salon){
    Style.find({user:req.user.id},(err,style)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/salonstyles', {
         salon:salon,
         style:style
      });
       });
}
    });
  },

  newstyle: (req,res)=> {
    Style.find({},(err,style)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/style');
    });
  },

  poststyle: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/styles' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const style = new Style();
       style.title = req.body.title;
       style.user = req.user.id;
       style.description = req.body.description;
       style.img = target_path;
       console.log(style.title);
        
       style.save((err,style)=>{
        if(err) return (err);
          
          
        console.log(style)
        res.redirect('/style');
      });

  },

  deletestyle : (req, res)=>{
    Style.findOne({_id:req.params.id}, (err, style)=>{
      if(err) res.send(err);

      if(style){
        style.remove({}, (err, style)=> {
          if (err) res.send(err);
            console.log('style delete');
             res.redirect('/style');
          });
        }else{
          res.send("style not deleted");
        }
    });
  },

  editstyle: (req, res)=>{
    Style.findOne({ _id : req.params.id },(err, style)=>{
      if(err) return err;
      res.render('dashboard/salons/editstyle', {
          title      : "update",
          style   : style
      });
    });  
  },

  updatestyle: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const title = req.body.title;
       const description = req.body.description;
       const style = new Style();
        style._id =  req.params.id;
        style.update({title:title, description:description}, (err, style)=>{
          if(err) return next(err);
          console.log(style)
          res.redirect('/style');
        });
      //});
     }

};