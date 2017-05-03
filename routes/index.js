const express        = require('express');
const router         = express.Router();
const homeRoutes     = require('./home');
const salonRoutes    = require('./salon');
const searchRoutes   = require('./search');
const adminRoutes    = require('./admin');
const newsRoutes     = require('./news');
const servicesRoutes = require('./services');
const productsRoutes = require('./products');
const stylesRoutes   = require('./styles');
const userRoutes     = require('./user');
const sessionRoutes  = require('./session');
const adminnewsRoutes     = require('./adminnews');
const adminservicesRoutes = require('./adminservices');
const adminproductsRoutes = require('./adminproducts');
const appointmentRoutes     = require('./appointment');

const multer		 = require('multer');
const upload   		 = multer({dest:'uploads/'});
const serviceupload  = multer({dest:'uploads/'});
const productupload  = multer({dest:'uploads/'});
const styleupload    = multer({dest:'uploads/'});
const newsupload     = multer({dest:'uploads/'});
const salonupload    = multer({dest:'uploads/'});
const adminnewsupload     = multer({dest:'uploads/'});
const adminserviceupload  = multer({dest:'uploads/'});
const adminproductupload  = multer({dest:'uploads/'});

const fs             = require('fs');
const passport       = require('passport');

router.get('/',        homeRoutes.index);

/*
 * @user routes
*/
router.get('/register',           userRoutes.new);
router.post('/signup',            userRoutes.create);

/*
 * @session routes 
*/
router.get('#modal2',           sessionRoutes.new);
router.post('/login',          sessionRoutes.create);
router.get('/logout',          sessionRoutes.delete);

/*
Admin Routes
*/
router.get('/adminindex',        adminRoutes.index);
router.get('/addsalon',       adminRoutes.addsalon);
router.post('/uploadadminsalon',       salonupload.single('image'), adminRoutes.postsalon);
router.get('/editadminsalon/:id',      adminRoutes.editsalon);
router.post('/updateadminsalon:id',    adminRoutes.updatesalon);
router.get('/salondelete/:id',         adminRoutes.deletesalon);
/*router.get('/adminservice',      adminRoutes.service);
router.get('/adservice',         adminRoutes.adservice);
router.get('/adminproduct',      adminRoutes.product);
router.get('/adproduct',         adminRoutes.adproduct);
router.get('/adminsalon',        adminRoutes.salon);
router.get('/adsalon',           adminRoutes.adsalon);
router.get('/adminnews',         adminRoutes.news);
router.get('/adnews',            adminRoutes.adnews);*/

router.post('/uploadadminservice',       adminserviceupload.single('image'), adminservicesRoutes.postservice);             
router.get('/adminservice',              adminservicesRoutes.services);
router.get('/addadminservice',           adminservicesRoutes.addservice);
router.get('/editadminservice/:id',      adminservicesRoutes.editservice);
router.post('/updateadminservice:id',    adminservicesRoutes.updateservice);
router.get('/adminservicedelete/:id',    adminservicesRoutes.deleteservice);

router.get('/adminproduct',              adminproductsRoutes.product);
router.post('/uploadadminproduct',       adminproductupload.single('image'), adminproductsRoutes.postproduct);
router.get('/newadminproduct',           adminproductsRoutes.newproduct);
router.get('/editadminproduct/:id',      adminproductsRoutes.editproduct);
router.post('/updateadminproduct:id',    adminproductsRoutes.updateproduct);
router.get('/adminproductdelete/:id',    adminproductsRoutes.deleteproduct);

router.get('/adminnews',              adminnewsRoutes.news);
router.post('/uploadadminnews',       adminnewsupload.single('image'), adminnewsRoutes.postnews);
router.get('/newadminnews',           adminnewsRoutes.newnews);
router.get('/editadminnews/:id',      adminnewsRoutes.editnews);
router.post('/updateadminnews:id',    adminnewsRoutes.updatenews);
router.get('/adminnewsdelete/:id',    adminnewsRoutes.deletenews);


/*
Salon Routes
*/
router.get('/salonindex',         salonRoutes.index);
router.get('/salonprofile',       salonRoutes.profile);
router.post('/uploadsalon',       salonupload.single('image'), salonRoutes.postsalon);
router.get('/editsalon/:id',      salonRoutes.editsalon);
router.post('/updatesalon:id',    salonRoutes.updatesalon);


router.post('/uploadservice',       serviceupload.single('image'), servicesRoutes.postservice);             
router.get('/service',              servicesRoutes.services);
router.get('/addservice',           servicesRoutes.addservice);
router.get('/editservice/:id',      servicesRoutes.editservice);
router.post('/updateservice:id',    servicesRoutes.updateservice);
router.get('/servicedelete/:id',    servicesRoutes.deleteservice);

router.get('/product',              productsRoutes.product);
router.post('/uploadproduct',       productupload.single('image'), productsRoutes.postproduct);
router.get('/newproduct',           productsRoutes.newproduct);
router.get('/editproduct/:id',      productsRoutes.editproduct);
router.post('/updateproduct:id',    productsRoutes.updateproduct);
router.get('/productdelete/:id',    productsRoutes.deleteproduct);

router.get('/style',              stylesRoutes.style);
router.post('/uploadstyle',       styleupload.single('image'), stylesRoutes.poststyle);
router.get('/newstyle',           stylesRoutes.newstyle);
router.get('/editstyle/:id',      stylesRoutes.editstyle);
router.post('/updatestyle:id',    stylesRoutes.updatestyle);
router.get('/styledelete/:id',    stylesRoutes.deletestyle);

router.get('/news',              newsRoutes.news);
router.post('/uploadnews',       newsupload.single('image'), newsRoutes.postnews);
router.get('/newnews',           newsRoutes.newnews);
router.get('/editnews/:id',      newsRoutes.editnews);
router.post('/updatenews:id',    newsRoutes.updatenews);
router.get('/newsdelete/:id',    newsRoutes.deletenews);

/*
Search Routes
*/
router.get('/find',             searchRoutes.index);
router.get('/single', 			searchRoutes.single);
router.get('/findservice', 		searchRoutes.service);
router.get('/hair', 			searchRoutes.hair);
router.get('/offer',		    searchRoutes.offer);
router.post('/postappointment', appointmentRoutes.postappointment);

module.exports=router;
