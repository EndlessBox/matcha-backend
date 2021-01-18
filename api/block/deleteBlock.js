var router = require('express').Router();
var propertiesValidator = require('../../validators/functionalities/propertiesValidator');
var valuesValidator = require('../../validators/functionalities/valuesValidator');
var validators = require('../../validators').properties;
var blockService = require('../../services/blockService');



router.delete('/',propertiesValidator(validators.createBlock), valuesValidator(validators.createBlock).valueValidator, async (req, res, next) => {
    try {
        let blockServ = new blockService();
        let result = await blockServ.deleteBlock(req.body, req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})




module.exports = router;