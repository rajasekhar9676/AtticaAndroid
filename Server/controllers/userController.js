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

    // Check if the email or mobile number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or mobile number already exists' });
    }

    const user = new User({
      username,
      email,
      password, // Save the plain password, it will be hashed in the pre-save hook
      mobile,
      address
    });
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

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Password entered:', password);
    console.log('Stored password (hashed):', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({ token, username: user.username, email: user.email, mobile: user.mobile, address: user.address });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };

