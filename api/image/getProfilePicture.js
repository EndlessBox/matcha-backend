var router = require('express').Router();
var imageService = require('../../services/imageService');


router.get('/', async (req, res, next) => {
    try {
        
        let imageServ = new imageService();
        let profileImage = await imageServ.getUserProfilePicture(req.user.id)

        res.status(200).json({profilePicture: profileImage?.imageName ? profileImage.imageName: null});

    } catch (error) {
        let err = new Error(error.message);
        err.status = error.status;
        next(error);
    }
})


module.exports = router;