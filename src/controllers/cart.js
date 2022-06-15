const Cart = require('../models/cart');

/**
 * @description Add item to cart
 * @route       POST /api/carts/addItem
 * @access      Public
 * @return      {Object} cart
 */
const addItemToCart = async (req, res) => {
  const { user, item } = req.body;

  const cart = await Cart.findOne({ user });

  if (cart) {
    const itemExist = cart.items.filter(
      cartItem => cartItem.product == item.product
    );
    if (itemExist.length)
      return res.send({ message: 'Item already in the cart' });

    cart.items.push(item);
    const result = await cart.save();
    return res.send(result);
  }

  const newItem = new Cart({
    user,
    items: item,
  });

  const result = await newItem.save();
  return res.send(result);
};

/**
 * @description Get cart items
 * @route       POST /api/cart/:userId
 * @access      Private
 * @returns     {Object} cart
 */
const cartItems = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.send({ message: 'Cart is empty' });
  return res.send(cart.items);
};

/**
 * @description Update Item quantity
 * @route       POST /api/carts/updateQuantity
 * @access      private
 * @return      {Object} cart
 */
const updateQuantity = async (req, res) => {
  const { product, type } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  const [item] = cart.items.filter(item => item.product == product);

  if (type === 'increment') item.quantity++;
  else if (type === 'decrement' && item.quantity > 1) {
    item.quantity--;
  }

  const result = await cart.save();
  return res.send(result);
};

/**
 * @description Remove Item from cart
 * @route       POST /api/cart/removeItem
 * @access      Private
 * @return      {Object} cart
 */
const removeItem = async (req, res) => {
  //take user id using auth middleware
  const { user, product } = req.body;

  const cart = await Cart.findOne({ user });
  if (cart.items.length === 0) return res.send({ message: 'cart is empty' });

  const items = cart.items.filter(item => item.product !== product);
  cart.items = items;

  const result = await cart.save();
  return res.send(result);
};

module.exports = {
  addItemToCart,
  updateQuantity,
  removeItem,
  cartItems,
};
