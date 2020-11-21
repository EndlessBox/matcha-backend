var router = require('express').Router();
var validators = require('../../validators').properties;
var propValidator = require('../../validators/functionalities/propertiesValidator');
var valueValidator = require('../../validators/functionalities/valuesValidator');
var userService = require('../../services/userService');
var config = require('../../config/config');

/*
 *  Cookie 'refreshToken' will accept only https connections in 'Production' mode.
 */
router.post('/', propValidator(validators.signIn), valueValidator(validators.signIn).valueValidator, async (req, res, next) => {
    try {
        
        var userServ = new userService();
        var tokens = await userServ.signIn(req.body);
        var response = {
            status: 200,
            accessToken: tokens.accessToken,
            message: 'signed in succefully.'
        }
        res.cookie('refreshToken', {refreshToken : tokens.refreshToken}, {expires: Date().now + 24 * 60 * 60, httpOnly: true, secure: config.nodeEnv == 'Production'});

        res.status(200).send(response);
    } catch (err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})

module.exports = router;