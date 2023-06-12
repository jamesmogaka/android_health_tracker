// import necessary modules
const pool = require("../config/db_config");
const validator = require("validator");
const admin = require("../config/firebase_config");
//

//

//function to retrieve phone number form firebase
let getContact = (firebaseId) =>{
  return new Promise((resolve,reject)=>{
    admin.auth()
      .getUser(firebaseId)
      .then((userRecord) => {
        resolve(userRecord.phoneNumber);
      })
      .catch((error) => {
        reject(error)
      });
  })
}

//a function to create a user
function addUser(category, personalInfo, firebaseId) {
  return new Promise(async (resolve, reject) => {  
    //
    //
    //phone number
    let phoneNumber = await getContact(firebaseId);

    phoneNumber = "0".concat(phoneNumber.substr(4));
    
    //
    //
    if (category == "patient") {
      registerPatient(personalInfo, phoneNumber)
        .then((result) => {
          return resolve(result);
        })
        .catch((errors) => {
          return reject(errors);
        });
    } else {
      registerDoctor(personalInfo, phoneNumber)
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
function registerPatient(patient, phoneNumber) {
  return new Promise((resolve, reject) => {
    const errors = [];

    // Validation of user input
    
    Object.keys(patient).forEach(key => {
      if (validator.isEmpty(patient[key])){
        errors.push({ message: "All records required" });
        return reject(errors);
      }
    })

    // DB checks then storage after passing validation
    pool.query(
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
                  Object.keys(patient)[0],
                  Object.keys(patient)[1],
                  Object.keys(patient)[2],
                  phoneNumber,
                  Object.keys(patient)[4],
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
  })
}
//
//
function registerDoctor(doctor, phoneNumber) {
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
  addUser,
};
