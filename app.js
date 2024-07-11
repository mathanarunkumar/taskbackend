const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Import routes
const singUp = require('./routes/signUp-router')

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes

app.use('/api/v1/', singUp);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

// Connect to MongoDB
const connectMongoDb = require('./config/connectDatabase');
connectMongoDb();
