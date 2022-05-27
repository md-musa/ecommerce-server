const express = require('express');
const {
  addOrder,
  totalSalesAndOrders,
  orders,
  updateStatus,
  orderedProducts,
  lastWeekSales,
} = require('../controllers/order');

const router = express.Router();

router.get('/', orders);
router.get('/totalSalesAndOrders', totalSalesAndOrders);
router.get('/:id', orderedProducts);
router.get('/lastWeekSales', lastWeekSales);
router.post('/addOrder', addOrder);
router.patch('/updateStatus/:id', updateStatus);

// router.get('/:id', getOrderById);
// router.delete('/cancelOrder/:id', cancelOrder);
// router.route('/:id').get(getOrderById).patch(updateOrderStatus)

module.exports = router;
