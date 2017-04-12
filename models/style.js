const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const StyleSchema = new Schema({
    title: {type:String, index:true},
    description:{type:String},
    pimg: { data: Buffer, contentType: String }
  });

module.exports = mongoose.model('style', StyleSchema)

