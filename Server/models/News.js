// models/Update.js
const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String, // Change from [String] to String
  },
  images: {
    type: [String], // Array of image URLs or file paths
    required: true,
  }
});

module.exports = mongoose.model('Update', updateSchema);
