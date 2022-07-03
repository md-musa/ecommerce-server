const Cart = require('../models/cart');
const Order = require('../models/order');
const mongoose = require('mongoose');

/**
 * @description Add new order
 * @route       POST /api/payment/webhook
 * @access      Private
 * @return     {Object}
 */
const placeOrder = async data => {
  const {
    address,
    paymentId,
    userEmail,
    shippingAddress,
    phone,
    email,
    cartId,
    paymentStatus,
  } = data;

  const cart = await Cart.find(mongoose.Types.ObjectId(cartId));
  if (!cart) {
    console.log('❌', cart);
    return;
  }
  const products = cart.products;

  const order = new Order({
    userEmail,
    paymentId,
    paymentStatus,
    address,
    shippingAddress,
    phone,
    email,
    products,
  });
  await order.save();

  if (paymentStatus === 'paid') {
    const deleteCart = await Cart.findByIdAndDelete(cartId);
  }

  return;
};

/**
 * @description Get all orders
 * @route       GET /api/orders/
 * @access      Private
 * @return     {Array} Orders
 */
const orders = async (req, res) => {
  const orders = await Order.find();

  return res.json({
    orders,
  });
};

/**
 * @description Get total sales and orders
 * @route       GET /api/orders/totalSalesAndOrders
 * @access      Private
 * @return     {Object}
 */
const totalSalesAndOrders = async (req, res) => {
  const orders = await Order.find();
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  return res.send({ totalSales, totalOrders: orders.length });
};

/**
 * @description Update order status
 * @route       Patch /api/orders/updateStatus/:id
 * @access      Private
 * @return     {Object}
 */
const updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);
  order.status = status;
  await order.save();

  return res.json({
    message: 'Order status updated successfully',
    order,
  });
};

/**
 * @description Update order status
 * @route       GET /api/orders/
 * @access      Private
 * @return     {Array} products
 */
const myOrders = async (req, res) => {
  const order = await Order.find({ user: req.user._id }).populate(
    'products.product'
  );
  return res.send(order);
};
/**
 * @description Get last week sales
 * @route       GET /api/orders/lastWeekSales
 * @access      Private
 * @return     {Object}
 */
const lastWeekSales = async (req, res) => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  const orders = await Order.find();
  res.send(orders);
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);

  return res.status(200).json({ totalSales });
};

module.exports = {
  lastWeekSales,
  placeOrder,
  totalSalesAndOrders,
  orders,
  updateStatus,
  myOrders,
};
