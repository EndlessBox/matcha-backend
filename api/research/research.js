var router = require('express').Router()
var researchService = require('../../services/researchService');
const validators = require('../../validators').properties;
const valuesValidator = require('../../validators/functionalities/valuesValidator');
const paginationValidator = require('../../validators/functionalities/paginationValidator');



router.post('/', paginationValidator(), valuesValidator(validators.suggestions).pickData, async (req,res, next) => {
    try {
        let researchServ = new researchService();
        let result = await researchServ.getUserResearch(req.user, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})






module.exports = router;