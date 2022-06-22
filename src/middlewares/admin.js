const { Unauthorized } = require('../utils/errors');

function authenticateAdmin(req, res, next) {
  if (req.user.role === 'admin' || req.user.role === 'superAdmin') next();
  else throw new Unauthorized('You are not authorized to perform this action');
}

module.exports = authenticateAdmin;
