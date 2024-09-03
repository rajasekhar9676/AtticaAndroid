import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import { InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../constants';
import axios from 'axios';

const MainService = ({ navigation }) => {
const [isLoading,setIsLoading]=useState('')
const [goldRate,setGoldRate]=useState('')

useEffect(() => {
  const fetchGoldRate = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/goldRates/`);
      const rates = response.data;

      // Assuming rates is an array and each item has a 'date' property
      if (Array.isArray(rates) && rates.length > 0) {
        const sortedRates = rates.sort((a, b) => new Date(b.date) - new Date(a.date));
        setGoldRate(sortedRates[0]);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  fetchGoldRate();
}, []);

  const handleSeeLiveGoldRate = () => {
    if (!isLoading) {
      InteractionManager.runAfterInteractions(() => {
        setIsLoading(true);
        navigation.navigate('GoldRateNotification');
      });
    }
  }; 
  
  return (
    <ImageBackground
      source={require('../../assets/images/back6.png')}
      style={styles.backgroundImage}
    >
      {/* MainHeader */}
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Text style={styles.Heading}>Gold Rate</Text>
        <FontAwesome5 name="bell" size={24} color="white" />
      </Animatable.View>

      {/* Header */}
      <Animatable.View animation="fadeIn" duration={1000} style={styles.OurServices}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </Animatable.View>

      <Animatable.View animation="fadeIn" duration={1000} style={styles.OurServices1}>
        <Text style={styles.Heading1}>Current Gold Rate</Text>
        <Text style={styles.Heading2}>Rate is from our store in Bengaluru, Karnataka, India</Text>
      </Animatable.View>

      {/* Main Container */}
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.mainContainer}>
        <View style={styles.pressable}>
          <Text style={styles.Gram}>22KT PER GRAM</Text>
          <View style={styles.rate}>
          <Text style={styles.pressableText}>INR: {goldRate.ratePerGram22k !== undefined ? goldRate.ratePerGram22k : 'loading...'}</Text>
          </View>
        </View>
        <View style={styles.pressable}>
          <Text style={styles.Gram}>24KT PER GRAM</Text>
          <View style={styles.rate}>
            <Text style={styles.pressableText}> INR: {goldRate.ratePerGram24k !== undefined ? goldRate.ratePerGram24k : 'loading...'}</Text>
          </View>
          <Text style={styles.Updated}>Last updated: {goldRate.date ? new Date(goldRate.date).toLocaleString() : 'loading...'}</Text>
        </View>
      </Animatable.View>

      {/* Button Container */}
      <View style={styles.Alertbutton}>
        <Pressable style={styles.alert} onPress={handleSeeLiveGoldRate}>
          <Text style={styles.alertText}>SET ALERT</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
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
  Heading: {
    color: 'white',
    fontSize: 25,
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
  logo: {
    width: 150,
    height: 50,
  },
  OurServices1: {
    position: 'relative',
    top: 100,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 7,
    zIndex: 1000,
  },
  Heading1: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  Heading2: {
    color: 'white',
    fontSize: 15,
  },
  mainContainer: {
    margin: 40,
    marginTop: 120,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  pressable: {
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: 'white',
    padding: 10,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Gram: {
    color: '#8d181a',
    fontSize: 15,
    backgroundColor: 'gold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rate: {
    width: '100%',
    borderColor: 'gold',
    borderWidth: 2,
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  pressableText: {
    fontSize: 20,
    fontWeight: '600',
    color: "white",
  },
  Updated: {
    color: 'white',
    fontSize: 15,
  },
  Alertbutton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: 'gold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  alertText: {
    color: '#8d181a',
    fontSize: 15,
  },
});

export default MainService;
