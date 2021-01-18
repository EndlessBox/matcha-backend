var router = require('express').Router()
var suggestionsService = require('../../services/suggestionsService');
const validators = require('../../validators').properties;
const valuesValidator = require('../../validators/functionalities/valuesValidator');



router.post('/', valuesValidator(validators.suggestions).pickData, async (req,res, next) => {
    try {
        let suggestionsServ = new suggestionsService();
        let result = await suggestionsServ.getUserSuggestions(req.user, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})






module.exports = router;