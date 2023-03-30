// import modules
const express = require('express');
const helpers  =require("../helpers/user");
const patientController = require("../controllers/patients");
const doctorController = require("../controllers/doctors");

//
//create an instance of the router object
const userRouter = express.Router();
// patient routes /patient
//
//1.patient creation endpoint
userRouter.route("/patient")
.get((req,res) =>{
//
//Return a list of patients
res.json(patientController.getpatients());
})
.post((req,res) =>{
    //
    //Add a patient user.
    res.json(helpers.addUser("patient",req.body));
})
//
//2.Delete & modify patient info endpoint
userRouter.route('/patient/:ID')
.get((req, res) => {
    res.json(patientController.selectPatient(req.params.ID));
})
.delete((req,res) => {
    //call delete patient
    res.json(patientController.deletePatient(req.params.ID));
})
//route to modify specified patient
.put(() => {
  //call modify patient
  res.json(patientController.updatePatient(req.params.ID));
}
)

//
//Doctor routes /doctor
userRouter.route("/doctor")
.get((req,res) =>{
//
//Return a list of doctors
res.json(doctorController.getDoctors());

})
.post((req,res) =>{
//
//Add a doctor user.
addUser("doctor",req.body);

})
//
//Delete & modify doctor info endpoint
userRouter.route("/doctor/:ID")
.get((req,res) =>{
    res.json(doctorController.selectDoctor(req.params.ID));
})
.delete((req,res) => {
    //call delete doctor function
    res.json(doctorController.deleteDoctor(req.params.ID));
})
.put((req,res) => {
  //call modify doctor function
  res.json(doctorController.updateDoctor(req.params.ID));
})


module.exports = userRouter;
