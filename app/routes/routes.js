module.exports = app => {
  const controller = require("../controllers/controller.js");
  
  app.post("/items", controller.addItem);
  app.get("/ItemsList", controller.findAll);




  // Update a items with itemsId

  app.put("/items/:id", controller.updateitems);

  app.get("/ItemsList", controller.findAll);   // this url it the same as api in front end 

  app.get("/AdminUser", controller.findUser);

  // app.get("/see", controller.now);


  // Create a new User (Signup)
  // app.post("/signup", controller.create);

  // Login
  // app.post("/login", controller.check);

  // Retrieve all Customers
  // app.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  // app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  // app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  // app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  // app.delete("/customers", customers.deleteAll);

};



// app.get("/items", customers.retrieveItems);