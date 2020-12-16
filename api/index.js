const express = require('express');
var router = express.Router();
var multer = require('multer');
var storageService = require('../services/storageService');
var upload = multer({storage: storageService});
var authentication = require('../services/authenticationService')().checkAccessToken;
var signupRoutes = require('./signup/signup');
var emailActivationRoutes = require('./signup/mailActivation');
var signInRoutes = require('./signIn_Out/signin');
var authService = require('../services/authenticationService');
var generateAccessToken = require('./generateAccessToken/genereteAccessToken');
var forgotPassword = require('./managePassword/forgotPassword');
var resetPassword = require('./managePassword/resetPassword');
var logout = require('./signIn_Out/signout');
var updateProfile = require('./userProfil/updateProfile');
var createLike = require('./likes/createLike');
var getLikes = require('./likes/getLikes');
var deleteLikes = require('./likes/deleteLike');
var createConsultation = require('./consultations/createConsultation');
var getConsultations = require('./consultations/getConsultation');
var createLocation = require('./location/createLocation');
var getLocation = require('./location/getLocation');
var deleteImage = require('./image/deleteImage');
var getImages = require('./image/getImages');
var getSuggestions = require('./suggestions/suggestions');
var createBlock = require('./block/createBlock');
var deleteBlock = require('./block/deleteBlock');
var createMatch = require('./match/createMatch');
var deleteMatch = require('./match/deleteMatch');



router.use('/signup', signupRoutes);
router.use('/mailActivation', emailActivationRoutes);
router.use('/signIn', signInRoutes);
router.use('/generateAccessToken', generateAccessToken)
router.use('/forgotPassword', forgotPassword);
router.use('/resetPassword', resetPassword);
router.use('/logout', authentication, logout);
router.use('/updateProfile', authentication,  upload.array('images'), updateProfile);

router.use('/like', authentication, createLike);
router.use('/like', authentication, getLikes);
router.use('/like', authentication, deleteLikes);


router.use('/consultation', authentication, createConsultation);
router.use('/consultation', authentication, getConsultations);


router.use('/location', authentication, createLocation);
router.use('/location',authentication, getLocation);


router.use('/image', authentication, deleteImage);
router.use('/image', authentication, getImages);


router.use('/suggestions', authentication, getSuggestions);


router.use('/block', authentication, createBlock);
router.use('/block', authentication, deleteBlock);

router.use('/match', authentication, createMatch);
router.use('/match', authentication, deleteMatch);

/*
 *  Need to remove this route, just for testing ! 
 */
router.post('/testAuth', authService().checkAccessToken, (req, res, next) => res.send(req.body) );

module.exports = router;