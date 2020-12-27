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
 
//update users
app.put("/UsersUpdate/:id", controller.updateUsers);

  

};



