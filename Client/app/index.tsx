import 'react-native-gesture-handler';
import { Redirect } from "expo-router";
import {StyleSheet, Text, View } from "react-native";
// import firebase from '../firebaseConfig';

// Ensure Firebase is initialized before using any Firebase service


export default function Index() {
  return (
  <Redirect href={'/login'} />
  );
}



