const logger = require('../config/logger');

module.exports = function (error, req, res, next) {
  console.log('ERR===>', error);
  // logger.error(error.message, error);
  res.status(500).send(error);
};
