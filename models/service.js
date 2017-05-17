const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const Salon     = require('../models/salon');

const ServiceSchema = new Schema({
    title: {
    	type:String, 
    	index:true
    },
    description:{
    	type:String
    },
    img: { 
    	type : String
    },
    salon: [{type:Schema.Types.ObjectId, ref:Salon}]
  });

ServiceSchema.methods.getServiceByTitle = (title, callback)=>{
  const query = {'title': title};
  Service.findOne(query,callback);
};

module.exports = mongoose.model('Service', ServiceSchema)

