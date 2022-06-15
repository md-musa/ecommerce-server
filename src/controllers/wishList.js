const WishList = require('../models/wishList');

const getWishListProducts = async (req, res) => {
  console.log(req.params);
  const products = await WishList.findOne({ user: req.params.id }).populate(
    'products'
  );
  res.send(products);
};

const addWishListProduct = async (req, res) => {
  const { productId, user } = req.body;
  const wishList = await WishList.findOne({ user });

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
