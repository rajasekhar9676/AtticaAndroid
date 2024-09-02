import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Animated, Easing, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { firebaseConfig } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const recaptchaVerifier = useRef(null);
  const [screenState, setScreenState] = useState("phone");
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const validatePhoneNumber = () => {
    let argPhone = phone.trim();
    if (!argPhone.startsWith("+91")) {
      if (argPhone.length === 10) {
        argPhone = "+91" + argPhone;
      } else {
        throw new Error("Please enter a valid 10-digit phone number.");
      }
    }
    if (argPhone.length !== 13) {
      throw new Error("Please enter a valid phone number with country code.");
    }
    return argPhone;
  };

  const signInUser = async () => {
    try {
      setActivityIndicator(true);
      const argPhone = validatePhoneNumber();
      const phoneProvider = new PhoneAuthProvider(auth);
      const localVerificationId = await phoneProvider.verifyPhoneNumber(
        argPhone,
        recaptchaVerifier.current
      );
      setVerificationId(localVerificationId);
      setActivityIndicator(false);
      setScreenState("OTP");
    } catch (error) {
      console.log(error);
      setActivityIndicator(false);
      alert(error.message || "Please enter a valid number and try again!");
    }
  };

  const verifyOTP = async () => {
    try {
      setActivityIndicator(true);
      const credentials = PhoneAuthProvider.credential(verificationId, OTP);
      await signInWithCredential(auth, credentials);
      setActivityIndicator(false);
      setScreenState("Authenticated");
      navigation.navigate('(tabs)');
    } catch (error) {
      console.log(error);
      setActivityIndicator(false);
      alert("Please check OTP and try again!");
    }
  };

  if (screenState === "OTP") {
    return (
      <View style={styles.container}>
        <Text style={styles.OTPtextStyle}>
          Verification code has been sent to{" "}
          <Text style={[styles.OTPtextStyle, { color: "blue" }]}>
            {phone}
          </Text>
        </Text>
        <Input
          label="Verification Code"
          leftIcon={
            <Entypo
              name="lock"
              size={22}
              color="black"
              style={styles.iconStyle}
            />
          }
          keyboardType="numeric"
          placeholder="OTP"
          value={OTP}
          onChangeText={(otp) => setOTP(otp)}
        />
        {activityIndicator && <ActivityIndicator size="large" />}
        <Button
          title="Submit"
          onPress={verifyOTP}
          buttonStyle={styles.buttonStyle}
          containerStyle={{ width: "70%", marginTop: 15 }}
        />
      </View>
    );
  } else if (screenState === "Authenticated") {
    return (
      <View style={styles.finalContainer}>
        <Text style={styles.welcomeTextStyle}>
          Welcome! You have been successfully logged in!
        </Text>
      </View>
    );
  } else {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Text style={styles.titleText}>Sign up to keep exploring the services!</Text>

        <Input
          label="Phone number"
          leftIcon={
            <Image
              source={require('../assets/images/flag.png')} // Indian flag icon
              style={styles.flagIcon}
            />
          }
          keyboardType="numeric"
          placeholder="+91xxxxxxxxxx"
          value={phone}
          onChangeText={(number) => setPhone(number)}
          containerStyle={styles.inputContainer}
        />
        {activityIndicator && <ActivityIndicator size="large" />}
        <Button
          title="Send OTP"
          onPress={signInUser}
          buttonStyle={styles.buttonStyle}
          containerStyle={{ width: "80%", marginTop: 20 }}
        />
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  finalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    color: "#333",
  },
  subtitleText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    // backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    height: 50,
    borderRadius: 25,
    // backgroundColor: "#ff4757",
    backgroundColor: '#007BFF',

    
  },
  iconStyle: {
    paddingEnd: 7,
    marginEnd: 3,
    borderRightWidth: 0.5,
    borderRightColor: "gray",
  },
  flagIcon: {
    width: 32,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  OTPtextStyle: {
    fontSize: 15,
    marginBottom: 25,
    fontWeight: "bold",
  },
  welcomeTextStyle: {
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1,
    fontWeight: "600",
    marginTop: 100,
  },
});

export default SignInScreen;
