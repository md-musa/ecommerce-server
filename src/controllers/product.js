const mongoose = require('mongoose');
const Product = require('../models/product');
const slugify = require('slugify');
const Categories = require('../models/category');
const { ObjectId } = require('mongodb');

const addProduct = async (req, res) => {
  const { name, price, description, category, createdBy } = req.body;

  if (!req.files.length)
    return res.send({ message: "product's image required" });

  let productImages = req.files.map(file => {
    return { img: file.filename };
  });

  console.log(productImages);
  const product = {
    name,
    slug: slugify(name),
    price,
    description,
    productImages,
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

const getProductByCategory = async (req, res) => {
  const { category: categoryName } = req.params;
  try {
    const category = await Categories.findOne({ slug: categoryName });
    console.log(category);
    const products = await Product.find({ category: category._id });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { addProduct, getProductByCategory };
