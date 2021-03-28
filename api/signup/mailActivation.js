var router = require("express").Router();
var userService = require("../../services/userService");

router.get("/:token", async (req, res, next) => {
  try {
    var userServ = new userService();
    await userServ.activateEmail(req.params.token);
    var response = {
      status: 200,
      message: "Account activated succefully.",
    };
    res.status(200).json(response);
  } catch (err) {
    let error = new Error(err.message);
    error.status = err.status || 500;
    next(error);
  }
});

module.exports = router;
