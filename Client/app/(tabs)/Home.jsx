import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, FlatList,  ActivityIndicator, Alert} from 'react-native';
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
  const scrollViewRef = useRef(null);
  const productScrollRef = useRef(null);
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
          <View style={styles.locationSection}>
            <EvilIcons name="location" size={24} color="#8d181a" />
            <Text style={styles.locationText}>
              You are in #Indian express, Bangalore, Karnataka, India
            </Text>
          </View>
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
          {/* <View>
          <View style={styles.main}> 
          <Image source={require('../../assets/images/logo.png')} style={styles.logo1} />
            <Text style={styles.logo1}>PROMISE</Text>
          </View>
          <View>
            <View>
              <Text>Complete Transparency</Text>
            </View>
            <View>
              <Text>Tested and Certified Gold</Text>
            </View>
            <View>
              <Text>Zero-Deduction Gold Exchange</Text>
            </View>
            <View>
              <Text>Fair Price Policy</Text>
            </View>
            <View>
              <Text>916 Hallmarked</Text>
            </View>
            <View>
              <Text>Guaranteed</Text>
            </View>
            <View>
              <Text>Assured Life Time Maintenance</Text>
            </View>
          </View>
              </View> */}



          <View style={styles.getStartedContainer}>
           
          <TouchableOpacity
  style={styles.getStartedButton}
  onPress={() => navigation.navigate('GoldLoan')}>
  <Text style={styles.buttonText}>Get gold loan at lowest interest rates</Text>
</TouchableOpacity>

            
             
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.buttonText}>Sell your gold at the best possible price</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Categories</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
            numColumns={2}
          />
        )}
      </View>

          {/* Our Collections */}
          <View style={styles.shopContainer}>
            <Text style={styles.sectionTitle}>Our Collection</Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>Discover our latest jewellery collection!</Text>
            <View style={styles.productContainer}>
              {/* Example Products */}
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
          </View>

          {/* Invest in Silver */}
          <View style={styles.investContainer}>
            <Text style={styles.sectionTitle}>Invest in Silver</Text>
            <Text style={styles.investDetails}>Explore the benefits of investing in silver.</Text>
            <TouchableOpacity style={styles.investButton}>
              <Text style={styles.investButtonText}>Invest Now</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Powered by React Native</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    zIndex: 1000, // Ensures the header stays on top
  },
  logo: {
    width: 150,
    height: 50,
  },
  logo1: {
    width: 100,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollableContent: {
    flexGrow: 1,
    paddingTop: 70, // Add padding to ensure content doesn't overlap with fixed header
  },
  locationRateContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  rateSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    color: '#8d181a',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  locationText: {
    color: '#8d181a',
    fontSize: 10,
    marginLeft: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    left: 10,
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  constantImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  livePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8d181a',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  getStartedContainer: {
    marginVertical: 20,
  },
  getStartedButton: {
    backgroundColor: '#8d181a',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  shopContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8d181a',
    marginBottom: 10,
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productList: {
    flexDirection: 'row',
  },
  product: {
    width: Dimensions.get('window').width / 3,
    marginBottom: 20,
    alignItems: 'center',
  },
  Collection: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productText: {
    color: '#8d181a',
  },
  investContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  investDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  investButton: {
    backgroundColor: '#8d181a',
    padding: 15,
    borderRadius: 5,
  },
  investButtonText: {
    color: 'white',
    fontSize: 16,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#8d181a',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },

  categoryContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    borderRadius: 15,
    display:'flex',
  marginHorizontal:50,
  marginVertical:20
  },
  categoryItem: {
    margin: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 16,
  },
  categoryPrice: {
    marginTop: 5,
    fontSize: 14,
    color: 'grey',
  },
});

export default Home;
