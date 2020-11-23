var router = require('express').Router();
var validators = require('../../validators').properties;
var valuesValidator = require('../../validators/functionalities/valuesValidator');
var propValidator = require('../../validators/functionalities/propertiesValidator');
var userService = require('../../services/userService');


router.post('/', propValidator(validators.resetPassword), valuesValidator(validators.resetPassword).valueValidator, async (req, res, next) => {
    try {
        let userServ = new userService();
        let response = await userServ.updatePassword(req.body);;
        
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})



module.exports = router;