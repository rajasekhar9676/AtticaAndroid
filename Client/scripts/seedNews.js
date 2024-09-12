const mongoose = require('mongoose');
const News = require('./NewsModels');

const seedNews = async () => {
  await mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true, useUnifiedTopology: true });

  await News.deleteMany(); // Clear existing data

  const dummyNews = [
    {
      headline: 'Breaking: Major Event Happening Now',
      content: 'Details about the major event happening now.',
      url: 'http://example.com',
      images: ['http://example.com/image1.jpg', 'http://example.com/image2.jpg'],
    },
    {
      headline: 'Another Headline',
      content: 'Some content about another news headline.',
      url: 'http://example.com/another',
      images: ['http://example.com/image3.jpg'],
    },
  ];

  await News.insertMany(dummyNews);
  console.log('Dummy news data inserted');
  mongoose.connection.close();
};

seedNews();
