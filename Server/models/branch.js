const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  state: { type: String, required: true },
});

module.exports = mongoose.model('Branch', branchSchema);
