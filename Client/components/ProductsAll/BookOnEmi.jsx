import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const BookOnEmi = () => {
  // Example data
  const product = {
    name: 'Gold Necklace',
    pricePerGram: 5000, // Price per gram
    weight: 10, // Weight in grams
  };
  const quantity = 1; // Number of items
  const totalAmount = product.pricePerGram * product.weight * quantity;
  const emiScheme = 12; // Number of EMI months
  const emiAmount = totalAmount / emiScheme;

  // Function to handle order placement
  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed',
      'Your order has been placed successfully.',
      [{ text: 'OK', onPress: () => console.log('Order placed successfully') }],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Bill Details */}
      <View style={styles.billContainer}>
        <Text style={styles.billTitle}>Bill Details</Text>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Product:</Text>
          <Text style={styles.billValue}>{product.name}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Weight (grams):</Text>
          <Text style={styles.billValue}>{product.weight}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Price per Gram:</Text>
          <Text style={styles.billValue}>₹{product.pricePerGram}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Total Amount:</Text>
          <Text style={styles.billValue}>₹{totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>EMI Scheme:</Text>
          <Text style={styles.billValue}>{emiScheme} months</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>EMI Amount (per month):</Text>
          <Text style={styles.billValue}>₹{emiAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Proceed to Checkout */}
      <View style={styles.checkoutContainer}>
        <Text style={styles.checkoutTotal}>Total Amount to Pay: ₹{totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  billContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  billTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  billLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  billValue: {
    fontSize: 16,
    color: '#333',
  },
  checkoutContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  checkoutTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookOnEmi;
