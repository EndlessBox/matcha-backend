var userModel = require('../models/user');


module.exports = class userService {
    constructor() { }

    async signup(user) {
        return await new Promise(async (resolve, reject) => {
            let userMod = new userModel();
            try {
                var result = await userMod.createUser(user);
                resolve(result);
            } catch (err) {
                reject(err);
            }

        })
    }
}