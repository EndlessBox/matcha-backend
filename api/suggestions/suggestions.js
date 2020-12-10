var router = require('express').Router()
var suggestionsService = require('../../services/suggestionsService');



router.get('/', async (req,res, next) => {
    try {
        let suggestionsServ = new suggestionsService();
        let result = await suggestionsServ.getUserSuggestions(req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})






module.exports = router;