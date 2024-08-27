import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Modal, Pressable, TextInput, Alert, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Link from '@react-navigation/native';
import GoldLoan from '../../components/Services/GoldLoan';
import GoldLive from '../../components/Home/GoldLive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import { BASE_URL } from '../../constants';

const Home = ({navigation}) => {
 
const Home = ({ navigation }) => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [autoDetectModalVisible, setAutoDetectModalVisible] = useState(false);
  const [manualLocationModalVisible, setManualLocationModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Your location');
  const [manualLocation, setManualLocation] = useState('');
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});

  // const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;

  const storeLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      await AsyncStorage.setItem('latitude', location.coords.latitude.toString());
      await AsyncStorage.setItem('longitude', location.coords.longitude.toString());
    } catch (error) {
      Alert.alert('Error', 'Failed to store location');
    }
  };

    const updateLocation = (location) => {
    setLocation(location);
    // Optionally, perform additional actions with the location data
  };

  // Function to get the user's current location

  
  const autoDetectLocation = async () => {
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }
      
      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
  
      // Perform reverse geocoding to get the address
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
  
      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0]; // Get the first result
        const formattedAddress = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
  
        // Update location with latitude and longitude
        updateLocation({ latitude, longitude });
  
        // Update the state with the formatted address
        setCurrentLocation(formattedAddress);
      } else {
        Alert.alert('No address found', 'Unable to detect your location address.');
      }
    } catch (error) {
      console.error("Error detecting location: ", error.message);
      Alert.alert("Unable to detect your location. Please try again.");
    }
  };
  
  
// Call this function when the "Auto-Detect Location" button is clicked




const handleConfirmManualLocation = () => {
  if (manualLocation.trim() === '') {
    Alert.alert('Error', 'Location cannot be empty');
    return;
  }
  setCurrentLocation(manualLocation);
  setManualLocation('');
  setManualLocationModalVisible(false);
};


