const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

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
    }
  });

ProductSchema.methods.getProductByTitle = (title, callback)=>{
  const query = {'title': title};
  Product.findOne(query,callback);
};

module.exports = mongoose.model('Product', ProductSchema)

