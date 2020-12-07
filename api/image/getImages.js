var router = require('express').Router();
var imageService = require('../../services/imageService');


router.get('/', async (req, res, next) => {
    try {
        
        let imageServ = new imageService();

        res.status(200).json(await imageServ.getUserImages(req.user.id));

    } catch (error) {
        let err = new Error(error.message);
        err.status = error.status;
        next(error);
    }
})


module.exports = router;