
// models/NewsModels.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  content: { type: String, required: true },
  url: { type: String, required: true },
  images: { type: [String], required: true },
});

const News = mongoose.model('news', newsSchema);
module.exports = News;

