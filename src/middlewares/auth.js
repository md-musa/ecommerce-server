const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } else {
    return res.status(401).json({ message: 'Authentication required' });
  }
};

module.exports = authenticateUser;
