import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import React from 'react';

const SellGold = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <ImageBackground source={require('../../assets/images/sellgoldland.png')}
                    style={styles.backgroundImage}>
                    <Text style={styles.heading}>Cash For Gold</Text>
                </ImageBackground>
            </View>
            <Text style={styles.subHeading}>Cash Your Gold</Text>
            <Text style={styles.content}>
                Cash for gold jewellery is an easy way to get extra money. Prices for gold have reached high within the last year due to a number of reasons, but what this has meant is people now have quick and easy access to money, fast. Nearly all of us have gold or silver lying around the home that we either don’t use, don’t want, or simply can’t use because the jewellery is broken. Attica gold company provides cash for gold. We value your gold, quote you a price, and pay you that precise amount of cash.
            </Text>

            <Text style={styles.subHeading}>How To Find The Right Gold Buyer For Cash?</Text>
            <Text style={styles.content}>
                The very first thing you need to do when you decide to sell your gold for cash is to find the right cash for gold service for you. Given that there are so many of these companies available these days, you’re going to find rather large differences in the amounts of cash that they will offer you for a specific amount of gold. You obviously want the best deal for your gold, and hence, spending some time checking out different companies can allow you to get the most money.
            </Text>
            <Text style={styles.content}>
                Attica gold company is the best gold buying company in India. We provide you instant cash for your gold or silver jewellery. If you have urgent financial needs, cash for gold is a better solution. Even though your gold is broken, you can still exchange it for cash. Instead of letting it be covered with dust in your jewelry box, sell it to get the best value you need. With cash for gold, you can even sell gold coins, Gold Jewelry, Silver, and Diamonds. Cash for gold is hassle-free.
            </Text>

            <Text style={styles.subHeading}>How to Sell Gold Jewelry?</Text>
            <Text style={styles.content}>
                To sell gold, a jewelry buyer will estimate your gold. They’re sure to exchange your adornments, so within the event that you simply have an honest piece that will have included an incentive for its appearance then you’ll believe in utilizing Jewelry buyers. In any event, you’ll believe utilizing a goldsmith to urge an examination of your gold pieces. To sell gold, visit nearby Attica Gold Company to get a careful incentive for your gold by checking the purity of gold with a German-made purity checking machine and obtain Instant cash for gold @ online price.
            </Text>
        </ScrollView>
    );
};

export default SellGold;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    backgroundImage: {
        marginTop:40,
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#d4af37',
        textAlign: 'center',
        marginVertical: 20,
    },
    subHeading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginVertical: 10,
    },
    content: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 15,
    },
});
