
const express        = require('express');
const router         = express.Router();
const homeRoutes     = require('./home');
const salonRoutes     = require('./salon');
const searchRoutes     = require('./search');
const adminRoutes     = require('./admin');

router.get('/',        homeRoutes.index);

/*
Admin Routes
*/
router.get('/adminindex',        adminRoutes.index);
router.get('/adminservice',      adminRoutes.service);
router.get('/adservice',         adminRoutes.adservice);
router.get('/adminproduct',      adminRoutes.product);
router.get('/adproduct',         adminRoutes.adproduct);
router.get('/adminsalon',        adminRoutes.salon);
router.get('/adsalon',           adminRoutes.adsalon);
router.get('/adminnews',         adminRoutes.news);
router.get('/adnews',            adminRoutes.adnews);

/*
Salon Routes
*/
router.get('/salonindex',      salonRoutes.index);
router.get('/service',         salonRoutes.service);
router.get('/newservice',      salonRoutes.newservice);
router.get('/product',         salonRoutes.product);
router.get('/newproduct',      salonRoutes.newproduct);
router.get('/style',           salonRoutes.style);
router.get('/newstyle',        salonRoutes.newstyle);
router.get('/news',            salonRoutes.news);
router.get('/newnews',         salonRoutes.newnews);
router.get('/salonprofile',    salonRoutes.profile);

/*
Search Routes
*/
router.get('/find',             searchRoutes.index);
router.get('/single', 			searchRoutes.single);
router.get('/service', 			searchRoutes.service);
router.get('/hair', 			searchRoutes.hair);
router.get('/offer',		    searchRoutes.offer);
router.get('/appointment', 		searchRoutes.appointment);

module.exports=router;
