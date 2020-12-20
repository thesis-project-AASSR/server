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










// // up date query


// Customer.updateById = (id, item, result) => {
//   sql.query(
//     "UPDATE items SET email = ?, name = ?, active = ? WHERE id = ?",
//     [customer.email, customer.name, customer.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated customer: ", { id: id, ...customer });
//       result(null, { id: id, ...customer });
//     }
//   );
// };










//add new record to items table
// Item.create = (newItem, result) => {
//   sql.query("INSERT INTO items SET ?", newItem, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created item: ", { id: res.insertId, ...newItem });
//     result(null, { id: res.insertId, ...newItem });
//   });
// };




/*
Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};
*/

//add new record to users table
// User.create = (newUser, result) => {
//   sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created user: ", { id: res.insertId, ...newUser });
//     result(null, { id: res.insertId, ...newUser });
//   });
// };


// User.check = (info, result) => {
//   sql.query("SELECT * FROM users WHERE username = ? AND password = ?", [info.username, info.password], (err, res) => {

//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//       if (result) {
//         console.log("logged in");
//       } else {
//         console.log("no user found")
//       }
    
//     console.log("created user: ", { id: res.insertId, ...info });
//     result(null, { id: res.insertId, ...info });
//   });
// };
 
// module.exports = User;
module.exports = User;
