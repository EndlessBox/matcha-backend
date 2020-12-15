var LikeModel = require('../models/like');
var UserModel = require('../models/user');
var RankModel = require('../models/rank');
var xpConfig = require('../config/config').Experience;



module.exports = class likeService {
    constructor(){}

    createLike (payload, user) {
        return new Promise(async (resolve, reject) => {
            try {
                let likeModel = new LikeModel();
                let userModel = new UserModel();
                let rankModel = new RankModel();


                if (user.userName !== payload.liker)
                    return reject({message: "Like from outer source.", status: 403});
                
                    let liker = await userModel.getUserByAttribute('userName', payload.liker);
                let liked = await userModel.getUserByAttribute('userName', payload.liked);
                    
                let likerRank = await rankModel.getUserRank(liker.rank);
                let newUserExperience = user.experience + xpConfig.calculate(xpConfig.like, likerRank.reankValue);

                await userModel.updateUserAttribute('experience', user.experience + xpConfig.calculate())
                
                
                if (!liker || !liked)
                    return reject({message: "Invalide user.", status: 403});
                let likeId = await likeModel.createLike({liker: liker.id, liked: liked.id});
                resolve(likeId);

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

    getUserLikedHistory(user) {
        return new Promise(async (resolve, reject) => {
            try {
                let likeModel = new LikeModel();
                let results = await likeModel.getLikedHistoryByUserId(user.id);
                if (!results.length)
                    return resolve({message: "No likes found.", status:200});
                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }

}