const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
