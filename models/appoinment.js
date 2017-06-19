const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const Salon     = require('../models/salon');

const AppointmentSchema = new Schema({
    email: {
    	type:String, 
    	index:true
    },
    name:{
    	type:String
    },
    phone:{
      type:Number
    },
    date: { 
    	type : Date
    },
    time:{
      type:String
    },
    style:{
      type:String
    },
    salon: [{type:Schema.Types.ObjectId, ref:Salon}]
  });

AppointmentSchema.methods.getAppointmentByEmail = (email, callback)=>{
  const query = {'email': email};
  Appointment.findOne(query,callback);
};

module.exports = mongoose.model('Appointment', AppointmentSchema)

