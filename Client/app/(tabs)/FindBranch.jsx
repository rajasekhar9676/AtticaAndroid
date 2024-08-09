import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const FindBranch = () => {
  const [branches, setBranches] = useState([]);

  // Function to store the user's location in AsyncStorage
  const storeLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      await AsyncStorage.setItem('latitude', location.coords.latitude.toString());
      await AsyncStorage.setItem('longitude', location.coords.longitude.toString());
    } catch (error) {
      Alert.alert('Error', 'Failed to store location');
    }
  };

  // Function to fetch nearest branches
  const findNearestBranch = async () => {
    try {
      // Store location first
      await storeLocation();

      // Retrieve the user's current location from AsyncStorage
      const latitude = await AsyncStorage.getItem('latitude');
      const longitude = await AsyncStorage.getItem('longitude');

      if (!latitude || !longitude) {
        Alert.alert('Error', 'Location data not found');
        return;
      }

      // Construct the API URL with latitude and longitude
      const apiUrl = `https://e89c-2401-4900-1f28-6e01-74c0-d168-60ec-e67.ngrok-free.app/api/branches/find-nearest?latitude=${latitude}&longitude=${longitude}`;

      // Make the API request to find nearest branches
      const response = await axios.get(apiUrl);

      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        setBranches(response.data);
      } else {
        Alert.alert('Error', 'Unexpected response data format');
      }
    } catch (error) {
      console.error('Error fetching nearest branches:', error);
      Alert.alert('Error', 'Failed to fetch nearest branches');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Find Nearest Branch" onPress={findNearestBranch} />
      <FlatList
        data={branches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log('Branch Item:', item); // Log each item for debugging
          return (
            <View style={styles.branch}>
              <Text style={styles.branchName}>{item.name}</Text>
              <Text>Distance: {item.distance.toFixed(2)} meters</Text>
              <Text>{item.state}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  branch: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  branchName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FindBranch;
