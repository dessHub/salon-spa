const express        = require('express');
const router         = express.Router();
const homeRoutes     = require('./home');
const salonRoutes    = require('./salon');
const cosmeticRoutes    = require('./cosmetic');
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
const cosmeticupload    = multer({dest:'uploads/'});
const adminnewsupload     = multer({dest:'uploads/'});
const adminserviceupload  = multer({dest:'uploads/'});
const adminproductupload  = multer({dest:'uploads/'});

const fs             = require('fs');
const passport       = require('passport');

/*
 * @isLoggedIn function checks to see if user is
 * logged in if not, renders the login page
*/

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}


router.get('/',                homeRoutes.index);
router.get('/get:name',        homeRoutes.get);

/*
 * @user routes
*/
router.get('/register',           userRoutes.new);
router.post('/signup',            userRoutes.create);

/*
 * @session routes
*/
router.get('/login',           sessionRoutes.new);
router.post('/login',          sessionRoutes.create);
router.get('/logout',          sessionRoutes.delete);

/*
Cosmetic Routes
*/
router.get('/cosmeticindex',       cosmeticRoutes.index);
router.get('/cosmeticprofile',      isLoggedIn,  cosmeticRoutes.profile);
router.post('/uploadcosmetic',      isLoggedIn, cosmeticupload.single('image'), cosmeticRoutes.postcosmetic);
router.get('/editcosmetic/:id',     isLoggedIn,  cosmeticRoutes.editcosmetic);
router.post('/updatecosmetic/:id',   isLoggedIn, cosmeticRoutes.updatecosmetic);

/*
Admin Routes
*/
router.get('/adminindex',             isLoggedIn, adminRoutes.index);
router.get('/admincosmetic',          isLoggedIn, adminRoutes.cosmetic);
router.get('/addsalon',               isLoggedIn, adminRoutes.addsalon);
router.get('/addcosmetic',               isLoggedIn, adminRoutes.addcosmetic);
router.post('/uploadadminsalon',      isLoggedIn, salonupload.single('image'), adminRoutes.postsalon);
router.post('/uploadadmincosmetic',      isLoggedIn, cosmeticupload.single('image'), adminRoutes.postcosmetic);
router.get('/editadminsalon/:id',     isLoggedIn, adminRoutes.editsalon);
router.get('/editadmincosmetic/:id',     isLoggedIn, adminRoutes.editcosmetic);
router.post('/updateadminsalon:id',   isLoggedIn, adminRoutes.updatesalon);
router.post('/updateadmincosmetic:id',   isLoggedIn, adminRoutes.updatecosmetic);
router.get('/salondelete/:id',        isLoggedIn, adminRoutes.deletesalon);
router.get('/cosmeticdelete/:id',        isLoggedIn, adminRoutes.deletecosmetic);
/*router.get('/adminservice',      adminRoutes.service);
router.get('/adservice',         adminRoutes.adservice);
router.get('/adminproduct',      adminRoutes.product);
router.get('/adproduct',         adminRoutes.adproduct);
router.get('/adminsalon',        adminRoutes.salon);
router.get('/adsalon',           adminRoutes.adsalon);
router.get('/adminnews',         adminRoutes.news);
router.get('/adnews',            adminRoutes.adnews);*/

router.post('/uploadadminservice',     isLoggedIn,  adminserviceupload.single('image'), adminservicesRoutes.postservice);
router.get('/adminservice',            isLoggedIn,   adminservicesRoutes.services);
router.get('/addadminservice',         isLoggedIn,  adminservicesRoutes.addservice);
router.get('/editadminservice/:id',    isLoggedIn,  adminservicesRoutes.editservice);
router.post('/updateadminservice:id',  isLoggedIn,   adminservicesRoutes.updateservice);
router.get('/adminservicedelete/:id',  isLoggedIn,  adminservicesRoutes.deleteservice);

