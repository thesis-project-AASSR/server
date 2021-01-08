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
  this.location = item.location;
  this.user_id = item.user_id;
  this.status = item.status;
  this.acceptationStat = this.acceptationStat;
  this.rejectionStat = this.rejectionStat;

  //this.foreign key = user.id;
};

//==========================================================================
// Now you need to create the tables (users,items) using terminal/mysql workbench

//==========================================================================
// creating the request to add the item to the table
Item.addItem = (newItem, result) => {
  console.log(newItem)
  var mySql = `INSERT INTO items
        (
            category, quantity, description, weight, image, price ,location,user_id,status
        )
        VALUES
         (?,?,?,?,?,?,?,? ,?)`;
         sql.query(mySql,
            [
              newItem.category,
              newItem.quantity,
              newItem.description,
              newItem.weight,
              newItem.image,
              newItem.price,
              newItem.location,
              newItem.user_id,
              "Pending"
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
    "UPDATE items SET category = ?, quantity = ?, description = ?, weight = ?, price = ? WHERE itemID = ?",
    [newItem.category, newItem.quantity, newItem.description,newItem.weight,newItem.price,id],
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
      console.log(id, "id")
    }
  );
};

Item.remove = (id, result) => {
  sql.query(`DELETE FROM items WHERE itemID = '${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Item with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Item with id: ", id);
    result(null, res);
  });
};

Item.actions = (actionsInfo, result) => {
  var mySql = `UPDATE items SET status = '${actionsInfo.status}',acceptationStat = ${actionsInfo.acceptationStat}, rejectionStat = ${actionsInfo.rejectionStat} WHERE itemID = '${actionsInfo.itemId}'`;
         sql.query(mySql,(err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
        console.log("created item: ", { id: res.insertId, ...actionsInfo });
            result(null, { id: res.insertId, ...actionsInfo });
          });
};

///capture the changeling by run a triggering script
Item.notifications = (notInfo,result) => { 
  var obj={}
  ///check if there is any updated status by check if there is any inserted value in status_audit
  var counter =`SELECT COUNT(*) FROM status_audit `
  sql.query(counter,(err, res) => {
    if (err) {
      console.log("error: ", err);
    }
    obj.LENG=res[0]['COUNT(*)']
  // console.log("counter: ", res[0]['COUNT(*)']);
  if(res[0]['COUNT(*)']!==0){
    //if the table isn't empty, return the last row 
    var mySql = `SELECT * FROM status_audit WHERE id = (SELECT max(id) FROM status_audit)`;
    sql.query(mySql,(err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      obj.info=res1
      // delete the last row to make it empty again
      var mySql1 = `DELETE FROM status_audit ORDER BY id  LIMIT 1;`;
      sql.query( mySql1,(err, res) => {
        // console.log("deleted Item with id: ", res);
        if (err) {
          console.log("error: ", err);
          return;
        }
      var mySql2 = `SELECT token FROM users WHERE userID = '${notInfo.userID}'`;
      sql.query(mySql2,(err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        obj.info[0].token=res2[0]["email"]
        // console.log("res222222222222222: ", res2[0]["email"]);
        result(null, obj);
//  console.log("created item: ", res);
})
})
});
}
/// if the status_audit empty
else {
  result(null,  obj)}
});
};
// Save Sataus in the database
Item.expoPushTokens = (tokenInfo, result) => {
  var mySql = `UPDATE items SET status = '${tokenInfo.token}' WHERE user_id = '${tokenInfo.userID}'`;
         sql.query(mySql,(err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
        console.log("created item: ", { id: res.insertId, ...actionsInfo });
            result(null, { id: res.insertId, ...actionsInfo });
          });
};


module.exports = Item;
