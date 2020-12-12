const dbConnection = require("./dbConnection")().getDb();

module.exports = class gender {
    constructor(){}


    async getGenderByAttribute(attribute, value)
    {
        return new Promise(async (resolve, reject) => {
            try{

                let [results, _] = await dbConnection.query({
                    sql: `SELECT * FROM gender WHERE ${attribute}=?`,
                    timeout: 40000
                }, value);
                resolve(results[0]);
            } catch(error) {
                reject(error);
            }
        })
    }

        getUserGender(userId) {
            return new Promise(async (resolve, reject) => {
                try {
                    let [results, _] = await dbConnection.query({
                        sql: `SELECT g.* from \`gender\` g INNER JOIN \`user\` u ON u.genderId=g.id WHERE u.id=?`,
                        timeout: 40000
                    }, userId)

                    resolve(results[0]);
                } catch (error) {
                    reject(error)
                }
            })
        }
}