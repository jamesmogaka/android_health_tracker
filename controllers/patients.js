//Module importation
const pool = require("../config/db_config")
//
//function to return all the patient users
//useful when we will be showing list of patients who you have contacts for
function getPatients(){

    pool.query(`select * from patients`)
    .then((result) => {
        return result.rows;
    })
    .catch((err) => {throw err;});
 }

 //Return a patient of specific id
 function selectPatient(ids){
    if (ids.length > 0)
    pool.query(`select * from patients where id = $1`,[ids])
    .then((result) => {
        return result.rows;
    })
    .catch((err) => {throw err;});
 }
 //Delete a specific patient
 function deletePatient(id){
    pool.query(`delete from patients where id = $1`,[id])
    .then(()=>{return 'successful'})
    .catch(err=>{`An error occurred ${err}`});
 }

 //Update a specific patient
function updatePatient(id,patient){
    pool
      .query(
        `update patients set f_name = $1, l_name = $2, date_of_birth = $3, contact = $4, patient_address = $5 where id = $6`,
        [patient.f_name, patient.l_name, patient.date_of_birth, patient.contact, patient.patient_address, id]
      )
      .then(() => {
        return "Operation successful";
      })
      .catch((err) => {
        return `An error occurred ${err}`;
      });
}

 module.exports = {
    selectPatient,
    getPatients,
    deletePatient,
    updatePatient

}