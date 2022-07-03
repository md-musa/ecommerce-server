const jwt = require('jsonwebtoken');
const { NotFound } = require('../utils/errors');

const authenticateUser = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded._id) throw new NotFound('Invalid user');

    req.user = decoded;
    next();
  }
};

module.exports = authenticateUser;
