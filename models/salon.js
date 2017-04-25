const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const SalonSchema = new Schema({
    name: {
    	type:String, 
    	index:true
    },
    description:{
    	type:String
    },
    location:{
    	type:String
    },
    hours:{
    	type:String
    },
    contacts:{
        type:String
    },
    img: { 
    	type : String
    }
  });

SalonSchema.methods.getSalonByName = (name, callback)=>{
  const query = {'name': name};
  Salon.findOne(query,callback);
};

module.exports = mongoose.model('Salon', SalonSchema)

