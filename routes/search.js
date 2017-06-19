const Salon     = require('../models/salon');
const Adminnews =require('../models/adminnews');
const Service     = require('../models/service');
const Style     = require('../models/style');
const Product     = require('../models/product');
const Cosmetic     = require('../models/cosmetic');

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

search: (req, res)=> {
        if (req.query.name) {
          console.log(req.query.category);
           const regex = new RegExp(escapeRegex(req.query.name), 'gi');

      var db = req.db;
    console.log(req.body);
    Salon.find({ 'name': regex // if this field is blank in the form how can I ignore it?

    }, function(err, salon){
        if (err) return err;
        console.log(salon);
         if (salon){
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
      res.render('search/pages/index', {
         adminnews:adminnews,
         salon:salon
      });
    });
      }
    });
  }else{

res.redirect('/');
console.log("klklkl");
  }
  },


  cosmetic: (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Cosmetic.find({},(err,cosmetic)=>{
      if(err) res.send(err);
      res.render('search/pages/cosmetics', {
         adminnews:adminnews,
         cosmetic:cosmetic
      });
    });
      }
});
  },


  faq: (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
      res.render('search/pages/faq', {
         adminnews:adminnews
      });
});
  },


 cosmeticitem : (req, res)=>{
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Cosmetic.findOne({_id:req.params.id},(err, cosmetic)=>{
      if(err) res.send(err);
            res.render('search/pages/cosmeticsingle',{
                adminnews:adminnews,
                cosmetic:cosmetic
            });
        });
    }
});
},

 item : (req, res)=>{
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Salon.findOne({_id:req.params.id}, (err, salon)=>{
      if(err) res.send(err);
         if (salon){
    Service.find({user:req.params.user},(err,service)=>{
      if(err) res.send(err);
    if (service){
            res.render('search/pages/single',{
                adminnews:adminnews,
                salon:salon,
                service:service
            });
          }
        });
    }
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
    Salon.find({salon:req.params.salon},(err, salon)=>{
      if(err) res.send(err);
     if (salon){
    Service.find({user:req.params.user},(err,service)=>{
      if(err) res.send(err);
    if (service){
    Style.find({user:req.params.user},(err,style)=>{
      if(err) res.send(err);
    if (style){
    Product.find({user:req.params.user},(err,product)=>{
      if(err) res.send(err);
      res.render('search/pages/services', {
         adminnews:adminnews,
         salon:salon,
         service:service,
         style:style,
         product:product
      });
         });
  }
      });
  }
    });
  }
     });
      }
    });
  },


    product : (req, res)=> {
    Adminnews.find({},(err,adminnews)=>{
      if(err) res.send(err);
   if (adminnews){
    Cosmetic.find({cosmetic:req.params.cosmetic},(err, cosmetic)=>{
      if(err) res.send(err);
     if (cosmetic){
    Style.find({user:req.params.user},(err,style)=>{
      if(err) res.send(err);
    if (style){
    Product.find({user:req.params.user},(err,product)=>{
      if(err) res.send(err);
      res.render('search/pages/products', {
         adminnews:adminnews,
         cosmetic:cosmetic,
         style:style,
         product:product
      });
      });
  }
    });
  }
     });
      }
    });
  },

  appointment : (req, res)=> {
      res.render('search/pages/appointment',{
      });
  }

};

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
