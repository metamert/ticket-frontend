const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const { JsonWebTokenError } = require("jsonwebtoken");

//authorizeentication

router.post("/new-admin", validInfo, async (req, res) => {
  const {
    admin_email,

    admin_password,
    
  } = req.body;

  console.log("register *", req.body);

  try {
    const admin_ = await pool.query("SELECT * FROM admins WHERE admin_email = $1", [
      admin_email,
    ]);
    
    if (admin_.rows.length > 0) {
      return res.status(401).json("Admin already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(admin_password, salt);

    let admin = await pool.query(
      "INSERT INTO admins (admin_email, admin_password) VALUES ($1, $2) RETURNING *",
      [
      
        admin_email,
        bcryptPassword,
       
      ]
    );

    const jwtToken = jwtGenerator({user_id:admin_email,password:admin_password,role:"admin"});
    return res.json({admin:admin.rows[0], token:jwtToken,status:true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/register", validInfo, async (req, res) => {
  const {
    user_email,
    user_name,
    user_password,
    phone_number,
    flat_no,
    is_active,
    flat_status,
    fitness,
    swimming_pool,
  } = req.body;

  console.log("register *", req.body);

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);
    console.log("email", user_email);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(user_password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password,phone_number,flat_no,is_active,flat_status,fitness,swimming_pool) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        user_name,
        user_email,
        bcryptPassword,
        phone_number,
        flat_no,
        is_active,
        flat_status,
        fitness,
        swimming_pool,
      ]
    );

    let getCurrentRate = await pool.query("SELECT * FROM rates");
    console.log("current response", getCurrentRate);
    let data = getCurrentRate.rows[0];
    let us=newUser.rows[0]
    let userid=newUser.rows[0].user_id
    let swimming_fee = 0 

if(us.swimming_pool){
  swimming_fee=data.swimming_pool_fee;
}

let fitness_fee = 0 

if(us.fitness){
  fitness_fee=data.fitness_fee;
}



    
    let other_fee = data.other_fee;
    let total = swimming_fee + other_fee + fitness_fee;
 



   let password=newUser.rows[0].user_password
   console.log("total",total)
    let due = await pool.query(
      "INSERT INTO dues (user_id , amount ,fitness,swimming_pool,flat_no) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [userid, total, fitness_fee,swimming_fee,us.flat_no]
    );

    console.log("due", due);

    
    return res.json({ user :newUser.rows[0],status:true});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    let userid=user.rows[0].user_id
    let password=user.rows[0].user_password

    
    return res.json({ user :user.rows[0],status:true});
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/admin-login", validInfo, async (req, res) => {
  const { admin_email, admin_password } = req.body;

  try {
    const admin = await pool.query("SELECT * FROM admins WHERE admin_email = $1", [
      admin_email,
    ]);

    if (admin.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      admin_password,
      admin.rows[0].admin_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator({user_id:admin_email,password:admin_password,role:"admin"});
    return res.json({admin:admin.rows[0], token:jwtToken,status:true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
