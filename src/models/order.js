const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  userEmail: { type: String, required: true },
  address: { type: Object, required: true },
  shippingAddress: { type: Object },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled'],
    default: 'pending',
  },

  date: { type: Date, default: Date.now },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
