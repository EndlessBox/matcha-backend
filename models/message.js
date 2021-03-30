var dbConnection = require("./dbConnection")().getDb();

module.exports = class messagesModel {
  constructor() {}

  createMessge(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let [results, _] = await dbConnection.query(
          {
            sql: "INSERT INTO `messages` SET ?",
          },
          payload
        );

        resolve(results.insertId);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  getUserWaitingMessages(type, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        let [results, _] = await dbConnection.query(
          {
            sql: `SELECT * from \`messages\` m  where m.${type}=? AND m.seen=0`,
          },
          userId
        );

        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
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

  getUserLastMessages(requestUserId, userId, offset, row_count) {
    return new Promise(async (resolve, reject) => {
      try {
        if (requestUserId !== userId) {
          const [result, _] = await dbConnection.query(
            {
              sql: `SELECT m.* FROM \`messages\` m WHERE (m.sender=? AND m.receiver=?) OR (m.sender=? AND m.receiver=?) ORDER BY date DESC LIMIT ${
                offset * row_count
              },${row_count}`,
              timeout: 40000,
            },
            [requestUserId, userId, userId, requestUserId]
          );
          resolve(result);
        } else {
          const [result, _] = await dbConnection.query(
            {
              sql: `SELECT m.* FROM \`messages\` m WHERE (m.sender=? OR m.receiver=?) ORDER BY date DESC LIMIT ${
                offset * row_count
              },${row_count}`,
              timeout: 40000,
            },
            [userId, userId]
          );
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
};
