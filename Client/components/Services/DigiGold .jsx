import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React from 'react';

const DigiGold = () => {
  const [amount, setAmount] = React.useState(1000);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Gold</Text>

      {/* Current Gold Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>7077.20/gm</Text>
        <Text style={styles.priceChange}>-108.40 (-1.51%) This Month</Text>
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
        value={amount.toString()}
        onChangeText={text => setAmount(Number(text))}
      />
      
      {/* Calculated Grams (Placeholder Calculation) */}
      <Text style={styles.grams}>{(amount / 7077.20).toFixed(4)} grams</Text>

      {/* Investment Buttons */}
      <View style={styles.buttonsContainer}>
        <Button title="One-Time" onPress={() => {}} />
        <Button title="Create SIP" onPress={() => {}} />
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 16,
    color: 'red',
  },
  chartContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  chartText: {
    color: '#999',
  },
  investTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendations: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  recommendationButton: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
  },
  recommendationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  grams: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
