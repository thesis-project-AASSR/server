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
  // Create a Customer
  const item = ({
       category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description,
      weight: req.body.weight,
      image: req.body.image,
      price: req.body.price
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
exports.updateitems = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

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
