var dbConnection = require('./dbConnection')().getDb()

module.exports = class userModel {

    constructor() { }


    async createUser(user) {
        return await new Promise(async (resolve, reject) => {
            try {
                user['id'] = null;
                const [results, _] = await dbConnection.query({
                    sql: "INSERT INTO `user` SET ?",
                    timeout: 40000,
                }, user)
                resolve(results.insertId);
            } catch (err) {
                reject(err);
            }
        })
    }
}