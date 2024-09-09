
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductCategory from '../../components/ProductsAll/ProductCategory';
import CategoryPage from '../../components/ProductsAll/CategoryPage';
import AllProducts from '../../components/ProductsAll/AllProducts';
import ProductDetailsPage from '../../components/ProductsAll/ProductDetailsPage';
import BuyNow from '../../components/ProductsAll/BuyNow';
import BookOnEmi from '../../components/ProductsAll/BookOnEmi';

const Stack = createStackNavigator();
const Products = () => {
  return (
    
     <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='AllProducts' component={AllProducts}/>
      <Stack.Screen name='ProductCategory' component={ProductCategory}/>
      <Stack.Screen name='CategoryPage' component={CategoryPage}/>
      <Stack.Screen name="ProductDetails" component={ProductDetailsPage}/>
      <Stack.Screen name="BuyNow" component={BuyNow}/>
      <Stack.Screen name="BookOnEmi" component={BookOnEmi}/>
     </Stack.Navigator>
  )
}

export default Products

const styles = StyleSheet.create({})


























// import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
// // import CategoryPage from './components/Productsall/CategoryPage';
// import CategoryPage from '../../components/ProductsAll/CategoryPage';


// const Products = () => {
//   const navigation = useNavigation(); // Use the navigation hook

//   const categories = [
//     { id: '1', name: 'Bangles', price: '₹50148', image: require('./../../assets/images/aboutus11.jpeg') },
//     { id: '2', name: 'Bharat & Beyond', price: '₹32999', image: require('./../../assets/images/Necklaces.jpeg') },
//     { id: '3', name: 'Bangles', price: '₹50148', image: require('./../../assets/images/aboutus11.jpeg') },
//     { id: '4', name: 'Bharat & Beyond', price: '₹32999', image: require('./../../assets/images/Necklaces.jpeg') },
//     // Add more categories as needed
//   ];

//   const trending = [
//     { id: '1', name: '1Gm Gold Coin (999 purity)', image: require('./../../assets/images/abc.jpeg') },
//     { id: '2', name: 'Augmont 0.1Gm Gold Coin (999 purity)', image: require('./../../assets/images/banner.jpeg') },
//     { id: '3', name: '1Gm Gold Coin (999 purity)', image: require('./../../assets/images/abc.jpeg') },
//     { id: '4', name: 'Augmont 0.1Gm Gold Coin (999 purity)', image: require('./../../assets/images/banner.jpeg') },
//     // Add more trending items as needed
//   ];


//   const handleCategoryPress = (category) => {
//     navigation.navigate('CategoryPage', { category });
//   };

//   const renderCategoryItem = ({ item }) => (
//     <View style={{borderWidth:1,borderColor:'gray', margin:5,borderRadius:15}}>
//       <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
//         <Image source={item.image} style={styles.categoryImage} />
//         <Text style={styles.categoryName}>{item.name}</Text>
//         <Text style={styles.categoryPrice}>{item.price}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderTrendingItem = ({ item }) => (
//     <View  style={{borderWidth:1,borderColor:'gray', margin:5,borderRadius:15}}>
//       <TouchableOpacity style={styles.trendingItem}>
//         <Image source={item.image} style={styles.trendingImage} />
//         <Text style={styles.trendingName}>{item.name}</Text>
//       </TouchableOpacity>
//     </View>
//   );


//   return (
//     <View style={styles.container}>
//       {/* Landing page */}
//       <View style={styles.logoContainer}>
//         <Image source={require('./../../assets/images/logo4.png')} style={styles.logo} />
//       </View>

//       {/* Product Categories */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Product Categories</Text>
//         <FlatList
//           data={categories}
//           renderItem={renderCategoryItem}
//           keyExtractor={item => item.id}
//           horizontal
//         />
//       </View>

//       {/* What's Trending */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>What's Trending</Text>
//         <FlatList
//           data={trending}
//           renderItem={renderTrendingItem}
//           keyExtractor={item => item.id}
//           horizontal
//         />
//       </View>
//     </View>
//   );
// }

// export default Products;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     height: 200,
//     resizeMode: 'contain',
//   },
//   section: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   categoryItem: {
//     margin: 10,
//     alignItems: 'center',
//   },
//   categoryImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   categoryName: {
//     marginTop: 5,
//     fontSize: 16,
//   },
//   categoryPrice: {
//     marginTop: 5,
//     fontSize: 14,
//     color: 'grey',
//   },
//   trendingItem: {
//     margin: 10,
//     alignItems: 'center',
//   },
//   trendingImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   trendingName: {
//     marginTop: 5,
//     fontSize: 16,
//   },
// });
