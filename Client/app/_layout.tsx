import { useEffect } from 'react';
import { useFonts } from 'expo-font';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../components/contexts/AuthContext'
import messaging from '@react-native-firebase/messaging';


export default function RootLayout() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken=async ()=>{
    const token=await messaging().getToken()
    console.log("Token",token)
  }

  useEffect(()=>{
    requestUserPermission()
    getToken()
  })
  const [fontsLoaded] = useFonts({
    'outfits': require('./../assets/fonts/Outfit-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or return a loading indicator
  }


  return (
    <><AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Home" />
        <Stack.Screen name="PhoneAuthScreen" />
        {/* <Stack.Screen name="Notification"/> */}
        {/* <Stack.Screen name="StartingPage"/> */}
      </Stack>
    </GestureHandlerRootView>
    </AuthProvider>
    </>
  );
}




