const Adminnews     = require('../models/adminnews');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {


 //News routes 

  news: (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/adminnews', {
         adminnews:adminnews
      });
    });
  },

  newnews: (req,res)=> {
    Adminnews.find({},(err,news)=>{
      if(err) res.send(err);
      res.render('dashboard/admin/news');
    });
  },

  postnews: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/adminnews' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const adminnews = new Adminnews();
       adminnews.title = req.body.title;
       adminnews.description = req.body.description;
       adminnews.img = target_path;
       console.log(adminnews.title);
        
       adminnews.save((err, news)=>{
        if(err) return (err);
          
          
        console.log(news)
        res.redirect('/adminnews');
      });

  },

  deletenews : (req, res)=>{
    Adminnews.findOne({_id:req.params.id}, (err, adminnews)=>{
      if(err) res.send(err);

      if(adminnews){
        adminnews.remove({}, (err, adminnews)=> {
          if (err) res.send(err);
            console.log('adminnews delete');
             res.redirect('/adminnews');
          });
        }else{
          res.send("adminnews not deleted");
        }
    });
  },

  editnews: (req, res)=>{
    Adminnews.findOne({ _id : req.params.id },(err, adminnews)=>{
      if(err) return err;
      res.render('dashboard/admin/editnews', {
          title      : "update",
          adminnews       : adminnews
      });
    });  
  },

  updatenews: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const title = req.body.title;
       const description = req.body.description;
       const adminnews = new Adminnews();
        adminnews._id =  req.params.id;
        adminnews.update({title:title, description:description}, (err, adminnews)=>{
          if(err) return next(err);
          console.log(adminnews)
          res.redirect('/adminnews');
        });
      //});
     }


};