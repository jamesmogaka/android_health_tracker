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
.post(async (req,res) =>{
    //
    //Add a patient user. 
    //
    //Get the firebase id from the request which will be used to extract the phone number
    const authHeader = req.headers['Auth'];
    const idToken = authHeader ? authHeader.split(' ')[1] : null;

    if (!idToken) {
        return res.status(401).json('Unauthorized');
    }

    try{
        let result = await helpers.addUser("patient",req.body, idToken);
        res.status(201).json(result);
        res.end;
    } catch(e){
        res.status(401).json(e);
        res.end;
    }  
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
.post(async (req,res) =>{
    //
    //Add a Doctor user. 
    try{
        let result = await helpers.addUser("doctor",req.body);
        res.status(201).json(result);
        res.end;
    } catch(e){
        res.status(401).json(e);
        res.end;
    } 
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
