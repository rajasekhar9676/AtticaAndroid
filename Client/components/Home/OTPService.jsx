import React, { useState } from 'react';
import './OTPService.css';
import axios from 'axios';
import { BASE_URL } from '../../constants';

function OTPService() {
    const [formData, setFormData] = useState({
        username: '',
        address: '',
        phoneNumber: '',
        otp: ''
    });
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSendOTP = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/send-otp`, { phoneNumber: formData.phoneNumber }); 
            if (response.data.success) {
                setOtpSent(true);
                setMessage('OTP sent successfully!');
            }
        } catch (error) {
            console.error(error); // Log the full error for debugging
            const errorMessage = error.response?.data?.message || 'Failed to send OTP: An unknown error occurred';
            setMessage(errorMessage);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/verify-otp`, {
                phoneNumber: formData.phoneNumber,
                otp: formData.otp,
            });
            if (response.data.success) {
                setMessage('OTP verified successfully!');
                // Proceed with your next steps here
            }
        } catch (error) {
            console.error(error); // Log the full error for debugging
            const errorMessage = error.response?.data?.message || 'Failed to verify OTP: An unknown error occurred';
            setMessage(errorMessage);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otpSent) {
            handleSendOTP();
        } else {
            handleVerifyOTP(e);
        }
    };

    return (
        <div className="container">
            <h2>Please fill the below required fields to check the Gold Rates</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                {otpSent && (
                    <label>
                        OTP:
                        <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}
                <button type="submit">{otpSent ? 'Verify OTP' : 'Send OTP'}</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default OTPService;
