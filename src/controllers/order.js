const Order = require('../models/order');

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

const orders = async (req, res) => {

    const orders = await Order.find();

    return res.status(200).json({
      orders,
    });
 
};

const totalSalesAndOrders = async (req, res) => {

    const orders = await Order.find();
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);

    return res.send({ totalSales: totalSales, totalOrders: orders.length });
 
};

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

const orderedProducts = async (req, res) => {
  const { id } = req.params;

 
    const order = await Order.findById(id).populate('items.productId');
    console.log(order);
    return res.send(order);
  
  
};

const lastWeekSales = async (req, res) => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  console.log(lastWeek);

 
    const orders = await Order.find();
    console.log(orders[0].date < lastWeek);
    res.send(orders);
    // const totalSales = orders.reduce((acc, order) => acc + order.total, 0);

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
