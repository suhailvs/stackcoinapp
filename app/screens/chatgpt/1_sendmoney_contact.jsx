import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const SendMoneyScreen = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleSendMoney = () => {
    if (!recipient || !amount) {
      Alert.alert("Error", "Please enter recipient and amount.");
      return;
    }
    Alert.alert("Success", `Sent $${amount} to ${recipient} via ${paymentMethod.toUpperCase()}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      

      {/* Recipient Input */}
      <View style={styles.inputContainer}>
        <Icon name="account" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Enter Phone / Email / UPI ID"
          value={recipient}
          onChangeText={setRecipient}
        />
      </View>

      {/* Amount Input */}
      <View style={styles.inputContainer}>
        <Icon name="currency-usd" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      

      {/* Send Money Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMoney}>
        <Text style={styles.sendButtonText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  header: { padding: 20, alignItems: "center", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerText: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, marginTop: 10 },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  radioContainer: { backgroundColor: "#fff", padding: 15, borderRadius: 8, marginTop: 10 },
  radioOption: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  radioText: { fontSize: 16, marginLeft: 10 },
  sendButton: { backgroundColor: "#FF9900", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  sendButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default SendMoneyScreen;