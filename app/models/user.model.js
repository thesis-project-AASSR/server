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

User.updateById = (id, User) => {
  sql.query(
    "UPDATE users SET username = ?, email = ?, phoneNumber = ?, location = ?, image= ? WHERE userID = ?",
    [User.username , User.email , User.phoneNumber , User.location, User.image , id  ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        // result(null, err);
        return;
      }
       if (res.affectedRows == 0) {
        // not found Customer with the id
        // result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { id: id, User });
      // result(null, { id: id, ...User });
      console.log(id,"id")
    }
  );
};

module.exports = User;
