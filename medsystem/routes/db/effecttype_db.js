var db = require("./db.js");
function getAllEffectType(callback){
  db.getConnection().query('select * from effect_type',function(error,result){
      callback(error,result)
    })
}
module.exports = {
  getAllEffectType
}