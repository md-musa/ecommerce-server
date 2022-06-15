const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      unique: true,
      required: true,
    },
  ],
});

module.exports = mongoose.model('WishList', wishListSchema);
