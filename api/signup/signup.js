var express = require('express');
var router = express.Router();
var validators = require('../../validators');
var propValidator = require('../../validators/propertiesValidator');
var userService = require('../../services/userService');


router.post('/', propValidator(validators.signUpProperties), async (req, res, next) => {
    var userServ = new userService();
    try {
        var result = await userServ.signup(req.body);
        var response = {
            status: 200,
            userId: result
        }
        res.status(200).json(response);
    }
    catch (err) {
        let error = new Error(err.message);
        error.status = 400;
        next(error);
    }
});

module.exports = router;

