
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountAll from '../../components/MyAccount/MyAccountAll';
import Profile from '../../components/MyAccount/Profile';
import MyProfileDetails from '../../components/MyAccount/MyProfileDetails';
import GetHelpScreen from '../../components/MyAccount/GetHelpScreen';
import GoldCalculator from '../../components/MyAccount/GoldCalculator';
import OrdersScreen from '../../components/MyAccount/OrdersScreen';
import PriceCheckScreen from '../../components/MyAccount/PriceCheckScreen';
import PurchaseScreen from '../../components/MyAccount/PurchaseScreen';


const Stack = createStackNavigator();
const Products = () => {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MyAccountAll' component={MyAccountAll} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='MyProfileDetails' component={MyProfileDetails} />
      <Stack.Screen name='GetHelpScreen' component={GetHelpScreen} />
      <Stack.Screen name='GoldCalculator' component={GoldCalculator} />
      <Stack.Screen name='OrdersScreen' component={OrdersScreen} />
      <Stack.Screen name='PriceCheckScreen' component={PriceCheckScreen} />
      <Stack.Screen name='PurchaseScreen' component={PurchaseScreen} />
    </Stack.Navigator>
  )
}

export default Products

const styles = StyleSheet.create({})
