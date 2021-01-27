var router = require('express').Router();
var propertiesValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var validators = require('../../validators/index').properties;
var locationService = require('../../services/locationService');

router.put('/', propertiesValidator(validators.createLocation), valueValidator(validators.createLocation).pickData, async (req, res, next) => {
    try {

        let locationServ = new locationService();

        res.status(200).json(await locationServ.updateLocation(req.body, req.user));
        
    } catch(err) {
        next(err);
    }  
})



module.exports = router;