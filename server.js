const express = require("express");
const bodyParser = require("body-parser");
const db = require("./app/models/db");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
var cors = require('cors')
const app = express();
const paypal = require('@paypal/payouts-sdk');
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

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
   if (email) {
     db.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
       if (results.length > 0) {
         res.status(402).send({message: "email already exist"});
       } else {
         db.query(
           "INSERT INTO user (username, email, password, phoneNumber, location, image ) VALUES (?,?,?,?,?,?)",
           [username, email, hash, phoneNumber, location, image],
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
           req.body.id = result[0].id //comment this
           //creates the token
          const token = jwt.sign({id}, process.env.SECRET_TOKEN);
        // res.send(token);
          //creates my session
        // req.session.user =  {auth:true,token: token, result: result}
        console.log("signed user: ", {token: token});
        res.json({auth:true, token: token, result: result});
        }
        else {
        res.status(402).json({auth:false, message:'email or password is incorrect'});
          }
        });
        }
        else {
          res.status(402).json({auth:false, message:'email or password is incorrect'});
        }
       }
       );
        });



require("./app/routes/routes.js")(app);
// require("./app/routes/item.routes.js")(app2);



let clientId = "Aes7p8OE4sBMwHolQa-6mkFoLsTZOpL-EIL8s26eW461Je9N9R5bcE9NzbsvuHADapydUlUZdT6mv19P";
let clientSecret = "EOMfECpVcAbevWtpRnjzxhC4fMgnk39YT4rp4fV3V8CT8ZO11-2O56z1pAK_ZDSaAi910Eh12nj3L2_w";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

app.post("/purchase", (req, res) => {
    itemsInfo = {}
  console.log("req.body:",req.body)
 data ={
   itemId:req.body.itemId,
  acceptationStat: req.body.acceptationStat,
  rejectionStat: req.body.rejectionStat,
  status:req.body.status
}

var mySql = `UPDATE items SET status = '${data.status}',acceptationStat = ${data.acceptationStat}, rejectionStat = ${data.rejectionStat} WHERE id = '${data.itemId}'`;
db.query(mySql,(err, res) => {
         if (err) 
           console.log("error: ", err);
  
         })
        
  var mySql1 = `SELECT price,id FROM items WHERE id = '${data.itemId}' `;
  db.query(mySql1, (err, results) => {
    itemsInfo.price=results[0].price
    itemsInfo.userId=results[0].id
      console.log("results:",results);
      console.log("results[0]:",results[0]);
      console.log("itemsInfo::::::::::",itemsInfo);
      
      // itemsInfo.userId=results[0].userId
  // });
  // console.log("itemsInfo:",itemsInfo);
  let mySql2 = `SELECT email FROM users WHERE id = ${itemsInfo.userId} `;
  db.query(mySql2, (err, results) => {
      itemsInfo.receiver=results[0].email
      console.log("itemsInfo:",itemsInfo);
  });

  console.log("itemsInfo:",itemsInfo);
  var requestBody = {
    "sender_batch_header": {
      "recipient_type": "EMAIL",
      "email_message": "SDK payouts test txn",
      "note": "Enjoy your Payout!!",
      // "sender_batch_id": itemsInfo.userId,
      // "sender_batch_id":75,
      "email_subject": "This is a test transaction from SDK"
    }
    ,
    "items": [{
      "note": "Your 5$ Payout!",
      "amount": {
        "currency": "USD",
        // "value": 0.01
        "value": req.body.price
        // "value": itemsInfo.price
      },
      "receiver": itemsInfo.receiver,
      // "receiver": "razan.tashman@yahoo.com",
      "sender_item_id": data.itemId
      // "sender_item_id": 45
    }]
  }

  // Construct a request object and set desired parameters 
// Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
let request = new paypal.payouts.PayoutsPostRequest();
request.requestBody(requestBody);

// Call API with your client and get a response for your call
  let createPayouts  = async function(){
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
   console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
   res.send(response)
}

createPayouts();
})
});












// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
