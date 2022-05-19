const express = require('express');

const router = express.Router();
const { addProduct, getProductByCategory } = require('../controllers/product');

router.post('/addProduct', addProduct);
router.get('/:productByCategory', getProductByCategory);

module.exports = router;
