import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const CustomerCare = () => {
  const [weight, setWeight] = useState('');
  const [goldType, setGoldType] = useState('');
  const [image, setImage] = useState(null);

  // Function to handle image picking from the gallery
  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  // Function to handle taking a picture from the camera
  const handleTakePicture = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Care Form</Text>

      {/* Gold Weight Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Gold Weight in grams"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      {/* Gold Type Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={goldType}
          onValueChange={(itemValue) => setGoldType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gold Type" value="" />
          <Picker.Item label="Gold Coins" value="coins" />
          <Picker.Item label="Gold Jewelry" value="jewelry" />
          <Picker.Item label="Gold Bars" value="bars" />
        </Picker>
      </View>

      {/* Display selected image */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No image selected</Text>
      )}

      {/* Image Picker Buttons */}
      <View style={styles.imageButtonsContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Upload from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={handleTakePicture}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Call Buttons */}
      <View style={styles.callButtonsContainer}>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Normal Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Video Call</Text>
        </TouchableOpacity>
      </View>

      {/* Connect to Agent Button */}
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect to Agent</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  noImageText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#999',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  callButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  callButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  connectButton: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center', 
    width: '80%',
  },
  connectButtonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomerCare;
