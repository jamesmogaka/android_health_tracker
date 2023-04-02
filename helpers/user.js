// import necessary modules
const pool = require("../config/db_config");
const validator = require("validator");
const admin = require('firebase-admin');
//

admin.initializeApp();

//a function to create a user
function addUser(category, personalInfo, firebaseId) {
  //
  //
  admin.auth().getUser(firebaseId)
  .then((userRecord) => {
    // Retrieve the phone number from the user record
    const phoneNumber = userRecord.phoneNumber;
  })
  .catch((error) => {
    console.error(`Error fetching user data: ${error}`);
  });
  return new Promise((resolve, reject) => {
    //
    //
    if (category == "patient") {
      registerPatient(personalInfo,phoneNumber)
        .then((result) => {
          return resolve(result);
        })
        .catch((errors) => {
          return reject(errors);
        });
    } else {
      registerDoctor(personalInfo,phoneNumber)
        .then((result) => {
          return resolve(result);
        })
        .catch((errors) => {
          return reject(errors);
        });
    }
  });
}
//
//
function registerPatient(patient,phoneNumber) {
  return new Promise((resolve, reject) => {
    const errors = [];

    // Validation of user input
    if (
      validator.isEmpty(patient.f_name) ||
      validator.isEmpty(patient.l_name) ||
      validator.isEmpty(patient.date_of_birth) ||
      validator.isEmpty(patient.patient_address)
    ) {
      errors.push({ message: "All records required" });
      return reject(errors);
    } else {
      // DB checks then storage after passing validation
      pool
        .query(
          `SELECT * FROM patients 
          WHERE contact = $1`,
          [phoneNumber]
        )
        .then((result) => {
          if (result.rows.length > 0) {
            errors.push({
              message: "User with similar phone number already registered",
            });
            return reject(errors);
          } else {
            pool
              .query(
                `INSERT INTO patients( f_name, l_name, date_of_birth, contact, patient_address) 
                  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [
                  patient.f_name,
                  patient.l_name,
                  patient.date_of_birth,
                  phoneNumber,
                  patient.patient_address,
                ]
              )
              .then((result) => {
                return resolve(result.rows[0]);
              })
              .catch((err) => {
                return reject(err);
              });
          }
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
}

//
//
function registerDoctor(doctor,phoneNumber) {
  return new Promise((resolve, reject) => {
    const errors = [];
    //Validation of user input
    if (
      validator.isEmpty(doctor.f_name) ||
      validator.isEmpty(doctor.l_name) ||
      validator.isEmpty(doctor.specification)
    ) {
      errors.push({ message: "All records required" });
      return reject(errors);
    } else {
      //db checks for similar records then storage after passing validation
      pool
        .query(
          `SELECT * FROM doctors 
        WHERE contact = $1`,
          [phoneNumber]
        )
        .then((result) => {
          //
          //check for duplicate value in the db
          if (result.rows.length > 0) {
            errors.push({
              message: "Doctor with similar phone number already registered",
            });
            return reject(errors);
          } else {
            pool
              .query(
                `INSERT INTO doctors( f_name, l_name, specification, contact) 
                  VALUES ($1, $2, $3, $4) RETURNING *`,
                [
                  doctor.f_name,
                  doctor.l_name,
                  doctor.specification,
                  phoneNumber,
                ]
              )
              .then((result) => {
                return resolve(result.rows[0]);
              })
              .catch((err) => {
                return reject(err);
              });
          }
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
}

//
//
module.exports = {
  addUser: addUser,
};
