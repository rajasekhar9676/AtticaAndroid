import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {BASE_URL} from '../constants'

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

      const { token, username,  email: userEmail, mobile, address } = response.data;

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
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Register"
        onPress={() => router.push('/register')} // Navigate to Register screen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default Login;


