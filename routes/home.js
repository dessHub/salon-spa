const Salon     = require('../models/salon');
const Cosmetic     = require('../models/cosmetic');
const Adminservice     = require('../models/adminservice');


module.exports = {
 index: (req, res)=> {
    Cosmetic.find({},(err,cosmetic)=>{
      if(err) res.send(err);
   if (cosmetic){
    Salon.find({},(err,salon)=>{
      if(err) res.send(err);
      res.render('index', {
      	 salon:salon,
         cosmetic:cosmetic
      });
    });
      }
});
  },

  //route to get all fashion in the database to the browser
  get : (req, res)=> {
    Salon.findOne({ name: req.params.name }),(err, salon)=>{
      if(err) res.send(err);
      res.redirect('/find',{
        salon:salon
      });
    };
  },

  cosmetic : (req, res)=> {
  Salon.find({},(err,salon)=>{
   if(err) res.send(err);
   res.render('dashboard/cosmeticadmin', {
    salon : salon
   });
  });
  },

};