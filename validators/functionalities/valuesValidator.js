module.exports = (fields = null) => {
  var internValidator = (field, data) => {
    var regex = require("../index").regex;
    var isFloat = require("../index").isFloat;

    switch (field) {
      case "email":
        var mailRegex = new RegExp(regex.email);
        if (data.length > 255 || data.length < 6 || !mailRegex.test(data))
          return false;
        break;
      case "userName":
      case "liker":
      case "liked":
      case "consulter":
      case "consulted":
      case "blocker":
      case "blocked":
      case "matched":
      case "matcher":
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

      case "birthDate":
        var birthDateRegex = new RegExp(regex.birthDate);

        if (!birthDateRegex.test(data))
          return false;
        break;
      case "password":
        var passwordRegex = new RegExp(regex.password);
        if (data.length > 100 || data.length < 5 || !passwordRegex.test(data))
          return false;
        break;
      case "mailToken":
        var mailTokenRegex = new RegExp(regex.mailToken);
        if (data.length != 256 || !mailTokenRegex.test(data)) return false;
        break;
      case "genderId":
      case "offset":
      case "row_count":
      case "userId":
      case "orientationId":
        if (typeof data != "number") return false;
        break;
      case "bio":
        var bioRegex = new RegExp(regex.bio);
        if (!bioRegex.test(data)) return false;
        break;
      case "tags":
        var tagRegex = new RegExp(regex.tags);
        var invalideTags = [];

        if (typeof data === "string") data = [data];
        data.map((tag) => {
          if (!tagRegex.test(tag)) invalideTags.push(tag);
        });
        if (invalideTags.length) return false;
        break;
      case "latitude":
      case "longitude":
      case "altitude":
        if (isNaN(data)) return false;
        break;

      case "imageName":
        var imageNameRegex = new RegExp(regex.imageName);
        if (!imageNameRegex.test(data)) return false;
        break;

      case "tri":
        var keysRegex = new RegExp(regex.triKeys);
        var valuesRegex = new RegExp(regex.triValues);

        Object.keys(data).map((key) => {
          if (!keysRegex.test(key) || !valuesRegex.test(data[key])) {
            delete data[key];
            return false;
          }
        });
        break;

        case "filter":
          var keysRegex = new RegExp(regex.filterKeys);
  
          Object.keys(data).map((key) => {
            if (!keysRegex.test(key) || isNaN(data[key][0]) ||  isNaN(data[key][1]) || data[key][0] > data[key][1] ||
            data[key][0] < 0 || data[key][1] < 0 ) {
              delete data[key];
              return false;
            }
          });
          break;
      
    }
    return true;
  };

  var valueValidator = (req, res, next) => {
    var data = req.body;
    var invalidFields;
    var error;

    try {
      invalidFields = fields.filter(
        (field) => !internValidator(field, data[field])
      );
      if (invalidFields.length) {
        error = new Error(`Invalide Fields : ${invalidFields}.`);
        error.status = 400;
        next(error);
      }
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  /*
   *  pickData(req, res, next) :  run Validation only on fields wanted by the route. other fields are ignored.
   *                              and they will presiste in the request body.
   */

  var pickData = (req, res, next) => {
    var data = req.body;
    var invalidFields = [];

    try {
      Object.keys(data).map((key) => {
        if (fields.includes(key) && !internValidator(key, data[key]))
          invalidFields.push(key);
      });

      if (invalidFields.length) {
        error = new Error(`Invalide Fields : ${invalidFields}.`);
        error.status = 400;
        next(error);
      }
      next();
    } catch (err) {
      next(err);
    }
  };

  return {
    valueValidator: valueValidator,
    internValidator: internValidator,
    pickData: pickData,
  };
};
