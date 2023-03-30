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
      validator.isEmpty(personalInfo.f_name) ||
      validator.isEmpty(personalInfo.l_name) ||
      validator.isEmpty(personalInfo.date_of_birth) ||
      validator.isEmpty(personalInfo.contact) ||
      validator.isEmpty(personalInfo.patient_address)
    ) {
      errors.push({ message: "All records required" });
    }
    //
    //Check if there are any errors
    if (errors.length > 0) {
      return errors;
    } else {
      //db checks then storage after passing validation
      pool.query(
        `SELECT * FROM patients 
            WHERE contact = $1`,
        [personalInfo.contact]).then((result) => {
        if (result.rows.length > 0) {
          errors.push({
            message: "User with similar phone number already registered",
          });
          return errors;
        } else {
          pool.query(
            `INSERT INTO patients( f_name, l_name, date_of_birth, contact, patient_address) 
                      VALUES ($1, $2, $3, $4, $5)`,
            [
              personalInfo.f_name,
              personalInfo.l_name,
              personalInfo.date_of_birth,
              personalInfo.contact,
              personalInfo.patient_address,
            ]) .then((result) => {return result.rows;})
            .catch((err) => {throw err;});
        }
      })
      .catch((err) => {throw err;});
    }
  } else {
    //Validation of user input
  if (validator.isEmpty(personalInfo.f_name) || validator.isEmpty(personalInfo.l_name) || validator.isEmpty(personalInfo.specification) || validator.isEmpty(personalInfo.contact) ) {
    errors.push({ message: "All records required" });
  }
  //
  //Check if there are any errors
  if ( errors.length > 0 ){
    return errors;
  }else{
    //db checks for similar records then storage after passing validation
    pool.query(
        `SELECT * FROM doctors 
        WHERE contact = $1`, 
        [personalInfo.contact])
        .then((result) => {
          //
            //check for duplicate value in the db
            if (result.rows.length > 0){
              errors.push({message:"Doctor with similar phone number already registered"});
              return errors;
          }else{
              pool.query(
                  `INSERT INTO doctors( f_name, l_name, specification, contact) 
                  VALUES ($1, $2, $3, $4)`,
                  [personalInfo.f_name, personalInfo.l_name, personalInfo.specification, personalInfo.contact]
              ) .then((result) => {return result.rows;})
              .catch((err) => {throw err;});
          }
        })
        .catch((err) => {throw err;});
  }
  }
}

//
//exports
module.exports = {addUser};
