const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
//* Routes
const user = require('./routes/auth');
const cart = require('./routes/cart');
const category = require('./routes/category');
const product = require('./routes/product');

mongoose
  .connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('-> Connected successfully with MongoDB...'))
  .catch(err => console.log(`-> Could not connected Error: ${err} `));

app.use(cors());
app.use(express.json());

app.use('/api/auth', user);
app.use('/api/category', category);
app.use('/api/product', product);
app.use('/api/cart', cart);

app.get('/', (req, res) => res.status(200).send('This is homepage'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`-> Server running at port ${port} ...`));
