var router = require('express').Router();
var blockService = require('../../services/blockService');
const validators = require('../../validators').properties;
const propertiesValidator = require('../../validators/functionalities/propertiesValidator');
const valuesValidator = require('../../validators/functionalities/valuesValidator');


router.post('/', propertiesValidator(validators.createBlock), valuesValidator(validators.createBlock).valueValidator, async (req, res, next) => {
    try{
        let blockServ = new blockService();
        await blockServ.createBlock(req.body, req.user);
        res.status(200).json({message: "Block created succefully.", status: 200});
    }catch(err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})



module.exports = router;