const sql = require("./db.js");

//========================================================================
// constructor (Tables) model of tables
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
// Now you need to create the tables (users,items) using terminal/mysql workbench

//==========================================================================
// creating the request to add the item to the table
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
        console.log("created item: ", { id: res.insertId, ...newItem });
            result(null, { id: res.insertId, ...newItem });
          });
};


// getting all the items from the database
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



// updating the items in our database
Item.updateById = (id, newItem, result) => {
  sql.query(
    "UPDATE items SET category = ?, quantity = ?, description = ?, weight = ?, image = ?,price =? WHERE id = ?",
    [newItem.category, newItem.quantity, newItem.description,newItem.weight,newItem.image,newItem.price,id],
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

      console.log("updated customer: ", { id: id, ...newItem });
      result(null, { id: id, ...newItem });
    }
  );
};


module.exports = Item;
