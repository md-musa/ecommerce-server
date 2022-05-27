const slugify = require('slugify');
const Product = require('../models/product');
const Categories = require('../models/category');

/**
 * @description Add new product
 * @route       POST /api/product/addProduct
 * @access      Admin
 */
const addProduct = async (req, res) => {
  const {
    title,
    price,
    description,
    stock,
    brand,
    image,
    category,
    createdBy,
  } = req.body;
  console.log(req.body);

  const product = {
    title,
    slug: slugify(title).toLowerCase(),
    price,
    description,
    stock,
    brand,
    category,
    createdBy,
  };

  try {
    const newProduct = new Product(product);
    newProduct.images.push(req.body.image);

    const result = await newProduct.save();
    return res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

/**
 * @description Get product by category
 * @route       GET /api/product/:productByCategory
 * @access      Admin
 */
const getProductByCategory = async (req, res) => {
  const { category: categoryName } = req.params;
  try {
    const category = await Categories.findOne({ slug: categoryName });
    const products = await Product.find({ category: category._id });
    return res.send(products);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

const products = async (req, res) => {
  try {
    const products = await Product.find();
    return res.send({ products });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

const getBestSellingProducts = async (req, res) => {
  try {
    const items = await Product.find().sort({ sold: -1 }).limit(5);
    return res.send(items);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

module.exports = {
  getBestSellingProducts,
  addProduct,
  getProductByCategory,
  products,
};
