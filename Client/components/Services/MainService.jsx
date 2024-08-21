// src/components/Services/Services.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';


const MainService= ({ navigation }) => {
  return (
    <><SafeAreaView><View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('DigiGold')}>
        <Text style={styles.service}>Digi Gold</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('GoldLoan')}>
        <Text style={styles.service}>Gold Loan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Insurance')}>
        <Text style={styles.service}>Insurance</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    
    display:'flex',
    flexDirection:'row',
  },
  service: {
    fontSize: 18,
    margin: 10,
  },
});

export default MainService;
