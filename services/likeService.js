var LikeModel = require('../models/like');
var UserModel = require('../models/user');
var ImageModel = require('../models/image');
var rankService = require('./rankService');
var xpConfig = require('../config/config').Experience;




module.exports = class likeService {
    constructor(){}

    createLike (payload, user) {
        return new Promise(async (resolve, reject) => {
            try {
                let likeModel = new LikeModel();
                let userModel = new UserModel();
                let imageModel = new ImageModel();
                let rankServ = new rankService();


                if (user.userName !== payload.liker)
                    return reject({message: "Like from outer source.", status: 403});
                
                let liker = await userModel.getUserByAttribute('userName', payload.liker);
                let liked = await userModel.getUserByAttribute('userName', payload.liked);
                
                let likerImageCount = await imageModel.getImagesCountByAttribute('userId', liker.id);
                

                
                if (!liker || !liked)
                    return reject({message: "Invalide user.", status: 403});

                if (!likerImageCount)
                    return reject({message: `Unauthorized, user '${liker.userName}' must upload at least one picture.`, status: 403});

                let likeId = await likeModel.createLike({liker: liker.id, liked: liked.id});



                /*
                 *  After creating like were updating the liked value with the like amout + rankValue of the liker as percentage.
                 */
                let newUserExperience = await rankServ.calculateUserExperience(xpConfig.like, liked, liker, 'Max');
                await userModel.updateUserAttribute('experience', newUserExperience, liked.id);


                resolve(likeId);

            } catch(err) {
                console.error(err);
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

    deleteLike(payload, user) {
        return new Promise(async(resolve, reject) => {
            try{
                let userModel = new UserModel();
                let likeModel = new LikeModel();
                let rankServ = new rankService();

                let liker = await userModel.getUserByAttribute('userName', payload.liker);
                let liked = await userModel.getUserByAttribute('userName', payload.liked);
                if (!liker | !liked)
                    return resolve({message: "user not found", status:404});
                    
                await likeModel.deleteLike(liker.id, liked.id)
                
                let newUserExperience = await rankServ.calculateUserExperience(xpConfig.dislike, liked, liker, 'MIN')
                await userModel.updateUserAttribute('experience', newUserExperience, liked.id);

                resolve({message: "user unliked succefully", status:200});

            } catch(err) {
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