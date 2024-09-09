import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const MyAccountAll = ({ navigation }) => {
  const buttons = [
    { label: 'Profiles', icon: <AntDesign name="profile" size={30} color="#333" />, onPress: () => navigation.navigate('Profile') },
    { label: 'Price Check', icon: <FontAwesome6 name="dollar-sign" size={30} color="#333" />, onPress: () => navigation.navigate('PriceCheck') },
    { label: 'Get Help', icon: <AntDesign name="customerservice" size={30} color="#333" />, onPress: () => navigation.navigate('GetHelp') },
    { label: 'Purchase', icon: <FontAwesome6 name="shopping-cart" size={30} color="#333" />, onPress: () => navigation.navigate('Purchase') },
    { label: 'Orders', icon: <AntDesign name="shoppingcart" size={30} color="#333" />, onPress: () => navigation.navigate('Orders') },
  ];

  return (
    <ImageBackground source={require('../../assets/images/back6.png')} style={styles.backgroundImage}>
      {/* Main Header */}
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </Animatable.View>

      <View style={styles.container}>
        {buttons.map((button, index) => (
          <View key={index} style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={button.onPress}>
              {button.icon}
            </TouchableOpacity>
            <Text style={styles.label}>{button.label}</Text>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

export default MyAccountAll;

const styles = StyleSheet.create({
  backgroundImage: {
    marginTop: 40,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    margin: 40,
    marginTop: 120,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
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
    zIndex: 1000,
  },
  logo: {
    width: 150,
    height: 50,
  },
});
