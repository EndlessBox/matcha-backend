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

        let result = await userModel.getUserByGenderAndOrientation(
          userPreferableOrientation, user.id
        );

      let connectedUserLocation = await locationServ.getUserLocation(user.id);


      // I have a problem here filtring not working ! 
      result = await Promise.all(result.map(async suggestion => {
        let userLocation = await locationServ.getUserLocation(suggestion.id);
        let distance = locationServ.calculateDistance(connectedUserLocation, userLocation);

        if(distance <= config.defaultUserAreaKm) {
          suggestion['distance'] = distance;
          delete suggestion.id;
          return suggestion          
        }
        else return null;
      }))

      result = result.filter(suggestion => suggestion != null)

      resolve(result);
      
      } catch (err) {
        reject(err);
      }
    });
  }
};
