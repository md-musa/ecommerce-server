const slugify = require('slugify');
const Product = require('../models/product');
const Categories = require('../models/category');
const { NotFound } = require('../utils/errors');

/**
 * @description Add new product
 * @route       POST /api/products/
 * @access      Admin
 * @returns     {Object} product
 */
const addProduct = async (req, res) => {
  // console.log(images);
  // console.log(req.body);

  const { images } = req.body;

  const { title, price, description, stock, brand, category } = req.body;

  const product = {
    title,
    slug: slugify(title).toLowerCase(),
    price,
    description,
    stock,
    brand,
    category: slugify(category).toLowerCase(),
    createdBy: req.user._id,
    images,
  };

  const newProduct = new Product(product);

  const result = await newProduct.save();
  return res.status(201).send(result);
};
/**
 * @description Add many products
 * @route       POST /api/products/addMany
 * @access      Admin
 * @returns     {Object} products
 */ // Under development
const addManyProduct = async (req, res) => {
  req.body.products.forEach(async product => {
    const {
      title,
      price,
      description,
      stock,
      brand,
      image,
      category,
      createdBy,
    } = product;

    const productData = {
      title,
      slug: slugify(title).toLowerCase(),
      price,
      description,
      stock,
      brand,
      category,
      createdBy,
    };
    const newProduct = new Product(productData);
    newProduct.images.push(product.image);
    await newProduct.save();
  });

  const newProduct = new Product(product);
  newProduct.images.push(req.body.image);

  const result = await newProduct.save();
  return res.status(201).send(result);
};

/**
 * @description Get product by category
 * @route       GET /api/product/:productByCategory
 * @access      Admin
 * @returns     {Array} product
 */
const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  const { sort, min, max, rating } = req.query;
  // console.log(req.query);

  let products = await Product.find({ category });

  if (sort) {
    if (sort === 'ascending') {
      products.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (sort === 'descending') {
      products.sort((a, b) => (a.price > b.price ? -1 : 1));
    }
  }

  if (rating) {
    products = products.filter(item => item.rating >= parseInt(rating));
  }

  if (min && max) {
    products = products.filter(
      item => item.price >= parseInt(min) && item.price <= parseInt(max)
    );
  }

  res.send(products);
};

/**
 * @description Get all products
 * @route       GET /api/products
 * @access      Public
 * @return     {Array} of Products
 */
const products = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

/**
 * @description Get single product
 * @route       GET /api/products/:id
 * @access      Public
 * @return     {Object} Product
 */
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
};

/**
 * @description Get best selling products
 * @route       GET /api/products/bestSellingProducts
 * @access      Public
 * @return     {Array} Products
 */
const getBestSellingProducts = async (req, res) => {
  const items = await Product.find().sort({ sold: -1 }).limit(5);
  // console.log(items);
  res.send(items);
};

/**
 * @description Get product by searching
 * @route       GET /api/products/search
 * @access      Public
 * @return     {Array} of Products
 */
const searchProduct = async (req, res) => {
  const { term } = req.params;
  const items = await Product.find({
    title: { $regex: term, $options: 'i' },
  });
  res.send(items);
};

/**
 * @description Get product by searching
 * @route       GET /api/products/search
 * @access      Public
 * @return     {Array} of Products
 */
const addReview = async (req, res) => {
  const userId = req.user._id;
  const { rating, comment } = req.body;
  const { productId } = req.params;

  const item = await Product.findById(productId);
  if (!item) throw new NotFound('Not found');

  item.reviews.push({
    user: userId,
    rating,
    comment,
  });

  // setting the average rating for fast query
  const total = item.reviews.reduce((acc, curr) => acc + curr.rating, 0);
  item.rating = (total / item.reviews.length).toFixed(2);

  await item.save();

  res.send(item);
};

module.exports = {
  addReview,
  getBestSellingProducts,
  addProduct,
  getProductByCategory,
  products,
  addManyProduct,
  getProduct,
  searchProduct,
};
