import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import React from 'react';

const DigiGold = () => {
  const [amount, setAmount] = React.useState('1000');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Gold</Text>

      {/* Current Gold Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹7077.20/gm</Text>
        <Text style={styles.priceChange}>-₹108.40 (-1.51%) This Month</Text>
      </View>

      {/* Chart Section (Placeholder) */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartText}>[Chart Placeholder]</Text>
      </View>

      {/* Investment Section */}
      <Text style={styles.investTitle}>Begin Your Gold Investment Today</Text>

      {/* Recommendations */}
      <View style={styles.recommendations}>
        {['₹500', '₹1000', '₹5000', '₹6000'].map((value, index) => (
          <TouchableOpacity key={index} style={styles.recommendationButton} onPress={() => setAmount(value.replace('₹', ''))}>
            <Text style={styles.recommendationText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={amount}
        onChangeText={text => setAmount(text)}
        placeholder="Enter amount"
      />
      
      {/* Calculated Grams (Placeholder Calculation) */}
      <Text style={styles.grams}>{(amount / 7077.20).toFixed(4)} grams</Text>

      {/* Investment Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>One-Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Create SIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DigiGold;

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  priceChange: {
    fontSize: 16,
    color: '#e74c3c',
    marginTop: 5,
  },
  chartContainer: {
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartText: {
    color: '#7f8c8d',
    fontSize: 18,
  },
  investTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  recommendations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recommendationButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  grams: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
