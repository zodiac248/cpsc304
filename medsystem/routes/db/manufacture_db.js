var db = require("./db.js");
function getAllManufactures(callback){
  db.getConnection().query('select * from manufacture',function(error,result){
      callback(error,result)
    })
}
module.exports = {
  getAllManufactures
}