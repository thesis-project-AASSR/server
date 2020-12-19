const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

//test connection to mysql db
// connection.connect( (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("MYSQL connected")
//   }
// })

module.exports = connection;
