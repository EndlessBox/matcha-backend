var router = require('express').Router();
var userService = require('../../services/userService');
var validators = require('../../validators').properties;
var propValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');



router.post('/', valueValidator(validators.updateUser).pickData, async (req, res, next) => {
    try {
    let userServ = new userService();
    let result = await userServ.updateUser(req.body, req.user, req.files ? req.files : null);
    res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
})



module.exports = router;