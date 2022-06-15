const express = require('express');
const {
  addOrder,
  totalSalesAndOrders,
  orders,
  updateStatus,
  orderedProducts,
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
router.get('/:userId', authenticateUser, orderedProducts);
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
