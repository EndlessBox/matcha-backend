var router = require('express').Router();
var consultationService = require('../../services/consultationService');



router.get('/', async (req, res, next) => {
    try{
        let consultationServ = new consultationService();
        res.status(200).json(await consultationServ.getUserConsultedHistory(req.user));
        
    }catch(err) {
        let error = new Error(err.message);
        error.status = err.status || 500;
        next(error);
    }
})



module.exports = router;