const handleManualLocation = () => {
  setModalVisible(false);
  setManualLocationModalVisible(true);
};




  useEffect(() => {
    const fetchPrices = async () => {
      const API_KEY = 'RLHKKFP2EG5HR2J0';
      const goldUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GCUSD&interval=1min&apikey=${API_KEY}`;

      try {
        const goldResponse = await axios.get(goldUrl);
        const goldData = goldResponse.data['Time Series (1min)'];
        const latestGoldKey = Object.keys(goldData)[0];
        setGoldPrice(goldData[latestGoldKey]['1. open']);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchPrices();
  }, []);

  const images = [
    require('../../assets/images/slider1.png'),
    require('../../assets/images/slider2.png'),
    require('../../assets/images/slider3.png'),
    require('../../assets/images/slider4.png'),
    require('../../assets/images/slider4.png'),
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/products/getproducts`);
        if (Array.isArray(response.data)) {
          const uniqueCategories = {};
          response.data.forEach(item => {
            if (item.category) {
              if (!uniqueCategories[item.category]) {
                uniqueCategories[item.category] = item;
              }
            }
          });
          setCategories(Object.values(uniqueCategories));
        } else {
          Alert.alert('Error', 'Unexpected data format received.');
        }
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryPage', { category });
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    scrollViewRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    scrollViewRef.current.scrollTo({ x: prevIndex * screenWidth, animated: true });
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Automatically scroll every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleAutoDetectLocation = () => {
    setModalVisible(false);
    setAutoDetectModalVisible(true);
    // Add functionality for auto-detect location here
    // For demonstration, we'll just simulate a location change
    setCurrentLocation('Location changed successfully');
  };

 
  const handleManualLocation = () => {
    setModalVisible(false);
    setManualLocationModalVisible(true);
  };

  const handleConfirmManualLocation = () => {
    setCurrentLocation(manualLocation);
    setManualLocation('');
    setManualLocationModalVisible(false);
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item.category)}>
        <Image source={{ uri: item.image ? (item.image.startsWith('http') ? item.image : `${BASE_URL}/uploads/${item.image}`) : null }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.categoryPrice}>Starts at ₹{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollableContent}>
        {/* Fixed Location and Rate */}
        <View style={styles.locationRateContainer}>
          <TouchableOpacity style={styles.rateSection} onPress={() => navigation.navigate('GoldLive')}>
            {/* <SimpleLineIcons name="options-vertical" size={24} color="#8d181a" /> */}
            <Text style={styles.rateText}>22KT Gold Rate 6,425.00/gm INR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationSection} onPress={() => setModalVisible(true)}>
            <EvilIcons name="location" size={24} color="#8d181a" />
            <Text style={styles.locationText}>{currentLocation}</Text>
          </TouchableOpacity>
        </View>

        {/* Sliding Content */}
        <View style={styles.sliderContainer}>
          <Text style={{ fontSize: 20, color: "#8d181a", marginVertical: 5, marginHorizontal: 10 }}>TRENDING <strong>NOW</strong></Text>
          <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
            <Entypo name="chevron-thin-left" size={24} color="white" />
          </TouchableOpacity>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            onScroll={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentIndex(index);
            }}
          >
            {images.map((image, index) => (
              <Image key={index} source={image} style={styles.image} resizeMode="cover" />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
            <Entypo name="chevron-thin-right" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content Below Sliding */}
        <Image source={require('../../assets/images/constants.png')} style={styles.constantImage} />

        <View style={styles.contentContainer}>
          <View style={styles.getStartedContainer}>

            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => navigation.navigate('GoldLoan')}>
              <Text style={styles.buttonText}>Get gold loan at lowest interest rates</Text>

        {/* About Company */}
        <View>
          <View>
            <Text style={styles.About}>Attica Gold Company</Text>
          </View>
          <View style={styles.content}>
            The Attica gold company is the pioneer and the No.1 Gold Buying Company. We buy all types of gold coins, jewellery, and biscuits and lend money to release pledged gold from financial institutes/pawns and brokers/NBFCs. We offer instant spot cash for gold and silver. Selling gold at Attica gold company is fast, simple and easy.
          </View>
        </View>

        {/* ATTICA ASSURE */}
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcecd4' }}>
          <View>
            <Text style={{ fontSize: 15, color: "#8d181a", marginVertical: 5, marginTop: 10 }}>ATTICA</Text>
          </View>
          <View>
            <Text style={{ fontSize: 25, color: "black", marginBottom: 20 }}>ASSURE</Text>
          </View>
          <View style={styles.assureContainer}>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/guaranteed.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Guaranteed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/anyaliticaltesting.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Best Price</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/getloan.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Transparency</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/getloan.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Transparency</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/getloan.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Transparency</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/getloan.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Transparency</Text>
            </TouchableOpacity>



            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Text style={styles.buttonText}>Sell your gold at the best possible price</Text>
            </TouchableOpacity>
          </View>
            
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryHeading}>Gold Products</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#8d181a" />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.category}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

      </ScrollView>

      {/* Modals */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Choose Location</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={autoDetectLocation}
          >
            <Text style={styles.modalButtonText}>Auto-detect Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={autoDetectLocation}
        
          >
            <Text style={styles.modalButtonText}>Select Location Manually</Text>
          </TouchableOpacity>
          <Pressable
            style={[styles.modalButton, styles.closeButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location</Text>
            <TouchableOpacity onPress={handleAutoDetectLocation} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Auto-detect Location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleManualLocation} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Select Location Manually</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={autoDetectModalVisible}
        onRequestClose={() => setAutoDetectModalVisible(!autoDetectModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Auto-detect Location</Text>
            <Text style={styles.modalText}>{currentLocation}</Text>
            <Pressable onPress={() => setAutoDetectModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={manualLocationModalVisible}
        onRequestClose={() => setManualLocationModalVisible(!manualLocationModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Location</Text>
            <TextInput
              value={manualLocation}
              onChangeText={setManualLocation}
              style={styles.input}
              placeholder="Enter location"
            />
            <TouchableOpacity onPress={handleConfirmManualLocation} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setManualLocationModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#8d181a',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  scrollableContent: {
    flexGrow: 1,
  },
  locationRateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rateSection: {
    backgroundColor: '#8d181a',
    color: 'white',
    padding: 15,
    backgroundColor: '#8d181a',
    borderRadius: 5,
    padding: 10,
  },
  rateText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 5,
    flex: 1
    color: '#fff',
    fontWeight: 'bold',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    color: '#8d181a',
  },
  sliderContainer: {
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: 10,
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: 10,
    zIndex: 1,
  },
  scrollView: {
    height: '100%',
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  constantImage: {
    width: '100%',
    height: 150,
    marginVertical: 10,
  },
  contentContainer: {
    padding: 10,
  },
  getStartedContainer: {
    marginVertical: 10,
  },
  getStartedButton: {
    backgroundColor: '#8d181a',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
  categorySection: {
    padding: 15,
  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8d181a',
    marginBottom: 10,
  },
  categoryContainer: {
    marginRight: 10,
  },
  categoryItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    width: 150,
    alignItems: 'center',
    padding: 10,
  },
  categoryImage: {
    width: 130,
    height: 100,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  categoryPrice: {
    color: '#8d181a',
  },
  About: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8d181a',
    marginVertical: 10,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  assureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  assureButton: {
    alignItems: 'center',
  },
  getloan: {
    width: 50,
    height: 50,
  },
  buttonText: {
    marginTop: 5,
    color: '#8d181a',
  },
  constantImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#8d181a',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    paddingHorizontal: 10,
  },
    padding: 10,
    marginVertical: 10,
  },
});

export default Home;
















