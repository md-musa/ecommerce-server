const slugify = require('slugify');
const Categories = require('../models/category');

const addCategory = async (req, res) => {
  const { name, parentId } = req.body;

  const categoryObj = {
    name,
    slug: slugify(name),
  };
  if (parentId) {
    categoryObj.parentId = parentId;
  }

  try {
    const newCategory = new Categories(categoryObj);
    await newCategory.save();

    res.status(201).send(newCategory);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};

function arrangeCategories(categories, parentId = null) {
  const categoryList = [];

  let category;

  if (parentId == null)
    category = categories.filter(category => category.parentId == undefined);
  else category = categories.filter(category => category.parentId == parentId);

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: arrangeCategories(categories, cate._id),
    });
  }

  return categoryList;
}

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    const categoryList = arrangeCategories(categories);
    res.send(categoryList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = { addCategory, getCategories };
