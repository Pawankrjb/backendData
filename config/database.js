const mongoose = require('mongoose');

let isConnected = false; // Track connection status

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "campus-issue-reporter",
    });

    isConnected = true;

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    // Do not exit process in serverless, just log error
    throw error;
  }
};

module.exports = connectDB;