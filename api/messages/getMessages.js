var router = require('express').Router()
var messageService = require('../../services/messageService');
var propertiesValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var validators = require('../../validators').properties;

router.post('/', propertiesValidator(validators.getMesssages), valueValidator(validators.getMesssages).valueValidator, async (req, res, next) => {
    try {
        let messageServ = new messageService();

        let result = await messageServ.getuserlastMessages(req.body, req.user); 
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

module.exports = router;