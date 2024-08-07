import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User History</Text>
      <Text style={styles.content}>This is the user history page.</Text>
      {/* Add more content or functionality here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    color: '#555',
  },
});

export default UserHistory;
