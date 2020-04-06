var db = require("./db.js");

function getEmployeeInfo(callback) {
 
    db.getConnection().query('select a.id,a.name,a.phone,a.address,b.name as department from employee a left join department b on a.department_id = b.id', function (error, result) {
      callback(error, result)
    })

}
function getEmployeeInfoById(id,callback) {
  db.getConnection().query('select a.id,a.name,a.phone,a.address,a.password,b.id as departmentId,b.name as department from employee a left join department b on a.department_id = b.id where a.id = ?',[id], function (error, result) {
      callback(error, result)
    })
}
function deleteEmployee(id, callback) {
  db.getConnection().query("delete from employee where id= ?", [id], function (error, result) {
      callback(error, result)
    })
}

function addEmployee(name, password, phone, address, departmentId, callback) {
  db.getConnection().query("insert into employee set name = ?,password=?,phone=?,address=?,department_id=?", [name, password, phone, address, departmentId], function (error, result) {
      callback(error, result)
    })
}

function updateEmployee(id,name, password, phone, address, departmentId, callback) {
  db.getConnection().query("update employee set name = ?,password=?,phone=?,address=?,department_id=? where id = ?", [name, password, phone, address, departmentId,id], function (error, result) {
      callback(error, result)
    })
}

function getByPhoneAndPass(phone,pass,callback){
  db.getConnection().query('select * from employee where phone = ? and password = ?',[phone,pass],function(error,result){
      callback(error,result)
    })
}

module.exports = {
  getEmployeeInfo,
  deleteEmployee,
  addEmployee,
  getEmployeeInfoById,
  updateEmployee,
  getByPhoneAndPass
}