// app/register.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Hook for navigation

    const handleRegister = async () => {
        try {
            await axios.post('https://8b6e-2401-4900-1f28-6e01-84e1-4cc9-6ae5-4be3.ngrok-free.app/api/users/register', {
                email,
                password,
            });
            Alert.alert('Success', 'Registration successful!');
            router.push('/login'); // Navigate to Login screen
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
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
