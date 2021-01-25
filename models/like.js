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

    checkUsersConnection(user1Id, user2Id) {
        return new Promise(async (resolve, reject) => { 
            try{

                let [results, _] = await dbConnection.query({
                    sql: "SELECT Count(l.id) as count from `likes` l where (l.liker=? AND l.liked=?) OR (l.liker=? AND l.liked=?)"
                }, [user1Id, user2Id, user2Id, user1Id]);

                resolve(results[0].count);
                    
            } catch(err) {
                reject(err);
            }
        })
      }
}