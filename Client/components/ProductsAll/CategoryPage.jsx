import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { useNavigation } from '@react-navigation/native'; 

const CategoryPage = ({ route }) => {
  const navigation = useNavigation();

  const { category: initialCategory } = route.params;
  const [category, setCategory] = useState(initialCategory || 'All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for Low to High, 'desc' for High to Low

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
          const response = await axios.get(`${BASE_URL}/api/products/getproducts`, {
              params: {
                  category: category !== 'All' ? category : undefined,
                  sortOrder
              }
          });
          setProducts(response.data);
      } catch (error) {
          Alert.alert('Error', error.response?.data?.message || 'Failed to fetch products');
      } finally {
          setLoading(false);
      }
  };
  

    fetchProducts();
  }, [category, sortOrder]);

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>

      <View style={styles.itemContainer}>
      
        <Image source={{ uri: item.image ? (item.image.startsWith('http') ? item.image : `${BASE_URL}/uploads/${item.image}`) : null }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{category}</Text>
        <TouchableOpacity onPress={handleSortChange} style={styles.sortButton}>
          <Text style={styles.sortText}>Sort By Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}</Text>
          <Icon name={sortOrder === 'asc' ? 'arrow-down' : 'arrow-up'} size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {['All', 'Gold', 'Silver'].map((cat) => (
          <TouchableOpacity key={cat} onPress={() => setCategory(cat)} style={[styles.categoryTab, category === cat && styles.activeTab]}>
            <Text style={[styles.categoryText, category === cat && styles.activeText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products List */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
          contentContainerStyle={styles.productList}
          numColumns={2} // Show two items per row
        />
      )}
    </View>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginRight: 5,
    fontSize: 16,
  },
  filterButton: {
    padding: 5,
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  categoryTab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#FFD700', // Gold color for active tab
  },
  categoryText: {
    fontSize: 16,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productList: {
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    maxWidth: '48%', // Each item takes 48% of the width
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    fontSize: 18,
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
});

