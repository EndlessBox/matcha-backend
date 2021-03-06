let BlockModel = require('../models/block');
let UserModel = require('../models/user');
let rankService = require('./rankService');
var xpConfig = require('../config/config').Experience;

module.exports = class blockService {
    constructor(){}

    createBlock (query, user) {
        return new Promise(async (resolve, reject) => {
            try{

                let blockModel = new BlockModel();
                let userModel = new UserModel();
                let rankServ = new rankService();
                
                if (user.userName !== query.blocker)
                    return reject({message: "Block from outer source.", status: 403});

                let blocker = await userModel.getUserByAttribute('userName', query.blocker);
                let blocked = await userModel.getUserByAttribute('userName', query.blocked);

                await blockModel.createBlock({blocker: blocker.id, blocked: blocked.id});

                let newUserExperience = await rankServ.calculateUserExperience(xpConfig.block, blocked, blocker, 'MIN');
                await userModel.updateUserAttribute('experience', newUserExperience, blocked.id);

                resolve(true);
            } catch(err) {
                if (err.code === 'ER_DUP_ENTRY' && err.errno == 1062)
                {
                    console.error(new Date().toLocaleDateString(),
                    err.sqlMessage,
                    "-- UserName: " + user.userName);
                    return resolve({message: "Nothing changed"});
                }
                reject(err);
            }
        })
    }



    deleteBlock (query, user) {
        return new Promise(async(resolve, reject) => {
            try {
                
                let blockModel = new BlockModel();
                let userModel = new UserModel();
                let rankServ = new rankService();

                if (user.userName !== query.blocker)
                    return reject({message: "Unblock from outer source.", status:403});
                let blocked = await userModel.getUserByAttribute("userName", query.blocked);
                let blocker = user;

                let result = await blockModel.deleteBlock(blocker.id, blocked.id);
                let newUserExperience = blocked.experience;
                if (result != 0)
                {
                    newUserExperience = await rankServ.calculateUserExperience(xpConfig.block * -1, blocked, blocker, "MAX");
                    await userModel.updateUserAttribute('experience', newUserExperience, blocked.id);
                }

                resolve({message: "Unblocked succefuly.", status: "200"});

            } catch (error) {
                reject(error)
            }
        })
    }
}