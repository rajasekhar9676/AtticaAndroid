const Update = require('../models/News'); // Ensure the correct path

const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique name
    }
});

const upload = multer({ storage: storage });

// Add a new update
exports.addUpdate = async (req, res) => {
    upload.array('images')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        let images = [];
        if (req.files) {
            images = req.files.map(file => file.path);
        }

        const { heading, description, url } = req.body;
        const newUpdate = new Update({
            heading,
            description,
            url,
            images
        });

        try {
            const savedUpdate = await newUpdate.save();
            res.status(201).json(savedUpdate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Update an existing update
exports.updateUpdate = async (req, res) => {
    upload.array('images')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        let images = [];
        if (req.files) {
            images = req.files.map(file => file.path);
        }

        // Handle external URLs
        const externalUrls = req.body.externalUrls ? req.body.externalUrls.split(',') : [];

        try {
            const updatedUpdate = await Update.findByIdAndUpdate(
                req.params.id,
                {
                    heading: req.body.heading,
                    description: req.body.description,
                    url: req.body.url,
                    images: images.concat(externalUrls) // Combine local file paths and external URLs
                },
                { new: true, runValidators: true } // Ensure validation
            );

            if (!updatedUpdate) {
                return res.status(404).json({ message: 'Update not found' });
            }
            res.json(updatedUpdate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Fetch all updates
exports.getAllUpdates = async (req, res) => {
    try {
        const updates = await Update.find();
        res.json(updates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single update by ID
exports.getUpdateById = async (req, res) => {
    try {
        const update = await Update.findById(req.params.id);
        if (!update) {
            return res.status(404).json({ message: 'Update not found' });
        }
        res.json(update);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an update
exports.deleteUpdate = async (req, res) => {
    try {
        const deletedUpdate = await Update.findByIdAndDelete(req.params.id);
        if (!deletedUpdate) {
            return res.status(404).json({ message: 'Update not found' });
        }
        res.json({ message: 'Update deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
