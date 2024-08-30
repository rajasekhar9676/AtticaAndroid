import React ,{useState,useEffect,useRef}from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Modal, Pressable, TextInput, Alert, FlatList, ActivityIndicator,ImageBackground ,Button} from 'react-native';
import * as Location from 'expo-location';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const UserLocation = () => {
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [autoDetectModalVisible, setAutoDetectModalVisible] = useState(false);
  const [manualLocationModalVisible, setManualLocationModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Your location');
  const [manualLocation, setManualLocation] = useState('');
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [location, setLocation] = useState({})
  const screenWidth = Dimensions.get('window').width;
  const [isLoading,setIsLoading]=useState('')
  // const { isAuthenticated } = useAuth();


  useEffect(() => {
    (async () => {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setHasPermission(false);
        return;
      }

      setHasPermission(true); 

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Optionally, use reverse geocoding to convert coordinates to a location name
      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

      setLocation(`${address.city}, ${address.region}`);
    })();
  }, []);


  const updateLocation = (location) => {
    setLocation(location);
    // Optionally, perform additional actions with the location data
  };
  const autoDetectLocation = async () => {
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }
      
      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
  
      // Perform reverse geocoding to get the address
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
  
      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0]; // Get the first result
        const formattedAddress = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
  
        // Update location with latitude and longitude
        updateLocation({ latitude, longitude });
  
        // Update the state with the formatted address
        setCurrentLocation(formattedAddress);
      } else {
        Alert.alert('No address found', 'Unable to detect your location address.');
      }
    } catch (error) {
      console.error("Error detecting location: ", error.message);
      Alert.alert("Unable to detect your location. Please try again.");
    }
  };

  const handleManualLocation = () => {
    setModalVisible(false);
    setManualLocationModalVisible(true);
  };

  const handleConfirmManualLocation = () => {
    setCurrentLocation(manualLocation);
    setManualLocation('');
    setManualLocationModalVisible(false);
  };

  return (
   
      <ImageBackground
      source={require('../../assets/images/back6.png')}
      style={styles.backgroundImage}
    >
   <View style={{ padding: 20 }}>
      {hasPermission === false ? (
        <Text>Location permission not granted</Text>
      ) : (
        <>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={{ marginBottom: 20, borderBottomWidth: 1 }}
          />
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={{ marginBottom: 20, borderBottomWidth: 1 }}
          />

<TouchableOpacity style={styles.locationSection} onPress={() => setModalVisible(true)}>
          <EvilIcons name="location" size={24} color="#8d181a" />
          <Text style={styles.locationText}><Text style={{ fontWeight: 'bold' }}>Location </Text></Text>
        </TouchableOpacity>
          <Button title="Submit" onPress={() => {/* Handle submit */}} />

          <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(!modalVisible)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Location</Text>
      <TouchableOpacity onPress={autoDetectLocation} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Auto-detect Location</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleManualLocation} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Select Location Manually</Text>
      </TouchableOpacity>
      <Pressable onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
        <AntDesign name="closecircleo" size={24} color="black" />
      </Pressable>
    </View>
  </View>
</Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={autoDetectModalVisible}
        onRequestClose={() => setAutoDetectModalVisible(!autoDetectModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Auto-detect Location</Text>
            <Text style={styles.modalText}>{currentLocation}</Text>
            <Pressable onPress={() => setAutoDetectModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>


      {/* Location Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={manualLocationModalVisible}
        onRequestClose={() => setManualLocationModalVisible(!manualLocationModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.modalTitle}>Enter Location</Text>
            <TextInput
              value={manualLocation}
              onChangeText={setManualLocation}
              style={styles.input}
              placeholder="Enter location"
            /> */}
             <Text style={styles.modalTitle}>Enter Location</Text>
                <TextInput
              value={manualLocation}
              onChangeText={setManualLocation}
              style={styles.input}
              placeholder="Enter location"
            />
            {/* <TouchableOpacity onPress={handleConfirmManualLocation} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setManualLocationModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable> */}
            
            <TouchableOpacity onPress={handleConfirmManualLocation} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Confirm</Text>
          </TouchableOpacity>
          <Pressable onPress={() => setManualLocationModalVisible(false)} style={styles.modalCloseButton}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </Pressable>
          </View>
        </View>
      </Modal>
        </>

        
      )}
    </View>

    </ImageBackground>
  
  )
}

export default UserLocation

const styles = StyleSheet.create({
  backgroundImage: {
    marginTop:40,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#8d181a',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    padding: 10,
    marginVertical: 10,
  },
});
