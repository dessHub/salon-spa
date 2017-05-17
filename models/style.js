const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const Salon     = require('../models/salon');

const StyleSchema = new Schema({
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

StyleSchema.methods.getStyleByTitle = (title, callback)=>{
  const query = {'title': title};
  Style.findOne(query,callback);
};

module.exports = mongoose.model('Style', StyleSchema)

