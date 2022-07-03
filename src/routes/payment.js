const express = require('express');
const router = express.Router();
const { handlePayment, completeOrder } = require('../controllers/payment');
const authenticateUser = require('../middlewares/auth');
const bodyParser = express.raw({ type: 'application/json' });

router.post('/create-checkout-session', authenticateUser, handlePayment);
router.post('/webhook', bodyParser, completeOrder);

module.exports = router;
