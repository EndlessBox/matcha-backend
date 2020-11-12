var express = require('express');
var router = express.Router();


router.post('/', (req, res) => res.status(200).json(req.body));

module.exports = router;

