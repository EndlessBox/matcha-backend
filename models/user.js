var dbConnection = require("./dbConnection")().getDb();

module.exports = class userModel {
  constructor() {}

  async createUser(user) {
    return await new Promise(async (resolve, reject) => {
      try {
        user["id"] = null;
        const [results, _] = await dbConnection.query(
          {
            sql: "INSERT INTO `user` SET ?",
            timeout: 40000,
          },
          user
        );
        resolve(results.insertId);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getUserByAttribute(attribute, value) {
    return new Promise(async (resolve, reject) => {
      try {
        const [result, _] = await dbConnection.query(
          {
            sql: `SELECT * FROM \`user\` WHERE ${attribute}=?`,
            timeout: 40000,
          },
          value
        );

        if (!result.length) reject({ message: "user not found" });
        resolve(result[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateUserAttribute(attribute, newValue, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const [result, _] = await dbConnection.query(
          {
            sql: `UPDATE \`user\` SET ${attribute}=? WHERE id=?`,
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

  /*
   *  Need to remove it unused function I GUESSS !
   */
  async updateUser(newUser, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const [result, _] = await dbConnection.query(
          {
            sql: "UPDATE `user` SET ? WHERE id=?",
            timeout: 40000,
          },
          [newUser, userId]
        );
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  async deleteUserAttribute(attribute, value) {
    return new Promise(async (resolve, reject) => {
      try {
        const [result, _] = await dbConnection.query(
          {
            sql: `DELETE FROM \`user\` WHERE ${attribute}=?`,
            timeout: 40000,
          },
          value
        );
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  generateGenderOrientationSQL(gender, orientations) {
    let result = `(g.gender='${gender}' AND (`;
    let sqlOrientations = "";

    orientations.map((orientation) => {
      if (sqlOrientations === "")
        sqlOrientations = `s.orientation='${orientation}'`;
      else
        sqlOrientations = `${sqlOrientations} OR s.orientation='${orientation}'`;
    });

    result = result + sqlOrientations + "))";

    return result;
  }

  generateMultipleGenderOrientationSQl(genderOrientations, separator) {
    let result = "";

    genderOrientations.map((genderOrientations) => {
      if (result === "")
        result = this.generateGenderOrientationSQL(
          genderOrientations.gender,
          genderOrientations.orientations
        );
      else
        result = `${result} ${separator} ${this.generateGenderOrientationSQL(
          genderOrientations.gender,
          genderOrientations.orientations
        )}`;
    });
    return result;
  }

  generateOrder(orders) {
    let result = "";

    orders.map((order) => {
      if (result === "") result = order;
      else result = `${result}, ${order}`;
    });
    return result;
  }

  getUserByGenderAndOrientationAndDistance(
    genderOrientations,
    userId,
    userLocation,
    MaxDistance,
    orders,
    orderVariant = "ASC"
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        let sqlQuery = `SELECT u.id, u.email, u.userName, u.bio, s.orientation, g.gender, ST_Distance_sphere(point(l.longitude, l.latitude), point(${
          userLocation.longitude
        }, ${
          userLocation.latitude
        })) / 1000 as distance FROM \`user\` u INNER JOIN \`gender\` g ON u.genderId=g.id INNER JOIN \`sexualOrientation\` s ON u.orientationId=s.id INNER JOIN \`location\` l ON u.locationId=l.id WHERE u.id!=${userId} AND
        ST_Distance_sphere(point(l.longitude, l.latitude), point(${userLocation.longitude}, ${userLocation.latitude})) / 1000 <= ${MaxDistance}
        AND (${this.generateMultipleGenderOrientationSQl(genderOrientations,"OR")})
        ORDER BY ${this.generateOrder(orders)} ${orderVariant}`;

        let [results, _] = await dbConnection.query({
          sql: sqlQuery,
        });
        resolve(results);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
};
