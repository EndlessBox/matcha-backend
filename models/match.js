var dbConnection = require('./dbConnection')().getDb();




module.exports = class matchModel {

    constructor(){}

    createMatch (match) {
        return new Promise(async (resolve, reject) => {
            try {
                match['id'] = null;
                match['dateOfMatch'] = new Date();
                let [results, _] = await dbConnection.query({
                    sql: "INSERT INTO `match` SET ?",
                    timeout: 40000
                },
                match)
                resolve(results.insertedId);
            } catch (error) {
                reject(error);
            }
        })
    }



    getMatchedHistoryByUserId(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let [results, _] = await dbConnection.query({
                    sql: "select u.userName, u.firstName, u.lastName, m.dateOfMatch from user u inner JOIN match m on u.id=m.matcher where m.matched=?"
                }, userId);
                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteMatch(matcherId, matchedId) {
        return new Promise(async (resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: "DELETE FROM `match` m WHERE m.matcher=? AND m.matched=?"
                }, [matcherId, matchedId]);

                resolve(results.affectedRows);
            } catch (error) {
                reject(error)
            }
        })
    }
}