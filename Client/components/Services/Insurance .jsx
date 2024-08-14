import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const InsurancePage = () => {
    const [insuranceOptions, setInsuranceOptions] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [purchase, setPurchase] = useState([]); // State to hold purchased policies

    useEffect(() => {
        // Fetch insurance options
        axios.get('http://<backend-url>/insurance/options')
            .then(response => setInsuranceOptions(response.data))
            .catch(error => console.error('Error fetching insurance options:', error));

        // Fetch user policies
        axios.get('http://<backend-url>/insurance/policies', { params: { userId: 'USER_ID' } })
            .then(response => setPolicies(response.data))
            .catch(error => console.error('Error fetching user policies:', error));
    }, []);

    const purchasePolicy = (scheme) => {
        axios.post('http://<backend-url>/insurance/purchase', { userId: 'USER_ID', ...scheme })
            .then(response => {
                console.log('Purchase response:', response.data);  // Log the API response
                setPurchase([...purchase, response.data.policy]); // Add the new purchase to the purchase state
            })
            .catch(error => console.error('Error purchasing policy:', error));
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Available Insurance Schemes</Text>
            <FlatList
                data={insuranceOptions}
                renderItem={({ item }) => (
                    <View>
                        <Text>Scheme Name: {item.schemeName}</Text>
                        <Text>Coverage: {item.coverageAmount}</Text>
                        <Text>Premium: {item.premium}</Text>
                        <Button title="Purchase" onPress={() => purchasePolicy(item)} />
                    </View>
                )}
                keyExtractor={item => item.schemeName}
            />

            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Your Policies</Text>
            <FlatList
                data={policies}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Text>Scheme Name: {item.schemeName}</Text>
                        <Text>Coverage: {item.coverageAmount}</Text>
                        <Text>Premium: {item.premium}</Text>
                        <Text>Status: {item.status}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
            />

            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>Purchased Policies</Text>
            <FlatList
                data={purchase}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Text>Scheme Name: {item.schemeName}</Text>
                        <Text>Coverage: {item.coverageAmount}</Text>
                        <Text>Premium: {item.premium}</Text>
                        <Text>Status: {item.status}</Text>
                        <Text>End Date: {new Date(item.endDate).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

export default InsurancePage;
