const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

module.exports = {
  HOST:'us-cdbr-east-02.cleardb.com',
  USER: 'bd8e05add959b2',
  PASSWORD: 'bd5ae418',
  DB: 'heroku_a7840fa0418a5f2'
};

//to run server on heroku (globally)
// heroku run node server.js

//to open global mysql type the following link on the terminal 
// mysql --host=us-cdbr-east-02.cleardb.com --user=bd8e05add959b2 --password=bd5ae418 --reconnect heroku_a7840fa0418a5f2

//In postman
// send the requests for https://backend-dawerha.herokuapp.com/ENDPOINT