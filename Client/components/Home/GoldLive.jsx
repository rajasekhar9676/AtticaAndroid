import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
        <Text style={styles.Heading}>Gold Rate</Text>
        <FontAwesome5 name="bell" size={24} color="white" />
      </Animatable.View>

      {/* Header */}
      <Animatable.View animation="fadeIn" duration={1000} style={styles.OurServices}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </Animatable.View>

      <Animatable.View animation="fadeIn" duration={1000} style={styles.OurServices1}>
        <Text style={styles.Heading1}>Current Gold Rate</Text>
        <Text style={styles.Heading2} > 'Rate is from our store in Bengaluru, Karnataka, India </Text>
      </Animatable.View>

      {/* Main Container */}
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.mainContainer}>
        <View style={styles.pressable}>
          <Text style={styles.Gram}>22KT PER GRAM </Text>
          <View style={styles.rate}>
            <Text style={styles.pressableText}>INR: </Text>
          </View>
        </View>
        <View style={styles.pressable}>
          <Text style={styles.Gram}>24KT PER GRAM </Text>
          <View style={styles.rate}>
            <Text style={styles.pressableText}>INR: </Text>
          </View>
          <Text style={styles.Updated}>Last updated : </Text>
        </View>
      </Animatable.View>


      {/* Button Container */}
      <View style={styles.Alertbutton}>
        <Pressable style={styles.alert} onPress={() => navigation.navigate('GoldRateNotification')}>SET ALERT</Pressable>
      </View>

    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    marginTop: 40,
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
    fontSize: '25px',
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
    fontSize: '25px',
    fontFamily: 'bold',
  },
  Heading2: {
    color: 'white',
    fontSize: '15px',
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
    fontSize: '15px',
    backgroundColor: 'gold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rate: {
    width: 400,
    borderColor: 'gold',
    borderWidth: 2,
    flex: 1,
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  pressableText: {
    fontSize: 20,
    fontWeight: '600',
    color: "white",
    flex: 1,
    width: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Updated: {
    color: 'white',
    fontSize: '15px',
  },
  Alertbutton:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    color: '#8d181a',
    fontSize: '15px',
    backgroundColor: 'gold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  


  },
 
});

export default MainService;
