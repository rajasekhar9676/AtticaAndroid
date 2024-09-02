import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, } from 'react-native'

import React, {useEffect, useState} from 'react';

const OurCollections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/products/getproducts`);
        if (Array.isArray(response.data)) {
          const uniqueCategories = {};
          response.data.forEach(item => {
            if (item.category) {
              if (!uniqueCategories[item.category]) {
                uniqueCategories[item.category] = item;
              }
            }
          });
          setCategories(Object.values(uniqueCategories));
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

      {/* Invest in Silver */}
      <View style={styles.investContainer}>
        <Text style={styles.sectionTitle}>Invest in Silver</Text>
        <Text style={styles.investDetails}>Explore the benefits of investing in silver.</Text>
        <TouchableOpacity style={styles.investButton}>
          <Text style={styles.investButtonText}>Invest Now</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default OurCollections

const styles = StyleSheet.create({
  categoryContainer: {
    marginRight: 10,
  },
  categoryItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    width: 150,
    alignItems: 'center',
    padding: 10,
  },
  categoryImage: {
    width: 130,
    height: 100,
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  categoryPrice: {
    color: '#8d181a',
  },
  section: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },




  investContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
})