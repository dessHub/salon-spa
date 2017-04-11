const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const ServiceSchema = new Schema({
    title: {type:String, index:true},
    description:{type:String},
    photo:    {type:String},
  });

module.exports = mongoose.model('service', ServiceSchema)

