var express = require('express');
var router = express.Router();

var employee_db = require("./db/employee_db");
var department_db = require("./db/department_db");
var medication_db = require("./db/medication_db");
var participant_db = require("./db/paticipant_db");
var effecttype_db = require("./db/effecttype_db");
var sideeffect_db = require("./db/sideeffect_db");
var async = require('async')

var auth = require('../auth/index')

router.post('/loginByPhone', function (req, res, next) {
  let phone = req.body.phone;
  let password = req.body.password;
  employee_db.getByPhoneAndPass(phone, password, function (error, result) {
    if (result && result.length > 0) {
      req.session.userinfo = {
        id: result[0].id,
        name: result[0].name,
        type: 2
      };
      return res.json({
        code: 0
      })
    }
    return res.json({
      code: 1,
      error:"wrong name or password"
    })
  })
})

router.get('/login', function (req, res, next) {
  res.render('employee/login')
});

router.get('/', auth.checkEmployeeLogin, function (req, res, next) {
  res.render('employee/index', {
    name: req.session.userinfo.name
  })
});

router.get('/participant/index', auth.checkEmployeeLogin, function (req, res, next) {
  participant_db.getParticipants(req.session.userinfo.id, function (error, result) {
    res.render('employee/participant_index', {
      name: req.session.userinfo.name,
      participants: result
    })
  })

});

router.get('/participant/add', auth.checkEmployeeLogin, function (req, res, next) {
  res.render('employee/participant_add')
});


router.post('/participant/add', auth.checkEmployeeLogin, function (req, res, next) {
  let name = req.body.name;
  let age = req.body.age;
  let med_id = req.body.med_id
  participant_db.addParticipant(name, age, med_id, req.session.userinfo.id, function (error, result) {
    if (error) {
      res.json({
        code: 1001,
        error
      })
    } else {
      res.json({
        code: 0
      })
    }
  })
});

router.get('/report', auth.checkEmployeeLogin, function (req, res, next) {
  async.parallel([function (cb) {
      participant_db.getParticipantsGroupBy(req.session.userinfo.id, cb)
    },function (cb) {
      sideeffect_db.effectGroupBy(req.session.userinfo.id, cb)
    },

  ], function (error, result) {
    res.render('employee/report', {
      name: req.session.userinfo.name,
      data1: result[0],
      data2: result[1]
    })
  })

});
router.get('/participant/search', auth.checkEmployeeLogin, function (req, res, next) {
  res.render('employee/participant_search',{
    name: req.session.userinfo.name,
  })
});

router.post('/participant/search', auth.checkEmployeeLogin, function (req, res, next) {
  let min = Number(req.body.min);
  let max = Number(req.body.max);
  let manu = String(req.body.manu);
  let showName = req.body.showName =="true";
  let showMed = req.body.showMed == "true";
  let showEmp = req.body.showEmp == "true";
  participant_db.getParticipantsBy(min,max, manu, showName, showMed, showEmp, req.session.userinfo.id,function(error,result){
    res.json({
      code:0,
      data:result
    })
  })
});
router.post('/participant/showSideEffectPatient', auth.checkEmployeeLogin, function (req, res, next) {

  participant_db.showSideEffectPatient(req.session.userinfo.id,function(error,result){
    res.json({
      code:0,
      data:result
    })
  })
});

router.post('/participant/showAverageAgeByProtocol', auth.checkEmployeeLogin, function (req, res, next) {
  console.log("there");

  participant_db.showAverageAgeByProtocol(req.session.userinfo.id,function(error,result){
    console.log("here")
    console.log(error);
    res.json({
      code:0,
      data:result
    })
  })
});

router.get('/effectlist/:id', auth.checkEmployeeLogin, function (req, res, next) {
  let part_id = req.params.id;
  sideeffect_db.getEffectByPartId(part_id, function (error, result) {
    res.render('employee/effectlist', {
      name: req.session.userinfo.name,
      effectlist: result
    })
  })

});

router.get('/addeffect/:id', auth.checkEmployeeLogin, function (req, res, next) {
  let part_id = req.params.id;
  participant_db.getParticipantById(part_id, function (error, result) {
    res.render('employee/addeffect', {
      name: req.session.userinfo.name,
      participant: result[0]
    })
  })

});

router.get('/effect/types', auth.checkEmployeeLogin, function (req, res, next) {
  effecttype_db.getAllEffectType(function (error, result) {
    let arr = []
    for (const data of result) {
      arr.push({
        id: data.id,
        text: data.type
      })
    }
    res.json({
      code: 0,
      result: arr
    })
  })
});

router.get('/participant/effect/add', auth.checkEmployeeLogin, function (req, res, next) {
  res.render('employee/side_effect_add')
});

router.post('/participant/effect/add', auth.checkEmployeeLogin, function (req, res, next) {
  let part_id = req.body.part_id;
  let symptom = req.body.symptom;
  let effect_type = req.body.effect_type
  sideeffect_db.addeffect(symptom, part_id, effect_type, function (error, result) {
    if (error) {
      res.json({
        code: 1001,
        error
      })
    } else {
      res.json({
        code: 0
      })
    }
  })
});
router.get('/medications', auth.checkEmployeeLogin, function (req, res, next) {
  medication_db.getAllMedications(function (error, result) {
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