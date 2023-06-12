// Import the functions you need from the SDKs you need
var admin = require("firebase-admin");

var serviceAccount = require("../android-health-tracker-firebase-adminsdk-4ziz1-13d411d8bf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// console.log(admin.auth().getUser("9eTGVgG4Pgd799i09owcpq7RpSa2"))

module.exports = admin;