const express = require('express');
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/NewsControllers');
const router = express.Router();

// Fetch all news items
router.get('/', getNews);

// Fetch a single news item by ID
router.get('/:id', getNewsById);

// Create a new news item
router.post('/', createNews);

// Update an existing news item by ID
router.put('/:id', updateNews);

// Delete a news item by ID
router.delete('/:id', deleteNews);

module.exports = router;
