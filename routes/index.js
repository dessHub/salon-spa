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

function isAdmin(req, res, next) {
  var user = req.user;
  if (user.role=="admin") {
    return next();
  }
  req.session.oldUrl = req.url;
  res.send("Page not found");
}

function isSalon(req, res, next) {
  var user = req.user;
  if (user.role=="salonuser") {
    return next();
  }
  req.session.oldUrl = req.url;
  res.send("Page not found");
}

function isCosmetic(req, res, next) {
  var user = req.user;
  if (user.role=="cosmeticuser") {
    return next();
  }
  req.session.oldUrl = req.url;
  res.send("Page not found");
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
router.get('/cosmeticindex',       isCosmetic, cosmeticRoutes.index);
router.get('/cosmeticprofile',      isCosmetic,  cosmeticRoutes.profile);
router.post('/uploadcosmetic',      isCosmetic, cosmeticupload.single('image'), cosmeticRoutes.postcosmetic);
router.get('/editcosmetic/:id',     isCosmetic,  cosmeticRoutes.editcosmetic);
router.post('/updatecosmetic/:id',   isCosmetic, cosmeticRoutes.updatecosmetic);

/*
Admin Routes
*/
router.get('/adminindex',             isAdmin, adminRoutes.index);
router.get('/admincosmetic',          isAdmin, adminRoutes.cosmetic);
router.get('/addsalon',               isAdmin, adminRoutes.addsalon);
router.get('/addcosmetic',               isAdmin, adminRoutes.addcosmetic);
router.post('/uploadadminsalon',      isAdmin, salonupload.single('image'), adminRoutes.postsalon);
router.post('/uploadadmincosmetic',      isAdmin, cosmeticupload.single('image'), adminRoutes.postcosmetic);
router.get('/editadminsalon/:id',     isAdmin, adminRoutes.editsalon);
router.get('/editadmincosmetic/:id',     isAdmin, adminRoutes.editcosmetic);
router.post('/updateadminsalon:id',   isAdmin, adminRoutes.updatesalon);
router.post('/updateadmincosmetic:id',   isAdmin, adminRoutes.updatecosmetic);
router.get('/salondelete/:id',        isAdmin, adminRoutes.deletesalon);
router.get('/cosmeticdelete/:id',        isAdmin, adminRoutes.deletecosmetic);
/*router.get('/adminservice',      adminRoutes.service);
router.get('/adservice',         adminRoutes.adservice);
router.get('/adminproduct',      adminRoutes.product);
router.get('/adproduct',         adminRoutes.adproduct);
router.get('/adminsalon',        adminRoutes.salon);
router.get('/adsalon',           adminRoutes.adsalon);
router.get('/adminnews',         adminRoutes.news);
router.get('/adnews',            adminRoutes.adnews);*/

router.post('/uploadadminservice',     isAdmin,  adminserviceupload.single('image'), adminservicesRoutes.postservice);
router.get('/adminservice',            isAdmin,   adminservicesRoutes.services);
router.get('/addadminservice',         isAdmin,  adminservicesRoutes.addservice);
router.get('/editadminservice/:id',    isAdmin,  adminservicesRoutes.editservice);
router.post('/updateadminservice:id',  isAdmin,   adminservicesRoutes.updateservice);
router.get('/adminservicedelete/:id',  isAdmin,  adminservicesRoutes.deleteservice);

router.get('/adminproduct',            isAdmin,  adminproductsRoutes.product);
router.post('/uploadadminproduct',     isAdmin,  adminproductupload.single('image'), adminproductsRoutes.postproduct);
router.get('/newadminproduct',         isAdmin,  adminproductsRoutes.newproduct);
router.get('/editadminproduct/:id',    isAdmin,  adminproductsRoutes.editproduct);
router.post('/updateadminproduct:id',  isAdmin,  adminproductsRoutes.updateproduct);
router.get('/adminproductdelete/:id',  isAdmin,  adminproductsRoutes.deleteproduct);

router.get('/adminnews',            isAdmin,   adminnewsRoutes.news);
router.post('/uploadadminnews',     isAdmin,   adminnewsupload.single('image'), adminnewsRoutes.postnews);
router.get('/newadminnews',         isAdmin,  adminnewsRoutes.newnews);
router.get('/editadminnews/:id',    isAdmin,   adminnewsRoutes.editnews);
router.post('/updateadminnews:id',  isAdmin,  adminnewsRoutes.updatenews);
router.get('/adminnewsdelete/:id',  isAdmin,  adminnewsRoutes.deletenews);


/*
Salon Routes
*/
router.get('/salonindex',        isSalon, salonRoutes.index);
router.get('/salonprofile',      isSalon,  salonRoutes.profile);
router.post('/uploadsalon',      isSalon, salonupload.single('image'), salonRoutes.postsalon);
router.get('/editsalon/:id',     isSalon,  salonRoutes.editsalon);
router.post('/updatesalon:id',   isSalon, salonRoutes.updatesalon);


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
router.post('/postorder',  appointmentRoutes.postorder);
module.exports=router;
