//Module importation
const { response } = require("express");
const express = require("express");
const pool = require("./db_config");
//
//create an instance of express
const app = express();
//
//
const port = process.env.PORT || 8080;
//
//Middleware 
app.use(express.urlencoded({ extended: false }));   // enables passage of data between front and back end through html
app.use(express.json()) // parses request with body content type json

//creation of the routes and how to handle them
app.get("/", (req, res) => {
  res.send("Hello");
});
//
//patients registration
app.post("/Users/patients", (req, res) => {
    //method addUser(patient:json):String[]{}

    //
    // retrieve and store user data as json object
    let patient = req.body;
    //
    //Array for storing validation errors
    let errors = [];
    //
    //Validation of user input
    if (!patient.f_name || !patient.l_name || !patient.date_of_birth || !patient.contact || !patient.patient_address) {
      errors.push({ message: "All records required" });
    }
    //
    //Checking if there are any errors
    if ( errors.length > 0 ){
      res.send(errors);
      res.end();
    }else{
      //db checks then storage after passing validation
      pool.query(
          `SELECT * FROM patients 
          WHERE contact = $1`, [patient.contact], (err,results) => {
              if (err){
                  throw err;
              }
              //
              //
              if (results.rows.length > 0){
                  errors.push({message:"User with similar phone number already registered"});
                  res.send(errors);
                  res.end();
              }else{
                  pool.query(
                      `INSERT INTO patients( f_name, l_name, date_of_birth, contact, patient_address) 
                      VALUES ($1, $2, $3, $4, $5)`,
                      [patient.f_name, patient.l_name, patient.date_of_birth, patient.contact, patient.patient_address],
                      (err,results) =>{ 
                          if (err){
                              throw err;
                          }
                      }
                  );
              }
          }
      );
    }
});

//
//doctors registration
app.post("/users/doctors", (req, res) => {
  let doctor = req.body;
  //
  //
  //Array for storing validation errors
  let errors = [];
  //
  //Validation of user input
  if (!doctor.f_name || !doctor.l_name || !doctor.specification || !doctor.contact ) {
    errors.push({ message: "All records required" });
  }
  //
  //Checking if there are any errors
  if ( errors.length > 0 ){
    res.send(errors);
  }else{
    //db checks for similar records then storage after passing validation
    pool.query(
        `SELECT * FROM doctors 
        WHERE contact = $1`, [doctor.contact], (err,results) => {
            if (err){
                throw err;
            }
            //
            //
            if (results.rows.length > 0){
                errors.push({message:"Doctor with similar phone number already registered"});
                res.send(errors);
                res.end();
            }else{
                pool.query(
                    `INSERT INTO doctors( f_name, l_name, specification, contact) 
                    VALUES ($1, $2, $3, $4)`,
                    [doctor.f_name, doctor.l_name, doctor.specification, doctor.contact],
                    (err,results) =>{ 
                        if (err){
                            throw err;
                        }
                    }
                );
            }
        }
    );
  }
});
//
// Return a list of all doctors
app.get("/users/doctors", (req, res) => {
    pool.query(`SELECT * FROM doctors`,(err,results) =>{
        if (err) throw err;
        res.json(results.rows);
    })
});
//
//Messages endpoints
//1. sending
app.post("/messages", (req, res) => {});
//2. retrieving
app.get("/messages", (req, res) => {});
//
//Endpoint for all medical records

//
//Start the app at a given port
const server = app.listen(port, () => {
  console.log(`server listening http://localhost:${port}/`);
});

export default server;
