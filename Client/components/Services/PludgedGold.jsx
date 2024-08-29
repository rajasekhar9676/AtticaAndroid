import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import React from 'react';

const SellGold = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground source={require('../../assets/images/pludgedland.png')}
                    style={styles.backgroundImage}>
                    <Text style={styles.heading}>Pledged Gold Jewellery</Text>
                </ImageBackground>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeading}>Can Help You Release Pledged Gold</Text>
                <Text style={styles.content}>
                    Release pledged gold @ Today’s Online price. Attica will give cash to pre-close your pledged gold loan. 
                    We visit the location with customers, pay the required amount to release pledged gold. After checking the 
                    purity of pledged gold at our office, Attica will buy back the gold jewellery and pay you the balance 
                    amount after deducting the amount paid for releasing gold. Releasing pledged gold from Banks, Financiers, 
                    and Pawn brokers offers the benefit of obtaining enough cash amount before it gets delayed and your interest 
                    rates start to rise. Customers can visit any of our listed branches to take advantage of this service.
                </Text>
                <Text style={styles.importantNote}>
                    At Attica Gold, we provide cash to release your pledged gold loan. Our team visits the location with customers 
                    and pays the required amount to release the pledged gold. We confirm the purity of the gold once released and 
                    pay the release fee. This service allows you to collect enough cash before the delay causes your interest rates to rise.
                </Text>
            </View>

            <View style={[styles.section, styles.lightSection]}>
                <Text style={styles.subHeading}>Your Pledged Gold Jewellery</Text>
                <Text style={styles.content}>
                    It’s common in India for people to pledge gold and silver jewellery to banks, pawn shops, or financiers to secure 
                    funds for various needs, such as setting up a new business or urgent medical expenses. However, taking a large loan 
                    against jewellery may not be wise due to high-interest rates, which can often double the original gold price.
                </Text>
                <Text style={styles.content}>
                    Attica Gold helps customers release their gold loans from banks, pawn shops, and financiers and buys back the gold 
                    at the best price. At Attica Gold Company, we release and buy gold jewellery to provide immediate monetary value 
                    for unused or damaged gold jewellery by selling it at the best market price. We accept any amount of old, used, or 
                    damaged gold, silver, or other jewellery. If you have any silver or gold jewellery for sale, visit our nearest branches 
                    in Karnataka, Tamil Nadu, Andhra Pradesh, Telangana & Pondicherry.
                </Text>
            </View>

          
        </ScrollView>
    );
};

export default SellGold;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    imageContainer: {
        height: 250,
        overflow: 'hidden',
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d4af37',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
    },
    section: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    lightSection: {
        backgroundColor: '#f0e7d8',
    },
    darkSection: {
        backgroundColor: '#d4af37',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
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
    importantNote: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff3cd',
        borderRadius: 8,
    },
    listItem: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        paddingVertical: 5,
        marginBottom: 10,
        backgroundColor: '#f7f2e7',
        padding: 10,
        borderRadius: 5,
    },
});
