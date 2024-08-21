import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { BASE_URL } from '../constants';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter(); // Hook for navigation

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, {
        username,
        email,
        password,
        mobile,
        address
      });
      Alert.alert('Success', 'Registration successful!');
      router.push('/login'); // Navigate to login screen
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', error.response.data.message || 'User already exists');
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    }
  };
  

  return (
    <ImageBackground
      source={require('../../Client/assets/images/back6.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Animatable.Text animation="fadeIn" duration={1000} style={styles.header}>Register</Animatable.Text>
        
        <Animatable.View animation="fadeInUpBig" duration={1200} style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="number"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <Animatable.View animation="bounceIn" duration={1500} style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="bounceIn" duration={1500} style={styles.buttonContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/login')}>
              <Text style={styles.secondaryButtonText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    height: 40,
    // borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0a7dfc',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#8d181a',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;

