const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const AdminnewsSchema = new Schema({
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

AdminnewsSchema.methods.getAdminnewsByTitle = (title, callback)=>{
  const query = {'title': title};
  News.findOne(query,callback);
};

module.exports = mongoose.model('Adminnews', AdminnewsSchema)

