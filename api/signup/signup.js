var express = require('express');
var router = express.Router();
var validators = require('../../validators');
var propValidator = require('../../validators/propertiesValidator');
var userService = require('../../services/userService');


router.post('/', propValidator(validators.signUpProperties), async (req, res) => {
    var userServ = new userService();
    await userServ.signup(req.body);
    res.status(200).send("good");
});

module.exports = router;

