require('dotenv').config();

module.exports = {
    serverPort: process.env.SERVER_PORT || 3000,
    serverHost: process.env.SERVER_HOST,
    Database: {
        dbHost: process.env.DB_HOST,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
        dbPort: process.env.DB_PORT,
        dbConnectionLimit: process.env.DB_CONNECTION_LIMIT
    }
}