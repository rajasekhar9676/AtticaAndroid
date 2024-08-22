import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

const GoldLoan = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/back6.png')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
          <Text style={styles.headerText}>Gold Loan Services</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={1000} delay={200} style={styles.boxContainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleOptionClick('loanAgainstGold')}
          >
            <Text style={styles.boxText}>Loan Against Gold</Text>
          </TouchableOpacity>

          {selectedOption === 'loanAgainstGold' && (
            <Animatable.View animation="fadeIn" duration={1000} style={styles.detailsBox}>
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
            </Animatable.View>
          )}

          <TouchableOpacity
            style={styles.box}
            onPress={() => handleOptionClick('sellOldGold')}
          >
            <Text style={styles.boxText}>Sell Old Gold</Text>
          </TouchableOpacity>

          {selectedOption === 'sellOldGold' && (
            <Animatable.View animation="fadeIn" duration={1000} style={styles.detailsBox}>
              <Text style={styles.step}>1. Bring Your Old Gold</Text>
              <Text style={styles.step}>2. Test for Purity</Text>
              <Text style={styles.step}>3. Receive Instant Cash</Text>
            </Animatable.View>
          )}
        </Animatable.View>
      </ScrollView>
    </ImageBackground>
  );
};

export default GoldLoan;

const styles = StyleSheet.create({
  backgroundImage: {
    marginTop:40,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: '#ddd',
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
