const WishList = require('../models/wishList');
const {
  NotFound,
  InternalServerError,
  BadRequest,
} = require('../utils/errors');

const getWishListProducts = async (req, res) => {
  const id = req.user._id;
  const wishList = await WishList.findOne({ user: id }).populate('products');
  // console.log(wishList);

  if (!wishList) res.send([]);

  res.send(wishList.products);
};
const itemInWishList = async (req, res) => {
  const wishList = await WishList.findOne({ user: req.user._id });
  const inWishList = wishList.products.includes(req.params.id);
  if (inWishList) res.send(true);
  else res.send(false);
};

const removeItem = async (req, res) => {
  const wishList = await WishList.findOne({ user: req.user._id });
  const remainingItems = wishList.products.filter(
    item => item != req.params.id
  );
  wishList.products = remainingItems;
  await wishList.save();

  const data = await WishList.findOne({ user: req.user._id }).populate(
    'products'
  );
  res.send(data.products);
};

const addWishListProduct = async (req, res) => {
  const { _id } = req.body;
  const wishList = await WishList.findOne({ user: req.user._id });

  if (wishList) {
    const itemInWishList = wishList.products.some(itemId => itemId == _id);
    if (itemInWishList) throw new BadRequest('Item already in wishList');

    wishList.products.push(_id);
    await wishList.save();

    res.send(true);
  } else {
    const newWishList = new WishList({ user: req.user._id, products: [_id] });
    await newWishList.save();

    res.send(true);
  }
};

module.exports = {
  removeItem,
  itemInWishList,
  addWishListProduct,
  getWishListProducts,
};
