// controllers/updateController.js
const Update = require('../models/News');
const path = require('path');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

// Add a new update
exports.addUpdate = (req, res) => {
  const { heading, description, url } = req.body;
  // Use multer to handle the file upload
  upload.single('image')(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    // Check if file was uploaded
    const imagePath = req.file ? req.file.path : '';
    
    const newUpdate = new Update({
      heading,
      description,
      url,
      image: imagePath
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
exports.updateUpdate = (req, res) => {
  const { heading, description, url } = req.body;
  // Use multer to handle the file upload
  upload.single('image')(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    // Check if file was uploaded
    const imagePath = req.file ? req.file.path : '';
    
    try {
      const updatedUpdate = await Update.findByIdAndUpdate(
        req.params.id,
        { heading, description, url, image: imagePath },
        { new: true }
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
