var router = require('express').Router();
var validators = require('../../validators').properties;
var propValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');


router.post('/', propValidator(validators.signIn), valueValidator(validators.signIn).valueValidator, async (req, res, next) => {
    try {
        var response = {
            status: 200,
            token: '',
            message: 'signed in succefully.'
        }
    } catch (err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})