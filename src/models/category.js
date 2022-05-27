const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    slug: { type: String, required: true, unique: true },
    image:{type: String},
    subCategories:{
      type: Array,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model('Category', categorySchema);
