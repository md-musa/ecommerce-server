const Order = require('../models/order');

/**
 * @description Add new order
 * @route       POST /api/orders/
 * @access      Private
 * @return     {Object}
 */
const addOrder = async (req, res) => {
  const { userId, address, total, items } = req.body;

  const order = new Order({
    userId,
    address,
    total,
    items,
  });
  await order.save();

  return res.status(201).json({
    message: 'Order added successfully',
    order,
  });
};

/**
 * @description Get all orders
 * @route       GET /api/orders/
 * @access      Private
 * @return     {Array} Orders
 */
const orders = async (req, res) => {
  const orders = await Order.find();

  return res.status(200).json({
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
  return res.send({ totalSales: totalSales, totalOrders: orders.length });
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

  return res.status(200).json({
    message: 'Order status updated successfully',
    order,
  });
};

/**
 * @description Update order status
 * @route       GET /api/orders/:userId
 * @access      Private
 * @return     {Array} products
 */
const orderedProducts = async (req, res) => {
  const { userId } = req.params;
  const order = await Order.find({ userId }).populate('items.productId');
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
  addOrder,
  totalSalesAndOrders,
  orders,
  updateStatus,
  orderedProducts,
};
