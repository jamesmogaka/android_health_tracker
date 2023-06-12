// import modules
const express = require('express');
const helpers  =require("../helpers/user");

//Controller methods 
const {
    getPatients, 
    deletePatient,
    getPatient,
    updatePatient,
} = require("../controllers/patientsController");
const doctorController = require("../controllers/doctors");

//
//create an instance of the router object
const router = express.Router();

// patient routes /patient
//1.patient creation endpoint
router.route("/patient")
.get(getPatients)
.post(async (req,res) =>{
    //
    //Add a patient user. 
    //
    //Get the firebase id from the request which will be used to extract the phone number
    const authHeader = req.headers['auth'];
    //console.log(authHeader);
    //
    if (!authHeader) {
        return res.status(401).json('Unauthorized');
    }
    helpers.addUser("patient", req.body, authHeader).then((result)=>{
        return res.status(201).json(result);
    })
    .catch((error)=>{
        return res.status(400).json(error);
    })
    /*
    try{
        console.log("Before adding user");
        let result = await helpers.addUser("patient", req.body, authHeader);
        console.log("after adding user");
        res.status(201).json(result);
        res.end;
    } catch(e){
        console.log(e)
        res.status(400).json(e);
        res.end;
    } 
    */ 
})
//
//2.Delete & modify patient info endpoint
router.route('/patient/:id')
.get(getPatient)
.delete(deletePatient)
//route to modify specified patient
.put(updatePatient)

//
//Doctor routes /doctor
router.route("/doctor")
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
router.route("/doctor/:ID")
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


module.exports = router;
