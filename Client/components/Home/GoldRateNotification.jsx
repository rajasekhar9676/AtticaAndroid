import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, Picker } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AntDesign from '@expo/vector-icons/AntDesign';

const GoldRateNotification = ({ navigation }) => {
    const [selectedCountry, setSelectedCountry] = useState('US');
    const [alertFrequency, setAlertFrequency] = useState('daily');

    const goldRates = [
        { id: '1', type: '24K Gold', rate: '$1800/oz' },
        { id: '2', type: '22K Gold', rate: '$1650/oz' },
    ];

    return (
        <ImageBackground
            source={require('../../assets/images/back6.png')}
            style={styles.backgroundImage}
        >
            {/* MainHeader */}
            <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContainer}>
                <Pressable onPress={() => navigation.navigate('GoldLive')}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </Pressable>
                <Text style={styles.heading}>Gold Rate Notification Configuration</Text>
            </Animatable.View>

            {/* Country Selector */}
            <Animatable.View animation="fadeInUp" duration={1200} style={styles.selectorContainer}>
                <Text style={styles.sectionHeading}>Select Country</Text>
                <Picker
                    selectedValue={selectedCountry}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                >
                    <Picker.Item label="India" value="IN" />
                    <Picker.Item label="United States" value="US" />
                    <Picker.Item label="United Arab Emirates" value="AE" />
                    <Picker.Item label="Sultanate of Oman" value="SO" />
                    <Picker.Item label="Kingdom of Saudi Arabia" value="KA" />
                    <Picker.Item label="Qatar" value="QA" />
                    <Picker.Item label="Kuwait" value="KU" />
                    <Picker.Item label="Bahrain" value="BA" />
                    <Picker.Item label="Singapore" value="SI" />
                    <Picker.Item label="Malaysia" value="MA" />
                </Picker>
                <View style={styles.alertFrequencyContainer}>
                    <Text style={styles.settingText}>Alert Frequency:</Text>
                    <Picker
                        selectedValue={alertFrequency}
                        style={styles.picker}
                        onValueChange={(itemValue) => setAlertFrequency(itemValue)}
                    >
                        <Picker.Item label="Daily" value="daily" />
                        <Picker.Item label="Weekly" value="weekly" />
                        <Picker.Item label="Monthly" value="monthly" />
                    </Picker>
                </View>
            </Animatable.View>

            {/* Notification Settings */}
            <Animatable.View animation="fadeInUp" duration={1400} style={styles.settingsContainer}>
                <Text style={styles.sectionHeading}>Notification Settings</Text>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Alert when price drops below:</Text>
                    <Pressable style={styles.settingButton}>
                        <Text style={styles.settingButtonText}>Set Alert</Text>
                    </Pressable>
                </View>
            </Animatable.View>
        </ImageBackground>
    );
}

export default GoldRateNotification;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#8d181a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        zIndex: 1000,
    },
    heading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    selectorContainer: {
        marginTop: 140,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        marginHorizontal: 15,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 10,
    },
    settingsContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        marginHorizontal: 15,
    },
    settingItem: {
        marginBottom: 15,
    },
    settingText: {
        fontSize: 16,
    },
    settingButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#8d181a',
        borderRadius: 5,
        alignItems: 'center',
    },
    settingButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    alertFrequencyContainer: {
        marginTop: 20,
    },
});
