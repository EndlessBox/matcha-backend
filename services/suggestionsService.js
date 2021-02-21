var UserModel = require("../models/user");
var orientationService = require("./sexualOrientationService");
var GenderModel = require("../models/gender");
var OrientationModel = require("../models/orientation");
const locationService = require("./locationService");
const config = require('../config/config');

module.exports = class suggestionsService {
  constructor() {}



  manageTri(payload){
    let keys = [];
    let order = [];

    Object.keys(payload).map(key => {
      keys.push(key);
      order.push(payload[key]);
    })

    return {
      keys: keys, 
      order: order
    }
  }


  getUserSuggestions(user, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let orientationServ = new orientationService();
        let genderModel = new GenderModel();
        let orientationModel = new OrientationModel();
        let locationServ = new locationService();

        console.log({user});
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
        

        let {keys, order} = payload.tri && Object.keys(payload.tri).length ? this.manageTri(payload.tri) : this.manageTri(config.DefaultSuggestionsTri);

        let result = await userModel.getUserByGenderAndOrientationAndDistance(
          userPreferableOrientation, user.id, connectedUserLocation, config.defaultUserAreaKm * 1000,
          keys, order, payload.filter && Object.keys(payload.filter).length ? payload.filter : null,
          payload.offset, payload.row_count
        );
      resolve(result);
      
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
};
