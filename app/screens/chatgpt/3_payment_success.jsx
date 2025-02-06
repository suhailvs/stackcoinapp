
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Icon for success

const PaymentSuccessScreen = ({ navigation }) => {

  // Animation values for fading in and scaling the icon
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // For scaling the icon

  // Use useEffect to trigger the animations when the screen loads
  useEffect(() => {
    Animated.loop(
    Animated.sequence([
      // Fade-In
      Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
      ]),
      Animated.parallel([
       // Fade-Out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
    ]),
      
    ])
  ).start();
  }, [fadeAnim, scaleAnim]);
  return (
    <View style={styles.container}>
      {/* Animated success icon */}
      <Animated.View style={[styles.iconContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <MaterialIcons name="check-circle" size={100} color="#fff" />
      </Animated.View>

      {/* Animated success message */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Payment Successful!
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Thank you for using Amazon Pay.
      </Animated.Text>

      {/* Back to Home Button */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9900", // Amazon Pay Yellow
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#222",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#000", // Amazon Pay Black
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
  },
});

