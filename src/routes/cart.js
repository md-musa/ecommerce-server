const {
  addItemToCart,
  updateQuantity,
  removeItem,
  cartItems,
} = require('../controllers/cart');
const express = require('express');
const authenticateUser = require('../middlewares/auth');
const router = express.Router();

router.get('/', authenticateUser, cartItems);
router.post('/', authenticateUser, addItemToCart);
router.patch('/updateQuantity', authenticateUser, updateQuantity);
router.delete('/', authenticateUser, removeItem);

module.exports = router;
