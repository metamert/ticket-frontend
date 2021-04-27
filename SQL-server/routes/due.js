const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { body } = require("express-validator");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//all todos and name







//create a todo

router.post("/manual-payment", async (req, res) => {
  try {
    
    const updatedRate = await pool.query(
      "UPDATE dues SET is_paid = $2 WHERE due_id = $1 RETURNING *",
      [
      req.body.id,
      true
      ]
    );
    
   

    res.json({status:true});
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const due = await pool.query(
      "SELECT * FROM dues WHERE user_id = $1 ",
      [id]
    );
    
   console.log(due.rows)

    res.json({due: due.rows});
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/payment', (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    };


    console.log(body)
  
    stripe.charges.create(body,async (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ error: stripeErr });
      } else {
try {
    

    const updatedRate = await pool.query(
        "UPDATE dues SET is_paid = $2 WHERE due_id = $1 RETURNING *",
        [
        req.body.id,
        true
        ]
      );

console.log(updatedRate)



    res.status(200).send({ success: stripeRes });
} catch (error) {
    console.log(error)
}





        
      }
    });
  });


module.exports = router;
