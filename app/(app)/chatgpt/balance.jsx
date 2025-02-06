import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AmazonPayScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <LinearGradient colors={["#FF9900", "#FFB84D"]} style={styles.header}>
        <Text style={styles.headerText}>Amazon Pay</Text>
      </LinearGradient> */}

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Your Balance</Text>
        <Text style={styles.amount}>$1,250.00</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Icon name="send" size={22} color="#fff" />
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#232F3E" }]}>
          <Icon name="cash" size={22} color="#fff" />
          <Text style={styles.buttonText}>Request Money</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <ScrollView style={styles.transactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transaction}>
          <Icon name="account-arrow-right" size={24} color="#FF9900" />
          <Text style={styles.transactionText}>Sent $50 to John Doe</Text>
          <Text style={styles.transactionAmount}>-$50</Text>
        </View>
        <View style={styles.transaction}>
          <Icon name="account-arrow-left" size={24} color="#FF9900" />
          <Text style={styles.transactionText}>Received $100 from Alice</Text>
          <Text style={styles.transactionAmount}>+$100</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 20, alignItems: "center", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerText: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  balanceCard: { backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 10, shadowOpacity: 0.1 },
  balanceText: { fontSize: 18, color: "#555" },
  amount: { fontSize: 28, fontWeight: "bold", color: "#232F3E" },
  actions: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  button: { flexDirection: "row", alignItems: "center", backgroundColor: "#FF9900", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, marginLeft: 10 },
  transactions: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  transaction: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, shadowOpacity: 0.1 },
  transactionText: { fontSize: 16 },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
});

export default AmazonPayScreen;
