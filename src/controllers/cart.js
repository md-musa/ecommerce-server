const Cart = require('../models/cart');
const { BadRequest, NotFound } = require('../utils/errors');
const TAX = 0;
const DELIVERY_CHARGE = 10;
const APPLICABLE_DELIVERY_CHARGE = 100;

const cartCalculate = (products, discountPercentage = 1) => {
  const subTotal =
    products.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.quantity,
      0
    ) || 0;

  // console.log('SUB', subTotal);

  // const discount = (subTotalPrice * discountPercentage) / 100;
  // const remainingSubtotal = subTotalPrice - discount;

  if (subTotal <= APPLICABLE_DELIVERY_CHARGE && subTotal > 0) {
    return {
      subTotal: subTotal,
      deliveryCharge: DELIVERY_CHARGE,
      tax: subTotal * TAX,
      total: subTotal + TAX + DELIVERY_CHARGE,
    };
  } else {
    const tax = subTotal * TAX;
    return {
      subTotal: subTotal,
      deliveryCharge: 0,
      tax,
      total: subTotal + tax,
    };
  }
};

/**
 * @description Add item to cart
 * @route       POST /api/carts/addItem
 * @access      Public
 * @return      {Object} cart
 */
const addItemToCart = async (req, res) => {
  // console.log(req.body);
  const { productId, price, quantity = 1 } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const isItemAlreadyExist = cart.products.find(
      product => product._id == productId
    );
    if (isItemAlreadyExist)
      throw new BadRequest('Item already exist in the cart');

    cart.products.push({
      product: productId,
      price,
      quantity: quantity ? quantity : 1,
    });

    const { subTotal, deliveryCharge, tax, total } = cartCalculate(
      cart.products
    );
    cart.subTotal = subTotal;
    cart.deliveryCharge = deliveryCharge;
    cart.tax = tax;
    cart.total = total;

    const result = await cart.save();

    return res.send(result);
  }

  const newItem = new Cart({
    user: req.user._id,
    products: [{ product: productId, price, quantity }],
  });

  newItem.subTotal = price * quantity;
  newItem.deliveryCharge =
    price * quantity < APPLICABLE_DELIVERY_CHARGE ? DELIVERY_CHARGE : 0;
  newItem.tax = price * quantity * TAX;
  newItem.total = newItem.subTotal + newItem.deliveryCharge + newItem.tax;

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
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    'products.product'
  );

  if (!cart) throw new NotFound('Cart not found');

  return res.send(cart);
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

  const { subTotal, deliveryCharge, tax, total } = cartCalculate(cart.products);

  cart.subTotal = subTotal;
  cart.deliveryCharge = deliveryCharge;
  cart.tax = tax;
  cart.total = total;

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
  const { id } = req.query;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) throw new NotFound('Cart not found');

  const items = cart.products.filter(item => item._id != id);
  cart.products = items;

  const { subTotal, deliveryCharge, tax, total } = cartCalculate(cart.products);

  cart.subTotal = subTotal;
  cart.deliveryCharge = deliveryCharge;
  cart.tax = tax;
  cart.total = total;

  const result = await cart.save();
  return res.send(result);
};

module.exports = {
  addItemToCart,
  updateQuantity,
  removeItem,
  cartItems,
};
