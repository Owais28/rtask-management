var mongoose = require('mongoose');
require('dotenv').config()

function connectDB() {
  mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start your server or perform any other operations
  })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error);
    });
}

module.exports = { connectDB }