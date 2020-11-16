module.exports = (fields) => {
  return (req, res, next) => {
    var regex = require("../index").regex;
    var data = req.body;
    var invalidFields = [];
    var error;

    fields.map((field) => {
      switch (field) {
        case "email":
          var mailRegex = new RegExp(regex.email);
          var email = data[field];
          if (email.length > 255 || email.length < 6 || !mailRegex.test(email))
            invalidFields.push(field);
          break;
        case "userName":
          var userNameRegex = new RegExp(regex.userName);
          var userName = data[field];
          if (
            userName.length > 100 ||
            userName.length < 5 ||
            !userNameRegex.test(userName)
          )
            invalidFields.push(field);
          break;
        case "firstName":
          var firstNameRegex = new RegExp(regex.firstName);
          var firstName = data[field];
          if (
            firstName.length > 100 ||
            firstName.length < 5 ||
            !firstNameRegex.test(firstName)
          )
            invalidFields.push(field);
          break;
        case "lastName":
          var lastNameRegex = new RegExp(regex.lastName);
          var lastName = data[field];
          if (
            lastName.length > 100 ||
            lastName.length < 5 ||
            !lastNameRegex.test(lastName)
          )
            invalidFields.push(field);
          break;
        case "password":
          var passwordRegex = new RegExp(regex.password);
          var password = data[field];
          if (
            password.length > 100 ||
            password.length < 5 ||
            !passwordRegex.test(password)
          )
            invalidFields.push(field);
          break;
      }
    });
    if (invalidFields.length) {
      error = new Error(`Invalide Fields : ${invalidFields}`);
      error.status = 400;
      next(error);
    }
    next();
  };
};
