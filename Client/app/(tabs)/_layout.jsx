import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from './../../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const RootLayout = () => {
  return (

    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY
    }}>
      <Tabs.Screen name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
        }}
      />

      <Tabs.Screen name="FindBranch"
        options={{
          tabBarLabel: "Branches",
          tabBarIcon: ({ color }) => <Ionicons name="location-sharp" size={24} color={color} />
        }}
      />


      <Tabs.Screen name="Services"
        options={{
          tabBarLabel: "Services",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="gold" size={24} color={color} />
        }}
      />


      <Tabs.Screen name="Products"
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ color }) => <Entypo name="news" size={24} color={color} />
        }}

      />


      <Tabs.Screen name="MyAccount"
        options={{
          tabBarLabel: "My Account",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="face-man" size={24} color={color} />
        }}
      />
    </Tabs>

  )
}

export default RootLayout

const styles = StyleSheet.create({}) 
