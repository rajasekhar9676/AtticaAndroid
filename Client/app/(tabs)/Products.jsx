import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Products = () => {
  return (
    <View>
      {/* Landing page */}
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Image source={require('./../../assets/images/logo4.png')} style={{ height: 450, backgroundColor: 'black', rounded: 'full' }} />
      </View>

      {/* Second Section */}
      <View>
        <View style={{ margin: 10, padding: 10, justifyContent: 'space-around', display: 'flex', flexDirection: 'row', width: '100%' }}>
          <TouchableOpacity >
            <Text style={styles.subContainer}>Jewellery</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.subContainer}>Gold Bars</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  subContainer: {
    textAlign: 'center',
backgroundColor:'rgb(127,12,0)',
    padding: 20,
    color: '#fff',
  }
})