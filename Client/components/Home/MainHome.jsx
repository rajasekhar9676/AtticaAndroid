import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Modal, Pressable, TextInput, Alert, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { BASE_URL } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { InteractionManager } from 'react-native';
import { throttle } from 'lodash';
import GoldLive from './GoldLive'
import GoldRateNotification from './GoldRateNotification';
import { useAuth } from '../contexts/AuthContext';
import Aboutcomp from './Aboutcomp';
import OurServices from './OurServices';

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
  const [location, setLocation] = useState({})
  const screenWidth = Dimensions.get('window').width;
  const [isLoading,setIsLoading]=useState('')
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState('')

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


  const handleSeeLiveGoldRate = () => {
    if (!isAuthenticated) {
      navigation.navigate('UserLocation')
    }
    else{
      InteractionManager.runAfterInteractions(() => {
        // setIsLoading(true);
        navigation.navigate('GoldLive');
    
     

      });
    }
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

      <FlatList
        contentContainerStyle={styles.scrollableContent}
        ListHeaderComponent={
          <>


            {/* Location and Rate */}
            <View style={styles.locationRateContainer}>
              <TouchableOpacity style={styles.rateSection} onPress={handleSeeLiveGoldRate}>
                <Text style={styles.rateText}>See Live Gold Rate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.locationSection} onPress={() => setModalVisible(true)}>
                <EvilIcons name="location" size={24} color="#8d181a" />
                <Text style={styles.locationText}><Text style={{ fontWeight: 'bold' }}>You are in </Text>{'\n'}{currentLocation}</Text>
              </TouchableOpacity>
            </View>



            {/* TRANDING NOW */}
            <View style={styles.sliderContainer}>
              <Text style={{ fontSize: 20, color: "#8d181a", marginVertical: 5, marginHorizontal: 10 }}>TRENDING <Text style={{ fontWeight: 'bold' }}>NOW</Text></Text>
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
                }} >
                {images.map((image, index) => (
                  <Image key={index} source={image} style={styles.image} resizeMode="cover" />
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
                <Entypo name="chevron-thin-right" size={24} color="white" />
              </TouchableOpacity>
            </View>




            {/* ABOUT COMPANY */}
            <Aboutcomp />



            {/* Our Services */}
            <View style={styles.contentContainer}>
              <OurServices/>
      


              {/* OUR COLLECTIONS */}
              {/* <View style={styles.section}>
                <Text style={styles.sectionTitle}>Our Collection</Text>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
                    numColumns={2}
                    style={styles.collection}
                  />
                )}
              </View> */}


              {/* NEWS */}
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcecd4', }}>
                <Text style={{ fontSize: 25, fontFamily: 'bold', color: "#8d181a", marginVertical: 5, marginTop: 10 }}>Latest Updates</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, }}>
                  {/* News1 */}
                  <TouchableOpacity style={{
                    width: 'auto', height: 'auto', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#8d181a', marginHorizontal: 10,
                  }} onPress={() => navigation.navigate('News')}>
                    <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, }}>
                      <View style={{ justifyContent: 'center', paddingHorizontal: 5, width: '50%', }}>
                        <Text style={{
                          color: '#8d181a',
                          flexWrap: 'wrap',
                          paddingVertical: 5,
                          fontWeight: '600',
                          fontSize: 20,
                          fontFamily: 'bold',
                        }}>Heading</Text>

                        <Text style={{
                          color: '#8d181a',
                          flexWrap: 'wrap',
                          paddingVertical: 5,
                          fontWeight: '300',
                          fontSize: 20,
                          fontFamily: 'bold',
                        }}>News about attica company</Text>
                        <Text style={{
                          color: '#8d181a',
                          flexWrap: 'wrap',
                          paddingVertical: 5,
                          fontWeight: '100',
                          fontSize: 20,
                          textDecorationLine: 'underline',
                          fontFamily: 'bold',
                        }}>Read more..</Text>
                      </View>
                      <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, width: '50%', }}>
                        <Image source={require('../../assets/images/guaranteed.png')} style={{
                          width: 50,
                          height: 50,
                        }} />
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* News2 */}
                  <TouchableOpacity style={{
                    width: 'auto', height: 'auto', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#8d181a', marginHorizontal: 10,
                  }} onPress={() => navigation.navigate('GoldLoan')}>
                    <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, }}>
                      <View style={{ justifyContent: 'center', paddingHorizontal: 5, width: '50%', }}>
                        <Text style={{
                          color: '#8d181a',
                          flexWrap: 'wrap',
                          paddingVertical: 5,
                          fontWeight: '600',
                          fontSize: 20,
                          fontFamily: 'bold',
                        }}>Heading</Text>

                        <Text style={{
                          color: '#8d181a',
                          flexWrap: 'wrap',
                          paddingVertical: 5,
                          fontWeight: '300',
                          fontSize: 20,
                          fontFamily: 'bold',
                        }}>News about attica company</Text>
                        <Text style={{
                          color: '#8d181a',
                          flexWrap: 'wrap',
                          paddingVertical: 5,
                          fontWeight: '100',
                          fontSize: 20,
                          textDecorationLine: 'underline',
                          fontFamily: 'bold',
                        }}>Read more..</Text>
                      </View>
                      <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, width: '50%', }}>
                        <Image source={require('../../assets/images/guaranteed.png')} style={{
                          width: 50,
                          height: 50,
                        }} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>


              {/* Invest in Silver */}
              <View style={styles.investContainer}>
                <Text style={styles.sectionTitle}>Invest in Silver</Text>
                <Text style={styles.investDetails}>Explore the benefits of investing in silver.</Text>
                <TouchableOpacity style={styles.investButton}>
                  <Text style={styles.investButtonText}>Invest Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
      />


      {/* Modals */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location</Text>
            <TouchableOpacity onPress={autoDetectLocation} style={styles.modalButton}>
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
      </Modal> */}


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location</Text>
            <TouchableOpacity onPress={autoDetectLocation} style={styles.modalButton}>
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


      {/* Location Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={manualLocationModalVisible}
        onRequestClose={() => setManualLocationModalVisible(!manualLocationModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.modalTitle}>Enter Location</Text>
            <TextInput
              value={manualLocation}
              onChangeText={setManualLocation}
              style={styles.input}
              placeholder="Enter location"
            /> */}
            <Text style={styles.modalTitle}>Enter Location</Text>
            <TextInput
              value={manualLocation}
              onChangeText={setManualLocation}
              style={styles.input}
              placeholder="Enter location"
            />
            {/* <TouchableOpacity onPress={handleConfirmManualLocation} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setManualLocationModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable> */}

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
  // Header
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
  contentContainer: {
    padding: 10,
  },
  getStartedContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  investContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  section: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  investDetails: {
    marginBottom: 10,
    fontSize: 16,
  },
  investButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  investButton: {
    backgroundColor: '#8d181a',
    padding: 15,
    borderRadius: 5,
  },
  getStartedButton: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 5,
    borderColor: '#8d181a',
    opacity: 1,
    borderWidth: 1,
    marginVertical: 10,
  },
  buttonText: {
    color: '#8d181a',
    justifyContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  //  {/* Fixed Location and Rate */}
  locationRateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rateSection: {
    backgroundColor: '#8d181a',
    borderRadius: 5,
    padding: 10,
  },
  rateText: {
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

  // {/* Sliding Content */}
  sliderContainer: {
    position: 'relative',
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
  //  {/* Content Below Sliding */}
  constantImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },

  // {/* About Company */}
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
  //  {/* ATTICA ASSURE */}
  assureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  assureButton: {
    width: 80,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8d181a',
    marginHorizontal: 10,
  },
  getloan: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  loan: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  buttonText: {
    marginTop: 5,
    color: '#8d181a',
    marginBottom: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
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
    padding: 10,
    marginVertical: 10,
  },
});

export default Home;