const News = require('../models/NewsModels');

// Fetch all news (Read)
const getNews = async (req, res) => {
  try {
    const news = await News.find({});
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
};

// Fetch a single news item by ID (Read)
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news item', error });
  }
};

// Create a new news item (Create)
const createNews = async (req, res) => {
  const { headline, content, url, images } = req.body;
  try {
    const news = new News({
      headline,
      content,
      url,
      images,
    });
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: 'Error creating news', error });
  }
};

// Update an existing news item by ID (Update)
const updateNews = async (req, res) => {
  const { headline, content, url, images } = req.body;
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Update fields
    news.headline = headline || news.headline;
    news.content = content || news.content;
    news.url = url || news.url;
    news.images = images || news.images;

    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: 'Error updating news', error });
  }
};

// Delete a news item by ID (Delete)
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    await news.remove();
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news', error });
  }
};

module.exports = { getNews, getNewsById, createNews, updateNews, deleteNews };
