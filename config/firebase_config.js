// Import the functions you need from the SDKs you need
var admin = require("firebase-admin");

var serviceAccount = require("../android-health-tracker-firebase-adminsdk-4ziz1-9756f9cfed.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;