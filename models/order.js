const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const Cosmetic     = require('../models/cosmetic');

const OrderSchema = new Schema({
    email: {
    	type:String, 
    	index:true
    },
    name:{
    	type:String
    },
    phone:{
      type:Number
    },
    product:{
      type:String
    },
    cosmetic: [{type:Schema.Types.ObjectId, ref:Cosmetic}]
  });

OrderSchema.methods.getOrderByEmail = (email, callback)=>{
  const query = {'email': email};
  Order.findOne(query,callback);
};

module.exports = mongoose.model('Order', OrderSchema)

