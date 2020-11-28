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
        console.log(results);
        resolve({resultId: results.insertId, offset: results.affectedRows});
      } catch (error) {
          reject(error);
      }
    });
  }


  async tag_user(tagId, tagOffset, userId) {
    return new Promise((resolve, reject) => {
      try {
        var tagsUser= [];
        var stop = tagId + tagOffset
        while (tagId < stop)
        {
            tagsUser.push([tagId, userId]);
            tagId++;
        }
        // const [results, _] = await dbConnection.query({
        //   sql: "INSERT INTO"
        // })

        resolve(true);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

};
