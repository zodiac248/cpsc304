var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session)
var bodyParser = require('body-parser');

var employee = require('./routes/employee');
var manager = require('./routes/manager');
var app = express();

app.set('views', path.join(__dirname, 'views'));
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('view cache', false)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'test',
  name: 'test',
  cookie: {
    maxAge: 8000000
  },
  saveUninitialized: true,
  store: new FileStore()
}));

app.use('/employee', employee);
app.use('/manager', manager);
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  console.error(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('uncaughtException', (err) => {
  console.error(err)
});
module.exports = app;