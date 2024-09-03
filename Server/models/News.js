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
    type: String,
    required: true,
  },
  images: String,  // Array of image URLs
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Update', updateSchema);
