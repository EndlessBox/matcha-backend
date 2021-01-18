var router = require('express').Router();
var matchService = require('../../services/matchService');
const validators = require('../../validators').properties;
const propertiesValidator = require('../../validators/functionalities/propertiesValidator');
const valuesValidator = require('../../validators/functionalities/valuesValidator');


router.post('/', propertiesValidator(validators.createMatch), valuesValidator(validators.createMatch).valueValidator, async (req, res, next) => {
    try{
        let matchServ = new matchService();
        await matchServ.createMatch(req.body, req.user);
        res.status(200).json({message: "Match created succefully.", status: 200});
    }catch(err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})



module.exports = router;