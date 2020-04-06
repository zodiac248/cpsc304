var db = require("./db.js");
function getAllMedications(callback){
  db.getConnection().query('select * from protocol_medication_assessment',function(error,result){
      callback(error,result)
    })
}
module.exports = {
  getAllMedications
}