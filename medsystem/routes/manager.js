var express = require('express');
var router = express.Router();
var manager_db = require("./db/manager_db");
var employee_db = require("./db/employee_db");
var department_db = require("./db/department_db");
var async = require('async')
var auth = require('../auth/index')
var manager_log_db = require('./db/manager_log_db')
router.post('/loginByName', function (req, res, next) {
  let name = req.body.name;
  let password = req.body.password;
  manager_db.getByNameAndPass(name, password, function (error, result) {
    if (result && result.length) {
      req.session.userinfo = {
        id: result[0].id,
        name: result[0].name,
        type: 1
      };
      manager_log_db.addLog(JSON.stringify({
        type: "login",
        time: new Date()
      }), result[0].id, function (error, result) {
        return res.json({
          code: 0
        })
      })
      
    }else{
      return res.json({
        code: 1,
        error
      })
    }
  })
})

router.get('/login', function (req, res, next) {
  res.render('manager/login')
});

router.get('/', auth.checkManagerLogin, function (req, res, next) {

  employee_db.getEmployeeInfo(function (err, rows) {
    if (err) {
      res.render('manager/index', {
        name: '',
        employees: []
      }); // this renders "views/users.html"
    } else {
      res.render('manager/index', {
        name: req.session.userinfo.name,
        employees: rows
      })
    }
  })
});

router.post('/employee/delete/:id', auth.checkManagerLogin, function (req, res) {
  var id = req.params.id;
  employee_db.deleteEmployee(id, function (err, rows) {
    manager_log_db.addLog(JSON.stringify({
      type: "delete employee",
      time: new Date(),
      employee: id
    }), req.session.userinfo.id, function (error, result) {
      res.json({
        code: 0
      })
    })
  });
});

router.get('/employee/edit/:id', auth.checkManagerLogin, function (req, res) {
  var id = req.params.id;
  employee_db.getEmployeeInfoById(id, function (err, rows) {
    res.render('manager/edit', {
      employee: rows[0]
    })
  });
});

router.get('/employee/add', auth.checkManagerLogin, function (req, res) {
  res.render('manager/add');
});

router.post('/employee/add', auth.checkManagerLogin, function (req, res) {
  let name = req.body.name;
  let password = req.body.password;
  let phone = req.body.phone
  let address = req.body.address
  let departmentId = req.body.departmentId
  employee_db.addEmployee(name, password, phone, address, departmentId, function (error, result) {
    if (error) {
      res.json({
        code: 1001,
        error
      })
    } else {
      manager_log_db.addLog(JSON.stringify({
        type: "add employee",
        time: new Date(),
        employee: result[0]
      }), req.session.userinfo.id, function (error, result) {
        res.json({
          code: 0
        })
      })
     
    }
  })
});
router.post('/employee/update', auth.checkManagerLogin, function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let password = req.body.password;
  let phone = req.body.phone
  let address = req.body.address
  let departmentId = req.body.departmentId
  employee_db.updateEmployee(id, name, password, phone, address, departmentId, function (error, result) {
    if (error) {
      res.json({
        code: 1001,
        error
      })
    } else {
      manager_log_db.addLog(JSON.stringify({
        type: "update employee",
        time: new Date(),
        employee: id
      }), req.session.userinfo.id, function (error, result) {
        res.json({
          code: 0
        })
      })
     
    }
  })
});
router.get('/departments', auth.checkManagerLogin, function (req, res) {
  department_db.getAllDepartments(function (err, result) {
    let arr = []
    for (const data of result) {
      arr.push({
        id: data.id,
        text: data.name
      })
    }
    res.json({
      code: 0,
      result: arr
    })
  })

});



module.exports = router;