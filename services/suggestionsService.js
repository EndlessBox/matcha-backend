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
      result = await result.filter(async suggestion => { 
        let userLocation = await locationServ.getUserLocation(suggestion.id);

        return locationServ.calculateDistance(connectedUserLocation, userLocation) <= config.defaultUserAreaKm;
            
      })

      console.log(result);

      result = Promise.all(result.map(async suggestion => {
        let userLocation = await locationServ.getUserLocation(suggestion.id);

        suggestion['distance'] = locationServ.calculateDistance(connectedUserLocation, userLocation);
        delete suggestion.id;
        return suggestion;
      }))
      resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
};
