var express = require('express');
var router = express.Router();
var validators = require('../../validators').properties;
var propValidator = require('../../validators/functionalities/propertiesValidator');
var validator = require('../../validators/functionalities/valuesValidator');
var userService = require('../../services/userService');


router.post('/', propValidator(validators.signUpProperties), validator(validators.signUpProperties).valueValidator, async (req, res, next) => {
    try {
        var response = {
            status: 200,
            userId: await new userService().signup(req.body),
            message: 'signed up succefully, please verifiy your email'
        }
        res.status(200).json(response);
    }
    catch (err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
});

module.exports = router;

