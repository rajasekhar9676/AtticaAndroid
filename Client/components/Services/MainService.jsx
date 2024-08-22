import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const MainService = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/back6.png')}
      style={styles.backgroundImage}
    >
      {/* MainHeader */}
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </Animatable.View>

      {/* Header */}
      <Animatable.View animation="fadeIn" duration={1000} style={styles.OurServices}>
        <Text style={styles.headerText}>Our Services</Text>
      </Animatable.View>

      {/* Main Container */}
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.mainContainer}>
        <Pressable onPress={() => navigation.navigate('DigiGold')} style={styles.pressable}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="digital-tachograph" size={24} color="black" />
          </View>
          <Text style={styles.pressableText}>Digi Gold</Text>
          <View style={styles.chevronContainer}>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('GoldLoan')} style={styles.pressable}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="gold" size={24} color="black" />
          </View>
          <Text style={styles.pressableText}>Gold Loan</Text>
          <View style={styles.chevronContainer}>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Insurance')} style={styles.pressable}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="security" size={24} color="black" />
          </View>
          <Text style={styles.pressableText}>Insurance</Text>
          <View style={styles.chevronContainer}>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        </Pressable>
      </Animatable.View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    marginTop:40,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  OurServices: {
    position: 'relative',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: '#8d181a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 7,
    zIndex: 1000,
  },
  headerText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    margin: 40,
    marginTop: 120,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 7,
  },
  pressable: {
    backgroundColor: '#007BFF',
    borderRadius: 6,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    color: "white",
  },
  chevronContainer: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainService;
