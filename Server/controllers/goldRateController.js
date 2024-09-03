const GoldRate = require('../models/GoldRate');

// Create a new gold rate
const createGoldRate = async (req, res) => {
    try {
        const { ratePerGram22k,ratePerGram24k, currency } = req.body;

        const newGoldRate = new GoldRate({
            ratePerGram22k,
            ratePerGram24k,
            currency,
        });

        const savedGoldRate = await newGoldRate.save();
        res.status(201).json(savedGoldRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all gold rates
const getAllGoldRates = async (req, res) => {
    try {
        const goldRates = await GoldRate.find();
        res.status(200).json(goldRates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a gold rate by ID
const getGoldRateById = async (req, res) => {
    try {
        const goldRate = await GoldRate.findById(req.params.id);

        if (!goldRate) {
            return res.status(404).json({ message: 'Gold rate not found' });
        }

        res.status(200).json(goldRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a gold rate by ID
const updateGoldRateById = async (req, res) => {
    try {
        const { ratePerGram, currency } = req.body;

        const updatedGoldRate = await GoldRate.findByIdAndUpdate(
            req.params.id,
            { ratePerGram, currency },
            { new: true, runValidators: true }
        );

        if (!updatedGoldRate) {
            return res.status(404).json({ message: 'Gold rate not found' });
        }

        res.status(200).json(updatedGoldRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a gold rate by ID
const deleteGoldRateById = async (req, res) => {
    try {
        const deletedGoldRate = await GoldRate.findByIdAndDelete(req.params.id);

        if (!deletedGoldRate) {
            return res.status(404).json({ message: 'Gold rate not found' });
        }

        res.status(200).json({ message: 'Gold rate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGoldRate,
    getAllGoldRates,
    getGoldRateById,
    updateGoldRateById,
    deleteGoldRateById,
};
