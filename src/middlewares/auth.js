const authenticateUser = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401);
    }

    if (!token) {
      return res.status(401);
    }
  }
};

module.exports = authenticateUser;
