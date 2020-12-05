var router = require('express').Router();
var likeService = require('../../services/likeService');
const validators = require('../../validators').properties;
const propertiesValidator = require('../../validators/functionalities/propertiesValidator');
const valuesValidator = require('../../validators/functionalities/valuesValidator');


router.post('/', propertiesValidator(validators.createLike), valuesValidator(validators.createLike).valueValidator, async (req, res, next) => {
    try{
        let likeServ = new likeService();
        await likeServ.createLike(req.body, req.user);
        res.status(200).json({message: "Like created succefully.", status: 200});
    }catch(err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})



module.exports = router;