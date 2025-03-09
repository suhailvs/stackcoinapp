import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import SkeletonLoader from "@/components/SkeletonLoader";
import api from '@/constants/api'
import globalStyles from "@/components/Styles"; 

export default function TransactionScreen (){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString) => {    
    const date = new Date(dateString);    
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };
  
  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await api.get('/transactions/');
          setData(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          setLoading(false);
      }
  };
  return (
    <View style={[globalStyles.container,{padding:20}]}>
       {loading ? (
        <View>
          <SkeletonLoader width={100} height={20} />
          <SkeletonLoader width={200} height={15} />
          <SkeletonLoader width={250} height={15} />
        </View>
      ) : (
        <View>        
          <Text style={globalStyles.title}>Transactions</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionTitle}>{item.is_received ? `Received from ${item.buyer_name}` : `Paid to ${item.seller_name}`}</Text>
                <Text style={[styles.transactionAmount, item.is_received ? styles.positive : styles.negative]}>
                {item.is_received ? '+' : '-'}{item.amount}₹
                </Text>
                <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  transactionItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  transactionTitle: { fontSize: 16, fontWeight: "500" },
  transactionAmount: { fontSize: 16, fontWeight: "bold", position: "absolute", right: 10, top: 15 },
  transactionDate: { fontSize: 12, color: "gray", marginTop: 2 },
  positive: { color: "green" },
  negative: { color: "red" },
});