import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Eye icon

import api from '@/constants/api'

const AccountBalance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAmount, setShowAmount] = useState(false);
  const amount = "₹12,345.67"; // Example amount
  
//   const fetchBalance = async () => {
//     setLoading(true);
//     try {
//         const response = await api.get('/api/v1/listings/');
//         setBalance(response.data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     } finally {
//         setLoading(false);
//     }
//   };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Available Balance:</Text>
      
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>
          {showAmount ? `₹${balance}.00` : "****"}
        </Text>
        
        <TouchableOpacity onPress={() => setShowAmount(!showAmount)}>
          <MaterialIcons name={showAmount ? "visibility-off" : "visibility"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff", // Amazon Pay Theme
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF9900",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  amountText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 10,
  },
});

export default AccountBalance;