const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to our deployed app." });
});

//authentication 
// app.post('/signup', (req, res) => {
//   //   var username =  req.body.username,
//   // var email = req.body.email,
//   //   var password = req.body.password,
//   //   var phoneNumber = req.body.phoneNumber,
//   //   var location = req.body.location,
//   //   var image = req.body.image,
//   //   var iBan = req.body.iBan
// })

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
