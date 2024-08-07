import { Redirect } from "expo-router";
import {StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
  <Redirect href={'/login'}/>
  );
}

