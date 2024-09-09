
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountAll from '../../components/MyAccount/MyAccountAll';
import Profile from '../../components/MyAccount/Profile';

const Stack = createStackNavigator();
const Products = () => {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MyAccountAll' component={MyAccountAll} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}

export default Products

const styles = StyleSheet.create({})
