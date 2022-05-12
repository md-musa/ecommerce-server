const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const shortid = require('shortid');
const { addProduct, getProductByCategory } = require('../controllers/product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '_' + Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/:category', getProductByCategory);
router.post('/addProduct', upload.array('productImg'), addProduct);

module.exports = router;
