// routes/updateRoutes.js
const express = require('express');
const router = express.Router();
const updateController = require('../controllers/newsController');
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

// Route to get all updates
router.get('/', updateController.getAllUpdates);

// Route to get a single update by ID
router.get('/:id', updateController.getUpdateById);

// Route to add a new update
router.post('/', upload.array('images'), updateController.addUpdate);

// Route to update an existing update
router.put('/:id', upload.array('images'), updateController.updateUpdate);

// Route to delete an update
router.delete('/:id', updateController.deleteUpdate);

module.exports = router;
