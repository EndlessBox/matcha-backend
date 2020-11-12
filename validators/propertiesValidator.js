module.exports = function (fields) {
  return (req, res, next) => {
    var data = req.body;
    var missingFields;

    missingFields = fields.filter((field) => !data[field]);
    if (missingFields.length) return res.status(400).send(missingFields);
    next();
  };
};
