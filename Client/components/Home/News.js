// News.js
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from '../../constants';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news data from the server
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/news`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Breaking News</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.headline}>{item.headline}</Text>
            <Text style={styles.content}>{item.content}</Text>
            {Array.isArray(item.images) && item.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
            <Text style={styles.url}>{item.url}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newsItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  url: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default News;
