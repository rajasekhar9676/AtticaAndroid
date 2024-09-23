import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../constants';

function OTPService() {
  const [formData, setFormData] = useState({
    username: '',
    address: '',
    phoneNumber: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/send-otp`, {
        phoneNumber: formData.phoneNumber,
      });
      if (response.data.success) {
        setOtpSent(true);
        setMessage('OTP sent successfully!');
      }
    } catch (error) {
      setMessage('Error sending OTP.');
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, {
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
      });
      if (response.data.success) {
        setMessage('OTP verified successfully!');
      } else {
        setMessage('Incorrect OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Error verifying OTP.');
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Please fill the below required fields to check the Gold Rates</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(value) => handleChange('address', value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(value) => handleChange('phoneNumber', value)}
        keyboardType="phone-pad"
        required
      />
      {otpSent && (
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={formData.otp}
          onChangeText={(value) => handleChange('otp', value)}
          required
        />
      )}
      <Button
        title={otpSent ? 'Verify OTP' : 'Send OTP'}
        onPress={otpSent ? handleVerifyOtp : handleSendOtp}
      />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default OTPService;
