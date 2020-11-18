var router = require('express').Router();
var validators = require('../../validators').properties;
const userModel = require('../../models/user');
var propValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var userService = require('../../services/userService');

router.post('/',propValidator(validators.mailValidation), valueValidator(validators.mailValidation).valueValidator, async (req, res, next) => {
    try{
        var userServ = new userService();
        await userServ.activateEmail(req.body);
        var response  = {
            status: 200,
            message: "Account activated succefully."
        }
        res.status(200).json(response);
    }
    catch(err){
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})

module.exports = router;