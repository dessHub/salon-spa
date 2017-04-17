const Service     = require('../models/service');
const multer = require('multer');
const fs = require('fs');

var upload = multer({ dest: 'uploads/' });

module.exports = function(app){

	app.post('/upl', upload.single('image'), function(req, res){

	  var image = req.image;
      var tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       var target_path = 'uploads/' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       var src = fs.createReadStream(tmp_path);
       var dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const service = new Service();
	    service.title = req.body.title;
	    service.description = req.body.description;
	    service.img = target_path;
	    console.log(service.title);
        
	    service.save((err,service)=>{
	      if(err) return (err);
          
          
	      console.log(service)
	      res.redirect('/service');
	    });

	})
}