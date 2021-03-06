const Category = require('../models/category');
const slugify = require('slugify');

/**
 * @description Create new category
 * @route       POST /api/categories/
 * @access      Admin
 * @return      {Object} of category
 */
const addCategory = async (req, res) => {
  const { name, parentId, image } = req.body;

  const category = new Category({
    name,
    slug: slugify(name),
    image,
    subCategories: [],
  });

  if (parentId) {
    const parentCategory = await Category.findById(parentId);
    parentCategory.subCategories.push(category);
    parentCategory.save();
    res.status(201).send(parentCategory);
  } else {
    const newCategory = await category.save();
    res.status(201).send(newCategory);
  }
};

/**
 * @description Get categories
 * @route       GET /api/categories
 * @access      Public
 * @return      {Object} of categories
 */
const getCategories = async (req, res) => {
  const id = req.query.id;

  if (id) {
    const categories = await Category.findById(id);
    return res.send(categories);
  }
  const subCategories = await Category.find();
  return res.send(subCategories);
};

module.exports = { addCategory, getCategories };

// function generateCategoryTree(categories, parentId = null) {
//   const categoryList = [];
//   let _categories;

//   if (parentId == null)
//     _categories = categories.filter(category => category.parentId == undefined);
//   else
//     _categories = categories.filter(category => category.parentId == parentId);

//   for (let i = 0; i < _categories.length; i++) {
//     categoryList.push({
//       _id: _categories[i]._id,
//       name: _categories[i].name,
//       slug: _categories[i].slug,
//       children: generateCategoryTree(categories, _categories._id),
//     });
//   }

//   return categoryList;
// }
