var router = require('express').Router();
var validators = require('../../validators').properties;
var propValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var userService = require('../../services/userService');


router.post('/', propValidator(validators.signIn), valueValidator(validators.signIn).valueValidator, async (req, res, next) => {
    try {
        var response = {
            status: 200,
            ...await new userService().signIn(req.body),
            message: 'signed in succefully.'
        }

        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})

module.exports = router;