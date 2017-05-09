const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const User     = require('../models/user');

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
    user: [{type:Schema.Types.ObjectId, ref:User}]
  });

ServiceSchema.methods.getServiceByTitle = (title, callback)=>{
  const query = {'title': title};
  Service.findOne(query,callback);
};

module.exports = mongoose.model('Service', ServiceSchema)

