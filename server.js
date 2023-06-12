const app = require('./app');
const dotenv = require('dotenv')
const pool = require('./config/db_config');
//
//
dotenv.config({path: './config/config.env'});
//
const port = process.env.PORT || 8080;

//connect to database
pool.connect();
pool.on('connect',()=>{
  console.log (`connected to postgresql database at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});

//Start the app at a given port
const server = app.listen(port, () => {
  console.log(`server listening http://localhost:${port}/ in ${process.env.NODE_ENV} mode`);
});

module.exports = server;
