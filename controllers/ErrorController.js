"use strict";

exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};

exports.respondNoResourceFound = (req, res) => {
  res.status(500).send(`${errorCode} | The page does not exist!`);
};

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res
    .status(500)
    .send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
