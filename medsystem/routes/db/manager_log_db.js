var db = require("./db.js");

function addLog(info,manager_id,callback) {
  db.getConnection().query('insert into manager_log set manager_id = ? ,info = ?',[manager_id,info], function (error, result) {
      callback(error, result)
    })
}


module.exports = {
  addLog
}