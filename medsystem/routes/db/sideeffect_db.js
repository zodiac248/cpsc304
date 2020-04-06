var db = require("./db.js");

function getEffectByPartId(id,callback) {
  db.getConnection().query('select a.*,b.type as effect ,b.level as effect_level from side_effect_report a left join effect_type b on a.effect_type = b.id where part_id = ?',[id], function (error, result) {
      callback(error, result)
  })
}
function addeffect(symptom,part_id,effect_type,callback) {
  db.getConnection().query('insert into side_effect_report set symptom=?,part_id=?,effect_type=?',[symptom,part_id,effect_type], function (error, result) {
      callback(error, result)
    })
}
function effectGroupBy(employee_id,callback) {
  db.getConnection().query('select count(1) as count,c.name  from side_effect_report a left join participant_enroll b  on a.part_id = b.id  left join protocol_medication_assessment c on b.med_id = c.id where b.employee_id = ? group by b.med_id',[employee_id], function (error, result) {
      callback(error, result)
    })
}

module.exports = {
  getEffectByPartId,
  addeffect,
  effectGroupBy
}