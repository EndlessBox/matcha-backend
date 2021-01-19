var dbConnection = require('./dbConnection')().getDb();

module.exports = class rankModel {
    constructor(){}

    getLimitValues(boundry = "MIN") {
        return new Promise(async(resolve, reject) => {
            try{
                let [result, _] = await dbConnection.query({
                    sql: `SELECT r.* FROM \`rank\` r \ 
                         WHERE r.rankValue=( \
                            SELECT ${boundry}(rankValue)
                            FROM \`rank\`);`
                })
                resolve(result[0]);
            } catch(err) {
                console.log(err);
                reject(err);
            }
        })
    }
    
    getUserRank(userId){
        return new Promise(async(resolve, reject) => {
            try {
                let [result, _] = await dbConnection.query({
                    sql: "SELECT r.* FROM \`rank\` r \
                         INNER JOIN \`user\` u ON u.rankId = r.id \
                         AND u.id = ?"
                }, userId);

                resolve(result[0]);
            }catch(err) {
                reject(err);
            }
        })
    }
}