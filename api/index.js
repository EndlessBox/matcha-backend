const express = require('express');
var router = express.Router();
var signupRoutes = require('./signup/signup');
var emailActivationRoutes = require('./signup/mailActivation');
var signInRoutes = require('./signin/signin');
var authService = require('../services/authenticationService');
var generateAccessToken = require('./generateAccessToken/genereteAccessToken');
var forgotPassword = require('./managePassword/forgotPassword');
var resetPassword = require('./managePassword/resetPassword');

router.use('/signup', signupRoutes);
router.use('/mailActivation', emailActivationRoutes);
router.use('/signIn', signInRoutes);
router.use('/generateAccessToken', generateAccessToken)
router.use('/forgotPassword', forgotPassword);
router.use('/resetPassword', resetPassword);


/*
 *  Need to remove this route, just for testing ! 
 */
router.post('/testAuth', authService().checkAccessToken, (req, res, next) => res.send(req.body) );

module.exports = router;