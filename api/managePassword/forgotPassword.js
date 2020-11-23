var router = require('express').Router();
var userService = require('../../services/userService');
var validators = require('../../validators').properties;
var propValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');


router.post('/', propValidator(validators.forgetPassword), valueValidator(validators.forgetPassword).valueValidator,async (req, res, next) => {
    try {
        let userServ = new userService();
        result = await userServ.forgotPassword(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        let err = new Error(error.message);
        err.status = error.status;
        next(error);
    }
})



module.exports = router;