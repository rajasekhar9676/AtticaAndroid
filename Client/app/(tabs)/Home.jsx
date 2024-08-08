import { StyleSheet, Text, View, ScrollView, TouchableOpacity ,Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Header } from 'react-native/Libraries/NewAppScreen';

const Home = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <>
    <View style={{backgroundColor:'black',padding:20,}}>
      <Image source={require('../../assets/images/logo.png')}  style={{ width: 250, height: 80 }} />

    </View>
    <ScrollView style={styles.container}>
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
      <View style={styles.shopContainer}>
        <Text style={styles.sectionTitle}>Shop At Attica Gold</Text>
        <View style={styles.productContainer}>
          <View style={styles.product}>
            <Text style={styles.productName}>Bangles</Text>
            <Text style={styles.productPrice}>Starting From ₹50148</Text>
          </View>
          <View style={styles.product}>
            <Text style={styles.productName}>Bharat & Beyond Gold</Text>
            <Text style={styles.productPrice}>Starting From ₹32999</Text>
          </View>
        </View>
      </View>
      <View style={styles.investContainer}>
        <Text style={styles.sectionTitle}>Invest in Silver</Text>
        <Text style={styles.investDetails}>Grow your wealth by 9% p.a.</Text>
        <Text style={styles.silverPrice}>₹ 80.91/gm</Text>
      </View>
    </ScrollView></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    width: '48%',
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
});

export default Home;
