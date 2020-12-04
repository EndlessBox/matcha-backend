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
}