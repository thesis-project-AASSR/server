const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models/db");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to our deployed app." });
});

//authentication 
app.post("/signup", (req, res) => {
   const username =  req.body.username;
   const email = req.body.email;
   const password = req.body.password;
   const phoneNumber = req.body.phoneNumber;
   const location = req.body.location;
   const image = req.body.image;
   const iBan = req.body.iBan;
 
  //  if (username) {
  //    res.send({message: "user already exist"});
  //  } 
  bcrypt.hash(password, saltRounds, (err, hash) => {
    
    if (err) {
      console.log(err);
    }
    if (username) {
      db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (results.length > 0) {
          res.send({message: "username already exist"});
        } else {
          db.query(
            "INSERT INTO users (username, email, password, phoneNumber, location, image, iBan ) VALUES (?,?,?,?,?,?,?)",
            [username, email, hash, phoneNumber, location, image, iBan],
            (err, result) => {
              if (err) {
                console.log("error: ", err);
              } else {
                console.log(result);
              }
              console.log("created user: ", { username: username });
              // console.log(result);
              // result(null, { username: res.username });
              res.send({message: "user saved to db"});
            }
          );
        }
      })
    }
  });
});

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = req.body.id;

  //checks the database
  db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
     if (err) {
    res.send({ err: err });
  }
     if (result.length > 0) {
       //check the bycrypted password
      bcrypt.compare(password, result[0].password, (error, response) => {
      if (response) {
           req.body.id = result[0].id
           //creates the token
          const token = jwt.sign({id}, process.env.SECRET_TOKEN, {
          expiresIn:1000,
        })
          //creates my session
        // req.session.user =  {auth:true,token: token, result: result}
        res.json({auth:true, token: token, result: result});
        }
        else {
        res.json({auth:false, message:'wrong password '});
          }
        });
        }
        else {
        res.json({auth:false, message:'no user'});
       }
       }
       );
        });




require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
