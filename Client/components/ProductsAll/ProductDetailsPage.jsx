import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetailsPage = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (route.params && route.params.product) {
        setProduct(route.params.product);
        setLoading(false);
    } else {
        console.error("No product data provided.");
        setLoading(false);
    }
}, [route.params]);

if (!product || !Array.isArray(product.weights) || product.weights.length === 0) {
    console.error("Product or weights data is missing.");
    return <Text style={styles.errorText}>Error: Product details are missing.</Text>;
}


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

//   if (!product || !Array.isArray(product.weights) || product.weights.length === 0) {
//     console.error("Product or weights data is missing.");
//     return <Text style={styles.errorText}>Error: Product details are missing.</Text>;
// }


  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.imageThumbnails}>
          {product.images?.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.thumbnail} />
          ))}
        </View>
      </View>

      {/* Product Name and Price */}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>₹{product.price}</Text>
      <Text style={styles.emiText}>EMI starts from just ₹{(product.price / 12).toFixed(2)}/month</Text>

      {/* Weight Selection */}
      <Text style={styles.sectionTitle}>Choose weight</Text>
      <View style={styles.weightsContainer}>
        {product.weights.map((weight, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.weightOption, selectedWeight === weight && styles.selectedWeight]} 
            onPress={() => setSelectedWeight(weight)}
          >
            <Text style={[styles.weightText, selectedWeight === weight && styles.selectedWeightText]}>
              {weight}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.emiButton}>
          <Text style={styles.buttonText}>Book On EMI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  imageThumbnails: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  emiText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weightsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  weightOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedWeight: {
    backgroundColor: '#007bff',
  },
  weightText: {
    fontSize: 16,
    color: '#000',
  },
  selectedWeightText: {
    color: '#fff',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  emiButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buyNowButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductDetailsPage;
