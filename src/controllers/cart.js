const Cart = require('../models/cart');

const addItemToCart = async (req, res) => {
  const { user, item } = req.body;

  try {
    const cart = await Cart.findOne({ user: user });

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
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const updateQuantity = async (req, res) => {
  const { user, product, type } = req.body;

  try {
    const cart = await Cart.findOne({ user: user });
    const [item] = cart.items.filter(item => item.product == product);

    if (type === 'increment') item.quantity++;
    else if (type === 'decrement' && item.quantity > 1) item.quantity--;

    const result = await cart.save();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const removeItem = async (req, res) => {
  const { user, product } = req.body;

  try {
    const cart = await Cart.findOne({ user: user });
    if (cart.items.length == 0) return res.send({ message: 'cart is empty' });

    const items = cart.items.filter(item => item.product != product);
    cart.items = items;

    const result = await cart.save();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const cartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.user });
    if (!cart) return res.send({ message: 'Cart is empty' });
    res.send(cart.items);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addItemToCart,
  updateQuantity,
  removeItem,
  cartItems,
};
