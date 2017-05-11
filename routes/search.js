const Salon     = require('../models/salon');
const Adminnews =require('../models/adminnews');

module.exports = {
  index: (req, res)=> {
    Salon.find({},(err,salon)=>{
      if(err) res.send(err);
      res.render('search/pages/index', {
         salon:salon
      });
    });
  },

 item : function(req, res){
    Adminnews.findOne({},(err,adminnews)=>{
   if(err) res.send(err);
   if (adminnews){
    Salon.findOne({_id:req.params.id}, function(err, salon){
      if(err) res.send(err);
            res.render('search/pages/single',{
                salon:salon,
                adminnews:adminnews
            });
        });
    }
});
}, 
  

  service : (req, res)=> {
      res.render('search/pages/services',{
      });
  },

  hair : (req, res)=> {
      res.render('search/pages/trends',{
      });
  },

  offer : (req, res)=> {
      res.render('search/pages/offers',{
      });
  },

  appointment : (req, res)=> {
      res.render('search/pages/appointment',{
      });
  }

};