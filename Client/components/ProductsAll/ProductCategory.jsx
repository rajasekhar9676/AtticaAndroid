import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

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
    <>
  {/* Header */}
    <View style={styles.headerContainer}>
    <FontAwesome6 name="bars" size={24} color="white" />
    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
    <AntDesign name="shoppingcart" size={24} color="white" />
  </View>

  {/* Mian container */}
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./../../assets/images/logo4.png')} style={styles.logo1} />
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
            horizontal
          />
        )}
      </View>

      <View style={styles.section}>
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
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's Trending</Text>
        <FlatList
          data={categories.slice(0, 4)}
          renderItem={renderCategoryItem}
          keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
          horizontal
        />
      </View>

      {/* <View style={styles.section}>
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
      </View> */}
    </ScrollView>
    </>
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
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
    backgroundColor: '#faebd6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    borderRadius: 15,
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
