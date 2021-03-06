const Product     = require('../models/product');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

module.exports = {

//product routes

  product: (req, res)=> {
    Product.find({user:req.user.id},(err,product)=>{
      if(err) res.send(err);
                    if (!err){
                console.log(product);

                if(req.user.role == 'cosmeticuser' ){
                 res.render('dashboard/cosmetics/cosmeticproducts', {
                   product:product
                 });


                }else if(req.user.role == 'salonuser'){
                 res.render('dashboard/salons/salonproducts', {
                    product:product
                 });

                }     
              } else{
                console.log("There was an error i", err);
              }
    });
  },

  newproduct: (req,res)=> {
    Product.find({},(err,product)=>{
      if(err) res.send(err);
                    if (!err){
                console.log(product);

                if(req.user.role == 'cosmeticuser' ){
                 res.render('dashboard/cosmetics/product', {
                   product:product
                 });


                }else if(req.user.role == 'salonuser'){
                 res.render('dashboard/salons/product', {
                    product:product
                 });

                }     
              } else{
                console.log("There was an error i", err);
              }
    });
  },

  postproduct: (req,res)=>{
      const image = req.image;
      const tmp_path = req.file.path;
      console.log(req.file);

       /** The original name of the uploaded file
           stored in the variable "originalname". **/
       const target_path = 'uploads/products' + req.file.originalname;
       /** A better way to copy the uploaded file. **/
       const src = fs.createReadStream(tmp_path);
       const dest = fs.createWriteStream(target_path);
       src.pipe(dest);
       fs.unlink(tmp_path); //deleting the tmp_path

       console.log(target_path);
       const product = new Product();
       product.title = req.body.title;
       product.user = req.user.id;
       product.description = req.body.description;
       product.img = target_path;
       console.log(product.title);
        
       product.save((err,product)=>{
        if(err) return (err);
          
          
        console.log(product)
        res.redirect('/product');
      });

  },

  deleteproduct : (req, res)=>{
    Product.findOne({_id:req.params.id}, (err, product)=>{
      if(err) res.send(err);

      if(product){
        product.remove({}, (err, product)=> {
          if (err) res.send(err);
            console.log('product delete');
             res.redirect('/product');
          });
        }else{
          res.send("product not deleted");
        }
    });
  },

  editproduct: (req, res)=>{
    Product.findOne({ _id : req.params.id },(err, product)=>{
      if(err) return err;
                    if (!err){
                console.log(product);

                if(req.user.role == 'cosmeticuser' ){
                 res.render('dashboard/cosmetics/editproduct', {
                   product:product
                 });


                }else if(req.user.role == 'salonuser'){
                 res.render('dashboard/salons/editproduct', {
                    product:product
                 });

                }     
              } else{
                console.log("There was an error i", err);
              }
    });  
  },

  updateproduct: (req, res, next)=>{
    console.log(req.params.id);
   // Service.findOne({ _id : req.body.serviceid},(err, service)=>{
       // if(err) return next(err);
       const title = req.body.title;
       const description = req.body.description;
       const product = new Product();
        product._id =  req.params.id;
        product.update({title:title, description:description}, (err, product)=>{
          if(err) return next(err);
          console.log(product)
          res.redirect('/product');
        });
      //});
     }

};

