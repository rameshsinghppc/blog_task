require("dotenv").config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("./src/utils/db")
const indexRouter = require('./src/routes/index');
const { sendSuccessResponse, sendErrorResponse } = require('./src/utils/commonResponse');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware to verify the source of pre-login requests
app.use((req, res, next) => {
  const requestSource = req.headers['x-request-source'];
  if (!requestSource) {
    return sendErrorResponse(res, 401, 'Unauthorized', 'Missing request source header')
  }
  next();
});

app.use('/api/v1', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message || 'Internal Server Error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error msg
  sendErrorResponse(res, err?.status || 500, err.message)
});

module.exports = app;
