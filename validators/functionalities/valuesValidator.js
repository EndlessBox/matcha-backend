module.exports = (fields = null) => {
  var internValidator = (field, data) => {
    var regex = require("../index").regex;
    
    switch (field) {
      case "email":
        var mailRegex = new RegExp(regex.email);
        if (data.length > 255 || data.length < 6 || !mailRegex.test(data))
          return false;
        break;
      case "userName":
        var userNameRegex = new RegExp(regex.userName);
        if (data.length > 100 || data.length < 5 || !userNameRegex.test(data))
          return false;
        break;
      case "firstName":
        var firstNameRegex = new RegExp(regex.firstName);
        if (data.length > 100 || data.length < 5 || !firstNameRegex.test(data))
          return false;
        break;
      case "lastName":
        var lastNameRegex = new RegExp(regex.lastName);
        if (data.length > 100 || data.length < 5 || !lastNameRegex.test(data))
          return false;
        break;
      case "password":
        var passwordRegex = new RegExp(regex.password);
        if (data.length > 100 || data.length < 5 || !passwordRegex.test(data))
          return false;
        break;
      case "mailToken":
        var mailTokenRegex = new RegExp(regex.mailToken);
        if (data.length != 256 || !mailTokenRegex.test(data))
          return false;
        break;
    }
    return true;
  };

  var valueValidator = (req, res, next) => {
    var data = req.body;
    var invalidFields;
    var error;

    invalidFields = fields.filter(
      (field) => !internValidator(field, data[field])
    );
    if (invalidFields.length) {
      error = new Error(`Invalide Fields : ${invalidFields}.`);
      error.status = 400;
      next(error);
    }
    next();
  };

  return { valueValidator: valueValidator, internValidator: internValidator };
};
