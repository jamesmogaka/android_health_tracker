// import modules
const express = require('express');
const addUser =require("../helpers/user").addUser;

//
//create an instance of the router object
const userRouter = express.Router();

// patient routes /patient

userRouter.route("/patient")
.get((req,res) =>{
//
//Return a list of patients
})
.post((req,res) =>{
    //
    //Add a patient user.
    addUser("patient",req.body);
})
//
//

//
//Doctor routes /doctor
userRouter.route("/doctor")
.get((req,res) =>{
//
//Return a list of doctors
})
.post((req,res) =>{
//
//Add a doctor user.
addUser("doctor",req.body);

})


module.exports = userRouter;
