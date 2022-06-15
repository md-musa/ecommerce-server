const logger = require('../config/logger');

function errorHandler(error, req, res, next) {
  // logger.error(error.stack)

  console.log(error.message);
  console.log(error.getStatusCode());

  res.status(error.getStatusCode()).send({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
}

module.exports = errorHandler;
