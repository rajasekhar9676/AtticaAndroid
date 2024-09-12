// server.js or index.js
const express = require('express');
const path = require('path');
const { connectToDatabase } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');
const productRoutes = require('./routes/productRoutes');
const goldRateRoutes = require('./routes/goldRateRoutes');
const newsRoutes = require('./routes/NewsRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
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
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/goldRates', goldRateRoutes);
app.use('/api/news', newsRoutes); // Add the news route

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
