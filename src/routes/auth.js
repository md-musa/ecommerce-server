const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../middlewares/admin');
const authenticateUser = require('../middlewares/auth');
const authenticateSuperAdmin = require('../middlewares/superAdmin');
const { registerUser, loginUser, getUsers, makeAdmin } = require('../controllers/auth');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/', authenticateUser, authenticateAdmin, getUsers);
router.patch('/makeAdmin', authenticateUser, authenticateSuperAdmin, makeAdmin);

module.exports = router;
