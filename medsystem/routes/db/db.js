var mysql = require('mysql');
var config = require('../../config/index')
var connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});
connection.connect();
exports.getConnection = function(){
  return connection;
};