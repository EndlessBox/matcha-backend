var userModel = require('../models/user');


module.exports = class userService {
    constructor() { }

    async signup(user) {
        return await new Promise(async (resolve, reject) => {
            try {
                let userId = await new userModel().createUser(user);
                resolve(userId);
            } catch (err) {
                reject(err);
            }

        })
    }
}