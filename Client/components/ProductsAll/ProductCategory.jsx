import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../constants';

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
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item.category)}>
        <Image source={{ uri: item.image ? (item.image.startsWith('http') ? item.image : `${BASE_URL}/uploads/${item.image}`) : null }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.categoryPrice}>Starts at ₹{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./../../assets/images/logo4.png')} style={styles.logo} />
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
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 200,
    resizeMode: 'contain',
  },
  section: {
    marginTop: 20,
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
