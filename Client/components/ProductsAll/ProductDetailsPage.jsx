import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsPage = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const getPriceForWeight = (weight) => {
    if (!product || !product.weights || !product.pricePerWeight) {
      console.error("Product data is incomplete.");
      return 0;
    }

    const weightIndex = product.weights.indexOf(weight);
    if (weightIndex === -1 || !product.pricePerWeight[weightIndex]) {
      console.error("Weight or price for weight not found.");
      return 0;
    }

    return product.pricePerWeight[weightIndex];
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (!product || !Array.isArray(product.weights) || product.weights.length === 0) {
    return <Text style={styles.errorText}>Error: Product details are missing.</Text>;
  }

  const price = getPriceForWeight(selectedWeight);
  const totalAmount = price * quantity;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
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
        <Text style={styles.emiText}>EMI starts from ₹{(price / 12).toFixed(2)}/month</Text>
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

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity  onPress={() => navigation.navigate('BookOnEmi', { product, quantity, selectedWeight })}
        style={styles.emiButton}>
          <Text style={styles.buttonText}>Book On EMI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('BuyNow', { product, quantity, selectedWeight })}
          style={styles.buyNowButton}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginTop:40,
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
  headerIcon: {
    marginHorizontal: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imageThumbnails: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 24,
    color: '#007bff',
    marginBottom: 10,
  },
  emiText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
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
    backgroundColor: '#e0e0e0',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedWeight: {
    backgroundColor: '#007bff',
  },
  weightText: {
    fontSize: 18,
    color: '#333',
  },
  selectedWeightText: {
    color: '#fff',
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 22,
    color: '#333',
  },
  quantityText: {
    fontSize: 22,
    color: '#333',
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
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductDetailsPage;
