// app/home.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const FirstPage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('@token');
        router.push('/login'); // Navigate to Login screen after logout
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Home Screen</Text>
            <Button title="Logout" onPress={handleLogout} />
            <Button
                title="Go to Login"
                onPress={() => router.push('/login')}
                style={styles.button}
            />
            <Button
                title="Go to Register"
                onPress={() => router.push('/register')}
                style={styles.button}
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
    button: {
        marginTop: 10,
    },
});

export default FirstPage;
