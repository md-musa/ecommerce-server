const Cart = require('../models/cart');

/**
 * @description Add item to cart
 * @route       POST /api/carts/addItem
 * @access      Public
 * @return      {Object} cart
 */
const addItemToCart = async (req, res) => {
  console.log(req.body);
  const { product, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // const itemExist = cart.products.filter(
    //   product => product.product._id == product
    // );
    // if (itemExist.length)
    //   return res.send({ message: 'Item already in the cart' });
    console.log(cart.products);
    cart.products.push({ product: product, quantity: quantity ? quantity : 1 });
    const result = await cart.save();
    return res.send(result);
  }

  const newItem = new Cart({
    user: req.user._id,
    products: [{ product, quantity }],
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
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'products.product'
  );
  if (cart) cart.populate('products.product');
  if (!cart) return res.send([]);
  return res.send(cart.products);
};

/**
 * @description Update Item quantity
 * @route       POST /api/carts/updateQuantity
 * @access      private
 * @return      {Object} cart
 */
const updateQuantity = async (req, res) => {
  const { id, operation } = req.query;

  const cart = await Cart.findOne({ user: req.user._id });

  cart.products.forEach(item => {
    if (item._id == id) {
      if (operation === 'INCREMENT') item.quantity++;
      else if (operation === 'DECREMENT' && item.quantity > 1) item.quantity--;
    }
  });

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
  console.log('-------------------');
  const { id } = req.query;
  console.log('CART ID---> ', id);

  const cart = await Cart.findOne({ user: req.user._id });
  // console.log('cart=>', cart);
  if (cart.products.length === 0) return res.send([]);

  const items = cart.products.filter(item => item._id != id);
  // console.log(items);
  cart.products = items;

  const result = await cart.save();
  return res.send(result);
};

module.exports = {
  addItemToCart,
  updateQuantity,
  removeItem,
  cartItems,
};
