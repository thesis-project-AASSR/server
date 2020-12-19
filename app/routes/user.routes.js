module.exports = app => {
  const controller = require("../controllers/user.controller.js");


  app.get("/see", controller.now);


  // Create a new User (Signup)
  app.post("/signup", controller.create);

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
