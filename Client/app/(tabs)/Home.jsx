import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Modal, 
  Pressable, 
  TextInput, 
  Alert, 
  FlatList,  
  ActivityIndicator,
  SafeAreaView // Import SafeAreaView
} from 'react-native';
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, FlatList,  ActivityIndicator, Alert} from 'react-native';
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

import { BASE_URL } from '../../constants';

const Home = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [autoDetectModalVisible, setAutoDetectModalVisible] = useState(false);
  const [manualLocationModalVisible, setManualLocationModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('You are in #Indian express, Bangalore, Karnataka, India');
  const [manualLocation, setManualLocation] = useState('');
  const scrollViewRef = useRef(null);
  // const screenWidth = Dimensions.get('window').width;
  // const images = [
  //   require('../../assets/images/slider1.png'),
  //   require('../../assets/images/slider2.png'),
  //   require('../../assets/images/slider3.png'),
  //   require('../../assets/images/slider4.png'),
  //   require('../../assets/images/slider4.png'),
  // ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [bars, setBars] = useState([]); // State for storing "Bars" category products
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;

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
          const barsCategory = [];
  
          response.data.forEach(item => {
            if (item.category) {
              if (!uniqueCategories[item.category]) {
                uniqueCategories[item.category] = item;
              }
              if (item.category === 'Bars') {
                barsCategory.push(item);
              }
            }
          });
  
          setCategories(Object.values(uniqueCategories));
          setBars(barsCategory);
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
    <SafeAreaView style={styles.container}> {/* Wrap with SafeAreaView */}
      {/* Header */}
      <View style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollableContent}>
        {/* Fixed Location and Rate */}
        <View style={styles.locationRateContainer}>
          <View style={styles.rateSection}>
            <SimpleLineIcons name="options-vertical" size={24} color="#8d181a" />
            <Text style={styles.rateText}>22KT Gold Rate 6,425.00/gm INR</Text>
          </View>
          <TouchableOpacity
            style={styles.locationSection}
            onPress={() => setModalVisible(true)} // Open the modal
          >
            <EvilIcons name="location" size={24} color="#8d181a" />
            <Text style={styles.locationText}>{currentLocation}</Text>
          </TouchableOpacity>
        </View>

        {/* Sliding Content */}
        <View style={styles.sliderContainer}>
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
  onPress={() => navigation.navigate('Services')}
>
  <Text style={styles.getStartedButtonText}>Get Started</Text>
</TouchableOpacity>
          </View>

          <View style={styles.categoriesContainer}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#8d181a" />
            ) : (
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.category}
                numColumns={2}
                contentContainerStyle={styles.categoriesList}
              />
            )}
          </View>

          <View style={styles.barsContainer}>
            <Text style={styles.barsTitle}>Bars</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#8d181a" />
            ) : (
              <FlatList
                data={bars}
                renderItem={({ item }) => (
                  <View style={styles.barItem}>
                    <Image source={{ uri: item.image ? (item.image.startsWith('http') ? item.image : `${BASE_URL}/uploads/${item.image}`) : null }} style={styles.barImage} />
                    <Text style={styles.barName}>{item.name}</Text>
                    <Text style={styles.barPrice}>₹{item.price}</Text>
                  </View>
                )}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>

        </View>
      </ScrollView>

      {/* Modals */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleAutoDetectLocation}>
              <Text style={styles.modalButtonText}>Auto Detect Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleManualLocation}>
              <Text style={styles.modalButtonText}>Select Location Manually</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={autoDetectModalVisible}
        onRequestClose={() => setAutoDetectModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Detected</Text>
            <Text style={styles.modalText}>Location changed successfully</Text>
            <Pressable onPress={() => setAutoDetectModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={manualLocationModalVisible}
        onRequestClose={() => setManualLocationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Location</Text>
            <TextInput
              style={styles.modalInput}
              value={manualLocation}
              onChangeText={setManualLocation}
              placeholder="Enter your location"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleConfirmManualLocation}>
              <Text style={styles.modalButtonText}>Confirm Location</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setManualLocationModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView> // Close SafeAreaView
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#8d181a',
  },
  logo: {
    width: 120,
    height: 40,
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
  },
  rateSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 16,
    color: '#8d181a',
    marginLeft: 5,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#8d181a',
    marginLeft: 5,
  },
  sliderContainer: {
    position: 'relative',
  },
  scrollView: {
    height: 200,
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  constantImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  getStartedButton: {
    backgroundColor: '#8d181a',
    padding: 15,
    borderRadius: 5,
  },
  getStartedButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  categoriesContainer: {
    padding: 10,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoriesList: {
    marginTop: 10,
  },
  categoryContainer: {
    flex: 1,
    margin: 5,
  },
  categoryItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  categoryPrice: {
    fontSize: 14,
    color: '#8d181a',
  },
  barsContainer: {
    padding: 10,
  },
  barsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  barItem: {
    marginRight: 10,
  },
  barImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  barName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  barPrice: {
    fontSize: 14,
    color: '#8d181a',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#8d181a',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  modalInput: {
    borderColor: '#8d181a',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalCloseButton: {
    padding: 10,
    backgroundColor: '#8d181a',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Home;
