const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const User     = require('../models/user');

const ProductSchema = new Schema({
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

ProductSchema.methods.getProductByTitle = (title, callback)=>{
  const query = {'title': title};
  Product.findOne(query,callback);
};

module.exports = mongoose.model('Product', ProductSchema)

