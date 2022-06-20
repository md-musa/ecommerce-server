const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProductByCategory,
  products,
  getBestSellingProducts,
  addManyProduct,
  getProduct,
  searchProduct,
} = require('../controllers/product');
const authenticateAdmin = require('../middlewares/admin');
const authenticateUser = require('../middlewares/auth');

router.get('/', products);
router.get('/search/:term', searchProduct);
router.get('/bestSellingProducts', getBestSellingProducts);
router.post('/', addProduct);
router.get('/:id', getProduct);
router.get('/categories/:category', getProductByCategory);
router.post('/addMany', authenticateUser, authenticateAdmin, addManyProduct);
router.get('/productByCategory/:name', getProductByCategory);

module.exports = router;
