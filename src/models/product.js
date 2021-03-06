const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },

    sold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },
    images: [{ type: String, required: true }],
    category: {
      type: String,
      required: true,
    },
    rating: { type: Number, default: 0 },

    highlights: [
      {
        service: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    specifications: [
      {
        service: { type: String },
        description: { type: String },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedAt: Date,
  },
  { timestamp: true }
);

module.exports = mongoose.model('Product', productSchema);
