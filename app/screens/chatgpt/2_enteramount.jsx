import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EnterAmountScreen = () => { // { route, navigation }
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const contact = "John Doe (9876543210)"; // Default contact route.params?.contact || 
  const [modalVisible, setModalVisible] = useState(false);
  // const handleProceed = () => {
  //   if (!amount || parseFloat(amount) <= 0) {
  //     Alert.alert("Invalid Amount", "Please enter a valid amount.");
  //     return;
  //   }
  //   Alert.alert("Proceeding", `Sending $${amount} to ${contact}.\nMessage: ${message || "No message"}`);
  //   // navigation.navigate("PaymentMethodScreen", { amount, contact, message });
  // };

  const handleProceed = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setModalVisible(false);
      return;
    }
    setModalVisible(true); // Show the modal
  };
  return (
    <View style={styles.container}>
      {/* Header */}
     

      {/* Contact Info */}
      <View style={styles.contactContainer}>
        <Icon name="account-circle" size={50} color="#232F3E" />
        <View>
          <Text style={styles.contactName}>{contact}</Text>
          <Text style={styles.contactDetails}>Amazon Pay UPI</Text>
        </View>
      </View>

      {/* Amount Input */}
      <View style={styles.amountContainer}>
        <Text style={styles.currency}>$</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Message Input */}
      <View style={styles.messageContainer}>
        <Icon name="message-text-outline" size={20} color="#555" />
        <TextInput
          style={styles.messageInput}
          placeholder="Add a message (optional)"
          value={message}
          onChangeText={setMessage}
        />
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>

      {/* Custom Modal for Alert */}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={60} color="#FF9900" />
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalText}>Send **${amount}** to {contact}?</Text>
            {message ? <Text style={styles.modalMessage}>"{message}"</Text> : null}

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={() => { setModalVisible(false); alert("Payment Sent!"); }}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", alignItems: "center", paddingHorizontal: 20 },
  header: { position: "absolute", top: 0, width: "100%", padding: 20, alignItems: "center", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerText: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  contactContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 15, borderRadius: 10, width: "100%", marginBottom: 20, shadowOpacity: 0.1 },
  contactName: { fontSize: 18, fontWeight: "bold", color: "#232F3E", marginLeft: 10 },
  contactDetails: { fontSize: 14, color: "#555", marginLeft: 10 },
  amountContainer: { flexDirection: "row", alignItems: "center", margin: 50 },
  currency: { fontSize: 50, fontWeight: "bold", color: "#232F3E" },
  amountInput: { fontSize: 50, fontWeight: "bold", color: "#232F3E", borderBottomWidth: 2, borderColor: "#FF9900", width: 200, textAlign: "center" },
  messageContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, width: "100%", marginBottom: 20 },
  messageInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  proceedButton: { backgroundColor: "#FF9900", padding: 15, borderRadius: 8, alignItems: "center", width: "80%" },
  proceedButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // Modal Styles
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center", width: "80%" },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginTop: 10, color: "#232F3E" },
  modalText: { fontSize: 18, marginTop: 10, color: "#555" },
  modalMessage: { fontSize: 16, fontStyle: "italic", marginTop: 5, color: "#777" },
  modalButtons: { flexDirection: "row", marginTop: 20, justifyContent: "space-between", width: "100%" },
  cancelButton: { flex: 1, padding: 10, backgroundColor: "#ccc", borderRadius: 5, alignItems: "center", marginRight: 5 },
  confirmButton: { flex: 1, padding: 10, backgroundColor: "#FF9900", borderRadius: 5, alignItems: "center", marginLeft: 5 },
  cancelButtonText: { fontSize: 16, fontWeight: "bold", color: "#232F3E" },
  confirmButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});

export default EnterAmountScreen;