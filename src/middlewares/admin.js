function isAdmin(req, res, next) {
  next();
}

module.exports = { adminMiddleware };
