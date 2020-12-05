var dbConnection = require('./dbConnection')().getDb();


module.exports = class locationModel {
    constructor(){}

    createLocation (location){
        return new Promise(async (resolve, reject) => {
            try {
                location['id'] = null;
                const [results, _] = await dbConnection.query({
                    sql: "INSERT INTO `location` SET ?",
                    timeout: 4000  
                }, location);

                resolve(results.insertId);
            } catch (error) {
                reject(error);
            }
        })
    }
}