// server.js or index.js
// In server.js


const express = require('express');
const path = require('path');
const axios = require('axios');
const { connectToDatabase } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');
const productRoutes = require('./routes/productRoutes');
const goldRateRoutes = require('./routes/goldRateRoutes');
const newsRoutes = require('./routes/newsRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const { sendOTP, verifyOTP } = require('./otpService');
const { BASE_URL } = require('../Client/constants');


require('dotenv').config();
const cors = require('cors');

const app = express();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Connect to the database
connectToDatabase();

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (['http://localhost:8081', BASE_URL].indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

// Enable CORS with the specified options
app.use(cors(corsOptions));


// OTP Generate Code 
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  const result = await sendOTP(phoneNumber);
  if (result.success) {
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: result.error });
  }
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
  }

  const result = verifyOTP(phoneNumber, otp);
  if (result.success) {
    res.status(200).json({ success: true, message: result.message });
  } else {
    res.status(400).json({ success: false, message: result.message });
  }
});









// Routes

app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/goldRates', goldRateRoutes);
app.use('/api/news', newsRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







