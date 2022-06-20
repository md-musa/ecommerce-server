const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  deliveryCharge: {
    type: Number,
    default: 0,
  },

  tax: {
    type: Number,
    default: 0,
  },

  isPomoCodeApplied: {
    type: Boolean,
    default: false,
  },

  discountPercentage: {
    type: Number,
    default: 0,
  },

  subTotal: {
    type: Number,
    default: 0,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);
