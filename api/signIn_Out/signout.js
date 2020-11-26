var router = require('express').Router();
var validators = require('../../validators').properties;
var valueValidators = require('../../validators/functionalities/valuesValidator');
var propValidators = require('../../validators/functionalities//propertiesValidator');
var userService = require('../../services/userService');
var config = require('../../config/config')



router.post('/', propValidators(validators.logOut), valueValidators(validators.logOut).valueValidator, async (req, res, next) => {
    try {
        var userServ = new userService();

        let result = await userServ.logout(req.body);
        res.cookie('refreshToken', {refreshToken : null}, {expires: Date().now, httpOnly: true, secure: config.nodeEnv == 'Production'});
        res.status(200).json(result);

    }
    catch (err) {
        console.error(err);
        next(err);
    }
})



module.exports = router;