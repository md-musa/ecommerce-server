const logger = require('../config/logger');

function errorHandler(error, req, res, next) {
  // logger.error(error.stack)

  console.log('MESSAGE =============> ', error.message);
  // console.log('STATUS =============> ', error.getStatusCode() || 500);
  console.log('STACK ===============> ', error.stack);

  res.status(error.getStatusCode() || 500).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
}

module.exports = errorHandler;
