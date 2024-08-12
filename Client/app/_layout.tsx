import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import CategoryPage from '../components/ProductsAll/CategoryPage'

export default function RootLayout() {
  useFonts({
    'outfits': require('./../assets/fonts/Outfit-Regular.ttf')
  })
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="firstPage" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="CategoryPage"/>
      <Stack.Screen name="PhoneAuthScreen"/>
    </Stack>
  );
}
