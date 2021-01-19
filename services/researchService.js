var UserModel = require("../models/user");
var orientationService = require("./sexualOrientationService");
var GenderModel = require("../models/gender");
var OrientationModel = require("../models/orientation");
const locationService = require("./locationService");
const config = require('../config/config');
var suggestionService = require('./suggestionsService');

module.exports = class researchService {
  constructor() {}

  getUserResearch(user, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let orientationServ = new orientationService();
        let genderModel = new GenderModel();
        let orientationModel = new OrientationModel();
        let locationServ = new locationService();
        let suggestionServ = new suggestionService();

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
        

        let {keys, order} = payload.tri && Object.keys(payload.tri).length ? suggestionServ.manageTri(payload.tri) : suggestionServ.manageTri(config.DefaultSuggestionsTri);

        let result = await userModel.getUserByGenderAndOrientationAndDistance(
          userPreferableOrientation, user.id, connectedUserLocation, config.defaultUserAreaKm * 1000,
          keys, order, payload.filter && Object.keys(payload.filter).length ? payload.filter : null,
          payload.offset, payload.row_count, 1
        );
      resolve(result);
      
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
};