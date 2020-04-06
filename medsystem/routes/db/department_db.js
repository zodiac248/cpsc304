var db = require("./db.js");
function getAllDepartments(callback){
  db.getConnection().query('select * from department',function(error,result){
      callback(error,result)
    })
}
module.exports = {
  getAllDepartments
}