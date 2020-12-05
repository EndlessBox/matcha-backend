var router = require('express').Router();
var propertiesValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var validators = require('../../validators').properties;


router.post('/', propertiesValidator(validators.createLocation), valueValidator(validators.createLocation).valueValidator, (req, res, next) => {
    try {
        console.log(req.body);
        res.send("Hello");
    } catch (error) {
        console.error(error);
        let err = new Error(error.message);
        err.status = error.status;
        next(err);
    }

})

module.exports = router;