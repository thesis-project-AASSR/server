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

const Item = function(item) {
  this.category = item.category;
  this.quantity = item.quantity;
  this.weight = item.weight;
  this.description = item.description;
  this.image = item.image;
  this.price = item.price;
  //this.foreign key = user.id;
};

//==========================================================================
// Now you need to create the tables (users,items) using terminal 

//==========================================================================
Item.addItem = (newItem, result) => {
  var mySql = `INSERT INTO items
        (
            category, quantity, description, weight, image, price 
        )
        VALUES
         (?,?,?,?,?,? )`;
         sql.query(mySql,
            [
              newItem.category,
              newItem.quantity,
              newItem.description,
              newItem.weight,
              newItem.image,
              newItem.price,
            ],(err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }

        // console.log("insertId",res.insertId)  /// id >> 15
       
        // console.log("newItem",newItem)    /* item:  { id: 15,
        //                                               category: 'metal',
        //                                               quantity: '55',} */

        // console.log("...newItem", {...newItem})  /*  =>   {category: 'metal',
        //                                                    quantity: '55',} */
            
        
        console.log("created item: ", { id: res.insertId, ...newItem });
            result(null, { id: res.insertId, ...newItem });
          });
};

Item.getAll = result => {
  sql.query("SELECT * FROM items", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("customers: ", res);
    result(null, res);
  });
};

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


// module.exports = User;
module.exports = Item;
