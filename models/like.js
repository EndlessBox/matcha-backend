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
                resolve({result : results.insertedId, date: like['dateOfLike']});
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

    deleteLike(likerId, likedId) {
        return new Promise(async (resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: "DELETE FROM `likes` l WHERE l.liker=? AND l.liked=?"
                }, [likerId, likedId]);

                resolve({result: results.affectedRows, date: new Date()});
            } catch (error) {
                reject(error)
            }
        })
    }
}