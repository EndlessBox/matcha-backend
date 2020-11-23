var router = require("express").Router();
var authService = require("../../services/authenticationService");

router.get("/", async (req, res, next) => {
  try {
    let refreshToken = req.cookies.refreshToken ? req.cookies.refreshToken.refreshToken : null;
    if (!refreshToken)
      next({message: "unauthorized.", status:"401"})
    let response = await authService().generateAccessToken(refreshToken)
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
