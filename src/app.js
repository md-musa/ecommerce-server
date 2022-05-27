const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

// routes
const auth = require('./routes/auth');
const cart = require('./routes/cart');
const category = require('./routes/category');
const product = require('./routes/product');
const order = require('./routes/order');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/products', product);
app.use('/api/carts', cart);
app.use('/api/orders', order);

app.listen(port, () => console.log(`-> Server running at port ${port} ...`));
