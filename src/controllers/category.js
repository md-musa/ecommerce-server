const slugify = require('slugify');
const Category = require('../models/category');

/**
 * @description Create new category
 * @route       POST /api/category/addCategory
 * @access      Admin
 */
const addCategory = async (req, res) => {
  const { name, parentId, image } = req.body;
};

function generateCategoryTree(categories, parentId = null) {
  const categoryList = [];
  let _categories;

  if (parentId == null)
    _categories = categories.filter(category => category.parentId == undefined);
  else
    _categories = categories.filter(category => category.parentId == parentId);

  for (let i = 0; i < _categories.length; i++) {
    categoryList.push({
      _id: _categories[i]._id,
      name: _categories[i].name,
      slug: _categories[i].slug,
      children: generateCategoryTree(categories, _categories._id),
    });
  }

  return categoryList;
}

/**
 * @description Get categories
 * @route       GET /api/category/categories
 * @access      Public
 */
const getCategories = async (req, res) => {
  const { id } = req.body;

  if (id) {
    const categories = await Category.findById(id);
    return res.send(categories);
  }
  const subCategories = await Category.find();
  return res.send(subCategories);
};

module.exports = { addCategory, getCategories };
