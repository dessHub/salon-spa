const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

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
    }
  });

StyleSchema.methods.getStyleByTitle = (title, callback)=>{
  const query = {'title': title};
  Style.findOne(query,callback);
};

module.exports = mongoose.model('Style', StyleSchema)

