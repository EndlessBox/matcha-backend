var router = require('express').Router();
var locationService = require('../../services/locationService');


router.get('/',  async (req, res, next) => {
    try {
        let locationServ = new locationService();
        res.status(200).json(await locationServ.getUserLocation(req.user.id));
    } catch (error) {
        console.error(error);
        let err = new Error(error.message);
        err.status = error.status;
        next(err);
    }

})

module.exports = router;