const express = require('express');

const router = express.Router();
const {
  addProduct,
  getProductByCategory,
  products,
  getBestSellingProducts,
} = require('../controllers/product');

router.get('/', products);
router.get('/bestSellingProducts', getBestSellingProducts);
router.post('/addProduct', addProduct);
router.get('/:productByCategory', getProductByCategory);

module.exports = router;
