import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Alert, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';


const { width } = Dimensions.get('window');

const Profile = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [initial, setInitial] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch registered person's name and set the initial
    const fetchUserData = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        if (userName) {
          setInitial(userName.charAt(0).toUpperCase()); // Set the first letter of the name
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  // Function to check if the client is registered
  const checkRegistrationStatus = async () => {
    try {
      const isRegistered = await AsyncStorage.getItem('isRegistered');
      if (isRegistered) {
        router.push('/login');
      } else {
        router.push('/PhoneAuthScreen');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check registration status');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/back6.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <FontAwesome6 name="bars" size={24} color="white" />
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <AntDesign name="shoppingcart" size={24} color="white" />
        </View>

        {/* Profile Info Button with Initial */}
        <TouchableOpacity style={styles.profileInfoButton} onPress={() => navigation.navigate('MyProfileDetails')}>
          <View style={styles.initialContainer}>
            <Text style={styles.initialText}>{initial}</Text>
          </View>
        </TouchableOpacity>

        {/* Profile Box */}
        <Animatable.View animation="fadeIn" style={styles.profileBox}>
          <Text style={styles.heading}>Create Profile</Text>
          <Text style={styles.subText}>Onboard to experience the best</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowPopup(true)}
          >
            <Text style={styles.buttonText}>Sign Up / Sign In</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Popup Window */}
        {showPopup && (
          <Animatable.View
            animation="fadeInUp"
            duration={500}
            style={styles.popupContainer}
          >
            <Text style={styles.popupHeading}>Welcome to Attica Gold</Text>
            <Text style={styles.popupText}>Register your account to start saving</Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={checkRegistrationStatus} // Call the function to check registration status
            >
              <Text style={styles.popupButtonText}>Register / Sign-In Now →</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backgroundImage: {
    marginTop: 40,
    flex: 1,
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure the container's background is transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
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
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  profileInfoButton: {
    position: 'absolute',
    top: 100,
    left: 10,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 1000,
    backgroundColor: 'white',
  },
  initialContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginTop: 80, // Adjust this value to ensure it is below the profile info button
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  popupHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  popupButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
