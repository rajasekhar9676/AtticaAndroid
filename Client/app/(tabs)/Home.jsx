import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Entypo from '@expo/vector-icons/Entypo';

const Home = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  ];

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

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={{ width: 150, height: 50 }} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </View>

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
      <ScrollView style={styles.scrollableContent}>
        <Image source={require('../../assets/images/constants.png')} style={styles.constantImage} />

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.livePrice}>Live Gold Price: ₹ {goldPrice ? goldPrice : 'Loading...'}/gm</Text>
            {error && <Text style={styles.error}>{error}</Text>}
          </View>
          <View style={styles.getStartedContainer}>
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.buttonText}>Get gold loan at lowest interest rates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.buttonText}>Sell your gold at the best possible price</Text>
            </TouchableOpacity>
          </View>


          {/* Our Collections */}
          <View style={styles.shopContainer}>
  <Text style={styles.sectionTitle}>Our Collection</Text>
  <Text style={{ textAlign: 'center', marginBottom: 10 }}>Discover our latest jewellery collection!</Text>
  <View style={styles.productContainer}>
    <View style={styles.product}>
      <Image source={require('../../assets/images/Anklet.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Anklet</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/bangels.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Bangels</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/earring.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Earrings</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/Gold-Chain.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Gold-Chain</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/Gold-Pendant.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Gold-Pendant</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/Necklase.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Necklase</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/ring.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Gold-Ring</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/mangalasutra.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Mangalasutra</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/Nosepin.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Nosepin</Text>
    </View>
    <View style={styles.product}>
      <Image source={require('../../assets/images/bracelet.png')} style={styles.Collection} />
      <Text style={{color:"#8d181a" }}>Bracelet</Text>
    </View>
  </View>
</View>



          <View style={styles.investContainer}>
            <Text style={styles.sectionTitle}>Invest in Silver</Text>
            <Text style={styles.investDetails}>Grow your wealth by 9% p.a.</Text>
            <Text style={styles.silverPrice}>₹ 80.91/gm</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#8d181a',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  locationRateContainer: {
    position: 'absolute',
    top: 60, // Adjust based on the height of your header
    left: 0,
    right: 0,
    backgroundColor: '#F5F5F5',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  rateSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rateText: {
    color: '#8d181a',
  },
  locationSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  locationText: {
    color: '#8d181a',
  },
  sliderContainer: {
    marginTop: 120, // Adjust based on the combined height of header and location/rate sections
    position: 'relative',
    alignItems: 'center',
  },
  scrollView: {
    width: Dimensions.get('window').width,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'cover',
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    zIndex: 1,
    backgroundColor: '#8d181a',
    padding: 10,
    borderRadius: 20,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 1,
    backgroundColor: '#8d181a',
    padding: 10,
    borderRadius: 20,
  },
  scrollableContent: {
    flex: 1,
    marginTop: 0, // Adjust to match the bottom of the slider container
  },
  constantImage: {
    width: Dimensions.get('window').width,
    height: 200,
    borderColor: 'white',
    borderWidth: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  livePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
  getStartedContainer: {
    marginVertical: 20,
  },
  getStartedButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shopContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Space between the items
  },
  product: {
    width: '48%', // 48% width to allow space for margin and two items per row
    marginBottom: 10,
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  investContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  investDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  silverPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Collection: {
  width: 150, 
  height: 120, 
  borderWidth: 1,
   borderColor:'#8d181a', 
   borderRadius:'5',
  }
});

export default Home;
