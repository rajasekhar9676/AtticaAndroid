const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, mobile, address } = req.body;
    const user = new User({username,  email, password, mobile, address });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user._id);
    res.json({ token, username: user.username, email: user.email, mobile: user.mobile, address: user.address });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = { registerUser, loginUser };


