const News     = require('../models/news');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {


 //News routes 

  news: (req, res)=> {
    News.find({user:req.user.id},(err,news)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/salonnews', {
         news  :news
      });
    });
  },

  newnews: (req,res)=> {
    News.find({},(err,news)=>{
      if(err) res.send(err);
      res.render('dashboard/salons/news');
    });
  },

  postnews: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/news' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const news = new News();
       news.title = req.body.title;
       news.user = req.user.id;
       news.description = req.body.description;
       news.img = target_path;
       console.log(news.title);
        
       news.save((err, news)=>{
        if(err) return (err);
          
          
        console.log(news)
        res.redirect('/news');
      });

  },

  deletenews : (req, res)=>{
    News.findOne({_id:req.params.id}, (err, news)=>{
      if(err) res.send(err);

      if(news){
        news.remove({}, (err, news)=> {
          if (err) res.send(err);
            console.log('news delete');
             res.redirect('/news');
          });
        }else{
          res.send("news not deleted");
        }
    });
  },

  editnews: (req, res)=>{
    News.findOne({ _id : req.params.id },(err, news)=>{
      if(err) return err;
      res.render('dashboard/salons/editnews', {
          title      : "update",
          news       : news
      });
    });  
  },

  updatenews: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const title = req.body.title;
       const description = req.body.description;
       const news = new News();
        news._id =  req.params.id;
        news.update({title:title, description:description}, (err, news)=>{
          if(err) return next(err);
          console.log(news)
          res.redirect('/news');
        });
      //});
     }


};