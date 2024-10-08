import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BuyNow = () => {
  const route = useRoute();
  const { product, quantity, selectedWeight } = route.params || {}; // Extract product, quantity, and selectedWeight from route params

  if (!product || !quantity || !selectedWeight) {
    return <Text style={styles.errorText}>Error: Missing product, quantity, or weight data.</Text>;
  }

  // Calculate total amount
  const totalAmount = product.price * quantity;
  const emiAmount = totalAmount / 12; // Assuming EMI is divided into 12 months

  // Function to handle order placement
  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed',
      'Your order is placed successfully.',
      [
        { text: 'OK', onPress: () => console.log('Order placed successfully') }
      ],
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
          <Text style={styles.billLabel}>Weight:</Text>
          <Text style={styles.billValue}>{selectedWeight}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Quantity:</Text>
          <Text style={styles.billValue}>{quantity}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Price per Item:</Text>
          <Text style={styles.billValue}>₹{product.price}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Payable Amount:</Text>
          <Text style={styles.billValue}>₹{totalAmount.toFixed(2)}</Text>
        </View>
        {/* Commented out other fields */}
        {/* <View style={styles.billItem}>
          <Text style={styles.billLabel}>Initial Payment:</Text>
          <Text style={styles.billValue}>₹{totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>EMI Scheme:</Text>
          <Text style={styles.billValue}>₹{emiAmount.toFixed(2)}/month for 12 months</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>EMI Amount (per month):</Text>
          <Text style={styles.billValue}>₹{emiAmount.toFixed(2)}</Text>
        </View> */}
        <View style={styles.billItem}>
          <Text style={styles.billLabel}>Grand Total:</Text>
          <Text style={styles.billValue}>₹{totalAmount.toFixed(2)}</Text>
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
    marginTop:40,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default BuyNow;
