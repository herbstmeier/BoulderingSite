const mariadb = require('mariadb/callback');
const dbConfig = require("../config/db.config.js");

// Create a new connection
const connection = await mariadb.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
  module.exports = connection;