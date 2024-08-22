import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

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
    backgroundColor: '#fff',
    padding: 15,
  },
  billContainer: {
    marginBottom: 20,
  },
  billTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  billValue: {
    fontSize: 16,
  },
  checkoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
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

export default BuyNow;
