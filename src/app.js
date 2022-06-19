require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
// const winston = require('winston');
// const logger = require('./config/logger');
const port = process.env.PORT || 5000;
// Middlewares
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const authenticateUser = require('./middlewares/auth');
// Routes
const cart = require('./routes/cart');
const auth = require('./routes/auth');
const order = require('./routes/order');
const product = require('./routes/product');
const category = require('./routes/category');
const wishList = require('./routes/wishList');

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

connectDB();

app.use((req, res, next) => {
  console.log('PATH  ==> ', req.path);
  console.log('TOKEN ==> ', req.headers.authorization && true);
  next();
});
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/api/users', auth);
app.use('/api/wishLists', wishList);
app.use('/api/categories', category);
app.use('/api/products', product);
app.use('/api/carts', cart);
app.use('/api/orders', order);
app.use(errorHandler);

app.listen(port, () => console.log(`-> Server running at port ${port} ...`));
