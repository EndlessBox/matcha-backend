var router = require('express').Router();
var consultationService = require('../../services/consultationService');
const validators = require('../../validators').properties;
const propertiesValidator = require('../../validators/functionalities/propertiesValidator');
const valuesValidator = require('../../validators/functionalities/valuesValidator');


router.post('/', propertiesValidator(validators.createConsultation), valuesValidator(validators.createLike).valueValidator, async (req, res, next) => {
    try{
        let consultationServ = new consultationService();
        await consultationServ.createConsultation(req.body, req.user);
        res.status(200).json({message: "Consultation created succefully.", status: 200});
    }catch(err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})



module.exports = router;