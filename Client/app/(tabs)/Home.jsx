import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={styles.container}>
    
    {/* Gold Rate container */}

    <Text style={{color:'#000'}}>TODAY'S GOLD AND SILVER RATE</Text>
      <View style={{backgroundColor:'rgb(127,12,0)', margin:10, padding:10,justifyContent:'space-around',display:'flex',flexDirection:'row', width:'100%'}}>
      <Text style={{color:'#fff'}}>24K Gold Rate</Text>
      <Text style={{color:'#fff'}}>22k GOld Rate</Text>
      <Text style={{color:'#fff'}}>Silver Rate</Text>
      </View>
   
      {/* info about company */}
      <View style={{alignItems:'center'}}>
        <Text>ATTICA GOLD COMPANY</Text>
        <Text style={{padding:20}}>
        The Attica gold company is the pioneer and the No.1 Gold Buying Company, established in the year 2013, Attica gold is an ISO 9001:2015 certified company. We are the ‘1’st to introduce the concept of buying gold at an online price. We buy all types of gold coins, jewellery, and biscuits and lend money to release pledged gold from financial institutes/pawns and brokers/NBFCs. We offer instant spot cash for gold and silver. Selling gold at Attica gold company is fast, simple and easy.

Gold may be a popular item throughout India. The online gold rate is determined by global trends. Gold prices are volatile and are affected by a variety of factors, including the strength of the US dollar and seasonal demand within the country. Gold investment portfolios are profitable due to their steadiness. Indians think that investing in gold will provide them with future advantages in the form of profits. Individuals place their trust in gold as a vital investment in their wealth. There are several jewellery stores where you may get real gold goods for investment or personal use. However, before making the purchase, it is recommended that you conduct some online research to determine the value of gold. The gold rate fluctuates throughout the day, therefore you’d want to view it on a certain day as well. Below we update the exact online gold price. Attica Gold Company is the best gold buying company, renowned as top gold jewelry buyers. As the best gold buyers, we buy gold and old gold 
jewelry, offering competitive prices. Looking for gold buyers near me? Choose Attica for a trustworthy and efficient gold selling experience.
        </Text>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
  //  justifyContent:'center',
   alignItems:'center'
  }
}) 