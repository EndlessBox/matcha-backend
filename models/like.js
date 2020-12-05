var dbConnection = require('./dbConnection')().getDb();




module.exports = class likeModel {

    constructor(){}

    createLike (like) {
        return new Promise(async (resolve, reject) => {
            try {
                like['id'] = null;
                like['dateOfLike'] = new Date();
                let [results, _] = await dbConnection.query({
                    sql: "INSERT INTO `likes` SET ?",
                    timeout: 40000
                },
                like)
                resolve(results.insertedId);
            } catch (error) {
                reject(error);
            }
        })
    }



    getLikedHistoryByUserId(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let [results, _] = await dbConnection.query({
                    sql: "select u.userName, u.firstName, u.lastName, l.dateOfLike from user u inner JOIN likes l on u.id=l.liker where l.liked=?"
                }, userId);
                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }
}