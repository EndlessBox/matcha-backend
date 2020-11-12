var userModel = require('../models/user');


module.exports = class userService 
{
    constructor() {}

    async signup(user) {
        let userMod = new userModel();
        await userMod.createUser(user);
    }
}