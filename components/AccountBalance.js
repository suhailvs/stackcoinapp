import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Eye icon

import api from '@/constants/api'

const AccountBalance = () => {
  const [balance, setBalance] = useState(null);
  
  const fetchBalance = async () => {    
    try {
        const response = await api.get('/api/v1/user/balance/');
        setBalance(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Available Balance:</Text>
      
      <View style={styles.amountContainer}>
        <Text style={[styles.amountText, balance>0 ? styles.positive : styles.negative]}>{balance ? `₹${balance.toFixed(2)}`:'****'}</Text>        
        <TouchableOpacity onPress={fetchBalance}>
          <MaterialIcons name="refresh" size={24} color="gray" />
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
    marginBottom: 20,
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
    backgroundColor: "#fff",
    padding: 10,
    borderStyle: 'solid',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
  amountText: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10,
  },
  positive: { color: "#2E7D32" },
  negative: { color: "#D32F2F" }, 
});

export default AccountBalance;