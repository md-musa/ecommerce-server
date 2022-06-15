function authenticateSuperAdmin(req, res, next) {
  if (req.user.role === 'superAdmin') {
    next();
  } else {
    res
      .status(401)
      .json({ message: 'You are not authorized to access this resource' });
  }
}

module.exports = authenticateSuperAdmin;
