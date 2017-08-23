const Appointment     = require('../models/appoinment');
const Salon     = require('../models/salon');
const Order     = require('../models/order');

// We need this to build our post string
var querystring = require('querystring');
var https       = require('https');

// africastalking user credentials
var username = 'salon001';
var apikey   = '520c3fc9d01b5ceaa8bf8309e2a5a2026353907e3e9cfa8c416a44413aab5ad4';

module.exports = {



 //News routes


  postappointment: (req,res)=>{
  //  Salon.find({_id:req.params.id},(err, salon)=>{
    //  if(err) res.send(err);
       const appointment = new Appointment();
       appointment.email = req.body.email;
       appointment.name = req.body.name;
       appointment.phone = req.body.phone;
       appointment.salon = req.body.id;
       appointment.date = req.body.date;
       appointment.style = req.body.style;
       appointment.time = req.body.time;
       console.log("successfully placed an appointment");
       var ms = "You have successfully placed an appointment schedule for " + appointment.date + " " + appointment.time;
       console.log(ms);

       appointment.save((err, appointment)=>{
        if(err) return (err);


        console.log(appointment.phone);

         // ********** Bulk sms code Start*********
         // Define the recipient numbers in a comma separated string
          // Numbers should be in international format as shown
          var to      = appointment.phone;

          // And of course we want our recipients to know what we really do
          var message = ms;

          // Build the post string from an object

          var post_data = querystring.stringify({
              'username' : username,
              'to'       : to,
              'message'  : message
          });

          var post_options = {
              host   : 'api.africastalking.com',
              path   : '/version1/messaging',
              method : 'POST',

              rejectUnauthorized : false,
              requestCert        : true,
              agent              : false,

              headers: {
                  'Content-Type' : 'application/x-www-form-urlencoded',
                  'Content-Length': post_data.length,
                  'Accept': 'application/json',
                  'apikey': apikey
              }
          };

          var post_req = https.request(post_options, function(res) {
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                  var jsObject   = JSON.parse(chunk);
                  var recipients = jsObject.SMSMessageData.Recipients;
                  if ( recipients.length > 0 ) {
                      for (var i = 0; i < recipients.length; ++i ) {
                          var logStr  = 'number=' + recipients[i].number;
                          logStr     += ';cost='   + recipients[i].cost;
                          logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                          console.log(logStr);
                          }
                      } else {
                          console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
                  }
              });
          });

          // Add post parameters to the http request
          post_req.write(post_data);

          post_req.end();
         // ********* Buld sms code ends **********

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
     },

  postorder: (req,res)=>{
  //  Salon.find({_id:req.params.id},(err, salon)=>{
    //  if(err) res.send(err);
       const order = new Order();
       order.email = req.body.email;
       order.name = req.body.name;
       order.phone = req.body.phone;
       order.cosmetic = req.body.id;
       order.product = req.body.product;
       console.log(order.email);

       order.save((err, order)=>{
        if(err) return (err);


        console.log(order)
        res.redirect('/cosmetic');
      });
    //});
  },

};
