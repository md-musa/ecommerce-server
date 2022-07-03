const express = require('express');

const {
  addOrder,
  totalSalesAndOrders,
  orders,
  updateStatus,
  myOrders,
  lastWeekSales,
  handlePayment,
} = require('../controllers/order');
const authenticateAdmin = require('../middlewares/admin');
const authenticateUser = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, orders);
router.get('/totalSalesAndOrders', authenticateUser, authenticateAdmin, totalSalesAndOrders);
router.get('/myOrders', authenticateUser, myOrders);
router.get('/lastWeekSales', authenticateUser, authenticateAdmin, lastWeekSales);
router.patch('/updateStatus/:id', authenticateUser, authenticateAdmin, updateStatus);

module.exports = router;
