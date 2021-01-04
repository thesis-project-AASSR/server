module.exports = app => {
  const controller = require("../controllers/controller.js");
  
  app.post("/items", controller.addItem);
  app.get("/ItemsList", controller.findAll);





  // Update a items with itemsId

  app.put("/items/:id", controller.updateitems);

  app.delete("/delete/:id", controller.deleteItem);

  app.get("/ItemsList", controller.findAll);   // this url it the same as api in front end 

  //find the admin
  app.get("/AdminUser", controller.findAdmin);
//find the user
app.get("/UserProfile", controller.findUser);

app.post("/actions", controller.actions);
  // app.get("/see", controller.now);

  //update users
app.put("/UsersUpdate/:id", controller.updateUsers);

//notifications 
app.post("/notifications", controller.notifications);
//device tokens
app.post("/expoPushTokens", controller.expoPushTokens);

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