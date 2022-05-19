const express = require('express');

const router = express.Router();
const { addCategory, getCategories } = require('../controllers/category');

router.post('/addCategory', addCategory);// adminMid, requireRegistration
router.get('/categories', getCategories);

module.exports = router;
