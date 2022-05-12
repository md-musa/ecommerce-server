const express = require('express');
const { addCategory, getCategories } = require('../controllers/category');
const router = express.Router();

router.post('/create', addCategory);
router.get('/getCategories', getCategories);

module.exports = router;
