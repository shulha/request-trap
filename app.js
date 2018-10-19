const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const config = require('config');
const mongoose = require('mongoose');
const hbs = require('hbs');

mongoose.connect(config.DBHost, config.DBOptions);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('connection error:', err.message);
});
db.once('open', () => {
  console.info('Connected to DB!');
});

const router = require('./routes');

const app = express();

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
