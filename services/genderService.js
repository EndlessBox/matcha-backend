const { reject } = require("bcrypt/promises")

var GenderModel = require('../models/gender');

module.exports = class genderService {
    constructor() {}


    getUserGender(userId) {
        return new Promise(async(resolve, reject) => {
            try{
                let genderModel = new GenderModel();
                let result = await genderModel.getUserGender(userId)
                resolve(result.gender);
            }catch(err) {
                reject(err);
            }
        })
    }



}