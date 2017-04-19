const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;

const AppointmentSchema = new Schema({
    email: {
    	type:String, 
    	index:true
    },
    fname:{
    	type:String
    },
    lname:{
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
  });

AppointmentSchema.methods.getAppointmentByEmail = (email, callback)=>{
  const query = {'email': email};
  Appointment.findOne(query,callback);
};

module.exports = mongoose.model('Appointment', AppointmentSchema)

