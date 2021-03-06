const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const User     = require('../models/user');

const SalonSchema = new Schema({
    name: {
    	type:String, 
    	index:true
    },
    description:{
    	type:String
    },
    location:{
    	type:String
    },
    hours:{
    	type:String
    },
    contact:{
        type:String
    },
    img: { 
    	type : String
    },
    user: [{type:Schema.Types.ObjectId, ref:User}]
  });

SalonSchema.methods.getSalonByName = (name, callback)=>{
  const query = {'name': name};
  Salon.findOne(query,callback);
};

module.exports = mongoose.model('Salon', SalonSchema)

