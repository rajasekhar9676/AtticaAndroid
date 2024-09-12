import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed in your project
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfileDetails = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    try {
      // Get token from AsyncStorage (assuming you store it after login)
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch user profile data
      const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile Details</Text>

      <Text style={styles.label}>Username: {profileData.username}</Text>
      <Text style={styles.label}>Email: {profileData.email}</Text>
      <Text style={styles.label}>Mobile: {profileData.mobile}</Text>
      <Text style={styles.label}>Address: {profileData.address}</Text>
    </View>
  );
};

export default MyProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});
