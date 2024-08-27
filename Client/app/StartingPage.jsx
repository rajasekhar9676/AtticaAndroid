import React, { useEffect } from 'react';
import { StyleSheet, Image, View, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const StartingPage = () => {
  const router = useRouter();

  // Navigate to Home page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Home'); // Redirect to Home page
    }, 3000); // 3-second delay

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ImageBackground style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
    </ImageBackground>
  );
};

export default StartingPage;

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: '#8d181a',
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
  },
});
