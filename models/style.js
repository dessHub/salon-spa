const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const User     = require('../models/user');

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
    user: [{type:Schema.Types.ObjectId, ref:User}]

  });

StyleSchema.methods.getStyleByTitle = (title, callback)=>{
  const query = {'title': title};
  Style.findOne(query,callback);
};

module.exports = mongoose.model('Style', StyleSchema)

