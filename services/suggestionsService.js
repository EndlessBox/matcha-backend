var UserModel = require("../models/user");
var orientationService = require("./sexualOrientationService");
var GenderModel = require("../models/gender");
var OrientationModel = require("../models/orientation");
const locationService = require("./locationService");
const config = require('../config/config');

module.exports = class suggestionsService {
  constructor() {}

  getUserSuggestions(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let orientationServ = new orientationService();
        let genderModel = new GenderModel();
        let orientationModel = new OrientationModel();
        let locationServ = new locationService();

        let userGender = await genderModel.getGenderByAttribute(
          "id",
          user.genderId
        );
        let userOrientation = await orientationModel.getOrientationByAttribute(
          "id",
          user.orientationId
        );

        let userPreferableOrientation = orientationServ.preferableOrientations(
          userOrientation.orientation,
          userGender.gender
        );
        let connectedUserLocation = await locationServ.getUserLocation(user.id);
        
        let result = await userModel.getUserByGenderAndOrientationAndDistance(
          userPreferableOrientation, user.id, connectedUserLocation, config.defaultUserAreaKm * 1000,
          ['distance', 'communTags'],['ASC', 'DESC']
        );
      resolve(result);
      
      } catch (err) {
        reject(err);
      }
    });
  }
};
