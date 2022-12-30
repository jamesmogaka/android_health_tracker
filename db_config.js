//Pool is a group of client objects that enhances reusability for different database operations
//importing necessary  libraries
const Pool = require('pg').Pool;

const pool  = new Pool({
    user:'postgres',
    password:'5117',
    host:'localhost',
    port:5432,
    database:'health_tracker'
});


module.exports = pool;