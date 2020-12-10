var OrientationModel = require('../models/orientation');
var UserModel = require('../models/user');
var config = require('../config/config');

module.exports = class sexualOrientationService {

    constructor(){};


    async manageOrientation(userData, user) {
        let orientationModel = new OrientationModel();
        let userModel = new UserModel();
        let orientation = userData.orientation || config.defaultOrientation;
    
        let result = await orientationModel.getOrientationByAttribute(
          "orientation",
          orientation
        );
        if (!result) throw "Invalide orientation.";
        await userModel.updateUserAttribute("orientationId", result.id, user.id);
        delete userData.orientation;
      }

      preferableOrientations(sexualOrientation, gender){
          sexualOrientation = sexualOrientation.toLowerCase();
          gender = gender.toLowerCase();

        if (sexualOrientation === "bisexual")
        {  
            if (gender === "male")
                return [{gender: "Male", orientations: ["homosexual", "bisexual"]},{gender:  "Female", orientations: ["bisexual", "heterosexual"]}]
            if (gender === "female")
                return [{gender: "Male", orientations: ["bisexual", "heterosexual"]}, {gender: "Female", orientations:["homosexual", "bisexual"]}]
        }
        else if (sexualOrientation === "homosexual")
        {
            if (gender === "male")
                return [{gender: "Male", orientations: ["homosexual", "bisexual"]}]
            if (gender === "female")
                return [{gender: "Female", orientations: ["homosexual", "bisexual"]}]
        }
        else if (sexualOrientation === "heterosexual")
        {
            if (gender === "male")
                return [{gender: "Female", orientations: ["heterosexual", "bisexual"]}]
            if (gender === "female")
                return [{gender: "Male", orientations: ["heterosexual", "bisexual"]}]
        }   
      }

}