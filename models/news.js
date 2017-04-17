const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

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
    }
  });

NewsSchema.methods.getNewsByTitle = (title, callback)=>{
  const query = {'title': title};
  News.findOne(query,callback);
};

module.exports = mongoose.model('News', NewsSchema)

