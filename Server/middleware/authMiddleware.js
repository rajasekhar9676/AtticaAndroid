// Corrected middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  // Initialize token variable
  let token;

  // Check if the authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database based on the decoded ID, excluding the password field
      req.user = await User.findById(decoded.id).select('-password');

      // Check if user exists
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Call the next middleware function
      next();
    } catch (error) {
      // Handle errors related to token verification
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no token is found, send a 401 response
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
