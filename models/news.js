const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const User     = require('../models/user');

const NewsSchema = new Schema({
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

NewsSchema.methods.getNewsByTitle = (title, callback)=>{
  const query = {'title': title};
  News.findOne(query,callback);
};

module.exports = mongoose.model('News', NewsSchema)

