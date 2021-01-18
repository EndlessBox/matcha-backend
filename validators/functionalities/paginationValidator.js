var regex = require("../index").regex;

module.exports = function () {
    return (req, res, next) => {
      var data = req.body;
      var off_countRegex = new RegExp(regex.offset);
      

      
      if (!off_countRegex.test(data.offset) || !off_countRegex.test(data.row_count))
      {
        let error = new Error(`Missing Or/And Incorrect Fields : offset Or count, pagination parameters are missing.`);
        error.status = 400;
        return next(error);
      }
      next();
    };
  };
  