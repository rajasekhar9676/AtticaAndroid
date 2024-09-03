const mongoose = require('mongoose');

const goldRateSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    ratePerGram22k: { type: Number, required: true },
    ratePerGram24k: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
});

const GoldRate = mongoose.model('GoldRate', goldRateSchema);
module.exports = GoldRate;

