const WishList = require('../models/wishList');
import { NotFound } from '../utils/errors';

const getWishListProducts = async (req, res) => {
  const products = await WishList.findOne({ user: req.user._id }).populate(
    'products'
  );
  res.send(products);
};

const addWishListProduct = async (req, res) => {
  const { productId } = req.body;
  const wishList = await WishList.findOne({ user: req.user._id });

  if (!wishList) throw new NotFound('WishList not found');

  if (wishList) {
    wishList.products.push(productId);
    await wishList.save();
    res.send(wishList).populate('products');
  } else {
    const newWishList = new WishList({ user: user, products: [productId] });
    await newWishList.save();
    res.send(newWishList).populate('products');
  }
};

module.exports = { addWishListProduct, getWishListProducts };
