import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'

const News = () => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcecd4', }}>
    <Text style={{ fontSize: 25, fontFamily: 'bold', color: "#8d181a", marginVertical: 5, marginTop: 10 }}>Latest Updates</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, }}>
      {/* News1 */}
      <TouchableOpacity style={{
        width: 'auto', height: 'auto', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#8d181a', marginHorizontal: 10,
      }} onPress={() => navigation.navigate('News')}>
        <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, }}>
          <View style={{ justifyContent: 'center', paddingHorizontal: 5, width: '50%', }}>
            <Text style={{
              color: '#8d181a',
              flexWrap: 'wrap',
              paddingVertical: 5,
              fontWeight: '600',
              fontSize: 20,
              fontFamily: 'bold',
            }}>Heading</Text>

            <Text style={{
              color: '#8d181a',
              flexWrap: 'wrap',
              paddingVertical: 5,
              fontWeight: '300',
              fontSize: 20,
              fontFamily: 'bold',
            }}>News about attica company</Text>
            <Text style={{
              color: '#8d181a',
              flexWrap: 'wrap',
              paddingVertical: 5,
              fontWeight: '100',
              fontSize: 20,
              textDecorationLine: 'underline',
              fontFamily: 'bold',
            }}>Read more..</Text>
          </View>
          <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, width: '50%', }}>
            <Image source={require('../../assets/images/guaranteed.png')} style={{
              width: 50,
              height: 50,
            }} />
          </View>
        </View>
      </TouchableOpacity>

      {/* News2 */}
      <TouchableOpacity style={{
        width: 'auto', height: 'auto', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#8d181a', marginHorizontal: 10,
      }} onPress={() => navigation.navigate('GoldLoan')}>
        <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, }}>
          <View style={{ justifyContent: 'center', paddingHorizontal: 5, width: '50%', }}>
            <Text style={{
              color: '#8d181a',
              flexWrap: 'wrap',
              paddingVertical: 5,
              fontWeight: '600',
              fontSize: 20,
              fontFamily: 'bold',
            }}>Heading</Text>

            <Text style={{
              color: '#8d181a',
              flexWrap: 'wrap',
              paddingVertical: 5,
              fontWeight: '300',
              fontSize: 20,
              fontFamily: 'bold',
            }}>News about attica company</Text>
            <Text style={{
              color: '#8d181a',
              flexWrap: 'wrap',
              paddingVertical: 5,
              fontWeight: '100',
              fontSize: 20,
              textDecorationLine: 'underline',
              fontFamily: 'bold',
            }}>Read more..</Text>
          </View>
          <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', flex: 1, width: '50%', }}>
            <Image source={require('../../assets/images/guaranteed.png')} style={{
              width: 50,
              height: 50,
            }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default News

const styles = StyleSheet.create({})  