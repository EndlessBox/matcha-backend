var dbConnection = require('./dbConnection')().getDb();



module.exports = class NotificationModule {
    constructor () {}



    getUserNotSeenNotifications (type, userId) {
        return new Promise(async(resolve, reject) => 
        {
        try {
            let [result, _] = await dbConnection.query({
                sql: `SELECT n.*  FROM notifications n INNER JOIN user u ON u.id=n.${type} AND u.id=? AND n.seen=0`
            }, userId);

            resolve(result);
        } catch(err) {
            reject(err);
        }
    })
    }


    createNotificattion(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                payload['id']= null;
                let [result, _] = await dbConnection.query({
                    sql: "INSERT INTO notifications SET ?"
                }, payload);

                resolve(result.insertId)
            } catch (error) {
                reject(error);
            }
        })
    }

    updateNotificationAttribute(attribute, newValue, userId)
    {
        return new Promise(async (resolve, reject) => {
            try {
              const [result, _] = await dbConnection.query(
                {
                  sql: `UPDATE \`notifications\` SET ${attribute}=? WHERE id=?`,
                  timeout: 40000,
                },
                [newValue, userId]
              );
              resolve(true);
            } catch (err) {
              reject(err);
            }
          });
    }
}