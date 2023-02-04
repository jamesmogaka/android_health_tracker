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
    helpers.addUser("patient",req.body);
})
//
//2.Delete & modify patient info endpoint
userRouter.route("/patient/:id')")
.get((req,res) =>{
    res.json(patientController.selectPatient(req.params.id));
})
.delete((req,res) => {
    //call delete patient
    res.json(patientController.deletePatient(req.params.id));
})
//route to modify specified patient
.put(() => {
  //call modify patient
  res.json(patientController.updatePatient(req.params.id));
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
userRouter.route("/doctor/:id')")
.get((req,res) =>{
    res.json(doctorController.selectDoctor(req.params.id));
})
.delete((req,res) => {
    //call delete doctor function
    res.json(doctorController.deleteDoctor(req.params.id));
})
.put((req,res) => {
  //call modify doctor function
  res.json(doctorController.updateDoctor(req.params.id));
})


module.exports = userRouter;
