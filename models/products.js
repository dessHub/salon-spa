const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const ProductSchema = new Schema({
    title: {type:String, index:true},
    description:{type:String},
    img: { data: Buffer, contentType: String }
  });

module.exports = mongoose.model('product', ProductSchema)

