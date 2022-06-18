const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/category');
const authenticateUser = require('../middlewares/auth');
const authenticateAdmin = require('../middlewares/admin');

router.get('/', getCategories);
router.post('/', authenticateUser, authenticateAdmin, addCategory);

module.exports = router;
