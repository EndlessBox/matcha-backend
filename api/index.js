const express = require('express');
var router = express.Router();
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


var path = require('path');
var multer = require('multer');
var upload = multer({dest:  path.join( __dirname ,'uploads')});

router.use('/signup', signupRoutes);
router.use('/mailActivation', emailActivationRoutes);
router.use('/signIn', signInRoutes);
router.use('/generateAccessToken', generateAccessToken)
router.use('/forgotPassword', forgotPassword);
router.use('/resetPassword', resetPassword);
router.use('/logout', authentication, logout);

router.use('/updateProfile',authentication, updateProfile);


// router.use('/updateProfile',authentication, upload.array('images', 5) , updateProfile);

/*
 *  Need to remove this route, just for testing ! 
 */
router.post('/testAuth', authService().checkAccessToken, (req, res, next) => res.send(req.body) );

module.exports = router;