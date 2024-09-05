import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import useRoute to access route params

const NewsMore = () => {
  const route = useRoute(); // Get route object
  const { newsId } = route.params; // Extract newsId from params

  // You can use newsId to fetch detailed news or use it as needed

  return (
    <View style={styles.container}>
      <Text>News ID: {newsId}</Text>
      {/* Render more details about the news */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default NewsMore;
