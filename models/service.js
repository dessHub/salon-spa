const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const ServiceSchema = new Schema({
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

ServiceSchema.methods.getServiceByTitle = (title, callback)=>{
  const query = {'title': title};
  Service.findOne(query,callback);
};

module.exports = mongoose.model('Service', ServiceSchema)

