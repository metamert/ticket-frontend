const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { body } = require("express-validator");

//all todos and name

router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const users = await pool.query("SELECT * FROM users");

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



router.post("/simulate", authorize, async (req, res) => {
  try {
    

    const users = await pool.query("SELECT * FROM users");
   let getCurrentRate = await pool.query("SELECT * FROM rates");
   let data = getCurrentRate.rows[0];
   for (const user of users.rows) {

    let getCurrentRate = await pool.query("SELECT * FROM rates");
    console.log("current response", getCurrentRate);
   
   
   
    let swimming_fee = 0 

if(user.swimming_pool){
  swimming_fee=data.swimming_pool_fee;
}

let fitness_fee = 0 

if(user.fitness){
  fitness_fee=data.fitness_fee;
}



    
    let other_fee = data.other_fee;
    let total = swimming_fee + other_fee + fitness_fee;
 


    let due = await pool.query(
      "INSERT INTO dues (user_id , amount ,fitness,swimming_pool,flat_no) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [user.user_id, total, fitness_fee,swimming_fee,user.flat_no]
    );



    }

    res.json({status:true});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



router.get("/flats", async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const users = await pool.query("SELECT flat_no FROM users");

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.get("/admin", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const admins = await pool.query("SELECT * FROM admins");

    res.json(admins.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



router.delete("/delete-admin/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdmin = await pool.query(
      "DELETE FROM admins WHERE admin_id = $1 RETURNING *",
      [id]
    );
  
    if (deleteAdmin.rows.length === 0) {
      return res.json("You cant delete");
    }

    res.json({ status: true });
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/dues", authorize, async (req, res) => {
  try {
   

    const users = await pool.query("SELECT * FROM dues");

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.delete("/delete-announces/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdmin = await pool.query(
      "DELETE FROM announces WHERE id = $1 RETURNING *",
      [id]
    );
  
    if (deleteAdmin.rows.length === 0) {
      return res.json("You cant delete");
    }

    res.json({ status: true });
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/announces", async (req, res) => {
  try {
   

    const users = await pool.query("SELECT * FROM announces");

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});





router.get("/rates", authorize, async (req, res) => {
  try {
   

    const rates = await pool.query("SELECT * FROM rates");
    
    res.json(rates.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



router.put("/rates", authorize, async (req, res) => {
  try {
   
    const {
      swimming_pool_fee,
      fitness_fee,
       other_fee 
    } = req.body;
    console.log("swim",swimming_pool_fee)
   
    const updatedRate = await pool.query(
      "UPDATE rates SET swimming_pool_fee = $1,fitness_fee = $2,other_fee = $3 RETURNING *",
      [
        swimming_pool_fee,
        fitness_fee,
        other_fee,
      
      ]
    );
let des=`New Monthly Rates fitness fee ${fitness_fee}  ,   swimming fee ${swimming_pool_fee}   , other fees : ${other_fee} `
    let desc = await pool.query(
      "INSERT INTO announces (description) VALUES ($1) RETURNING *",
      [des]
    );
    console.log(desc.rows[0])

    res.json(updatedRate.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});







//create a todo




router.delete("/delete-user/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );
    console.log(deleteTodo);
    if (deleteTodo.rows.length === 0) {
      return res.json("You cant delete");
    }

    res.json({ status: true });
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update-user/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      created_at,
      user_name,
      user_email,
      phone_number,
      flat_status,
      flat_no,
      swimming_pool,
      fitness,
      is_active,
      moved_at,
      user_id,
    } = req.body;

let move=null

if(!is_active){
  move=new Date()
}

    console.log(user_name)
    const updateTodo = await pool.query(
      "UPDATE users SET  created_at = $1,user_name = $2,user_email = $3,phone_number = $4,flat_status = $5,flat_no = $6,swimming_pool = $7, fitness = $8,is_active = $9,moved_at = $10 WHERE user_id = $11  RETURNING *",
      [
        created_at,
        user_name,
        user_email,
        phone_number,
        flat_status,
        flat_no,
        swimming_pool,
        fitness,
        is_active,
        move,
        id,
      ]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
