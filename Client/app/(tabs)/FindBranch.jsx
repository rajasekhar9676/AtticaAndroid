import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

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
      const apiUrl = `https://androidbackend-15.onrender.com/api/branches/find-nearest?latitude=${latitude}&longitude=${longitude}`;

      // Make the API request to find nearest branches
      const response = await axios.get(apiUrl);

      console.log(response.data, "reposnseeeeeeeeeeeeeee")

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
    <>

      {/* Header */}
      <View style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
        <AntDesign name="shoppingcart" size={24} color="white" />
      </View>

      {/* Main Container */}
      <View style={styles.container}>
        <Button title="Find Nearest Branch" onPress={findNearestBranch} />
        <FlatList
          data={branches}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.branch}>
              <Text style={styles.branchName}>{item.name}</Text>
              <Text>Distance: {item.distance.toFixed(2)} meters</Text>
              <Text>{item.state}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    zIndex: 1000, // Ensures the header stays on top
  },
  logo: {
    width: 150,
    height: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
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
