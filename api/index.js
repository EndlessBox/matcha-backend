const   express         =   require('express');
var     router          =   express.Router();
var     signupRoutes    =   require('./signup/signup');


router.use('/signup', signupRoutes);

module.exports = router;