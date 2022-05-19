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
    name,
    price,
    description,
    images,
    category,
    createdBy,
  } = req.body;

  const product = {
    name,
    slug: slugify(name),
    price,
    description,
    images,
    category,
    createdBy,
  };
  try {
    const newProduct = new Product(product);
    const result = await newProduct.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
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
    res.send(products);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { addProduct, getProductByCategory };
