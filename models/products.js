const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const ProductSchema = new Schema({
    title: {type:String, index:true},
    description:{type:String},
    photo:    {type:String},
  });

module.exports = mongoose.model('product', ProductSchema)

