const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/auth');
const {
  getWishListProducts,
  addWishListProduct,
} = require('../controllers/wishList');

router.get('/:id', getWishListProducts);
router.post('/:id', addWishListProduct);

module.exports = router;
