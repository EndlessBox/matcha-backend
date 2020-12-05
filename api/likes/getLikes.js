var router = require('express').Router();
var likeService = require('../../services/likeService');



router.get('/', async (req, res, next) => {
    try{
        let likeServ = new likeService();
        res.status(200).json(await likeServ.getUserLikedHistory(req.user));
        
    }catch(err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})



module.exports = router;