const express = require('express');
const {
  addOrder,
  totalSalesAndOrders,
  orders,
  updateStatus,
  myOrders,
  lastWeekSales,
} = require('../controllers/order');
const authenticateAdmin = require('../middlewares/admin');
const authenticateUser = require('../middlewares/auth');

const router = express.Router();

router.get(
  '/totalSalesAndOrders',
  authenticateUser,
  authenticateAdmin,
  totalSalesAndOrders
);
router.get('/', authenticateUser, orders);
router.post('/', authenticateUser, addOrder);
router.get('/myOrders', authenticateUser, myOrders);
router.get(
  '/lastWeekSales',
  authenticateUser,
  authenticateAdmin,
  lastWeekSales
);
router.patch(
  '/updateStatus/:id',
  authenticateUser,
  authenticateAdmin,
  updateStatus
);

// router.get('/:id', getOrderById);
// router.delete('/cancelOrder/:id', cancelOrder);
// router.route('/:id').get(getOrderById).patch(updateOrderStatus)

module.exports = router;
