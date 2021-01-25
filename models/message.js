var dbConnection = require('./dbConnection')().getDb();


module.exports =  class messagesModel {
    constructor () {}


    createMessge(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let [results, _] = await dbConnection.query({
                    sql: "INSERT INTO `messages` SET ?"
                }, payload);

                resolve(results.insertId);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        })
    }

    getUserWaitingMessages(type, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let [results, _] = await dbConnection.query({
                    sql: `SELECT * from \`messages\` m  where m.${type}=? AND m.seen=0`
                }, userId)

                resolve(results);
            } catch (error) {
                reject(error);
            }
        })
    }

    updateMessageByAttribute(attribute, newValue, messageId) {
        return new Promise(async (resolve, reject) => {
            try {
              const [result, _] = await dbConnection.query(
                {
                  sql: `UPDATE \`messages\` SET ${attribute}=? WHERE id=?`,
                  timeout: 40000,
                },
                [newValue, messageId]
              );
              resolve(true);
            } catch (err) {
              reject(err);
            }
          });
    }
}