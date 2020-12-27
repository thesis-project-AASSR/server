// const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// var connection = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });


// module.exports = connection;



const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// var connection = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });


// module.exports = connection;


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "stock",
});
//connecting mysql and creating 2 tables in our stock; called items, users
con.connect();
setInterval(function() {
  con.query('SELECT 1');
}, 5000);
  console.log("MySQL Connected!!!");
//fields of users table - users TABLE
var Users = "CREATE TABLE IF NOT EXISTS items ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, category VARCHAR(20), quantity VARCHAR(30), description VARCHAR(255),weight INT, image TEXT ,price INT, status VARCHAR(255) )";
con.query(Users, function(err, result) {
   if (err) throw err;
  console.log("items Table created!");
});

var last = "CREATE TABLE IF NOT EXISTS user ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), phoneNumber VARCHAR(255),location VARCHAR(255),image VARCHAR(255), iBan VARCHAR(255))";
con.query(last, function(err, result) {
   if (err) throw err;
  console.log("items Table created!");
});
module.exports = con;




