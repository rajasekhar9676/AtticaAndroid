import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfits': require('./../assets/fonts/Outfit-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or return a loading indicator
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Home"/>
        <Stack.Screen name="PhoneAuthScreen" />
        {/* <Stack.Screen name="StartingPage"/> */}
      </Stack>
    </GestureHandlerRootView>
  );
}


