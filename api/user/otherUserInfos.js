var router = require('express').Router();
var userService = require('../../services/userService');

router.get('/:id', async (req, res, next) => {
    try {
        let userServ = new userService();
        let response = await userServ.otherUserInfos(req.user, req.params.id);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})


module.exports = router;