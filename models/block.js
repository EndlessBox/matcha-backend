var dbConnection = require('./dbConnection')().getDb();


module.exports = class blockModel {

    constructor(){}

    createBlock (block) {
        return new Promise(async (resolve, reject) => {
            try {

                block['id'] = null;
                block['dateOfBlock'] = new Date();
                let [results, _] = await dbConnection.query({
                    sql: "INSERT INTO `block` SET ?",
                    timeout: 40000
                },
                block)
                resolve(results.insertedId);
            } catch (error) {
                reject(error);
            }
        })
    }



    getBlockedHistoryByUserId(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let [results, _] = await dbConnection.query({
                    sql: "select u.userName, u.firstName, u.lastName, b.dateOfBlock from user u inner JOIN block b on u.id=b.blocker where b.blocker=?"
                }, userId);
                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteBlock(blockerId, blockedId) {
        return new Promise(async (resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: "DELETE FROM `block` b WHERE b.blocker=? AND b.blocked=?"
                }, [blockerId, blockedId]);

                resolve(results.affectedRows);
            } catch (error) {
                reject(error)
            }
        })
    }
}