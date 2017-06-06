const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const User     = require('../models/user');

const CosmeticSchema = new Schema({
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

CosmeticSchema.methods.getCosmeticByName = (name, callback)=>{
  const query = {'name': name};
  Cosmetic.findOne(query,callback);
};

module.exports = mongoose.model('Cosmetic', CosmeticSchema)

