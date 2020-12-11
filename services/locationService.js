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

    getUserLocation(userId) {
        return new Promise(async(resolve, reject) => {
            try {
                let locationModel = new LocationModel();
                let location = await locationModel.getUserLocation(userId);
                
                delete location['id'];
                resolve(location);
            } catch (error) {
                reject(error);
            }
        })
    }


    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    calculateDistance (location1, location2) {
        var earthRadiuskm = 6371;

        let dLatitude = this.degreesToRadians(location2.latitude - location1.latitude);
        let dLongitude =  this.degreesToRadians(location2.longitude - location1.longitude);
        
        let l1Latitude = this.degreesToRadians(location1.latitude);
        let l2Latitude = this.degreesToRadians(location2.latitude);

        let a = Math.pow(Math.sin(dLatitude/2),2) + Math.pow(Math.sin(dLongitude/2),2) * Math.cos(l1Latitude) * Math.cos(l2Latitude)
        
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return earthRadiuskm * c;
    }
}