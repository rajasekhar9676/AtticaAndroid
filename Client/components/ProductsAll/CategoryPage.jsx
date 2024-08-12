import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AllProducts from './AllProducts'

const CategoryPage = ({ route }) => {
  const { category } = route.params;

  // Sample data for category items
  const items = [
    { id: '1', name: 'Infinity Bangle 2.4 (7.0 gm)', price: '₹50148', image: require('./../../assets/images/aboutus11.jpeg') },
    { id: '2', name: 'Machine Design Bangle (7.0 gm)', price: '₹50148', image: require('./../../assets/images/Necklaces.jpeg') },
    // Add more items as needed
  ];

  const renderItem = ({ item }) => (

    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (

    <>
    
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id} />
    </View>
    </>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
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


