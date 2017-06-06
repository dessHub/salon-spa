const Appointment     = require('../models/appoinment');
const Salon     = require('../models/salon');

module.exports = {


 //News routes 


  postappointment: (req,res)=>{
  //  Salon.find({_id:req.params.id},(err, salon)=>{
    //  if(err) res.send(err);
       const appointment = new Appointment();
       appointment.email = req.body.email;
       appointment.fname = req.body.fname;
       appointment.lname = req.body.lname;
       appointment.phone = req.body.phone;
       appointment.salon = req.body.id;
       appointment.date = req.body.date;
       appointment.time = req.body.time;
       console.log(appointment.email);
        
       appointment.save((err, appointment)=>{
        if(err) return (err);
          
          
        console.log(appointment)
        res.redirect('/find');
      });
    //});
  },

  deleteappointment : (req, res)=>{
    Appointment.findOne({_id:req.params.id}, (err, appointment)=>{
      if(err) res.send(err);

      if(news){
        appointment.remove({}, (err, appointment)=> {
          if (err) res.send(err);
            console.log('appointment delete');
             res.redirect('/appointment');
          });
        }else{
          res.send("appointment not deleted");
        }
    });
  },

  editappointment: (req, res)=>{
    Appointment.findOne({ _id : req.params.id },(err, appointment)=>{
      if(err) return err;
      res.render('dashboard/salons/editappointment', {
          title      : "update",
          appointment       : appointment
      });
    });  
  },

  updateappointment: (req, res, next)=>{
    console.log(req.params.id);
       const email = req.body.email;
       const fname = req.body.fname;
       const lname = req.body.lname;
       const phone = req.body.phone;
       const date = req.body.date;
       const time = req.body.time;
       const appointment = new Appointment();
        appointment._id =  req.params.id;
        appointment.update({email:email, fname:fname, lname:lname, phone:phone, date:date, time:time,}, (err, appointment)=>{
          if(err) return next(err);
          console.log(appointment)
          res.redirect('/appointment');
        });
     }


};