const Salon     = require('../models/salon');
const Adminnews =require('../models/adminnews');
const Service     = require('../models/service');
const Style     = require('../models/style');
const Product     = require('../models/product');

module.exports = {
  index: (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Salon.find({},(err,salon)=>{
      if(err) res.send(err);
      res.render('search/pages/index', {
         adminnews:adminnews,
         salon:salon
      });
    });
      }
});
  },

 item : function(req, res){
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Salon.findOne({_id:req.params.id}, function(err, salon){
      if(err) res.send(err);
            res.render('search/pages/single',{
                adminnews:adminnews,
                salon:salon
            });
        });
    }
});
}, 

/*  getbytitle: ((req, res) => {
        const title = req.params.title;
        if (title) {
            Event.find({ title: req.params.title })
*/
  service : (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Service.find({},(err,service)=>{
      if(err) res.send(err);
      res.render('search/pages/services', {
         adminnews:adminnews,
         service:service
      });
    });
      }
    });
  },

  hair : (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Style.find({},(err,style)=>{
      if(err) res.send(err);
      res.render('search/pages/trends', {
         adminnews:adminnews,
         style:style
      });
    });
      }
    });
  },

  offer : (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Product.find({},(err,product)=>{
      if(err) res.send(err);
      res.render('search/pages/offers', {
         adminnews:adminnews,
         product:product
      });
    });
      }
    });
  },

  appointment : (req, res)=> {
      res.render('search/pages/appointment',{
      });
  }

};