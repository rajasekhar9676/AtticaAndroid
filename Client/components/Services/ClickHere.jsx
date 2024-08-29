import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const ClickHere = ({ onPress }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const branches = [
    {
      sNo: 1,
      branch: 'Kakinada',
      address: 'Main road, 1st floor, Liberty shoe mart building Kakinada, Opp. SRMT Office',
      area: 'Kakinada East godhavari',
      city: 'Kakinada',
      state: 'Andhrapradesh',
      distance: '49 km',
    },
    {
      sNo: 2,
      branch: 'Bhimavaram',
      address: '16-9-4, P.P.Road, Beside Annapurna Theater, Near New Bus Stand',
      area: 'Bhimavaram',
      city: 'Bhimavaram',
      state: 'Andhrapradesh',
      distance: '51 km',
    },
    {
      sNo: 3,
      branch: 'Rajahmundry',
      address: '5-75/1, 1st floor, Shaymala Center Main road, Beside Srikesh Restaurant, Rajahmundry 533103',
      area: 'Shaymala Center Main road',
      city: 'Rajahmundry',
      state: 'Andhrapradesh',
      distance: '54 km',
    },
    {
      sNo: 4,
      branch: 'Rajahmundry Devi Chowk',
      address: 'D.no 10-682,20-29-6/2 Present D.no 20-29-6 building 1st floor',
      area: 'Rajahmundry Devi Chowk',
      city: 'Rajahmundry',
      state: 'AndhraPradesh',
      distance: '54 km',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Attica Search Nearby Branch</Text>

      <Text style={styles.subHeader}>Place looking for:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type the place you want to sell Gold"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Find Nearby Branch Button */}
      <TouchableOpacity style={styles.button} onPress={() => {/* Add functionality to find nearby branches here */}}>
        <Text style={styles.buttonText}>Find Nearby Branch</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableContainer}>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>S_NO</Text>
            <Text style={styles.headerText}>BRANCH</Text>
            <Text style={styles.headerText}>ADDRESS</Text>
            <Text style={styles.headerText}>AREA</Text>
            <Text style={styles.headerText}>CITY</Text>
            <Text style={styles.headerText}>STATE</Text>
            <Text style={styles.headerText}>DISTANCE</Text>
          </View>
          {branches.map((branch) => (
            <View key={branch.sNo} style={styles.tableRow}>
              <Text style={styles.cellText}>{branch.sNo}</Text>
              <Text style={styles.cellText}>{branch.branch}</Text>
              <Text style={styles.cellText}>{branch.address}</Text>
              <Text style={styles.cellText}>{branch.area}</Text>
              <Text style={styles.cellText}>{branch.city}</Text>
              <Text style={styles.cellText}>{branch.state}</Text>
              <Text style={styles.cellText}>{branch.distance}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default ClickHere;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3, // Adds shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.25, // Shadow for iOS
    shadowRadius: 3.84, // Shadow for iOS
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableContainer: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d4af37',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    width: 100, // Adjust width for consistency
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cellText: {
    width: 100, // Adjust width for consistency
    color: '#333',
    textAlign: 'center',
  },
});
