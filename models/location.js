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

    getUserLocation(userId){
        return new Promise(async (resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: "SELECT l.* FROM `location` l  INNER JOIN user u ON u.locationId=l.id WHERE u.id=?",
                    timeout: 4000
                }, userId)

                resolve (results[0])
            } catch (error) {
                reject(error);
            }
        })
    }

    updateLocation(payload, userId) {
        return new Promise(async (resolve, reject) => {
            try{

                let [result, _] = await dbConnection.query({
                    sql: "UPDATE `location` l SET ? WHERE l.id=(SELECT u.locationId from `user` u where u.id=?)"
                }, [payload, userId])

                resolve(result.affectedRows)

            }catch(err) {
                reject(err);
            }
        })
    }
}