const express = require('express');
var router = express.Router();
var signupRoutes = require('./signup/signup');
var emailActivationRoutes = require('./signup/mailActivation');


router.use('/signup', signupRoutes);
router.use('/mailActivation', emailActivationRoutes);

module.exports = router;