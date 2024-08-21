import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [bars, setBars] = useState([]); // State for storing "Bars" category products
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/products/getproducts`);
        if (Array.isArray(response.data)) {
          const uniqueCategories = [];
          const barsCategory = [];
          const filteredCategories = response.data.filter(item => {
            if (item.category && !uniqueCategories.includes(item.category)) {
              uniqueCategories.push(item.category);
            }
            if (item.category === 'Bars') {
              barsCategory.push(item); // Collect items in the "Bars" category
            }
            return uniqueCategories.includes(item.category);
          });
          setCategories(filteredCategories);
          setBars(barsCategory); // Set state for "Bars" category products
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

  const renderCategoryItem = ({ item }) => (
    <Animatable.View animation="slideInUp" duration={500} style={styles.categoryContainer}>
      <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item.category)}>
        <Image source={{ uri: item.image ? (item.image.startsWith('http') ? item.image : `${BASE_URL}/uploads/${item.image}`) : null }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.categoryPrice}>Starts at ₹{item.price}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" duration={800} style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </Animatable.View>

      {/* Main container */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('./../../assets/images/logo4.png')} style={styles.logo1} />
        </View>

        <Animatable.View animation="fadeIn" duration={1000} style={styles.section}>
          <Text style={styles.sectionTitle}>Product Categories</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
              horizontal
            />
          )}
        </Animatable.View>

        <Animatable.View animation="fadeIn" duration={1000} style={styles.section}>
          <Text style={styles.sectionTitle}>Gold Bars</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={bars} // Use bars state for displaying "Bars" category products
              renderItem={renderCategoryItem}
              keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
              horizontal
            />
          )}
        </Animatable.View>

        <Animatable.View animation="fadeIn" duration={1000} style={styles.section}>
          <Text style={styles.sectionTitle}>What's Trending</Text>
          <FlatList
            data={categories.slice(0, 4)}
            renderItem={renderCategoryItem}
            keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
            horizontal
          />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Black background for the entire screen
  },
  scrollContainer: {
    padding: 20,
    marginTop: 40,
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
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  logo1: {
    height: 200,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white', // Dark background for each section
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Adjusted for better visibility on white background
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#e6747d', // Dark background for category items
  },
  categoryItem: {
    margin: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 16,
    color: 'white',
  },
  categoryPrice: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
  },
});
