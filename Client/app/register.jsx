import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { BASE_URL } from '../constants';

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
      Alert.alert('Error', error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Already have an account? Login"
        onPress={() => router.push('/login')} // Navigate to Login screen
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

export default Register;
