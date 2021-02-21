var router = require('express').Router();
var matchService = require('../../services/matchService');


router.get('/', async (req, res, next) => {
    try {
        let matchServ = new matchService();

        let result = await matchServ.getUserMatches(req.user.id);

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
})




module.exports = router;