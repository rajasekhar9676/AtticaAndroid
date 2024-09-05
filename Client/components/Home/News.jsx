import { Text, View, TouchableOpacity, Image, Animated, FlatList, StyleSheet } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';

const ITEM_WIDTH = 240; // Adjusted width for a more balanced layout
const SCROLL_INTERVAL = 3000; // Interval in milliseconds

const News = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [newsData, setNewsData] = useState([]); // State to store fetched news data

  // Fetch updates from backend



  
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/news`); // Replace with your backend URL
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news updates:', error);
      }
    };

    fetchUpdates();
  }, []);

  useEffect(() => {
    let scrollValue = 0;
    let scrolled = 0;

    const scrollInterval = setInterval(() => {
      scrolled++;
      if (scrolled < newsData.length) {
        scrollValue = scrollValue + ITEM_WIDTH;
      } else {
        scrollValue = 0;
        scrolled = 0;
      }

      flatListRef.current?.scrollToOffset({ animated: true, offset: scrollValue });
    }, SCROLL_INTERVAL);

    return () => clearInterval(scrollInterval);
  }, [newsData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsContainer}
      onPress={() => navigation.navigate(item.navigateTo || 'NewsMore')} // Handle navigation
    >
      <View style={styles.newsContent}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{item.heading}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.readMore}>Read more..</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}/${item.image}` }} // Adjust URL path based on backend image path
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Updates</Text>
      <Animated.FlatList
        ref={flatListRef}
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Use unique identifier from backend data
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcecd4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8d181a',
    textAlign: 'center',
    marginBottom: 16,
  },
  newsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8d181a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 8,
    padding: 16,
    width: ITEM_WIDTH,
  },
  newsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    paddingRight: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8d181a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  readMore: {
    fontSize: 12,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default News;
