const mongoose = require('mongoose');

const connectDB = async () => {
  const database =
    process.env.NODE_ENVIRONMENT === 'production'
      ? process.env.MONGODB_URI
      : process.env.MONGODB_URI_LOCAL;
  console.log(database);
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('-> Connected successfully with MongoDB...');
  } catch (err) {
    console.log(`-> Could not connected Error: ${err} `);
  }
};

module.exports = connectDB;
