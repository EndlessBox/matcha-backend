var LocationModel = require('../models/location');
var UserModel = require('../models/user');

module.exports = class locationService {
    constructor(){}

    createUserLocation (payload, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                let locationModel = new LocationModel();
                let userModel = new UserModel();

                let locationId = await locationModel.createLocation(payload);
                await userModel.updateUserAttribute('locationId', locationId, userId);
                resolve("location created succefully");

            }catch(err){
                reject(err);
            }
        })
    }
}