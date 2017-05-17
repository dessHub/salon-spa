const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const Salon     = require('../models/salon');

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
    salon: [{type:Schema.Types.ObjectId, ref:Salon}]
  });

ProductSchema.methods.getProductByTitle = (title, callback)=>{
  const query = {'title': title};
  Product.findOne(query,callback);
};

module.exports = mongoose.model('Product', ProductSchema)

