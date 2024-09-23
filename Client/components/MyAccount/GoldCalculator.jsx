import { StyleSheet, Text, View, TextInput, Button, Picker, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const GoldCalculator = () => {
  const [goldType, setGoldType] = useState('arnament');
  const [goldWeight, setGoldWeight] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [stoneWeight, setStoneWeight] = useState('');
  const [purity, setPurity] = useState('');
  const [givenPurity, setGivenPurity] = useState('');
  const [goldRate, setGoldRate] = useState('');
  const [commission, setCommission] = useState('');
  const [showNetAmount, setShowNetAmount] = useState(false);

  // Calculate net weight
  const netWeight = (parseFloat(grossWeight) || 0) - (parseFloat(stoneWeight) || 0);
  // Calculate gross amount
  const grossAmount = (netWeight * (parseFloat(givenPurity) / 100 || 0) * (parseFloat(goldRate) || 0)).toFixed(2);
  // Calculate margin value
  const marginValue = (grossAmount * (parseFloat(commission) / 100 || 0)).toFixed(2);
  // Calculate net amount
  const netAmount = (parseFloat(grossAmount) || 0) - (parseFloat(marginValue) || 0);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Gold Calculator</Text>

        <Text style={styles.label}>Gold Type:</Text>
        <Picker
          selectedValue={goldType}
          style={styles.picker}
          onValueChange={(itemValue) => setGoldType(itemValue)}
        >
          <Picker.Item label="Arnaments" value="arnament" />
          <Picker.Item label="Bars" value="bar" />
          <Picker.Item label="Biscuits" value="biscuit" />
        </Picker>

        <Text style={styles.label}>Gold Weight (grams): <Text style={styles.highlight}>given by m/c</Text></Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={goldWeight}
          onChangeText={setGoldWeight}
          placeholder="Enter weight in grams"
        />

        <Text style={styles.label}>Gross Weight (grams): <Text style={styles.highlight}>given by m/c</Text></Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={grossWeight}
          onChangeText={setGrossWeight}
          placeholder="Enter gross weight in grams"
        />

        <Text style={styles.label}>Stone Weight (grams): <Text style={styles.highlight}>given by m/c</Text></Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={stoneWeight}
          onChangeText={setStoneWeight}
          placeholder="Enter stone weight in grams"
        />

        <Text style={styles.label}>Net Weight (grams): <Text style={styles.highlight}>Gross weight - Stone weight= Net Weight</Text></Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={netWeight.toString()}
          editable={false} // Make it read-only
        />

        <Text style={styles.label}>Purity:</Text>
        <Picker
          selectedValue={purity}
          style={styles.picker}
          onValueChange={(itemValue) => setPurity(itemValue)}
        >
          <Picker.Item label="24k = [92 - 99.9%]" value="92 - 99.9" />
          <Picker.Item label="916 HallMark = [91.6%]" value="91.6" />
          <Picker.Item label="Non HallMark = [85 - 91%]" value="85 - 91" />
          <Picker.Item label="Normal = [75 - 84%]" value="75 - 84" />
          <Picker.Item label="Below 75%" value="0 - 74" />
        </Picker>

        <Text style={styles.label}>Given Purity: <Text style={styles.highlight}>given by m/c</Text></Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={givenPurity}
          onChangeText={setGivenPurity}
          placeholder="Enter purity in %"
        />

        <Text style={styles.label}>Gold Rate:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={goldRate}
          onChangeText={setGoldRate}
          placeholder="Enter Gold Rate"
        />

        <Text style={styles.label}>Gross Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={grossAmount.toString()}
          editable={false} // Make it read-only
        />

        <Text style={styles.label}>Commission (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={commission}
          onChangeText={setCommission}
          placeholder="Enter Commission in %"
        />

        <Text style={styles.label}>Margin Value:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={marginValue.toString()}
          editable={false} // Make it read-only
        />

        <Text style={styles.label}>Net Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={netAmount.toString()}
          editable={false} // Make it read-only
        />

        <Button
          title="Show Net Amount"
          onPress={() => setShowNetAmount(!showNetAmount)}
          color="#4CAF50" // Green color for the button
        />

        {showNetAmount && (
          <Text style={styles.result}>Net Amount: {netAmount.toFixed(2)}</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default GoldCalculator;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f9f9f9', // Light background color for the scroll view
  },
  container: {
    padding: width * 0.05,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: height * 0.02,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: width * 0.045,
    marginVertical: height * 0.01,
    color: '#555',
  },
  highlight: {
    color: 'red', // Red color for "given by m/c"
    fontWeight: 'regular',
    fontSize: 15,
  },
  picker: {
    height: height * 0.05,
    width: '100%',
  },
  input: {
    height: height * 0.05,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.02,
    backgroundColor: '#f2f2f2', // Light grey background for inputs
  },
  result: {
    fontSize: 10,
    color: '#4CAF50',
    marginVertical: height * 0.01,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
