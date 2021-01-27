let MatchModel = require('../models/match');
let UserModel = require('../models/user');
let rankService = require('./rankService');
var xpConfig = require('../config/config').Experience;
var cacheService = new (require("./cacheService"))();

module.exports = class matchService {
    constructor(){}

    createMatch (query, user) {
        return new Promise(async (resolve, reject) => {
            try{

                let matchModel = new MatchModel();
                let userModel = new UserModel();
                let rankServ = new rankService();
                
                if (user.userName !== query.matcher)
                    return reject({message: "Matcher from outer source.", status: 403});

                let matcher = await userModel.getUserByAttribute('userName', query.matcher);
                let matched = await userModel.getUserByAttribute('userName', query.matched);

                await matchModel.createMatch({matcher: matcher.id, matched: matched.id});

                let newUserExperience = await rankServ.calculateUserExperience(xpConfig.match, matched, matched, 'MAX');
                await userModel.updateUserAttribute('experience', newUserExperience, matched.id);

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



    deleteMatch (query, user) {
        return new Promise(async(resolve, reject) => {
            try {
                
                let matchModel = new MatchModel();
                let userModel = new UserModel();
                let rankServ = new rankService();

                if (user.userName !== query.matcher)
                    return reject({message: "Unmatch from outer source.", status:403});
                let matched = await userModel.getUserByAttribute("userName", query.matched);
                let matcher = user;

                let result = await matchModel.deleteMatch(matcher.id, matched.id);
                let newUserExperience = matched.experience;
                if (result != 0)
                {
                    newUserExperience = await rankServ.calculateUserExperience(xpConfig.match * -1, matched, matcher, "MIN");
                    await userModel.updateUserAttribute('experience', newUserExperience, matched.id);
                }

                resolve({message: "Unmatched succefuly.", status: "200"});

            } catch (error) {
                reject(error)
            }
        })
    }

    getUserConnectedMatchesSocketsId (userId) {
        return new Promise(async(resolve, reject) => {
            try {

                let matchModel = new MatchModel();
                let userMatches = await matchModel.getUserMatches(userId);
                
                if (!userMatches.length)
                    return resolve([]);

                let result = userMatches.map(async match => {
                    let notifiedSocket = await cacheService.getUserSocketId(match.matcher === userId ? match.matched : match.matcher);
                    if (notifiedSocket)
                        return (notifiedSocket)
                })

                resolve(Promise.all(result));
            } catch(err) {
                reject(err);
            }
        })
    }
}