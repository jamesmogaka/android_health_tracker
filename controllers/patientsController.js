//Module importation
const pool = require("../config/db_config");
const ErrorHandler = require('../utils/errorHandler');
//
//function to return all the patient users
//useful when we will be showing list of patients who you have contacts for
exports.getPatients = async(req,res,next) => {
  let patients = await pool.query(`select * from patients`);
  patients = patients.rows
  res.json({
    success:true,
    patients
  })
}

//Return a patient of specific id
exports.getPatient = async (req,res,next) => {
  const patient =  await pool.query(`select * from patients where id = $1`,[req.params.id])
  
  //
  if (!patient){
    return new ErrorHandler('Patient not found', 404);
  }
  //
  res.json({
    success:true,
    patient:patient.rows[0]
  })
}

//Delete a specific patient
exports.deletePatient = async (req,res,next) => {
  const patient = pool.query(`delete from patients where id = $1`,[req.params.id])
  res.json({
    success: true,
    patient
  })

}

//Update a specific patient
exports.updatePatient = async (req,res,next) => {
  let patient =  await pool.query(`select * from patients where id = $1`,[req.params.id])
  
  //
  if (!patient){
    return new ErrorHandler('Patient not found', 404);
  }

  patient = await pool.query(
      `update patients set f_name = $1, l_name = $2, date_of_birth = $3, contact = $4, patient_address = $5 where id = $6`,
      [patient.f_name, patient.l_name, patient.date_of_birth, patient.contact, patient.patient_address, req.params.id]
  );

  //
  res.json({
    success: true,
    patient
  })
}

