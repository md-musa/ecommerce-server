const slugify = require('slugify');
const Categories = require('../models/category');

/**
 * @description Create new category
 * @route       POST /api/category/addCategory
 * @access      Admin
 */
const addCategory = async (req, res) => {
  const { name, parentId } = req.body;

  const category = {
    name,
    slug: slugify(name),
  };
  if (parentId) category.parentId = parentId;

  try {
    const newCategory = new Categories(category);
    await newCategory.save();

    res.status(201).send(newCategory);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

function generateCategoryTree(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (parentId == null) category = categories.filter((category) => category.parentId == undefined);
  else category = categories.filter((category) => category.parentId == parentId);

  for (const category of category) {
    categoryList.push({
      _id: category._id,
      name: category.name,
      slug: category.slug,
      children: generateCategoryTree(categories, category._id),
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
  try {
    const categories = await Categories.find({});
    const categoryTree = generateCategoryTree(categories);

    return res.status(200).send(categoryTree);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

module.exports = { addCategory, getCategories };
