const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../utils/errors');

const authenticateUser = (req, res, next) => {
  console.log(req.headers.authorization);

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throw new Unauthorized('Invalid token');
    req.user = decoded;
    next();
  } else
    throw new Unauthorized('You are not authorized to perform this action');
};

module.exports = authenticateUser;
