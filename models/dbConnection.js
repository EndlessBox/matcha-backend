var mysql = require("mysql2/promise");
var dbConfig = require("../config/config").Database;

module.exports = () => {
  var database;

  getDb = function () {
    if (!database) {
      this.initDb();
      return database;
    }
    return database;
  };

  initDb = () => {
    if (database) {
      console.log("trying to init Database Again !");
      return database;
    }

    try {
      database = mysql.createPool({
        host: dbConfig.dbHost,
        port: dbConfig.dbPort,
        user: dbConfig.dbUser,
        password: dbConfig.dbPassword,
        database: dbConfig.dbName,
        connectionLimit: dbConfig.dbConnectionLimit
      });
      return database;
    }
    catch (err) {
      console.error(err.message);
      return;
    }

  };

  return { getDb: getDb, initDb: initDb };
};
