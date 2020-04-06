var db = require("./db.js");
function getByNameAndPass(name,pass,callback){
  db.getConnection().query('select * from manager where name = ? and password = ?',[name,pass],function(error,result){
      callback(error,result)
    })
}

module.exports = {
  getByNameAndPass
}