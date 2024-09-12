import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';

const Aboutcomp = ({ navigation }) => {
  return (
    <View>
      {/* About Company */}
      <Image source={require('../../assets/images/constants.png')} style={styles.constantImage} />
      <View>
        <Text style={styles.About}>Attica Gold Company</Text>
        <View style={styles.content}>
          <Text>
            The Attica gold company is the pioneer and the No.1 Gold Buying Company. We buy all types of gold coins, jewellery, and biscuits and lend money to release pledged gold from financial institutes/pawns and brokers/NBFCs. We offer instant spot cash for gold and silver. Selling gold at Attica gold company is fast, simple and easy.
          </Text>
        </View>
      </View>

      {/* ATTICA ASSURE */}
      <View style={styles.assureSection}>
        <Text style={styles.atticaText}>ATTICA</Text>
        <Text style={styles.assureText}>ASSURE</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.assureContainer}
        >
          <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
            <Image source={require('../../assets/images/guaranteed.png')} style={styles.getloan} />
            <Text style={styles.buttonText}>Guaranteed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
            <Image source={require('../../assets/images/softwareverification.png')} style={styles.getloan} />
            <Text style={styles.buttonText}>Software Verification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
            <Image source={require('../../assets/images/anyaliticaltesting.png')} style={styles.getloan} />
            <Text style={styles.buttonText}>Best Analytical Testing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
            <Image source={require('../../assets/images/banktransfer.png')} style={styles.getloan} />
            <Text style={styles.buttonText}>Instant Bank Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
            <Image source={require('../../assets/images/certified.png')} style={styles.getloan} />
            <Text style={styles.buttonText}>Tested & Certified</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Aboutcomp;

const styles = StyleSheet.create({
  constantImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  About: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8d181a',
    marginVertical: 10,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  assureSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcecd4',
  },
  atticaText: {
    fontSize: 15,
    color: '#8d181a',
    marginVertical: 5,
    marginTop: 10,
  },
  assureText: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
  },
  assureContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  assureButton: {
    width: 80,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8d181a',
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#8d181a',
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  getloan: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
});
