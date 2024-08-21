import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { useNavigation } from '@react-navigation/native'; 
import * as Animatable from 'react-native-animatable'; // For animations

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
    <Animatable.View animation="fadeInUp" duration={800} style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
        <Image source={{ uri: item.image ? (item.image.startsWith('http') ? item.image : `${BASE_URL}/uploads/${item.image}`) : null }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
        <Text style={styles.title}>{category}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleSortChange} style={styles.sortButton}>
            <Text style={styles.sortText}>Sort By Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}</Text>
            <Icon name={sortOrder === 'asc' ? 'arrow-down' : 'arrow-up'} size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animatable.View>

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
        <ActivityIndicator size="large" color="#ffd700" style={styles.loader} />
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
    backgroundColor: '#f5f5f5', // Light gray background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000', // Dark background for header
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  sortText: {
    marginRight: 5,
    fontSize: 16,
    color: '#fff',
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
    backgroundColor: '#dcdcdc', // Light gray for inactive tabs
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
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
