var router = require('express').Router();
var propertiesValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var validators = require('../../validators').properties;
var locationService = require('../../services/locationService');


router.post('/', propertiesValidator(validators.createLocation), valueValidator(validators.createLocation).valueValidator, async (req, res, next) => {
    try {
        let locationServ = new locationService();
        let result = {
            status: 200,
            message: await locationServ.createUserLocation(req.body, req.user.id)
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        let err = new Error(error.message);
        err.status = error.status;
        next(err);
    }

})

module.exports = router;