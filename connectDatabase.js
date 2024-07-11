const mongoose = require('mongoose');

const connectMongoDb = () => {
  const mongoUri = process.env.connectingMongoDb;

  if (!mongoUri) {
    throw new Error('MongoDB connection URI is not defined in environment variables.');
  }

  mongoose.connect(mongoUri)
    .then((con) => {
      console.log('MongoDB connected successfully: ' + con.connection.host);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
};

module.exports = connectMongoDb;

