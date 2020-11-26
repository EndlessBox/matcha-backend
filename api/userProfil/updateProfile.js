var router = require('express').Router();
var userService = require('../../services/userService');
var validators = require('../../validators').properties;
var propValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');



router.post('/',valueValidator(validators.updateUser).valueValidator, async (req, res, next) => {
    try {
    let userServ = new userService();
    let result = await userServ.updateUser(req.body);
    res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})



module.exports = router;