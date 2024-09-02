import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const OurServices = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.getStartedContainer}>
                <TouchableOpacity
                  style={styles.getStartedButton}
                  onPress={() => navigation.navigate('GoldLoan')}>
                  <Text style={styles.buttonText}>Get gold loan at lowest interest rates</Text>
                  <Text style={styles.getstarted}>Get Started</Text>
                  <Image source={require('../../assets/images/getloan.png')} style={styles.loan} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('GoldLoan')}>
                  <Text style={styles.buttonText}>Sell your gold at the best possible price</Text>
                  <Text style={styles.getstarted}>Get Started</Text>
                  <Image source={require('../../assets/images/sellgold.png')} style={styles.loan} />
                </TouchableOpacity>
              </View>
    </View>
  )
}

export default OurServices

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
      },
      getStartedContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        marginHorizontal: 5,
      },
      getStartedButton: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        flex: 1,
        marginHorizontal: 5,
        borderColor: '#8d181a',
        opacity: 1,
        borderWidth: 1,
        marginVertical: 10,
      },
      buttonText: {
        color: '#8d181a',
        justifyContent: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: 5,
      },
      loan: {
        width: 150,
        height: 150,
        marginVertical: 10,
      },
})