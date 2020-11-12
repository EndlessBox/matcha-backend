var express = require('express');
var router = express.Router();
var validators = require('../../validators');
var propValidator = require('../../validators/propertiesValidator');
var userService = require('../../services/userService');


router.post('/', propValidator(validators.signUpProperties), (req, res) => {
    var userServ = new userService();
    userServ.signup(req.body)
});

module.exports = router;

