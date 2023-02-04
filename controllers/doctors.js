//Module importation
const pool = require("../config/db_config")
//
//query to return all the doctors in the db
 function getDoctors(){
    if (ids.length > 0)
    pool.query(`select * from doctors`)
    .then((result) => {
        return result.rows;
    })
    .catch((err) => {throw err;});
 }

 //Return a doctor of specified id
 function selectDoctor(ids){
    if (ids.length > 0)
    pool.query(`select * from doctors where id = $1`,[ids])
    .then((result) => {
        return result.rows;
    })
    .catch((err) => {throw err;});
 }

 //Delete a specific doctor
 function deleteDoctor(id){
    pool.query(`delete from doctors where id = $1`,[id])
    .then(()=>{return 'successful'})
    .catch(err=>{`An error occurred ${err}`});
 }
//
//Update doctor record
function updateDoctor(id,doctor){
    pool
      .query(
        `update doctors set f_name = $1, l_name = $2, specification = $3, contact = $4 where id = $5`,
        [doctor.f_name, doctor.l_name, doctor.specification, doctor.contact, id]
      )
      .then(() => {
        return "Operation successful";
      })
      .catch((err) => {
        return `An error occurred ${err}`;
      });
}
 
 module.exports = {
     selectDoctor,
     getDoctors,
     deleteDoctor,
     updateDoctor
 }