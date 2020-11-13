var dbConnection = require('./dbConnection')().getDb()


/*
 *  Create a class user that :
 *      1 - Create a user entry in a database.
 *      2 - Update.
 *      3 - Delete.
 *  How to manage the connection ! 
 */

module.exports = class userModel {

    constructor() { }


    async createUser(user) {
        Object.keys(user).map((keyName) => user[keyName] = dbConnection.escape(user[keyName]));
        user['id'] = null;

        try {
            var [rows, fields] = await dbConnection.query({
                sql: "INSERT INTO `user` SET ?",
                timeout: 40000,
            }, user)
        }
        catch (err) {
            console.error(err);
            return;
        }
    }
}