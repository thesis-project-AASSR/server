const sql = require("./db.js");

//========================================================================
// constructor (Tables) model of tables
const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.phoneNumber = user.phoneNumber;
  this.location = user.location;
  this.image = user.image;
  this.iBan = user.iBan; //bank account ==> not required to fill it now
};


//==========================================================================
// Now you need to create the tables (users,items) using terminal/mysql workbench
//==========================================================================
//getting the admin
User.getAdmin = result => {
  sql.query("SELECT * FROM users WHERE userID = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
    console.log(result)
  });
};


//getting the user profile 
User.GetUser = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
    console.log(result)
  });
};

module.exports = User;
