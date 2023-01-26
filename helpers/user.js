// import necessary modules
const pool = require("../config/db_config");
const validator = require("validator");

//a function to create a user
function addUser(category, personalInfo) {
  // Array of validation errors
  let errors = [];
  //
  //
  if (category == "patient") {
    //Validation of user input
    if (
      validator.isEmpty(patient.f_name) ||
      validator.isEmpty(patient.l_name) ||
      validator.isEmpty(patient.date_of_birth) ||
      validator.isEmpty(patient.contact) ||
      validator.isEmpty(patient.patient_address)
    ) {
      errors.push({ message: "All records required" });
    }
    //
    //Check if there are any errors
    if (errors.length > 0) {
      res.json(errors);
      res.end();
    } else {
      //db checks then storage after passing validation
      pool.query(
        `SELECT * FROM patients 
            WHERE contact = $1`,
        [patient.contact],
        (err, results) => {
          if (err) {
            //
            //Crash whenever there is an error executing the query
            throw err;
          }
          //
          //
          if (results.rows.length > 0) {
            errors.push({
              message: "User with similar phone number already registered",
            });
            res.json(errors);
            res.end();
          } else {
            pool.query(
              `INSERT INTO patients( f_name, l_name, date_of_birth, contact, patient_address) 
                        VALUES ($1, $2, $3, $4, $5)`,
              [
                patient.f_name,
                patient.l_name,
                patient.date_of_birth,
                patient.contact,
                patient.patient_address,
              ],
              (err, results) => {
                if (err) {
                  throw err;
                }
              }
            );
          }
        }
      );
    }
  } else {
    //Validation of user input
    validator.isEmpty(doctor.contact)
  if (validator.isEmpty(doctor.f_name) || validator.isEmpty(doctor.l_name) || validator.isEmpty(doctor.specification) || validator.isEmpty(doctor.contact) ) {
    errors.push({ message: "All records required" });
  }
  //
  //Check if there are any errors
  if ( errors.length > 0 ){
    res.json(errors);
  }else{
    //db checks for similar records then storage after passing validation
    pool.query(
        `SELECT * FROM doctors 
        WHERE contact = $1`, 
        [doctor.contact], 
        (err,results) => {
            if (err){
                throw err;
            }
            //
            //check for duplicate value in the db
            if (results.rows.length > 0){
                errors.push({message:"Doctor with similar phone number already registered"});
                res.json(errors);
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
  }
}

//
//exports
module.exports = {addUser};
