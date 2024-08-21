import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const ProductDetailsPage = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);

  useEffect(() => {
    if (route.params && route.params.product) {
      setProduct(route.params.product);
      setLoading(false);
      if (Array.isArray(route.params.product.weights) && route.params.product.weights.length > 0) {
        setSelectedWeight(route.params.product.weights[0]);
      }
    } else {
      console.error("No product data provided.");
      setLoading(false);
    }
  }, [route.params]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (!product || !Array.isArray(product.weights) || product.weights.length === 0) {
    return <Text style={styles.errorText}>Error: Product details are missing.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Image */}
      <Animatable.View animation="fadeIn" duration={1200} style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.imageThumbnails}>
          {product.images?.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.thumbnail} />
          ))}
        </View>
      </Animatable.View>

      {/* Product Name and Price */}
      <Animatable.View animation="fadeInUp" duration={1200} style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₹{product.price}</Text>
        <Text style={styles.emiText}>EMI starts from just ₹{(product.price / 12).toFixed(2)}/month</Text>
      </Animatable.View>

      {/* Weight Selection */}
      <Text style={styles.sectionTitle}>Choose weight</Text>
      <View style={styles.weightsContainer}>
        {product.weights.map((weight, index) => (
          <Animatable.View
            key={index}
            animation="bounceIn"
            duration={800}
            delay={index * 100}
            style={[styles.weightOption, selectedWeight === weight && styles.selectedWeight]}
          >
            <TouchableOpacity onPress={() => setSelectedWeight(weight)}>
              <Text style={[styles.weightText, selectedWeight === weight && styles.selectedWeightText]}>
                {weight}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
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
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  imageContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 15,
    borderRadius: 10,
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productDetails: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    color: '#555',
    marginBottom: 10,
  },
  emiText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  weightOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedWeight: {
    backgroundColor: '#007bff',
  },
  weightText: {
    fontSize: 16,
    color: '#333',
  },
  selectedWeightText: {
    color: '#fff',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emiButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buyNowButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
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
