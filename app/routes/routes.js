module.exports = app => {
  const controller = require("../controllers/controller.js");
  
  app.post("https://backend-dawerha.herokuapp.com//items", controller.addItem);
  app.get("https://backend-dawerha.herokuapp.com//ItemsList", controller.findAll);




  // Update a items with itemsId

  app.put("https://backend-dawerha.herokuapp.com//items/:id", controller.updateitems);
  app.delete("https://backend-dawerha.herokuapp.com//delete/:id", controller.deleteItem);

  app.get("https://backend-dawerha.herokuapp.com//ItemsList", controller.findAll);   // this url it the same as api in front end 
//find the admin
  app.get("https://backend-dawerha.herokuapp.com//AdminUser", controller.findAdmin);

//find the user
app.get("https://backend-dawerha.herokuapp.com//UserProfile", controller.findUser);
 
//update users
app.put("https://backend-dawerha.herokuapp.com//UsersUpdate/:id", controller.updateUsers);

  

};



