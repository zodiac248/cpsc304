var db = require("./db.js");

function getParticipants(employeeId, callback) {
  db.getConnection().query('select a.*,b.name as med_name from participant_enroll a left join protocol_medication_assessment b on a.med_id = b.id  where employee_id = ?', [employeeId], function (error, result) {
    callback(error, result)
  })
}

function getParticipantsBy(min, max, manu, showname, showmed, showemp, employeeId, callback) {
  let sql = '';
  console.log(manu);
  let params = [employeeId];
  if (manu === "") {
    let selectString = 'a.id as part_id, a.age as age'
    if (showname) {
      selectString = selectString + ', a.name as part_name'
    }
    if (showmed) {
      selectString = selectString + ', a.med_id'
    }
    if (showemp) {
      selectString = selectString + ', a.employee_id'
    }
    sql = 'select ' + selectString + ",b.name as med_name, a.employee_id as empid from participant_enroll a left join protocol_medication_assessment b on a.med_id = b.id  where employee_id = ? "
    console.log(sql);
    if (min) {
      sql += ' and age >= ?';
      params.push(min)
    }
    if (max) {
      sql += ' and age <= ?';
      params.push(max)
    }
  } else {
    params.push(manu);
    let selectString = 'a.id as part_id, a.age as age'
    if (showname) {
      selectString = selectString + ', a.name as part_name'
    }
    if (showmed) {
      selectString = selectString + ', a.med_id'
    }


    sql = 'select ' + selectString + ", b.name as med_name, a.employee_id as empid from participant_enroll a left join protocol_medication_assessment b on a.med_id = b.id left join manufacturer c on c.id = b.manufacturer_id where employee_id = ? and c.manu_name = ?"
    console.log(sql);
  }
  if (min) {
    sql += ' and age >= ?';
    params.push(min)
  }
  if (max) {
    sql += ' and age <= ?';
    params.push(max)
  }

  db.getConnection().query(sql, params, function (error, result) {
    callback(error, result)
  })
}

function showSideEffectPatient(employeeId, callback) {
  db.getConnection().query('SELECT id, type as tp, level FROM effect_type sx WHERE NOT EXISTS(SELECT distinct p.part_id FROM side_effect_report p  where part_id NOT IN (SELECT distinct s2.part_id FROM  effect_type sp left join side_effect_report s2 on s2.effect_type = sp.id where sp.id = sx.id and s2.part_id is not null))', [employeeId], function (error, result) {
    callback(error, result)
  })
}

function showAverageAgeByProtocol(employeeId, callback) {
  db.getConnection().query('select avg(a.age) as average, b.name as med from participant_enroll a left join protocol_medication_assessment b on a.med_id = b.id where employee_id = ? group by med', [employeeId], function (error, result) {
    callback(error, result)
  })
}

function getParticipantsGroupBy(employeeId, callback) {
  db.getConnection().query('select count(1) as count,b.name as med from participant_enroll a left join protocol_medication_assessment b on a.med_id = b.id  where employee_id = ? group by a.med_id', [employeeId], function (error, result) {
    callback(error, result)
  })
}


function getParticipantById(id, callback) {
  db.getConnection().query('select * from participant_enroll where id = ?', [id], function (error, result) {
    callback(error, result)
  })
}

function addParticipant(name, age, med_id, employee_id, callback) {
  db.getConnection().query('insert into participant_enroll set name = ?, age = ?, med_id = ? ,employee_id = ?', [name, age, med_id, employee_id], function (error, result) {
    callback(error, result)
  })
}

module.exports = {
  getParticipants,
  addParticipant,
  getParticipantById,
  getParticipantsGroupBy,
  getParticipantsBy,
  showSideEffectPatient,
  showAverageAgeByProtocol
}