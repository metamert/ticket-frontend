const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(payload) {
  

  //the code below was the code written from the tutorial
  //Look at file server/routes/dashboard.js to see the change code for this code

  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     user: user_id
  //   };

  //{ expiresIn: "1h" }
  return jwt.sign(payload, process.env.jwtSecret);
}

module.exports = jwtGenerator;
