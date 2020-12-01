const dbConnection = require("./dbConnection")().getDb();

module.exports = class gender {
    constructor(){}


    async getOrientationByAttribute(attribute, value)
    {
        return new Promise(async (resolve, reject) => {
            try{

                let [results, _] = await dbConnection.query({
                    sql: `SELECT * FROM sexualOrientation WHERE ${attribute}=?`,
                    timeout: 40000
                }, value);
                resolve(results[0]);
            } catch(error) {
                reject(error);
            }
        })
    }
}