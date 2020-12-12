var router = require('express').Router();
var userService = require('../../services/userService');


router.get('/', async (req,res, next) => {
    try {
        let userServ = new userService();

        let response = await userServ.getUserInfo(req.user);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})



module.exports = router;