import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const GoldLoan = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gold Loan Services</Text>
      </View>

      <TouchableOpacity
        style={styles.box}
        onPress={() => handleOptionClick('loanAgainstGold')}
      >
        <Text style={styles.boxText}>Loan Against Gold</Text>
      </TouchableOpacity>

      {selectedOption === 'loanAgainstGold' && (
        <View style={styles.detailsBox}>
          <Text style={styles.step}>1. Apply for Gold Loan</Text>
          <Text style={styles.step}>2. Assess Your Gold</Text>
          <Text style={styles.step}>3. Get Your Loan</Text>

          <View style={styles.calculatorBox}>
            <Text style={styles.calculatorTitle}>Loan Calculator</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Gold Weight (grams)"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Gold Purity (%)"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.calculateButton}>
              <Text style={styles.calculateButtonText}>Calculate</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.box}
        onPress={() => handleOptionClick('sellOldGold')}
      >
        <Text style={styles.boxText}>Sell Old Gold</Text>
      </TouchableOpacity>

      {selectedOption === 'sellOldGold' && (
        <View style={styles.detailsBox}>
          <Text style={styles.step}>1. Bring Your Old Gold</Text>
          <Text style={styles.step}>2. Test for Purity</Text>
          <Text style={styles.step}>3. Receive Instant Cash</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default GoldLoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d4af37', // Gold color for the title
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  boxText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detailsBox: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  step: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  calculatorBox: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  calculateButton: {
    backgroundColor: '#d4af37',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
