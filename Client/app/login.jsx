import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { BASE_URL } from '../constants';
import * as Animatable from 'react-native-animatable';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Hook for navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      const { token, username, email: userEmail, mobile, address } = response.data;

      // Ensure all data is stored correctly
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', userEmail);
      await AsyncStorage.setItem('mobile', mobile.toString()); // Convert mobile to string
      await AsyncStorage.setItem('address', address);

      Alert.alert('Success', 'Login successful!');
      router.push('/Home'); // Navigate to home screen
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <ImageBackground
      source={require('../../Client/assets/images/back6.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Animatable.View animation="fadeInUp" duration={1500} style={styles.formContainer}>
          <Text style={styles.header}>Login</Text>
          
          <Animatable.View animation="fadeIn" duration={1500} delay={300}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#888"
            />
          </Animatable.View>

          <Animatable.View animation="fadeIn" duration={1500} delay={600}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#888"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={1500} delay={900}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={1500} delay={1200}>
            <TouchableOpacity style={styles.registerLink} onPress={() => router.push('/register')}>
              <Text style={styles.registerText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8d181a',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: '#8d181a',
    fontSize: 16,
  },
});

export default Login;
