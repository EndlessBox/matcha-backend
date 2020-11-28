var dbConnection = require("./dbConnection")().getDb();

module.exports = class tagModel {
  constructor() {}

  async createTag(tagNames) {
    return new Promise(async (resolve, reject) => {
      try {

        var tags = [];

        tagNames.map(tag => {
          tags.push([null, tag]);
        })
        const [results, _] = await dbConnection.query({
            sql: "INSERT IGNORE INTO `tag` (id,tag) values ?",
            timeout: 40000
        },
        [tags]
        );
        resolve({resultId: results.insertId, offset: results.affectedRows});
      } catch (error) {
          reject(error);
      }
    });
  }


  async tag_user(tagId, userId) {
    return new Promise(async (resolve, reject) => {
      try {

        let mockUserTag = {
          id: null,
          tagId: tagId,
          userId: userId
        }

        let [results, _] = await dbConnection.query({
          sql: "INSERT INTO user_tag SET ?",
          timeout: 40000
       }, mockUserTag);

       resolve(results[0]);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }


  async getTagByAttribute(attribute, value) {
    return new Promise(async (resolve, reject) => {
      try {
          let [results, _] = await dbConnection.query({
            sql: `SELECT * FROM tag WHERE ${attribute}=?`,
            timeout: 40000 
          }, 
          value
          )
          resolve(results[0]);
      } catch (error) {
          reject(error);
      }

    })
  }
};
