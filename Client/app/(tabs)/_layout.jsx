import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const RootLayout = () => {
  return (
    
      <Tabs >
       <Tabs.Screen name="Home" 
       options={{tabBarLabel:"Home",
        tabBarIcon:({color})=> <Ionicons name="home" size={24} color={color} />
       }}
       />

       <Tabs.Screen name="Products" 
       options={{tabBarLabel:"Products",
        tabBarIcon:({color})=><FontAwesome name="shopping-bag" size={24} color={color} />
       }}

       />
       <Tabs.Screen name="FindBranch"
       options={{tabBarLabel:"FindBranch",
        tabBarIcon:({color})=><Ionicons name="location-sharp" size={24} color={color} />
       }}
       />
       <Tabs.Screen name="Services"
       options={{tabBarLabel:"Services",
        tabBarIcon:({color})=><MaterialCommunityIcons name="gold" size={24} color={color} />
       }}
       />
       <Tabs.Screen name="Profile"
       options={{tabBarLabel:"Profile",
        tabBarIcon:({color})=><MaterialCommunityIcons name="face-man" size={24} color={color}/>
       }}
       />
      </Tabs>
    
  )
}

export default RootLayout

const styles = StyleSheet.create({}) 
