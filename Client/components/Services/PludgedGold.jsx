import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import React from 'react';

const SellGold = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <ImageBackground source={require('../../assets/images/pludgedland.png')}
                    style={styles.backgroundImage}>
                    <Text style={styles.heading}>Pledged Gold Jewellery</Text>
                </ImageBackground>
            </View>
            <Text style={styles.subHeading}>Can Help You Release pledged gold</Text>
            <Text style={styles.content}>
                Release pledged gold @ Today’s Online price
                Attica will give cash to pre-close your pledged gold loan
                We visit the location with customers, pay the required amount to release pledged gold
                After checking the purity of pledged gold at our office, Attica will buy back the gold jewellery and pay you the balance amount after deducting the amount paid for releasing gold.
                Releasing pledged gold from Banks, Financiers, and Pawn brokers, The benefit of releasing pledged gold and selling to receive enough cash amount before it gets delayed and your interest rates start to touch the skies. Customers can visit any of our below-listed branches.

                release-pledged-gold
                Attica will provide cash to advance your secured gold loan. We go to the place with our customers and pay the required amount to get the pledged gold released. We confirm the purity of the gold once it has been released and pay the release fee.
                The benefit of releasing pledged gold and selling it is that you can collect enough cash before it is delayed and the interest rate rises. Customers can claim their promised gold by visiting Attica Gold Company branches.


            </Text>

            <Text style={styles.subHeading}>Your Pledged Gold Jewellery</Text>
            <Text style={styles.content}>
                It’s a common practice in India where people pledge gold and silver jewellery to the banks, pawn shops, or financiers to arrange the funds for setting up a new business, a fund for arranging urgent medical bills because its a simple and fast process to get the loan on gold without much documentation. It may be a good idea to pledge the gold and take a small loan against jewellery but not a wise deal to take a big loan against gold.

                Maximum times people failed to release their pledged gold because of high-interest rates and are bound to pay unnecessary interest rates which sometimes cross the double gold price.

                Attica Gold helps the customer to release their gold loan and other jewellery from banks, pawn shops, and financiers and buy back the gold at the best price than anyone else.

                At  Attica Gold Company, we release and buy gold jewellery so that our valued customers can offset the immediate monetary value of unused/worn/damaged gold jewellery by selling them at the greatest market price. Customers may sell any amount of old, used, or damaged gold, silver, or other jewellery to us. If you have any kind of silver or gold jewelry for sale, you can visit one of our nearest branches throughout Karnataka, Tamil Nadu, Andhra Pradesh, Telangana & Pondicherry.
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
        marginTop: 40,
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
