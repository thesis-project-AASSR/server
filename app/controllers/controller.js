const User = require("../models/user.model.js");
const Item = require("../models/item.model.js");


//add items to our database 
exports.addItem = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(".......",req.body);   //the object (data) which we get from front end
  // items send by the front end 
  const item = ({
       status:req.body.status,
       category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description,
      weight: req.body.weight,
      image: req.body.image,
      price: req.body.price,
      location:req.body.location,
      user_id:req.body.user_id

  });

  // Save Customer in the database
  Item.addItem(item, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    else res.send(data);
    // console.log("data:",data)
  });
};

// Update a items identified by the itemsId in the request


//retrieve all the items in our database
exports.findAll = (req, res) => {
  Item.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findAdmin = (req, res) => {
  User.getAdmin((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};


exports.findUser = (req, res) => {
  User.GetUser((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Update a items identified by the itemsId in the request
exports.updateitems = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
// update the items in our database
  Item.updateById(
    req.params.id,
    new Item(req.body),
    (err, data) => {
      console.log("id", req.params.id)
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a specific item from the database
exports.deleteItem = (req, res) => {
  Item.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.itemId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Item with id " + req.params.itemId
        });
      }
    } else res.send({ message: `Item was deleted successfully!` });
  });
};

exports.actions = (req, res) => {
  console.log(".......",req.body);   //the object (data) which we get from front end
  // items send by the front end
  const item = ({
    itemId: req.body.itemId,
    status: req.body.status,
    acceptationStat:req.body.acceptationStat,
    rejectionStat:req.body.rejectionStat
  });
  // Save Sataus in the database
  Item.actions(item, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the sataus."
      });
    else res.send(data);
    // console.log("data:",data)
  });
};


/// update users and admin 
exports.updateUsers = (req, res) => {
  // Validate Request
  console.log(req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log('User',req.body);
 User.updateById(
    req.params.id,
    new User(req.body),
    console.log(req.body),
    (err, data) => {
      console.log("id", req.params.id)
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.notifications = (req, res) => {
  const data = ({
    userID: req.body.userID
  });
  // Save Sataus in the database
  Item.notifications(notInfo,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the sataus."
      });
    else res.send(data);
    // console.log("data:",data)
  });
};
/// save the device token on the DB
exports.expoPushTokens = (req, res) => {
  console.log(".......",req.body);   //the object (data) which we get from front end
  // items send by the front end
  const data = ({
    token: req.body.token,
    userID: req.body.userID
  });
  // Save Sataus in the database
  Item.expoPushTokens(data, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the sataus."
      });
    else res.send(data);
    // console.log("data:",data)
  });
};

