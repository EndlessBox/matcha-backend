const { decode } = require("jsonwebtoken");
const config = require("../config/config");
const { query } = require("express");

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
        console.log(err.message);
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

  distanceSqlFromLongLat(longitude, latitude) {
    return `ST_Distance_sphere(point(l.longitude, l.latitude), point(${longitude}, ${latitude}))`;
  }

  generateOrder(orders, orderVariant) {
    let result = "";

    orders.map((order, index) => {
      if (result === "") result = `${order} ${orderVariant[index]}`;
      // ORDER BY column1 DESC, column2 ASC
      else result = `${result}, ${order} ${orderVariant[index]}`;
    });
    return result;
  }

  generateFilter(filters, location, userId) {
    let result = "";

    Object.keys(filters).map((key) => {
      switch (key) {
        case "communTags":
          let communtags = `(SELECT Count(t1.tag) FROM tag t1 \
          INNER JOIN user_tag ut1 ON t1.id=ut1.tagId \
          INNER JOIN user u1 ON u1.id=ut1.userId \
          WHERE u1.id=u.id AND t1.tag IN (SELECT t2.tag FROM tag t2 INNER JOIN user_tag ut2 ON t2.id=ut2.tagId INNER JOIN user u2 ON u2.id=ut2.userId AND u2.id=${userId}))`;

          if (result == "")
            result = `${communtags} >= ${filters[key][0]} AND ${communtags} <= ${filters[key][1]}`;
          else
            result = `${result} AND ${communtags} >= ${filters[key][0]} AND ${communtags} <= ${filters[key][1]}`;
          break;

        case "distance":
          let distance = this.distanceSqlFromLongLat(
            location.longitude,
            location.latitude
          );
          if (result == "")
            result = `${distance} / 1000 >= ${filters[key][0]} AND ${distance}/ 1000  <= ${filters[key][1]}`;
          else
            result = `${result} AND ${distance} / 1000 >= ${filters[key][0]} AND ${distance} / 1000 <= ${filters[key][1]}`;
          break;

        case "experience":
          if (result == "")
            result = `${key} >= ${filters[key][0]} AND ${key} <= ${filters[key][1]}`;
          else
            result = `${result} AND ${key} >= ${filters[key][0]} AND ${key} <= ${filters[key][1]}`;
          break;

        case "age":
          let age = "year(NOW()) - year(u.birthDate)";

          if (result == "")
            result = `${age} >= ${filters[key][0]} AND ${age} <= ${filters[key][1]}`;
          else
            result = `${result} AND ${age} >= ${filters[key][0]} AND ${age} <= ${filters[key][1]}`;
          break;
      }
    });

    if (!filters.distance) {
      let distance = this.distanceSqlFromLongLat(
        location.longitude,
        location.latitude
      );
      if (result == "")
        result = `${distance} / 1000 >= 0 AND ${distance} / 1000  <= ${config.defaultUserAreaKm}`;
      else
        result = `${result} AND ${distance} / 1000 >= 0 AND ${distance} / 1000 <= ${config.defaultUserAreaKm}`;
    }
    return result;
  }

  getUserByGenderAndOrientationAndDistance(
    genderOrientations,
    userId,
    userLocation,
    MaxDistance,
    orders,
    orderVariant = "ASC",
    filters,
    offset,
    row_count
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        let sqlQuery = `SELECT u.id, u.email, u.experience, u.userName, year(NOW())- year(u.birthDate) as age, u.bio, s.orientation, g.gender, Count(t.tag) as 'communTags', ST_Distance_sphere(point(l.longitude, l.latitude), point(${userLocation.longitude}, ${userLocation.latitude})) / 1000 as distance \
        FROM \`user\` u INNER JOIN \`gender\` g ON u.genderId=g.id \
                        INNER JOIN \`sexualOrientation\` s ON u.orientationId=s.id \
                        INNER JOIN \`location\` l ON u.locationId=l.id \
                        INNER JOIN \`user_tag\` ut ON  u.id=ut.userId \
                        INNER JOIN \`tag\` t ON t.id=ut.tagId \
        WHERE u.id!=${userId} `;

        if (filters) {
          sqlQuery =
            sqlQuery +
            `AND \
            ${this.generateFilter(filters, userLocation, userId)}`;
        }

        sqlQuery =
          sqlQuery +
          ` \
        AND 
          (${this.generateMultipleGenderOrientationSQl(
            genderOrientations,
            "OR"
          )}) \
        AND \
          t.tag IN (SELECT t1.tag FROM tag t1 \
                    INNER JOIN user_tag ut1 ON t1.id=ut1.tagId \
                    INNER JOIN user u1 ON u1.id=ut1.userId \
                    WHERE u1.id = ${userId}) \
        GROUP BY u.userName \
        ORDER BY ${this.generateOrder(orders, orderVariant)} \
        LIMIT ${offset * row_count},${row_count}`;

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
