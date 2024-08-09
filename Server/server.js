const express = require('express');
const { connectToDatabase } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const branchRoutes = require('./routes/branchRoutes');

const app = express();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}

// Connect to the database
connectToDatabase();

app.use(cors());
// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes); 

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
