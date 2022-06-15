const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  makeAdmin,
} = require('../controllers/auth');
const authenticateAdmin = require('../middlewares/admin');
const authenticateUser = require('../middlewares/auth');
const authenticateSuperAdmin = require('../middlewares/superAdmin');

router.get('/', authenticateUser, authenticateAdmin, getUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.patch('/makeAdmin', authenticateUser, authenticateSuperAdmin, makeAdmin);

module.exports = router;
