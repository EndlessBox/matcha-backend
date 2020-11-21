const express = require('express');
var router = express.Router();
var signupRoutes = require('./signUp/signup');
var emailActivationRoutes = require('./signUp/mailActivation');
var signInRoutes = require('./signIn/signin');
var authService = require('../services/authenticationService');

router.use('/signup', signupRoutes);
router.use('/mailActivation', emailActivationRoutes);
router.use('/signIn', signInRoutes);


/*
 *  Need to remove this route, just for testing ! 
 */
router.post('/testAuth', authService().checkAccessToken, (req, res, next) => res.send(req.body) );

module.exports = router;