import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, FlatList, ImageBackground, Linking, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BASE_URL } from '../../constants';

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
      const apiUrl = `${BASE_URL}/api/branches/find-nearest?latitude=${latitude}&longitude=${longitude}`;

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

  // Function to open a map with the branch's location
  const openMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/back6.png')}
      style={styles.backgroundImage}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </View>

      {/* Main Container */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.findButton} onPress={findNearestBranch}>
          <Text style={styles.findButtonText}>Find Nearest Branch</Text>
        </TouchableOpacity>
        <FlatList
          data={branches}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.branch}>
              <Text style={styles.branchName}>{item.name}</Text>
              <Text style={styles.branchDistance}>Distance: {item.distance.toFixed(2)} meters</Text>
              <Text style={styles.branchState}>{item.state}</Text>
              <TouchableOpacity style={styles.mapButton} onPress={() => openMap(item.latitude, item.longitude)}>
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#8d181a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    zIndex: 1000, // Ensures the header stays on top
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logo: {
    width: 150,
    height: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 80, // Adjust to avoid overlap with the header
  },
  findButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  findButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  branch: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  branchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  branchDistance: {
    fontSize: 16,
    color: '#666',
  },
  branchState: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FindBranch;
