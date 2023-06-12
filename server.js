const app = require('./app');
const dotenv = require('dotenv')
//
//
dotenv.config({path: './config/config.env'})
//
const port = process.env.PORT || 8080;

//TODO:connect to database here

//Start the app at a given port
const server = app.listen(port, () => {
  console.log(`server listening http://localhost:${port}/ in ${process.env.NODE_ENV} mode`);
});

module.exports = server;
