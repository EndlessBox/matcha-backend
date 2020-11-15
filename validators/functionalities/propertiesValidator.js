module.exports = function (fields) {
  return (req, res, next) => {
    var data = req.body;
    var missingFields;

    missingFields = fields.filter((field) => !data[field]);
    if (missingFields.length)
    {
      let error = new Error(`Missing Fields : ${missingFields.toString()}.`);
      error.status = 400;
      return next(error);
    }
    next();
  };
};
