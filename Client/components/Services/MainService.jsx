// src/components/Services/Services.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const MainService= ({ navigation }) => {
  return (
    <>
        {/* Header */}
        <View style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </View>
   
   {/* Main Container */}
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('DigiGold')}>
        <Text style={styles.service}>Digi Gold</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('GoldLoan')}>
        <Text style={styles.service}>Gold Loan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Insurance')}>
        <Text style={styles.service}>Insurance</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#8d181a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    zIndex: 1000, // Ensures the header stays on top
  },
  logo: {
    width: 150,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 100,
    display:'flex',
    flexDirection:'row',
  },
  service: {
    fontSize: 18,
    margin: 10,
  },
});

export default MainService;
