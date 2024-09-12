import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

const GetHelpScreen = () => {
  const [category, setCategory] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility

  const handleSubmit = () => {
    // Show the modal when the submit button is clicked
    setModalVisible(true);
  };

  const handleConfirm = () => {
    // Logic for confirming action
    setModalVisible(false);
    // Perform your submit action here
    alert('Form submitted successfully!');
  };

  const handleCancel = () => {
    // Close the modal without taking any action
    setModalVisible(false);
  };

  return (
    <ImageBackground 
    // source={require('../../assets/images/back6.png')} 
    style={styles.backgroundImage}>
      {/* MainHeader */}
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Text style={styles.heading}>Get Help</Text>
        <FontAwesome5 name="bell" size={24} color="white" />
      </Animatable.View>

      {/* Form Section */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Input fields and other form components */}
        <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#555" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#555" value={lastName} onChangeText={setLastName} />
        <View style={styles.inputRow}>
          {/* <Text style={styles.flag}>🇮🇳</Text> */}
          <TextInput style={[styles.input, styles.mobileInput]} placeholder="Mobile Number" placeholderTextColor="#555" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
        </View>
        <TextInput style={styles.input} placeholder="Email ID" placeholderTextColor="#555" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Your Location" placeholderTextColor="#555" value={location} onChangeText={setLocation} />
        <View style={styles.pickerContainer}>
          <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} style={styles.picker}>
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Gold Purchase Plan" value="gold_purchase_plan" />
            <Picker.Item label="Registration/Login" value="registration_login" />
            <Picker.Item label="User Interface" value="user_interface" />
            <Picker.Item label="Others" value="others" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.uploadArea}>
          <MaterialIcons name="camera-alt" size={40} color="#555" />
          <Text style={styles.uploadText}>Upload Screenshot</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.modalTitle}>Confirm Submission</Text> */}
            <Text style={styles.modalText}>I agree to receive relevant info by telephone or by electronic communication. Personal information which i have provided will strictly be used for internal purpose only.</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={handleConfirm}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default GetHelpScreen;

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
    fontSize: 25,
  },
  formContainer: {
    padding: 20,
    paddingTop: 80,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  mobileInput: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    borderStyle: 'dotted',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadText: {
    color: '#555',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  modalConfirmButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
