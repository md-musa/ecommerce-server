const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth');
const {
  getWishListProducts,
  addWishListProduct,
  itemInWishList,
  removeItem,
} = require('../controllers/wishList');

router.get('/', authenticateUser, getWishListProducts);
router.get('/itemInWishlist/:id', authenticateUser, itemInWishList);
router.post('/', authenticateUser, addWishListProduct);
router.patch('/:id', authenticateUser, removeItem);

module.exports = router;
