var router = require('express').Router();
var propertiesValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var validators = require('../../validators').properties;
var imageService = require('../../services/imageService');

router.delete('/', propertiesValidator(validators.deleteImage), valueValidator(validators.deleteImage).valueValidator, async (req, res, next) => {
    try {
        let imageServ = new imageService();
        let result = {
            status: 200,
            message: await imageServ.deleteImage(req.body)
        }
        res.status(200).json(result);
    }catch(error) {
        let err = new Error(error.message);
        err.status = error.status || 500;
        next(err);
    }
})



module.exports = router;