router.get('/adminproduct',            isLoggedIn,  adminproductsRoutes.product);
router.post('/uploadadminproduct',     isLoggedIn,  adminproductupload.single('image'), adminproductsRoutes.postproduct);
router.get('/newadminproduct',         isLoggedIn,  adminproductsRoutes.newproduct);
router.get('/editadminproduct/:id',    isLoggedIn,  adminproductsRoutes.editproduct);
router.post('/updateadminproduct:id',  isLoggedIn,  adminproductsRoutes.updateproduct);
router.get('/adminproductdelete/:id',  isLoggedIn,  adminproductsRoutes.deleteproduct);

router.get('/adminnews',            isLoggedIn,   adminnewsRoutes.news);
router.post('/uploadadminnews',     isLoggedIn,   adminnewsupload.single('image'), adminnewsRoutes.postnews);
router.get('/newadminnews',         isLoggedIn,  adminnewsRoutes.newnews);
router.get('/editadminnews/:id',    isLoggedIn,   adminnewsRoutes.editnews);
router.post('/updateadminnews:id',  isLoggedIn,  adminnewsRoutes.updatenews);
router.get('/adminnewsdelete/:id',  isLoggedIn,  adminnewsRoutes.deletenews);


/*
Salon Routes
*/
router.get('/salonindex',        isLoggedIn, salonRoutes.index);
router.get('/salonprofile',      isLoggedIn,  salonRoutes.profile);
router.post('/uploadsalon',      isLoggedIn, salonupload.single('image'), salonRoutes.postsalon);
router.get('/editsalon/:id',     isLoggedIn,  salonRoutes.editsalon);
router.post('/updatesalon:id',   isLoggedIn, salonRoutes.updatesalon);


router.post('/uploadservice',    isLoggedIn,   serviceupload.single('image'), servicesRoutes.postservice);
router.get('/service',            isLoggedIn,  servicesRoutes.services);
router.get('/addservice',         isLoggedIn,  servicesRoutes.addservice);
router.get('/editservice/:id',    isLoggedIn,  servicesRoutes.editservice);
router.post('/updateservice:id',  isLoggedIn,  servicesRoutes.updateservice);
router.get('/servicedelete/:id',  isLoggedIn,  servicesRoutes.deleteservice);

router.get('/product',           isLoggedIn,   productsRoutes.product);
router.post('/uploadproduct',    isLoggedIn,   productupload.single('image'), productsRoutes.postproduct);
router.get('/newproduct',        isLoggedIn,   productsRoutes.newproduct);
router.get('/editproduct/:id',   isLoggedIn,   productsRoutes.editproduct);
router.post('/updateproduct:id', isLoggedIn,   productsRoutes.updateproduct);
router.get('/productdelete/:id', isLoggedIn,   productsRoutes.deleteproduct);

router.get('/style',            isLoggedIn,  stylesRoutes.style);
router.post('/uploadstyle',     isLoggedIn,  styleupload.single('image'), stylesRoutes.poststyle);
router.get('/newstyle',         isLoggedIn,  stylesRoutes.newstyle);
router.get('/editstyle/:id',   isLoggedIn,   stylesRoutes.editstyle);
router.post('/updatestyle:id', isLoggedIn,   stylesRoutes.updatestyle);
router.get('/styledelete/:id', isLoggedIn,   stylesRoutes.deletestyle);

router.get('/news',           isLoggedIn,   newsRoutes.news);
router.post('/uploadnews',    isLoggedIn,   newsupload.single('image'), newsRoutes.postnews);
router.get('/newnews',         isLoggedIn,  newsRoutes.newnews);
router.get('/editnews/:id',    isLoggedIn,  newsRoutes.editnews);
router.post('/updatenews:id',  isLoggedIn,  newsRoutes.updatenews);
router.get('/newsdelete/:id',  isLoggedIn,  newsRoutes.deletenews);

/*
Search Routes
*/
router.get('/find',             searchRoutes.index);
router.get('/search',             searchRoutes.search);
router.get('/cosmetic',             searchRoutes.cosmetic);
router.get('/cosmetic/item/:id',    searchRoutes.cosmeticitem);
router.get('/salon/item/:id',            searchRoutes.item);
router.get('/faq',                       searchRoutes.faq);
router.get('/findservice:user', 		 searchRoutes.service);
router.get('/findproduct:user', 		 searchRoutes.product);

router.post('/postappointment',  appointmentRoutes.postappointment);

module.exports=router;
