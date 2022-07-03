const express = require('express');

const router = express.Router();
const {
  addProduct,
  getProductByCategory,
  products,
  getBestSellingProducts,
  addManyProduct,
  getProduct,
  addReview,
  searchProduct,
} = require('../controllers/product');
const authenticateAdmin = require('../middlewares/admin');
const authenticateUser = require('../middlewares/auth');
const uploadImages = require('../middlewares/uploadImages');

router.get('/', products);
router.get('/search/:term', searchProduct);
router.get('/bestSellingProducts', getBestSellingProducts);
router.post('/', authenticateUser, authenticateAdmin, uploadImages, addProduct);
router.get('/:id', getProduct);
router.get('/categories/:category', getProductByCategory);
router.post('/addMany', authenticateUser, authenticateAdmin, addManyProduct);
router.get('/productByCategory/:name', getProductByCategory);
router.post('/review/:productId', authenticateUser, addReview);

module.exports = router;
