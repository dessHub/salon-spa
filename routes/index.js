
var express        = require('express');
var router         = express.Router();
var homeRoutes     = require('./home');
var landRoutes     = require('./land');
var userRoutes     = require('./user');
var salonRoutes     = require('./salon');
var searchRoutes     = require('./search');
var adminRoutes     = require('./admin');

router.get('/',        homeRoutes.index);

/*
Admin Routes
*/
router.get('/adminindex',   adminRoutes.index);
router.get('/newservice',   adminRoutes.service);
router.get('/newproduct',   adminRoutes.product);
router.get('/salon',     adminRoutes.salon);
router.get('/news',         adminRoutes.news);

/*
Salon Routes
*/
router.get('/salonindex',   salonRoutes.index);
router.get('/newservice',   salonRoutes.service);
router.get('/newproduct',   salonRoutes.product);
router.get('/newstyle',     salonRoutes.style);
router.get('/salonedit',    salonRoutes.edit);
router.get('/appointments',  salonRoutes.appointment);
router.get('/news',         salonRoutes.news);
router.get('/salonprofile', salonRoutes.profile);

/*
Search Routes
*/
router.get('/find',   searchRoutes.index);
router.get('/single', searchRoutes.single);
router.get('/service', searchRoutes.service);
router.get('/hair', searchRoutes.hair);
router.get('/offer', searchRoutes.offer);
router.get('/appointment', searchRoutes.appointment);
/*
User Routes
*/
router.get('/userindex', userRoutes.index);
router.get('/signup', userRoutes.signup);
router.get('/userprofile', userRoutes.profile);
module.exports=router;
