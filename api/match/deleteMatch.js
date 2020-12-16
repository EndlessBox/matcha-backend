var router = require('express').Router();
var matchService = require('../../services/matchService');
const validators = require('../../validators').properties;
const propertiesValidator = require('../../validators/functionalities/propertiesValidator');
const valuesValidator = require('../../validators/functionalities/valuesValidator');


router.delete('/', propertiesValidator(validators.createMatch), valuesValidator(validators.createMatch).valueValidator,async (req, res, next) => {
    try{
        let matchServ = new matchService();
        res.status(200).json(await matchServ.deleteMatch(req.body, req.user));
        
    }catch(err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})



module.exports = router;