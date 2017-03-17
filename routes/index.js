
var express        = require('express');
var router         = express.Router();
var homeRoutes     = require('./home');
var landRoutes     = require('./land');
var userRoutes     = require('./user');
var salonRoutes     = require('./salon');

router.get('/',        homeRoutes.index);
router.get('/landing', landRoutes.index);

/*
Salon Routes
*/
router.get('/salonindex', salonRoutes.index);
router.get('/salonnew', salonRoutes.new);
router.get('/salonedit', salonRoutes.edit);
router.get('/salonprofile', salonRoutes.profile);

/*
User Routes
*/
router.get('/userindex', userRoutes.index);
router.get('/signup', userRoutes.signup);
router.get('/userprofile', userRoutes.profile);
module.exports=router;
