import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const ViewAllBranches = ({navigation}) => {
  const [selectedState, setSelectedState] = useState(null);

  const states = ['Karnataka', 'Tamilnadu', 'Pondicherry', 'Andhra', 'Telangana'];
  
  const branches = {
    Karnataka: [
      'Sarjapura', 'Yelahanka 2', 'Corporate Office | Attica Gold Company',
      'Attica Gold Company - Gold Buyers in Ramamurthy Nagar', 'Queens Road',
      // Add other branches as needed...
    ],
    Tamilnadu: [
      'CHENNAI- Velacherry Branch', 'Chennai -Tambaram', 'Chennai - T Nagar',
      'Chennai - Vadapalani', 'Chennai - Purasawakkam', 'Chennai - Padi',
      // Add other branches as needed...
    ],
    Pondicherry: [
      'Pondicherry', 'Puducherry Indira Gandhi Salai',
    ],
    Andhra: [
      'Guntur', 'Vijaywada', 'Bhavanipuram', 'Chittoor', 'Ananthapur', 'Kurnool',
      // Add other branches as needed...
    ],
    Telangana: [
      'Himayat Nagar', 'Secunderabad', 'Kukatpally', 'Humayun nagar', 'Dilsuk nagar',
      // Add other branches as needed...
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Find the Nearest Branch</Text>
      
      {/* "Click Here" Button */}
      <TouchableOpacity style={styles.clickHereButton} onPress={() => console.log('Click Here button pressed')}>
        <Text onPress={() => navigation.navigate('ClickHere')} style={styles.clickHereButtonText}>Click Here</Text>
      </TouchableOpacity>

      <View style={styles.statesContainer}>
        {states.map((state) => (
          <TouchableOpacity
            key={state}
            style={[
              styles.stateButton,
              selectedState === state && styles.activeStateButton,
            ]}
            onPress={() => setSelectedState(selectedState === state ? null : state)}
          >
            <Text style={styles.stateButtonText}>{state}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {selectedState && (
        <View style={styles.branchesContainer}>
          {branches[selectedState].map((branch, index) => (
            <View key={index} style={styles.branchBox}>
              <Text style={styles.branchText}>{branch}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ViewAllBranches;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  clickHereButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  clickHereButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stateButton: {
    backgroundColor: '#d4af37',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  activeStateButton: {
    backgroundColor: '#f5c842',
  },
  stateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  branchesContainer: {
    marginTop: 10,
  },
  branchBox: {
    backgroundColor: '#e1e8eb',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  branchText: {
    color: '#333',
    fontSize: 16,
  },
});
