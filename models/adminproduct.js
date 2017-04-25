const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const AdminproductSchema = new Schema({
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

AdminproductSchema.methods.getAdminproductByTitle = (title, callback)=>{
  const query = {'title': title};
  Adminproduct.findOne(query,callback);
};

module.exports = mongoose.model('Adminproduct', AdminproductSchema)

