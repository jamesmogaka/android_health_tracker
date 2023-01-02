//Pool is a group of client objects that enhances reusability for different database operations
//importing necessary  libraries
const Pool = require('pg').Pool;
require("dotenv").config();

const pool  = new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE
});


module.exports = pool;