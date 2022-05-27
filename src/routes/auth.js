const express = require('express');

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  makeAdmin,
} = require('../controllers/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.patch('/makeAdmin', makeAdmin);

module.exports = router;
