import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For Expo gradient background
import * as Animatable from 'react-native-animatable'; // For animations
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const email = await AsyncStorage.getItem('email');
        const mobile = await AsyncStorage.getItem('mobile');
        const address = await AsyncStorage.getItem('address');

        if (email && mobile && address) {
          setUserData({
            username,
            email,
            mobile,
            address
          });
        }
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage', error);
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Animatable.View animation="fadeIn" duration={1500} style={styles.imageContainer}>
            <Image source={require('../../assets/images/UserProfile.jpg')} style={styles.image} />
          </Animatable.View>
          <Animatable.Text animation="fadeInUp" duration={1500} style={styles.name}>{userData.username}</Animatable.Text>
          <Animatable.Text animation="fadeInUp" duration={1700} style={styles.email}>{userData.email}</Animatable.Text>
          <Animatable.Text animation="fadeInUp" duration={1700} style={styles.mobile}>{userData.mobile}</Animatable.Text>
          <Animatable.Text animation="fadeInUp" duration={1900} style={styles.address}>{userData.address}</Animatable.Text>
          
          {/* Additional Info Section */}
          <View style={styles.additionalInfoContainer}>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons name="edit" size={24} color="#fff" />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons name="settings" size={24} color="#fff" />
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.historyButton]}
              onPress={() => router.push('/user-history')}
            >
              <MaterialIcons name="history" size={24} color="#fff" />
              <Text style={styles.buttonText}>User History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Add padding at the top
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20, // Add bottom padding
  },
  profileContainer: {
    alignItems: 'center',
    padding: 30, // Increased padding for better spacing
    backgroundColor: '#fff',
    borderRadius: 20, // Rounded corners
    marginHorizontal: 20, // Horizontal margin for better layout
    marginVertical: 30,
    elevation: 8, // Increased shadow for more depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  imageContainer: {
    borderRadius: 80, // Circular container
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: '#fff',
    marginBottom: 15,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80, // Circular image
    transform: [{ scale: 1.05 }], // Slight zoom effect
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333', // Darker text for better readability
    marginVertical: 10,
  },
  email: {
    fontSize: 18,
    color: '#555', // Slightly lighter text for email
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#777', // Even lighter text for address
    textAlign: 'center',
    marginBottom: 20,
  },
  additionalInfoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '85%',
    justifyContent: 'center',
    marginVertical: 8,
    elevation: 2, // Slight shadow for buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  historyButton: {
    backgroundColor: '#28a745', // Green button for user history
  },
});

export default Profile;
