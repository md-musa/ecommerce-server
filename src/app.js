require('express-async-errors');
require('dotenv').config();

const express = require('express');

const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

// routes
const auth = require('./routes/auth');
const cart = require('./routes/cart');
const category = require('./routes/category');
const product = require('./routes/product');
const order = require('./routes/order');
const error = require('./middlewares/error');

connectDB();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/api/category', category);
app.use('/api/products', product);
app.use('/api/carts', cart);
app.use('/api/orders', order);
app.use(error);

app.listen(port, () => console.log(`-> Server running at port ${port} ...`));
