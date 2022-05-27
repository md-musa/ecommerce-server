const {
  addItemToCart,
  updateQuantity,
  removeItem,
  cartItems,
} = require('../controllers/cart');
const express = require('express');
const router = express.Router();

router.post('/addItem', addItemToCart);
router.get('/:userId', cartItems);
router.patch('/updateQuantity', updateQuantity);
router.delete('/removeItem', removeItem);

module.exports = router;
