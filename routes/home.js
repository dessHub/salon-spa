const Salon     = require('../models/salon');
const Adminservice     = require('../models/adminservice');


module.exports = {
  index: (req,res)=> {
    Adminservice.find({},(err,adminservice)=>{
      if(err) res.send(err);
      res.render('index', {
         adminservice:adminservice
      });
    });
  }
};


