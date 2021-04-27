const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "hello123",
  port: 5432,
  database: "apartment"
});

module.exports = pool;
