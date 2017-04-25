const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const AdminserviceSchema = new Schema({
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

AdminserviceSchema.methods.getAdminserviceByTitle = (title, callback)=>{
  const query = {'title': title};
  Adminservice.findOne(query,callback);
};

module.exports = mongoose.model('Adminservice', AdminserviceSchema)

