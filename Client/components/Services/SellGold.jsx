import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';

const SellGold = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground source={require('../../assets/images/sellgoldland.png')}
                    style={styles.backgroundImage}>
                    <Text style={styles.heading}>Cash For Gold</Text>
                </ImageBackground>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeading}>Cash Your Gold</Text>
                <Text style={styles.content}>
                    Cash for gold jewellery is an easy way to get extra money. Prices for gold have reached high within the last year due to a number of reasons, but what this has meant is people now have quick and easy access to money, fast. Nearly all of us have gold or silver lying around the home that we either don’t use, don’t want, or simply can’t use because the jewellery is broken. Attica gold company provides cash for gold. We value your gold, quote you a price, and pay you that precise amount of cash.
                </Text>
            </View>

            <View style={[styles.section, styles.lightSection]}>
                <Text style={styles.subHeading}>How To Find The Right Gold Buyer For Cash?</Text>
                <Text style={styles.content}>
                    The very first thing you need to do when you decide to sell your gold for cash is to find the right cash for gold service for you. Given that there are so many of these companies available these days, you’re going to find rather large differences in the amounts of cash that they will offer you for a specific amount of gold. You obviously want the best deal for your gold, and hence, spending some time checking out different companies can allow you to get the most money.
                </Text>
                <Text style={styles.content}>
                    Attica gold company is the best gold buying company in India. We provide you instant cash for your gold or silver jewellery. If you have urgent financial needs, cash for gold is a better solution. Even though your gold is broken, you can still exchange it for cash. Instead of letting it be covered with dust in your jewelry box, sell it to get the best value you need. With cash for gold, you can even sell gold coins, Gold Jewelry, Silver, and Diamonds. Cash for gold is hassle-free.
                </Text>
            </View>

            <View style={[styles.section, styles.darkSection]}>
                <Text style={styles.subHeading}>How to Sell Gold Jewelry?</Text>
                <Text style={styles.content}>
                    To sell gold, a jewelry buyer will estimate your gold. They’re sure to exchange your adornments, so within the event that you simply have an honest piece that will have included an incentive for its appearance then you’ll believe in utilizing Jewelry buyers. In any event, you’ll believe utilizing a goldsmith to get an examination of your gold pieces. To sell gold, visit nearby Attica Gold Company to get a careful incentive for your gold by checking the purity of gold with a German-made purity checking machine and obtain Instant cash for gold @ online price.
                </Text>
                <Text style={styles.importantNote}>
                    VISIT OUR NEARBY BRANCHES TO UNDERSTAND FEASIBILITY{'\n'}
                    Call us now and our Customer Support Executive will help you in fixing your doubts. We are available 24/7 to help you.
                </Text>
                <Text style={styles.highlight}>GET SPOT CASH</Text>
                <Text onPress={() => navigation.navigate('ViewAllBranches')} style={styles.actionText}>View All Branches</Text>

                {/* Connect to Customer Care Button */}
                <TouchableOpacity 
                    onPress={() => navigation.navigate('CustomerCare')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Connect to Customer Care</Text>
                </TouchableOpacity>
            </View>

            {/* Added Gold Purity and Weighing Section */}
            <View style={[styles.section, styles.lightSection]}>
                <Text style={styles.subHeading}>Gold Purity and Weighing</Text>
                <Text style={styles.content}>
                    The next step in the process of evaluating the gold is through XRF technology with a German-made machine to check the gold purity. We ensure to offer the best value every time. At Attica Gold, we believe in complete transparency, so we check the purity and weight of gold jewellery right in front of the customer. Our German-made purity checking machine gives an accurate reading of your gold’s purity.
                </Text>
                <Text style={styles.content}>
                    Attica Gold does not melt or break any gold or silver items to check the purity of ornaments. After checking the purity and weighing the gold jewellery, we inform the customers about the final amount of their jewels after deducting our 3% Attica Gold fee to complete the process. If the customer is happy with the amount, we pay spot cash for the jewels instantly; otherwise, we return the gold without melting and damaging.
                </Text>
            </View>

            {/* Added Eligibility and Payment Section */}
            <View style={[styles.section, styles.lightSection]}>
                <Text style={styles.subHeading}>Eligibility & Payments</Text>
                <Text style={styles.content}>
                    Be prepared with the following documents when selling your gold:
                </Text>
                <Text style={styles.list}>
                    • Original ID proof and photocopy{'\n'}
                    • Original address/residence proof and photocopy{'\n'}
                    • One passport size photo{'\n'}
                    • Seller: (Any Two Documents) Like PAN, Aadhar, Voters ID, Work ID, Passport, Drivers license, Telephone bill, Electricity bill, Gas connection bill, Rental agreement.{'\n'}
                    • NRI & PIO: Passport, PAN, Current Address in India.{'\n'}
                    • Foreigner Seller: Passport, Visa, Present Indian Address.
                </Text>
                <Text style={styles.content}>
                    Only individuals aged 18 years or older are allowed to transact. If you are under 22 years old, you must have written permission from your family. You are not allowed to sell articles belonging to your friends, relatives, colleagues, or any other persons. You may sell articles inherited or purchased by you or if they belong to your spouse, but with their consent.
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
        marginVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
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
        color: '#fff',
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
    highlight: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d4af37',
        textAlign: 'center',
        marginVertical: 10,
    },
    actionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    list: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 15,
        paddingLeft: 15,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});
