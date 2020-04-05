exports.checkManagerLogin = function (req, res, next) {
  if (req.session != null && req.session.userinfo != null && req.session.userinfo.type !=0) {
    next() 
  }else{
    res.redirect(`/manager/login`);
  }
};

exports.checkEmployeeLogin = function (req, res, next) {
  if (req.session != null && req.session.userinfo != null && req.session.userinfo.type !=1) {
    next();
  }else{
    return res.redirect(`/employee/login`);
  }
 
};