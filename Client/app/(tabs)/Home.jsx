import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Modal, Pressable, TextInput, Alert, FlatList,  ActivityIndicator } from 'react-native';
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
  onPress={() => navigation.navigate('GoldLoan')}>
  <Text style={styles.buttonText}>Get gold loan at lowest interest rates</Text>
</TouchableOpacity>

            
             
            <TouchableOpacity style={styles.getStartedButton}   onPress={()=>navigation.navigate('GoldLoan')}>
              <Text style={styles.buttonText}>Sell your gold at the best possible price</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
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
      </View>

          {/* Our Collections */}
          {/* <View style={styles.shopContainer}>
            <Text style={styles.sectionTitle}>Our Collection</Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>Discover our latest jewellery collection!</Text>
            <View style={styles.productContainer}>
            
              {[
                { id: 1, name: 'Anklet', image: require('../../assets/images/Anklet.png') },
                { id: 2, name: 'Bangels', image: require('../../assets/images/bangels.png') },
                { id: 3, name: 'Earrings', image: require('../../assets/images/earring.png') },
                { id: 4, name: 'Gold-Chain', image: require('../../assets/images/Gold-Chain.png') },
                { id: 5, name: 'Gold-Pendant', image: require('../../assets/images/Gold-Pendant.png') },
                { id: 6, name: 'Necklase', image: require('../../assets/images/Necklase.png') },
                { id: 7, name: 'Gold-Ring', image: require('../../assets/images/ring.png') },
                { id: 8, name: 'Mangalasutra', image: require('../../assets/images/mangalasutra.png') },
                { id: 9, name: 'Nosepin', image: require('../../assets/images/Nosepin.png') },
                { id: 10, name: 'Bracelet', image: require('../../assets/images/bracelet.png') },
              ].map((product) => (
                <View key={product.id} style={styles.product}>
                  <Image source={product.image} style={styles.Collection} />
                  <Text style={styles.productText}>{product.name}</Text>
                </View>
              ))}
            </View>
          </View> */}

          {/* Invest in Silver */}
          <View style={styles.investContainer}>
            <Text style={styles.sectionTitle}>Invest in Silver</Text>
            <Text style={styles.investDetails}>Explore the benefits of investing in silver.</Text>
            <TouchableOpacity style={styles.investButton}>
              <Text style={styles.investButtonText}>Invest Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Location Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Choose Location</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleAutoDetectLocation}
          >
            <Text style={styles.modalButtonText}>Auto-detect Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleManualLocation}
          >
            <Text style={styles.modalButtonText}>Select Location Manually</Text>
          </TouchableOpacity>
          <Pressable
            style={[styles.modalButton, styles.closeButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Auto-detect Location Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={autoDetectModalVisible}
        onRequestClose={() => setAutoDetectModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Location Updated</Text>
          <Text style={styles.modalMessage}>{currentLocation}</Text>
          <Pressable
            style={[styles.modalButton, styles.closeButton]}
            onPress={() => setAutoDetectModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Manual Location Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={manualLocationModalVisible}
        onRequestClose={() => setManualLocationModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Enter Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your location"
            value={manualLocation}
            onChangeText={setManualLocation}
          />
          <Pressable
            style={[styles.modalButton, styles.confirmButton]}
            onPress={handleConfirmManualLocation}
          >
            <Text style={styles.modalButtonText}>Confirm</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, styles.closeButton]}
            onPress={() => setManualLocationModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </Pressable>
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
    alignItems: 'center',
    backgroundColor: '#8d181a',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 40,
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
  },
  rateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1, 
  },
  rateText: {
    fontSize: 16,
    color: '#8d181a',
    marginLeft: 5,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },
  locationText: {
    fontSize: 16,
    color: '#8d181a',
    marginLeft: 5,
  },
  sliderContainer: {
    position: 'relative',
    height: 200,
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
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
    flex:1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  categoryItem: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
  },
  categoryName: {
    fontSize: 16,
    marginVertical: 5,
  },
  categoryPrice: {
    fontSize: 14,
    color: '#8d181a',
  },
  investContainer: {
    marginVertical: 10,
    justifyContent:'center', 
    alignItems:'center',
    marginTop: 20,
  },
  investDetails: {
    marginBottom: 10,
    fontSize: 16,
  },
  investButton: {
    backgroundColor: '#8d181a',
    padding: 15,
    borderRadius: 5,
  },
  investButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#8d181a',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  closeButton: {
    backgroundColor: '#f44336',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
});


export default Home;
