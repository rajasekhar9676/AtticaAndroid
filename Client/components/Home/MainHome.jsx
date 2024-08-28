import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Pressable,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { BASE_URL } from "../../constants";

const Home = ({ navigation }) => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [autoDetectModalVisible, setAutoDetectModalVisible] = useState(false);
  const [manualLocationModalVisible, setManualLocationModalVisible] =
    useState(false);
  const [currentLocation, setCurrentLocation] = useState("Your location");
  const [manualLocation, setManualLocation] = useState("");
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const screenWidth = Dimensions.get("window").width;

  const storeLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      await AsyncStorage.setItem(
        "latitude",
        location.coords.latitude.toString()
      );
      await AsyncStorage.setItem(
        "longitude",
        location.coords.longitude.toString()
      );
    } catch (error) {
      Alert.alert("Error", "Failed to store location");
    }
  };

  const updateLocation = (location) => {
    setLocation(location);
  };

  const autoDetectLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const formattedAddress = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
        updateLocation({ latitude, longitude });
        setCurrentLocation(formattedAddress);
      } else {
        Alert.alert("No address found", "Unable to detect your location address.");
      }
    } catch (error) {
      console.error("Error detecting location: ", error.message);
      Alert.alert("Unable to detect your location. Please try again.");
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      const API_KEY = "RLHKKFP2EG5HR2J0";
      const goldUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GCUSD&interval=1min&apikey=${API_KEY}`;

      try {
        const goldResponse = await axios.get(goldUrl);
        const goldData = goldResponse.data["Time Series (1min)"];
        const latestGoldKey = Object.keys(goldData)[0];
        setGoldPrice(goldData[latestGoldKey]["1. open"]);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchPrices();
  }, []);

  const images = [
    require("../../assets/images/slider1.png"),
    require("../../assets/images/slider2.png"),
    require("../../assets/images/slider3.png"),
    require("../../assets/images/slider4.png"),
    require("../../assets/images/slider4.png"),
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/products/getproducts`);
        if (Array.isArray(response.data)) {
          const uniqueCategories = {};
          response.data.forEach((item) => {
            if (item.category) {
              if (!uniqueCategories[item.category]) {
                uniqueCategories[item.category] = item;
              }
            }
          });
          setCategories(Object.values(uniqueCategories));
        } else {
          Alert.alert("Error", "Unexpected data format received.");
        }
      } catch (error) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to fetch categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate("CategoryPage", { category });
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    scrollViewRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    scrollViewRef.current.scrollTo({ x: prevIndex * screenWidth, animated: true });
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Automatically scroll every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleAutoDetectLocation = () => {
    setModalVisible(false);
    setAutoDetectModalVisible(true);
    setCurrentLocation("Location changed successfully");
  };

  const handleManualLocation = () => {
    setModalVisible(false);
    setManualLocationModalVisible(true);
  };

  const handleConfirmManualLocation = () => {
    setCurrentLocation(manualLocation);
    setManualLocation("");
    setManualLocationModalVisible(false);
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategoryPress(item.category)}
      >
        <Image
          source={{
            uri: item.image
              ? item.image.startsWith("http")
                ? item.image
                : `${BASE_URL}/uploads/${item.image}`
              : null,
          }}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.categoryPrice}>Starts at ₹{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <FontAwesome6 name="bars" size={24} color="white" />
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <AntDesign name="shoppingcart" size={24} color="white" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollableContent}>
        {/* Fixed Location and Rate */}
        <View style={styles.locationRateContainer}>
          <TouchableOpacity
            style={styles.rateSection}
            onPress={() => navigation.navigate("GoldLive")}
          >
            <Text style={styles.rateText}>See Live Gold Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.locationSection}
            onPress={() => setModalVisible(true)}
          >
            <EvilIcons name="location" size={24} color="#8d181a" />
            <Text style={styles.locationText}><strong>You are in </strong> <br></br>{currentLocation}</Text>
          </TouchableOpacity>
        </View>

        {/* Sliding Content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const contentOffsetX = e.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffsetX / screenWidth);
            setCurrentIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.sliderImage} />
          ))}
        </ScrollView>

        {/* Arrows for slider */}
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
            <AntDesign name="leftcircleo" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
            <AntDesign name="rightcircleo" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* About the Company */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About Attica Gold Company</Text>
          <Text style={styles.aboutText}>
            Attica Gold Company is the pioneer and the 1st to introduce the concept of gold
            buying across the country.
          </Text>
        </View>

        {/* ATTICA ASSURE */}
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcecd4' }}>
          <View>
            <Text style={{ fontSize: 15, color: "#8d181a", marginVertical: 5, marginTop: 10,}}>ATTICA</Text>
          </View>
          <View>
            <Text style={{ fontSize: 25, color: "black", marginBottom: 20, letterSpacing:5, }}>ASSURE</Text>
          </View>
          <View style={styles.assureContainer}>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/guaranteed.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Guaranteed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/softwareverification.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Software Verification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/anyaliticaltesting.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Best Analytical Testing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/banktransfer.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Instant Bank Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assureButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Image source={require('../../assets/images/certified.png')} style={styles.getloan} />
              <Text style={styles.buttonText}>Tested & Certified</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Loan Services */}
        <View style={styles.loanServicesContainer}>
          <Text style={styles.loanTitle}>Loan Services</Text>
          <View style={styles.loanButtonsContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => navigation.navigate('GoldLoan')}>
              <Text style={styles.buttonText}>Get gold loan at lowest interest rates</Text>
              <Text style={{textDecorationLine:'underline', color:'#8d181a', marginHorizontal:8, marginVertical:10,}}>Get Started</Text>
              <Image source={require('../../assets/images/getloan.png')} style={styles.loan} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('GoldLoan')}>
              <Text style={styles.buttonText}>Sell your gold at the best possible price</Text>
              <Text style={{textDecorationLine:'underline', color:'#8d181a', marginHorizontal:8, marginVertical:10,}}>Get Started</Text>
              <Image source={require('../../assets/images/sellgold.png')} style={styles.loan} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Products List */}
        <View style={styles.productsContainer}>
          <Text style={styles.productsTitle}>Our Products</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#8d181a" />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item._id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Modal for Location Selection */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Choose Location</Text>
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={handleAutoDetectLocation}
            >
              <Text style={styles.modalOptionText}>Auto Detect Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={autoDetectLocation}
            >
              <Text style={styles.modalOptionText}>Enter Manually</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Auto Detect Modal */}
      <Modal
        visible={autoDetectModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAutoDetectModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setAutoDetectModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Auto Detect Location</Text>
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={autoDetectLocation}
            >
              <Text style={styles.modalOptionText}>Detect Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Manual Location Modal */}
      <Modal
        visible={manualLocationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setManualLocationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setManualLocationModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Enter Your Location</Text>
            <TextInput
              style={styles.modalInput}
              value={manualLocation}
              onChangeText={setManualLocation}
              placeholder="Enter location"
            />
            <TouchableOpacity
              style={styles.modalOptionButton}
              onPress={handleConfirmManualLocation}
            >
              <Text style={styles.modalOptionText}>Confirm Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#8d181a",
  },
  logo: {
    width: 100,
    height: 30,
  },
  scrollableContent: {
    paddingBottom: 20,
  },
  locationRateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f3f3f3",
  },
  rateSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rateText: {
    color: "#8d181a",
    fontWeight: "bold",
  },
  locationText: {
    marginLeft: 5,
    color: "#8d181a",
  },
  sliderImage: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: 10,
    zIndex: 1,
    backgroundColor:'#8d181a', 
    borderRadius:'100%', 
    borderWidth:1, 
    padding:5,
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: 10,
    zIndex: 1,
    backgroundColor:'#8d181a', 
    borderRadius:'100%', 
    borderWidth:1, 
    padding:5,
  },
  aboutContainer: {
    padding: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: "#555",
  },
  atticaAssureContainer: {
    backgroundColor: "#f3f3f3",
    padding: 20,
  },
  assureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  assureFeatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 5,
    color: "#8d181a",
  },
  loanServicesContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  loanTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loanButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loanButton: {
    padding: 10,
    backgroundColor: "#8d181a",
    borderRadius: 5,
  },
  loanButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  productsContainer: {
    padding: 20,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    marginRight: 10,
  },
  categoryItem: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 100,
  },
  categoryName: {
    marginTop: 5,
    fontWeight: "bold",
  },
  categoryPrice: {
    color: "#8d181a",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalCloseText: {
    fontSize: 18,
    color: "black",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOptionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#8d181a",
    borderRadius: 5,
    width: "100%",
  },
  modalOptionText: {
    color: "#ffffff",
    textAlign: "center",
  },
  modalInput: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
